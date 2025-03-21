import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { ReactionType, EntityType, PurchaseStatus } from "./kysely.enums";

export type Account = {
    id: string;
    email: string;
    password: string | null;
    googleTokenId: string | null;
    refreshToken: string | null;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
};
export type Book = {
    id: string;
    title: string;
    author: string;
    publisher: string | null;
    publishYear: string | null;
    isbn: string | null;
    language: string | null;
    buyPrice: number;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
};
export type Comment = {
    id: string;
    content: string;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
    userId: string | null;
    postId: string | null;
};
export type CommentReply = {
    id: string;
    content: string;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
    userId: string | null;
    commentId: string | null;
};
export type Geolocation = {
    id: string;
    latitude: number | null;
    longitude: number | null;
    city: string | null;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
    userId: string | null;
};
export type Post = {
    id: string;
    image: string;
    content: string;
    price: number;
    status: Generated<PurchaseStatus>;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
    bookId: string | null;
    userId: string | null;
};
export type PredictionResult = {
    id: string;
    percentage: number;
    wornOutRatio: number;
    rippedRatio: number;
    overallRatio: number;
    buyPrice: number;
    recommendPrice: number;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
    bookId: string | null;
};
export type Profile = {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
};
export type Reaction = {
    id: string;
    userId: string;
    entityType: EntityType;
    reaction: ReactionType;
    commentReplyId: string | null;
    commentId: string | null;
    postId: string | null;
};
export type User = {
    id: string;
    username: string;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
    accountId: string | null;
    profileId: string | null;
};
export type DB = {
    accounts: Account;
    books: Book;
    comment_replies: CommentReply;
    comments: Comment;
    geolocations: Geolocation;
    posts: Post;
    prediction_results: PredictionResult;
    profiles: Profile;
    reactions: Reaction;
    users: User;
};
