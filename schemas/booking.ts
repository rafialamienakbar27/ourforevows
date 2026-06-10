import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    defineField({
      name: 'namaMempelai',
      title: 'Nama Mempelai / Klien',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'namaPasangan',
      title: 'Nama Pasangan',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'Nomor WhatsApp',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tanggalNikah',
      title: 'Tanggal Event / Nikah',
      type: 'date',
      options: { dateFormat: 'DD MMMM YYYY' },
    }),
    defineField({
      name: 'layanan',
      title: 'Layanan',
      type: 'string',
      options: {
        list: [
          { title: 'Proposal', value: 'Proposal' },
          { title: 'Birthday', value: 'Birthday' },
          { title: 'Wedding', value: 'Wedding' },
          { title: 'All Event', value: 'All Event' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'lokasi',
      title: 'Lokasi Acara',
      type: 'string',
    }),
    defineField({
      name: 'cerita',
      title: 'Cerita / Catatan dari Klien',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'kodeReferral',
      title: 'Kode Referral Affiliate',
      type: 'string',
      description: 'Isi kode referral jika klien datang dari affiliate. Setelah disimpan, klik "Kirim Notifikasi Affiliate" di bawah.',
    }),
    defineField({
      name: 'status',
      title: 'Status Booking',
      type: 'string',
      initialValue: 'baru',
      options: {
        list: [
          { title: '🆕 Baru', value: 'baru' },
          { title: '💬 Sudah Dihubungi', value: 'dihubungi' },
          { title: '🤝 Deal', value: 'deal' },
          { title: '✅ Selesai', value: 'selesai' },
          { title: '❌ Batal', value: 'batal' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'catatanInternal',
      title: 'Catatan Internal (Admin)',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'namaMempelai',
      subtitle: 'layanan',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      const statusEmoji: Record<string, string> = {
        baru: '🆕', dihubungi: '💬', deal: '🤝', selesai: '✅', batal: '❌',
      }
      return {
        title: title ?? 'Booking baru',
        subtitle: [subtitle, statusEmoji[status] ?? ''].filter(Boolean).join(' · '),
      }
    },
  },
  orderings: [
    {
      title: 'Terbaru',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
})
