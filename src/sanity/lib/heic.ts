export function isHeicFile(file: File): boolean {
  return /\.(heic|heif)$/i.test(file.name) || file.type === 'image/heic' || file.type === 'image/heif'
}

export async function convertHeicIfNeeded(file: File): Promise<File> {
  if (!isHeicFile(file)) return file

  try {
    const heic2any = (await import('heic2any')).default
    const converted = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 })
    const blob = Array.isArray(converted) ? converted[0] : converted
    return new File([blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), { type: 'image/jpeg' })
  } catch {
    return file
  }
}
