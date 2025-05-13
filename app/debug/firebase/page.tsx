"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { runFirebaseDiagnostics, checkUserProfile, forceProfileCompletion } from "@/lib/firebase-diagnostics"
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export default function FirebaseDiagnosticsPage() {
  const { user } = useUser()
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null)
  const [userProfileData, setUserProfileData] = useState<any>(null)
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false)
  const [isCheckingProfile, setIsCheckingProfile] = useState(false)
  const [isForcingCompletion, setIsForcingCompletion] = useState(false)
  const [forceResult, setForceResult] = useState<any>(null)

  const runDiagnostics = async () => {
    setIsRunningDiagnostics(true)
    try {
      const results = await runFirebaseDiagnostics()
      setDiagnosticResults(results)
    } catch (error) {
      console.error("Error running diagnostics:", error)
      setDiagnosticResults({ status: "failure", error: String(error) })
    } finally {
      setIsRunningDiagnostics(false)
    }
  }

  const checkProfile = async () => {
    if (!user) return

    setIsCheckingProfile(true)
    try {
      const profileData = await checkUserProfile(user.id)
      setUserProfileData(profileData)
    } catch (error) {
      console.error("Error checking profile:", error)
      setUserProfileData({ error: String(error) })
    } finally {
      setIsCheckingProfile(false)
    }
  }

  const forceCompletion = async () => {
    if (!user) return

    setIsForcingCompletion(true)
    try {
      const result = await forceProfileCompletion(user.id)
      setForceResult(result)

      // If successful, refresh profile data
      if (result.success) {
        await checkProfile()
      }
    } catch (error) {
      console.error("Error forcing completion:", error)
      setForceResult({ success: false, error: String(error) })
    } finally {
      setIsForcingCompletion(false)
    }
  }

  // Run diagnostics on mount
  useEffect(() => {
    runDiagnostics()
  }, [])

  // Check user profile when user is available
  useEffect(() => {
    if (user) {
      checkProfile()
    }
  }, [user])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Firebase Diagnostics</h1>

      {/* Firebase Status Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            Firebase Status
            {diagnosticResults?.status === "success" && <CheckCircle className="ml-2 h-5 w-5 text-green-500" />}
            {diagnosticResults?.status === "partial" && <AlertTriangle className="ml-2 h-5 w-5 text-yellow-500" />}
            {diagnosticResults?.status === "failure" && <XCircle className="ml-2 h-5 w-5 text-red-500" />}
            {!diagnosticResults && <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
          </CardTitle>
          <CardDescription>Diagnostic results for Firebase configuration and operations</CardDescription>
        </CardHeader>
        <CardContent>
          {isRunningDiagnostics ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mr-2" />
              <span>Running diagnostics...</span>
            </div>
          ) : diagnosticResults ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {diagnosticResults.details.configDetails &&
                    Object.entries(diagnosticResults.details.configDetails).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-1">
                        <span>{key}:</span>
                        <span>{value as string}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Service Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex justify-between border-b pb-1">
                    <span>Firebase Initialized:</span>
                    <span>{diagnosticResults.details.firebaseInitialized ? "✅" : "❌"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Auth Available:</span>
                    <span>{diagnosticResults.details.authAvailable ? "✅" : "❌"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Firestore Available:</span>
                    <span>{diagnosticResults.details.firestoreAvailable ? "✅" : "❌"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Operations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex justify-between border-b pb-1">
                    <span>Write Operation:</span>
                    <span>{diagnosticResults.details.writeOperationSuccess ? "✅" : "❌"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Read Operation:</span>
                    <span>{diagnosticResults.details.readOperationSuccess ? "✅" : "❌"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Update Operation:</span>
                    <span>{diagnosticResults.details.updateOperationSuccess ? "✅" : "❌"}</span>
                  </div>
                </div>
              </div>

              {diagnosticResults.details.userProfilesCount !== undefined && (
                <div>
                  <h3 className="font-semibold mb-2">User Profiles</h3>
                  <div className="border-b pb-1 mb-2">
                    <span>Total Profiles: {diagnosticResults.details.userProfilesCount}</span>
                  </div>

                  {diagnosticResults.details.sampleProfiles && diagnosticResults.details.sampleProfiles.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Sample Profiles:</h4>
                      <div className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-40">
                        <pre>{JSON.stringify(diagnosticResults.details.sampleProfiles, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {diagnosticResults.details.error && (
                <div className="bg-red-50 p-3 rounded border border-red-200 text-red-700">
                  <h3 className="font-semibold mb-1">Error</h3>
                  <p>{diagnosticResults.details.error}</p>
                </div>
              )}
            </div>
          ) : (
            <p>No diagnostic results available</p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={runDiagnostics} disabled={isRunningDiagnostics} className="w-full">
            {isRunningDiagnostics ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              "Run Diagnostics Again"
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* User Profile Card */}
      {user && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              Your Profile Status
              {userProfileData?.exists && userProfileData?.profileCompleted && (
                <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
              )}
              {userProfileData?.exists && !userProfileData?.profileCompleted && (
                <AlertTriangle className="ml-2 h-5 w-5 text-yellow-500" />
              )}
              {userProfileData && !userProfileData?.exists && <XCircle className="ml-2 h-5 w-5 text-red-500" />}
              {!userProfileData && <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
            </CardTitle>
            <CardDescription>Details about your user profile in Firebase</CardDescription>
          </CardHeader>
          <CardContent>
            {isCheckingProfile ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span>Checking profile...</span>
              </div>
            ) : userProfileData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex justify-between border-b pb-1">
                    <span>User ID:</span>
                    <span className="font-mono text-sm">{user.id}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Profile Exists:</span>
                    <span>{userProfileData.exists ? "✅" : "❌"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Profile Completed:</span>
                    <span>{userProfileData.profileCompleted ? "✅" : "❌"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Has profileCompleted Field:</span>
                    <span>{userProfileData.data && "profileCompleted" in userProfileData.data ? "✅" : "❌"}</span>
                  </div>
                </div>

                {userProfileData.data && (
                  <div>
                    <h3 className="font-semibold mb-2">Profile Data</h3>
                    <div className="bg-gray-50 p-2 rounded overflow-auto max-h-60">
                      <pre className="text-xs">{JSON.stringify(userProfileData.data, null, 2)}</pre>
                    </div>
                  </div>
                )}

                {userProfileData.error && (
                  <div className="bg-red-50 p-3 rounded border border-red-200 text-red-700">
                    <h3 className="font-semibold mb-1">Error</h3>
                    <p>{userProfileData.error}</p>
                  </div>
                )}
              </div>
            ) : (
              <p>No profile data available</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button onClick={checkProfile} disabled={isCheckingProfile} className="w-full">
              {isCheckingProfile ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                "Check Profile Again"
              )}
            </Button>

            <Button
              onClick={forceCompletion}
              disabled={isForcingCompletion || !userProfileData?.exists}
              variant="destructive"
              className="w-full"
            >
              {isForcingCompletion ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Forcing...
                </>
              ) : (
                "Force Profile Completion"
              )}
            </Button>

            {forceResult && (
              <div
                className={`w-full p-2 rounded text-center ${forceResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {forceResult.success ? (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Profile successfully marked as completed
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <XCircle className="mr-2 h-4 w-4" />
                    Failed to force completion: {forceResult.error}
                  </span>
                )}
              </div>
            )}
          </CardFooter>
        </Card>
      )}

      {/* Fallback Solution Card */}
      <Card>
        <CardHeader>
          <CardTitle>Fallback Solution</CardTitle>
          <CardDescription>If Firebase is not working properly, you can use this fallback solution</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            If you're experiencing issues with Firebase, you can use the following fallback solution to bypass the
            profile completion check:
          </p>

          <div className="bg-gray-50 p-3 rounded font-mono text-sm overflow-auto">
            <p>// Add this to your browser console</p>
            <p>localStorage.setItem('dreamclerk_user', JSON.stringify(&#123;</p>
            <p> ...JSON.parse(localStorage.getItem('dreamclerk_user') || '&#123;&#125;'),</p>
            <p> profileCompleted: true,</p>
            <p> profileCompletedAt: new Date().toISOString()</p>
            <p>&#125;));</p>
            <p>// Then refresh the page</p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            This will update your local user data to mark the profile as completed, allowing you to bypass the profile
            setup page.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
