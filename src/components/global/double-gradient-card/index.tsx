import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'

type Props = {
  label: string
  subLabel: string
  description: string
}

const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
  return (
    <div className="relative border-[1px] border-in-active/50 p-5 rounded-xl flex flex-col gap-y-20 overflow-hidden">
      <div className="flex flex-col z-40">
        <h2 className="text-2xl font-medium">{label}</h2>
        <p className="text-text-secondary text-sm">{subLabel}</p>
      </div>
      <div className="flex justify-between items-center z-40 gap-x-10">
        <p className="text-text-secondary text-sm">{description}</p>
        <Button className="rounded-full bg-light-blue w-10 h-10">
          <ArrowRight color="white" />
        </Button>
      </div>
      <div className="w-6/12 h-full absolute radial--double--gradient--cards--top top-0 left-0 z-10" />
      <div className="w-6/12 h-full absolute radial--double--gradient--cards--bottom top-0 left-1/2 right-0 z-0" />
    </div>
  )
}

export default DoubleGradientCard
