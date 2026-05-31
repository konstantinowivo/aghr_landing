<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Consultas recibidas</h1>
      <span class="unread-badge" v-if="unreadCount > 0">{{ unreadCount }} sin leer</span>
    </div>

    <div class="table-card">
      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="records.length === 0" class="state-msg">No hay consultas aún.</div>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in records" :key="r.id" :class="{ 'row-unread': !r.read }">
            <td>{{ formatDate(r.submitted_at) }}</td>
            <td><strong>{{ r.name }}</strong></td>
            <td>
              <a :href="`mailto:${r.email}`" class="email-link">{{ r.email }}</a>
              <span v-if="r.phone" class="sub">{{ r.phone }}</span>
            </td>
            <td>{{ r.type || '—' }}</td>
            <td>{{ r.service || '—' }}</td>
            <td>
              <span :class="['badge', r.read ? 'badge-no' : 'badge-yes']">
                {{ r.read ? 'Leído' : 'Nuevo' }}
              </span>
            </td>
            <td class="actions">
              <button class="btn-edit" @click="openDetail(r)">Ver</button>
              <button v-if="!r.read" class="btn-edit" @click="markRead(r)">Marcar leído</button>
              <button class="btn-delete" @click="deleteRecord(r.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal detalle -->
    <div v-if="selected" class="modal-overlay" @click.self="selected = null">
      <div class="modal">
        <div class="detail-header">
          <div>
            <h2 class="modal-title">{{ selected.name }}</h2>
            <a :href="`mailto:${selected.email}`" class="email-link">{{ selected.email }}</a>
            <span v-if="selected.phone" class="sub"> · {{ selected.phone }}</span>
          </div>
          <button class="btn-secondary" @click="selected = null">Cerrar</button>
        </div>
        <div class="detail-meta">
          <span v-if="selected.type"><strong>Tipo:</strong> {{ selected.type }}</span>
          <span v-if="selected.service"><strong>Servicio:</strong> {{ selected.service }}</span>
          <span><strong>Fecha:</strong> {{ formatDate(selected.submitted_at) }}</span>
        </div>
        <div class="detail-message">
          <h4>Mensaje</h4>
          <p>{{ selected.message }}</p>
        </div>
        <div class="modal-actions">
          <a :href="`mailto:${selected.email}?subject=Re: Consulta AGHR`" class="btn-primary">
            Responder por email
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const records = ref([])
const loading = ref(true)
const selected = ref(null)

const unreadCount = computed(() => records.value.filter(r => !r.read).length)

const fetch = async () => {
  loading.value = true
  const { data } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('submitted_at', { ascending: false })
  records.value = data || []
  loading.value = false
}

const openDetail = async (record) => {
  selected.value = record
  if (!record.read) await markRead(record)
}

const markRead = async (record) => {
  await supabase.from('contact_submissions').update({ read: true }).eq('id', record.id)
  record.read = true
}

const deleteRecord = async (id) => {
  if (!confirm('¿Eliminar esta consulta?')) return
  await supabase.from('contact_submissions').delete().eq('id', id)
  await fetch()
}

const formatDate = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

onMounted(fetch)
</script>

<style scoped src="./admin.css"></style>

<style scoped>
.unread-badge {
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 700;
}

.row-unread td { background: #fefce8; }
.row-unread:hover td { background: #fef9c3; }

.email-link {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
}
.email-link:hover { text-decoration: underline; }

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.detail-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  font-size: 0.9375rem;
  color: #64748b;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  margin-bottom: 1.25rem;
}

.detail-message h4 {
  font-size: 0.875rem;
  font-weight: 700;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.detail-message p {
  color: #334155;
  line-height: 1.7;
  white-space: pre-wrap;
}

.modal-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
}

.modal-actions a {
  text-decoration: none;
}
</style>
