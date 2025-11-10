import { useState } from 'react';
import axios from '../utils/axiosInstance';
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) return setMessage('Please enter your email.');
  
    // Simple regex to check valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setMessage('Please enter a valid email.');
    }
  
    try {
      const res = await axios.post('/user/newsletter/subscribe', { email, name });
      setMessage(res.data.message || 'Subscribed!');
      setEmail('');
      setName('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    }
  };
  

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 text-gray-300 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          
          {/* Left side - Title + Input */}
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Stay updated with the latest news, promotions, and exclusive offers.
            </p>

            <div className="mt-6 flex max-w-md gap-x-4">
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-auto rounded-full py-4 px-6 bg-white/10 placeholder:text-white text-white focus-visible:outline-0"
              />
              <button
                onClick={handleSubscribe}
                className="flex-none rounded-full bg-white text-black py-4 px-8 font-semibold hover:bg-white-500 hover:text-black transition duration-300"
              >
                Subscribe
              </button>
            </div>

            {message && (
              <p className="mt-3 text-sm text-indigo-400">{message}</p>
            )}
          </div>

          {/* Right side - Features */}
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">Weekly updates</dt>
              <dd className="mt-2 text-base text-gray-400">
                Get curated property insights, blogs, and new launches every week.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">No spam ever</dt>
              <dd className="mt-2 text-base text-gray-400">
                We respect your inbox. Only valuable content, no spam.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Background decorative shape */}
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(70% 40%, 95% 55%, 85% 15%, 75% 0%, 65% 25%, 50% 60%, 35% 70%, 25% 50%, 10% 80%, 0 60%, 20% 100%, 40% 85%, 70% 40%)',
          }}
          className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-[#fcd34d] to-[#f87171] opacity-30"
        />
      </div>
    </div>
  );
}
