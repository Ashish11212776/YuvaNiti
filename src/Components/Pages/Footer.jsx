import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto px-6">
        {/* Footer top section (columns for links) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are a team dedicated to providing the best experience for our
              users. Our platform offers a variety of services to help you stay
              connected and productive.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-500">
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="text-gray-400 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-blue-500">
                  Log in
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">Email: yuvaneeti34@gmail.com</p>
            <p className="text-gray-400">Phone: +1 (800) 123-4567</p>
            <p className="text-gray-400"> +91 7453626842</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">© 2025 . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
