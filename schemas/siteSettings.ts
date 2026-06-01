import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Pengaturan Website',
  type: 'document',
  fields: [
    defineField({ name: 'whatsapp', title: 'Nomor WhatsApp', type: 'string', description: 'Format: 0882001901100' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'instagram', title: 'Username Instagram', type: 'string', description: 'Tanpa @, contoh: ourforevows' }),
    defineField({ name: 'tiktok', title: 'Username TikTok', type: 'string' }),
    defineField({ name: 'youtube', title: 'Channel YouTube', type: 'string' }),
    defineField({
      name: 'about',
      title: 'Tentang Kami',
      type: 'object',
      fields: [
        defineField({ name: 'paragraph1', title: 'Paragraf 1', type: 'text', rows: 3 }),
        defineField({ name: 'paragraph2', title: 'Paragraf 2', type: 'text', rows: 3 }),
        defineField({ name: 'stat1Num', title: 'Statistik 1 - Angka', type: 'string', description: 'Contoh: 200+' }),
        defineField({ name: 'stat1Label', title: 'Statistik 1 - Label', type: 'string' }),
        defineField({ name: 'stat2Num', title: 'Statistik 2 - Angka', type: 'string' }),
        defineField({ name: 'stat2Label', title: 'Statistik 2 - Label', type: 'string' }),
        defineField({ name: 'stat3Num', title: 'Statistik 3 - Angka', type: 'string' }),
        defineField({ name: 'stat3Label', title: 'Statistik 3 - Label', type: 'string' }),
      ],
    }),
    defineField({ name: 'adminEmail', title: 'Email Admin (untuk notifikasi booking)', type: 'string' }),
  ],
  preview: { select: { title: 'email' }, prepare: () => ({ title: 'Pengaturan Website' }) },
})
