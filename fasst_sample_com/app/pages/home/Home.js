import React from 'react';
import styled from 'styled-components';
import { ListeTortues } from './ListeTortues';

const DivFullPage = styled.div`
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  table.center {
    margin-left:auto; 
    margin-right:auto;
  }
  table {
    background: #f5e8d0;
    border-spacing: 0;
   }
   th {
    background: #496791;
    color: #fff;
   }
   td, th {
    padding: 5px 10px;
   }
`;



const Home = () => {

  return (
    <DivFullPage>
      <ListeTortues/>
    </DivFullPage>
  );
};

export default Home;
