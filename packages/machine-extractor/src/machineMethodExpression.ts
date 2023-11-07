import * as t from '@babel/types';
import { createParser } from './createParser';
import { StateNode } from './stateNode';
import { AnyTypeParameterList } from './typeParameters';
import { GetParserResult } from './utils';

export type TMachineMethodExpression = GetParserResult<
  typeof MachineMethodExpression
>;

export const ALLOWED_EXPRESSION_NAMES = [
  'getMachineConfig',
  'getMachine',
];

export const MachineMethodExpression = createParser({
  babelMatcher: t.isMethod,
  parseNode: (node, context) => {
    if (
      node.key.type === 'Identifier' &&
      node.body.type === 'BlockStatement' &&
      node.body.body[0].type === 'ReturnStatement' &&
      node.body.body[0].argument?.type === 'ObjectExpression'
    ) {
      return {
        callee: node.body,
        calleeName: node.key.name,
        definition: StateNode.parse(node.body.body[0].argument, context),
        options: undefined,
        isMemberExpression: false,
        typeArguments: AnyTypeParameterList.parse(node.typeParameters, context),
        node,
      };
    }
  },
});
