import Image from "next/image";
import Container from "@/components/shared/Container";
import NavLinks from "./NavLinks";
import { Headphones, Mail } from "lucide-react";

export default function MainNav() {
  return (
    <div className="bg-white border-b border-gray-100">
      <Container>
        <div className="flex h-[74px] items-center justify-between gap-8">
          
          {/* Logo Container mapped exactly to Figma bounds */}
          <div className="flex items-center shrink-0">
            <Image
              src="/logo.svg"
              alt="Rollin Technologies"
              width={140}
              height={40}
              priority
              className="h-auto w-auto max-h-[44px]"
            />
          </div>

          {/* Clean Core Navigation Links */}
          <NavLinks />

         
          <div className="hidden md:flex items-center gap-3 text-left">
            <div className="rounded-full border-2 border-primary/20 p-3 text-primary flex items-center justify-center">
  <Headphones className="h-4 w-4 stroke-[2.5]" />
</div>

            <div>
              <div className="text-xs font-bold tracking-wide text-gray-900">
                +234 814 846 4823
              </div>

              <div className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span>sales@rollin.ng</span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}