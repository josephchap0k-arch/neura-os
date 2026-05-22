import React from 'react';
import FlowNode from './FlowNode';

function ConditionNode(props) {
  return <FlowNode {...props} kind="condition" icon="IF" />;
}

export default ConditionNode;
