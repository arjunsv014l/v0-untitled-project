"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import DoodleButton from "../ui-elements/doodle-button"
import DoodleCard from "../ui-elements/doodle-card"
import DoodleBackground from "../ui-elements/doodle-background"
import { Check, ChevronDown, ChevronRight, Mail, User, Bookmark, Settings, Home } from "lucide-react"

export default function ComponentLibrary() {
  const [activeTab, setActiveTab] = useState("buttons")
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <TabsTrigger value="buttons" className="data-[state=active]:bg-[#C5F0C0]">
          Buttons
        </TabsTrigger>
        <TabsTrigger value="cards" className="data-[state=active]:bg-[#E5CEFC]">
          Cards
        </TabsTrigger>
        <TabsTrigger value="inputs" className="data-[state=active]:bg-[#BFE5FB]">
          Inputs
        </TabsTrigger>
        <TabsTrigger value="navigation" className="data-[state=active]:bg-[#FFCFA3]">
          Navigation
        </TabsTrigger>
      </TabsList>

      <TabsContent value="buttons" className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3 border-b pb-2">Doodle Buttons</h3>
          <p className="text-sm text-gray-600 mb-4">
            Doodle buttons feature a hand-drawn style with a slight tilt for a playful aesthetic.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2">
              <DoodleButton>Default Button</DoodleButton>
              <span className="text-xs text-gray-500">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DoodleButton variant="outline">Outline</DoodleButton>
              <span className="text-xs text-gray-500">Outline</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DoodleButton size="sm">Small</DoodleButton>
              <span className="text-xs text-gray-500">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DoodleButton size="lg">Large</DoodleButton>
              <span className="text-xs text-gray-500">Large</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 border-b pb-2">Button States</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
              <DoodleButton disabled>Disabled</DoodleButton>
              <span className="text-xs text-gray-500">Disabled</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DoodleButton className="hover:bg-[#FDFD96] hover:border-black">Hover</DoodleButton>
              <span className="text-xs text-gray-500">Hover (demo)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DoodleButton className="active:scale-95">Active</DoodleButton>
              <span className="text-xs text-gray-500">Active (click me)</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 border-b pb-2">Button with Icons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
              <DoodleButton>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </DoodleButton>
              <span className="text-xs text-gray-500">Icon Left</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DoodleButton>
                Sign Up
                <ChevronRight className="ml-2 h-4 w-4" />
              </DoodleButton>
              <span className="text-xs text-gray-500">Icon Right</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DoodleButton variant="outline" className="relative" onClick={() => setShowDropdown(!showDropdown)}>
                <span>Options</span>
                <ChevronDown className="ml-2 h-4 w-4" />
                {showDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border-2 border-black rounded-lg shadow-lg z-10">
                    <div className="p-1">
                      <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm">Option 1</button>
                      <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm">Option 2</button>
                      <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm">Option 3</button>
                    </div>
                  </div>
                )}
              </DoodleButton>
              <span className="text-xs text-gray-500">Dropdown</span>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="cards" className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3 border-b pb-2">Doodle Cards</h3>
          <p className="text-sm text-gray-600 mb-4">
            Doodle cards feature a hand-drawn border style that gives a playful, sketched appearance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DoodleCard className="p-6">
              <h3 className="text-xl font-bold mb-2">Simple Card</h3>
              <p className="text-gray-600">
                This is a basic card with minimal content. Cards can contain various elements like text, buttons, and
                images.
              </p>
            </DoodleCard>

            <DoodleCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FFCFA3] rounded-full flex items-center justify-center border-2 border-black">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Card with Avatar</h3>
                  <p className="text-sm text-gray-500">User information</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Cards with avatars are useful for displaying user information or testimonials.
              </p>
              <DoodleButton size="sm">View Profile</DoodleButton>
            </DoodleCard>

            <DoodleCard className="p-6">
              <h3 className="text-xl font-bold mb-2">Card with Actions</h3>
              <p className="text-gray-600 mb-4">
                Interactive cards can include buttons or other action elements for user interaction.
              </p>
              <div className="flex gap-2">
                <DoodleButton size="sm">Accept</DoodleButton>
                <DoodleButton size="sm" variant="outline">
                  Decline
                </DoodleButton>
              </div>
            </DoodleCard>

            <DoodleCard className="overflow-hidden">
              <div className="h-40 bg-[#BFE5FB] border-b-2 border-black flex items-center justify-center">
                <span className="text-lg font-medium">Image Placeholder</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Card with Image</h3>
                <p className="text-gray-600">
                  Cards with images are great for displaying content previews, products, or visual information.
                </p>
              </div>
            </DoodleCard>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 border-b pb-2">Card Backgrounds</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DoodleBackground density="low" className="p-6 rounded-lg border-2 border-black">
              <h3 className="text-xl font-bold mb-2">Doodle Background (Low)</h3>
              <p className="text-gray-600">A subtle doodle background with low density, perfect for content areas.</p>
            </DoodleBackground>

            <DoodleBackground density="medium" className="p-6 rounded-lg border-2 border-black">
              <h3 className="text-xl font-bold mb-2">Doodle Background (Medium)</h3>
              <p className="text-gray-600">A medium-density doodle background, suitable for section dividers.</p>
            </DoodleBackground>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="inputs" className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3 border-b pb-2">Text Inputs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="standard-input" className="block text-sm font-medium text-gray-700 mb-1">
                  Standard Input
                </label>
                <input
                  id="standard-input"
                  type="text"
                  className="w-full px-3 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  placeholder="Enter text..."
                />
              </div>

              <div>
                <label htmlFor="disabled-input" className="block text-sm font-medium text-gray-700 mb-1">
                  Disabled Input
                </label>
                <input
                  id="disabled-input"
                  type="text"
                  className="w-full px-3 py-2 border-2 border-gray-300 bg-gray-100 rounded-lg text-gray-500"
                  placeholder="Disabled input"
                  disabled
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="input-with-icon" className="block text-sm font-medium text-gray-700 mb-1">
                  Input with Icon
                </label>
                <div className="relative">
                  <input
                    id="input-with-icon"
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter email..."
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="input-with-validation" className="block text-sm font-medium text-gray-700 mb-1">
                  Input with Validation
                </label>
                <div className="relative">
                  <input
                    id="input-with-validation"
                    type="text"
                    className="w-full pr-10 pl-3 py-2 border-2 border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Valid input"
                    value="Valid input"
                  />
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                </div>
                <p className="text-xs text-green-600 mt-1">This input is valid!</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 border-b pb-2">Form Elements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Checkbox</label>
                <div className="flex items-center">
                  <input
                    id="checkbox-1"
                    type="checkbox"
                    className="h-4 w-4 border-2 border-black rounded focus:ring-2 focus:ring-green-500"
                  />
                  <label htmlFor="checkbox-1" className="ml-2 text-sm text-gray-700">
                    I agree to the terms
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Radio Buttons</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="radio-1"
                      type="radio"
                      name="radio-group"
                      className="h-4 w-4 border-2 border-black focus:ring-2 focus:ring-green-500"
                      defaultChecked
                    />
                    <label htmlFor="radio-1" className="ml-2 text-sm text-gray-700">
                      Option 1
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="radio-2"
                      type="radio"
                      name="radio-group"
                      className="h-4 w-4 border-2 border-black focus:ring-2 focus:ring-green-500"
                    />
                    <label htmlFor="radio-2" className="ml-2 text-sm text-gray-700">
                      Option 2
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="select-input" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Input
                </label>
                <div className="relative">
                  <select
                    id="select-input"
                    className="w-full px-3 py-2 border-2 border-black rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  >
                    <option>Select an option</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="textarea-input" className="block text-sm font-medium text-gray-700 mb-1">
                  Textarea
                </label>
                <textarea
                  id="textarea-input"
                  rows={3}
                  className="w-full px-3 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  placeholder="Enter multiple lines of text..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="navigation" className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3 border-b pb-2">Navigation Components</h3>
          <div className="space-y-6">
            <DoodleCard className="p-4">
              <h4 className="font-medium mb-2">Main Navigation</h4>
              <div className="flex items-center space-x-4 overflow-x-auto py-2">
                <a href="#" className="text-sm font-medium border-b-2 border-black px-1 py-1">
                  Home
                </a>
                <a
                  href="#"
                  className="text-sm font-medium px-1 py-1 text-gray-600 hover:text-black hover:border-b-2 hover:border-black"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="text-sm font-medium px-1 py-1 text-gray-600 hover:text-black hover:border-b-2 hover:border-black"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-sm font-medium px-1 py-1 text-gray-600 hover:text-black hover:border-b-2 hover:border-black"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-sm font-medium px-1 py-1 text-gray-600 hover:text-black hover:border-b-2 hover:border-black"
                >
                  Contact
                </a>
              </div>
            </DoodleCard>

            <DoodleCard className="p-4">
              <h4 className="font-medium mb-2">Mobile Navigation</h4>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center p-2 rounded-lg bg-[#C5F0C0]">
                  <Home className="h-5 w-5 mb-1" />
                  <span className="text-xs">Home</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100">
                  <User className="h-5 w-5 mb-1" />
                  <span className="text-xs">Profile</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100">
                  <Bookmark className="h-5 w-5 mb-1" />
                  <span className="text-xs">Saved</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100">
                  <Settings className="h-5 w-5 mb-1" />
                  <span className="text-xs">Settings</span>
                </div>
              </div>
            </DoodleCard>

            <DoodleCard className="p-4">
              <h4 className="font-medium mb-2">Breadcrumbs</h4>
              <div className="flex items-center text-sm">
                <a href="#" className="text-gray-600 hover:text-black">
                  Home
                </a>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <a href="#" className="text-gray-600 hover:text-black">
                  Categories
                </a>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <span className="font-medium">Current Page</span>
              </div>
            </DoodleCard>

            <DoodleCard className="p-4">
              <h4 className="font-medium mb-2">Tab Navigation</h4>
              <div className="border-b-2 border-gray-200">
                <div className="flex -mb-[2px]">
                  <button className="py-2 px-4 border-b-2 border-black font-medium text-sm">Tab 1</button>
                  <button className="py-2 px-4 text-gray-600 text-sm hover:text-black">Tab 2</button>
                  <button className="py-2 px-4 text-gray-600 text-sm hover:text-black">Tab 3</button>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-600">Content for Tab 1 would appear here.</p>
              </div>
            </DoodleCard>

            <DoodleCard className="p-4">
              <h4 className="font-medium mb-2">Pagination</h4>
              <div className="flex justify-center items-center space-x-1">
                <button className="px-3 py-1 rounded border-2 border-black hover:bg-gray-100">Prev</button>
                <button className="px-3 py-1 rounded border-2 border-black bg-[#FFCFA3]">1</button>
                <button className="px-3 py-1 rounded hover:bg-gray-100">2</button>
                <button className="px-3 py-1 rounded hover:bg-gray-100">3</button>
                <span className="px-1">...</span>
                <button className="px-3 py-1 rounded hover:bg-gray-100">10</button>
                <button className="px-3 py-1 rounded border-2 border-black hover:bg-gray-100">Next</button>
              </div>
            </DoodleCard>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
