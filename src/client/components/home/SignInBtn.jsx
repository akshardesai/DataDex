import { useState } from "react";


import SignInModal from "./SignInModal";

const SignInBtn = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <>
      <a
        onClick={() => setIsModalOpen(true)}
        className="group relative inline-flex items-center justify-center -mt-8 cursor-pointer"
      >
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 bg-black"></div>
        <span className="relative border border-black bg-white px-8 py-3 font-mono text-sm tracking-wide transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5">
          Sign In
        </span>
      </a>

      <SignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        
      />
    </>
  );
};

export default SignInBtn;
