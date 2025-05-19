import BaseCounter, { type BaseCounterProps } from "./base-counter"

export default function RoundedCounter(props: BaseCounterProps) {
  return (
    <div className="inline-block border-2 border-teal-500 rounded-lg px-5 py-2 bg-white">
      <BaseCounter
        {...props}
        iconClassName="text-teal-500"
        numberClassName="text-teal-700 text-lg font-semibold"
        labelClassName="text-teal-600"
      />
    </div>
  )
}
