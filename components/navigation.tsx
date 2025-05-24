"use client"

import Link from "next/link"
import { useRouter } from "next/router"

const Navigation = () => {
  const router = useRouter()

  const handleDashboardClick = () => {
    router.push("/dashboard")
  }

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <button onClick={handleDashboardClick}>Go to Dashboard</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
