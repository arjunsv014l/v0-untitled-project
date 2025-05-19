"use client"

import BaseCounter, { type BaseCounterProps } from "./base-counter"

interface DoodleCounterProps extends Omit<BaseCounterProps, "doodleStyle"> {
  variant?: "primary" | "secondary" | "green" | "purple"
}

export default function DoodleCounter({
  className = "",
  iconClassName = "",
  numberClassName = "",
  labelClassName = "",
  label = "creatives",
  showIcon = true,
  variant = "primary",
}: DoodleCounterProps) {
  let variantClasses = {
    iconBg: "bg-[#FFECB3]",
    iconColor: "text-[#FF6D00]",
    numberColor: "text-[#333333]",
    labelColor: "text-gray-600",
  }

  switch (variant) {
    case "secondary":
      variantClasses = {
        iconBg: "bg-[#E1F5FE]",
        iconColor: "text-[#0288D1]",
        numberColor: "text-[#333333]",
        labelColor: "text-gray-600",
      }
      break
    case "green":
      variantClasses = {
        iconBg: "bg-[#E8F5E9]",
        iconColor: "text-[#43A047]",
        numberColor: "text-[#333333]",
        labelColor: "text-gray-600",
      }
      break
    case "purple":
      variantClasses = {
        iconBg: "bg-[#F3E5F5]",
        iconColor: "text-[#8E24AA]",
        numberColor: "text-[#333333]",
        labelColor: "text-gray-600",
      }
      break
  }

  return (
    <BaseCounter
      className={className}
      iconClassName={`${iconClassName} ${variantClasses.iconBg} ${variantClasses.iconColor}`}
      numberClassName={`${numberClassName} ${variantClasses.numberColor}`}
      labelClassName={`${labelClassName} ${variantClasses.labelColor}`}
      label={label}
      showIcon={showIcon}
      doodleStyle={true}
    />
  )
}
