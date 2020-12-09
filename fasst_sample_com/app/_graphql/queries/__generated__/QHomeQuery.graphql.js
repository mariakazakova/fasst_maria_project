/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type QHomeQueryVariables = {||};
export type QHomeQueryResponse = {|
  +homepage: ?{|
    +id: ?string,
    +message: ?string,
  |}
|};
export type QHomeQuery = {|
  variables: QHomeQueryVariables,
  response: QHomeQueryResponse,
|};
*/


/*
query QHomeQuery {
  homepage {
    id
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Home",
    "kind": "LinkedField",
    "name": "homepage",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
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
    "name": "QHomeQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QHomeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "QHomeQuery",
    "operationKind": "query",
    "text": "query QHomeQuery {\n  homepage {\n    id\n    message\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'feed71691b426669ccdf525ab0f4a415';

module.exports = node;
