export const ReactionType = {
    UPVOTE: "UPVOTE",
    DOWNVOTE: "DOWNVOTE"
} as const;
export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType];
export const EntityType = {
    POST: "POST",
    COMMENT: "COMMENT",
    REPLY: "REPLY"
} as const;
export type EntityType = (typeof EntityType)[keyof typeof EntityType];
export const PurchaseStatus = {
    AVAILABLE: "AVAILABLE",
    SOLD: "SOLD"
} as const;
export type PurchaseStatus = (typeof PurchaseStatus)[keyof typeof PurchaseStatus];
