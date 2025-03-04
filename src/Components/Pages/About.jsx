
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* About Section */}
      <div className="container mx-auto py-12 space-y-8">
        {/* About Us Block */}
        <div className="bg-blue-100 p-8 rounded-lg shadow-md">
          <h3 className="text-3xl font-semibold mb-4 text-gray-800">About Us</h3>
          <p className="text-gray-700">We are a team dedicated to providing the best experience for our users. Our platform offers a variety of services to help you stay connected and productive.</p>
        </div>

        {/* Quick Links Block */}
        <div className="bg-green-100 p-8 rounded-lg shadow-md">
          <h3 className="text-3xl font-semibold mb-4 text-gray-800">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-gray-800 hover:text-green-500">Home</a></li>
            <li><a href="/about" className="text-gray-800 hover:text-green-500">About</a></li>
            <li><a href="/contact" className="text-gray-800 hover:text-green-500">Sign up</a></li>
            <li><a href="/contact" className="text-gray-800 hover:text-green-500">Log in</a></li>
          </ul>
        </div>

        {/* Contact Block */}
        <div className="bg-yellow-100 p-8 rounded-lg shadow-md">
          <h3 className="text-3xl font-semibold mb-4 text-gray-800">Contact</h3>
          <p className="text-gray-700">Email: yuvaneeti34@gmail.com</p>
          <p className="text-gray-700">Phone: +1 (800) 123-4567</p>
          <p className="text-gray-700">+91 7453626842</p>
        </div>

        {/* Follow Us Block */}
        <div className="bg-purple-100 p-8 rounded-lg shadow-md">
          <h3 className="text-3xl font-semibold mb-4 text-gray-800">Follow Us</h3>
          <div className="flex justify-center sm:justify-start space-x-4">
            <a href="#" className="text-gray-800 hover:text-blue-500">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-500">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-500">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-500">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="bg-gray-200 py-4 text-center border-t border-gray-300">
        <p className="text-gray-600 text-sm">© 2025 All rights reserved.</p>
      </div>
    </div>
  )
}

export default About;
