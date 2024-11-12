import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, X, Upload, Info, Save, Shuffle, Box } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function VariantProductData() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          Configuración de Atributos y Variantes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Alert className="col-span-2">
          <AlertTitle className="text-xl font-bold">Nota</AlertTitle>
          <AlertDescription>
            Este paso no es absolutamente necesario si el producto no tiene
            variaciones. Puedes omitirlo si tu producto es simple y no requiere
            atributos o variantes.
          </AlertDescription>
        </Alert>
        <div className="mb-4 space-y-6 lg:col-span-1 col-span-2">
          <div className="flex flex-row items-center">
            <Label htmlFor="primaryAttribute" className="text-lg font-bold">
              Atributo Principal
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="inline-block ml-2" size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    El atributo principal representa las diferencias visuales
                    del producto.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col xs:flex-row gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el atributo principal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="color">Color</SelectItem>
                <SelectItem value="material">Material</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-white border-blue-600 border-[1px] text-blue-600 hover:bg-blue-700 hover:text-white">
              <Plus size={16} />
              Agregar atributo
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Valores de</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className="text-sm py-1 px-2">
                rojo
                <button className="ml-2 text-red-500">
                  <X size={12} />
                </button>
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un valor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rojo">rojo</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Agregar valor personalizado" />
            </div>
            <Card className="mt-4">
              <CardContent className="pt-4">
                <h4 className="font-semibold mb-2">Imágenes para rojo</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <img className="w-24 h-24 object-cover rounded" />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-700 hover:bg-red-800 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer">
                    <input type="file" multiple className="hidden" />
                    <Upload size={24} />
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-semibold mb-2">Nuevo Atributo Principal</h4>
                <div className="space-y-2">
                  <Input placeholder="Nombre del atributo" name="name" />
                  <div className="flex gap-2">
                    <Input placeholder="Valor" name="value" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="bg-red-700 hover:bg-red-800"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  <div className="flex flex-col xs:flex-row gap-2 justify-end">
                    <Button
                      type="button"
                      className="bg-white border-blue-600 border-[1px] text-blue-600 hover:bg-blue-700 hover:text-white"
                    >
                      <Plus className="h-4 w-4" /> Agregar valor
                    </Button>
                    <Button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4" />
                      Guardar Nuevo Atributo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mb-4 space-y-6 lg:col-span-1 col-span-2">
          <div className="flex flex-row items-center">
            <Label htmlFor="primaryAttribute" className="text-lg font-bold">
              Atributo Secundarios
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="inline-block ml-2" size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Los atributos secundarios no afectan la apariencia visual
                    del producto.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col xs:flex-row gap-8">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Agregar atributo secundario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="size">Talla</SelectItem>
                <SelectItem value="weight">Peso</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-white border-blue-600 border-[1px] text-blue-600 hover:bg-blue-700 hover:text-white">
              <Plus size={16} />
              Agregar atributo
            </Button>
          </div>
          <Card>
            <CardContent className="pt-4">
              <h4 className="font-semibold mb-2">Nuevo Atributo Secundario</h4>
              <div className="space-y-2">
                <Input placeholder="Nombre del atributo" name="name" />
                <div className="flex gap-2">
                  <Input placeholder="Valor" name="value" />
                  <Button size="icon" className="bg-red-700 hover:bg-red-800">
                    <X size={16} />
                  </Button>
                </div>
                <div className="flex flex-col xs:flex-row gap-2 justify-end">
                  <Button
                    type="button"
                    className="bg-white border-blue-600 border-[1px] text-blue-600 hover:bg-blue-700 hover:text-white"
                  >
                    <Plus className="h-4 w-4" /> Agregar valor
                  </Button>
                  <Button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4" />
                    Guardar Nuevo Atributo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardContent className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Talla</h4>
                <Button className="bg-red-700 hover:bg-red-800" size="icon">
                  <X size={16} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary" className="text-sm py-1 px-2">
                  xl
                  <button className="ml-2 text-red-500">
                    <X size={12} />
                  </button>
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un valor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s">s</SelectItem>
                  </SelectContent>
                </Select>
                <div className="col-span-2 flex flex-col xs:flex-row gap-6">
                  <Input placeholder="Valor personalizado" />
                  <Button
                    type="button"
                    className="bg-white border-blue-600 border-[1px] text-blue-600 hover:bg-blue-700 hover:text-white"
                  >
                    <Plus className="h-4 w-4" /> Agregar valor personalizado
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex justify-center col-span-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex text-center justify-center items-center text-lg p-6">
            <Shuffle />
            Generar combinaciones de variantes
          </Button>
        </div>
        <div className="overflow-x-auto justify-center col-span-2 flex items-center">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Color</TableHead>
                <TableHead>Talla</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>SKU</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Rojo</TableCell>
                <TableCell>XL</TableCell>
                <TableCell>
                  <Input type="number" className="w-20" />
                </TableCell>
                <TableCell>
                  <Input type="number" className="w-24" />
                </TableCell>
                <TableCell>
                  <Input className="w-32" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="w-full flex justify-end col-span-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex text-center justify-center items-center text-lg p-6">
            <Box />
            Guardar Producto
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
