<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Clientes</h1>
      <button class="btn-primary" @click="openForm(null)">+ Nuevo</button>
    </div>

    <div class="table-card">
      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="records.length === 0" class="state-msg">No hay clientes aún.</div>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Nombre</th>
            <th>Orden</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in records" :key="r.id">
            <td><img v-if="r.logo_url" :src="r.logo_url" :alt="r.name" style="height:40px;object-fit:contain;" /></td>
            <td>{{ r.name }}</td>
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
        <h2 class="modal-title">{{ editing ? 'Editar' : 'Nuevo' }} Cliente</h2>
        <form @submit.prevent="saveRecord" class="modal-form">
          <div class="form-group">
            <label>Nombre *</label>
            <input v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>URL del Logo</label>
            <input v-model="form.logo_url" placeholder="https://..." />
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
const form = reactive({ name: '', logo_url: '', display_order: 0, active: true })

const fetch = async () => {
  loading.value = true
  const { data } = await supabase.from('clients').select('*').order('display_order')
  records.value = data || []
  loading.value = false
}

const openForm = (record) => {
  editing.value = record
  formError.value = ''
  Object.assign(form, record ? { name: record.name, logo_url: record.logo_url || '', display_order: record.display_order, active: record.active } : { name: '', logo_url: '', display_order: 0, active: true })
  showForm.value = true
}

const closeForm = () => { showForm.value = false; editing.value = null }

const saveRecord = async () => {
  saving.value = true
  formError.value = ''
  const { error } = editing.value
    ? await supabase.from('clients').update({ ...form }).eq('id', editing.value.id)
    : await supabase.from('clients').insert({ ...form })
  if (error) { formError.value = error.message } else { closeForm(); await fetch() }
  saving.value = false
}

const deleteRecord = async (id) => {
  if (!confirm('¿Eliminar este cliente?')) return
  await supabase.from('clients').delete().eq('id', id)
  await fetch()
}

onMounted(fetch)
</script>

<style scoped src="./admin.css"></style>
