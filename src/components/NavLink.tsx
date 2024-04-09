import Link from 'next/link';

type NavLinkProps = {
  href: string;
  title: string;
};

const NavLink = ({ href, title }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className="block rounded py-2 pl-3 pr-4  text-gray-900 hover:text-black dark:text-[#ADB7BE] hover:dark:text-white sm:text-xl md:p-0"
    >
      {title}
    </Link>
  );
};

export default NavLink;
