import { defineField, defineType } from 'sanity';

export const historyMilestoneType = defineType({
  name: 'historyMilestone',
  title: 'History Milestone',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(2100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Year (Ascending)',
      name: 'yearAsc',
      by: [{ field: 'year', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'description.ro',
    },
  },
});
