import React from 'react';
import styled from 'styled-components';
import { QTortles } from '../../_graphql/queries';
import CreateTortleForm from './CreateTortleForm';
import { useTortues } from './useTortues';

export const ListeTortues = props => {
    
  const { createTortue, key } = useTortues();

  return (
    <div>
      <h1>TOUTES LES TORTUES</h1>
      <CreateTortleForm createTortue={createTortue} />
      <table className="center">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Age</th>
            <th>Taille</th>
            <th>Terrestre/Aquatique</th>
            <th>Espèce</th>
          </tr>
        </thead>
        <tbody>
          <QTortles args={{ key }}>
            {(tortues) =>
              tortues.map(({ _id, name, age, taille, terrestre, species }) =>
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{age}</td>
                  <td>{taille}</td>
                  <td>{terrestre ? 'Terrestre' : 'Aquatique'}</td>
                  <td>{species}</td>
                </tr>
              )
            }
          </QTortles>
        </tbody>
      </table>
    </div>
  );
};
  