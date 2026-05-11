import { Products } from '@/app/lib/products';
<<<<<<< HEAD
import { createClient } from '../../utils/supabase/server';
import { notFound } from 'next/navigation';
=======
import { createClient } from '@/utils/supabase/server';
>>>>>>> 8f082f3 (refactoy: utils 파일 이동)

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
