import { NextPage } from 'next'

const AboutPage: NextPage = () => {
  const details = [
    'We are a team of visionaries dedicated to revolutionizing the way you create, manage, and collaborate on digital assets. Our mission is to empower individuals and teams to unleash their full creative potential by providing a seamless, intuitive, and secure digital asset management platform.',
    'We believe that true creativity thrives when the tools you use become an extension of your creative process, not a barrier.',
    "That's why we've meticulously crafted GENDAM to be a responsive, collaborative, and immersive experience, designed to enhance your workflow and ignite your imagination.",
    "Crafting a Seamless Creative Journey From the moment you interact with GENDAM, you'll experience a level of responsiveness and fluidity that transcends traditional digital asset management tools. Every keystroke, every cursor movement, every action is met with instantaneous feedback, ensuring that your creative flow remains uninterrupted.",
    "We understand that great ideas often arise through collaboration and shared experiences. That's why GENDAM is built from the ground up to foster real-time collaboration, enabling you to share perspectives, and distribute knowledge effortlessly within your team.",
    "Conversations at the Heart of Creativity At GENDAM, we believe that conversations should happen organically, close to the assets you're working on. Our integrated chat functionality allows you to initiate discussions, seek feedback, and collaborate seamlessly, without ever leaving your creative environment.  Minimalism Meets Functionality Your digital assets and creative vision should always take center stage.",
    'GENDAM is built with a privacy-first approach, featuring end-to-end encryption, strict access controls, and robust security measures to ensure your data remains protected at all times.',
    "Join the Creative Revolution At GENDAM, we're not just building another digital asset management tool; we're crafting a platform that redefines the way you create, collaborate, and bring your ideas to life.",
    'Get Started Today Experience the future of digital asset management.',
  ]

  return (
    <div className="w-full px-5 pb-[60px] pt-[40px] md:p-[60px] md:pb-[80px]">
      <div className="title mb-[30px] w-full text-center text-[40px] leading-[50px] md:mb-[37px] md:text-[61px] md:leading-[64px]">
        Our Version
      </div>

      <div className="title mb-[30px] text-[24px] leading-[32px] md:mb-6 md:text-[32px] md:leading-[40px]">
        GENDAM：Elevating Digital Creativity
      </div>

      <div className="space-y-[30px] md:space-y-7">
        {details.map((line, index) => {
          return (
            <div key={index} className="md:text-4 text-[14px] leading-[24px] text-[#4B5361] md:leading-7">
              {line}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AboutPage
