import {defineType} from 'sanity'

export default defineType({
  title: 'Specification',
  name: 'specification',
  type: 'object',
  fields: [
    { 
      name: 'label', 
      title: 'Label',
      type: 'localeString' 
    },
    { 
      name: 'value', 
      title: 'Value',
      type: 'localeString' 
    }
  ],
  preview: {
    select: {
      title: 'label.ro',
      subtitle: 'value.ro'
    }
  }
})
