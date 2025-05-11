
import { createClient } from "@supabase/supabase-js";

// Get URL and API key from environment variables, or use empty strings as fallback
// This allows the app to at least initialize without crashing when env vars aren't set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

let supabase: ReturnType<typeof createClient> | null = null;

// Only create the client if we have valid URL and key
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

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
    if (!supabase) {
      console.warn("Supabase client not initialized - missing environment variables");
      return null;
    }
    
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
    if (!supabase) {
      console.warn("Supabase client not initialized - missing environment variables");
      return null;
    }
    
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
