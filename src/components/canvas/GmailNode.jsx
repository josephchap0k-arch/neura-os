import React from 'react';
import FlowNode from './FlowNode';

function GmailNode(props) {
  return <FlowNode {...props} kind="gmail" icon="GM" />;
}

export default GmailNode;
