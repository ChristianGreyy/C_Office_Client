'use client';

import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

import { useClientTranslation } from '@/i18n/client';

const AnimatedNumbers = dynamic(
  () => {
    return import('react-animated-numbers');
  },
  { ssr: false },
);

const AchievementsSection = () => {
  const { t } = useClientTranslation('Common');
  const achievementsList = useMemo(
    () => [
      {
        metric: t('Achieve.Projects'),
        value: '5',
        postfix: '+',
      },
      {
        metric: t('Achieve.Experience'),
        value: '2',
      },
      {
        prefix: '',
        metric: t('Achieve.Toeic'),
        value: '925',
      },
    ],
    [t],
  );
  return (
    <div className="px-4 py-8 sm:py-16 xl:gap-16 xl:px-16">
      <div className="flex flex-col items-center justify-between rounded-md px-16 py-8 sm:flex-row sm:border sm:border-[#33353F]">
        {achievementsList.map((achievement, index) => {
          return (
            <div
              key={index}
              className="mx-4 my-4 flex flex-col items-center justify-center sm:my-0"
            >
              <h2 className="flex flex-row text-4xl font-bold text-white">
                {achievement.prefix}
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="en-US"
                  className="text-4xl font-bold text-white"
                />
                {achievement.postfix}
              </h2>
              <p className="text-base text-[#ADB7BE]">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
