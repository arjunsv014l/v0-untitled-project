"use client"

import Link from "next/link"
import { Mail, Globe, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Logo and Social */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold text-gray-900">dreamclerk</h2>
            </Link>
            <p className="mt-3 text-gray-600">Transforming student experiences into valuable insights with AI.</p>
            <div className="flex space-x-5 mt-5">
              <a
                href="https://www.linkedin.com/in/arjun-sv-6bbb8a316/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/dreamclrk?igsh=MXcyemYyemo3cXYybQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/for-students" className="text-gray-600 hover:text-gray-900">
                  For Students
                </Link>
              </li>
              <li>
                <Link href="/for-universities" className="text-gray-600 hover:text-gray-900">
                  For Universities
                </Link>
              </li>
              <li>
                <Link href="/for-companies" className="text-gray-600 hover:text-gray-900">
                  For Companies
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Legal */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-600" />
                <a href="mailto:arjun@dreamclerk.com" className="text-gray-600 hover:text-gray-900">
                  arjun@dreamclerk.com
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-600" />
                <a href="mailto:info@dreamclerk.com" className="text-gray-600 hover:text-gray-900">
                  info@dreamclerk.com
                </a>
              </li>
              <li className="flex items-center">
                <Globe size={16} className="mr-2 text-gray-600" />
                <a
                  href="https://www.dreamclerk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  www.dreamclerk.com
                </a>
              </li>
            </ul>

            <h3 className="text-base font-semibold text-gray-900 mb-4 mt-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">© {currentYear} Dreamclerk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
