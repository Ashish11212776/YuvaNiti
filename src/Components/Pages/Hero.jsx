
import img from "../../../assets/background.jpg"
const Hero = () => {
  return (
    <div className="relative z-0 h-min-screen bg-cover bg-center h-[35vh] border-2">

<img 
src={img}
className='absolute inset-0 w-full h-full object-cover'
/>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 flex justify-center items-center h-full">
      <div className="text-center text-white px-6 md:px-12">
        <h1 className="text-3xl sm:text-xl lg:text-6xl font-bold leading-tight mb-6">
          "Believe in yourself, and all that you are."
        </h1>
        <p className="text-xl sm:text-xl mb-8">
          The journey of a thousand miles begins with a single step.
        </p>
        
      </div>
    </div>
  </div>
  )
}

export default Hero
