import Jumbotron from "@/components/header/jumbotron";

import { getContentData } from "@/lib/content";

export type ContactType = {
  title: string;
  date: number;
  description: string;
  bannerImage: string;
  successMessage: string;
};

export default async function ContactPage() {
  const {
    frontmatter: { title, description, bannerImage },
    content,
  } = await getContentData<ContactType>(null, "contact");

  return (
    <>
      <Jumbotron title={title} subtitle={description} image={bannerImage} />

      <article className="mw6 center ph3 mt4 mb5">
        {content && <div className="cms">{content}</div>}

        <div className="mb4">
          <form
            name="contact"
            method="POST"
            action="/contact/success"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="dn">
              <label>
                Don&apos;t fill this out if you&apos;re human:{" "}
                <input name="bot-field" />
              </label>
            </p>
            <div className="flex-l mhn1-l">
              <div className="pr1-l w-50-l relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="input w-100 mb2"
                />
                <label htmlFor="name" className="label">
                  Name
                </label>
              </div>
              <div className="pl1-l w-50-l relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="input w-100 mb2"
                />
                <label htmlFor="email" className="label">
                  Email
                </label>
              </div>
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                placeholder="Your message"
                rows={8}
                cols={80}
                className="textarea w-100"
              />
              <label htmlFor="message" className="label">
                Your message
              </label>
            </div>
            <div className="tc">
              <button type="submit" className="btn w-100 w-auto-ns raise">
                Submit
              </button>
            </div>
          </form>
        </div>
      </article>
    </>
  );
}
