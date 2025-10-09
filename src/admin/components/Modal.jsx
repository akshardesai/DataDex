
import { createPortal } from "react-dom";

const Modal = ({isOpen, setIsOpen, header, footer, children}) => {
  return createPortal(
    <div
      class={`fixed  inset-0 z-[10001] flex justify-center items-center w-full  bg-white/10 backdrop-blur-[3px] ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div class="relative p-4 w-full max-w-md ">
        <div class="relative pb-4 bg-[#202020]  rounded-lg shadow-sm">
          {/* <=========== Header ==========> */}
          {header}
          {/* <=========== Children ==========> */}
          {children}
          {/* <=========== Footer ==========> */}
          {footer}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
