import React from 'react';
import FlowNode from './FlowNode';

function DriveNode(props) {
  return <FlowNode {...props} kind="drive" icon="DR" />;
}

export default DriveNode;
