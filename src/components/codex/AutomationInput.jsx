import React from 'react';
import { useAppState } from '../../state/appState';
import { useCodex } from '../../state/codexState';

function AutomationInput() {
  const { actions: appActions } = useAppState();
  const { state, actions } = useCodex();

  async function handleSimulate() {
    await actions.parseInput(state.input);
    actions.runSimulation();
  }

  async function handleExecute() {
    await actions.parseInput(state.input);
    actions.executeFlow();
  }

  async function handleConnect() {
    await actions.parseInput(state.input);
    appActions.openSection('conectores');
  }

  return (
    <section className="glass-panel cinematic-panel codex-input-panel">
      <div className="panel-heading compact-panel-heading codex-input-heading">
        <div>
          <span className="panel-kicker">Builder</span>
          <h2>¿Qué querés automatizar?</h2>
          <p>Describilo en una frase. NEURA arma el flujo por vos.</p>
        </div>
      </div>

      <textarea
        className="prompt-input giant-input codex-clean-input"
        value={state.input}
        onChange={(event) => actions.setInput(event.target.value)}
        placeholder="Ejemplo: Quiero recibir un mail todos los días a las 9"
      />

      <div className="codex-action-row">
        <button type="button" className="secondary-button" onClick={() => void handleSimulate()}>
          Simular
        </button>
        <button type="button" className="secondary-button" onClick={() => void handleConnect()}>
          Conectar apps
        </button>
        <button type="button" className="primary-button" onClick={() => void handleExecute()}>
          Activar
        </button>
      </div>
    </section>
  );
}

export default AutomationInput;
