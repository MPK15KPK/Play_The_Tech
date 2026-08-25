import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

async function run() {
  console.log('Optimizing logo...')
  // 1. Create high quality WebP for logo (80x80 crisp on 38px/40px retina)
  await sharp('public/icon-512x512.png')
    .resize(80, 80, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 95, effort: 6 })
    .toFile('public/logo.webp')

  // 2. Create optimized PNG for logo (80x80 crisp on 38px/40px retina)
  await sharp('public/icon-512x512.png')
    .resize(80, 80, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile('public/logo.png')

  console.log('Logo webp size:', fs.statSync('public/logo.webp').size, 'bytes')
  console.log('Logo png size:', fs.statSync('public/logo.png').size, 'bytes')

  // 3. Create WebP versions for all comparison images in public/images
  const imgDir = 'public/images'
  const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.jpg'))
  for (const f of files) {
    const name = f.replace('.jpg', '')
    const inPath = path.join(imgDir, f)
    const outPath = path.join(imgDir, `${name}.webp`)
    await sharp(inPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outPath)
    console.log(`Generated ${outPath} (${fs.statSync(outPath).size} bytes)`)
  }
}

run().catch(console.error)
