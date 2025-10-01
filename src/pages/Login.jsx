import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../utils/firebase'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState('')

  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try{
        await signInWithEmailAndPassword(auth,email,password)
        navigate('/Members')
    }catch(error){
        alert(error.message)
    }
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden">
      {/* Responsive background effects - optimized for different screen sizes */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle 300px at 20% 50%, rgba(163,230,53,0.15), transparent),
            radial-gradient(circle 250px at 80% 20%, rgba(163,230,53,0.1), transparent),
            radial-gradient(circle 200px at 40% 90%, rgba(163,230,53,0.08), transparent)
          `,
        }}
      />
      
      {/* Mobile-optimized animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-lime-300/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '0s', animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-lime-400/15 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '2s', animationDuration: '6s' }} />
      
      {/* Responsive floating particles - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(window.innerWidth < 768 ? 10 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-lime-300/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Fully responsive container system */}
      <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-sm sm:max-w-sm lg:max-w-sm xl:max-w-xl">
          
          {/* Responsive glassmorphic card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group hover:bg-white/[0.07] transition-all duration-500">
            
            {/* Responsive inner glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-lime-300/10 via-transparent to-lime-400/5 rounded-2xl sm:rounded-3xl" />
            <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-lime-300/10 rounded-full blur-3xl group-hover:bg-lime-300/15 transition-all duration-700" />
            
            <div className="relative z-10">
              {/* Responsive header */}
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-lime-100 to-lime-200 bg-clip-text text-transparent mb-2 sm:mb-3">
                  Welcome Back
                </h1>
                <p className="text-zinc-400 text-sm sm:text-base lg:text-lg font-medium px-2">
                  Enter your credentials to continue
                </p>
              </div>

              {/* Responsive decorative divider */}
              <div className="relative my-6 sm:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-lime-300/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-lime-300/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-lime-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Fully responsive form */}
              <div className="space-y-4 sm:space-y-6">
                
                {/* Email field - responsive */}
                <div className="group">
                  <label 
                    htmlFor="email" 
                    className="block text-xs sm:text-sm font-medium text-lime-100 mb-2 group-focus-within:text-lime-300 transition-colors duration-200"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      placeholder="name@example.com"
                      className={`
                        w-full px-3 py-3 sm:px-4 sm:py-4 bg-white/5 border rounded-lg sm:rounded-xl text-white placeholder-zinc-500
                        backdrop-blur-sm transition-all duration-300 outline-none font-medium text-sm sm:text-base
                        ${focusedField === 'email' 
                          ? 'border-lime-300/60 bg-white/10 shadow-lg shadow-lime-300/20' 
                          : 'border-white/10 hover:border-white/20'
                        }
                      `}
                      autoComplete="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                    {focusedField === 'email' && (
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-lime-300/10 to-transparent pointer-events-none" />
                    )}
                  </div>
                </div>

                {/* Password field - responsive */}
                <div className="group">
                  <label 
                    htmlFor="password" 
                    className="block text-xs sm:text-sm font-medium text-lime-100 mb-2 group-focus-within:text-lime-300 transition-colors duration-200"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Enter your password"
                      className={`
                        w-full px-3 py-3 sm:px-4 sm:py-4 bg-white/5 border rounded-lg sm:rounded-xl text-white placeholder-zinc-500
                        backdrop-blur-sm transition-all duration-300 outline-none font-medium text-sm sm:text-base
                        ${focusedField === 'password' 
                          ? 'border-lime-300/60 bg-white/10 shadow-lg shadow-lime-300/20' 
                          : 'border-white/10 hover:border-white/20'
                        }
                      `}
                      autoComplete="current-password"
                    />
                    {focusedField === 'password' && (
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-lime-300/10 to-transparent pointer-events-none" />
                    )}
                  </div>
                </div>

                {/* Responsive enhanced submit button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="relative w-full mt-6 sm:mt-8 group touch-manipulation"
                >
                  {/* Button background layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-300 to-lime-400 rounded-lg sm:rounded-xl opacity-90 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300" />
                  
                  {/* Button content - responsive */}
                  <div className="relative px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-center space-x-2 sm:space-x-3 rounded-lg sm:rounded-xl backdrop-blur-sm">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-slate-900/20 border-t-slate-900 rounded-full animate-spin" />
                        <span className="text-slate-900 font-semibold text-sm sm:text-base lg:text-lg">Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-slate-900 font-semibold text-sm sm:text-base lg:text-lg">Sign In</span>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900 transition-transform group-hover:translate-x-1 duration-200 text-sm sm:text-base">
                          →
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Button glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-lime-300 to-lime-400 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-30 group-active:opacity-30 transition-opacity duration-300" />
                </button>

          
              </div>
            </div>
          </div>

     
        </div>
      </div>

      {/* Mobile-specific touch improvements */}
      <style jsx>{`
        @media (max-width: 768px) {
          input {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
        }
      `}</style>
    </div>
  )
}