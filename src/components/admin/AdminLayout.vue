<template>
  <div class="admin-shell">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span class="brand-text">AGHR Admin</span>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/admin/dashboard" class="nav-link">
          <span class="nav-icon">📊</span> Dashboard
        </router-link>
        <router-link to="/admin/contacts" class="nav-link">
          <span class="nav-icon">📩</span> Consultas
        </router-link>
        <router-link to="/admin/testimonials" class="nav-link">
          <span class="nav-icon">💬</span> Testimonios
        </router-link>
        <router-link to="/admin/team" class="nav-link">
          <span class="nav-icon">👥</span> Equipo
        </router-link>
        <router-link to="/admin/services" class="nav-link">
          <span class="nav-icon">🎯</span> Servicios
        </router-link>
        <router-link to="/admin/jobs" class="nav-link">
          <span class="nav-icon">💼</span> Empleos
        </router-link>
        <router-link to="/admin/clients" class="nav-link">
          <span class="nav-icon">🏢</span> Clientes
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <router-link to="/" class="nav-link" target="_blank">
          <span class="nav-icon">🌐</span> Ver sitio
        </router-link>
        <button class="logout-btn" @click="handleLogout">
          <span class="nav-icon">🚪</span> Salir
        </button>
      </div>
    </aside>

    <main class="admin-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'

const router = useRouter()

const handleLogout = async () => {
  await authService.logout()
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #f4f6f9;
}

.sidebar {
  width: 240px;
  background: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
}

.sidebar-brand {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.brand-text {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #f8fafc;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-link:hover {
  background: rgba(255,255,255,0.05);
  color: #f1f5f9;
}

.nav-link.router-link-active {
  background: rgba(99,102,241,0.15);
  color: #818cf8;
  border-left-color: #818cf8;
}

.nav-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
}

.sidebar-footer {
  padding: 1rem 0;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #94a3b8;
  background: none;
  border: none;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: rgba(239,68,68,0.1);
  color: #f87171;
}

.admin-content {
  margin-left: 240px;
  flex: 1;
  padding: 2rem;
  min-height: 100vh;
}
</style>
