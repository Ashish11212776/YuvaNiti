import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-auto">
      <div className="container mx-auto px-6">
        {/* Footer top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are a team dedicated to providing the best experience for our
              users. Our platform offers various services to help you stay connected and productive.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Sign up", "Log in"].map((text, index) => (
                <li key={index}>
                  <Link
                    to={`/${text.toLowerCase().replace(" ", "")}`}
                    className="text-gray-400 hover:text-blue-500 transition duration-300"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">Email: <a href="mailto:yuvaneeti34@gmail.com" className="hover:text-blue-500 transition">yuvaneeti34@gmail.com</a></p>
            <p className="text-gray-400">Phone: <a href="tel:+18001234567" className="hover:text-blue-500 transition">+1 (800) 123-4567</a></p>
            <p className="text-gray-400">Phone: <a href="tel:+917453626842" className="hover:text-blue-500 transition">+91 7453626842</a></p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, link: "#" },
                { icon: FaTwitter, link: "#" },
                { icon: FaInstagram, link: "#" },
                { icon: FaLinkedinIn, link: "#" },
              ].map(({ icon: Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} YuvaNeeti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
