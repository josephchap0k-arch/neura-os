import React, { useEffect } from 'react';
import { useCodex } from '../../state/codexState';

function SimulationPanel() {
  const { state, actions } = useCodex();

  useEffect(() => {
    if (!state.practiceMode) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      actions.tickPractice();
    }, 1800);

    return () => window.clearInterval(timer);
  }, [actions, state.practiceMode]);

  return (
    <section className="glass-panel panel-span-2 cinematic-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">Modo práctica</span>
          <h2>Modo práctica</h2>
        </div>
        <button type="button" className="secondary-button" onClick={actions.togglePracticeMode}>
          {state.practiceMode ? 'Pausar práctica' : 'Activar práctica'}
        </button>
      </div>

      <div className="simulation-layout">
        <div className="chart-card">
          <div className="practice-banner">
            <strong>{state.practiceMode ? 'Simulación encendida' : 'Simulación en pausa'}</strong>
            <span>Impacto estimado: {state.simulation.score}%</span>
          </div>

          {state.simulation.metrics.map((metric) => (
            <div key={metric.label} className="metric-bar">
              <div className="metric-meta">
                <span>{metric.label}</span>
                <strong>{metric.value}%</strong>
              </div>
              <div className="metric-track">
                <div className="metric-fill" style={{ width: `${metric.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="simulation-summary">
          <h3>Lectura operativa</h3>
          <p>{state.simulation.summary}</p>
          <div className="simulation-tags">
            <span>{state.parsed.trigger}</span>
            <span>{state.parsed.action}</span>
            <span>{state.parsed.platformLabel}</span>
            <span>{state.parsed.schedule.label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SimulationPanel;
