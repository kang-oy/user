import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect } from 'react'
import { api } from '../utils/api'

export const useUserInfo = () => {
  const { user } = useUser()
  const { mutate: create } = api.user.userCreate.useMutation()

  const { data: userInfo, isLoading: isUserLoading } = api.user.userQueryByEmail.useQuery(
    {
      email: user?.email!,
    },
    {
      enabled: Boolean(user && user.email),
    },
  )

  // 如果data为空，说明数据库中没有该用户，需要创建
  useEffect(() => {
    if (!userInfo && !isUserLoading) {
      console.log('创建用户-----')
      create({
        email: user?.email!,
        name: user?.name ? user.name : '',
        verified: user?.email_verified ? user.email_verified : false,
      })
    }
  }, [userInfo, isUserLoading, create, user?.email, user?.email_verified, user?.name])

  return { userInfo }
}
