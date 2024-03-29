import { BookType, MarkdownResult } from "./content";

export type MenuItem = {
  title: string;
  url: string;
  subMenus?: Array<MenuItem>;
};

function menuItem(title: string, url: string): MenuItem {
  return {
    title,
    url,
  };
}

function booksMenu(books: Array<MarkdownResult<BookType>>): Array<MenuItem> {
  if (books.length > 1) {
    return [
      {
        title: "Books",
        url: `/books`,
        subMenus: books.map((b) =>
          menuItem(b.frontmatter.title, `/books/${b.id}`),
        ),
      },
    ];
  } else if (books.length === 1) {
    return [menuItem("Books", `/books/${books[0].id}`)];
  } else {
    return [];
  }
}

export const mainMenu = (
  books: Array<MarkdownResult<BookType>>,
): Array<MenuItem> => [
  ...booksMenu(books),
  menuItem("Meet Amy", "/about"),
  menuItem("Contact", "/contact"),
  menuItem("History", "/history"),
];

export const socialLinks = {
  facebook: "https://www.facebook.com/amygreenbooks/",
  instagram: "https://www.instagram.com/amygreenbooks/",
};

export const domain = "https://amygreenbooks.com";
export const siteTitle = "Amy Lynn Green";
export const author = "Amy Lynn Green";
export const description =
  "Amy Lynn Green is a lifelong lover of books, history, and library cards. She worked in publishing for six years before writing her first historical fiction novel, based on the WWII home-front of Minnesota, the state where she lives, works, and survives long winters.";
export const themeColor = "#2e5338";
