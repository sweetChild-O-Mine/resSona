import { useState } from 'react'
import { PersonaForm } from './Components/PersonaForm.jsx'
import hero from './assets/hero3.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div 
      // main container
      className="relative min-h-screen w-full text-white bg-cover"
      style={{
        backgroundImage: `url(${hero})`
      }}
      >

        {/* some overlay coz acha lagta hai kabhi kabhi */}
        <div className="absolute inset-0 bg-black/60"/>

        {/* now our main container div for the thinggs and actual stuff */}
        <div className="relative z-10 min-h-screen w-full flex justify-center items-center ">
        <PersonaForm />

        </div>

      </div>
    </>
  )
}

export default App
