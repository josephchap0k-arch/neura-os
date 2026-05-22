import React from 'react';
import { useCodex } from '../../state/codexState';

const compactConnectors = ['gmail', 'slack', 'drive', 'whatsapp', 'stripe'];

function CodexStatusPanel() {
  const { state } = useCodex();
  const selectedConnectors = state.connectors.filter((connector) =>
    compactConnectors.includes(connector.id),
  );
  const detected = `${state.parsed.trigger} -> ${state.parsed.platformLabel} -> ${state.parsed.action}`;

  return (
    <aside className="glass-panel codex-status-panel cinematic-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">Estado</span>
          <h2>Resumen</h2>
        </div>
      </div>

      <div className="status-stack">
        <article className="status-card">
          <span>NEURA entendió tu pedido</span>
          <strong>{detected}</strong>
        </article>
        <article className="status-card">
          <span>Listo para probar</span>
          <strong>{state.parsed.action}</strong>
        </article>
        <article className="status-card">
          <span>Probando sin riesgo</span>
          <strong>{state.practiceMode ? 'Sí' : 'No'}</strong>
        </article>
      </div>

      <span className="panel-kicker compact-chip-label">Conectores</span>
      <div className="compact-connector-group">
        {selectedConnectors.map((connector) => (
          <button
            key={connector.id}
            type="button"
            className={`connector-chip ${connector.connected ? 'is-connected' : ''} ${
              connector.id === state.parsed.platform ? 'is-target' : ''
            }`}
          >
            {connector.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default CodexStatusPanel;
