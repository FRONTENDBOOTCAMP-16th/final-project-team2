export type Categories = {
  id: string;
  name: string;
  create_at: string;
  parent_id: string | null;
};

export type ProductCategories = {
  id: string;
  product_id: string;
  category_id: string;
};
