import { supabase } from '@/lib/supabase'

export const siteContentService = {
  async get(key) {
    const { data, error } = await supabase
      .from('site_content')
      .select('value')
      .eq('key', key)
      .single()
    if (error) throw error
    return data?.value
  },

  async getMany(keys) {
    const { data, error } = await supabase
      .from('site_content')
      .select('key, value')
      .in('key', keys)
    if (error) throw error
    return Object.fromEntries(data.map(row => [row.key, row.value]))
  }
}
