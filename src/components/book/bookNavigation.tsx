import Link from "next/link";

import imgSrcSet from "../util/imgSrcSet";
import styles from "./bookNavigation.module.css";

export interface BookNavItem {
  id: string;
  image: string;
  title: string;
}

function BookNavLink({
  id,
  image,
  title,
  right = false,
}: BookNavItem & {
  right?: boolean;
}) {
  return (
    <>
      <Link
        href={`/books/${id}`}
        className={`flex items-center pa2 ${styles["book-link"]} raise`}
      >
        {!right && <span className="arrow mr2 db-ns dn">←</span>}
        <img
          {...imgSrcSet({
            src: image,
            resize: "fit",
            h: 120,
          })}
          aria-labelledby={`exp-book-${id}`}
          className={styles.cover}
        />
        <div className="ml3 ml2-ns">
          <h4 className="f5 f6-ns b mb1" id={`exp-book-${id}`}>
            <em>{title}</em>
          </h4>
          <p className="ma0 f6">View Book</p>
        </div>
        {right && <span className="arrow mr2 db-ns dn">→</span>}
      </Link>
    </>
  );
}

export default function BookNavigation({
  next,
  previous,
}: {
  next: BookNavItem;
  previous?: BookNavItem;
}) {
  return (
    <section className="mw6 mb5 ph3 center">
      <h2 className="lh-title primary f3 b mb1">Explore my other books</h2>
      <div className="flex-ns">
        <div className={styles["book-nav"]}>
          {next && <BookNavLink {...next} />}
        </div>
        <div className={styles["book-nav"]}>
          {previous && <BookNavLink {...previous} right />}
        </div>
      </div>
    </section>
  );
}