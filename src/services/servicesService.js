import { supabase } from '@/lib/supabase'

export const servicesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('display_order')
    if (error) throw error
    return data
  },

  async getByType(type) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .eq('type', type)
      .order('display_order')
    if (error) throw error
    return data
  }
}
