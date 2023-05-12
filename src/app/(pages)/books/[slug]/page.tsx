import BookNavigation from "../../../../components/book/bookNavigation";
import HistoryLink from "../../../../components/book/historyLink";
import Book from "../../../../components/layouts/book";
import {
  BookType,
  HistoryType,
  getAllContentIds,
  getContentData,
  getSortedContentData,
} from "../../../../lib/content";
import { author, domain, siteTitle } from "../../../../siteConfig";

type BookPageParams = { slug: string };

export default async function BookPage({ params }: { params: BookPageParams }) {
  const bookData = await getContentData<BookType>("books", params.slug);
  const allBooks = await getSortedContentData<BookType>("books");
  const bookIndex = allBooks.findIndex((n) => n.id === params.slug);
  const previous = allBooks[(bookIndex + 1) % allBooks.length];
  const next = allBooks[(bookIndex + allBooks.length - 1) % allBooks.length];
  const history =
    (await getSortedContentData<HistoryType>("history")).find(
      (n) => n.id === params.slug
    ) || null;

  return (
    <>
      <Book {...bookData} />
      <BookNavigation next={next} previous={previous} />
      {history && (
        <HistoryLink
          href={`/history/${history.id}`}
          title={
            <>
              History Behind <em>{history.frontmatter.title}</em>
            </>
          }
          description={
            <>
              Explore the real history behind{" "}
              <em>{bookData.frontmatter.title}</em>
            </>
          }
        />
      )}
    </>
  );
}

export async function generateStaticParams() {
  return getAllContentIds("books").map((id) => ({
    slug: id,
  }));
}

export async function generateMetadata({ params }: { params: BookPageParams }) {
  const { frontmatter: bookData } = await getContentData<BookType>(
    "books",
    params.slug
  );
  return {
    title: `${bookData.title} | ${siteTitle}`,
    openGraph: {
      title: bookData.title,
      description: bookData.description,
      type: "book",
      authors: [author],
      isbn: bookData.isbn,
      releaseDate: bookData.releaseDate?.toISOString(),
      images: [
        {
          url: `${domain}${bookData.image}`,
        },
      ],
    },
    twitter: {
      title: bookData.title,
      description: bookData.description,
      images: [`${domain}${bookData.image}`],
    },
  };
}