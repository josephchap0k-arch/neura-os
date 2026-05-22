import React from 'react';
import { useCodex } from '../../state/codexState';

function AutomationFlow() {
  const { state } = useCodex();

  return (
    <section className="glass-panel cinematic-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">Flujo visual dinámico</span>
          <h2>Automatizaciones</h2>
        </div>
        <span className="confidence-badge">{state.parsed.confidence}% confianza</span>
      </div>

      <div className="flow-list">
        {state.flow.map((step, index) => (
          <article key={step.id} className="flow-card">
            <div className="flow-index">0{index + 1}</div>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AutomationFlow;
