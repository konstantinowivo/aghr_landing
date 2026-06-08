<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Testimonios</h1>
      <button class="btn-primary" @click="openForm(null)">+ Nuevo</button>
    </div>

    <div class="table-card">
      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="records.length === 0" class="state-msg">No hay testimonios aún.</div>
      <template v-else>
        <!-- Desktop table -->
        <table v-if="!isMobile" class="data-table">
          <thead>
            <tr>
              <th>Autor</th>
              <th>Empresa</th>
              <th>Rating</th>
              <th>Destacado</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in records" :key="r.id">
              <td>
                <strong>{{ r.author_name }}</strong>
                <span class="sub">{{ r.author_role }}</span>
              </td>
              <td>{{ r.author_company }}</td>
              <td>{{ '★'.repeat(r.rating) }}</td>
              <td><span :class="['badge', r.featured ? 'badge-yes' : 'badge-no']">{{ r.featured ? 'Sí' : 'No' }}</span></td>
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
              <div>
                <strong class="card-name">{{ r.author_name }}</strong>
                <div class="card-meta">{{ r.author_role }}</div>
              </div>
              <span :class="['badge', r.active ? 'badge-yes' : 'badge-no']">{{ r.active ? 'Activo' : 'Inactivo' }}</span>
            </div>
            <div v-if="r.author_company" class="card-meta">{{ r.author_company }}</div>
            <div class="card-meta">
              {{ '★'.repeat(r.rating) }}
              <span v-if="r.featured" style="margin-left:0.5rem;" class="badge badge-yes">Destacado</span>
            </div>
            <div class="card-actions">
              <button class="btn-edit" @click="openForm(r)">Editar</button>
              <button class="btn-delete" @click="deleteRecord(r.id)">Eliminar</button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Modal -->
    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal">
        <h2 class="modal-title">{{ editing ? 'Editar' : 'Nuevo' }} Testimonio</h2>
        <form @submit.prevent="saveRecord" class="modal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nombre *</label>
              <input v-model="form.author_name" required />
            </div>
            <div class="form-group">
              <label>Rol</label>
              <input v-model="form.author_role" />
            </div>
          </div>
          <div class="form-group">
            <label>Empresa</label>
            <input v-model="form.author_company" />
          </div>
          <div class="form-group">
            <label>Testimonio *</label>
            <textarea v-model="form.quote" rows="4" required></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Rating (1-5)</label>
              <input v-model.number="form.rating" type="number" min="1" max="5" />
            </div>
            <div class="form-group checkboxes">
              <label><input type="checkbox" v-model="form.featured" /> Destacado</label>
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

const form = reactive({ author_name: '', author_role: '', author_company: '', quote: '', rating: 5, featured: false, active: true })

const fetch = async () => {
  loading.value = true
  const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
  records.value = data || []
  loading.value = false
}

const openForm = (record) => {
  editing.value = record
  formError.value = ''
  if (record) {
    Object.assign(form, { author_name: record.author_name, author_role: record.author_role || '', author_company: record.author_company || '', quote: record.quote, rating: record.rating, featured: record.featured, active: record.active })
  } else {
    Object.assign(form, { author_name: '', author_role: '', author_company: '', quote: '', rating: 5, featured: false, active: true })
  }
  showForm.value = true
}

const closeForm = () => { showForm.value = false; editing.value = null }

const saveRecord = async () => {
  saving.value = true
  formError.value = ''
  const payload = { ...form }
  const { error } = editing.value
    ? await supabase.from('testimonials').update(payload).eq('id', editing.value.id)
    : await supabase.from('testimonials').insert(payload)
  if (error) { formError.value = error.message } else { closeForm(); await fetch() }
  saving.value = false
}

const deleteRecord = async (id) => {
  if (!confirm('¿Eliminar este testimonio?')) return
  await supabase.from('testimonials').delete().eq('id', id)
  await fetch()
}

onMounted(fetch)
</script>

<style scoped src="./admin.css"></style>
