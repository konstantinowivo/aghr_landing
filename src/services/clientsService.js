import { supabase } from '@/lib/supabase'

export const clientsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('active', true)
      .order('display_order')
    if (error) throw error
    return data
  }
}
