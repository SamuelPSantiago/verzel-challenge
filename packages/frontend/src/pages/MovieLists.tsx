import { useState, useEffect } from 'react';
import { movieListsService, MovieList, MovieListItem } from '../services/movie-lists.service';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Spinner } from '../components/ui/spinner';
import { Trash2 } from 'lucide-react';

export function MovieLists() {
  const [lists, setLists] = useState<MovieList[]>([]);
  const [selectedList, setSelectedList] = useState<MovieList | null>(null);
  const [items, setItems] = useState<MovieListItem[]>([]);
  const [newListName, setNewListName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    try {
      const response = await movieListsService.getLists();
      setLists(response.lists);
      if (response.lists.length > 0 && !selectedList) {
        setSelectedList(response.lists[0]);
        loadListItems(response.lists[0].id);
      }
    } catch (error) {
      console.error('Erro ao carregar listas:', error);
    }
  };

  const loadListItems = async (listId: string) => {
    setLoading(true);
    try {
      const response = await movieListsService.getListItems(listId);
      setItems(response.items);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    try {
      await movieListsService.createList(newListName);
      setNewListName('');
      await loadLists();
      toast.success('Lista criada com sucesso!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao criar lista');
    }
  };

  const handleSelectList = (list: MovieList) => {
    setSelectedList(list);
    loadListItems(list.id);
  };

  const handleRemoveMovie = async (movieId: number) => {
    if (!selectedList) return;
    if (!confirm('Deseja remover este filme da lista?')) return;

    try {
      await movieListsService.removeMovieFromList(selectedList.id, movieId);
      await loadListItems(selectedList.id);
      toast.success('Filme removido da lista!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao remover filme');
    }
  };

  const handleDeleteList = async (listId: string, listName: string) => {
    if (!confirm(`Deseja realmente deletar a lista "${listName}"? Esta ação não pode ser desfeita.`)) return;

    try {
      await movieListsService.deleteList(listId);
      // Se a lista deletada era a selecionada, limpa a seleção
      if (selectedList?.id === listId) {
        setSelectedList(null);
        setItems([]);
      }
      await loadLists();
      toast.success('Lista deletada com sucesso!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao deletar lista');
    }
  };

  const getPosterUrl = (posterPath: string | null) => {
    if (!posterPath) return 'https://via.placeholder.com/300x450?text=Sem+Imagem';
    return `https://image.tmdb.org/t/p/w300${posterPath}`;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-6">Minhas Listas</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Listas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleCreateList} className="flex gap-2">
                  <Input
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Nova lista"
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">Criar</Button>
                </form>

                <div className="space-y-2">
                  {lists.map((list) => (
                    <div
                      key={list.id}
                      className={`flex items-center justify-between group ${
                        selectedList?.id === list.id
                          ? 'bg-primary text-primary-foreground rounded-md'
                          : ''
                      }`}
                    >
                      <button
                        onClick={() => handleSelectList(list)}
                        className={`flex-1 text-left p-2 rounded-md transition-colors ${
                          selectedList?.id === list.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                        }`}
                      >
                        {list.name}
                        {list.isDefault && ' ⭐'}
                      </button>
                      {!list.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors opacity-70 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteList(list.id, list.name);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {selectedList ? (
              <>
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold">{selectedList.name}</h2>
                  <p className="text-muted-foreground">
                    {items.length} {items.length === 1 ? 'filme' : 'filmes'}
                  </p>
                </div>

                {loading ? (
                  <div className="text-center py-10 flex items-center justify-center">
                    <Spinner className="h-8 w-8" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="aspect-[2/3] relative">
                          <img
                            src={getPosterUrl(item.posterPath)}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-3">
                            {item.releaseDate?.split('-')[0]}
                          </p>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-full"
                            onClick={() => handleRemoveMovie(item.movieId)}
                          >
                            Remover
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {items.length === 0 && !loading && (
                  <div className="text-center py-10 text-muted-foreground">
                    Esta lista está vazia
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                Selecione uma lista para ver os filmes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

