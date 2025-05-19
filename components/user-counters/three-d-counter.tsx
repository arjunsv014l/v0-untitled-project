import BaseCounter, { type BaseCounterProps } from "./base-counter"

export default function ThreeDCounter(props: BaseCounterProps) {
  return (
    <div className="inline-block border-2 border-gray-800 rounded-sm px-4 py-2 bg-white shadow-lg relative overflow-hidden">
      {/* Inner shadow effect */}
      <div className="absolute inset-0 shadow-inner pointer-events-none"></div>

      {/* 3D effect with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 opacity-50 pointer-events-none"></div>

      <BaseCounter
        {...props}
        iconClassName="text-blue-600 drop-shadow-sm"
        numberClassName="text-gray-800 text-lg font-bold drop-shadow-sm"
        labelClassName="text-gray-600 drop-shadow-sm"
      />
    </div>
  )
}
