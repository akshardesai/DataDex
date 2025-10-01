
import { createPortal } from "react-dom";

export default function ErrorModal({showError,setShowError}) {
  return createPortal(
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ease-out ${
          showError && showError.state ? "" : "hidden"
        }`}
      />

      {/* Modal */}
      <div
        className={`
        fixed top-1/2 left-1/2 transform -translate-x-1/2 
        w-[90%] max-w-md mx-auto p-6 z-50
        bg-gray-900 backdrop-blur-xl
        border border-gray-800 rounded-2xl shadow-2xl
        transition-all duration-300 ease-out
        ${ showError && showError.state ? "-translate-y-1/2" : "-translate-y-170"}
   border-red-400/30
      `}
      >
        {/* Close button */}
        <button
          onClick={()=>setShowError({state:false,message:""})}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors duration-200"
        >
          <i className="ri-close-line text-lg"></i>
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div
            className={`
            w-16 h-16 rounded-full flex items-center justify-center
        
              bg-red-400/10 text-red-400
            
          `}
          >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>

          </div>

          {/* Title */}
          <h2 className="text-xl font-medium text-white">Error</h2>

          {/* Message Body*/}
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
            { showError && showError.message||"Something went wrong! Please try again."}
          </p>

          {/* Action button */}
          <button
            onClick={()=>setShowError({state:false,message:""})}
            className={`
              mt-4 px-6 py-2.5 rounded-lg font-medium text-sm
              transition-all duration-200
              
            bg-red-500 text-white hover:bg-red-400 active:bg-red-600
              
            `}
          >
            Got it
          </button>
        </div>
      </div>
    </>,

    document.getElementById("portal")
  );
}
