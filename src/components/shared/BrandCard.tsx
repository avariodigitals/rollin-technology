import { Card, CardContent } from "@/components/ui/card";

interface BrandCardProps {
  name: string;
}

export default function BrandCard({
  name,
}: BrandCardProps) {
  return (
    <Card>
      <CardContent className="p-6 text-center font-semibold">
        {name}
      </CardContent>
    </Card>
  );
}