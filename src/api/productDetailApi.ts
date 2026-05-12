import { Products } from '@/app/lib/products';
import { createClient } from '../../utils/supabase/server';
import { notFound } from 'next/navigation';
import { Store } from '@/app/lib/Stores';

export const getProductDetail = async (id: string): Promise<Products> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();

  if (error) {
    notFound();
  }

  return data;
};
export const getStoreDetailInfo = async (id: string): Promise<Store> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('stores').select('*').eq('id', id).single();

  if (error) {
    notFound();
  }

  return data;
};
