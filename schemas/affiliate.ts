import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'affiliate',
  title: 'Affiliate',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Affiliate',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Kode Unik',
      type: 'string',
      description: 'Contoh: RAFI10 atau AGUNG25 — huruf kapital, tanpa spasi',
      validation: (Rule) => Rule.required().min(3).max(20),
    }),
    defineField({
      name: 'email',
      title: 'Email Affiliate',
      type: 'string',
      description: 'Email untuk notifikasi otomatis tiap ada referral masuk',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Affiliate',
      type: 'string',
      description: 'Format: 08xxx atau +628xxx',
    }),
    defineField({
      name: 'commissionRate',
      title: 'Komisi (%)',
      type: 'number',
      initialValue: 10,
      description: 'Persentase komisi dari total harga yang disepakati',
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'notes',
      title: 'Catatan Internal',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'code', active: 'isActive' },
    prepare: ({ title, subtitle, active }) => ({
      title,
      subtitle: `Kode: ${subtitle}${active ? '' : ' — Nonaktif'}`,
    }),
  },
})
