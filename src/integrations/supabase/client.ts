
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://taoopfiqvxznbgvybeui.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhb29wZmlxdnh6bmJndnliZXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDU5NjIsImV4cCI6MjA2MDQ4MTk2Mn0.CbJGgWlA94zhwLNtoPQrbJUJx8NB9F289ZYGibcVSZM";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
