'use client';

import Image from 'next/image';
import { useMemo, useState, useTransition } from 'react';

import TabButton from '@/components/TabButton';
import { useClientTranslation } from '@/i18n/client';

import aboutImage from '@public/images/about-image.png';

const AboutSection = () => {
  const [tab, setTab] = useState('skills');
  const [isPending, startTransition] = useTransition();

  const { t } = useClientTranslation('Common');

  const TAB_DATA = useMemo(
    () => [
      {
        title: 'Skills',
        id: 'skills',
        content: (
          <ul className=" list-disc pl-2">
            <li>Javascript</li>
            <li>Typescript</li>
            <li>HTML, CSS</li>
            <li>Node.js</li>
            <li>React</li>
            <li>React native</li>
            <li>Next</li>
          </ul>
        ),
      },
      {
        title: 'Education',
        id: 'education',
        content: (
          <ul className="list-disc pl-2">
            <li>{t('About.Uni')}</li>
            <li>{t('About.Uni2')}</li>
          </ul>
        ),
      },
      {
        title: 'Certifications',
        id: 'certifications',
        content: (
          <ul className="list-disc pl-2">
            <li>925 Toeic</li>
          </ul>
        ),
      },
    ],
    [t],
  );

  const handleTabChange = (id: any) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="items-center gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-2 xl:gap-16 xl:px-16">
        <Image alt="about" src={aboutImage} width={500} height={500} />
        <div className="mt-4 flex h-full flex-col text-left md:mt-0">
          <h2 className="mb-4 text-4xl font-bold text-white">
            {t('About.Title')}
          </h2>
          <p className="text-base lg:text-lg">{t('About.Description')}</p>
          <div className="mt-8 flex flex-row justify-start">
            <TabButton
              selectTab={() => handleTabChange('skills')}
              active={tab === 'skills'}
            >
              {t('About.Skills')}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange('education')}
              active={tab === 'education'}
            >
              {t('About.Education')}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange('certifications')}
              active={tab === 'certifications'}
            >
              {t('About.Certifications')}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA?.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
