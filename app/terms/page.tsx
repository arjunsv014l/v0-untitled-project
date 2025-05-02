"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Home, FileText } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import { useEffect } from "react"

export default function TermsOfServicePage() {
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
              <FileText className="h-4 w-4 mr-2" />
              <span className="font-medium">Legal</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>

            <p className="text-lg text-gray-700 mb-4">
              Welcome to Dreamclerk! These Terms of Service ("Terms") govern your access to and use of our platform.
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
            <h2 className="text-2xl font-bold mt-6 mb-4">1. Acceptance of Terms</h2>
            <p>
              By using Dreamclerk, you agree to comply with these Terms. If you do not agree, please do not use our
              platform. These Terms constitute a legally binding agreement between you and Dreamclerk regarding your use
              of the platform.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Eligibility</h2>
            <p>
              Users must be at least 13 years old. If you're under 18, you must have parental or guardian consent. By
              using the platform, you represent and warrant that you meet these eligibility requirements.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Description of Service</h2>
            <p>
              Dreamclerk allows students to submit journals, experiences, and data related to college life. The data is
              categorized and used to generate insights for new students and for AI-based firms and mental health
              companies under ethical usage guidelines.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. User Data and Ownership</h2>
            <p>
              You retain ownership of the content you submit. By posting, you grant Dreamclerk a license to use, store,
              modify, and distribute your data for the purpose of improving student life, generating insights, and
              enabling AI use cases. This license is non-exclusive, worldwide, and royalty-free.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Token System</h2>
            <p>
              Students may earn Student-Created Data Tokens (SCDTs) as a reward. These tokens are non-transferable and
              subject to platform rules. We do not guarantee monetary value or exchangeability unless explicitly stated.
              The token system is subject to change at our discretion.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Post false, misleading, or harmful content.</li>
              <li>Violate any applicable laws or regulations.</li>
              <li>Attempt to interfere with the platform or its users.</li>
              <li>Use the platform for any illegal or unauthorized purpose.</li>
              <li>Engage in any activity that could damage, disable, or impair the platform.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts for violations of these Terms. We may also terminate
              or suspend access to the platform immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Disclaimer</h2>
            <p>
              Dreamclerk is provided "as is." We are not liable for decisions made based on our insights. We do not
              guarantee the accuracy or outcome of any recommendation. To the maximum extent permitted by law, we
              disclaim all warranties, express or implied, regarding the platform.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Modifications</h2>
            <p>
              We may revise these Terms at any time. Continued use of the platform implies acceptance of the updated
              terms. We will make reasonable efforts to notify users of significant changes to these Terms.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
