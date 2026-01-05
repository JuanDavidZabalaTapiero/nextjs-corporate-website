import type { Metadata } from "next";
import { sanityClient } from '@/src/lib/sanity'

export const metadata: Metadata = {
  title: "Inicio",
};

const query = `
  *[_type == "home"][0]{
    title
  }
`

export default async function HomePage() {
  const data = await sanityClient.fetch(query)

  return <h1>{data?.title}</h1>
}