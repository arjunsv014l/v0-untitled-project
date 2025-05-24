"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Users, UserPlus, BarChart2, PieChart } from "lucide-react"
import { format } from "date-fns"

export default function AdminDashboard() {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRegistrations: 0,
    recentRegistrations: [],
    registrationsBySource: {},
  })

  useEffect(() => {
    if (user?.role !== "admin") {
      setError("You don't have permission to access this page")
      setIsLoading(false)
      return
    }

    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Get total users
      const { count: userCount, error: userCountError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })

      if (userCountError) throw userCountError

      // Get total registrations
      const { count: registrationCount, error: registrationCountError } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })

      if (registrationCountError) throw registrationCountError

      // Get recent registrations
      const { data: recentRegistrations, error: recentRegistrationsError } = await supabase
        .from("registrations")
        .select("*")
        .order("registered_at", { ascending: false })
        .limit(10)

      if (recentRegistrationsError) throw recentRegistrationsError

      // Get registrations by source
      const { data: registrationsBySource, error: registrationsBySourceError } = await supabase
        .from("registrations")
        .select("source")

      if (registrationsBySourceError) throw registrationsBySourceError

      // Count registrations by source
      const sourceCount: Record<string, number> = {}
      registrationsBySource?.forEach((reg) => {
        const source = reg.source || "unknown"
        sourceCount[source] = (sourceCount[source] || 0) + 1
      })

      setStats({
        totalUsers: userCount || 0,
        totalRegistrations: registrationCount || 0,
        recentRegistrations: recentRegistrations || [],
        registrationsBySource: sourceCount,
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError("Failed to load dashboard data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-red-500 mb-4">{error}</p>
              <button onClick={() => window.history.back()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Go Back
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">{stats.totalUsers}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserPlus className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold">{stats.totalRegistrations}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Top Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart2 className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">
                {Object.entries(stats.registrationsBySource).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <PieChart className="h-5 w-5 text-orange-500 mr-2" />
              <span className="text-2xl font-bold">{Object.keys(stats.registrationsBySource).length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Registrations</TabsTrigger>
          <TabsTrigger value="sources">Registration Sources</TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>The most recent user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-gray-500">
                          No registrations found
                        </td>
                      </tr>
                    ) : (
                      stats.recentRegistrations.map((reg: any) => (
                        <tr key={reg.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{reg.name}</td>
                          <td className="py-3 px-4">{reg.email}</td>
                          <td className="py-3 px-4">
                            {reg.registered_at ? format(new Date(reg.registered_at), "MMM d, yyyy h:mm a") : "N/A"}
                          </td>
                          <td className="py-3 px-4">{reg.source || "N/A"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Registration Sources</CardTitle>
              <CardDescription>Where users are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Source</th>
                      <th className="text-left py-3 px-4">Count</th>
                      <th className="text-left py-3 px-4">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(stats.registrationsBySource).length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-4 text-gray-500">
                          No data available
                        </td>
                      </tr>
                    ) : (
                      Object.entries(stats.registrationsBySource)
                        .sort((a, b) => b[1] - a[1])
                        .map(([source, count]) => (
                          <tr key={source} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{source}</td>
                            <td className="py-3 px-4">{count}</td>
                            <td className="py-3 px-4">
                              {stats.totalRegistrations
                                ? ((count / stats.totalRegistrations) * 100).toFixed(1) + "%"
                                : "0%"}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
