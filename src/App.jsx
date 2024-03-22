import { useEffect, useState } from 'react'
import pattern from './assets/images/pattern-divider-desktop.svg'
import patternMobile from './assets/images/pattern-divider-mobile.svg'
import dice from './assets/images/icon-dice.svg'


function App() {
     const [advice , setAdvice] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState('');
     async function fetchAdvice ()
     {
          try{
               const response = await fetch('https://api.adviceslip.com/advice');
               const data = await response.json();

               const {slip: advice} = data;
               setAdvice(advice)
               setLoading(false)
          }catch(error){
               setLoading(false)
               setError("Failed to load advice");
               console.log(error);
          }
     }

     useEffect(()=> {
          fetchAdvice()
     }, [])

     const handleClick = () => {
          setLoading(true)
          setError('')
          fetchAdvice();
     }

  return (
    <main className='bg-[#1B1C29] min-h-screen flex p-5'>
          <article className="px-5 py-10 rounded-[15px] bg-[#2B2D3D] relative max-w-md m-auto flex flex-col gap-6">
          {loading? (<p className='text-[#CCE0DB] text-center text-2xl font-semibold'>Loading advice...</p>):error?(<p className='text-[#CCE0DB] text-center text-2xl font-semibold'>{error}</p>):
          (
               <>
                    <h1 className="text-[#62FF9B] text-center uppercase text-md tracking-[4px] font-semibold">Advice #{advice?.id}</h1>
                    <p className="text-[#CCE0DB] text-2xl text-center font-extrabold">"{advice?.advice}"</p>
               </>  
          )}
               <img src={patternMobile} alt="divider-mobile" className='sm:hidden mb-5' />
               <img src={pattern} alt="divider-mobile" className='hidden sm:block mb-5' />
               <button className="absolute flex items-center justify-center -bottom-8 w-16 h-16 rounded-full bg-[#62FF9B] transform -translate-x-1/2 left-1/2 shadow-uniform"
               onClick={handleClick}
               >
                    <img src={dice} alt="dice" />
               </button>
          </article>
    </main>
  )
}

export default App