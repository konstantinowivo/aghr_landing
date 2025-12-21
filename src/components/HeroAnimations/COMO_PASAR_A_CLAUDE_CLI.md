# Cómo Pasar el Documento a Claude por CLI

## OPCIÓN 1: Usando Claude CLI (Recomendado)

Asume que tienes instalado `claude` CLI. Si no, instala con:
```bash
npm install -g @anthropic-ai/sdk
```

### Comando para pasar el documento completo

```bash
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude
```

O más explícitamente:

```bash
claude -m claude-opus-4.1 < DOCUMENTO_COMPLETO_CLAUDE_CLI.md
```

---

## OPCIÓN 2: Con un prompt contextual específico

```bash
echo "Necesito que implementes estas 4 animaciones SVG para mis pages de Hero. Lee el documento adjunto y:

1. Explica qué va a pasar visualmente en cada página
2. Confirma que entiendes la estructura (z-index: 0, decorativas)
3. Pregunta si hay algo que deba modificar antes de que las integre

Documento:" && cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude
```

---

## OPCIÓN 3: Para pedir ajustes específicos

```bash
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "Dado el proyecto AGHR con estas 4 animaciones:

1. ¿Qué cambios haría para que las animaciones fueran más sutiles (menos visibles)?
2. ¿Cómo podría hacer que sean más rápidas (entrada en 1.2s en lugar de 2s)?
3. ¿Hay algún problema de performance que deba considerar?
4. ¿Qué debería testear para asegurar que funciona correctamente?"
```

---

## OPCIÓN 4: Para integración completa

```bash
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "Soy Ivo, desarrollador web con 3+ años de experiencia en MERN/Vue.js. Necesito:

1. Revisar si estos componentes están correctamente estructurados para Vue 3 + Vite
2. Sugerir mejoras en performance o accesibilidad
3. Proporcionar comandos bash para crear la estructura de carpetas e integrar
4. Listame los pasos exactos que debo seguir para implementar en mi proyecto AGHR"
```

---

## OPCIÓN 5: Si usas PowerShell (Windows)

```powershell
Get-Content DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude
```

O:

```powershell
$content = Get-Content DOCUMENTO_COMPLETO_CLAUDE_CLI.md -Raw
claude "Basándote en este documento: `n`n$content`n`nConfirma que entiendes qué hacer"
```

---

## OPCIÓN 6: Para pasar a través de API (Node.js)

Si prefieres usar la API directamente en Node:

```javascript
const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic();
const documentContent = fs.readFileSync(
  path.join(__dirname, 'DOCUMENTO_COMPLETO_CLAUDE_CLI.md'),
  'utf-8'
);

async function processDocument() {
  const message = await client.messages.create({
    model: "claude-opus-4.1",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Necesito implementar estas animaciones para mi proyecto AGHR (Vue.js 3 + Vite).

Documento:

${documentContent}

Por favor:
1. Resume qué debe hacer cada animación
2. Confirma que la estructura es correcta
3. Proporciona los pasos exactos para implementar`
      }
    ]
  });

  console.log(message.content[0].text);
}

processDocument().catch(console.error);
```

---

## CÓMO USAR EN DIFERENTES ESCENARIOS

### Escenario A: Necesito validar que entendí todo

```bash
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "¿Entiendes exactamente qué necesito? Resume en 5 puntos principales."
```

### Escenario B: Necesito que me ayude con la integración

```bash
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "Soy desarrollador Vue 3. Proporcioname los comandos bash exactos para:
1. Crear la carpeta src/components/HeroAnimations
2. Copiar los 4 archivos
3. Actualizar las 4 páginas (servicios, nosotros, búsquedas, contacto)"
```

### Escenario C: Tengo un problema específico

```bash
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "Las animaciones no se ven en mi mobile. 
Dada esta estructura de componentes, ¿cuál podría ser el problema?
¿Cómo lo debuggeo?"
```

### Escenario D: Quiero personalizar

```bash
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "Quiero que todas las animaciones sean:
- 40% más rápidas
- 50% más sutiles (opacidad)
- Mismo timing function

