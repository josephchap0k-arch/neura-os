import React from 'react';
import FlowNode from './FlowNode';

function ServiceNode(props) {
  return <FlowNode {...props} kind="service" icon="SV" />;
}

export default ServiceNode;
