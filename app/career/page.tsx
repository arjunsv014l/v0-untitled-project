import DoodleButton from "@/components/ui-elements/doodle-button"

export default function CareerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Career Opportunities</h1>
      <p className="text-lg mb-8">Explore exciting career opportunities with DreamClerk.</p>

      <DoodleButton href="/">Back to Home</DoodleButton>
    </main>
  )
}
