"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, ChevronRight, Bell, GraduationCap, BarChart, Clock, CheckCircle, Users, Award } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

// Define event type
interface Event {
  id: string
  title: string
  date: Date
  location: string
  type: "academic" | "career" | "social"
}

// Define task type
interface Task {
  id: string
  title: string
  dueDate: Date
  completed: boolean
  priority: "high" | "medium" | "low"
  category: "academic" | "career" | "personal"
}

// Define notification type
interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "mention" | "event" | "task"
  userId?: string
  userName?: string
  userAvatar?: string
  content: string
  postId?: string
  createdAt: Date
  read: boolean
}

// Define course type
interface Course {
  id: string
  name: string
  code: string
  progress: number
  nextDeadline?: Date
  nextTask?: string
}

// Define achievement type
interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  date: Date
  points: number
}

export default function DashboardHome() {
  const { user } = useUser()
  const [greeting, setGreeting] = useState("")
  const [events, setEvents] = useState<Event[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    // Fetch mock data
    fetchMockData()
  }, [])

  const fetchMockData = () => {
    // Mock events
    const mockEvents: Event[] = [
      {
        id: "1",
        title: "Career Fair",
        date: new Date(Date.now() + 86400000 * 3), // 3 days from now
        location: "University Center",
        type: "career",
      },
      {
        id: "2",
        title: "Study Group: Machine Learning",
        date: new Date(Date.now() + 86400000), // 1 day from now
        location: "Library Room 204",
        type: "academic",
      },
      {
        id: "3",
        title: "Campus Social Mixer",
        date: new Date(Date.now() + 86400000 * 5), // 5 days from now
        location: "Student Union",
        type: "social",
      },
    ]

    // Mock tasks
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Complete Machine Learning Assignment",
        dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
        completed: false,
        priority: "high",
        category: "academic",
      },
      {
        id: "2",
        title: "Update Resume",
        dueDate: new Date(Date.now() + 86400000 * 4), // 4 days from now
        completed: false,
        priority: "medium",
        category: "career",
      },
      {
        id: "3",
        title: "Read Chapter 5 for Economics",
        dueDate: new Date(Date.now() + 86400000), // 1 day from now
        completed: true,
        priority: "medium",
        category: "academic",
      },
      {
        id: "4",
        title: "Schedule Advisor Meeting",
        dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
        completed: false,
        priority: "low",
        category: "academic",
      },
    ]

    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "like",
        userId: "user1",
        userName: "Alex Johnson",
        userAvatar: "/student-avatar.png",
        content: "liked your post",
        postId: "post1",
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        read: false,
      },
      {
        id: "2",
        type: "event",
        content: "Career Fair is tomorrow",
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        read: false,
      },
      {
        id: "3",
        type: "task",
        content: "Assignment due in 24 hours",
        createdAt: new Date(Date.now() - 10800000), // 3 hours ago
        read: true,
      },
    ]

    // Mock courses
    const mockCourses: Course[] = [
      {
        id: "1",
        name: "Introduction to Machine Learning",
        code: "CS 4320",
        progress: 65,
        nextDeadline: new Date(Date.now() + 86400000 * 2), // 2 days from now
        nextTask: "Assignment 3",
      },
      {
        id: "2",
        name: "Advanced Economics",
        code: "ECON 3150",
        progress: 42,
        nextDeadline: new Date(Date.now() + 86400000), // 1 day from now
        nextTask: "Midterm Exam",
      },
      {
        id: "3",
        name: "Data Structures",
        code: "CS 2420",
        progress: 78,
        nextDeadline: new Date(Date.now() + 86400000 * 4), // 4 days from now
        nextTask: "Project Milestone",
      },
    ]

    // Mock achievements
    const mockAchievements: Achievement[] = [
      {
        id: "1",
        title: "First Connection",
        description: "Made your first connection",
        icon: "🔗",
        date: new Date(Date.now() - 86400000 * 5), // 5 days ago
        points: 10,
      },
      {
        id: "2",
        title: "Perfect Attendance",
        description: "Attended all classes for a month",
        icon: "🏆",
        date: new Date(Date.now() - 86400000 * 10), // 10 days ago
        points: 50,
      },
      {
        id: "3",
        title: "Study Streak",
        description: "Studied for 7 days in a row",
        icon: "🔥",
        date: new Date(Date.now() - 86400000 * 3), // 3 days ago
        points: 25,
      },
    ]

    setEvents(mockEvents)
    setTasks(mockTasks)
    setNotifications(mockNotifications)
    setCourses(mockCourses)
    setAchievements(mockAchievements)
    setIsLoading(false)
  }

  const completeTask = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed,
          }
        }
        return task
      }),
    )
  }

  const markAllNotificationsAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">
          {greeting}, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600 mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Academic & Tasks */}
        <div className="space-y-6">
          {/* Academic Progress Widget */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Academic Progress
                </CardTitle>
                <Link href="/dashboard/academics" className="text-sm text-blue-600 hover:underline flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {courses.map((course) => (
                  <div key={course.id} className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-gray-500">{course.code}</div>
                    </div>
                    <div className="mb-2">
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs font-medium">{course.progress}%</span>
                      </div>
                    </div>
                    {course.nextDeadline && (
                      <div className="text-sm text-gray-700 flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-orange-500" />
                        {course.nextTask}: {formatDistanceToNow(course.nextDeadline, { addSuffix: true })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tasks Widget */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Tasks
                </CardTitle>
                <Link href="/dashboard/tasks" className="text-sm text-blue-600 hover:underline flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 flex items-start space-x-3">
                    <div>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => completeTask(task.id)}
                        className="rounded text-black focus:ring-black"
                      />
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                        {task.title}
                      </div>
                      <div className="flex items-center mt-1">
                        <span
                          className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            task.priority === "high"
                              ? "bg-red-500"
                              : task.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        ></span>
                        <span className="text-xs text-gray-500">
                          Due {formatDistanceToNow(task.dueDate, { addSuffix: true })}
                        </span>
                        <span
                          className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            task.category === "academic"
                              ? "bg-blue-100 text-blue-800"
                              : task.category === "career"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {task.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add New Task
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Middle Column - Events & Social */}
        <div className="space-y-6">
          {/* Upcoming Events Widget */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Events
                </CardTitle>
                <Link href="/dashboard/events" className="text-sm text-blue-600 hover:underline flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {events.map((event) => (
                  <div key={event.id} className="p-4">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-700 mt-1 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                      {" • "}
                      {event.date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-sm text-gray-700 mt-1 flex items-center">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          event.type === "academic"
                            ? "bg-blue-500"
                            : event.type === "career"
                              ? "bg-purple-500"
                              : "bg-green-500"
                        }`}
                      ></span>
                      {event.location}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add to Calendar
              </Button>
            </CardFooter>
          </Card>

          {/* Social Feed Preview Widget */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Social Feed
                </CardTitle>
                <Link href="/dashboard/social" className="text-sm text-blue-600 hover:underline flex items-center">
                  View Full Feed <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-center py-4">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <h3 className="font-medium text-lg mb-1">Stay Connected</h3>
                <p className="text-gray-500 mb-4">Check out what's happening in your network</p>
                <Button asChild>
                  <Link href="/dashboard/social">Go to Social Feed</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Notifications & Achievements */}
        <div className="space-y-6">
          {/* Notifications Widget */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={markAllNotificationsAsRead}>
                  Mark all as read
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 flex items-start space-x-3 ${notification.read ? "" : "bg-blue-50"}`}
                    >
                      <div className="flex-shrink-0">
                        {notification.type === "like" ||
                        notification.type === "comment" ||
                        notification.type === "follow" ? (
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={notification.userAvatar || "/placeholder.svg"}
                              alt={notification.userName || ""}
                            />
                            <AvatarFallback>
                              {notification.userName ? notification.userName.charAt(0).toUpperCase() : "U"}
                            </AvatarFallback>
                          </Avatar>
                        ) : notification.type === "event" ? (
                          <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-purple-600" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-yellow-600" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm">
                          {notification.userName && <span className="font-medium">{notification.userName} </span>}
                          {notification.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                        </p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto"></div>}
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No notifications yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/dashboard/notifications"
                className="text-sm text-blue-600 hover:underline w-full text-center"
              >
                View all notifications
              </Link>
            </CardFooter>
          </Card>

          {/* Achievements Widget */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements
                </CardTitle>
                <Link
                  href="/dashboard/achievements"
                  className="text-sm text-blue-600 hover:underline flex items-center"
                >
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-xl">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-sm text-gray-500">{achievement.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-600">+{achievement.points} pts</div>
                      <div className="text-xs text-gray-500">
                        {formatDistanceToNow(achievement.date, { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Widget */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-blue-600 font-medium text-xl">85%</div>
                  <div className="text-sm text-gray-600">Attendance</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-green-600 font-medium text-xl">3.7</div>
                  <div className="text-sm text-gray-600">GPA</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-purple-600 font-medium text-xl">12</div>
                  <div className="text-sm text-gray-600">Connections</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="text-yellow-600 font-medium text-xl">8</div>
                  <div className="text-sm text-gray-600">Events</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
