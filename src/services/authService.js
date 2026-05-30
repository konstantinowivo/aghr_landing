import { supabase } from '@/lib/supabase'

export const authService = {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()
    if (profile?.role !== 'admin') {
      await supabase.auth.signOut()
      throw new Error('No tenés permisos de administrador')
    }
    return data
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    const { data } = await supabase.auth.getSession()
    return data.session
  },

  async isAdmin() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return false
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
    return profile?.role === 'admin'
  }
}
