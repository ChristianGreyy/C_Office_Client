import Link from "next/link";

type NavLinkProps = {
  href: string;
  title: string;
  style?: string;
  url?: string;
  currentUrl?: string;
};

const NavLink = ({ href, title, style, url, currentUrl }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`${style} ${url === currentUrl ? "text-black" : "text-white"} block rounded py-2 pl-3 pr-4 text-white text-gray-900 hover:text-black dark:text-[#ADB7BE] hover:dark:text-white text-xl md:p-0`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
