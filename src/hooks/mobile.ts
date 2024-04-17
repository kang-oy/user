import { useMedia } from 'react-use'

export const useIsMobile = () => {
  const isMobile = useMedia('(max-width: 768px)')

  return isMobile
}
