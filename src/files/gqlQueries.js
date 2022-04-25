import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const gqlFunctions = {
  async getProducts(cat) {
    let q =
      `{
        category(input:{title:"` +
      cat +
      `"}){
            products{
                id
                name
                brand
                gallery
            attributes {
              id
              name
              type
              items {
                  id
                  displayValue
                  value
                }
            }
            inStock
            prices{
                currency{
                    symbol
                    label
                }
                amount
            }
        }
    }
}`;

    return await client
      .query({
        query: gql(q),
      })
      .then((result) => {
        return result.data.category.products;
      });
  },

  async getCategories() {
    let q = `{
        categories {
          name
        }
      } 
      `;
    return await client
      .query({
        query: gql(q),
      })
      .then((result) => {
        return result.data.categories;
      });
  },

  async getCurrency() {
    let q = `{
        currencies {
          label
          symbol
        }
      } 
      `;
    return await client
      .query({
        query: gql(q),
      })
      .then((result) => {
        return result.data.currencies;
      });
  },

  async getProduct(id){
    let q =
    `{
    product(id: "` +
    id +
    `") {
      id
      name
      brand
      gallery
      inStock
      description
      category
      prices {
        currency {
          symbol
          label
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
  `;
  return await client
      .query({
        query: gql(q),
      })
      .then((result) => {
        return result.data.product;
      });

  }
};

export default gqlFunctions;
