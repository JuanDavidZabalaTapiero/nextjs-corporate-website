import type { Metadata } from "next";
import Image from 'next/image'

import { sanityClient } from '@/src/lib/sanity'
import { urlFor } from '@/src/lib/sanityImage'

// CHECK POR SANITY
export const revalidate = 60

export const metadata: Metadata = {
  title: "Inicio",
};

const query = `
  *[_type == "home"][0]{
    title,
    subtitle,
    heroImage{
      asset,
      alt
    }
  }
`

export default async function HomePage() {
  const data = await sanityClient.fetch(query)

  return (
    <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {data?.title}
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          {data?.subtitle}
        </p>
      </div>

      {data.heroImage && (
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={urlFor(data.heroImage).width(1200).url()}
            alt={data.heroImage.alt ?? 'Imagen principal'}
            width={1200}
            height={800}
            className="w-full object-cover"
            priority
          />
        </div>
      )}
    </section>
  )
}