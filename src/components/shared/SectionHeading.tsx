interface SectionHeadingProps {
  title: string;
  description?: string;
}

export default function SectionHeading({
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold">{title}</h2>

      {description && (
        <p className="mt-2 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}