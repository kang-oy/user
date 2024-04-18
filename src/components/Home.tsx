import closeIcon from '@/assets/icons/close.svg'
import IconDownload from '@/assets/icons/download.svg'
import { useIsMobile } from '@/hooks/mobile'
import { useUserInfo } from '@/hooks/useUserInfo'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { FC, Fragment, useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import SvgIcon from './svgIcon'

export const HomeContent: FC = () => {
  const isMobile = useIsMobile()
  const [email, setEmail] = useState<string>('')
  const [open, setOpen] = useState(false)
  const { userInfo } = useUserInfo()
  console.log('userInfo', userInfo)
  const downloadLinks = [
    {
      title: 'Download for MacOS(Apple Silicon)',
      des: 'Requires macOS 10.15+',
      link: 'https://github.com/bmrlab/gendam/releases/download/desktop-v0.1.0/gendam_0.1.0_aarch64.dmg',
    },
    {
      title: 'Download for MacOS(Intel Chip)',
      des: 'Requires macOS 10.15+',
      link: 'https://github.com/bmrlab/gendam/releases/download/desktop-v0.1.0/gendam_0.1.0_x64.dmg',
    },
    // {
    //   title: 'Download for MacOS(Universal Binary)',
    //   des: 'Requires macOS 10.15+',
    //   link: '',
    // },
  ]

  const handleSubmit = useCallback(() => {
    window.open(`/api/auth/login?email=${email}`, '_blank')
    console.log('email', email)
  }, [email])

  const handleDownLoad = (link: string) => {
    if (isMobile) {
      setOpen(true)
      return
    }
    window.open(link, '_blank')
  }

  return (
    <>
      <div className="mb-[60px] flex w-full flex-1 flex-col items-center justify-center gap-[60px] px-5 md:mb-[100px] md:px-0 md:pt-[80px]">
        <div className="flex w-full flex-col items-center justify-center gap-[30px]">
          <div className="title mt-[40px] text-center text-[40px] leading-[50px] md:mt-0 md:text-[60px] md:leading-[64px]">
            Search your videos
            <br />
            with GenAI
          </div>
          <div className="text-center text-[16px] leading-[24px] text-[#4B5361]">
            Privacy first generative DAM.
            <br />
            A cross-platform desktop application for managing, processing, and searching <br />
            multimedia content using Rust-based libraries and AI models.
          </div>
        </div>

        <div className="flex w-full flex-col justify-between gap-[40px] md:max-w-[1088px] md:flex-row md:gap-0 md:px-5">
          <div className="flex flex-col justify-between gap-4">
            <div className="version">
              <div className="title text-[24px] leading-8">Alpha 0.1</div>
              <div className="text-[14px] leading-5 text-[#4B5361]">Apr. 16, 2024</div>
            </div>
            {downloadLinks.map((item, index) => {
              return (
                <div
                  className="transAll group flex h-[90px] w-full cursor-pointer items-center justify-between border border-[rgba(75,83,97,0.2)] px-4 hover:border-[#000] md:w-[400px]"
                  key={`download-${index} `}
                  onClick={() => handleDownLoad(item.link)}
                >
                  <div className="flex flex-col items-start ">
                    <span className="text-[14px] text-[#000]">{item.title}</span>
                    <span className="text-[12px] text-[#4B5361]">{item.des}</span>
                  </div>
                  <SvgIcon
                    src={IconDownload}
                    className="transAll h-4 w-4 text-[rgba(75,83,97,0.8)] group-hover:text-[#000] "
                  />
                </div>
              )
            })}
          </div>
          <div className="w-full space-y-3 bg-[#ECECEC] px-5 py-6 md:w-[488px] md:space-y-4 md:px-10">
            <div className="h-[116px] space-y-3">
              <div className="title text-[24px] text-[#000]">Keep Updated</div>
              <div className="text-nowrap text-[16px] leading-[26px]  text-[#4B5361]">
                Stay up to date with our latest
                <br />
                developments and information.
              </div>
            </div>

            <input
              className={twMerge(
                'bg-background border border-[rgba(75,83,97,0.1)] px-3 text-black',
                'rounded-primary outline-none',
                'transition-all duration-200 ease-in-out',
                'h-[42px] w-full',
              )}
              placeholder="Email"
              defaultValue={email}
              onBlur={(e) => {
                setEmail(e.target.value)
              }}
            />
            <div
              className="transAll h-[43px] w-full cursor-pointer bg-[#000] text-center leading-[43px] text-white"
              onClick={handleSubmit}
            >
              Subscribe Now
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed bottom-0 left-[50%] right-0 top-[20px] z-30  flex h-[88px] w-[335px]  max-w-[90%] translate-x-[-50%] items-center justify-center bg-black"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100 "
            leave="ease-in duration-200"
            leaveFrom="opacity-100 "
            leaveTo="opacity-0 "
          >
            <Dialog.Panel className="w-full text-white">
              <div className="ml-6 overflow-y-auto font-IBMPlexMonoLight">
                Please use MacOS computer to
                <br />
                download for now.
              </div>

              <button
                className="absolute right-4 top-4 outline-none focus-within:outline-none"
                onClick={() => setOpen(false)}
              >
                <Image src={closeIcon} alt="" width={14} height={14} className="transAll h-3 w-3 " />
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
