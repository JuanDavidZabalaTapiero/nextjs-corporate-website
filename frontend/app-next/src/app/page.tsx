import type { Metadata } from "next";
import Image from 'next/image'

import { sanityClient } from '@/src/lib/sanity'
import { urlFor } from '@/src/lib/sanityImage'

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
    <>
      <h1 className="text-center font-bold">{data?.title}</h1>
      <h2 className="text-center">{data?.subtitle}</h2>
      {data.heroImage && (
        <Image
          src={urlFor(data.heroImage).width(1200).url()}
          alt={data.heroImage.alt ?? 'Imagen principal'}
          width={800}
          height={600}
          className="mx-auto"
          priority
        />
      )}
    </>
  )
}