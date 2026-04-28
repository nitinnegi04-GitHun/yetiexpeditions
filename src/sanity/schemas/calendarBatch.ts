import { defineType, defineField } from 'sanity'

export const calendarBatch = defineType({
  name: 'calendarBatch',
  title: 'Calendar Batch',
  type: 'object',
  fields: [
    defineField({
      name: 'batchId',
      title: 'Batch ID',
      type: 'string',
      description: 'Unique identifier e.g. KED-DEC-2025-01',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'price',
      title: 'Price (INR)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'discountedPrice',
      title: 'Discounted Price (INR)',
      type: 'number',
      description: 'Leave empty if no discount'
    }),
    defineField({
      name: 'totalSeats',
      title: 'Total Seats',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'seatsBooked',
      title: 'Seats Booked',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Full', value: 'full' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio'
      },
      initialValue: 'open',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'meetingPoint',
      title: 'Meeting Point',
      type: 'string',
      description: 'e.g. Dehradun Railway Station'
    }),
    defineField({
      name: 'trekLead',
      title: 'Trek Lead (Override)',
      type: 'reference',
      to: [{ type: 'guide' }],
      description: 'Leave empty to use the trek-level Trek Lead. Set this only if a different guide is leading this specific departure.',
    }),
    defineField({
      name: 'notes',
      title: 'Batch Notes',
      type: 'text',
      rows: 2,
      description: 'Any special notes for this batch'
    })
  ],
  preview: {
    select: {
      start: 'startDate',
      end: 'endDate',
      status: 'status',
      price: 'price',
      seats: 'totalSeats',
      booked: 'seatsBooked',
      leadName: 'trekLead.name',
    },
    prepare({ start, end, status, price, seats, booked, leadName }) {
      const leadSuffix = leadName ? ` · ${leadName}` : ''
      return {
        title: `${start} → ${end}`,
        subtitle: `₹${price} · ${seats - booked} seats left · ${status}${leadSuffix}`
      }
    }
  }
})
