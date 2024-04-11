import Link from 'next/link';

type NavLinkProps = {
  href: string;
  title: string;
  style?: string;
};

const NavLink = ({ href, title, style }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`${style} block rounded py-2 pl-3 pr-4 text-gray-900 hover:text-black dark:text-[#ADB7BE] hover:dark:text-white text-xl md:p-0`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
