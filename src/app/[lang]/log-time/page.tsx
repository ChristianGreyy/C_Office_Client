'use client';

// This is a client component 👈🏽
import moment from 'moment';
import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { Button } from '@/common';

export default function LogTime() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <div className="container mt-24 flex">
          <div className="flex basis-2/3 flex-col items-center">
            <div>Current time:</div>
            <h1 className="mb-5 mt-5 text-5xl font-bold">
              {moment(value).format('LTS')}
            </h1>
            <Clock value={value} />
            <textarea
              className="mt-10 border-2 border-solid border-gray-400 p-2"
              name=""
              id=""
              cols="40"
              rows="5"
              placeholder="note"
            ></textarea>
            <div className="log-time-button flex justify-between w-3/12">
              <div className="check-in-button">
                <Button>Check in</Button>
                {/* <button>07:59</button> */}
              </div>
              <div className="check-out-button">
                <Button>Check out</Button>
                {/* <button>07:59</button> */}
              </div>
            </div>
          </div>
          <div className="basis-1/3">02</div>
        </div>
        <Footer />
      </main>
    </Providers>
  );
}
