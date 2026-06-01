'use server'

export type BookingState = {
  success: boolean;
  error?: string;
  affiliateName?: string;
}

type AffiliateResult = {
  _id: string;
  name: string;
  code: string;
  email?: string;
  whatsapp?: string;
  commissionRate: number;
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
      kodeReferral: ((formData.get('kodeReferral') as string) ?? '').trim().toUpperCase(),
    }

    if (!data.namaMempelai || !data.email || !data.whatsapp) {
      return { success: false, error: 'Mohon lengkapi field yang wajib diisi.' }
    }

    const apiKey = process.env.RESEND_API_KEY
    const adminEmail = process.env.ADMIN_EMAIL ?? 'rafialamienakbar27@gmail.com'

    // Lookup affiliate if referral code provided
    let affiliate: AffiliateResult | null = null
    if (data.kodeReferral) {
      try {
        const { sanityFetchFresh } = await import('@/lib/sanity')
        affiliate = await sanityFetchFresh<AffiliateResult>(
          `*[_type == "affiliate" && isActive == true && upper(code) == $code][0] {
            _id, name, code, email, whatsapp, commissionRate
          }`,
          { code: data.kodeReferral }
        )
      } catch {
        // Affiliate lookup failure should not block booking
      }
    }

    if (!apiKey) {
      console.log('[Booking] RESEND_API_KEY belum dikonfigurasi:', JSON.stringify(data))
      console.log('[Booking] Affiliate:', affiliate?.name ?? 'tidak ada')
      return { success: true, affiliateName: affiliate?.name }
    }

    const referralSection = affiliate
      ? `
━━━━━━━━━━━━━━━━━━━━━━
🤝 REFERRAL AFFILIATE
━━━━━━━━━━━━━━━━━━━━━━
Affiliate      : ${affiliate.name}
Kode Referral  : ${affiliate.code}
Komisi         : ${affiliate.commissionRate}% dari total harga yang disepakati
WA Affiliate   : ${affiliate.whatsapp ?? '-'}
Email Affiliate: ${affiliate.email ?? '-'}
`
      : data.kodeReferral
      ? `
⚠️  Kode referral "${data.kodeReferral}" tidak ditemukan / tidak aktif.
`
      : ''

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
${referralSection}
━━━━━━━━━━━━━━━━━━━━━━
Segera follow-up via WhatsApp: ${data.whatsapp}
    `.trim()

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const subject = affiliate
      ? `🌿 Booking Baru [REF:${affiliate.code}]: ${data.namaMempelai} & ${data.namaPasangan}`
      : `🌿 Booking Baru: ${data.namaMempelai} & ${data.namaPasangan} — ${data.tanggalNikah}`

    const adminResult = await resend.emails.send({
      from: 'Our Forevows <onboarding@resend.dev>',
      to: [adminEmail],
      subject,
      text: emailBody,
    })

    if (adminResult.error) {
      console.error('Resend error (admin):', adminResult.error)
      return { success: false, error: 'Gagal mengirim email. Silakan hubungi kami via WhatsApp.' }
    }

    // Send affiliate notification email if affiliate found and has email
    if (affiliate?.email) {
      const affiliateBody = `
Halo ${affiliate.name}!

Ada booking baru yang menggunakan kode referral kamu (${affiliate.code})! 🎉

━━━━━━━━━━━━━━━━━━━━━━
📋 DETAIL BOOKING
━━━━━━━━━━━━━━━━━━━━━━
Nama Klien     : ${data.namaMempelai}${data.namaPasangan ? ` & ${data.namaPasangan}` : ''}
Tanggal Nikah  : ${data.tanggalNikah || 'Belum ditentukan'}
Layanan        : ${data.layanan || 'Belum dipilih'}
Lokasi         : ${data.lokasi || '-'}

━━━━━━━━━━━━━━━━━━━━━━
💰 KOMISI KAMU
━━━━━━━━━━━━━━━━━━━━━━
Komisi         : ${affiliate.commissionRate}% dari total harga yang disepakati

Komisi akan dikonfirmasi oleh tim Our Forevows setelah harga deal disepakati dengan klien.

Terima kasih sudah merekomendasikan Our Forevows! 🌿

— Tim Our Forevows
      `.trim()

      await resend.emails.send({
        from: 'Our Forevows <onboarding@resend.dev>',
        to: [affiliate.email],
        subject: `🌿 Referral Baru! ${data.namaMempelai} pakai kode ${affiliate.code}`,
        text: affiliateBody,
      }).catch((err) => console.error('Affiliate email error:', err))
    }

    return { success: true, affiliateName: affiliate?.name }
  } catch (err) {
    console.error('Booking submission error:', err)
    return { success: false, error: 'Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.' }
  }
}
