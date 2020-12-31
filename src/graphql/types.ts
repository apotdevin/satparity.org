/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['Boolean']>;
  getLatest: Array<CurrencyRate>;
};

export type CurrencyRate = {
  __typename?: 'CurrencyRate';
  currency: Scalars['String'];
  rates: Rate;
  info?: Maybe<Info>;
};

export type Rate = {
  __typename?: 'Rate';
  fiatEur: Scalars['String'];
  fiatBtc: Scalars['String'];
  fiatSat: Scalars['String'];
  satFiat: Scalars['String'];
};

export type Info = {
  __typename?: 'Info';
  symbol?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  symbol_native?: Maybe<Scalars['String']>;
  decimal_digits?: Maybe<Scalars['Float']>;
  rounding?: Maybe<Scalars['Float']>;
  code?: Maybe<Scalars['String']>;
  name_plural?: Maybe<Scalars['String']>;
};
