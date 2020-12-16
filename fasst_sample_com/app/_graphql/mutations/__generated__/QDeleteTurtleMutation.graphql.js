/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type QDeleteTurtleMutationVariables = {|
  id?: ?string
|};
export type QDeleteTurtleMutationResponse = {|
  +deleteOneTortle: ?{|
    +ok: boolean
  |}
|};
export type QDeleteTurtleMutation = {|
  variables: QDeleteTurtleMutationVariables,
  response: QDeleteTurtleMutationResponse,
|};
*/


/*
mutation QDeleteTurtleMutation(
  $id: ID
) {
  deleteOneTortle(id: $id) {
    ok
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "DeleteTortleMutationResponse",
    "kind": "LinkedField",
    "name": "deleteOneTortle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
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
    "name": "QDeleteTurtleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QDeleteTurtleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "QDeleteTurtleMutation",
    "operationKind": "mutation",
    "text": "mutation QDeleteTurtleMutation(\n  $id: ID\n) {\n  deleteOneTortle(id: $id) {\n    ok\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6d0c6e92d71feef1d308f3ba617e9aa5';

module.exports = node;
