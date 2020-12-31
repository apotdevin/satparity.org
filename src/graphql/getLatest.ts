import { gql } from '@apollo/client';

export const GET_LATEST = gql`
  query GetLatest {
    getLatest {
      currency
      rates {
        fiatEur
        fiatBtc
        fiatSat
        satFiat
      }
      info {
        symbol
        name
        symbol_native
        decimal_digits
        rounding
        code
        name_plural
      }
    }
  }
`;
