import NewsLetterSection from '../components/NewsLetterSection';

export default function Footer() {
  return (
    <>
      <NewsLetterSection />

      <footer className="relative isolate overflow-hidden bg-gray-900 text-gray-300 py-10 sm:py-20 lg:py-20 border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
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

        {/* Footer background decorative shape */}
        <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
      </footer>
    </>
  );
}
