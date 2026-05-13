import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function optimizePosters() {
  console.log('🎬 Optimizando posters de videos...\n');

  const postersDir = join(__dirname, 'src/assets/images/video_posters');

  // Verificar si existe el directorio
  if (!fs.existsSync(postersDir)) {
    console.log('⚠️  El directorio de posters no existe.');
    console.log('   Primero ejecuta: optimize-videos.bat\n');
    return;
  }

  const posters = [
    'video_oficina_poster.jpg',
    'video_estrechar_manos_poster.jpg'
  ];

  for (const poster of posters) {
    const inputPath = join(postersDir, poster);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${poster} no encontrado, saltando...\n`);
      continue;
    }

    const outputPath = join(postersDir, poster.replace('.jpg', '_optimized.jpg'));
    const webpPath = join(postersDir, poster.replace('.jpg', '.webp'));

    try {
      console.log(`📸 Optimizando ${poster}...`);

      // Versión JPG optimizada
      await sharp(inputPath)
        .resize(1920, 1080, { fit: 'cover' })
        .jpeg({ quality: 80, progressive: true })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size / 1024;
      const optimizedSize = fs.statSync(outputPath).size / 1024;

      console.log(`  ✅ JPG optimizado: ${originalSize.toFixed(0)}KB → ${optimizedSize.toFixed(0)}KB`);
      console.log(`  💾 Ahorro: ${(originalSize - optimizedSize).toFixed(0)}KB (${((1 - optimizedSize/originalSize) * 100).toFixed(1)}%)\n`);

      // Versión WebP
      await sharp(inputPath)
        .resize(1920, 1080, { fit: 'cover' })
        .webp({ quality: 75 })
        .toFile(webpPath);

      const webpSize = fs.statSync(webpPath).size / 1024;
      console.log(`  🌐 WebP creado: ${webpSize.toFixed(0)}KB`);
      console.log(`  💾 Ahorro vs original: ${(originalSize - webpSize).toFixed(0)}KB (${((1 - webpSize/originalSize) * 100).toFixed(1)}%)\n`);

    } catch (error) {
      console.error(`❌ Error optimizando ${poster}:`, error.message);
    }
  }

  console.log('✨ ¡Optimización de posters completada!\n');
  console.log('📝 Próximos pasos:');
  console.log('  1. Verifica los posters en: src/assets/images/video_posters/');
  console.log('  2. Actualiza VideoBackground.vue para usar los posters');
  console.log('  3. Ejecuta: npm run build\n');
}

optimizePosters().catch(console.error);
