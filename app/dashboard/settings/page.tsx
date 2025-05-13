"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Bell, Lock, User, Eye, EyeOff, Sun, Laptop } from "lucide-react"

export default function SettingsPage() {
  const { user, isLoading, updateUserProfile } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [profileSettings, setProfileSettings] = useState({
    name: user?.name || "Alex Johnson",
    email: user?.email || "alex.johnson@example.com",
    bio: user?.bio || "Computer Science student passionate about web development and AI.",
    university: user?.university || "University of Technology",
    major: user?.major || "Computer Science",
    graduationYear: user?.graduationYear || "2026",
    location: user?.location || "San Francisco, CA",
    visibility: "public",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newMessages: true,
    mentions: true,
    comments: true,
    likes: false,
    events: true,
    newsletter: false,
    emailDigest: "weekly",
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showActivity: true,
    allowTagging: true,
    showJournals: "private",
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    fontSize: "medium",
    compactMode: false,
    accentColor: "blue",
  })

  const [accountSettings, setAccountSettings] = useState({
    language: "english",
    timezone: "America/Los_Angeles",
    twoFactorAuth: false,
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfileSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNotificationToggle = (field: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }))
  }

  const handleNotificationChange = (field: string, value: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePrivacyChange = (field: string, value: any) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAppearanceChange = (field: string, value: any) => {
    setAppearanceSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAccountChange = (field: string, value: any) => {
    setAccountSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveSettings = async () => {
    setIsSubmitting(true)
    setSuccessMessage("")

    try {
      // In a real app, you would save all settings
      // For now, we'll just update the user profile
      if (updateUserProfile) {
        await updateUserProfile({
          name: profileSettings.name,
          bio: profileSettings.bio,
          university: profileSettings.university,
          major: profileSettings.major,
          graduationYear: profileSettings.graduationYear,
          location: profileSettings.location,
        })
      }

      // Simulate saving other settings
      setTimeout(() => {
        console.log("Settings saved:", {
          profile: profileSettings,
          notifications: notificationSettings,
          privacy: privacySettings,
          appearance: appearanceSettings,
          account: accountSettings,
        })
        setIsSubmitting(false)
        setSuccessMessage("Settings saved successfully!")

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("")
        }, 3000)
      }, 1000)
    } catch (error) {
      console.error("Error saving settings:", error)
      setIsSubmitting(false)
    }
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Sun },
    { id: "account", label: "Account", icon: Laptop },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-black border-r-gray-300 border-b-gray-300 border-l-gray-300 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    router.push("/")
    return null
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-bw-black mb-6">Settings</h1>

        <div className="bg-bw-white border border-bw-gray-200 rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-bw-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 flex items-center whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-b-2 border-bw-black text-bw-black"
                    : "text-bw-gray-600 hover:text-bw-black"
                }`}
              >
                <tab.icon size={18} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                {successMessage}
              </div>
            )}

            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-bw-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={profileSettings.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                      className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-bw-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-bw-gray-700 mb-1">University</label>
                    <input
                      type="text"
                      value={profileSettings.university}
                      onChange={(e) => handleProfileChange("university", e.target.value)}
                      className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-bw-gray-700 mb-1">Major</label>
                    <input
                      type="text"
                      value={profileSettings.major}
                      onChange={(e) => handleProfileChange("major", e.target.value)}
                      className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-bw-gray-700 mb-1">Graduation Year</label>
                    <input
                      type="text"
                      value={profileSettings.graduationYear}
                      onChange={(e) => handleProfileChange("graduationYear", e.target.value)}
                      className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-bw-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={profileSettings.location}
                      onChange={(e) => handleProfileChange("location", e.target.value)}
                      className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-bw-gray-700 mb-1">Bio</label>
                  <textarea
                    value={profileSettings.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    rows={4}
                    className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-bw-gray-700 mb-1">Profile Visibility</label>
                  <div className="flex space-x-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={profileSettings.visibility === "public"}
                        onChange={() => handleProfileChange("visibility", "public")}
                        className="mr-2"
                      />
                      <span>Public</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={profileSettings.visibility === "friends"}
                        onChange={() => handleProfileChange("visibility", "friends")}
                        className="mr-2"
                      />
                      <span>Friends Only</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={profileSettings.visibility === "private"}
                        onChange={() => handleProfileChange("visibility", "private")}
                        className="mr-2"
                      />
                      <span>Private</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <p className="text-bw-gray-600 mb-4">Choose which notifications you'd like to receive</p>

                <div className="space-y-4">
                  {Object.entries(notificationSettings)
                    .filter(
                      ([key]) => typeof notificationSettings[key as keyof typeof notificationSettings] === "boolean",
                    )
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-bw-gray-100">
                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={() => handleNotificationToggle(key)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-bw-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bw-black"></div>
                        </label>
                      </div>
                    ))}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-bw-gray-700 mb-1">Email Digest Frequency</label>
                  <select
                    value={notificationSettings.emailDigest}
                    onChange={(e) => handleNotificationChange("emailDigest", e.target.value)}
                    className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-bw-gray-700 mb-1">Profile Visibility</label>
                  <select
                    value={privacySettings.profileVisibility}
                    onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                    className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                  >
                    <option value="public">Public - Anyone can view your profile</option>
                    <option value="friends">Friends Only - Only friends can view your profile</option>
                    <option value="private">Private - Only you can view your profile</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bw-gray-700 mb-1">Journal Entries Visibility</label>
                  <select
                    value={privacySettings.showJournals}
                    onChange={(e) => handlePrivacyChange("showJournals", e.target.value)}
                    className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                  >
                    <option value="private">Private - Only you can see your journal entries</option>
                    <option value="friends">Friends Only - Only friends can see your journal entries</option>
                    <option value="public">Public - Anyone can see your journal entries</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Show Email Address</p>
                    <p className="text-sm text-bw-gray-500">Allow others to see your email address</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange("showEmail", !privacySettings.showEmail)}
                    className="p-2 rounded-full hover:bg-bw-gray-100"
                  >
                    {privacySettings.showEmail ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Activity Status</p>
                    <p className="text-sm text-bw-gray-500">Show when you're active on the platform</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.showActivity}
                      onChange={() => handlePrivacyChange("showActivity", !privacySettings.showActivity)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-bw-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bw-black"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Allow Tagging</p>
                    <p className="text-sm text-bw-gray-500">Allow others to tag you in posts and comments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.allowTagging}
                      onChange={() => handlePrivacyChange("allowTagging", !privacySettings.allowTagging)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-bw-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bw-black"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-bw-gray-700 mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => handleAppearanceChange("theme", "light")}
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        appearanceSettings.theme === "light"
                          ? "border-black bg-gray-100"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Sun size={24} className="mb-2" />
                      <span>Light</span>
                    </button>
                    <button
                      onClick={() => handleAppearanceChange("theme", "dark")}
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        appearanceSettings.theme === "dark"
                          ? "border-black bg-gray-100"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Moon size={24} className="mb-2" />
                      <span>Dark</span>
                    </button>
                    <button
                      onClick={() => handleAppearanceChange("theme", "system")}
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        appearanceSettings.theme === "system"
                          ? "border-black bg-gray-100"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Laptop size={24} className="mb-2" />
                      <span>System</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bw-gray-700 mb-1">Font Size</label>
                  <select
                    value={appearanceSettings.fontSize}
                    onChange={(e) => handleAppearanceChange("fontSize", e.target.value)}
                    className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Compact Mode</p>
                    <p className="text-sm text-bw-gray-500">Reduce spacing for a more compact view</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appearanceSettings.compactMode}
                      onChange={() => handleAppearanceChange("compactMode", !appearanceSettings.compactMode)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-bw-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bw-black"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bw-gray-700 mb-1">Accent Color</label>
                  <div className="flex space-x-4 mt-2">
                    {["blue", "purple", "green", "red", "orange"].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleAppearanceChange("accentColor", color)}
                        className={`w-8 h-8 rounded-full ${
                          appearanceSettings.accentColor === color ? "ring-2 ring-offset-2 ring-black" : ""
                        } bg-${color}-500`}
                        aria-label={`${color} accent color`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-bw-gray-700 mb-1">Language</label>
                  <select
                    value={accountSettings.language}
                    onChange={(e) => handleAccountChange("language", e.target.value)}
                    className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bw-gray-700 mb-1">Timezone</label>
                  <select
                    value={accountSettings.timezone}
                    onChange={(e) => handleAccountChange("timezone", e.target.value)}
                    className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                  >
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    <option value="America/Denver">Mountain Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-bw-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={accountSettings.twoFactorAuth}
                      onChange={() => handleAccountChange("twoFactorAuth", !accountSettings.twoFactorAuth)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-bw-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bw-black"></div>
                  </label>
                </div>

                <div className="pt-4 border-t border-bw-gray-200">
                  <button
                    className="text-red-600 hover:text-red-800 font-medium"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                        alert("Account deletion would be processed here in a real application.")
                      }
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSaveSettings}
                disabled={isSubmitting}
                className="px-4 py-2 bg-bw-black text-white rounded hover:bg-bw-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bw-black disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

// Import the Moon icon that was missing
import { Moon } from "lucide-react"
