"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Home, Shield } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import { useEffect } from "react"

export default function PrivacyPolicyPage() {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <DoodleBackground className="pt-24 pb-16" density="low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors mr-4">
              <Home className="h-5 w-5" />
            </Link>
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white">
              <Shield className="h-4 w-4 mr-2" />
              <span className="font-medium">Privacy</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>

            <p className="text-lg text-gray-700 mb-4">
              Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your
              information on Dreamclerk.
            </p>

            <div className="text-sm text-gray-500">
              <p>Effective Date: April 25, 2025</p>
              <p>Last Updated: April 25, 2025</p>
            </div>
          </div>
        </div>
      </DoodleBackground>

      {/* Content Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border-2 border-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-2xl font-bold mt-6 mb-4">1. Information We Collect</h2>
            <p>We collect:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Personal info: Name, email, college, and academic details.</li>
              <li>Student journals and daily submissions.</li>
              <li>Technical info: IP address, device, browser, and usage data.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Data</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide insights for students.</li>
              <li>Improve platform features.</li>
              <li>Enable AI-powered suggestions and analytics.</li>
              <li>Sell anonymized, aggregated data to AI and mental health companies.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Sharing</h2>
            <p>
              We do not sell personally identifiable information. We may share anonymized data with third-party partners
              under strict agreements.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Your Rights</h2>
            <p>You can:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Request access or deletion of your data.</li>
              <li>Withdraw consent at any time.</li>
              <li>Opt out of data tokenization (SCDTs).</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
            <p>
              We use encryption, secure servers, and limited access controls to protect your data. We implement
              industry-standard security measures to ensure your information remains safe and confidential.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies and Tracking</h2>
            <p>
              We use cookies to enhance your experience and understand user behavior. These cookies help us analyze how
              users interact with our platform and allow us to improve our services based on this information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Third-Party Services</h2>
            <p>
              Some parts of the platform may use third-party tools (e.g., for payments or AI analysis). These tools
              follow their own privacy practices. We encourage you to review the privacy policies of these third-party
              services.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact Us</h2>
            <p>If you have questions about our privacy practices, please contact us at:</p>
            <p className="font-medium">📧 info@dreamclerk.com</p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
