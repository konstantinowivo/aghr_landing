<template>
  <div class="admin-shell">

    <!-- Mobile header -->
    <header class="mobile-header">
      <button class="burger-btn" @click="sidebarOpen = true" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </button>
      <span class="mobile-brand">AGHR Admin</span>
    </header>

    <!-- Overlay -->
    <transition name="fade">
      <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false" />
    </transition>

    <aside class="sidebar" :class="{ 'sidebar-open': sidebarOpen }">
      <div class="sidebar-brand">
        <span class="brand-text">AGHR Admin</span>
        <button class="sidebar-close" @click="sidebarOpen = false" aria-label="Cerrar menú">✕</button>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/admin/dashboard" class="nav-link" @click="closeSidebar">
          <span class="nav-icon">📊</span> Dashboard
        </router-link>
        <router-link to="/admin/contacts" class="nav-link" @click="closeSidebar">
          <span class="nav-icon">📩</span> Consultas
        </router-link>
        <router-link to="/admin/jobs" class="nav-link" @click="closeSidebar">
          <span class="nav-icon">💼</span> Empleos
        </router-link>
        <router-link to="/admin/applications" class="nav-link" @click="closeSidebar">
          <span class="nav-icon">📋</span> Postulaciones
        </router-link>

        <div class="nav-group">
          <button
            class="nav-group-header"
            :class="{ open: groups.config, 'has-active': groupIsActive }"
            @click="toggleGroup('config')"
          >
            <span class="nav-icon">⚙️</span>
            <span class="nav-group-label">Configuración</span>
            <span class="nav-group-arrow" :class="{ rotated: groups.config }">▶</span>
          </button>
          <div class="nav-group-children" :class="{ expanded: groups.config }">
            <div>
              <router-link to="/admin/team" class="nav-link nav-link-child" @click="closeSidebar">
                <span class="nav-icon">👥</span> Equipo
              </router-link>
              <router-link to="/admin/services" class="nav-link nav-link-child" @click="closeSidebar">
                <span class="nav-icon">🎯</span> Servicios
              </router-link>
              <router-link to="/admin/clients" class="nav-link nav-link-child" @click="closeSidebar">
                <span class="nav-icon">🏢</span> Clientes
              </router-link>
              <router-link to="/admin/testimonials" class="nav-link nav-link-child" @click="closeSidebar">
                <span class="nav-icon">💬</span> Testimonios
              </router-link>
            </div>
          </div>
        </div>
      </nav>

      <div class="sidebar-footer">
        <router-link to="/" class="nav-link" target="_blank" @click="closeSidebar">
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
import { ref, reactive, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '@/services/authService'

const router = useRouter()
const route = useRoute()

const sidebarOpen = ref(false)

const CONFIG_ROUTES = ['/admin/team', '/admin/services', '/admin/clients', '/admin/testimonials']

const groupIsActive = computed(() => CONFIG_ROUTES.some(r => route.path.startsWith(r)))

const groups = reactive({
  config: groupIsActive.value
})

watch(groupIsActive, (active) => {
  if (active) groups.config = true
})

const toggleGroup = (key) => {
  groups[key] = !groups[key]
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

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

/* ── Sidebar ─────────────────────────────────────── */
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
  z-index: 200;
}

.sidebar-brand {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-text {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #f8fafc;
}

.sidebar-close {
  display: none;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.125rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.sidebar-close:hover { color: #f1f5f9; }

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
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

.nav-link-child {
  padding-left: 2.75rem;
  font-size: 0.875rem;
}

/* Group */
.nav-group {
  display: flex;
  flex-direction: column;
}

.nav-group-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #94a3b8;
  background: none;
  border: none;
  border-left: 3px solid transparent;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
}

.nav-group-header:hover {
  background: rgba(255,255,255,0.05);
  color: #f1f5f9;
}

.nav-group-header.has-active {
  color: #818cf8;
  border-left-color: #818cf8;
}

.nav-group-label { flex: 1; }

.nav-group-arrow {
  font-size: 0.625rem;
  transition: transform 0.2s ease;
  opacity: 0.6;
}

.nav-group-arrow.rotated { transform: rotate(90deg); }

.nav-group-children {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
}

.nav-group-children.expanded { grid-template-rows: 1fr; }

.nav-group-children > div { overflow: hidden; }

.nav-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
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

/* ── Content ─────────────────────────────────────── */
.admin-content {
  margin-left: 240px;
  flex: 1;
  padding: 2rem;
  min-height: 100vh;
}

/* ── Mobile header ───────────────────────────────── */
.mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: #1e293b;
  z-index: 100;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;
}

.mobile-brand {
  font-size: 1rem;
  font-weight: 700;
  color: #f8fafc;
  letter-spacing: 0.05em;
}

.burger-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.burger-btn span {
  display: block;
  width: 22px;
  height: 2px;
  background: #f8fafc;
  border-radius: 2px;
}

/* ── Overlay ─────────────────────────────────────── */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 150;
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

/* ── Mobile breakpoint ───────────────────────────── */
@media (max-width: 768px) {
  .mobile-header { display: flex; }

  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: 200;
  }

  .sidebar.sidebar-open { transform: translateX(0); }

  .sidebar-close { display: block; }

  .admin-content {
    margin-left: 0;
    padding: 1.25rem 1rem;
    padding-top: calc(56px + 1.25rem);
  }
}
</style>
