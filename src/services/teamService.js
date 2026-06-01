import { supabase } from '@/lib/supabase'

export const teamService = {
  async getAll() {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('active', true)
      .order('display_order')
    if (error) throw error
    return data
  },

  async getByCategory(category) {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('active', true)
      .eq('category', category)
      .order('display_order')
    if (error) throw error
    return data
  }
}
