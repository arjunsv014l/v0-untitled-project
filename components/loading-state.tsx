interface LoadingStateProps {
  message?: string
  fullScreen?: boolean
}

export default function LoadingState({ message = "Loading...", fullScreen = false }: LoadingStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
      <p className="text-gray-700 text-lg">{message}</p>
    </div>
  )

  if (fullScreen) {
    return <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">{content}</div>
  }

  return content
}
