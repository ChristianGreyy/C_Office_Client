'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { useClientTranslation } from '@/i18n/client';

import adamo from '@public/images/adamo.png';
import powergate from '@public/images/powergate.png';
import slitigenz from '@public/images/slitigenz.png';

type Props = {};

const TimeLineSection = (props: Props) => {
  const { t } = useClientTranslation('Common');
  return (
    <section id="timeline">
      <h2 className="mb-8 mt-4 text-center text-4xl font-bold text-white md:mb-12">
        {t('Timeline.Title')}
      </h2>
      <VerticalTimeline animate={false}>
        <VerticalTimelineElement
          contentStyle={{
            background: 'linear-gradient(270deg, #c084fc, #db2777)',
            color: '#fff',
          }}
          contentArrowStyle={{ borderRight: '7px solid  white' }}
          date={`09/2023 - ${t('Common:Present')}`}
          iconStyle={{ background: 'white', color: '#fff', cursor: 'pointer' }}
          icon={
            <Link
              href={'https://slitigenz.io/'}
              target="_blank"
              className="cursor-pointer"
            >
              <Image
                src={slitigenz}
                alt="slitigenz"
                width={60}
                height={60}
                className="h-full w-full object-contain"
              />
            </Link>
          }
        >
          <h3 className="vertical-timeline-element-title">
            Freelance web developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            SLI TECHNOLOGY COMPANY LIMITED
          </h4>
          <p>
            As a freelancer, proactively breaking down tasks and researching new
            technologies requested by clients is essential for success
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          date={`04/2023 - ${t('Common:Present')}`}
          contentStyle={{
            background: 'linear-gradient(90deg, #c084fc, #db2777)',
            color: '#fff',
          }}
          iconStyle={{ background: 'white', color: '#000', cursor: 'pointer' }}
          icon={
            <Link
              href={'https://adamosoft.com/'}
              target="_blank"
              className="cursor-pointer"
            >
              <Image
                src={adamo}
                alt="adamo"
                width={60}
                height={60}
                className="h-full w-full object-contain"
              />
            </Link>
          }
        >
          <h3 className="vertical-timeline-element-title">
            Front-end developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Adamo Software</h4>
          <p>
            Working directly with customers in the Australian and Dutch focusing
            on bookings, e-commercials, and health-care domains. Setting up a
            new base for front-end team, handle building the app for both
            Android and iOS.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          date="08/2022 - 03/2023"
          contentStyle={{
            background: 'linear-gradient(270deg, #c084fc, #db2777)',
            color: '#fff',
          }}
          iconStyle={{ background: 'white', color: '#000' }}
          icon={
            <Link
              href={'https://powergateaustralia.com.au/'}
              target="_blank"
              className="cursor-pointer"
            >
              <Image
                src={powergate}
                alt="powergate"
                width={60}
                height={60}
                className="h-full w-full object-contain"
              />
            </Link>
          }
        >
          <h3 className="vertical-timeline-element-title">
            Front-end developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Powergate Australia
          </h4>
          <p>
            Building website, app following customer design, update new
            technologies such as react native, unit-test,...
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </section>
  );
};

export default TimeLineSection;
