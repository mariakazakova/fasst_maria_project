/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type QAddTortleMutationVariables = {|
  name: string,
  age?: ?string,
  taille?: ?string,
  terrestre?: ?boolean,
  species?: ?string,
|};
export type QAddTortleMutationResponse = {|
  +createOneTortle: ?{|
    +tortue: ?{|
      +_id: ?string,
      +name: ?string,
      +age: ?string,
      +taille: ?string,
      +terrestre: ?boolean,
      +species: ?string,
    |}
  |}
|};
export type QAddTortleMutation = {|
  variables: QAddTortleMutationVariables,
  response: QAddTortleMutationResponse,
|};
*/


/*
mutation QAddTortleMutation(
  $name: String!
  $age: String
  $taille: String
  $terrestre: Boolean
  $species: String
) {
  createOneTortle(name: $name, age: $age, taille: $taille, terrestre: $terrestre, species: $species) {
    tortue {
      _id
      name
      age
      taille
      terrestre
      species
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "age",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "taille",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "terrestre",
    "type": "Boolean"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "species",
    "type": "String"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "age",
        "variableName": "age"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      },
      {
        "kind": "Variable",
        "name": "species",
        "variableName": "species"
      },
      {
        "kind": "Variable",
        "name": "taille",
        "variableName": "taille"
      },
      {
        "kind": "Variable",
        "name": "terrestre",
        "variableName": "terrestre"
      }
    ],
    "concreteType": "CreateOneTortleMutationResponse",
    "kind": "LinkedField",
    "name": "createOneTortle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Tortue",
        "kind": "LinkedField",
        "name": "tortue",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "_id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "age",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "taille",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "terrestre",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "species",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QAddTortleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QAddTortleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "QAddTortleMutation",
    "operationKind": "mutation",
    "text": "mutation QAddTortleMutation(\n  $name: String!\n  $age: String\n  $taille: String\n  $terrestre: Boolean\n  $species: String\n) {\n  createOneTortle(name: $name, age: $age, taille: $taille, terrestre: $terrestre, species: $species) {\n    tortue {\n      _id\n      name\n      age\n      taille\n      terrestre\n      species\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd105957798348b8e7d97a3e3e370b487';

module.exports = node;
