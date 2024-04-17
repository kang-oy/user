import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const HomeContent = dynamic(() => import('@/components/Home').then((mod) => mod.HomeContent), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <div className='md:min-h-[calc(100vh-170px)] min-h-[calc(100vh-140px)] flex'>
      <HomeContent />
    </div>
  )
}

export default Home
