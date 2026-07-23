// src/components/home/Categories.tsx
import Container from "@/components/shared/Container";
import CategoryCard from "@/components/commerce/CategoryCard";
import { getCategories } from "@/lib/data/categories";
import type { ProductCategory } from "@/types/product";

const HOMEPAGE_CATEGORY_ORDER = [
  "laptops",
  "desktops",
  "printers",
  "monitors",
  "networking",
  "servers",
  "solar-products",
  "gaming",
  "accessories",
  "security-and-surveillance",
  "projectors",
  "ups-and-power-backup",
];

function getCategoryOrderIndex(slug: string): number {
  const index = HOMEPAGE_CATEGORY_ORDER.indexOf(slug);
  return index === -1 ? 9999 : index;
}

function isParentCategory(category: ProductCategory): boolean {
  return category.parentId === null || category.parentId === 0 || category.parentId === undefined;
}

export default async function Categories() {
  const categories = await getCategories().catch(() => []);

  const cleanedCategories = Array.from(
    categories.reduce((map, category) => {
      const count = category.count ?? 0;
      if (count === 0 || !isParentCategory(category)) return map;

      const existing = map.get(category.name);
      if (!existing || count > (existing.count ?? 0)) {
        map.set(category.name, category);
      }
      return map;
    }, new Map<string, ProductCategory>()).values()
  )
    .sort((a, b) => {
      const orderA = getCategoryOrderIndex(a.slug);
      const orderB = getCategoryOrderIndex(b.slug);
      if (orderA !== orderB) return orderA - orderB;
      return (b.count ?? 0) - (a.count ?? 0);
    })
    .slice(0, 12);

  return (
    <section className="bg-gray-50 py-16">
      <Container>
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Shop by Category
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground">
            What are you buying today?
          </h2>
        </div>

        {cleanedCategories.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No categories available.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cleanedCategories.map((category) => (
              <CategoryCard
                key={category.databaseId ?? category.slug}
                name={category.name}
                slug={category.slug}
                count={category.count ?? 0}
                image={typeof category.image === "string" ? category.image : category.image?.sourceUrl ?? null}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}