import React from 'react';

import { TLink } from '@/types/common.type.ts';

import NavLink from './NavLink.tsx';

const MenuOverlay = ({ links }: { links: TLink[] }) => {
  return (
    <ul className="flex flex-col items-center py-4">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
