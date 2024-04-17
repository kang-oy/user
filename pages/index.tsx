import { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'

const HomeContent = dynamic(() => import('@/pages/components/Home').then((mod) => mod.HomeContent), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <HomeContent />
  )
}

export default Home
