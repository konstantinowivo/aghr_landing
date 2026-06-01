import { supabase } from '@/lib/supabase'

export const authService = {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const { data: role } = await supabase.rpc('get_my_role')
    if (role !== 'admin') {
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
    const { data: role } = await supabase.rpc('get_my_role')
    return role === 'admin'
  }
}
