import { motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';

const variants = {
  default: { width: 0 },
  active: { width: 'calc(100% - 0.75rem)' },
};

type TabButtonProps = {
  active: boolean;
  selectTab: () => void;
};

const TabButton = ({
  active,
  selectTab,
  children,
}: PropsWithChildren<TabButtonProps>) => {
  const buttonClasses = active ? 'text-white' : 'text-[#ADB7BE]';

  return (
    <button onClick={selectTab}>
      <p className={`mr-3 font-semibold hover:text-white ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? 'active' : 'default'}
        variants={variants}
        className="mr-3 mt-2 h-1 bg-primary-500"
      ></motion.div>
    </button>
  );
};

export default TabButton;
