import React from 'react';
import ConnectorIcon from './ConnectorIcon';
import { useCodex } from '../../state/codexState';

function ConnectorPanel() {
  const { state, actions } = useCodex();

  return (
    <section className="glass-panel cinematic-panel section-panel">
      <div className="panel-heading compact-panel-heading">
        <div>
          <span className="panel-kicker">Conectores</span>
          <h2>Apps listas para conectar</h2>
        </div>
      </div>

      <div className="connector-grid connector-grid-simple">
        {state.connectors.map((connector) => (
          <article
            key={connector.id}
            className={`connector-card connector-card-simple ${connector.brand} ${
              connector.connected ? 'is-connected' : ''
            } ${connector.id === state.parsed.platform ? 'is-target' : ''}`}
          >
            <div className="connector-topline">
              <ConnectorIcon type={connector.icon} />
              <div>
                <span>{connector.name}</span>
                <strong>{connector.connected ? 'Conectado' : 'Disponible'}</strong>
              </div>
            </div>
            <p>{connector.description}</p>
            <button
              type="button"
              className={connector.connected ? 'secondary-button' : 'primary-button'}
              onClick={() => actions.toggleConnector(connector.id)}
            >
              {connector.connected ? `Desconectar ${connector.name}` : `Conectar ${connector.name}`}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ConnectorPanel;
