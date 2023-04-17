// import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { InferGetStaticPropsType } from 'next'
import { allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { MDXComponents } from '@/components/MDXComponents'

import AuthorContent from "../components/AuthorContent"

export const getStaticProps = async () => {
  const author = allAuthors.find((p) => p.slug === 'default')
  return { props: { author } }
}

export default function About({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1 className="mb-4 text-xl flex font-extrabold tracking-tight text-amber-500 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
        Sobre o autor
      </h1>
      <AuthorContent />
    </div>
  )
}
