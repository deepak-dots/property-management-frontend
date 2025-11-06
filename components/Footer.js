import { useState } from 'react';
import axios from '../utils/axiosInstance'; 

export default function Footer() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); 
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) return setMessage('Please enter your email.');
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
    <footer className="bg-black text-gray-300 py-10 mt-0">
      <div className="container mx-auto px-4">

         {/* Subscribe Section */}
         <div className="flex lg:items-center justify-between items-end lg:gap-11 pb-14 border-b border-white/10 lg:flex-nowrap flex-wrap gap-6">
          <p className="text-white text-sm lg:max-w-1/5">
            Stay updated with the latest news, promotions, and exclusive offers.
          </p>

          <div className="flex lg:flex-row flex-col items-center lg:gap-10 gap-3">
            <div className="flex gap-2 lg:order-1 order-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="rounded-full py-4 px-4 bg-white/10 placeholder:text-white text-white focus-visible:outline-0"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="rounded-full py-4 px-6 bg-white/10 placeholder:text-white text-white focus-visible:outline-0"
              />
              <button
                onClick={handleSubscribe}
                className="text-black bg-white py-4 px-8 font-semibold rounded-full hover:bg-white hover:text-black duration-300 hover:cursor-pointer"
              >
                Subscribe
              </button>
            </div>
            <p className="text-white text-sm lg:max-w-[45%] order-1 lg:order-2">
              {message || 'By subscribing, you agree to receive our promotional emails. You can unsubscribe at any time.'}
            </p>
          </div>
        </div>

        {/* ✅ Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mt-14">
          
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-sm leading-relaxed">
              Dotsquares Property is your trusted partner in finding the perfect home.
              We specialize in offering premium real estate solutions tailored to your needs.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/properties" className="hover:text-white transition-colors">Properties</a></li>
              <li><a href="/blogs" className="hover:text-white transition-colors">Blogs</a></li>
              <li><a href="/page/about-us" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/page/contact-us" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/page/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/page/terms-and-conditions" className="hover:text-white transition-colors">Terms and Conditions</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Link</h3>
            <ul className="space-y-2 text-sm text-center md:text-left">
              <li className="hover:text-white transition-colors cursor-default">Facebook</li>
              <li className="hover:text-white transition-colors cursor-default">Twitter</li>
              <li className="hover:text-white transition-colors cursor-default">Instagram</li>
            </ul>
          </div>

        </div>

        {/* Bottom text */}
        <div className="text-center mt-8 border-t border-gray-700 pt-4 text-sm">
          <p>© {new Date().getFullYear()} Dotsquares Property. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
