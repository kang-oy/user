import { FC } from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const SkeletonLoading: FC<SkeletonProps> = (props) => {
  const { borderRadius, ...skeletonProps } = props
  return <Skeleton baseColor="#f2f2f4" highlightColor="#F9FAFB" borderRadius={borderRadius ?? 0} {...skeletonProps} />
}
