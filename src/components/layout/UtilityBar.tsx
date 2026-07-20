import Container from "@/components/shared/Container";
import Link from "next/link";
import { MapPin, ShoppingBag, User } from "lucide-react";

export default function UtilityBar() {
  return (
   
    <div className="border-b border-gray-100 bg-white">
      <Container>
      
        <div className="flex h-8 items-center justify-end gap-5 text-xs text-gray-500">
          
          <Link href="/store-locator" className="flex items-center gap-1 hover:text-primary transition-colors">
            <MapPin className="h-3 w-3 opacity-70" />
            <span>Store Locator</span>
          </Link>
          
          <div className="h-2.5 w-[1px] bg-gray-200" /> {/* Delicate separator */}

          <Link href="/shop" className="flex items-center gap-1 hover:text-primary transition-colors">
            <ShoppingBag className="h-3 w-3 opacity-70" />
            <span>Shop</span>
          </Link>

          <div className="h-2.5 w-[1px] bg-gray-200" /> {/* Delicate separator */}

          <Link href="/account" className="flex items-center gap-1 hover:text-primary transition-colors">
            <User className="h-3 w-3 opacity-70" />
            <span>My Account</span>
          </Link>

        </div>
      </Container>
    </div>
  );
}

