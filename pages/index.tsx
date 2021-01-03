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
  image: styled.img`
    border-radius: 50%;
    margin: 60px 0;
  `,
  dot: styled.div<{ dotColor: string }>`
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: ${({ dotColor }) => dotColor};
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

const getColor = (parity: number) => {
  switch (true) {
    case parity >= 100:
      return '#a0d911';
    case parity >= 80:
      return '#ffd300';
    case parity >= 60:
      return '#ffa940';
    case parity >= 40:
      return '#FD5F00';
    default:
      return 'red';
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
    { Header: '', accessor: 'dot' },
    { Header: 'Currency', accessor: 'name' },
    { Header: 'Parity', accessor: 'parity' },
    { Header: 'BTC Price', accessor: 'price' },
    { Header: 'Sat to Fiat', accessor: 'sat' },
    { Header: 'Fiat to Sat', accessor: 'fiat' },
    { Header: 'Parity BTC Price (EUR)', accessor: 'priceForParity' },
  ];

  const btcEurRate = Number(data?.getLatest.btcEurRate) || 0;
  const finalData = data?.getLatest.currencies || [];
  const tableData = finalData.map(s => {
    const parityNumber =
      Math.round((Number(s.rates.fiatSat) || 0) * 10000) / 100;
    const priceNumber = Number(s.rates.fiatBtc) || 0;

    const parity = `${parityNumber}%`;
    const price = numeral(priceNumber).format(
      getFormat(s.info?.decimal_digits ?? 2)
    );

    const priceForParityNumber = (1 / parityNumber) * btcEurRate * 100;
    const priceForParity = numeral(priceForParityNumber).format(getFormat(2));

    return {
      dot: <S.dot dotColor={getColor(parityNumber)} />,
      name: s.info?.name ? `${s.info.name} (${s.currency})` : s.currency,
      parity,
      price,
      priceForParity,
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
      <S.title>Satoshi - Fiat - Parity</S.title>
      <S.table>
        <Table
          tableColumns={columns}
          tableData={tableData}
          filterPlaceholder={'currencies'}
          withBorder={true}
        />
      </S.table>
      <S.image src={'/assets/parity.jpg'} alt={'bitcoin parity'} />
    </S.wrapper>
  );
};

export default Index;
