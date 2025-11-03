import React from 'react'

export const Hero = () => {
  return (
    <section className=' bg-transparent max-w-6xl mx-auto '>
        {/* main heading yahan aayegi ig  */}
        <div className=" max-w-4xl mt-18 mx-auto">
            <h2 className="text-7xl cormo-semibold text-[#f5f5f5e5] text-center selection:bg-neutral-100 selection:text-black ">Cure Your 
                <span className="ml-4 mr-2 text-[3.8rem] petit ">Boring</span>
                AI
                 </h2>
        </div>

        {/* div for sub heading  */}
        <div className="max-w-3xl text-3xl mx-auto mt-6  ">
            <p className="text-center cormo-light text-2xl tracking-wide text-neutral-200 leading-[1.9rem] selection:bg-neutral-100 selection:text-black ">
                Are you sick of your boring LLM?
                 <br />
                Tired of getting the same safe, agreeable responses?
                <br />
                It's time to design a persona that actually sounds like you.
            </p>
        </div>

    </section>
  )
}

