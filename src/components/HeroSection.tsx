'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

import { useClientTranslation } from '@/i18n/client';

import heroImage from '@public/images/hero-image.png';

const HeroSection = () => {
  const { t } = useClientTranslation('Common');
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center justify-self-start text-center sm:text-left"
        >
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl lg:leading-normal 2xl:text-8xl">
            <span className="bg-gradient-to-r from-primary-400 to-secondary-600 bg-clip-text text-transparent">
              {t('Hero.Hello')}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                t('Info.Name'),
                1000,
                t('Info.Position1'),
                1000,
                t('Info.Position2'),
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="mb-6 text-base text-[#ADB7BE] sm:text-lg lg:text-xl">
            {t('Info.Description')}
          </p>
          <div>
            <Link
              href="/#contact"
              className="mr-4 inline-block w-full rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 px-6 py-3 text-white hover:bg-slate-200 sm:w-fit"
            >
              {t('Common:HireMe')}
            </Link>
            <Link
              target="_blank"
              href="https://www.topcv.vn/xem-cv/VgUFUAJRAANVUlUMBVELB1UPAlNUUVdWXAsFCw5904"
              className="mt-3 inline-block w-full rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 px-1 py-1 text-white hover:bg-slate-800 sm:w-fit"
            >
              <span className="block rounded-full bg-[#121212] px-5 py-2 hover:bg-slate-800">
                {t('Common:CV')}
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 mt-4 place-self-center lg:mt-0"
        >
          <div className="relative h-[250px] w-[250px] rounded-full bg-[#181818] 2xl:h-[400px] 2xl:w-[400px]">
            <Image
              src={heroImage}
              alt="hero image"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
