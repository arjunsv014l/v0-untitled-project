"use client"

import { useState } from "react"
import { Book, Calendar, Clock, FileText, Users, MapPin } from "lucide-react"
import HolographicCard from "../ui/holographic-card"

export default function AcademicSection() {
  const [activeTab, setActiveTab] = useState("courses")

  const tabs = [
    { id: "courses", label: "Courses", icon: Book },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "study-groups", label: "Study Groups", icon: Users },
  ]

  const courses = [
    {
      id: 1,
      code: "CS401",
      name: "Advanced Algorithms",
      instructor: "Dr. Sarah Chen",
      progress: 75,
      nextClass: "Tomorrow, 10:00 AM",
    },
    {
      id: 2,
      code: "MATH302",
      name: "Linear Algebra",
      instructor: "Prof. Michael Rodriguez",
      progress: 60,
      nextClass: "Wednesday, 2:00 PM",
    },
    {
      id: 3,
      code: "PHYS201",
      name: "Quantum Mechanics",
      instructor: "Dr. James Wilson",
      progress: 45,
      nextClass: "Thursday, 11:00 AM",
    },
  ]

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      course: "CS402 - Advanced Machine Learning",
      title: "Neural Network Implementation",
      dueDate: "2023-11-20",
      completed: false,
    },
    {
      id: 2,
      course: "MATH301 - Calculus III",
      title: "Integration Techniques Problem Set",
      dueDate: "2023-11-15",
      completed: false,
    },
    {
      id: 3,
      course: "ENG210 - Technical Writing",
      title: "Research Paper Draft",
      dueDate: "2023-11-25",
      completed: false,
    },
  ])

  const studyGroups = [
    {
      id: 1,
      name: "Algorithm Study Group",
      course: "CS401",
      members: 8,
      nextMeeting: "Today, 4:00 PM",
      location: "Library, Room 204",
    },
    {
      id: 2,
      name: "Linear Algebra Help",
      course: "MATH302",
      members: 5,
      nextMeeting: "Wednesday, 5:00 PM",
      location: "Math Building, Room 110",
    },
  ]

  const toggleAssignmentStatus = (id: number) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id ? { ...assignment, completed: !assignment.completed } : assignment,
      ),
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Academic Dashboard</h1>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center px-4 py-2 rounded-lg whitespace-nowrap
              ${activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
            `}
          >
            <tab.icon size={16} className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="space-y-4">
          {courses.map((course) => (
            <HolographicCard key={course.id} accentColor="blue">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                    <p className="text-gray-500">
                      {course.code} • {course.instructor}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {course.progress}% Complete
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span>Next class: {course.nextClass}</span>
                </div>
              </div>
            </HolographicCard>
          ))}
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === "assignments" && (
        <div className="space-y-4">
          {/* Assignments */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Upcoming Assignments</h3>
            <div className="space-y-3">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className={`p-4 rounded-lg border ${assignment.completed ? "bg-gray-50 border-gray-200" : "border-yellow-200 bg-yellow-50"}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{assignment.course}</p>
                      <h4
                        className={`font-medium ${assignment.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                      >
                        {assignment.title}
                      </h4>
                      <p className="text-sm mt-1">
                        Due:{" "}
                        {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => toggleAssignmentStatus(assignment.id)}
                        className={`px-3 py-1 text-sm rounded-lg ${
                          assignment.completed
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {assignment.completed ? "Reopen" : "Mark Complete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Study Groups Tab */}
      {activeTab === "study-groups" && (
        <div className="space-y-4">
          {studyGroups.map((group) => (
            <HolographicCard key={group.id} accentColor="blue">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{group.name}</h3>
                <p className="text-gray-500">{group.course}</p>

                <div className="flex flex-wrap gap-y-2 mt-3">
                  <div className="flex items-center mr-4 text-gray-600">
                    <Users size={16} className="mr-1" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="flex items-center mr-4 text-gray-600">
                    <Clock size={16} className="mr-1" />
                    <span>{group.nextMeeting}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span>{group.location}</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Join Meeting
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded hover:bg-gray-200">
                    View Details
                  </button>
                </div>
              </div>
            </HolographicCard>
          ))}

          <button className="w-full py-2 bg-gray-100 text-blue-600 rounded-lg hover:bg-gray-200 font-medium">
            Create New Study Group
          </button>
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === "schedule" && (
        <HolographicCard accentColor="blue">
          <div className="p-4">
            <div className="text-center py-10">
              <p className="text-gray-500">Schedule view coming soon.</p>
            </div>
          </div>
        </HolographicCard>
      )}
    </div>
  )
}
