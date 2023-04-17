import { useState } from 'react'
import { useRouter } from 'next/router'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

import Image from 'next/image'
import ImageSrc1 from "../public/static/images/image1.png"
import SparklesIcon from "../public/static/images/sparkle.svg"
import ArrowRightIcon from "../public/static/images/arrow-right.svg"

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const basePath = "blog"
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Anterior
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Anterior
          </Link>
        )}
        <span>
          {currentPage} de {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Próxima
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Próxima
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-slate-500  bg-slate-950">
        <div className="pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl flex font-extrabold leading-9 tracking-tight text-amber-500 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              As Fanfics de 2° Redes
              <SparklesIcon className="w-16 h-16 ml-4" />
          </h1>
          <p className="text-xl mb-4">Um conjunto de histórias baseadas em contos de Alan Poe.</p>

          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">Procurar histórias...</span>
              <input
                aria-label="Procurar histórias..."
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Procurar histórias..."
                className="block w-full rounded-md border text-slate-200 placeholder-slate-400 border-slate-600 bg-slate-700 px-4 py-2 focus:border-amber-500 focus:ring-amber-500 "
              />
            </label>
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { path, title, summary, tags } = post
            return (
              <li key={path} className="py-6 flex items-center justify-center flex-col border-b border-slate-500">
                <article className="flex items-center">
                  <div className="w-56 h-56 mr-6 md:w-48 md:h-48 sm:w-32 sm:h-32 max-sm:h-32 max-sm:w-32">
                    <Image 
                      src={ImageSrc1}
                      alt="null"
                      className='h-full w-full rounded-3xl'
                    />
                  </div>
                  <div className="w-4/5">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight sm:text-xl max-sm:text-xl mb-2">
                        <Link href={`/${path}`} className="text-amber-500">
                          {title}
                        </Link>
                      </h3>
                    </div>
                    <div className="prose max-w-none text-slate-200 text-base max-sm:text-sm">
                      {summary}
                    </div>
                    <a href={`/${path}`} className='text-amber-500 flex items-center py-2'>
                      Ler história
                      <ArrowRightIcon className="fill-amber-500 ml-2 h-8"/>
                    </a>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
