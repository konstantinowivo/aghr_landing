<template>
  <div>
    <h1 class="page-title">Dashboard</h1>

    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-info">
          <p class="stat-value">{{ stat.count ?? '...' }}</p>
          <p class="stat-label">{{ stat.label }}</p>
        </div>
        <router-link :to="stat.route" class="stat-link">Ver →</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const stats = ref([
  { label: 'Consultas recibidas', icon: '📩', count: null, route: '/admin/contacts' },
  { label: 'Testimonios', icon: '💬', count: null, route: '/admin/testimonials' },
  { label: 'Miembros del equipo', icon: '👥', count: null, route: '/admin/team' },
  { label: 'Servicios', icon: '🎯', count: null, route: '/admin/services' },
  { label: 'Empleos publicados', icon: '💼', count: null, route: '/admin/jobs' },
  { label: 'Postulaciones', icon: '📋', count: null, route: '/admin/applications' },
  { label: 'Clientes', icon: '🏢', count: null, route: '/admin/clients' },
])

onMounted(async () => {
  const tables = ['contact_submissions', 'testimonials', 'team_members', 'services', 'jobs', 'applications', 'clients']
  const results = await Promise.all(
    tables.map(t => supabase.from(t).select('*', { count: 'exact', head: true }))
  )
  results.forEach((r, i) => {
    stats.value[i].count = r.count ?? 0
  })
})
</script>

<style scoped>
.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: 1px solid #e2e8f0;
}

.stat-icon {
  font-size: 2rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.stat-link {
  font-size: 0.875rem;
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
  margin-top: auto;
}

.stat-link:hover {
  text-decoration: underline;
}
</style>
