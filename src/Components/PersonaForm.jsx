import TextareaAutosize from 'react-textarea-autosize'

export const PersonaForm = () => {
  return (
    <div
    className='border rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 border-neutral-600 p-4 max-w-6xl min-h-[500px] w-full '
    >
      {/* first div */}
      <div className="bg-neutral-900/30 border-neutral-800 border backdrop-blur-md rounded-lg p-6 shadow-md  ">
        <h2 className="text-neutral-300 mb-4 pl-2 text-2xl font-bold font-mono">
          About you
        </h2>

        {/* Name field  */}
        <div className="rounded-lg py-2 ">
          <label
          htmlFor='nickname'
          className="py-2 px-2 ">
            What you want your LLM to call you (or nickname) ?
          </label>
          
          <input
          id='nickname'
          type="text" 
          className='w-full py-1 px-2.5 mt-2 bg-transparent placeholder:text-neutral-500 border border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700 rounded-md text-neutral-300  '
          placeholder='e.g. John Denver'
          />
        </div>

        {/* Profession field */}
        <div className="py-2 ">
          <label htmlFor='profession'
          className="px-2 ">
            What's your Profession ?
          </label>

          <input type="text" 
          id='profession'
          className="border border-neutral-700 w-full mt-2 py-1 px-2.5 bg-transparent placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600 rounded-md text-neutral-300 " 
          placeholder='e.g. Software Engineer'
          />
        </div>

        {/* Goals */}
        <div className="py-2">
          <label htmlFor="goals"
          className="px-2">
            What are your Goals ?
          </label>

          <input type="text"
          id='goals'
          className="border border-neutral-700 w-full mt-2 py-1 px-2.5 bg-transparent placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600 text-neutral-300 rounded-md "
          placeholder='e.g. my goal is to master backend development...'
          />
        </div>

        {/* interest */}
        <div className="py-2">
          <label htmlFor="interest"
          className="px-2">
            What are your Interests ?
          </label>

          <input type="text"
          id='interest'
          className="border border-neutral-700 w-full mt-2 py-1 px-2.5 bg-transparent placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600 text-neutral-300 rounded-md "
          placeholder='e.g. i like to play guitar...'
          />
        </div>

        {/* more about you */}
        <div className="py-2">
          <label htmlFor="more-about"
          className="px-2">
            More About you ?
          </label>

          <TextareaAutosize 
          minRows={1}
          maxRows={3}
          id='more-about'
          className="border border-neutral-700 w-full mt-2 py-1 px-2.5 bg-transparent placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600 text-neutral-300 rounded-md resize-none overflow-auto scrollbar-hidden pr-3 "
          placeholder='e.g. i am introvert af...'
          />
        </div>

      </div>

      {/* second div */}
      <div className="bg-neutral-900/30 border-neutral-800 border backdrop-blur-md rounded-lg p-6 shadow-md  ">
        <h2 className="text-neutral-300 text-2xl font-bold font-mono">
          How you want Response ?
        </h2>
      </div>

    </div>
  )
}
