import cn from "classnames";

import BookSummary from "@/components/book/bookSummary";
import Markdown from "@/components/markdown";
import NewsletterSection from "@/components/newsletter/newsletterSection";
import imgSrcSet from "@/components/util/imgSrcSet";
import { getContentData, getBooks } from "@/lib/content";

import styles from "./page.module.css";

type HomeContent = {
  title: string;
  date: number;
  subtitle: string;
  bannerImage: string;
  welcome: {
    text: string;
    heading: string;
    image: string;
  };
};

export default async function Page() {
  const {
    frontmatter: { welcome, title, subtitle },
  } = await getContentData<HomeContent>(null, "index");
  const books = await getBooks();

  return (
    <>
      <header
        className={cn(
          `flex flex-column flex-row-ns items-center`,
          `justify-center pv5 ph3 serif`
        )}
      >
        <img
          {...imgSrcSet({
            src: "/media/meet-amy.png",
            resize: "fit",
            w: 240,
            h: 240,
          })}
          className={`db br-100 w-100 mr5-ns paper-2 ${styles.headShot}`}
          alt="A photo of Amy Lynn Green"
          style={{
            minWidth: 240,
            minHeight: 240,
          }}
        />
        <div>
          <h1 className="f1 fw9 lh-title black mt3">{title}</h1>
          <p className="f4 fw5 i lh-title mw-100 grey-4 o-60">{subtitle}</p>
        </div>
      </header>

      <section>
        <BookSummary book={books[0]} />
      </section>

      <NewsletterSection />

      <section>
        {books.slice(1).map((book, i) => (
          <BookSummary key={book.id} book={book} flipped={i % 2 === 0} />
        ))}
      </section>

      <section className="pb4 pt5 mw7 center flex-m mb4">
        <div className="ph3 order-last-m">
          <img
            {...imgSrcSet({
              src: welcome.image,
              resize: "fit",
              w: 350,
            })}
            alt="Amy Lynn Green"
            className="db mb2 center mw4-ns"
          />
        </div>

        <div className="ph3">
          <h3 className="f3 b lh-title mb1 serif">{welcome.heading}</h3>
          <div className="cms">
            <Markdown source={welcome.text} />
          </div>
        </div>
      </section>
    </>
  );
}
