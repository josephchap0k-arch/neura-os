import React, { useMemo } from 'react';
import { Background, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCodex } from '../../state/codexState';
import AgentNode from './AgentNode';
import ConditionNode from './ConditionNode';
import DelayNode from './DelayNode';
import DriveNode from './DriveNode';
import FlowEdge from './FlowEdge';
import GmailNode from './GmailNode';
import ServiceNode from './ServiceNode';
import SlackNode from './SlackNode';
import TriggerNode from './TriggerNode';

const nodeTypes = {
  trigger: TriggerNode,
  agent: AgentNode,
  gmail: GmailNode,
  slack: SlackNode,
  delay: DelayNode,
  condition: ConditionNode,
  drive: DriveNode,
  service: ServiceNode,
};

const edgeTypes = {
  neura: FlowEdge,
};

function CanvasBody() {
  const { state } = useCodex();

  const simplifiedGraph = useMemo(() => {
    const triggerNode = state.canvas.nodes[0];
    const agentNode = state.canvas.nodes.find((node) => node.type === 'agent');
    const actionNode = state.canvas.nodes[state.canvas.nodes.length - 1];

    const nodes = [
      triggerNode && {
        ...triggerNode,
        position: { x: 72, y: 110 },
        draggable: false,
      },
      agentNode && {
        ...agentNode,
        position: { x: 326, y: 110 },
        draggable: false,
      },
      actionNode && {
        ...actionNode,
        position: { x: 580, y: 110 },
        draggable: false,
      },
    ].filter(Boolean);

    const edges = [
      {
        id: 'simple-edge-1',
        source: triggerNode?.id ?? 'trigger-node',
        target: agentNode?.id ?? 'agent-node',
        type: 'neura',
        animated: true,
      },
      {
        id: 'simple-edge-2',
        source: agentNode?.id ?? 'agent-node',
        target: actionNode?.id ?? 'platform-node',
        type: 'neura',
        animated: true,
      },
    ];

    return { nodes, edges };
  }, [state.canvas.nodes]);

  return (
    <section className="glass-panel cinematic-panel codex-canvas-panel">
      <div className="panel-heading compact-panel-heading flow-heading">
        <div>
          <span className="panel-kicker">Flujo</span>
          <h2>Así se va a ejecutar</h2>
        </div>
        <span className="flow-caption">Trigger → Agente IA → Acción</span>
      </div>

      <div className="flow-surface flow-surface-simple">
        <ReactFlow
          nodes={simplifiedGraph.nodes}
          edges={simplifiedGraph.edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{ type: 'neura', animated: true }}
        >
          <Background color="rgba(244, 247, 255, 0.06)" gap={32} />
        </ReactFlow>
      </div>
    </section>
  );
}

function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasBody />
    </ReactFlowProvider>
  );
}

export default FlowCanvas;
