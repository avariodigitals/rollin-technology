
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

export const GET_PRODUCT_CATEGORIES = `
{
  productCategories(first: 100) {
    nodes {
      databaseId
      name
      slug
      count
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