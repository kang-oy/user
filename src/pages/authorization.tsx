import { useUserInfo } from '@/hooks/useUserInfo'
import { api } from '@/utils/api'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const { auth_code } = router.query as { auth_code: string }
  const { userInfo } = useUserInfo()
  console.log('userInfo', userInfo)

  const { mutate } = api.userLogin.saveUserLogin.useMutation()
  const authSuccess = () => {
    mutate({
      userId: userInfo?.id!,
      code: auth_code,
    })
  }
  return (
    <div className="flex h-full flex-col items-center justify-between p-24">
      <div className="mb-32 flex text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          // href={`/api/user/getUserByCode?code=${auth_code}`}
          onClick={authSuccess}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            WELCOME {userInfo?.name} OPEN APP
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>
      </div>
    </div>
  )
}

Home.hideFooter = true
Home.hideBar = true

export default Home
