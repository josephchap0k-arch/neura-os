import React from 'react';
import FlowNode from './FlowNode';

function AgentNode(props) {
  return <FlowNode {...props} kind="agent" icon="AI" />;
}

export default AgentNode;
