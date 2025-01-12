import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons"

type Props = {
  title: string
  icon: React.ReactNode
  description: string
  strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
  {
    title: 'Connect Instagram',
    description:
      'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
    icon: <InstagramDuoToneBlue />,
    strategy: 'INSTAGRAM',
    
  },
  {
    title: 'Connect Salesforce',
    description:
      'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
]
