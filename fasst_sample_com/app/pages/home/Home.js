import React from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import { QHome } from '../../_graphql/queries';

const DivFullPage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Home = () => (
  <QHome>
    {({ message }) => (
      <DivFullPage>
        <div>
          <img src="/image/logo-fasst.png" alt="FASST" width="300px" />
          <Divider />
          <h3>{message}</h3>
        </div>
      </DivFullPage>
    )}
  </QHome>
);


export default Home;
