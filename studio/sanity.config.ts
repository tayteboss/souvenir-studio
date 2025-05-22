import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {muxInput} from 'sanity-plugin-mux-input'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {DocumentIcon} from '@sanity/icons'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Souvenir Studio',

  projectId: 'itpmp8pq',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            S.divider(),
            S.listItem()
              .title('Home Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('homePage').documentId('homePage')),
          ])
      },
    }),
    visionTool(),
    muxInput({mp4_support: 'standard', max_resolution_tier: '2160p'}),
    vercelDeployTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  parts: [
    {
      name: 'part:@sanity/base/theme/variables-style',
      path: './customEditorStyles.css',
    },
  ],
})
