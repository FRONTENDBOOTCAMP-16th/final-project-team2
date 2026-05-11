import { Products } from '@/app/lib/products';
import { createClient } from '../../utils/supabase/server';
import { notFound } from 'next/navigation';

export const getProductDetail = async (id: string): Promise<Products> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    notFound();
  }

  return data;
};
