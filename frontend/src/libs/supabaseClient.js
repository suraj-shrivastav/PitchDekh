import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nfsmznzjcpshzxwnbuql.supabase.co";
const SUPABASE_KEY = "sb_publishable_Lx0v73zsdQwFR4v1GTYfig_Mj4T2u-C";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
