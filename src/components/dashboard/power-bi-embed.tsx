import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function PowerBiEmbed() {
  return (
    <Card className="h-full shadow-lg transition-all hover:shadow-xl">
      <CardHeader>
        <CardTitle>Sales & Performance Dashboard</CardTitle>
        <CardDescription>Interactive real-time data from Power BI.</CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9}>
          <iframe
            title="Power BI Dashboard"
            className="w-full h-full rounded-md border"
            src="https://app.powerbi.com/view?r=eyJrIjoiYjM4YjRjZDgtNTRhZC00MTI3LTg5MGMtYTg0NDE4ZWY2YjA0IiwidCI6IjMyZDFmYjJmLWM3NTQtNGJkNy04YjJkLTMxM2Y2Y2JkMzM2ZSIsImMiOjZ9"
            allowFullScreen
          ></iframe>
        </AspectRatio>
      </CardContent>
    </Card>
  )
}
