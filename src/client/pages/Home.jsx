import React from 'react'
import SignInBtn from '../components/home/SignInBtn';

export default function Home() {
  return (
    <main class="w-full min-h-screen bg-white text-black overflow-y-hidden">
      {/* <!-- Header Section with creative positioning --> */}
      <header class="w-full py-8 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="flex justify-between items-center">
            <h2 class="font-mono text-xs tracking-widest text-gray-600">
             
            </h2>
            {/* <a href="/" class="font-mono text-xs tracking-widest text-gray-600">
              Home
            </a> */}
          </div>
        </div>
      </header>

      {/* <!-- Hero Section --> */}
      <section class="w-full min-h-[78vh] flex items-center justify-center relative overflow-hidden">
        {/* <!-- Background elements --> */}
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-1/4 -left-24 w-64 h-64 rounded-full bg-black"></div>
          <div class="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-black"></div>
        </div>

        <div class="max-w-4xl mx-auto px-4 w-full">
          {/* <!-- Hero content --> */}
          <div class="flex flex-col items-center space-y-12">
            <h1 class="landing__heading text-5xl md:text-8xl text-center leading-none tracking-tighter">
              Akshar<span class="font-light"> Library</span>
            </h1>
            <p class="font-mono text-xs md:text-sm text-gray-500 tracking-widest uppercase max-w-md text-center">
              Your Dedicated Space for Mastery.
            </p>

                      {/* <CommentController client:load></CommentController> */}
                      <SignInBtn/>

          </div>
        </div>
      </section>

      {/* <!-- Main Content Section --> */}
      

      {/* <!-- Footer Section --> */}
      <footer class=" border-t border-gray-300 py-7">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row justify-between items-center">
            <span class="font-mono text-xs tracking-wide text-gray-500">
              © 2025 aksharDesai.
            </span>
            <div class="flex space-x-8 mt-4 sm:mt-0">
              <a
                href="#"
                class="font-mono text-xs tracking-wide text-gray-500 hover:text-black transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                class="font-mono text-xs tracking-wide text-gray-500 hover:text-black transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                class="font-mono text-xs tracking-wide text-gray-500 hover:text-black transition-colors"
              >
                Linkedin
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
