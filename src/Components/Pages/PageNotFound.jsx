import { ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-extrabold text-gray-900 mb-6">
          4<span className="text-blue-500">0</span>4
        </h1>

        <div className="mb-8 flex justify-center">
          <svg
            className="w-64 h-64"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" fill="#EDF2F7" />
            <path
              d="M65 80 L100 115 L135 80"
              stroke="#3B82F6"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M100 80 L100 140"
              stroke="#3B82F6"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="100" cy="160" r="5" fill="#3B82F6" />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page {"you're"} looking for {"doesn't"} exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <a
          href="/"
          className="inline-flex items-center px-5 py-3 bg-blue-500 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
