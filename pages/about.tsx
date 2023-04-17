// import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { InferGetStaticPropsType } from "next";
import { allAuthors } from "contentlayer/generated";
import { MDXLayoutRenderer } from "pliny/mdx-components";
import { MDXComponents } from "@/components/MDXComponents";

import AuthorContent from "../components/AuthorContent";
import PageTitle from "@/components/PageTitle";

export const getStaticProps = async () => {
  const author = allAuthors.find((p) => p.slug === "default");
  return { props: { author } };
};

export default function About({
  author,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <PageTitle>
        Sobre o autor
      </PageTitle>
      <AuthorContent />
    </div>
  );
}
