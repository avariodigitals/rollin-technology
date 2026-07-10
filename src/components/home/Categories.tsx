import Container from "@/components/shared/Container";
import CategoryCard from "@/components/commerce/CategoryCard";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_PRODUCT_CATEGORIES } from "@/lib/queries";
import type { ProductCategory } from "@/types/product";


export default async function Categories() {
  const data = await fetchGraphQL(
    GET_PRODUCT_CATEGORIES
  );

  const categories =
    (data?.productCategories?.nodes ??
      []) as ProductCategory[];

  const cleanedCategories = Array.from(
    categories.reduce(
      (map, category) => {
        const count = category.count ?? 0;

        if (count === 0) {
          return map;
        }

        const existing = map.get(category.name);

        if (
          !existing ||
          count > (existing.count ?? 0)
        ) {
          map.set(category.name, category);
        }

        return map;
      },
      new Map<string, ProductCategory>()
    ).values()
  )
    .sort(
      (a, b) =>
        (b.count ?? 0) -
        (a.count ?? 0)
    )
    .slice(0, 12);

  return (
    <section className="bg-gray-50 py-16">
      <Container>
        <div className="mb-8">
  <p className="text-xs font-semibold tracking-wide text-primary uppercase">
    Shop by Category
  </p>
  <h2 className="mt-2 text-3xl font-bold">
    What are you buying today?
  </h2>
</div>
 

        {cleanedCategories.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No categories available.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cleanedCategories.map(
              (category) => (
                <CategoryCard
                  key={category.databaseId}
                  name={category.name}
                  slug={category.slug}
                  count={category.count ?? 0}
                  image={category.image?.sourceUrl ?? null}
                />
              )
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
