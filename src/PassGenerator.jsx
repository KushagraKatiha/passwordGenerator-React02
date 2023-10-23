import React, { useCallback, useEffect, useState, useRef } from 'react'

function PassGenerator() {
  
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState('')
  
  const passRef = useRef(null)
  
  const PassGenerator = useCallback(() => {
    let charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) charSet += "0123456789"
    if (charAllowed) charSet += "!@#$%^&*()_+~`|}{[]\:;?><,./-="
    
    let pass = ""
    
    for (let i = 1; i <= length; i++) {
      const char = Math.random() * charSet.length
      pass += charSet.charAt(char)
    }
    
    setPassword(pass)
    
    
  }, [length, numAllowed, charAllowed, setPassword])
  
  const copyPass = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(() => {
    PassGenerator()
  }, [length, numAllowed, charAllowed, setPassword])

  return (
    <>
      <div className='max-w-md text-white mx-auto my-8 px-4 py-3 bg-cyan-950 rounded-lg'>
        <h1 className='text-white text-3xl text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg mt-3 overflow-hidden mb-4'>
          <input className='outline-none text-2xl w-full py-1 text-orange-400 font-semibold px-3'
                 type="text"
                 value={Password}
                 placeholder='Password'
                 readOnly
                 ref={passRef}
          />
          <button onClick={copyPass} className='bg-blue-900 font-bold text-xl text-center px-5 py-3 outline-none hover:bg-blue-600'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-3 justify-center text-orange-400 font-semibold'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            max={50} 
            min={0} 
            value={length} 
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)} 
            />
            <label htmlFor="length">Length : {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              id='numAllowed'
              checked={numAllowed}
              onChange={() => setNumAllowed((pre)=>!pre)}
            />
            <label htmlFor="numAllowed">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              id='charAllowed'
              checked={charAllowed}
              onChange={() => setCharAllowed((pre)=>!pre)}
            />
            <label htmlFor="numAllowed">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default PassGenerator