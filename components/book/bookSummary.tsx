import cn from "classnames";
import Link from "next/link";

import { BookType, MarkdownResult } from "../../lib/content";
import DateCmp from "../date";
import BookCover from "./bookCover";
import styles from "./bookSummary.module.css";

export default function BookSummary({
  book: {
    id,
    frontmatter: {
      releaseDate,
      retailers,
      title,
      image,
      spineImage,
      description,
      paperTint,
    },
  },
  featured = false,
  flipped = false,
}: {
  book: MarkdownResult<BookType>;
  featured?: boolean;
  flipped?: boolean;
}) {
  const isReleased = !releaseDate || releaseDate < new Date(Date.now());
  const retailer = (retailers || []).reduce((acc, n) =>
    n.name === "Baker Book House" ? n : acc
  );

  return (
    <div
      className=""
      style={{
        backgroundColor: paperTint,
      }}
    >
      <article
        className={cn(
          styles.article,
          {
            [styles.featured]: featured,
          },
          "items-center flex flex-wrap pv4 mw7 center flex-m flex-wrap items-start"
        )}
      >
        {image && (
          <Link
            href={`/books/${id}`}
            className={cn(`${styles.side} ${styles["img-side"]}`, {
              "order-last-ns": flipped,
            })}
          >
            <BookCover
              title={title}
              image={image}
              spineImage={spineImage}
              animateIn
            />
          </Link>
        )}

        <div
          className={`${styles.side} paper-2 br1 mh3 mw5-m ${styles["text-side"]}`}
        >
          <header>
            <h3 className="f3 b i lh-title mb1 serif">{title}</h3>
            {!isReleased && (
              <p className="mid-gray lh-title mb2">
                Releases: <DateCmp date={releaseDate} />
              </p>
            )}
          </header>
          <p>{description}</p>
          <footer>
            <Link href={`/books/${id}`} className="btn">
              Learn more →
            </Link>
            {featured && !isReleased && retailer && (
              <div className="mt2">
                <a
                  href={retailer.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary white f6 btn raise"
                >
                  Pre-Order Now!
                </a>
              </div>
            )}
          </footer>
        </div>
      </article>
    </div>
  );
}