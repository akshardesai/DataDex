// src/components/CommentModal.jsx
import { useState } from "react";
import { LogInDB } from "../../utils/Members";
import { useNavigate } from "react-router-dom";

const SignInModal = ({ isOpen, onClose }) => {
  const [code, setCode] = useState("");
  const [isHovering, setIsHovering] = useState(true);
  const navigate = useNavigate()

  if (!isOpen) return null;

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("code-", code);

    const response = await LogInDB(code)

    if (response.success) {
      console.log('login done data', response.data);
      if (response.data==="admin") {
        // alert('welcome admin')
        navigate("/admin-dashboard")
      } else {
        // alert(`${response.data.name} member login successfull `)
        navigate("/profile")
      }
        
    } else {
        console.error(`failed to login`,response.error);
        
    }

    setCode("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black opacity-80  bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container with offset shadow effect */}
      <div className="relative bg-white w-full max-w-sm mx-4 border  transform transition-all">
        {/* Shadow element that moves on hover */}
        <div
          className={`absolute inset-0 bg-black transition-transform duration-300 ${
            isHovering
              ? "translate-x-0 translate-y-0"
              : "translate-x-2 translate-y-2"
          }`}
        />

        {/* Actual modal content */}
        <div
          className="relative bg-white  p-6"
          onMouseEnter={() => setIsHovering(false)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-mono text-sm tracking-widest uppercase">
              Sign In
            </h3>
            <button onClick={onClose} className="font-mono text-sm">
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            <div className="relative">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                placeholder="Code.."
                className="w-full border border-gray-300 px-2 py-1"
              />
              <div className="absolute -bottom-2 -right-2 h-full w-full border border-gray-300 -z-10" />
            </div>

            {/* Submit button with hover effect similar to main page */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="group relative inline-flex items-center justify-center "
                disabled={code.trim().length < 5}
              >
                <div className="absolute inset-0 translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 bg-black" />
                <span
                  className={`relative border border-black ${
                    code.trim().length >= 5
                      ? "bg-white text-black"
                      : "bg-gray-100 text-gray-400"
                  } px-6 py-2 font-mono text-sm tracking-wide transition-transform group-hover:translate-x-1 group-hover:translate-y-1`}
                >
                  Submit
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
