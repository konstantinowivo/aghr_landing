<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Servicios</h1>
      <button class="btn-primary" @click="openForm(null)">+ Nuevo</button>
    </div>

    <div class="table-card">
      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="records.length === 0" class="state-msg">No hay servicios aún.</div>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Tipo</th>
            <th>Orden</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in records" :key="r.id">
            <td>
              <strong>{{ r.title }}</strong>
              <span class="sub">{{ r.description?.slice(0, 60) }}...</span>
            </td>
            <td><span :class="['badge', r.type === 'empresa' ? 'badge-yes' : 'badge-no']">{{ r.type }}</span></td>
            <td>{{ r.display_order }}</td>
            <td><span :class="['badge', r.active ? 'badge-yes' : 'badge-no']">{{ r.active ? 'Sí' : 'No' }}</span></td>
            <td class="actions">
              <button class="btn-edit" @click="openForm(r)">Editar</button>
              <button class="btn-delete" @click="deleteRecord(r.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal">
        <h2 class="modal-title">{{ editing ? 'Editar' : 'Nuevo' }} Servicio</h2>
        <form @submit.prevent="saveRecord" class="modal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Título *</label>
              <input v-model="form.title" required />
            </div>
            <div class="form-group">
              <label>Tipo *</label>
              <select v-model="form.type" required>
                <option value="empresa">Empresa</option>
                <option value="persona">Persona</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="form.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>URL del Ícono</label>
            <input v-model="form.icon_url" placeholder="https://..." />
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

const records = ref([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref(null)
const saving = ref(false)
const formError = ref('')
const form = reactive({ title: '', type: 'empresa', description: '', icon_url: '', display_order: 0, active: true })

const fetch = async () => {
  loading.value = true
  const { data } = await supabase.from('services').select('*').order('type').order('display_order')
  records.value = data || []
  loading.value = false
}

const openForm = (record) => {
  editing.value = record
  formError.value = ''
  Object.assign(form, record ? { title: record.title, type: record.type, description: record.description || '', icon_url: record.icon_url || '', display_order: record.display_order, active: record.active } : { title: '', type: 'empresa', description: '', icon_url: '', display_order: 0, active: true })
  showForm.value = true
}

const closeForm = () => { showForm.value = false; editing.value = null }

const saveRecord = async () => {
  saving.value = true
  formError.value = ''
  const { error } = editing.value
    ? await supabase.from('services').update({ ...form }).eq('id', editing.value.id)
    : await supabase.from('services').insert({ ...form })
  if (error) { formError.value = error.message } else { closeForm(); await fetch() }
  saving.value = false
}

const deleteRecord = async (id) => {
  if (!confirm('¿Eliminar este servicio?')) return
  await supabase.from('services').delete().eq('id', id)
  await fetch()
}

onMounted(fetch)
</script>

<style scoped src="./admin.css"></style>
