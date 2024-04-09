'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

import { useClientTranslation } from '@/i18n/client';

import ProjectCard from './ProjectCard';
import ProjectTag from './ProjectTag';

const ProjectsSection = () => {
  const { t } = useClientTranslation('Common');
  const projectsData = [
    {
      id: 1,
      title: 'Master of trivial web',
      description: t('Project1.Description'),
      image: '/images/projects/1.png',
      tag: ['All', 'Web'],
      gitUrl: '/',
      previewUrl: 'https://demo.mastersoftrivia.com',
    },
    {
      id: 2,
      title: 'Live life clean Website',
      description: t('Project2.Description'),
      image: '/images/projects/2.png',
      tag: ['All', 'Web'],
      gitUrl: '/',
      previewUrl: 'https://livelifeclean.com/',
    },
    {
      id: 3,
      title: 'Live life clean App',
      description: t('Project2.Description'),
      image: '/images/projects/3.png',
      tag: ['All', 'Mobile'],
      gitUrl: '/',
      previewUrl: '/',
    },
    {
      id: 4,
      title: 'Madecomfy Property Management System Services',
      description: t('Project4.Description'),
      image: '/images/projects/4.jpg',
      tag: ['All', 'Web'],
      gitUrl: '/',
      previewUrl: 'https://madecomfy.com.au/',
    },
    {
      id: 5,
      title: 'Travelbrands New IQ tool',
      description: t('Project5.Description'),
      image: '/images/projects/5.png',
      tag: ['All', 'Web'],
      gitUrl: '/',
      previewUrl: 'https://tbi-iq-frontend.dev.tbidevelopment.ca/',
    },
    {
      id: 6,
      title: 'GoodHuman website',
      description: t('Project6.Description'),
      image: '/images/projects/6.png',
      tag: ['All', 'Web'],
      gitUrl: '/',
      previewUrl: 'https://www.goodhuman.me/',
    },
    {
      id: 6,
      title: 'GoodHuman App',
      description: t('Project6.Description'),
      image: '/images/projects/7.png',
      tag: ['All', 'Mobile'],
      gitUrl: '/',
      previewUrl: 'https://apps.apple.com/au/app/goodhuman/id1491399841',
    },
  ];
  const [tag, setTag] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag),
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="mb-8 mt-4 text-center text-4xl font-bold text-white md:mb-12">
        {t('Common:MyProjects')}
      </h2>
      <div className="flex flex-row items-center justify-center gap-2 py-6 text-white">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === 'All'}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === 'Web'}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === 'Mobile'}
        />
      </div>
      <ul ref={ref} className="grid gap-8 md:grid-cols-3 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
