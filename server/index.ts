import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server-micro';
import { GraphQLError } from 'graphql';
import getConfig from 'next/config';
import sortBy from 'lodash.sortby';
import { currencyInfo } from './currencyInfo';

const { serverRuntimeConfig } = getConfig();
const { fiatApiKey } = serverRuntimeConfig;

const typeDefs = gql`
  type Query {
    hello: Boolean
    getLatest: [CurrencyRate!]!
  }

  type CurrencyRate {
    currency: String!
    rates: Rate!
    info: Info
  }

  type Rate {
    fiatEur: String!
    fiatBtc: String!
    fiatSat: String!
    satFiat: String!
  }

  type Info {
    symbol: String
    name: String
    symbol_native: String
    decimal_digits: Float
    rounding: Float
    code: String
    name_plural: String
  }
`;

type CurrencyRate = {
  currency: string;
  rates: Rate;
};

type Rate = {
  fiatEur: number;
  fiatBtc: number;
  fiatSat: number;
  satFiat: number;
};

const FiatApi = {
  getFiatRates: async () => {
    try {
      const response = await fetch(
        `http://data.fixer.io/api/latest?access_key=${fiatApiKey}`
      );
      return await response.json();
    } catch (error) {
      console.log(`Error getting fiat rates: ${JSON.stringify(error)}`);
      throw new GraphQLError('ErrorGettingFiatRates');
    }
  },
  getBtcRates: async () => {
    try {
      const response = await fetch(
        'https://api.blockchain.com/v3/exchange/tickers/BTC-EUR'
      );
      return await response.json();
    } catch (error) {
      console.log(`Error getting btc rates: ${JSON.stringify(error)}`);
      throw new GraphQLError('ErrorGettingBtcRates');
    }
  },
};

const resolvers = {
  Query: {
    hello: async () => {
      return true;
    },
    getLatest: async () => {
      if (!fiatApiKey) {
        console.log(`No api key`);
        throw new GraphQLError('NoApiKey');
      }

      const fiatRates = await FiatApi.getFiatRates();
      const btcRates = await FiatApi.getBtcRates();

      const btcEurRate = btcRates?.last_trade_price || 0;

      const satEurRate = btcEurRate / 100000000;

      const allRates = fiatRates?.rates || {};
      const keys = Object.keys(allRates);

      const enriched = keys.reduce<CurrencyRate[]>((prev, k) => {
        const eurRate = allRates[k];
        const info = currencyInfo[k];

        if (!eurRate || k === 'BTC') {
          return prev;
        }

        const rates = {
          fiatEur: eurRate,
          fiatBtc: btcEurRate * eurRate,
          fiatSat: satEurRate * eurRate,
          satFiat: 1 / (satEurRate * eurRate),
        };

        const newArray = [...prev, { currency: k, rates, info }];

        return newArray;
      }, []);

      return sortBy(enriched, 'rates.satFiat');
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
