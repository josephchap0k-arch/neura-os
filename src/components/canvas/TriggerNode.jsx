import React from 'react';
import FlowNode from './FlowNode';

function TriggerNode(props) {
  return <FlowNode {...props} kind="trigger" icon="TR" />;
}

export default TriggerNode;
