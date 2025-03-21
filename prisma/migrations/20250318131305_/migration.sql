-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "book";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "post";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user";

-- CreateEnum
CREATE TYPE "post"."ReactionType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateEnum
CREATE TYPE "post"."EntityType" AS ENUM ('POST', 'COMMENT', 'REPLY');

-- CreateTable
CREATE TABLE "book"."books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT,
    "publishYear" TEXT,
    "isbn" TEXT,
    "language" TEXT,
    "buyPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book"."prediction_results" (
    "id" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "wornOutRatio" DOUBLE PRECISION NOT NULL,
    "rippedRatio" DOUBLE PRECISION NOT NULL,
    "overallRatio" DOUBLE PRECISION NOT NULL,
    "buyPrice" INTEGER NOT NULL,
    "recommendPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "bookId" TEXT,

    CONSTRAINT "prediction_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post"."posts" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "bookId" TEXT,
    "userId" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post"."comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" TEXT,
    "postId" TEXT,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post"."comment_replies" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" TEXT,
    "commentId" TEXT,

    CONSTRAINT "comment_replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post"."reactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "entityType" "post"."EntityType" NOT NULL,
    "reaction" "post"."ReactionType" NOT NULL,
    "commentReplyId" TEXT,
    "commentId" TEXT,
    "postId" TEXT,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."accounts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "googleTokenId" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."profiles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "accountId" TEXT,
    "profileId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prediction_results_bookId_key" ON "book"."prediction_results"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "posts_bookId_key" ON "post"."posts"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "reactions_userId_postId_commentId_commentReplyId_entityType_key" ON "post"."reactions"("userId", "postId", "commentId", "commentReplyId", "entityType");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "user"."accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_googleTokenId_key" ON "user"."accounts"("googleTokenId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_refreshToken_key" ON "user"."accounts"("refreshToken");

-- CreateIndex
CREATE INDEX "idx_accounts_email" ON "user"."accounts"("email");

-- CreateIndex
CREATE INDEX "idx_accounts_google_token_id" ON "user"."accounts"("googleTokenId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "user"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_accountId_key" ON "user"."users"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "users_profileId_key" ON "user"."users"("profileId");

-- AddForeignKey
ALTER TABLE "book"."prediction_results" ADD CONSTRAINT "prediction_results_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"."books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post"."posts" ADD CONSTRAINT "posts_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"."books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post"."posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post"."comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post"."comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post"."comment_replies" ADD CONSTRAINT "comment_replies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "post"."comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post"."comment_replies" ADD CONSTRAINT "comment_replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post"."reactions" ADD CONSTRAINT "reactions_commentReplyId_fkey" FOREIGN KEY ("commentReplyId") REFERENCES "post"."comment_replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post"."reactions" ADD CONSTRAINT "reactions_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "post"."comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post"."reactions" ADD CONSTRAINT "reactions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"."posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post"."reactions" ADD CONSTRAINT "reactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."users" ADD CONSTRAINT "users_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "user"."accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."users" ADD CONSTRAINT "users_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
