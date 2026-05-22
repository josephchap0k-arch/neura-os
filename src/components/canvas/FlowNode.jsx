import React from 'react';
import { Handle, Position } from '@xyflow/react';

function FlowNode({
  data,
  kind = 'default',
  icon = 'AI',
  sourcePosition = Position.Right,
  targetPosition = Position.Left,
}) {
  const runtimeState = data.runtimeState ?? 'idle';

  return (
    <div className={`neura-flow-node kind-${kind} state-${runtimeState}`}>
      <Handle className="neura-handle" type="target" position={targetPosition} />

      <div className="node-topline">
        <span className="node-icon">{icon}</span>
        <div className="node-heading">
          <strong>{data.title}</strong>
          <small>{data.subtitle}</small>
        </div>
      </div>

      {data.description ? <p className="node-summary">{data.description}</p> : null}

      <div
        className="node-accent"
        style={{ '--node-accent': data.accent ?? '#00E5FF' }}
      />

      <Handle className="neura-handle" type="source" position={sourcePosition} />
    </div>
  );
}

export default FlowNode;
