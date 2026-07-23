import UtilityBar from "./UtilityBar";
import MainNav from "./MainNav";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

import type { ProductCategory } from "@/types/product";
import { getNavbarCategories } from "@/lib/data/categories";

export default async function Navbar() {
  const rawCategories = await getNavbarCategories().catch(() => []);
  const categories = ((rawCategories ?? []) as ProductCategory[])
    .filter((c) => (c.count ?? 0) > 0)
    .map((c) => ({ name: c.name, slug: c.slug }));

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="hidden lg:block">
        <UtilityBar />
        <MainNav categories={categories} />
        <SearchBar categories={categories} />
      </div>

      <div className="lg:hidden">
        <MobileMenu categories={categories} />
      </div>
    </header>
  );
}