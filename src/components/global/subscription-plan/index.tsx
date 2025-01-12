import { useQueryUser } from '@/hooks/user-queries'

type Props = {
  type: 'FREE' | 'PRO'
  children: React.ReactNode
}

export const SubscriptionPlan = ({ children, type }: Props) => {
  const { data } = useQueryUser()
  return data?.data?.subscription?.plan === type && children
}
