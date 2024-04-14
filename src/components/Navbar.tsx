'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext, useMemo, useState } from 'react';
import Select from 'react-select';

import { useClientTranslation } from '@/i18n/client.ts';
import { Language } from '@/i18n/configs.ts';
import { useLanguage } from '@/i18n/hooks.ts';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

import { EThemeMode } from '../enum/index.ts';
import MenuOverlay from './MenuOverlay';
import NavLink from './NavLink.tsx';
import { ThemeContext } from './Providers.tsx';

const Navbar = () => {
  const params = useParams();
  const lang = params.lang as Language;
  const { t } = useClientTranslation('Common');
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { onChangeLanguage } = useLanguage();
  const { onChange, value } = useContext(ThemeContext);

  const navLinks = useMemo(() => {
    return [
      {
        title: t('nav.log_time'),
        path: 'log-time',
      },
      {
        title: t('nav.projects'),
        path: 'projects',
      },
      {
        title: t('nav.hrm'),
        path: '#contact',
      },
      {
        title: t('nav.request'),
        path: '#contact',
      },
      {
        title: t('nav.people'),
        path: '#contact',
      },
    ];
  }, [t]);

  const options = useMemo(() => {
    return [
      { value: Language.EN, label: 'EN' },
      { value: Language.VN, label: 'VN' },
    ];
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-10 mx-auto border border-[#33353F] bg-white bg-opacity-100 dark:bg-[#121212]">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2 lg:py-4">
        <div className='flex'>
          <Link
            href={'/'}
            className="text-ss font-semibold uppercase text-black dark:text-white md:text-3xl"
          >
            {t('Common:COffice')}
          </Link>
          <div className="menu ml-12 hidden md:block md:w-auto" id="navbar">
            <ul className="mt-0 flex p-4 md:flex-row md:space-x-8 md:p-0">
              {navLinks.map((link, index) => (
                <li key={index} className="h-10">
                  <NavLink
                    href={link.path}
                    title={link.title}
                    style={'leading-10 h-full'}
                  />
                </li>
              ))}
              
            </ul>
          </div>
        </div>
        <div>
        
          <Select
                value={options.find((item) => item.value === lang)}
                onChange={(item) => {
                  onChangeLanguage(item?.value ?? Language.EN);
                }}
                options={options}
                styles={{
                  control: (base) => {
                    return {
                      ...base,
                      backgroundColor: 'transparent',
                      minHeight: 'unset',
                    };
                  },
                  singleValue(base, props) {
                    return {
                      ...base,
                      color: value === EThemeMode.DARK ? '#fff' : '#000',
                    };
                  },
                  menu(base, props) {
                    return {
                      ...base,
                      backgroundColor: '#000',
                    };
                  },
                  option(base, props) {
                    return {
                      ...base,
                      backgroundColor: '#000',
                      cursor: 'pointer',
                    };
                  },
                }}
              />
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
