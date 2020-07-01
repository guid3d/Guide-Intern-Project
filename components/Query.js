import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
    uri: `https://asia-east2-jitta-api.cloudfunctions.net/graphqlDev`
  });
  
  const StockByRanking = gql`
    query stocklist($page: Int!, $market: String!, $sectors: [String]) {
      jittaRanking(filter: { market: $market, page: $page, sectors: $sectors }) {
        count
        data {
          id
          stockId
          rank
          symbol
          exchange
          title
          jittaScore
          nativeName
          sector {
            id
            name
          }
          industry
        }
      }
    }
  `;

export {client, StockByRanking};