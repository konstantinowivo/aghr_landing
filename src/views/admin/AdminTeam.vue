<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Equipo</h1>
      <button class="btn-primary" @click="openForm(null)">+ Nuevo</button>
    </div>

    <div class="table-card">
      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="records.length === 0" class="state-msg">No hay miembros aún.</div>
      <template v-else>
        <!-- Desktop table -->
        <table v-if="!isMobile" class="data-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Categoría</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in records" :key="r.id">
              <td><img v-if="r.photo_url" :src="r.photo_url" :alt="r.name" style="width:40px;height:40px;border-radius:50%;object-fit:cover;" /></td>
              <td><strong>{{ r.name }}</strong></td>
              <td>{{ r.role }}</td>
              <td><span class="badge badge-yes">{{ r.category }}</span></td>
              <td><span :class="['badge', r.active ? 'badge-yes' : 'badge-no']">{{ r.active ? 'Sí' : 'No' }}</span></td>
              <td class="actions">
                <button class="btn-edit" @click="openForm(r)">Editar</button>
                <button class="btn-delete" @click="deleteRecord(r.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile cards -->
        <div v-else class="mobile-cards">
          <div v-for="r in records" :key="r.id" class="mobile-card">
            <div class="card-top">
              <div style="display:flex;align-items:center;gap:0.625rem;">
                <img v-if="r.photo_url" :src="r.photo_url" :alt="r.name" class="card-thumb" />
                <strong class="card-name">{{ r.name }}</strong>
              </div>
              <span :class="['badge', r.active ? 'badge-yes' : 'badge-no']">{{ r.active ? 'Activo' : 'Inactivo' }}</span>
            </div>
            <div class="card-meta">{{ r.role }}</div>
            <div class="card-meta"><span class="badge badge-yes">{{ r.category }}</span></div>
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
        <h2 class="modal-title">{{ editing ? 'Editar' : 'Nuevo' }} Miembro</h2>
        <form @submit.prevent="saveRecord" class="modal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nombre *</label>
              <input v-model="form.name" required />
            </div>
            <div class="form-group">
              <label>Categoría *</label>
              <select v-model="form.category" required>
                <option value="founding">Fundadora</option>
                <option value="mentoring">Mentoring</option>
                <option value="brand">Marca</option>
                <option value="tech">Tech</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Rol / Título *</label>
            <input v-model="form.role" required />
          </div>
          <div class="form-group">
            <label>Biografía (un párrafo por línea)</label>
            <textarea v-model="bioText" rows="4" placeholder="Párrafo 1&#10;Párrafo 2"></textarea>
          </div>
          <div class="form-group">
            <label>Credenciales (una por línea)</label>
            <textarea v-model="credText" rows="4" placeholder="Licenciado en...&#10;Coach certificado..."></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>URL Foto</label>
              <input v-model="form.photo_url" placeholder="https://..." />
            </div>
            <div class="form-group">
              <label>URL Foto WebP</label>
              <input v-model="form.photo_webp_url" placeholder="https://..." />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Orden</label>
              <input v-model.number="form.display_order" type="number" min="0" />
            </div>
            <div class="form-group checkboxes">
              <label><input type="checkbox" v-model="form.active" /> Activo</label>
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
import { ref, reactive, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useIsMobile } from '@/composables/useIsMobile'

const { isMobile } = useIsMobile()

const records = ref([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref(null)
const saving = ref(false)
const formError = ref('')
const bioText = ref('')
const credText = ref('')
const form = reactive({ name: '', role: '', category: 'mentoring', photo_url: '', photo_webp_url: '', display_order: 0, active: true })

const fetch = async () => {
  loading.value = true
  const { data } = await supabase.from('team_members').select('*').order('display_order')
  records.value = data || []
  loading.value = false
}

const openForm = (record) => {
  editing.value = record
  formError.value = ''
  if (record) {
    Object.assign(form, { name: record.name, role: record.role, category: record.category, photo_url: record.photo_url || '', photo_webp_url: record.photo_webp_url || '', display_order: record.display_order, active: record.active })
    bioText.value = (record.bio || []).join('\n')
    credText.value = (record.credentials || []).join('\n')
  } else {
    Object.assign(form, { name: '', role: '', category: 'mentoring', photo_url: '', photo_webp_url: '', display_order: 0, active: true })
    bioText.value = ''
    credText.value = ''
  }
  showForm.value = true
}

const closeForm = () => { showForm.value = false; editing.value = null }

const saveRecord = async () => {
  saving.value = true
  formError.value = ''
  const payload = {
    ...form,
    bio: bioText.value.split('\n').map(s => s.trim()).filter(Boolean),
    credentials: credText.value.split('\n').map(s => s.trim()).filter(Boolean)
  }
  const { error } = editing.value
    ? await supabase.from('team_members').update(payload).eq('id', editing.value.id)
    : await supabase.from('team_members').insert(payload)
  if (error) { formError.value = error.message } else { closeForm(); await fetch() }
  saving.value = false
}

const deleteRecord = async (id) => {
  if (!confirm('¿Eliminar este miembro?')) return
  await supabase.from('team_members').delete().eq('id', id)
  await fetch()
}

onMounted(fetch)
</script>

<style scoped src="./admin.css"></style>
