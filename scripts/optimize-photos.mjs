import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const srcDir = path.resolve('data')
const destDir = path.resolve('public/photos')

const map = [
  ['Aerial_View_Cabana.png', 'aerial-cabana'],
  ['Akoya_Arial_Exterior_facilities.png', 'aerial-amenities'],
  ['akoya_logo.png', 'logo'],
  ['Bedroom2_Rug.png', 'bedroom-city'],
  ['Bedroom3_Rug.png', 'bedroom-ocean'],
  ['MainBedroom_Full_View_01.png', 'bedroom-main'],
  ['Living Room_5_View.png', 'living'],
  ['Office_0.png', 'office'],
  ['Office_5.jpg', 'office-alt'],
  ['B_001.jpg', 'terrace-walk'],
  ['B_002.jpg', 'pool-high'],
  ['B_003.png', 'pool-beach'],
  ['B_004.png', 'terrace-dining'],
  ['B_005.png', 'terrace-kitchen'],
  ['Cabana_Sofa.jpg', 'beach-house'],
  ['G_001.png', 'squash'],
  ['T_001.png', 'twilight'],
  ['PHOTO-2026-02-16-23-38-44.jpg', 'facade'],
]

fs.mkdirSync(destDir, { recursive: true })

for (const [file, name] of map) {
  const input = path.join(srcDir, file)
  if (!fs.existsSync(input)) {
    console.error('missing', file)
    continue
  }
  const cinematic = new Set([
    'aerial-cabana',
    'facade',
    'living',
    'bedroom-main',
    'office',
    'pool-beach',
    'pool-high',
    'bedroom-city',
    'bedroom-ocean',
    'twilight',
    'terrace-walk',
  ])
  const wide = cinematic.has(name) ? 3200 : 2400
  const pipeline = sharp(input).rotate().resize({
    width: wide,
    height: wide,
    fit: 'inside',
    withoutEnlargement: true,
  })
  if (name === 'logo') {
    await pipeline.png({ compressionLevel: 9 }).toFile(path.join(destDir, `${name}.png`))
    console.log('logo png')
    continue
  }
  await pipeline.webp({ quality: cinematic.has(name) ? 90 : 86 }).toFile(path.join(destDir, `${name}.webp`))
  console.log(name, cinematic.has(name) ? 'q90' : 'q86')
}
