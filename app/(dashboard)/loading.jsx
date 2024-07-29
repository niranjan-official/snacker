import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen flex w-full justify-center items-center'>
      <Image src={'/loading.svg'} width={70} height={70} />
    </div>
  )
}

export default Loading
