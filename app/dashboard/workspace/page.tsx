"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { ArrowLeft, Plus, FileText, Folder, Hash, Calendar, CheckSquare, Search } from "lucide-react"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"

export default function WorkspacePage() {
  const { user } = useUser()
  const router = useRouter()
  const [pages, setPages] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [newPageTitle, setNewPageTitle] = useState("")
  const [selectedType, setSelectedType] = useState<"page" | "database" | "kanban" | "calendar">("page")

  useEffect(() => {
    if (user) {
      fetchPages()
    }
  }, [user])

  const fetchPages = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from("workspace_pages")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })

    if (data) {
      setPages(data)
    }
  }

  const handleCreatePage = async () => {
    if (!newPageTitle.trim() || !user) return

    const { data, error } = await supabase
      .from("workspace_pages")
      .insert({
        user_id: user.id,
        title: newPageTitle,
        type: selectedType,
        content: {},
        icon: "📄",
      })
      .select()
      .single()

    if (data) {
      setNewPageTitle("")
      setIsCreating(false)
      fetchPages()
    }
  }

  const pageTypes = [
    { id: "page", name: "Page", icon: <FileText className="h-5 w-5" />, description: "Blank page with rich text" },
    {
      id: "database",
      name: "Database",
      icon: <Hash className="h-5 w-5" />,
      description: "Table with custom properties",
    },
    { id: "kanban", name: "Kanban", icon: <CheckSquare className="h-5 w-5" />, description: "Board view for tasks" },
    {
      id: "calendar",
      name: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
      description: "Calendar view for events",
    },
  ]

  const filteredPages = pages.filter((page) => page.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold">Workspace</h1>
            </div>
            <DoodleButton onClick={() => setIsCreating(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </DoodleButton>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isCreating ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <DoodleCard className="p-8">
              <h2 className="text-xl font-bold mb-6">Create New Page</h2>

              <div className="mb-6">
                <Input
                  placeholder="Page title..."
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  className="text-lg"
                  autoFocus
                />
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Choose a type</h3>
                <div className="grid grid-cols-2 gap-4">
                  {pageTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id as any)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedType === type.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        {type.icon}
                        <span className="font-medium">{type.name}</span>
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <DoodleButton onClick={handleCreatePage} disabled={!newPageTitle.trim()}>
                  Create Page
                </DoodleButton>
                <DoodleButton
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false)
                    setNewPageTitle("")
                  }}
                >
                  Cancel
                </DoodleButton>
              </div>
            </DoodleCard>
          </motion.div>
        ) : (
          <>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Pages Grid */}
            {filteredPages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">{searchQuery ? "No pages found" : "No pages yet"}</p>
                <p className="text-gray-400 mb-8">
                  {searchQuery ? "Try a different search term" : "Create your first page to get started"}
                </p>
                {!searchQuery && (
                  <DoodleButton onClick={() => setIsCreating(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Page
                  </DoodleButton>
                )}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPages.map((page, index) => (
                  <motion.div
                    key={page.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <DoodleCard className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{page.icon}</span>
                          <h3 className="font-semibold text-lg">{page.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        {page.type === "page" && "Document"}
                        {page.type === "database" && "Database"}
                        {page.type === "kanban" && "Kanban Board"}
                        {page.type === "calendar" && "Calendar"}
                      </p>
                      <p className="text-xs text-gray-400">Updated {new Date(page.updated_at).toLocaleDateString()}</p>
                    </DoodleCard>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
