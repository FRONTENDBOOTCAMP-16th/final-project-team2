export type ImageType = {
  src: [string | string[]];
  alt: string | null;
};

export type Reviews = {
  id: string;
  user_id: string;
  product_id: string;
  title: string;
  content: string;
  grade: string;
  images: ImageType;
  created_at: string;
  update_at: string;
};
