"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MinimalistCounter from "./minimalist-counter"
import BoldCounter from "./bold-counter"
import GradientCounter from "./gradient-counter"
import RoundedCounter from "./rounded-counter"
import ThreeDCounter from "./three-d-counter"
import DoodleCounter from "./doodle-counter"

export default function CounterShowcase() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Different User Counter Styles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Minimalist</CardTitle>
          </CardHeader>
          <CardContent>
            <MinimalistCounter />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Bold</CardTitle>
          </CardHeader>
          <CardContent>
            <BoldCounter />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Gradient</CardTitle>
          </CardHeader>
          <CardContent>
            <GradientCounter />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rounded</CardTitle>
          </CardHeader>
          <CardContent>
            <RoundedCounter />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">3D</CardTitle>
          </CardHeader>
          <CardContent>
            <ThreeDCounter />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Doodle</CardTitle>
          </CardHeader>
          <CardContent>
            <DoodleCounter />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-center">Doodle Counter Variants</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <DoodleCounter variant="primary" label="students" />
          <DoodleCounter variant="secondary" label="colleges" />
          <DoodleCounter variant="green" label="communities" />
          <DoodleCounter variant="purple" label="events" />
        </div>
      </div>
    </div>
  )
}
