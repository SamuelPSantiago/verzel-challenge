-- CreateTable
CREATE TABLE "movie_lists" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_list_items" (
    "id" TEXT NOT NULL,
    "movieListId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "posterPath" TEXT,
    "releaseDate" TEXT,
    "overview" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_list_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "movie_lists_userId_idx" ON "movie_lists"("userId");

-- CreateIndex
CREATE INDEX "movie_lists_id_idx" ON "movie_lists"("id");

-- CreateIndex
CREATE INDEX "movie_list_items_movieListId_idx" ON "movie_list_items"("movieListId");

-- CreateIndex
CREATE INDEX "movie_list_items_id_idx" ON "movie_list_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "movie_list_items_movieListId_movieId_key" ON "movie_list_items"("movieListId", "movieId");

-- AddForeignKey
ALTER TABLE "movie_lists" ADD CONSTRAINT "movie_lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_list_items" ADD CONSTRAINT "movie_list_items_movieListId_fkey" FOREIGN KEY ("movieListId") REFERENCES "movie_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
