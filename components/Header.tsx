import siteMetadata from "@/data/siteMetadata";
import headerNavLinks from "@/data/headerNavLinks";
import Logo from "@/data/logo.svg";
import Link from "./Link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-slate-950 py-10 text-amber-500">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo className="mr-4 h-24 w-24 rounded-full border-2 border-amber-500" />
            </div>
            {typeof siteMetadata.headerTitle === "string" ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="items-center text-base leading-5">
        <div className="hidden sm:block">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="p-1 font-medium text-amber-500 sm:p-4"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
