import React from 'react';
import FlowNode from './FlowNode';

function DelayNode(props) {
  return <FlowNode {...props} kind="delay" icon="DL" />;
}

export default DelayNode;