Proporciona los cambios exactos que debo hacer en cada archivo"
```

### Escenario E: Necesito testing

```bash
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "Dame un plan de testing para estas animaciones:
- Desktop (Chrome, Firefox, Safari)
- Mobile (iOS, Android)
- Accesibilidad (prefers-reduced-motion)
- Performance (DevTools)"
```

---

## ESTRUCTURA DEL DIRECTORIO ESPERADO

Después de implementar, tu proyecto debería verse así:

```
src/
├── components/
│   └── HeroAnimations/
│       ├── HeroServiciosAnimation.vue
│       ├── HeroNosotrosAnimation.vue
│       ├── HeroBusquedasAnimation.vue
│       └── HeroContactoAnimation.vue
│
├── pages/
│   ├── Servicios.vue (con HeroServiciosAnimation)
│   ├── Nosotros.vue (con HeroNosotrosAnimation)
│   ├── Busquedas.vue (con HeroBusquedasAnimation)
│   └── Contacto.vue (con HeroContactoAnimation)
│
└── ...
```

---

## VERIFICACIÓN POST-INTEGRACIÓN

Después de implementar, verifica con:

```bash
# 1. Verificar que los archivos existen
ls -la src/components/HeroAnimations/

# 2. Testear que la build compila sin errores
npm run build

# 3. Testear en desarrollo
npm run dev
# Abre http://localhost:5173/servicios, /nosotros, /busquedas, /contacto

# 4. Verificar tamaño de bundle
npm run build
# Busca "HeroAnimations" en el output
```

---

## PROMPTS ESPECÍFICOS POR TAREA

### Si necesitas que Claude genere código adicional

```bash
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "Necesito:
1. Un componente Vue 3 que permita cambiar la opacidad de las animaciones
2. Un hook para desactivar animaciones si prefers-reduced-motion
3. Un ejemplo de cómo hacer que las animaciones se ejecuten solo una vez por sesión

Código listo para producción, por favor."
```

### Si necesitas documentación adicional

```bash
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "Genera:
1. Documentación para otros desarrolladores
2. Tabla de comparación visual entre las 4 animaciones
3. Guía de troubleshooting expandida
4. Casos de uso y mejores prácticas"
```

### Si necesitas migrar a otra tecnología

```bash
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "¿Cómo migro estas animaciones de CSS puro a:
1. GSAP
2. Framer Motion
3. AOS (Animate On Scroll)

Proporciona ejemplos de código para cada una"
```

---

## TIPS ÚTILES

### Piping (encadenar comandos)

```bash
# Pasar documento + hacer pregunta específica
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "Resume en 3 puntos" > resumen.txt

# Guardar respuesta
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "Código final" > codigo-final.md

# Verificar si Claude entiende
cat DOCUMENTO_COMPLETO_CLAUDE_CLI.md | claude "¿Está todo claro?" | grep -i "sí\|entiendo"
```

### Si usas Windows (PowerShell)

```powershell
# Convertir archivo a string y pasar a Claude
$doc = Get-Content "DOCUMENTO_COMPLETO_CLAUDE_CLI.md" -Raw
$doc | claude

# O guardar directamente
Get-Content "DOCUMENTO_COMPLETO_CLAUDE_CLI.md" | claude | Out-File -Encoding UTF8 respuesta.md
```

### Si quieres automatizar completamente

```bash
#!/bin/bash

# Script para implementar automáticamente
COMPONENT_DIR="src/components/HeroAnimations"
mkdir -p $COMPONENT_DIR

echo "✅ Carpeta creada: $COMPONENT_DIR"

# Aquí irían los componentes Vue copiados

echo "✅ Componentes copiados"
echo "📖 Lee: DOCUMENTO_COMPLETO_CLAUDE_CLI.md para integrar en tus páginas"
```

---

## PRÓXIMOS PASOS

1. **Copiar este documento** a tu directorio de proyecto
2. **Ejecutar uno de los comandos** según tu necesidad
3. **Seguir las instrucciones** que Claude proporcione
4. **Implementar en tu proyecto**
5. **Testear en desktop y mobile**

¡Listo! Ya puedes pasar el documento a Claude por CLI.

