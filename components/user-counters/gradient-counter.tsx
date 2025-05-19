import BaseCounter, { type BaseCounterProps } from "./base-counter"

export default function GradientCounter(props: BaseCounterProps) {
  return (
    <div className="inline-block border-2 border-purple-500 rounded-sm px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <BaseCounter
        {...props}
        iconClassName="text-white"
        numberClassName="text-white text-lg font-bold"
        labelClassName="text-white/80"
      />
    </div>
  )
}
