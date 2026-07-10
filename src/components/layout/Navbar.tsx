
import UtilityBar from "./UtilityBar";
import MainNav from "./MainNav";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_PRODUCT_CATEGORIES } from "@/lib/queries";
import type { ProductCategory } from "@/types/product";


export default async function Navbar() {
  const data = await fetchGraphQL(GET_PRODUCT_CATEGORIES).catch(() => null);
  const categories = ((data?.productCategories?.nodes ?? []) as ProductCategory[])
    .filter((c) => (c.count ?? 0) > 0)
    .map((c) => ({ name: c.name, slug: c.slug }));

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="hidden lg:block">
        <UtilityBar />
        <MainNav />
        <SearchBar categories={categories} />
      </div>

      <div className="lg:hidden">
        <MobileMenu />
      </div>
    </header>
  );
}