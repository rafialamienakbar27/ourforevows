import { NextRequest, NextResponse } from 'next/server'
import { sanityFetchFresh } from '@/lib/sanity'

type AffiliateResult = {
  _id: string
  name: string
  code: string
  email?: string
  whatsapp?: string
  commissionRate: number
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json() as {
      namaMempelai?: string
      namaPasangan?: string
      email?: string
      whatsapp?: string
      tanggalNikah?: string
      layanan?: string
      lokasi?: string
      cerita?: string
      kodeReferral?: string
    }

    const kodeReferral = (data.kodeReferral ?? '').trim().toUpperCase()
    const apiKey = process.env.RESEND_API_KEY
    const adminEmail = process.env.ADMIN_EMAIL ?? 'rafialamienakbar27@gmail.com'

    // Lookup affiliate
    let affiliate: AffiliateResult | null = null
    if (kodeReferral) {
      try {
        affiliate = await sanityFetchFresh<AffiliateResult>(
          `*[_type == "affiliate" && isActive != false && code == $code][0] {
            _id, name, code, email, whatsapp, commissionRate
          }`,
          { code: kodeReferral }
        )
      } catch {
        // non-blocking
      }
    }

    if (!apiKey) {
      console.log('[notify-booking] No RESEND_API_KEY. Data:', JSON.stringify(data))
      return NextResponse.json({ success: true, affiliateName: affiliate?.name ?? null })
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
      : kodeReferral
      ? `\n⚠️  Kode referral "${kodeReferral}" tidak ditemukan / tidak aktif.\n`
      : ''

    const emailBody = `
Halo Our Forevows Team!

Ada booking baru yang diinput admin:

━━━━━━━━━━━━━━━━━━━━━━
👰 DETAIL PASANGAN
━━━━━━━━━━━━━━━━━━━━━━
Nama Mempelai  : ${data.namaMempelai ?? '-'}
Nama Pasangan  : ${data.namaPasangan ?? '-'}
Email          : ${data.email ?? '-'}
WhatsApp       : ${data.whatsapp ?? '-'}

━━━━━━━━━━━━━━━━━━━━━━
💍 DETAIL ACARA
━━━━━━━━━━━━━━━━━━━━━━
Tanggal        : ${data.tanggalNikah ?? '-'}
Layanan        : ${data.layanan ?? '-'}
Lokasi         : ${data.lokasi ?? '-'}

━━━━━━━━━━━━━━━━━━━━━━
💬 CATATAN
━━━━━━━━━━━━━━━━━━━━━━
${data.cerita ?? '-'}
${referralSection}
━━━━━━━━━━━━━━━━━━━━━━
Segera follow-up via WhatsApp: ${data.whatsapp ?? '-'}
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
      return NextResponse.json({ success: false, error: 'Gagal mengirim email ke admin.' }, { status: 500 })
    }

    // Affiliate notification
    if (affiliate?.email) {
      const affiliateBody = `
Halo ${affiliate.name}!

Ada booking baru yang menggunakan kode referral kamu (${affiliate.code})! 🎉

━━━━━━━━━━━━━━━━━━━━━━
📋 DETAIL BOOKING
━━━━━━━━━━━━━━━━━━━━━━
Nama Klien     : ${data.namaMempelai}${data.namaPasangan ? ` & ${data.namaPasangan}` : ''}
Tanggal        : ${data.tanggalNikah || 'Belum ditentukan'}
Layanan        : ${data.layanan || 'Belum dipilih'}
Lokasi         : ${data.lokasi || '-'}

━━━━━━━━━━━━━━━━━━━━━━
💰 KOMISI KAMU
━━━━━━━━━━━━━━━━━━━━━━
Komisi         : ${affiliate.commissionRate}% dari total harga yang disepakati

Komisi akan dikonfirmasi setelah harga deal disepakati dengan klien.

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

    return NextResponse.json({ success: true, affiliateName: affiliate?.name ?? null })
  } catch (err) {
    console.error('[notify-booking] Error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 })
  }
}
