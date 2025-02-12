// utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lcasimhmjerojawtzwrr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYXNpbWhtamVyb2phd3R6d3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4Njg4NTAsImV4cCI6MjA1NDQ0NDg1MH0.7lshGjysITEXTSuqF8kDsg_KPX25v-BS3lqIT1QDflY';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
