export type ReviewDTO = {
  _id: string;
  name: string;
  email: string;
  rating: number;
  content: string;
};

export type ReviewMutation = { productId: string } & Omit<ReviewDTO, "_id">;
