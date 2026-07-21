const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'images');

async function compressImage(file, width) {
  const filePath = path.join(imgDir, file);
  const tempPath = path.join(imgDir, `temp_${file}`);
  
  try {
    console.log(`Compressing ${file}...`);
    let pipeline = sharp(filePath);
    
    if (width) {
      pipeline = pipeline.resize(width, null, { withoutEnlargement: true });
    }
    
    await pipeline
      .webp({ quality: 80, effort: 6 })
      .toFile(tempPath);
      
    // Replace original
    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);
    console.log(`Successfully compressed ${file}`);
  } catch (err) {
    console.error(`Error compressing ${file}:`, err);
  }
}

async function main() {
  await compressImage('yeni_magaza.webp', 1920);
  await compressImage('yeni_magaza_mobil.webp', 800);
  await compressImage('yeni_magaza.png', 1920);
  
  // Compress other large images
  const files = fs.readdirSync(imgDir);
  for (const file of files) {
    if (file === 'yeni_magaza.webp' || file === 'yeni_magaza_mobil.webp' || file === 'yeni_magaza.png') continue;
    
    if (file.endsWith('.png') || file.endsWith('.webp') || file.endsWith('.jpg')) {
      const stat = fs.statSync(path.join(imgDir, file));
      if (stat.size > 500 * 1024) { // over 500 KB
        await compressImage(file, 1200);
      }
    }
  }
}

main();
