<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Contenido del Sitio</h1>
    </div>

    <div class="table-card">
      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else>
        <div v-for="group in groups" :key="group.label" class="content-group">
          <h3 class="group-title">{{ group.label }}</h3>
          <div v-for="item in group.keys" :key="item.key" class="content-row">
            <label class="content-label">{{ item.label }}</label>
            <div class="content-input-wrap">
              <textarea
                v-if="item.multiline"
                v-model="values[item.key]"
                class="content-input"
                rows="3"
              />
              <input v-else v-model="values[item.key]" class="content-input" />
              <button class="btn-save" @click="save(item.key)" :disabled="saving === item.key">
                {{ saving === item.key ? '✓' : 'Guardar' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const loading = ref(true)
const saving = ref(null)
const values = reactive({})

const groups = [
  {
    label: 'Hero',
    keys: [
      { key: 'hero_title', label: 'Título principal', multiline: false },
      { key: 'hero_subtitle', label: 'Subtítulo', multiline: true },
      { key: 'hero_primary_cta', label: 'Botón primario', multiline: false },
      { key: 'hero_secondary_cta', label: 'Botón secundario', multiline: false },
    ]
  },
  {
    label: 'Misión y Visión',
    keys: [
      { key: 'mission', label: 'Misión', multiline: true },
      { key: 'vision', label: 'Visión', multiline: true },
    ]
  },
  {
    label: 'Contacto',
    keys: [
      { key: 'contact_email', label: 'Email', multiline: false },
      { key: 'contact_phone', label: 'Teléfono (raw)', multiline: false },
      { key: 'contact_phone_display', label: 'Teléfono (display)', multiline: false },
      { key: 'contact_whatsapp', label: 'WhatsApp (número)', multiline: false },
      { key: 'contact_location', label: 'Ubicación', multiline: false },
    ]
  }
]

const fetch = async () => {
  loading.value = true
  const { data } = await supabase.from('site_content').select('key, value')
  data?.forEach(r => { values[r.key] = r.value })
  loading.value = false
}

const save = async (key) => {
  saving.value = key
  await supabase.from('site_content')
    .upsert({ key, value: values[key], updated_at: new Date().toISOString() }, { onConflict: 'key' })
  setTimeout(() => { saving.value = null }, 1500)
}

onMounted(fetch)
</script>

<style scoped src="./admin.css"></style>

<style scoped>
.content-group { padding: 1.5rem; border-bottom: 1px solid #f1f5f9; }
.content-group:last-child { border-bottom: none; }
.group-title { font-size: 0.875rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; }
.content-row { display: flex; flex-direction: column; gap: 0.375rem; margin-bottom: 1.25rem; }
.content-row:last-child { margin-bottom: 0; }
.content-label { font-size: 0.875rem; font-weight: 600; color: #374151; }
.content-input-wrap { display: flex; gap: 0.75rem; align-items: flex-start; }
.content-input { flex: 1; padding: 0.625rem 0.875rem; border: 2px solid #e2e8f0; border-radius: 0.5rem; font-size: 0.9375rem; font-family: inherit; resize: vertical; transition: border-color 0.2s; }
.content-input:focus { outline: none; border-color: #6366f1; }
.btn-save { padding: 0.625rem 1rem; background: #6366f1; color: white; border: none; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: all 0.2s; }
.btn-save:hover:not(:disabled) { background: #4f46e5; }
.btn-save:disabled { background: #10b981; }
</style>
