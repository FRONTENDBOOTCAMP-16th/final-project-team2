export type ReviewUser = {
  id: string;
  nickname: string;
};

export type ImageType = {
  src: string;
  alt: string | null;
};

export type Reviews = {
  id: string;

  user_id: string;
  product_id: string;

  title: string;
  content: string;

  grade: number;

  images: ImageType[];

  created_at: string;
  updated_at: string;

  users: ReviewUser;
};
