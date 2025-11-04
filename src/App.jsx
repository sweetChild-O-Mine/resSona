import { PersonaForm } from './Components/PersonaForm.jsx'
import hero from './assets/hero3.jpg'
import { Navbar } from './Components/Navbar.jsx'
import { Hero } from './Components/Hero.jsx'


function App() {

  return (
    <>
      <div 
      // main container
      className="relative min-h-screen w-full text-white bg-cover overflow-x-hidden"
      style={{
        backgroundImage: `url(${hero})`
      }}
      >

        {/* some overlay coz acha lagta hai kabhi kabhi */}
        <div className="absolute inset-0 bg-black/60"/>

        {/* now our main container div for the thinggs and actual stuff */}
        <div className="relative z-10 min-h-screen py-2 w-full lg:max-w-7xl mx-auto scrollbar-hidden overflow-y-auto  ">
        <Navbar />
        <Hero />
        <PersonaForm />

        </div>

      </div>
    </>
  )
}

export default App
