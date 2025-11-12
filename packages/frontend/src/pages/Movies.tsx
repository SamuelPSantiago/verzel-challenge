import { useState, useEffect, useRef, useCallback } from 'react';
import { moviesService, Movie } from '../services/movies.service';
import { movieListsService } from '../services/movie-lists.service';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';
import { Spinner } from '../components/ui/spinner';

export function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lists, setLists] = useState<{ id: string; name: string }[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>('');
  const [moviesInList, setMoviesInList] = useState<Set<number>>(new Set());
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const isSearchMode = useRef(false);
  const hasMoreRef = useRef(true);
  const loadingMoreRef = useRef(false);
  const loadingRef = useRef(false);
  const currentPageRef = useRef(1);
  const searchQueryRef = useRef('');

  const loadMoviesInList = async () => {
    if (!selectedListId) return;
    try {
      const response = await movieListsService.getListItems(selectedListId);
      const movieIds = new Set(response.items.map(item => item.movieId));
      setMoviesInList(movieIds);
    } catch (error) {
      console.error('Erro ao carregar filmes da lista:', error);
    }
  };

  useEffect(() => {
    loadLists();
  }, []);

  useEffect(() => {
    if (selectedListId) {
      loadMoviesInList();
    } else {
      setMoviesInList(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedListId]);

  // Atualiza refs quando os estados mudam
  useEffect(() => {
    hasMoreRef.current = hasMore;
    loadingMoreRef.current = loadingMore;
    loadingRef.current = loading;
    currentPageRef.current = currentPage;
    searchQueryRef.current = searchQuery;
  }, [hasMore, loadingMore, loading, currentPage, searchQuery]);

  useEffect(() => {
    // Limpa o timeout anterior se existir
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Se o campo de busca estiver vazio, carrega filmes populares imediatamente
    if (!searchQuery.trim()) {
      isSearchMode.current = false;
      setCurrentPage(1);
      setHasMore(true);
      loadPopularMovies(1, true);
      return;
    }

    // Debounce: aguarda 500ms após parar de digitar antes de buscar
    searchTimeoutRef.current = setTimeout(async () => {
      isSearchMode.current = true;
      setCurrentPage(1);
      setHasMore(true);
      setLoading(true);
      loadingRef.current = true;
      try {
        const response = await moviesService.search(searchQuery, 1);
        setMovies(response.results);
        setHasMore(response.page < response.total_pages);
        hasMoreRef.current = response.page < response.total_pages;
        setCurrentPage(response.page);
        currentPageRef.current = response.page;
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    }, 500);

    // Limpa o timeout quando o componente desmontar ou searchQuery mudar
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const loadPopularMovies = async (page: number = 1, reset: boolean = false) => {
    if (reset) {
      setLoading(true);
      loadingRef.current = true;
    } else {
      setLoadingMore(true);
      loadingMoreRef.current = true;
    }
    try {
      const response = await moviesService.getPopular(page);
      if (reset) {
        setMovies(response.results);
      } else {
        setMovies(prev => [...prev, ...response.results]);
      }
      setHasMore(response.page < response.total_pages);
      hasMoreRef.current = response.page < response.total_pages;
      setCurrentPage(response.page);
      currentPageRef.current = response.page;
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      loadingRef.current = false;
      loadingMoreRef.current = false;
    }
  };

  // Função para carregar mais filmes (usando useCallback para estabilidade)
  const loadMoreMovies = useCallback(async () => {
    if (loadingMoreRef.current || !hasMoreRef.current || loadingRef.current) return;

    const nextPage = currentPageRef.current + 1;
    
    if (isSearchMode.current) {
      setLoadingMore(true);
      loadingMoreRef.current = true;
      try {
        const response = await moviesService.search(searchQueryRef.current, nextPage);
        setMovies(prev => [...prev, ...response.results]);
        setHasMore(response.page < response.total_pages);
        hasMoreRef.current = response.page < response.total_pages;
        setCurrentPage(response.page);
        currentPageRef.current = response.page;
      } catch (error) {
        console.error('Erro ao carregar mais filmes:', error);
      } finally {
        setLoadingMore(false);
        loadingMoreRef.current = false;
      }
    } else {
      setLoadingMore(true);
      loadingMoreRef.current = true;
      try {
        const response = await moviesService.getPopular(nextPage);
        setMovies(prev => [...prev, ...response.results]);
        setHasMore(response.page < response.total_pages);
        hasMoreRef.current = response.page < response.total_pages;
        setCurrentPage(response.page);
        currentPageRef.current = response.page;
      } catch (error) {
        console.error('Erro ao carregar filmes:', error);
      } finally {
        setLoadingMore(false);
        loadingMoreRef.current = false;
      }
    }
  }, []); // Função estável que usa refs

  // Intersection Observer para detectar quando o usuário chega no final da página
  useEffect(() => {
    // Não cria observer se não houver filmes ou estiver carregando inicialmente
    if (movies.length === 0 || loading) {
      return;
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      // Verifica se está visível, se há mais páginas, e se não está carregando
      if (entry.isIntersecting && hasMoreRef.current && !loadingMoreRef.current && !loadingRef.current) {
        loadMoreMovies();
      }
    };

    const observer = new IntersectionObserver(handleIntersect, { 
      threshold: 0.1,
      rootMargin: '200px' // Carrega quando está a 200px do final para melhor UX
    });

    // Função para observar o elemento
    const observeElement = () => {
      const currentTarget = observerTarget.current;
      if (currentTarget) {
        observer.observe(currentTarget);
      }
    };

    // Tenta observar imediatamente
    observeElement();

    // Se não encontrou, tenta novamente após um pequeno delay (caso o DOM ainda não tenha atualizado)
    const timeoutId = setTimeout(observeElement, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [movies.length, loading, loadMoreMovies]); // Recria quando os filmes mudam ou quando termina o loading inicial

  const loadLists = async () => {
    try {
      const response = await movieListsService.getLists();
      setLists(response.lists);
      const favoritesList = response.lists.find(list => list.isDefault);
      if (favoritesList) {
        setSelectedListId(favoritesList.id);
      }
    } catch (error) {
      console.error('Erro ao carregar listas:', error);
    }
  };

  const handleAddToList = async (movie: Movie) => {
    if (!selectedListId) {
      toast.error('Selecione uma lista primeiro');
      return;
    }

    try {
      await movieListsService.addMovieToList(selectedListId, movie.id);
      // Atualiza o estado local para refletir a mudança imediatamente
      setMoviesInList(prev => new Set(prev).add(movie.id));
      toast.success(`"${movie.title}" adicionado à lista!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao adicionar filme');
    }
  };

  const handleRemoveFromList = async (movie: Movie) => {
    if (!selectedListId) {
      toast.error('Selecione uma lista primeiro');
      return;
    }

    try {
      await movieListsService.removeMovieFromList(selectedListId, movie.id);
      // Atualiza o estado local para refletir a mudança imediatamente
      setMoviesInList(prev => {
        const newSet = new Set(prev);
        newSet.delete(movie.id);
        return newSet;
      });
      toast.success(`"${movie.title}" removido da lista!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao remover filme');
    }
  };

  const getPosterUrl = (posterPath: string | null) => {
    if (!posterPath) return 'https://via.placeholder.com/300x450?text=Sem+Imagem';
    return `https://image.tmdb.org/t/p/w300${posterPath}`;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">Filmes</h1>
          
          <div className="flex gap-4 mb-4">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar filmes..."
              className="flex-1"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium">Adicionar a:</label>
            <select
              value={selectedListId}
              onChange={(e) => setSelectedListId(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="">Selecione uma lista</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && movies.length === 0 ? (
          <div className="text-center py-10 flex items-center justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <Card key={movie.id} className="overflow-hidden">
                  <div className="aspect-[2/3] relative">
                    <img
                      src={getPosterUrl(movie.poster_path)}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {movie.release_date?.split('-')[0]}
                    </p>
                    {selectedListId && moviesInList.has(movie.id) ? (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-full"
                        onClick={() => handleRemoveFromList(movie)}
                      >
                        Remover
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleAddToList(movie)}
                        disabled={!selectedListId}
                      >
                        Adicionar
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Elemento observado para detectar quando o usuário chega no final */}
            <div ref={observerTarget} className="h-20 flex items-center justify-center">
              {loadingMore && <Spinner className="h-8 w-8" />}
            </div>
          </>
        )}

        {movies.length === 0 && !loading && (
          <div className="text-center py-10 text-muted-foreground">
            Nenhum filme encontrado
          </div>
        )}
      </div>
    </div>
  );
}

