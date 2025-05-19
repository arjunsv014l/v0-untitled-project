import BaseCounter, { type BaseCounterProps } from "./base-counter"

export default function MinimalistCounter(props: BaseCounterProps) {
  return (
    <div className="inline-block border border-gray-300 rounded-sm px-4 py-2 bg-white">
      <BaseCounter
        {...props}
        iconClassName="text-gray-500"
        numberClassName="text-gray-800 text-lg tracking-tight"
        labelClassName="text-gray-500 font-light"
      />
    </div>
  )
}
