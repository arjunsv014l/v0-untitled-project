"use client"

import RegistrationForm from "@/components/registration-form"

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-12 px-4 flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md">
        <RegistrationForm />
      </div>
    </div>
  )
}
