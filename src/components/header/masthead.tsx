import { MenuItem } from "../../siteConfig";
import styles from "./masthead.module.css";
import NavigationLink from "./navigationLink";

interface MastheadProps {
  bannerImage: string;
  title: string;
  subtitle: string;
  mainMenu: MenuItem[];
}

export default function Masthead({ title, subtitle, mainMenu }: MastheadProps) {
  return (
    <div className={`hero cover bg-cover ${styles.banner}`}>
      <div className={styles.dim}>
        <header className="mw7 center pv5 pv6-l ph3 tr mb3">
          <h1 className="f2 f1-l b lh-title white mb2">{title}</h1>
          <p className="f3 fw5 lh-title mw-100 grey-1">{subtitle}</p>
        </header>

        <nav className="flex justify-center bw2 white bg-black main-nav">
          <ul className="flex flex-wrap justify-between w-100 mw6">
            {mainMenu.map((menu) => (
              <NavigationLink key={menu.title} {...menu} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
