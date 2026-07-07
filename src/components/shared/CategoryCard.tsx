import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
}

export default function CategoryCard({
  name,
}: CategoryCardProps) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        {name}
      </CardContent>
    </Card>
  );
}