import React from 'react';
import styled from 'styled-components';
import { QTortles } from '../../_graphql/queries';
import CreateTortleForm from './CreateTortleForm';
import { SampleForm } from './SampleForm';

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



const Home = () => (

  <QTortles>
    {(tortues) => {
      const listTortles = tortues.map((tortue) =>
        <tr key={tortue._id}>
          <td>{tortue.name}</td>
          <td>{tortue.age}</td>
          <td>{tortue.taille}</td>
          <td>{tortue.terrestre ? 'Terrestre' : 'Aquatique'}</td>
          <td>{tortue.species}</td>
        </tr>
      );
      return (
        <DivFullPage>
          <h1>TOUS LES TORTUES</h1>
          <SampleForm/>
          <CreateTortleForm/>
          <table className="center">
            <thead>
              <tr>
                <th>Nom</th><th>Age</th><th>Taille</th><th>Terrestre/Aquatique</th><th>Espèce</th>
              </tr>
            </thead>
            <tbody>
              {listTortles}
            </tbody>
          </table>
        </DivFullPage>
      );
    }
    }
  </QTortles>
);

export default Home;
