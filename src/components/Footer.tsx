import { Facebook, Twitter, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 pt-16 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* First Column - Profile Picture */}
          <div className="flex flex-col items-center text-center">
            <img 
              src="/src/assets/m-sharique-sabir.jpeg" 
              alt="M Sharique Sabir" 
              className="w-23 h-30 rounded-md mb-4 border-4 border-indigo-600 dark:border-indigo-400 shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">M Sharique Sabir</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Full Stack Developer & UI/UX Designer
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="https://www.linkedin.com/in/m-sharique-sabir/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Second Column - Profile Data */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-3 mt-1 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Email</p>
                  <a href="mailto:mohammadsharique2409950@gmail.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                   <span>mohammadsharique2409950<br/>@gmail.com</span>
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MessageCircle className="h-4 w-4 mr-3 mt-1 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">WhatsApp</p>
                  <a href="https://wa.me/923392409950" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    +92 339 2409950
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Linkedin className="h-4 w-4 mr-3 mt-1 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/m-sharique-sabir/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Third Column - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="/shop" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Shop</a></li>
              <li><a href="/cart" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cart</a></li>
              <li><a href="/profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Profile</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Fourth Column - Stay Updated */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="flex flex-col space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                />
                <Mail className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <button className="w-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-300 dark:border-gray-700 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} M-Sharique-Sabir. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
