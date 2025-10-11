import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../commonUtils/firebase";
import { processRequest } from "../../utils/Request";

export default function RequestCard() {
  const [allRequests, setAllRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const requestRef = collection(db, "requests");
    const q = query(requestRef, orderBy("requestTime", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedRequests = [];
      querySnapshot.forEach((doc) => {
        fetchedRequests.push({ id: doc.id, ...doc.data() });
      });
      setAllRequests(fetchedRequests);
      setCurrentIndex(0);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);



  
  if (isLoading) {
      return (
          <div className="text-white text-center p-10">Loading requests...</div>
        );
    }
    
    if (allRequests.length === 0) {
        return (
            <div className="text-white text-center p-10">
            No pending requests.
          </div>
        );
    }

      const handleAction = async (decision) => {
        if (allRequests.length === 0) return;

        const requestToProcess = allRequests[currentIndex];
          const response = await processRequest(requestToProcess, decision);
          if (response.success) {
            console.log('done');
            
          } else {
              console.error(`Got an error ${response.error}`);
              
          }

        // The listener will automatically remove the processed request from the state.
        // No need to manually advance the index.
    };
    
    
    
    
    const currentRequest = allRequests[currentIndex];

      const formatTime = (timestamp) => {
        if (!timestamp) return "N/A";
        return timestamp.toDate().toLocaleTimeString();
      };


  return (
    <>
      {/* Request Card */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:px-96">
        <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm rounded-xl border border-neutral-700/50 overflow-hidden shadow-2xl hover:shadow-lime-500/10 transition-all duration-300">
          {/* Card Header */}
          <div className="bg-neutral-900/50 px-4 py-3 border-b border-neutral-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h6 className="capitalize font-semibold text-white text-sm sm:text-base">
                  {currentRequest.memberName} - {currentRequest.idNo}
                </h6>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              {currentIndex + 1} / {allRequests.length}
            </div>
          </div>

          {/* Card Body */}
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-500/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-lime-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 mb-1">Request Type</p>
                  <p className="text-sm font-medium text-white capitalize">
                    {currentRequest.requestType}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 mb-1">Request Time</p>
                  <p className="text-sm font-medium text-white">
                    {formatTime(currentRequest.requestTime)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex justify-end gap-3">
              <button
                onClick={() => handleAction("accept")}
                className="py-1 px-3 bg-lime-300 hover:bg-lime-400 text-neutral-900 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-lime-500/50 flex items-center justify-center gap-2"
              >
                <span className="text-sm sm:text-base">Accept</span>
              </button>
              <button
                onClick={() => handleAction("decline")}
                className="py-1 px-3 bg-neutral-700/50 hover:bg-red-500/20 text-gray-300 hover:text-red-400 font-semibold rounded-lg transition-all duration-200 border border-neutral-600/50 hover:border-red-500/50 flex items-center justify-center gap-2"
              >
                <span className="text-sm sm:text-base">Decline</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
