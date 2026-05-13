import {defineType, defineField} from 'sanity'

const supportedLanguages = [
  {id: 'ro', title: 'Română', isDefault: true},
  {id: 'en', title: 'English'},
  {id: 'de', title: 'Deutsch'},
  {id: 'fr', title: 'Français'},
  {id: 'it', title: 'Italiano'}
]

export default defineType({
  title: 'Localized Text',
  name: 'localeText',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true}
    }
  ],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'text',
    fieldset: lang.isDefault ? undefined : 'translations'
  }))
})
