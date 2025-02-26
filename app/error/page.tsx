import { Button } from "@/app/button"
import Link from "next/link"

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Authentication Error</h1>
        <p className="text-lg">There was a problem with the authentication process.</p>
        <Link href="/">
          <Button className="bg-black" variant="outline">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
