import { defineField, defineType } from 'sanity';

export const investorDocumentType = defineType({
  name: 'investorDocument',
  title: 'Investor Document',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Financial Calendar', value: 'calendar' },
          { title: 'Current Reports', value: 'reports' },
          { title: 'Financial Results', value: 'results' },
          { title: 'Corporate Governance', value: 'governance' },
          { title: 'General Assemblies', value: 'assemblies' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'legalRequirement',
      title: 'Mandatory Disclosure',
      description: 'Check this if this document is a mandatory legal disclosure for investors.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'file',
      title: 'Document File (PDF)',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
  ],
  preview: {
    select: {
      title: 'title.ro',
      subtitle: 'category',
    },
  },
});
