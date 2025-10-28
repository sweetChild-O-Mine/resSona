import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'


export const PersonaForm = () => {

  const [formData, setFormData] = useState({
    nickname: '',
    profession: '',
    goals: '',
    interests: '',
    moreAbout: '',

    llmRole: '',
    llmTone: '',
    keyRules: ''

  })
  const [generatePrompt, setGeneratePrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  // onChange handler
  const handleChange = (e) => {
    
    const {name, value} = e.target 

    // got the value and now update the values 
    setFormData((prevData) => ({
      ...prevData,
      [name] : value
    }))

  }

  const rolePresets = ['Expert', 'Friend', 'Teacher', 'Code Reviewer', 'Bakchod insaan'];
  const tonePresets = ['Sarcastic Mentor', 'Witty', 'Formal', 'Helpful', 'Gen Z'];

  // handler for the buttons basically btns ke text update karega jab bhi click hoga...or simpley which field to update and with what value to update
  const handlePresetClick = (fieldName, value) => { 
    setFormData((prevData) => ({
      ...prevData,
      [fieldName] : value
    }))
   }


  //  handle genrate fn to handle the backend requesnt and to send our info to backend ki bc iska use karo aur ek sundar sa sexy sa prompt banake dedo meri jaan 
  const handlgeGenerate = async () => {
    // setLoading chalu karo
    setLoading(true)
    // purane erros and prompt ko hatao bhai 
    setError(null)
    setGeneratePrompt("")

    try {

      const response = await fetch('/api/generate-prompt.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)    //sara data or info behj do bcccccc
      })

      // agar response nhi aaya thik then
      if(!response.ok) {
        throw new error('Network response aint ohkay mfk')
      }

      // sahi repsonse koe liye 
      const data = await response.json()      //udhar se string of json aayega toh usko nroaml js me convert akrna padega nah meri jaaan
      setGeneratePrompt(data.prompt)

    } catch (err) {
      setError(err.message || 'Failed to generate prompt. Please try again.')
    } finally{
      setLoading(false)
    }


  }

  const debugOutput = (
    <pre className='text-white p-4 bg-black/50 rounded-md overflow-auto' >
      {JSON.stringify(formData, null, 2)}
    </pre>
  )



  return (
    <>
    {/* main conteinr for these two niggs */}
    <div className="flex flex-col ">
      {/* main grid thing  */}
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
            name='nickname'
            value={formData.nickname} //this is state to input (which value i want my input to have )
            onChange={handleChange}   //this is input to state (basically whenever you see some change in input then usko state me update kar do )
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
            name='profession'
            value={formData.profession}
            onChange={handleChange}
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
            name='goals'
            value={formData.goals}
            onChange={handleChange}
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
            name='interests'
            value={formData.interests}
            onChange={handleChange}
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
            name='moreAbout'
            value={formData.moreAbout}
            onChange={handleChange}
            className="border border-neutral-700 w-full mt-2 py-1 px-2.5 bg-transparent placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600 text-neutral-300 rounded-md resize-none overflow-auto scrollbar-hidden pr-3 "
            placeholder='e.g. i am introvert af...'
            />
          </div>

        </div>

        {/* second div */}
        <div className="bg-neutral-900/30 border-neutral-800 border backdrop-blur-md rounded-lg p-6 shadow-md  ">
          <h2 className="text-neutral-300 mb-4 pl-2 text-2xl font-bold font-mono">
            How you expect your response ?
          </h2>

          {/* Name field  */}
          <div className="rounded-lg py-2 ">
            <label
            htmlFor='llmRole'
            className="py-2 px-2 ">
              What role should the LLM play?
            </label>

            <input
            id='llmRole'
            name='llmRole'
            value={formData.llmRole} //this is state to input (which value i want my input to have )
            onChange={handleChange}   //this is input to state (basically whenever you see some change in input then usko state me update kar do )
            type="text" 
            className='w-full py-1 px-2.5 mt-2 bg-transparent placeholder:text-neutral-500 border border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700 rounded-md text-neutral-300  '
            placeholder='e.g. Sarcastic Mentor'
            />
            {/* div for the buttons and all */}
            <div className="flex flex-wrap justify-center mt-3 gap-2 ">
              {rolePresets.map((role) => (
                <button 
                key={role}
                onClick={() => handlePresetClick('llmRole', role)}
                type='button' //form submiisoin rokne ke liye we gotta define the type here
                className="px-3 py-[4.5px] rounded-full bg-neutral-700/50 text-neutral-300 text-sm hover:bg-neutral-600/70 cursor-pointer ">
                  {role}
                </button>
              ) )}
            </div>
          </div>

          {/* llmTone field */}
          <div className="py-2 ">
            <label htmlFor='llmTone'
            className="px-2 ">
              What should be its tone?
            </label>

            <input type="text" 
            id='llmTone'
            name='llmTone'
            value={formData.llmTone}
            onChange={handleChange}
            className="border border-neutral-700 w-full mt-2 py-1 px-2.5 bg-transparent placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600 rounded-md text-neutral-300 " 
            placeholder='e.g. Strict but helpful, witty'
            />
            {/* div for the buttona n all */}
            <div className="flex flex-wrap justify-center mt-3 gap-2">
              {tonePresets.map((tone) => (
                <button 
                type='button'
                key={tone}
                onClick={() => handlePresetClick('llmTone', tone) }
                className="px-3 py-[4.5px] rounded-full bg-neutral-700/50 text-neutral-300 text-sm hover:bg-neutral-600/70 cursor-pointer">
                  {tone}
                </button>
              ))}
            </div>

          </div>

    


          {/* more about you */}
          <div className="py-2">
            <label htmlFor="keyRules"
            className="px-2">
              Any specific rules?
            </label>

            <TextareaAutosize 
            minRows={3}
            maxRows={5}
            minLength={120}
            id='keyRules'
            name='keyRules'
            value={formData.keyRules}
            onChange={handleChange}
            className="border border-neutral-700 w-full mt-2 py-2 px-2.5 bg-transparent placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600 text-neutral-300 rounded-md resize-none overflow-auto scrollbar-hidden pr-3 "
            placeholder='e.g. Always provide code examples, Use Hinglish...'
            />
          </div>



        </div>
        {/* {debugOutput} */}

      </div>

      {/* main button for that stuff */}
      <div className="max-w-6xl w-full mt-6 flex flex-col justify-center items-center ">
        {/* submit button of form   */}
        <button 
        onClick={handlgeGenerate}
        disabled={loading}    //btn will be disabled when laoding is happening 
        className="w-full max-w-3xl border border-neutral-500 py-3 px-6 text-lg  bg-neutral-800/60 text-white font-bold rounded-lg shadow-lg hover:bg-neutral-700/60 cursor-pointer transition-colors duration-100 disabled:bg-neutral-800/50  "
        >
          {loading ? 'Generating...(be patient': 'Generate Prompt'}
        </button>

        {/* if error is there then show it nah nigga */}
        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-800 text-red-100 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* if not erro and you got the thing then show them prompto */}
        <div className="mt-4 max-w-3xl w-full flex items-center gap-3 ">
          <label htmlFor="output" 
          className="flex items-center justify-center mb-2 text-neutral-200 font-mono text-lg ">
            Your "Master Prompt":
          </label>
          <TextareaAutosize
          id='output'
          readOnly
          value={generatePrompt}
          className='w-full px-2 py-2 border border-neutral-300 bg-black/40 rounded-lg text-neutral-400 font-mono scrollbar-hidden resize-none focus:outline-none '
          />
        </div>

      </div>

    </div>

    
    </>
    
    
  )
}
