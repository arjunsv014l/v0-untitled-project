import FirestoreDebug from "@/components/firestore-debug"

export default function FirestoreDebugPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Firestore Debug Page</h1>
      <FirestoreDebug />
    </div>
  )
}
