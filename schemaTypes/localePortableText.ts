import {defineType, defineField} from 'sanity'

const supportedLanguages = [
  {id: 'ro', title: 'Română', isDefault: true},
  {id: 'en', title: 'English'},
  {id: 'de', title: 'Deutsch'},
  {id: 'fr', title: 'Français'},
  {id: 'it', title: 'Italiano'}
]

// Restricted portable text for descriptions
const blockType = {
  type: 'block',
  styles: [{title: 'Normal', value: 'normal'}],
  lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
  marks: {
    decorators: [
      {title: 'Strong', value: 'strong'},
      {title: 'Emphasis', value: 'em'}
    ],
    annotations: [
      {
        title: 'URL',
        name: 'link',
        type: 'object',
        fields: [
          {
            title: 'URL',
            name: 'href',
            type: 'url'
          }
        ]
      }
    ]
  }
}

export default defineType({
  title: 'Localized Portable Text',
  name: 'localePortableText',
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
    type: 'array',
    of: [blockType],
    fieldset: lang.isDefault ? undefined : 'translations'
  }))
})
