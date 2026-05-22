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
            <span className="panel-kicker">Memoria Operativa</span>
            <h2>Memoria Operativa</h2>
          </div>
        </div>

        <div className="rail-stack">
          {state.memory.map((item) => (
            <article key={item.id} className="memory-card">
              <strong>{item.title}</strong>
              <p>{item.body}</p>
              <small>{item.source}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel rail-panel compact-rail">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">Automatizaciones</span>
            <h2>Automatizaciones</h2>
          </div>
        </div>

        <div className="rail-stack">
          {recentAutomations.length > 0 ? (
            recentAutomations.map((item) => (
              <article key={item.id} className="session-card">
                <span>{item.platform}</span>
                <strong>{item.summary}</strong>
                <p>{item.source === 'chat' ? 'Creada desde chat inteligente' : 'Creada desde CODEX'}</p>
              </article>
            ))
          ) : (
            <article className="session-card">
              <span>Sin actividad</span>
              <strong>Esperando nuevas rutas</strong>
              <p>Las automatizaciones recientes van a aparecer acá.</p>
            </article>
          )}
        </div>
      </section>

      <section className="glass-panel rail-panel compact-rail">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">Conectores</span>
            <h2>Conectores conectados</h2>
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

      <section className="glass-panel rail-panel compact-rail">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">Estado IA</span>
            <h2>Sesión Activa</h2>
          </div>
        </div>

        <div className="rail-stack">
          <article className="session-card">
            <span>Sesion</span>
            <strong>{state.session.id}</strong>
            <p>{state.session.region}</p>
          </article>
          <article className="session-card">
            <span>IA</span>
            <strong>{state.auth.user.role}</strong>
            <p>{state.codex.practiceMode ? 'Modo practica activo' : 'Modo practica pausado'}</p>
          </article>
        </div>
      </section>
    </aside>
  );
}

export default OperationalRail;
