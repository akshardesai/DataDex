import { useState } from "react";

export default function Login() {
  const [signInInfo, setsignInInfo] = useState({
    idNo: "",
    code:""
  });

  const signIn = (e) => {
    e.preventDefault()
    console.log('sigined in',signInInfo);
    
  }


  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-hidden px-4">
      {/* Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-white/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative flex justify-center items-center min-h-screen py-8">
        <div className="glassmorphism p-6 sm:p-8 rounded-2xl w-full max-w-[380px] backdrop-blur-lg bg-white/10 border border-white/10">
          <h1 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 text-center font-mono">
            Akshar Library
          </h1>

          <form onSubmit={(e)=>signIn(e)} className="space-y-6 ">
            <div className="space-y-2">
              <input
                value={signInInfo.idNo}
                onChange={(e)=>setsignInInfo({...signInInfo,idNo:e.target.value})}
                type="text"
                placeholder="ID No."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-black/40 border border-white/10 focus:border-white/20 outline-none transition-all text-base"
              />
            </div>
            <div className="space-y-2">
              <input
                value={signInInfo.code}
                onChange={(e) => setsignInInfo({...signInInfo,code:e.target.value})}
                type="text"
                placeholder="Code..."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-black/40 border border-white/10 focus:border-white/20 outline-none transition-all text-base"
              />
            </div>
            <div className="w-full flex justify-center">
              
            <button type="submit" className="w-1/2 py-2.5 sm:py-3 px-4 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all">
              Sign In
            </button>
        </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

       
        .particle {
          filter: blur(1px);
        }

      
        }
      `}</style>
    </main>
  );
}
