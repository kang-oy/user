import logoText from '@/assets/icons/Logo-footer.svg'
import Image from 'next/image'
import Link from 'next/link'
import { ForwardRefRenderFunction, forwardRef } from 'react'

const Footer: ForwardRefRenderFunction<HTMLElement> = ({ }, ref) => {

  return (
    <footer className="bg-black" aria-labelledby="footer-heading" ref={ref}>
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="flex h-[80px] items-center justify-between px-5 md:h-[100px] md:px-[60px]">
        <div className="flex items-center gap-[10px]">
          <Link href="/">
            <Image src={logoText} alt="Muse" width={100} height={100} className="h-[9.5px] w-auto" />
          </Link>
          <span className="text-[12px] leading-[20px] text-white">© 2024 GenDAM</span>
        </div>
        <a className="text-[12px] leading-[20px] text-white" href='mailto:contact@gendam.ai'>contact@gendam.ai</a>
      </div>
    </footer>
  )
}

export default forwardRef(Footer)
