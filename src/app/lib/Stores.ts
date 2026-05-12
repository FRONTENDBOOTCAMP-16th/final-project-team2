export type StoreUser = {
  id: string;
  name: string;
  profile_image: string | null;
};

export type Store = {
  id: string;
  owner_id: string;
  name: string;
  intro: string | null;
  profile_image: string | null;
  location: string | null;
  created_at: string;

  users: StoreUser;
};
