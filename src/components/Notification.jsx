import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Notification({ notification, setNotification }) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setNotification({ state: false, message: "" });
    }, 5000);
    return () => clearTimeout(timeOut); // cleanup
  }, [notification]);

  return createPortal(
    <>
      {/* Modal */}
      <div
        className={`
      
        backdrop-blur-2xl
        fixed top-[21.5%] md:top-[15%] -right-3 
        w-fit px-3 py-2 md:px-4  z-50
        bg-gray-900 
          rounded-xl shadow-2xl
        transition-all duration-500 ease-in-out border
        border-gray-600 
        ${
          notification && notification.state
            ? "translate-x-0"
            : "translate-x-80 "
        }
      `}
      >
        <div className="flex  items-center gap-2 ">
          {/* Message */}
          <p className="">
            <svg
              className="w-5 h-5 text-lime-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path>
            </svg>
          </p>

          <p className="text-white">{(notification && notification.message) || "Done!"}</p>
        </div>
      </div>
    </>,document.getElementById("portal")
  );
}
