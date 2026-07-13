import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import NavLinks from "./NavLinks";
import { Headphones, Mail } from "lucide-react";

interface MainNavProps {
  categories: { name: string; slug: string }[];
}

export default function MainNav({ categories }: MainNavProps) {
  return (
    <div className="bg-white border-b border-gray-100">
      <Container>
        <div className="flex h-[100px] items-center justify-between gap-8">

          {/* Logo Container mapped exactly to Figma bounds */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Rollin Technologies home">
            <Image
              src="https://central.rollin.ng/wp-content/uploads/2026/07/thelogorollin.png"
              alt="Rollin Technologies"
              width={280}
              height={80}
              priority
              className="h-[72px] w-auto bg-transparent object-contain"
            />
          </Link>

          {/* Clean Core Navigation Links */}
          <NavLinks categories={categories} />

         
          <div className="hidden md:flex items-center gap-3 text-left">
            <div className="rounded-full border-2 border-primary/20 p-3 text-primary flex items-center justify-center">
  <Headphones className="h-4 w-4 stroke-[2.5]" />
</div>

            <div>
              <div className="text-sm font-bold tracking-wide text-gray-900">
                +234 814 846 4823
              </div>

              <div className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span>sales@rollin.ng</span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}