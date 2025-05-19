import BaseCounter, { type BaseCounterProps } from "./base-counter"

export default function BoldCounter(props: BaseCounterProps) {
  return (
    <div className="inline-block border-4 border-black rounded-sm px-4 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <BaseCounter
        {...props}
        iconClassName="text-black"
        numberClassName="text-black text-xl font-extrabold"
        labelClassName="text-black font-medium"
      />
    </div>
  )
}
