import { RefreshCw, Home, MessageCircle } from "lucide-react";

const StatusReject = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 bg-red-50 border-b border-red-100">
          <div className="flex justify-center">
            <svg
              className="w-32 h-32"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
          
              <rect
                x="60"
                y="60"
                width="80"
                height="80"
                rx="8"
                fill="#F3F4F6"
                stroke="#E5E7EB"
                strokeWidth="2"
              />
              <circle cx="85" cy="90" r="8" fill="#EF4444" />
              <circle cx="115" cy="90" r="8" fill="#EF4444" />
              <path
                d="M85 120 C85 128, 115 128, 115 120"
                stroke="#6B7280"
                strokeWidth="3"
                fill="none"
              />
              <path d="M50 100 L30 85 L30 115 Z" fill="#E5E7EB" />
              <path d="M150 100 L170 85 L170 115 Z" fill="#E5E7EB" />
              <path
                d="M75 40 L85 60 M125 40 L115 60"
                stroke="#6B7280"
                strokeWidth="3"
              />
              <circle
                cx="75"
                cy="35"
                r="6"
                fill="#F3F4F6"
                stroke="#6B7280"
                strokeWidth="2"
              />
              <circle
                cx="125"
                cy="35"
                r="6"
                fill="#F3F4F6"
                stroke="#6B7280"
                strokeWidth="2"
              />
              <path
                d="M60 160 L70 140 M140 160 L130 140"
                stroke="#6B7280"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
           {" We're experiencing some technical difficulties. Don't worry, it's"}
            not your fault!
          </p>

          <div className="space-y-3">
            <button
              onClick={handleRefresh}
              className="w-full flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Try Again
            </button>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="/"
                className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </a>

              <a
                href="/contact"
                className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Support
              </a>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 text-sm text-gray-500 text-center border-t border-gray-100">
          <p>Error Code: SERVER_ERROR_500</p>
          <p className="mt-1">
            If this problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusReject;
