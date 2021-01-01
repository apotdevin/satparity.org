import { FC } from 'react';
import { Table } from 'src/components/table';
import { useGetLatestQuery } from 'src/graphql/__generated__/getLatest.generated';
import styled from 'styled-components';
import numeral from 'numeral';

const S = {
  wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  title: styled.h1``,
  table: styled.div`
    max-width: 100%;
  `,
};

const getFormat = (decimals: number) => {
  switch (decimals) {
    case 0:
      return '0,0';
    case 1:
      return '0,0.0';
    case 2:
    default:
      return '0,0.00';
  }
};

const Index: FC = () => {
  const { data, error } = useGetLatestQuery();

  if (error) {
    return (
      <S.wrapper>
        <S.title>SatParity</S.title>
        <S.table>Error getting rates.</S.table>
      </S.wrapper>
    );
  }

  const columns = [
    { Header: 'Currency', accessor: 'name' },
    { Header: 'Parity', accessor: 'parity' },
    { Header: 'BTC Price', accessor: 'price' },
    { Header: 'Sat to Fiat', accessor: 'sat' },
    { Header: 'Fiat to Sat', accessor: 'fiat' },
  ];

  const finalData = data?.getLatest || [];
  const tableData = finalData.map(s => {
    const parity = `${
      Math.round((Number(s.rates.fiatSat) || 0) * 10000) / 100
    }%`;

    const price = numeral(Number(s.rates.fiatBtc) || 0).format(
      getFormat(s.info?.decimal_digits ?? 2)
    );

    return {
      name: s.info?.name ? `${s.info.name} (${s.currency})` : s.currency,
      parity,
      price,
      sat: numeral(Number(s.rates.fiatSat) || 0).format(
        getFormat(s.info?.decimal_digits ?? 2)
      ),
      fiat: numeral(Number(s.rates.satFiat) || 0).format(
        getFormat(s.info?.decimal_digits ?? 2)
      ),
    };
  });

  return (
    <S.wrapper>
      <S.title>SatParity</S.title>
      <S.table>
        <Table
          tableColumns={columns}
          tableData={tableData}
          filterPlaceholder={'currencies'}
          withBorder={true}
        />
      </S.table>
    </S.wrapper>
  );
};

export default Index;
