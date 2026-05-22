import React from 'react';
import { useCodex } from '../../state/codexState';

function RealExecutionPanel() {
  const { state, actions } = useCodex();

  return (
    <section className="glass-panel cinematic-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">Ejecución simulada</span>
          <h2>Automatizaciones</h2>
        </div>
        <button type="button" className="primary-button" onClick={actions.executeFlow}>
          Ejecutar flujo
        </button>
      </div>

      <div className="execution-list">
        {state.execution.map((step) => (
          <article key={step.id} className="execution-card">
            <div className={`execution-indicator status-${step.status}`} />
            <div>
              <h3>{step.label}</h3>
              <p>{step.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RealExecutionPanel;
