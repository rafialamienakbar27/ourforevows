import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Layanan',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nama Layanan', type: 'string' }),
    defineField({ name: 'description', title: 'Deskripsi', type: 'text', rows: 3 }),
    defineField({ name: 'badge', title: 'Badge (opsional, misal: Baru)', type: 'string' }),
    defineField({ name: 'iconKey', title: 'Icon', type: 'string', description: 'Pilih icon untuk layanan ini', options: { list: ['film', 'camera', 'social', 'highlight', 'intimate', 'custom'] } }),
    defineField({ name: 'order', title: 'Urutan', type: 'number' }),
  ],
  orderings: [{ title: 'Urutan', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
