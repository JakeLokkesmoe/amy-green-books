import cn from "classnames";
import { parseISO } from "date-fns";
import Link from "next/link";

import { BookSummaryType } from "../lib/content";
import BookCover from "./bookCover";
import DateCmp from "./date";

export default function BookSummary({
  book: { id, releaseDate, retailers, title, image, spineImage, description },
  featured = false,
}: {
  book: BookSummaryType;
  featured?: boolean;
}) {
  const isReleased =
    !releaseDate || parseISO(releaseDate) < new Date(Date.now());
  const retailer = (retailers || []).reduce((acc, n) =>
    n.name === "Baker Book House" ? n : acc
  );

  return (
    <article className={cn({ featured })}>
      {image && (
        <Link href={`/books/${id}`}>
          <a className="side img-side">
            <BookCover
              title={title}
              image={image}
              spineImage={spineImage}
              animateIn
            />
          </a>
        </Link>
      )}

      <div className="side text-side">
        <header>
          <h3 className="f3 b lh-title mb1">
            <em>{title}</em>
          </h3>
          {!isReleased && (
            <p className="mid-gray lh-title mb2">
              Releases: <DateCmp dateString={releaseDate} />
            </p>
          )}
        </header>
        <p>{description}</p>
        <footer>
          <Link href={`/books/${id}`}>
            <a className="link">Learn more →</a>
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

      <style jsx>{`
        article {
          display: flex;
          flex: 1 1 auto;
          flex-wrap: wrap;
          padding-bottom: var(--spacing-extra-large);
          min-width: 50%;
          align-items: ${description ? "flex-start" : "center"};
        }

        .featured {
          background-color: white;
        }

        @media screen and (min-width: 50em) {
          article {
            width: ${featured ? "100%" : "50%"};
          }

          .featured {
            padding-left: 4%;
            padding-right: 4%;
          }
        }

        .side {
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        .text-side {
          min-width: 48%;
          flex: 1 1;
          padding: 0 var(--spacing-medium);
        }

        .img-side {
          max-width: 18rem;
          margin: 0 auto var(--spacing-medium);
        }
      `}</style>
    </article>
  );
}