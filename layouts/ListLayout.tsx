import { useState } from "react";
import { useRouter } from "next/router";
import { formatDate } from "pliny/utils/formatDate";
import { CoreContent } from "pliny/utils/contentlayer";
import type { Blog } from "contentlayer/generated";
import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";

import Image from "next/image";
import ImageSrc1 from "../public/static/images/image1.png";
import SparklesIcon from "../public/static/images/sparkle.svg";
import ArrowRightIcon from "../public/static/images/arrow-right.svg";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
  initialDisplayPosts?: CoreContent<Blog>[];
  pagination?: PaginationProps;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const basePath = "blog";
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Anterior
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1
                ? `/${basePath}/`
                : `/${basePath}/page/${currentPage - 1}`
            }
            rel="prev"
          >
            Anterior
          </Link>
        )}
        <span>
          {currentPage} de {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
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
  );
}

const notFound = () => {
  return (
    <div className="flex justify-center items-center">
      Não encontrei nenhuma história...
    </div>
  )
}

export default function ListLayout({
  posts,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags.join(" ");
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts;

  let i = 0
  return (
    <>
      <div className="divide-y divide-slate-500  bg-slate-950">
        <div className="pb-8 pt-6 md:space-y-5">
          <h1 className="flex text-3xl font-extrabold leading-9 tracking-tight text-amber-500 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            As Fanfics de 2° <span className="flex items-center justify-center"> Redes <SparklesIcon className="ml-4 h-12 w-12 max-sm:h-8 max-sm:w-8" /></span> 
          </h1>
          <p className="mb-4 text-xl">
            Um conjunto de histórias baseadas em contos de Alan Poe.
          </p>

          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">Procurar histórias...</span>
              <input
                aria-label="Procurar histórias..."
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Procurar histórias..."
                className="block w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500 "
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
          <div className={!filteredBlogPosts.length ? "mt-2" : "mt-0"} >
            {!filteredBlogPosts.length && "Nenhuma história encontrada"}
          </div>
          {displayPosts.map((post) => {
            i++
            console.log(i)
            const { path, title, summary, tags } = post;
            return (
              <li
                key={path}
                className="flex flex-col items-center justify-center border-b border-slate-500 py-6"
              >
                <article className="flex items-center">
                  <div className="mr-6 h-56 w-56 max-sm:h-32 max-sm:w-32 sm:h-32 sm:w-32 md:h-48 md:w-48">
                    <a href={`/${path}`}>
                      <Image
                        src={`/static/images/image${i}.jpg`}
                        alt="null"
                        className="h-full w-full rounded-3xl border-slate-800 border-2"
                        width={224}
                        height={224}
                      />
                    </a>
                  </div>
                  <div className="w-4/5">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold leading-8 tracking-tight max-sm:text-xl sm:text-xl">
                        <Link href={`/${path}`} className="text-amber-500">
                          {title}
                        </Link>
                      </h3>
                    </div>
                    <div className="prose max-w-none text-base text-slate-200 max-sm:text-sm">
                      {summary}
                    </div>
                    <a
                      className="flex items-center py-2 text-amber-500"
                      href={`/${path}`}
                    >
                      Ler história
                      <ArrowRightIcon className="ml-2 h-8 fill-amber-500" />
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
}
