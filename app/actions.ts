'use server'

export type BookingState = {
  success: boolean;
  error?: string;
}

export async function submitBooking(
  _prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  try {
    const data = {
      namaMempelai: formData.get('namaMempelai') as string,
      namaPasangan: formData.get('namaPasangan') as string,
      email: formData.get('email') as string,
      whatsapp: formData.get('whatsapp') as string,
      tanggalNikah: formData.get('tanggalNikah') as string,
      layanan: formData.get('layanan') as string,
      lokasi: formData.get('lokasi') as string,
      cerita: formData.get('cerita') as string,
    }

    if (!data.namaMempelai || !data.email || !data.whatsapp) {
      return { success: false, error: 'Mohon lengkapi field yang wajib diisi.' }
    }

    const apiKey = process.env.RESEND_API_KEY
    const adminEmail = process.env.ADMIN_EMAIL ?? 'rafialamienakbar27@gmail.com'

    if (!apiKey) {
      console.log('[Booking] RESEND_API_KEY belum dikonfigurasi:', JSON.stringify(data))
      return { success: true }
    }

    const emailBody = `
Halo Our Forevows Team!

Ada booking baru masuk dari website:

━━━━━━━━━━━━━━━━━━━━━━
👰 DETAIL PASANGAN
━━━━━━━━━━━━━━━━━━━━━━
Nama Mempelai  : ${data.namaMempelai}
Nama Pasangan  : ${data.namaPasangan}
Email          : ${data.email}
WhatsApp       : ${data.whatsapp}

━━━━━━━━━━━━━━━━━━━━━━
💍 DETAIL PERNIKAHAN
━━━━━━━━━━━━━━━━━━━━━━
Tanggal Nikah  : ${data.tanggalNikah}
Layanan        : ${data.layanan}
Lokasi         : ${data.lokasi}

━━━━━━━━━━━━━━━━━━━━━━
💬 CERITA MEREKA
━━━━━━━━━━━━━━━━━━━━━━
${data.cerita}

━━━━━━━━━━━━━━━━━━━━━━
Segera follow-up via WhatsApp: ${data.whatsapp}
    `.trim()

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const result = await resend.emails.send({
      from: 'Our Forevows <onboarding@resend.dev>',
      to: [adminEmail],
      subject: `🌿 Booking Baru: ${data.namaMempelai} & ${data.namaPasangan} — ${data.tanggalNikah}`,
      text: emailBody,
    })

    if (result.error) {
      console.error('Resend error:', result.error)
      return { success: false, error: 'Gagal mengirim email. Silakan hubungi kami via WhatsApp.' }
    }

    return { success: true }
  } catch (err) {
    console.error('Booking submission error:', err)
    return { success: false, error: 'Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.' }
  }
}
