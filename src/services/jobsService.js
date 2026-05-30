import { supabase } from '@/lib/supabase'

export const jobsService = {
  async getPublished(filters = {}) {
    let query = supabase
      .from('jobs')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (filters.category) query = query.eq('category', filters.category)
    if (filters.type) query = query.eq('type', filters.type)

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .eq('status', 'published')
      .single()
    if (error) throw error
    return data
  }
}
