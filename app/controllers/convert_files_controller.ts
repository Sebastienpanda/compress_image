import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'

import app from '@adonisjs/core/services/app'
import sharp from 'sharp'

export default class ConvertFilesController {
  async store({ request, response }: HttpContext) {
    const height = request.input('height')
    const width = request.input('width')
    const format = request.input('format')
    const file = request.file('file', {
      size: '2mb',
    })
    await file?.move(app.tmpPath('uploads'), {
      name: `${cuid()}.${file.extname}`,
    })

    sharp(file?.filePath)
      .resize(Number.parseInt(width), Number.parseInt(height))
      .toFormat(format)
      .webp({ quality: 80 })
      .toFile(app.tmpPath('uploads', 'resized', `${cuid()}.${file?.fieldName}.${format}`))
      .catch((err) => console.error(err))

    return response.ok({
      message: 'File uploaded',
    })
  }
}
