import React from 'react';
import styled from 'styled-components';
import { QTortles } from '../../_graphql/queries';
import CreateTortleForm from './CreateTortleForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const ListeTortues = props => {

  const key = props.key;

  return (
    <div>
      <h1>TOUTES LES TORTUES</h1>
      <CreateTortleForm createTortue={props.createTortue} />
      <table className="center">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Age</th>
            <th>Taille</th>
            <th>Terrestre/Aquatique</th>
            <th>Espèce</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <QTortles args={{ key }}>
            {(tortues) =>
              tortues.map((tortue) =>
                <tr key={tortue._id}>
                  <td>{tortue.name}</td>
                  <td>{tortue.age}</td>
                  <td>{tortue.taille}</td>
                  <td>{tortue.terrestre ? 'Terrestre' : 'Aquatique'}</td>
                  <td>{tortue.species}</td>
                  <td>
                    <CreateTortleForm createTortue={props.createTortue} updateTortue={props.updateTortue} tortue={tortue}/> &nbsp; &nbsp;
                    <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: 'pointer' }} className="float-right" onClick={() => props.deleteTurtle(tortue._id)}/>
                  </td>
                </tr>
              )
            }
          </QTortles>
        </tbody>
      </table>
    </div>
  );
};
  