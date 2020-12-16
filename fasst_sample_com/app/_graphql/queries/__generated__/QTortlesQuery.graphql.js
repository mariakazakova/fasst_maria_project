/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type QTortlesQueryVariables = {||};
export type QTortlesQueryResponse = {|
  +getTortues: ?$ReadOnlyArray<?{|
    +_id: ?string,
    +name: ?string,
    +age: ?string,
    +taille: ?string,
    +terrestre: ?boolean,
    +species: ?string,
  |}>
|};
export type QTortlesQuery = {|
  variables: QTortlesQueryVariables,
  response: QTortlesQueryResponse,
|};
*/


/*
query QTortlesQuery {
  getTortues {
    _id
    name
    age
    taille
    terrestre
    species
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Tortue",
    "kind": "LinkedField",
    "name": "getTortues",
    "plural": true,
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "QTortlesQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QTortlesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "QTortlesQuery",
    "operationKind": "query",
    "text": "query QTortlesQuery {\n  getTortues {\n    _id\n    name\n    age\n    taille\n    terrestre\n    species\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '95a110fee05f3418dcd42890c6d49fc8';

module.exports = node;
