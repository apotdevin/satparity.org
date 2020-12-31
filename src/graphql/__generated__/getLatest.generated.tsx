/* eslint-disable */
import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetLatestQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetLatestQuery = (
  { __typename?: 'Query' }
  & { getLatest: Array<(
    { __typename?: 'CurrencyRate' }
    & Pick<Types.CurrencyRate, 'currency'>
    & { rates: (
      { __typename?: 'Rate' }
      & Pick<Types.Rate, 'fiatEur' | 'fiatBtc' | 'fiatSat' | 'satFiat'>
    ), info?: Types.Maybe<(
      { __typename?: 'Info' }
      & Pick<Types.Info, 'symbol' | 'name' | 'symbol_native' | 'decimal_digits' | 'rounding' | 'code' | 'name_plural'>
    )> }
  )> }
);


export const GetLatestDocument = gql`
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

/**
 * __useGetLatestQuery__
 *
 * To run a query within a React component, call `useGetLatestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLatestQuery(baseOptions?: Apollo.QueryHookOptions<GetLatestQuery, GetLatestQueryVariables>) {
        return Apollo.useQuery<GetLatestQuery, GetLatestQueryVariables>(GetLatestDocument, baseOptions);
      }
export function useGetLatestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLatestQuery, GetLatestQueryVariables>) {
          return Apollo.useLazyQuery<GetLatestQuery, GetLatestQueryVariables>(GetLatestDocument, baseOptions);
        }
export type GetLatestQueryHookResult = ReturnType<typeof useGetLatestQuery>;
export type GetLatestLazyQueryHookResult = ReturnType<typeof useGetLatestLazyQuery>;
export type GetLatestQueryResult = Apollo.QueryResult<GetLatestQuery, GetLatestQueryVariables>;