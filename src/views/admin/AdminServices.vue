<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Servicios</h1>
      <button class="btn-primary" @click="openForm(null)">+ Nuevo</button>
    </div>

    <div class="table-card">
      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="records.length === 0" class="state-msg">No hay servicios aún.</div>
      <template v-else>
        <!-- Desktop table -->
        <table v-if="!isMobile" class="data-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Orden</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in records" :key="r.id">
              <td>
                <img v-if="r.image_url" :src="r.image_url" alt="" class="card-thumb" style="border-radius:0.375rem;object-fit:cover;" />
                <span v-else style="color:#9ca3af;font-size:0.8rem;">—</span>
              </td>
              <td>
                <strong>{{ r.title }}</strong>
                <span class="sub">{{ r.description?.slice(0, 50) }}...</span>
              </td>
              <td><span :class="['badge', r.type === 'empresa' ? 'badge-yes' : 'badge-no']">{{ r.type }}</span></td>
              <td>{{ r.price ? `$ ${Number(r.price).toLocaleString('es-AR')}` : '—' }}</td>
              <td>{{ r.display_order }}</td>
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
              <div style="display:flex;align-items:center;gap:0.75rem;">
                <img v-if="r.image_url" :src="r.image_url" alt="" class="card-thumb" style="border-radius:0.375rem;object-fit:cover;" />
                <strong class="card-name">{{ r.title }}</strong>
              </div>
              <span :class="['badge', r.active ? 'badge-yes' : 'badge-no']">{{ r.active ? 'Activo' : 'Inactivo' }}</span>
            </div>
            <div class="card-meta">
              <span :class="['badge', r.type === 'empresa' ? 'badge-yes' : 'badge-no']">{{ r.type }}</span>
              <span style="margin-left:0.5rem;">Orden: {{ r.display_order }}</span>
              <span style="margin-left:0.5rem;font-weight:600;">{{ r.price ? `$ ${Number(r.price).toLocaleString('es-AR')}` : 'Sin precio' }}</span>
            </div>
            <div v-if="r.description" class="card-meta">{{ r.description.slice(0, 80) }}...</div>
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
            <label>Imagen del servicio</label>
            <input type="file" accept="image/*" @change="handleImageChange" />
            <div v-if="imagePreview" class="image-preview">
              <img :src="imagePreview" alt="Preview" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Precio (ARS)</label>
              <input v-model.number="form.price" type="number" min="0" step="1" placeholder="0" />
            </div>
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
const imageFile = ref(null)
const imagePreview = ref('')
const form = reactive({ title: '', type: 'empresa', description: '', icon_url: '', image_url: '', price: 0, display_order: 0, active: true })

const fetch = async () => {
  loading.value = true
  const { data } = await supabase.from('services').select('*').order('type').order('display_order')
  records.value = data || []
  loading.value = false
}

const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  imageFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}

const uploadImage = async (file) => {
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from('service-images').upload(fileName, file)
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage.from('service-images').getPublicUrl(fileName)
  return publicUrl
}

const openForm = (record) => {
  editing.value = record
  formError.value = ''
  imageFile.value = null
  imagePreview.value = record?.image_url || ''
  Object.assign(form, record
    ? { title: record.title, type: record.type, description: record.description || '', icon_url: record.icon_url || '', image_url: record.image_url || '', price: record.price || 0, display_order: record.display_order, active: record.active }
    : { title: '', type: 'empresa', description: '', icon_url: '', image_url: '', price: 0, display_order: 0, active: true }
  )
  showForm.value = true
}

const closeForm = () => { showForm.value = false; editing.value = null }

const saveRecord = async () => {
  saving.value = true
  formError.value = ''
  try {
    if (imageFile.value) {
      form.image_url = await uploadImage(imageFile.value)
    }
    const { error } = editing.value
      ? await supabase.from('services').update({ ...form }).eq('id', editing.value.id)
      : await supabase.from('services').insert({ ...form })
    if (error) throw error
    closeForm()
    await fetch()
  } catch (e) {
    formError.value = e.message
  }
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
