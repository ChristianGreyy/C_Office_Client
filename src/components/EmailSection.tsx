'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import GithubIcon from '@public/github-icon.svg';
import LinkedinIcon from '@public/linkedin-icon.svg';

import { useClientTranslation } from '../i18n/client';

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const { t } = useClientTranslation('Common');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        email: e.target.email.value,
        subject: e.target.subject.value,
        message: e.target.message.value,
      };
      const JSONdata = JSON.stringify(data);
      const endpoint = '/api/send';

      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
          'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
      };

      await fetch(endpoint, options);
      // const resData = await response.json();

      setIsSuccess(true);

      // if (response.status === 200) {
      //   console.log('Message sent.');
      //   setEmailSubmitted(true);
      // }
      if (emailRef.current && subjectRef.current && messageRef.current) {
        emailRef.current.value = '';
        subjectRef.current.value = '';
        messageRef.current.value = '';
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeout: any;
    if (isSuccess) {
      timeout = setTimeout(() => {
        setIsSuccess(null);
      }, 2000);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [isSuccess]);

  return (
    <section
      id="contact"
      className="relative my-12 grid gap-4 py-24 md:my-12 md:grid-cols-2"
    >
      <div className="-translate-1/2 absolute -left-4 top-3/4 z-0 h-80 w-80 -translate-x-1/2 transform rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent blur-lg"></div>
      <div className="z-10">
        <h5 className="my-2 text-xl font-bold text-white">
          {t('EmailSection.Connect')}
        </h5>
        <p className="mb-4 max-w-md text-[#ADB7BE]">
          {t('EmailSection.Description')}
        </p>
        <div className="socials flex flex-row gap-2">
          <Link
            href="https://www.linkedin.com/in/l%C3%A2n-nguy%E1%BB%85n-%C4%91%C4%83ng-b77b52292/"
            target="_blank"
          >
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
        </div>
      </div>
      <div>
        {emailSubmitted ? (
          <p className="mt-2 text-sm text-green-500">
            Email sent successfully!
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white"
              >
                {t('EmailSection.YourEmail')}
              </label>
              <input
                ref={emailRef}
                name="email"
                type="email"
                id="email"
                required
                className="block w-full rounded-lg border border-[#33353F] bg-[#18191E] p-2.5 text-sm text-gray-100 placeholder-[#9CA2A9]"
                placeholder="jacob@google.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-white"
              >
                {t('EmailSection.Subject')}
              </label>
              <input
                ref={subjectRef}
                name="subject"
                type="text"
                id="subject"
                required
                className="block w-full rounded-lg border border-[#33353F] bg-[#18191E] p-2.5 text-sm text-gray-100 placeholder-[#9CA2A9]"
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-white"
              >
                {t('EmailSection.Message')}
              </label>
              <textarea
                ref={messageRef}
                name="message"
                id="message"
                className="block w-full rounded-lg border border-[#33353F] bg-[#18191E] p-2.5 text-sm text-gray-100 placeholder-[#9CA2A9]"
                placeholder="Let's talk about..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary-500 px-5 py-2.5 font-medium text-white hover:bg-primary-600"
            >
              {isLoading
                ? t('EmailSection.ButtonSending')
                : isSuccess !== null
                  ? isSuccess
                    ? t('EmailSection.ButtonSuccess')
                    : t('EmailSection.ButtonFailed')
                  : t('EmailSection.Button')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
