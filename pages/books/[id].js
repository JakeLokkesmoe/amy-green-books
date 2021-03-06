import Head from "next/head";
import Layout from "../../components/layout";
import Book from "../../components/layouts/book";
import {
  getAllContentIds,
  getContentData,
  getSortedContentData,
} from "../../lib/content";
import { socialLinks, author } from "../../content/siteConfig";
import { mainMenu } from "../../content/siteConfig";

const contentType = "books";

export default function BookPage({ bookData, menu }) {
  const { title, releaseDate, description, image, isbn } = bookData;

  return (
    <Layout
      title={title}
      description={description}
      image={image}
      book
      mainMenu={menu}
    >
      <Head>
        <meta property="og:type" content="book" />
        <meta property="article:publisher" content={socialLinks.facebook} />

        <meta property="og:book:author" content={author} />
        <meta property="og:article:author" content={author} />
        <meta property="article:author" content={author} />
        <meta name="author" content={author} />

        {isbn && <meta property="og:book:isbn" content={isbn} />}

        {releaseDate && (
          <meta property="og:book:releasedate" content={releaseDate} />
        )}
      </Head>
      <Book {...bookData} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllContentIds(contentType).map((id) => ({
    params: {
      id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const bookData = await getContentData(contentType, params.id);
  return {
    props: {
      bookData,
      menu: mainMenu(await getSortedContentData("books")),
    },
  };
}
