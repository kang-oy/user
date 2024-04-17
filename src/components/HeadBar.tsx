import closeIcon from '@/assets/icons/close.svg'
import logoIcon from '@/assets/icons/logo-no-bg.svg'
import menuIcon from '@/assets/icons/menu.svg'
import logoText from '@/assets/icons/Logo.svg'
import logoTextWhite from '@/assets/icons/Logo-white.svg'
import { Dialog, Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ForwardRefRenderFunction, Fragment, forwardRef, useEffect, useState } from 'react'
import SvgIcon from './svgIcon'

const HeadBar: ForwardRefRenderFunction<HTMLElement> = ({ }, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useRouter()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    {
      text: 'home',
      mobileText: 'Home',
      href: '/',
    },
    {
      text: 'roadmap',
      mobileText: 'Roadmap',
      href: '/roadmap',
    },
    {
      text: 'about',
      mobileText: 'About',
      href: '/about',
    },
  ]

  return (
    <>
      <header
        className="sticky top-0 z-30 flex h-[60px] w-full items-center justify-between bg-white text-black md:h-[70px]"
        ref={ref}
      >
        <div className="flex h-full w-full items-center justify-between border-b-[1px] border-[#000] px-5 md:px-10">
          <Link href="/" className="flex items-center justify-start gap-[6px]">
            <Image src={logoIcon} alt="GENDAM" width={24} height={36} className="h-auto w-5 md:w-6" />
            <Image src={logoText} alt="GENDAM" width={127} height={22} className="h-[18px] w-auto md:h-[22px]" />
          </Link>
          <nav className="ml-[30px] hidden md:block">
            <ul className="flex list-none items-center justify-start space-x-10">
              {navItems.map((item, index) => (
                <li key={index} className={`transform duration-700`}>
                  <Link
                    passHref
                    href={item.href}
                    className={twMerge(
                      'relative inline-flex text-[14px] leading-[20px]',
                      pathname === item.href || (item.href !== '/' && pathname.includes(item.href))
                        ? 'text-[#000]'
                        : 'text-[#4B5361]',
                    )}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div
            className="md:hidden"
            onClick={() => {
              setIsOpen(true)
            }}
          >
            <SvgIcon src={menuIcon} className="h-auto w-[21px] transition-all duration-300 ease-in-out " />
          </div>
        </div>
      </header>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed bottom-0 left-0 right-0 top-0 bg-black">
              <div className="absolute left-5 right-5 top-0 flex h-[60px] items-center justify-between ">
                <div className="flex items-center justify-start gap-[6px]">
                  <Image src={logoIcon} alt="GENDAM" width={24} height={36} className="h-auto w-5 md:w-6" />
                  <Image
                    src={logoTextWhite}
                    alt="GENDAM"
                    width={127}
                    height={22}
                    className="h-[18px] w-auto md:h-[22px]"
                  />
                </div>
                <button className="outline-none focus-within:outline-none" onClick={() => setIsOpen(false)}>
                  <Image
                    src={closeIcon}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 transition-all duration-300 ease-in-out "
                  />
                </button>
              </div>
            </div>
          </Transition.Child>

          <div className="fixed bottom-0 left-0 right-0 top-[60px] overflow-y-auto">
            <div className="flex h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-[calc(-100vh+60px)]"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-[calc(-100vh+60px)]"
              >
                <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-[60px] flex flex-col items-center text-white">
                  <nav className="absolute bottom-[80px] w-full">
                    <ul className="ml-10 flex list-none flex-col items-start">
                      {navItems.map((item, index) => (
                        <li key={index} className={`transform duration-700`}>
                          <Link
                            passHref
                            href={item.href}
                            className={twMerge(
                              'relative block text-[36px] leading-[45px] transition-colors',
                              index !== 0 ? 'mt-[36px]' : 'mt-0',
                              "after-[''] after:absolute after:bottom-0 after:left-0 after:block after:h-[1px] after:w-full after:bg-white after:transition-all hover:after:w-full",
                              pathname === item.href ? 'after:opacity-100' : 'after:opacity-0',
                            )}
                          >
                            {item.mobileText}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default forwardRef(HeadBar)
