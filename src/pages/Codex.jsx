import React from 'react';
import FlowCanvas from '../components/canvas/FlowCanvas';
import AutomationInput from '../components/codex/AutomationInput';
import CodexOnboarding from '../components/codex/CodexOnboarding';
import ConnectorPanel from '../components/codex/ConnectorPanel';
import { useAppState } from '../state/appState';

function AutomationsView() {
  const { state, actions } = useAppState();
  const requests = state.codex.requests;

  return (
    <section className="workspace-view">
      <section className="glass-panel cinematic-panel section-panel">
        <div className="panel-heading compact-panel-heading">
          <div>
            <span className="panel-kicker">Automatizaciones</span>
            <h2>Tus flujos</h2>
            <p className="section-copy">Todo lo que ya preparaste, listo para revisar.</p>
          </div>
          <button type="button" className="primary-button" onClick={() => actions.openSection('codex')}>
            Crear automatización
          </button>
        </div>

        <div className="simple-card-grid simple-card-grid-compact">
          {requests.length > 0 ? (
            requests.map((item) => (
              <article key={item.id} className="simple-info-card">
                <span>{item.platform}</span>
                <strong>{item.summary}</strong>
                <p>{item.source === 'chat' ? 'Creada desde el chat' : 'Creada desde CODEX'}</p>
              </article>
            ))
          ) : (
            <article className="simple-info-card empty-state-card">
              <span>Vacío</span>
              <strong>Todavía no tenés automatizaciones</strong>
              <p>Empezá con una idea simple y NEURA te arma el flujo.</p>
              <button
                type="button"
                className="primary-button"
                onClick={() => actions.openSection('codex')}
              >
                Crear primera automatización
              </button>
            </article>
          )}
        </div>
      </section>
    </section>
  );
}

function MemoryView() {
  const { state, actions } = useAppState();

  return (
    <section className="workspace-view">
      <section className="glass-panel cinematic-panel section-panel">
        <div className="panel-heading compact-panel-heading">
          <div>
            <span className="panel-kicker">Memoria</span>
            <h2>Contexto guardado</h2>
            <p className="section-copy">Todo lo importante para seguir sin empezar de cero.</p>
          </div>
          <button type="button" className="secondary-button" onClick={() => actions.openSection('chat')}>
            Ir al chat
          </button>
        </div>

        <div className="simple-card-grid simple-card-grid-compact">
          {state.memory.map((item) => (
            <article key={item.id} className="simple-info-card">
              <span>{item.source}</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </article>
          ))}
          <article className="simple-info-card">
            <span>Sesión</span>
            <strong>{state.session.workspaceName}</strong>
            <p>{state.auth.user.role}</p>
          </article>
        </div>
      </section>
    </section>
  );
}

function CodexHome() {
  return (
    <section className="workspace-view">
      <div className="codex-builder-shell">
        <CodexOnboarding />
        <section className="codex-main-column">
          <AutomationInput />
          <FlowCanvas />
        </section>
      </div>
    </section>
  );
}

function Codex() {
  const { state } = useAppState();

  if (state.navigation.active === 'automatizaciones') {
    return <AutomationsView />;
  }

  if (state.navigation.active === 'conectores') {
    return (
      <section className="workspace-view">
        <ConnectorPanel />
      </section>
    );
  }

  if (state.navigation.active === 'memoria') {
    return <MemoryView />;
  }

  return <CodexHome />;
}

export default Codex;
