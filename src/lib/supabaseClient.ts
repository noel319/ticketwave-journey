
import { createClient } from '@supabase/supabase-js';

// Environment variables would be better, but for now we'll use inline values
// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
