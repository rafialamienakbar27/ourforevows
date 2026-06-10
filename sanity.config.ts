import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import NotifyAffiliateAction from './sanity/actions/notifyBookingAction'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Our Forevows CMS',
  schema: { types: schemaTypes },
  document: {
    actions: (prev, ctx) => {
      if (ctx.schemaType === 'booking') {
        return [...prev, NotifyAffiliateAction]
      }
      return prev
    },
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Konten Website')
          .items([
            S.documentTypeListItem('booking').title('📋 Booking Masuk'),
            S.divider(),
            S.documentTypeListItem('portfolio').title('Portfolio & Video'),
            S.documentTypeListItem('testimonial').title('Testimoni'),
            S.documentTypeListItem('service').title('Layanan'),
            S.documentTypeListItem('affiliate').title('Affiliate'),
            S.divider(),
            S.listItem()
              .title('Pengaturan Website')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    visionTool(),
  ],
})
