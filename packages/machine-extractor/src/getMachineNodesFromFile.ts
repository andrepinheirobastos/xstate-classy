import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import { ALLOWED_EXPRESSION_NAMES } from './machineMethodExpression';

export const getMachineNodesFromFile = (fileContent: string) => {
  const file = parse(fileContent, {
    sourceType: 'module',
    plugins: [
      'typescript',
      'decorators-legacy',
      'classPrivateMethods',
      'classPrivateProperties',
      'classProperties',
      'objectRestSpread',
      'optionalChaining',
      'throwExpressions',
    ],
    // required by recast
    tokens: false,
  });

  const machineNodes: Array<t.CallExpression | t.ClassMethod> = [];

  traverse(file, {
    ClassMethod(path) {
      const node = path.node;
      if (
        node.key.type === 'Identifier' &&
        ALLOWED_EXPRESSION_NAMES.includes(node.key.name)
      ) {
        machineNodes.push(node);
      }
    },
    CallExpression(path) {
      const node = path.node;
      if (
        t.isMemberExpression(node.callee) &&
        t.isIdentifier(node.callee.property) &&
        ALLOWED_EXPRESSION_NAMES.includes(node.callee.property.name)
      ) {
        machineNodes.push(node);
      }

      if (
        t.isIdentifier(node.callee) &&
        ALLOWED_EXPRESSION_NAMES.includes(node.callee.name)
      ) {
        machineNodes.push(node);
      }
    },
  });

  return {
    file,
    machineNodes,
  };
};
