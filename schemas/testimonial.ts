import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimoni',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nama Pasangan', type: 'string' }),
    defineField({ name: 'initials', title: 'Inisial (misal: R&D)', type: 'string' }),
    defineField({ name: 'event', title: 'Acara & Tahun', type: 'string', description: 'Contoh: Bali Wedding, 2024' }),
    defineField({ name: 'text', title: 'Testimoni', type: 'text', rows: 4 }),
    defineField({ name: 'order', title: 'Urutan', type: 'number' }),
  ],
  orderings: [{ title: 'Urutan', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
