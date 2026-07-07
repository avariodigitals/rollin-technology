// TARGET PATH IN REPO: src/components/shared/ComingSoonPage.tsx (new)
import Container from "@/components/shared/Container"

interface ComingSoonPageProps {
  title: string
  description?: string
}


export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <Container>
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {description ?? "This page is coming soon. Check back shortly."}
        </p>
      </div>
    </Container>
  )
}