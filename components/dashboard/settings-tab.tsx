"use client"

import { useState } from "react"
import { Save, Bell, Lock, User, Eye, EyeOff } from "lucide-react"

export default function SettingsTab() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [profileSettings, setProfileSettings] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    bio: "Computer Science student passionate about web development and AI.",
    visibility: "public",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newMessages: true,
    mentions: true,
    comments: true,
    likes: false,
    events: true,
    newsletter: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showActivity: true,
    allowTagging: true,
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

  const handlePrivacyChange = (field: string, value: any) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveSettings = () => {
    setIsSubmitting(true)

    // Simulate saving
    setTimeout(() => {
      console.log("Settings saved:", {
        profile: profileSettings,
        notifications: notificationSettings,
        privacy: privacySettings,
      })
      setIsSubmitting(false)
      // In a real app, you would save this to the database
    }, 1000)
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Lock },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-bw-black mb-6">Settings</h1>

      <div className="bg-bw-white border border-bw-gray-200 rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-bw-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 flex items-center ${
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
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="space-y-6">
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
                />
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
            <div className="space-y-4">
              <p className="text-bw-gray-600 mb-4">Choose which notifications you'd like to receive</p>

              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-bw-gray-100">
                  <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleNotificationToggle(key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-bw-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bw-black"></div>
                  </label>
                </div>
              ))}
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

          {/* Save Button */}
          <div className="mt-8">
            <button
              onClick={handleSaveSettings}
              disabled={isSubmitting}
              className="px-4 py-2 bg-bw-black text-bw-white rounded-lg hover:bg-bw-gray-800 disabled:opacity-50 flex items-center"
            >
              <Save size={18} className="mr-2" />
              {isSubmitting ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
