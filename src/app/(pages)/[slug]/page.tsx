import Markdown from "../../../components/markdown";
import {
  ContentData,
  getAllContentIds,
  getContentData,
} from "../../../lib/content";

export type PageType = ContentData & {
  description: string;
  title: string;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const { description, title, source } = await getContentData<PageType>(
    "pages",
    params.slug
  );

  return (
    <div className="ph4">
      <article className="measure-wide center mt4 mb5">
        <header className="mb4">
          <h1 className="db primary f2 b lh-title mb1 mt6">{title}</h1>
          {description && (
            <p className="mid-gray lh-title mb2">{description}</p>
          )}
        </header>
        {source && (
          <div className="cms">
            <Markdown source={source} />
          </div>
        )}
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return getAllContentIds("pages").map((id) => ({
    slug: id,
  }));
}
