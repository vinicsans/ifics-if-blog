import { useState, ReactNode } from "react";
import { Comments } from "pliny/comments";
import { CoreContent } from "pliny/utils/contentlayer";
import type { Blog, Authors } from "contentlayer/generated";
import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import { BlogSEO } from "@/components/SEO";
import Image from "@/components/Image";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/master/data/${path}`;
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/${path}`
  )}`;

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
}: LayoutProps) {
  const { path, date, title } = content;
  const basePath = path.split("/")[0];

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="text-amber-500 w-full">
        <div className="xl:divide-y xl:divide-gray-300 text-amber-500">
          <header className="pt-6 xl:pb-6">
            <div className="text-center">
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-amber-500">
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString(
                      siteMetadata.locale,
                      postDateTemplate
                    ).toUpperCase()}
                  </time>
                </dd>
              </div>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="flex-col w-full items-center justify-center">
            <div className="prose py-10 text-slate-200 flex-col text-justify m-auto">
              {children}
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
