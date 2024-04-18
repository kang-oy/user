import { FC, Fragment, useState } from 'react'
import { finishedRodMap, nextRoadmap } from './roadmapConfig'
import IconExpand from '@/assets/icons/expand.svg'
import IconFinished from '@/assets/icons/finished.svg'
import IconNext from '@/assets/icons/next.svg'
import IconCollapse from '@/assets/icons/collapse.svg'
import SvgIcon from './svgIcon'
import { twMerge } from 'tailwind-merge'
import { Transition } from '@headlessui/react'

const RoadmapItem = (props: { info: (typeof nextRoadmap)[number]; type: 'finished' | 'next' }) => {
  const { time, title, des } = props.info
  const [showDes, setShowDes] = useState(false)
  return (
    <div className={twMerge(
      "w-full border px-[10px] py-4 md:px-[30px] md:py-5 transition-all duration-200 ease-in-out",
      showDes ? 'max-h-[500px]' : 'md:max-h-[84px]'
    )}>
      <div className="flex items-start justify-between md:items-center">
        <div className="left flex items-start gap-2 md:items-center md:gap-4">
          <SvgIcon
            src={props.type === 'finished' ? IconFinished : IconNext}
            className="h-6 w-6 text-[rgba(75,83,97,0.8)] md:h-9 md:w-9"
          />
          <div className="flex flex-col gap-[4px] md:flex-row md:gap-4">
            <span className="md:text-4 text-[14px] leading-6 text-[#4B5361]">{'//' + time + '//'}</span>
            <span className="title text-[18px] leading-[22px] text-black md:text-[22px]">{title}</span>
          </div>
        </div>
        <div
          className="flex h-5 w-5 cursor-pointer items-center justify-center text-[rgba(75,83,97,0.8)] hover:text-black md:h-10 md:w-10"
          onClick={() => setShowDes(!showDes)}
        >
          <SvgIcon
            src={showDes ? IconCollapse : IconExpand}
            className="h-3 w-3 text-inherit transAll md:h-4 md:w-4"
          />
        </div>
      </div>
      <Transition appear show={showDes} as={Fragment}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 translate-y-[-20px]"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-[-20px]"
        >
          <div className='md:text-4 pl-[32px] text-[14px] leading-[21px]  text-[#4B5361] md:pl-[54px] md:leading-6'>{des}</div>
        </Transition.Child>
      </Transition>
    </div>
  )
}
export const RoadmapContent: FC = () => {
  return (
    <div className="w-full space-y-0 px-5 pb-[60px] pt-[40px] md:space-y-[37px] md:p-[60px] md:pb-[80px] flex flex-col items-center">
      <div className="title w-full text-center text-[40px] leading-[50px] md:text-[61px] md:leading-[64px]">
        Roadmap
      </div>

      <div className="text-5 w-full text-center font-[400] leading-6 text-[#4B5361] pt-[16px] pb-[30px] md:p-0">
        Last updated: <span className="font-[500]">April 16, 2024</span>
      </div>

      <div className="flex flex-col gap-[30px] md:gap-[48px] md:max-w-[1080px] w-full">
        {finishedRodMap.map((item, index) => {
          const { title, updates } = item
          return (
            <div key={index} className="flex flex-col gap-4 md:gap-6  shrink-0">
              <div className="text-[24px] leading-[32px] text-black md:text-[32px] title">{title}</div>
              <div className="flex flex-col gap-6 ">
                {updates.map((item, i) => (
                  <RoadmapItem info={item} type="finished" key={`roadmap-${index}-${i}`} />
                ))}
              </div>
            </div>
          )
        })}

        <div className="flex flex-col gap-4 md:gap-6">
          <div className="text-[24px] leading-[32px] text-black md:text-[32px]">Coming Soon...</div>
          <div className="flex flex-col gap-6">
            {nextRoadmap.map((item, i) => (
              <RoadmapItem info={item} type="next" key={`roadmap-next-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
