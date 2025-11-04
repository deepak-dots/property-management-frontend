export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 mt-0">
      <div className="container mx-auto px-4">

        {/* ✅ Subscribe Section - Above Footer Content */}
        <div className="flex lg:items-center justify-between items-end lg:gap-11 pb-14 border-b border-white/10 lg:flex-nowrap flex-wrap gap-6">
          <p className="text-white text-sm lg:max-w-1/5">
            Stay updated with the latest news, promotions, and exclusive offers.
          </p>

          <div className="flex lg:flex-row flex-col items-center lg:gap-10 gap-3">
            <div className="flex gap-2 lg:order-1 order-2">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="rounded-full py-4 px-6 bg-white/10 placeholder:text-white text-white focus-visible:outline-0"
              />
              <button className="text-black bg-white py-4 px-8 font-semibold rounded-full hover:bg-white hover:text-black duration-300 hover:cursor-pointer">
                Subscribe
              </button>
            </div>
            <p className="text-white text-sm lg:max-w-[45%] order-1 lg:order-2">
              By subscribing, you agree to receive our promotional emails. You can
              unsubscribe at any time.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-white hover:text-primary duration-300"
                width="24"
                height="24"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="m218.12 209.56l-61-95.8l59.72-65.69a12 12 0 0 0-17.76-16.14l-55.27 60.84l-37.69-59.21A12 12 0 0 0 96 28H48a12 12 0 0 0-10.12 18.44l61 95.8l-59.76 65.69a12 12 0 1 0 17.76 16.14l55.31-60.84l37.69 59.21A12 12 0 0 0 160 228h48a12 12 0 0 0 10.12-18.44M166.59 204L69.86 52h19.55l96.73 152Z"
                ></path>
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-white hover:text-primary duration-300"
                width="24"
                height="24"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20m12 191.13V156h20a12 12 0 0 0 0-24h-20v-20a12 12 0 0 1 12-12h16a12 12 0 0 0 0-24h-16a36 36 0 0 0-36 36v20H96a12 12 0 0 0 0 24h20v55.13a84 84 0 1 1 24 0"
                ></path>
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-white hover:text-primary duration-300"
                width="24"
                height="24"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M128 80a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 72a24 24 0 1 1 24-24a24 24 0 0 1-24 24m48-132H80a60.07 60.07 0 0 0-60 60v96a60.07 60.07 0 0 0 60 60h96a60.07 60.07 0 0 0 60-60V80a60.07 60.07 0 0 0-60-60m36 156a36 36 0 0 1-36 36H80a36 36 0 0 1-36-36V80a36 36 0 0 1 36-36h96a36 36 0 0 1 36 36ZM196 76a16 16 0 1 1-16-16a16 16 0 0 1 16 16"
                ></path>
              </svg>
            </a>
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
              <li><a href="/page/about-us" className="hover:text-white transition-colors">About Us</a></li>
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
