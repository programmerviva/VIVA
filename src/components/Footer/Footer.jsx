import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-200">
      {/* Top Wave Pattern */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-wave-pattern bg-repeat-x transform -translate-y-1/2"></div>

      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Logo and Copyright Section */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <Logo width="120px" className="brightness-150" />
              <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                Discover the extraordinary with VIVA. We`re dedicated to
                bringing you innovative solutions and exceptional experiences.
              </p>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} VIVA. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  to="/"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  to="/"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  to="/"
                >
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  to="/"
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  to="/"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  to="/"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  to="/"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  to="/"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  to="/"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  to="/"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  to="/"
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-2 md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6">
              Stay Updated
            </h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors duration-200"
              />
              <button className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cookies
              </Link>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
