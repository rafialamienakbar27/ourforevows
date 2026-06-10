import { useState } from 'react'
import type { DocumentActionProps } from 'sanity'

type BookingDoc = {
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

export function NotifyAffiliateAction(props: DocumentActionProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  // Only register for booking documents
  if (props.type !== 'booking') return null

  const doc = ((props.draft ?? props.published) ?? {}) as BookingDoc
  const hasReferral = Boolean(doc.kodeReferral?.trim())

  const labels: Record<typeof status, string> = {
    idle: '📧 Kirim Notifikasi Affiliate',
    loading: 'Mengirim...',
    done: '✓ Terkirim',
    error: '✗ Gagal — Coba Lagi',
  }

  return {
    label: labels[status],
    title: hasReferral
      ? `Kirim notifikasi email ke affiliate (kode: ${doc.kodeReferral})`
      : 'Isi Kode Referral Affiliate terlebih dahulu',
    disabled: !hasReferral || status === 'loading' || status === 'done',
    tone: (status === 'done' ? 'positive' : status === 'error' ? 'critical' : 'primary') as
      | 'positive'
      | 'critical'
      | 'primary',
    onHandle: () => {
      setStatus('loading')

      fetch('/api/notify-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namaMempelai: doc.namaMempelai,
          namaPasangan: doc.namaPasangan,
          email: doc.email,
          whatsapp: doc.whatsapp,
          tanggalNikah: doc.tanggalNikah,
          layanan: doc.layanan,
          lokasi: doc.lokasi,
          cerita: doc.cerita,
          kodeReferral: doc.kodeReferral,
        }),
      })
        .then((res) => res.json().then((body) => ({ ok: res.ok, body })))
        .then(({ ok, body }) => {
          if (ok) {
            setStatus('done')
          } else {
            console.error('[NotifyAffiliate]', body?.error)
            setStatus('error')
          }
        })
        .catch((err) => {
          console.error('[NotifyAffiliate]', err)
          setStatus('error')
        })
    },
  }
}

export default NotifyAffiliateAction
