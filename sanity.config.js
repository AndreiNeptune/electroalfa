import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {languageFilter} from '@sanity/language-filter'

export default defineConfig({
  name: 'default',
  title: 'Site electroalfa',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6sxnslmm',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool(), 
    visionTool(),
    languageFilter({
      supportedLanguages: [
        {id: 'ro', title: 'Română'},
        {id: 'en', title: 'English'},
        {id: 'de', title: 'Deutsch'},
        {id: 'fr', title: 'Français'},
        {id: 'it', title: 'Italiano'}
      ],
      defaultLanguages: ['ro'],
      documentTypes: ['product', 'newsArticle', 'investorDocument', 'historyMilestone', 'location'],
      filterField: (enclosingType, member, selectedLanguageIds) =>
        !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(member.name),
    })
  ],

  schema: {
    types: schemaTypes,
  },
})
