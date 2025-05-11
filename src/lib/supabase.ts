
import { createClient } from "@supabase/supabase-js";

// Отримуємо URL та API ключ із змінних середовища
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Створюємо клієнт Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Типи даних для роботи з базою
export interface VegetablePriceRecord {
  id: number;
  name: string;
  metro: number;
  silpo: number;
  atb: number;
  unit: string;
  updated_at: string;
}

// Функція для отримання актуальних цін з Supabase
export async function getVegetablePrices() {
  try {
    const { data, error } = await supabase
      .from('vegetable_prices')
      .select('*')
      .order('id');
      
    if (error) {
      console.error('Error fetching prices:', error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error('Failed to fetch vegetable prices:', err);
    return null;
  }
}

// Функція для отримання часу останнього оновлення
export async function getLastUpdated() {
  try {
    const { data, error } = await supabase
      .from('update_info')
      .select('last_updated')
      .single();
      
    if (error) {
      console.error('Error fetching last updated info:', error);
      return null;
    }
    
    return data?.last_updated;
  } catch (err) {
    console.error('Failed to fetch last updated info:', err);
    return null;
  }
}
