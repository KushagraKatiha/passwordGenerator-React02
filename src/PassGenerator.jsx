import React, { useCallback, useEffect, useState } from 'react'

function PassGenerator() {

  console.log("clicked");

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState('')

  const PassGenerator = useCallback(() => {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) charSet += "0123456789"
    if (charAllowed) charSet += "!@#$%^&*()_+~`|}{[]\:;?><,./-="

    let pass = ""

    for (let i = 1; i <= length; i++) {
      const char = Math.random() * charSet.length
      pass += charSet.charAt(char)
    }

    setPassword(pass)


  }, [length, numAllowed, charAllowed])

  useEffect(() => {
    PassGenerator()
  }, [length, numAllowed, charAllowed, setPassword])

  return (
    <>
      <div className='max-w-md text-white mx-auto my-8 px-4 py-3 bg-blue-950 shadow-white shadow-md rounded-lg'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input className='outline-none w-full py-1 px-3'
                 type="text"
                 value={Password}
                 placeholder='Password'
                 readOnly
          />
        </div>
      </div>
    </>
  )
}

export default PassGenerator