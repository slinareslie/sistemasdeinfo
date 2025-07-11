import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatabaseZap, FileUp, UploadCloud } from "lucide-react"

export default function DataUpload() {
  return (
    <Card className="shadow-lg transition-all hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DatabaseZap className="h-6 w-6 text-accent" />
          <span>Importar Datos</span>
        </CardTitle>
        <CardDescription>Carga datos de fuentes externas.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                    <p className="text-xs text-muted-foreground">CSV, XLSX, o JSON (MAX. 50MB)</p>
                </div>
                <Input id="dropzone-file" type="file" className="hidden" />
            </label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <FileUp className="mr-2 h-4 w-4" />
          Subir Archivo
        </Button>
      </CardFooter>
    </Card>
  )
}
