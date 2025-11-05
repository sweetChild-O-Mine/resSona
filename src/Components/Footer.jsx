import React from 'react'

export const Footer = () => {
  return (
    <footer className=" p-2  ">
        {/* footer they say  */}
      <div className="max-w-lg mx-auto py-2 mt-10 border-t border-t-neutral-800 ">
        <p className="text-center text-neutral-400 delius">
          Crafted with ☕ & code by {''}
          <span className="font-black text-neutral-100 text-bas poiret text-lg ">
            <a href="https://x.com/sudo_Slash" 
            className="hover:text-white hover:underline underline-offset-4 decoration-neutral-400 transition-colors duration-200 ">
              @Slash
            </a>
            </span>
        </p>
      </div>
    </footer>
  )
}
