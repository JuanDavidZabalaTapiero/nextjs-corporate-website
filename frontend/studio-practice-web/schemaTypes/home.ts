import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'home', // ID (Uso en query)
    title: 'Inicio', // Título en PANEL
    type: 'document', // Indicar que es una página (Home, Contact, About)
    fields: [ // Campos (títulos, párrafos, imgs)
        defineField({
            name: 'title', // Uso en query
            title: 'Título principal', // Título en PANEL
            type: 'string',
            validation: Rule => Rule.required()
        }),

        defineField({
            name: 'subtitle',
            title: 'Subtítulo',
            type: 'string'
        }),

        defineField({
            name: 'heroImage',
            title: 'Imagen principal',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Texto alternativo',
                    type: 'string'
                }
            ]
        })
    ]
})