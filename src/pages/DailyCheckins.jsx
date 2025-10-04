import { useState } from "react";

const DailyCheckins = () => {
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex flex-col w-full h-full text-white bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-2xl rounded-2xl overflow-hidden border border-neutral-700/50">
      {/* Enhanced Header Section with Gradient Overlay */}
      <div className="relative bg-gradient-to-r from-neutral-800/90 to-neutral-900/90 backdrop-blur-sm border-b border-neutral-700/50">
        <div className="mx-3 sm:mx-4 lg:mx-6 mt-3 sm:mt-4 lg:mt-6 mb-3 sm:mb-4 lg:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-4 lg:mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-lime-400 to-lime-600 rounded-full"></div>
                <h5 className="font-sans text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white">
                  Daily Check-ins
                </h5>
              </div>
              <p className="font-sans text-xs sm:text-sm text-gray-400 ml-3 sm:ml-4">
                Track and manage daily member check-ins
              </p>
            </div>

            {/* Add Check-in button - Desktop only */}
            <div className="hidden lg:block flex-shrink-0">
              <button className="px-4 py-2 bg-lime-500 text-black rounded-lg hover:bg-lime-400 transition-all">
                New Check-in
              </button>
            </div>
          </div>

          {/* Enhanced Controls Section */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search Bar - Always Visible */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-1 lg:flex-none lg:w-79">
                <div className="absolute inset-y-0 right-3 sm:right-4 z-1 flex items-center">
                  <button>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path>
                    </svg>
                  </button>
                </div>
                <input
                  className="w-full h-10 sm:h-11 lg:h-12 rounded-lg sm:rounded-xl border-2 border-neutral-700/50 focus:border-lime-300 outline-none bg-neutral-900/60 backdrop-blur-sm pr-10 sm:pr-12 pl-3 sm:pl-4 font-sans text-xs sm:text-sm font-normal text-white placeholder-gray-500 transition-all duration-300 shadow-lg focus:shadow-lime-500/20"
                  placeholder="Search check-ins..."
                />
              </div>

              {/* Mobile: Dropdown Toggle Button */}
              <div className="lg:hidden flex-shrink-0">
                <button
                  onClick={() => setShowMobileControls(!showMobileControls)}
                  className="flex items-center justify-center p-2 sm:p-2.5 rounded-lg bg-neutral-900/80 backdrop-blur-sm border-2 border-neutral-700/50 text-gray-300 hover:text-white hover:border-lime-500/50 transition-all duration-300"
                >
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                      showMobileControls ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile: Collapsible Controls */}
            <div
              className={`lg:hidden flex flex-col gap-3 overflow-hidden transition-all duration-300 ${
                showMobileControls
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {/* Tabs */}
              <div className="flex-shrink-0">
                <nav className="inline-flex w-full">
                  <ul className="relative flex flex-row w-full p-1.5 rounded-xl bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 shadow-lg">
                    {["all", "today", "weekly"].map((tab) => (
                      <li
                        key={tab}
                        role="tab"
                        className={`relative flex items-center justify-center h-full flex-1 py-2 font-sans text-xs sm:text-sm font-medium tracking-wide cursor-pointer select-none transition-all duration-300 rounded-lg ${
                          activeTab === tab
                            ? "text-black"
                            : "text-gray-400 hover:text-gray-200"
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        <div className="relative z-10 capitalize">{tab}</div>
                        {activeTab === tab && (
                          <div className="absolute inset-0 h-full bg-gradient-to-r from-lime-200 to-lime-300 rounded-lg shadow-lg transition-all duration-300"></div>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Add Check-in Button - Mobile */}
              <button className="w-full px-4 py-2 bg-lime-500 text-black rounded-lg hover:bg-lime-400 transition-all">
                New Check-in
              </button>
            </div>

            {/* Desktop: Horizontal Layout */}
            <div className="hidden lg:flex lg:items-center lg:justify-between gap-5">
              {/* Stylish Tabs */}
              <div className="flex-shrink-0">
                <nav className="inline-flex">
                  <ul className="relative flex flex-row p-1.5 rounded-xl bg-neutral-900/80 backdrop-blur-sm border-2 border-neutral-700/50 shadow-lg">
                    {["all", "today", "weekly"].map((tab) => (
                      <li
                        key={tab}
                        role="tab"
                        className={`relative flex items-center justify-center h-full px-6 lg:px-8 py-2.5 font-sans text-sm font-medium tracking-wide cursor-pointer select-none transition-all duration-300 rounded-lg ${
                          activeTab === tab
                            ? "text-black"
                            : "text-gray-400 hover:text-gray-200"
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        <div className="relative z-10 capitalize">{tab}</div>
                        {activeTab === tab && (
                          <div className="absolute inset-0 h-full bg-gradient-to-r from-lime-200 to-lime-300 rounded-lg shadow-lg transition-all duration-300"></div>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-hidden bg-neutral-900/30">
        {/* Desktop/Tablet View */}
        <div className="hidden lg:block h-full overflow-auto px-6 lg:px-8 py-6">
          <div className="bg-neutral-900/60 backdrop-blur-sm rounded-xl border border-neutral-700/50 overflow-hidden shadow-xl p-6">
            <p className="text-gray-400 text-center">No check-ins available</p>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden px-2 sm:px-3 h-full overflow-y-auto py-2 sm:py-3">
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm">No check-ins available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckins;
