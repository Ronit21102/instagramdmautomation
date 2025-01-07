import React from 'react'

type Props = {
    trigger: JSX.Element,
    children :React.ReactNode
    className?: string
}

const PopOver = ({children, trigger,className}: Props) => {
  return (
    <div>PopOver</div>
  )
}

export default PopOver