import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Judul Proyek', type: 'string' }),
    defineField({ name: 'coupleName', title: 'Nama Pasangan', type: 'string' }),
    defineField({ name: 'location', title: 'Lokasi & Tahun', type: 'string', description: 'Contoh: Bali, 2024' }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding Film', value: 'film' },
          { title: 'Pre-Wedding', value: 'pre' },
          { title: 'Social Content', value: 'social' },
          { title: 'Video', value: 'video' },
        ],
      },
    }),
    defineField({
      name: 'mediaType',
      title: 'Tipe Media',
      type: 'string',
      options: { list: [{ title: 'Gambar', value: 'image' }, { title: 'Video', value: 'video' }] },
      initialValue: 'image',
    }),
    defineField({ name: 'videoUrl', title: 'URL Video', type: 'url', description: 'URL video (bisa dari CDN atau path lokal seperti /videos/contoh-1.mp4)' }),
    defineField({ name: 'coverImage', title: 'Gambar Cover', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tag', title: 'Tag Tampil', type: 'string', description: 'Contoh: Wedding Film' }),
    defineField({ name: 'order', title: 'Urutan', type: 'number' }),
  ],
  orderings: [{ title: 'Urutan', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
