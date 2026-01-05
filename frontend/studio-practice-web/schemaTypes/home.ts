import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Inicio',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título principal',
            type: 'string',
            validation: Rule => Rule.required()
        })
    ]
})