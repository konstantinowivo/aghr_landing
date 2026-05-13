import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function optimizeImages() {
  console.log('🎨 Iniciando optimización de imágenes...\n');

  // Optimizar ag_foto.png: reducir de 2048x2048 a 800x800 y crear versión WebP
  const fotoPath = join(__dirname, 'src/assets/images/foto/ag_foto.png');
  const fotoOutputPath = join(__dirname, 'src/assets/images/foto/ag_foto_optimized.png');
  const fotoWebPPath = join(__dirname, 'src/assets/images/foto/ag_foto.webp');

  try {
    console.log('📸 Optimizando ag_foto.png...');

    // Crear versión PNG optimizada (800x800)
    await sharp(fotoPath)
      .resize(800, 800, { fit: 'cover' })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(fotoOutputPath);

    const fotoOriginalSize = fs.statSync(fotoPath).size / 1024 / 1024;
    const fotoOptimizedSize = fs.statSync(fotoOutputPath).size / 1024 / 1024;

    console.log(`  ✅ PNG optimizado: ${fotoOriginalSize.toFixed(2)}MB → ${fotoOptimizedSize.toFixed(2)}MB`);
    console.log(`  💾 Ahorro: ${(fotoOriginalSize - fotoOptimizedSize).toFixed(2)}MB (${((1 - fotoOptimizedSize/fotoOriginalSize) * 100).toFixed(1)}%)\n`);

    // Crear versión WebP
    await sharp(fotoPath)
      .resize(800, 800, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(fotoWebPPath);

    const fotoWebPSize = fs.statSync(fotoWebPPath).size / 1024 / 1024;
    console.log(`  🌐 WebP creado: ${fotoWebPSize.toFixed(2)}MB`);
    console.log(`  💾 Ahorro vs original: ${(fotoOriginalSize - fotoWebPSize).toFixed(2)}MB (${((1 - fotoWebPSize/fotoOriginalSize) * 100).toFixed(1)}%)\n`);

  } catch (error) {
    console.error('❌ Error optimizando ag_foto.png:', error.message);
  }

  // Optimizar aghr_logo.png: reducir de 1024x1536 a 512x768 y crear versión WebP
  const logoPath = join(__dirname, 'src/assets/images/logo/aghr_logo.png');
  const logoOutputPath = join(__dirname, 'src/assets/images/logo/aghr_logo_optimized.png');
  const logoWebPPath = join(__dirname, 'src/assets/images/logo/aghr_logo.webp');

  try {
    console.log('🏢 Optimizando aghr_logo.png...');

    // Crear versión PNG optimizada (512x768)
    await sharp(logoPath)
      .resize(512, 768, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(logoOutputPath);

    const logoOriginalSize = fs.statSync(logoPath).size / 1024 / 1024;
    const logoOptimizedSize = fs.statSync(logoOutputPath).size / 1024 / 1024;

    console.log(`  ✅ PNG optimizado: ${logoOriginalSize.toFixed(2)}MB → ${logoOptimizedSize.toFixed(2)}MB`);
    console.log(`  💾 Ahorro: ${(logoOriginalSize - logoOptimizedSize).toFixed(2)}MB (${((1 - logoOptimizedSize/logoOriginalSize) * 100).toFixed(1)}%)\n`);

    // Crear versión WebP
    await sharp(logoPath)
      .resize(512, 768, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90 })
      .toFile(logoWebPPath);

    const logoWebPSize = fs.statSync(logoWebPPath).size / 1024 / 1024;
    console.log(`  🌐 WebP creado: ${logoWebPSize.toFixed(2)}MB`);
    console.log(`  💾 Ahorro vs original: ${(logoOriginalSize - logoWebPSize).toFixed(2)}MB (${((1 - logoWebPSize/logoOriginalSize) * 100).toFixed(1)}%)\n`);

  } catch (error) {
    console.error('❌ Error optimizando aghr_logo.png:', error.message);
  }

  console.log('✨ ¡Optimización completada!\n');
  console.log('📝 Notas:');
  console.log('  - Las imágenes originales se mantienen intactas');
  console.log('  - Los archivos *_optimized.png y *.webp son las versiones optimizadas');
  console.log('  - Recomendación: Usar SVG para el logo (aghr_logo.svg - 10KB)');
}

optimizeImages().catch(console.error);
