import React from 'react';
import { useAppState } from '../../state/appState';

function OperationalRail() {
  const { state } = useAppState();
  const connectedConnectors = state.codex.connectors.filter((connector) => connector.connected);
  const recentAutomations = state.codex.requests.slice(0, 3);

  return (
    <aside className="operational-rail">
      <section className="glass-panel rail-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">Memoria</span>
            <h2>Contexto activo</h2>
          </div>
        </div>

        <div className="rail-stack">
          {state.memory.slice(0, 2).map((item) => (
            <article key={item.id} className="memory-card">
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel rail-panel compact-rail">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">Automatizaciones</span>
            <h2>Últimas</h2>
          </div>
        </div>

        <div className="rail-stack">
          {recentAutomations.length > 0 ? (
            recentAutomations.map((item) => (
              <article key={item.id} className="session-card">
                <span>{item.platform}</span>
                <strong>{item.summary}</strong>
                <p>{item.source === 'chat' ? 'Desde chat' : 'Desde CODEX'}</p>
              </article>
            ))
          ) : (
            <article className="session-card">
              <span>Vacío</span>
              <strong>Todavía no tenés automatizaciones</strong>
              <p>Creá la primera desde CODEX.</p>
            </article>
          )}
        </div>
      </section>

      <section className="glass-panel rail-panel compact-rail">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">Conectores</span>
            <h2>Conectados</h2>
          </div>
        </div>

        <div className="connector-list-mini">
          {connectedConnectors.map((connector) => (
            <article key={connector.id} className="mini-connector">
              <span className={`mini-dot ${connector.brand}`} />
              <div>
                <strong>{connector.name}</strong>
                <p>{connector.account}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </aside>
  );
}

export default OperationalRail;
