import React from 'react';
import FlowNode from './FlowNode';

function SlackNode(props) {
  return <FlowNode {...props} kind="slack" icon="SL" />;
}

export default SlackNode;
