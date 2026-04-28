export interface Notice {
  id: string;
  writer_id: string;
  important: boolean;
  title: string;
  content: string;
  created_at: string;
}

export interface BoardCard {
  id: string;
  writer_id: string;
  important: boolean;
  title: string;
  created_at: string;
  users: {
    nickname: string
  }
}