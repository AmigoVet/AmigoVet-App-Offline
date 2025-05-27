import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
// import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY } from '';

const REACT_APP_SUPABASE_URL = 'https://dpryofqwatjjupnrzoqz.supabase.co';
const REACT_APP_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcnlvZnF3YXRqanVwbnJ6b3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTQ0MzksImV4cCI6MjA2MzUzMDQzOX0.BlX52M9OkBvpaXSIkFW2vTtI5R_Wm0qIJI36BTDpQqk';

if (!REACT_APP_SUPABASE_URL || !REACT_APP_SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL and Anon Key must be defined in environment variables');
}

export const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
