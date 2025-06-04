import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://frmszanzqdyipflpfbuw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXN6YW56cWR5aXBmbHBmYnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODk0MzYsImV4cCI6MjA2NDM2NTQzNn0.Wod6EL_wMfaKpA9ZIUCc4OMhWneRs1jbCskix35BTzM'
export const supabase = createClient(supabaseUrl, supabaseKey)