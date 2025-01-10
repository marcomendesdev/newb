import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users2, MapPin, NotepadText } from "lucide-react";
import Link from "next/link";

interface TableCardProps {
  id: string;
  name: string;
  capacity: number;
  location: string;
}

export default function TableCard({
  id = "1",
  name = "Table 12",
  capacity = 4,
  location = "Main Dining Area",
  
}: TableCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Ref: {name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users2 className="h-4 w-4" />
          <span>Capacity: {capacity} people</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <NotepadText className="min-w-4" />
          <span>
            Description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            veritatis aut necessitatibus culpa incidunt quasi!
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/tables/${id}`} >
        <Button className="w-full" >
          Book this table
        </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
