import Image from 'next/image'
import React from 'react'

const Decor = () => {
  return (
    <div className='absolute top-0 left-0'>
        <Image src={'/images/decor/r.png'} width={80} height={100} />
    </div>
  )
}

export default Decor