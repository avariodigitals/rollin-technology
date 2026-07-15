
export const GET_FEATURED_PRODUCTS = `
{
  products(first: 8) {
    nodes {
      databaseId
      name
      slug
      featured
      image {
        sourceUrl
        mediaItemUrl
      }
      featuredImage {
        node {
          sourceUrl
          mediaItemUrl
        }
      }
      productCategories {
        nodes {
          name
          slug
        }
      }
      productTags {
        nodes {
          name
          slug
        }
      }
      productBrands {
        nodes {
          name
          slug
        }
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        onSale
      }
    }
  }
}
`;

export const GET_NEW_ARRIVALS = `
{
  products(first: 12, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      databaseId
      name
      slug
      featured
      date
      image {
        sourceUrl
        mediaItemUrl
      }
      featuredImage {
        node {
          sourceUrl
          mediaItemUrl
        }
      }
      productCategories {
        nodes {
          name
          slug
        }
      }
      productTags {
        nodes {
          name
          slug
        }
      }
      productBrands {
        nodes {
          name
          slug
        }
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        onSale
      }
    }
  }
}
`;

export const GET_PRODUCT_BY_SLUG = `
query GetProductBySlug($slug: ID!) {
  product(id: $slug, idType: SLUG) {
    databaseId
    name
    slug
    featured
    image {
      sourceUrl
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
    productCategories {
      nodes {
        name
        slug
      }
    }
    productTags {
      nodes {
        name
        slug
      }
    }
    productBrands {
      nodes {
        name
        slug
      }
    }
    ... on SimpleProduct {
      price
      regularPrice
      salePrice
      onSale
      description
      shortDescription
      stockStatus
      averageRating
      reviewCount
      galleryImages {
        nodes {
          sourceUrl
          mediaItemUrl
        }
      }
      attributes {
        nodes {
          name
          options
        }
      }
    }
  }
}
`;

export const GET_PRODUCT_REVIEWS = `
query GetProductReviews($slug: ID!) {
  product(id: $slug, idType: SLUG) {
    ... on SimpleProduct {
      reviews {
        nodes {
          id
          rating
          content
          date
          reviewer {
            name
            email
          }
        }
      }
    }
  }
}
`;

export const WRITE_REVIEW_MUTATION = `
mutation WriteReview($input: WriteReviewInput!) {
  writeReview(input: $input) {
    rating
    review {
      id
      rating
      content
      date
      reviewer {
        name
        email
      }
    }
  }
}
`;

export const GET_PRODUCT_CATEGORIES = `
{
  productCategories(first: 100) {
    nodes {
      databaseId
      name
      slug
      count
      parentId
      image {
        sourceUrl
      }
    }
  }
}
`;


export const LOGIN_MUTATION = `
mutation Login($username: String!, $password: String!) {
  login(input: { username: $username, password: $password }) {
    authToken
    refreshToken
    user {
      id
      email
      firstName
      lastName
    }
  }
}
`;
 

export const REGISTER_CUSTOMER_MUTATION = `
mutation RegisterCustomer($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  registerCustomer(input: {
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
  }) {
    customer {
      id
    }
  }
}
`;
 

export const GET_CUSTOMER_STATS = `
{
  customer {
    id
    orderCount
    totalSpent
  }
}
`;
 export const GET_CUSTOMER_ADDRESSES = `
{
  customer {
    id
    billing { address1 city state phone }
    shipping { address1 city state phone }
  }
}
`;


export const GET_CUSTOMER_ORDERS = `
{
  customer {
    orders(first: 20) {
      nodes {
        id
        databaseId
        status
        date
        total
        lineItems {
          nodes {
            product { node { name } }
            quantity
            total
          }
        }
      }
    }
  }
}
`;

export const GET_BLOG_POSTS = `
query GetBlogPosts($first: Int!, $after: String) {
  posts(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
}
`;

export const GET_BLOG_POST_BY_SLUG = `
query GetBlogPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    id
    title
    slug
    date
    modified
    content
    featuredImage {
      node {
        sourceUrl
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
  }
}
`;

export const GET_SHOP_PRODUCTS = `
query GetShopProducts(
  $first: Int!
  $after: String
  $categoryIn: [String]
  $productBrandIn: [String]
  $minPrice: Float
  $maxPrice: Float
  $stockStatus: [StockStatusEnum]
  $search: String
) {
  products(
    first: $first
    after: $after
    where: {
     categoryIn: $categoryIn
  productBrandIn: $productBrandIn
  minPrice: $minPrice
  maxPrice: $maxPrice
  stockStatus: $stockStatus
  search: $search
    }
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      databaseId
      name
      slug
      featured
      image {
        sourceUrl
        mediaItemUrl
      }
      featuredImage {
        node {
          sourceUrl
          mediaItemUrl
        }
      }
      productCategories {
        nodes {
          name
          slug
        }
      }
      productTags {
        nodes {
          name
          slug
        }
      }
      productBrands {
        nodes {
          name
          slug
        }
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        onSale
        stockStatus
      }
    }
  }
}
`;
export const GET_SEARCH_SUGGESTIONS = `
query GetSearchSuggestions($search: String!, $first: Int!) {
  products(first: $first, where: { search: $search }) {
    nodes {
      databaseId
      name
      slug
      image {
        sourceUrl
        mediaItemUrl
      }
      featuredImage {
        node {
          sourceUrl
          mediaItemUrl
        }
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        onSale
        stockStatus
      }
      productCategories {
        nodes {
          name
          slug
        }
      }
      productBrands {
        nodes {
          name
          slug
        }
      }
    }
  }
  productCategories(where: { search: $search, hideEmpty: true }, first: 4) {
    nodes {
      databaseId
      name
      slug
      count
      parentId
      image {
        sourceUrl
      }
    }
  }
}
`;

export const GET_PRODUCT_BRANDS = `
{
  productBrands(first: 50) {
    nodes {
      name
      slug
      count
    }
  }
}
`;