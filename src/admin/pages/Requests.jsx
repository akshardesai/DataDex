import { useState } from "react";
import RequestCard from "../components/dailyLogs/RequestCard";
import AllLogs from "../components/dailyLogs/AllLogs";

const Requests = () => {
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
                  Requests Manager
                </h5>
              </div>
              <p className="font-sans text-xs sm:text-sm text-gray-400 ml-3 sm:ml-4">
                Track and manage member requests
              </p>
            </div>
          </div>


          <RequestCard />
          
        </div>
      </div>

      {/* Content Section */}
      <AllLogs />
      
      
    </div>
  );
};

export default Requests;
