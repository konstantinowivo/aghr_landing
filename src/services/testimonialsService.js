import { supabase } from '@/lib/supabase'

export const testimonialsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('active', true)
      .order('featured', { ascending: false })
    if (error) throw error
    return data
  }
}
