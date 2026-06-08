<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Empleos</h1>
      <button class="btn-primary" @click="openForm(null)">+ Nuevo</button>
    </div>

    <div class="filters-bar">
      <input v-model="search" class="filter-input" placeholder="Buscar por título o empresa..." />
      <select v-model="filterStatus" class="filter-select">
        <option value="all">Todos los estados</option>
        <option value="published">Publicado</option>
        <option value="draft">Borrador</option>
        <option value="closed">Cerrado</option>
      </select>
      <select v-model="filterType" class="filter-select">
        <option value="all">Todos los tipos</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contrato</option>
        <option value="internship">Pasantía</option>
      </select>
    </div>

    <div class="table-card">
      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="filtered.length === 0" class="state-msg">No hay empleos que coincidan.</div>
      <template v-else>
        <!-- Desktop table -->
        <table v-if="!isMobile" class="data-table">
          <thead>
            <tr>
              <th>Posición</th>
              <th>Empresa</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Publicado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in filtered" :key="r.id">
              <td>
                <strong>{{ r.title }}</strong>
                <span class="sub">{{ r.location }}</span>
              </td>
              <td>{{ r.company }}</td>
              <td>{{ r.type }}</td>
              <td><span :class="['badge', r.status === 'published' ? 'badge-yes' : 'badge-no']">{{ r.status }}</span></td>
              <td>{{ r.published_at ? new Date(r.published_at).toLocaleDateString('es-AR') : '—' }}</td>
              <td class="actions">
                <button class="btn-edit" @click="openForm(r)">Editar</button>
                <button class="btn-delete" @click="deleteRecord(r.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile cards -->
        <div v-else class="mobile-cards">
          <div v-for="r in filtered" :key="r.id" class="mobile-card">
            <div class="card-top">
              <strong class="card-name">{{ r.title }}</strong>
              <span :class="['badge', r.status === 'published' ? 'badge-yes' : 'badge-no']">
                {{ r.status }}
              </span>
            </div>
            <div class="card-meta">{{ r.company }}<span v-if="r.location"> · {{ r.location }}</span></div>
            <div class="card-meta">
              {{ r.type }}<span v-if="r.category"> · {{ r.category }}</span>
            </div>
            <div class="card-date">
              {{ r.published_at ? new Date(r.published_at).toLocaleDateString('es-AR') : 'Sin publicar' }}
            </div>
            <div class="card-actions">
              <button class="btn-edit" @click="openForm(r)">Editar</button>
              <button class="btn-delete" @click="deleteRecord(r.id)">Eliminar</button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal">
        <h2 class="modal-title">{{ editing ? 'Editar' : 'Nuevo' }} Empleo</h2>
        <form @submit.prevent="saveRecord" class="modal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Título / Posición *</label>
              <input v-model="form.title" required />
            </div>
            <div class="form-group">
              <label>Empresa *</label>
              <input v-model="form.company" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Ubicación</label>
              <input v-model="form.location" />
            </div>
            <div class="form-group">
              <label>Rubro / Industria</label>
              <input v-model="form.industry" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Tipo</label>
              <select v-model="form.type">
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contrato</option>
                <option value="internship">Pasantía</option>
              </select>
            </div>
            <div class="form-group">
              <label>Categoría</label>
              <input v-model="form.category" placeholder="rrhh, gerencia..." />
            </div>
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="form.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Requisitos</label>
            <textarea v-model="form.requirements" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Beneficios</label>
            <textarea v-model="form.benefits" rows="3"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Rango salarial</label>
              <input v-model="form.salary_range" placeholder="Ej: $500.000 - $700.000" />
            </div>
            <div class="form-group">
              <label>Contacto</label>
              <input v-model="form.contact_info" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Estado</label>
              <select v-model="form.status">
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
                <option value="closed">Cerrado</option>
              </select>
            </div>
            <div class="form-group">
              <label>Expira el</label>
              <input v-model="form.expires_at" type="date" />
            </div>
          </div>
          <p v-if="formError" class="form-error">{{ formError }}</p>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="closeForm">Cancelar</button>
            <button type="submit" class="btn-primary" :disabled="saving">{{ saving ? 'Guardando...' : 'Guardar' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useIsMobile } from '@/composables/useIsMobile'

const { isMobile } = useIsMobile()

const records = ref([])
const loading = ref(true)
const search = ref('')
const filterStatus = ref('all')
const filterType = ref('all')

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  return records.value.filter(r => {
    if (filterStatus.value !== 'all' && r.status !== filterStatus.value) return false
    if (filterType.value !== 'all' && r.type !== filterType.value) return false
    if (q && !r.title?.toLowerCase().includes(q) && !r.company?.toLowerCase().includes(q)) return false
    return true
  })
})
const showForm = ref(false)
const editing = ref(null)
const saving = ref(false)
const formError = ref('')
const form = reactive({ title: '', company: '', location: '', industry: '', type: 'full-time', category: '', description: '', requirements: '', benefits: '', salary_range: '', contact_info: '', status: 'draft', expires_at: '' })

const fetch = async () => {
  loading.value = true
  const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
  records.value = data || []
  loading.value = false
}

const openForm = (record) => {
  editing.value = record
  formError.value = ''
  if (record) {
    Object.assign(form, { title: record.title, company: record.company, location: record.location || '', industry: record.industry || '', type: record.type, category: record.category || '', description: record.description || '', requirements: record.requirements || '', benefits: record.benefits || '', salary_range: record.salary_range || '', contact_info: record.contact_info || '', status: record.status, expires_at: record.expires_at ? record.expires_at.slice(0, 10) : '' })
  } else {
    Object.assign(form, { title: '', company: '', location: '', industry: '', type: 'full-time', category: '', description: '', requirements: '', benefits: '', salary_range: '', contact_info: '', status: 'draft', expires_at: '' })
  }
  showForm.value = true
}

const closeForm = () => { showForm.value = false; editing.value = null }

const saveRecord = async () => {
  saving.value = true
  formError.value = ''
  const payload = { ...form, published_at: form.status === 'published' ? new Date().toISOString() : null, expires_at: form.expires_at || null }
  const { error } = editing.value
    ? await supabase.from('jobs').update(payload).eq('id', editing.value.id)
    : await supabase.from('jobs').insert(payload)
  if (error) { formError.value = error.message } else { closeForm(); await fetch() }
  saving.value = false
}

const deleteRecord = async (id) => {
  if (!confirm('¿Eliminar este empleo?')) return
  await supabase.from('jobs').delete().eq('id', id)
  await fetch()
}

onMounted(fetch)
</script>

<style scoped src="./admin.css"></style>
