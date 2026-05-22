import React, { useEffect, useMemo, useState } from 'react';
import { useAppState } from '../../state/appState';

const assistantTips = {
  chat: [
    {
      body: 'Decime qué querés automatizar y yo armo el flujo.',
      actionLabel: 'Abrir CODEX',
      target: 'codex',
    },
  ],
  codex: [
    {
      body: 'Decime qué querés automatizar y yo armo el flujo.',
      actionLabel: 'Ver conectores',
      target: 'conectores',
    },
    {
      body: 'Usá modo práctica para probar sin riesgo.',
      actionLabel: 'Ver automatizaciones',
      target: 'automatizaciones',
    },
    {
      body: 'Conectá Gmail para enviar correos reales.',
      actionLabel: 'Conectar apps',
      target: 'conectores',
    },
  ],
  automatizaciones: [
    {
      body: 'Acá ves tus flujos listos y las últimas ejecuciones.',
      actionLabel: 'Crear flujo',
      target: 'codex',
    },
  ],
  conectores: [
    {
      body: 'Conectá Gmail, Slack o Drive para pasar del modo práctica a la acción.',
      actionLabel: 'Volver a CODEX',
      target: 'codex',
    },
  ],
  memoria: [
    {
      body: 'Tu memoria guarda pedidos, contexto y decisiones importantes.',
      actionLabel: 'Ir al chat',
      target: 'chat',
    },
  ],
};

function FloatingAssistant() {
  const { state, actions } = useAppState();
  const [collapsed, setCollapsed] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const tips = useMemo(
    () => assistantTips[state.navigation.active] ?? assistantTips.codex,
    [state.navigation.active],
  );
  const activeTip = tips[tipIndex % tips.length];

  useEffect(() => {
    setTipIndex(0);
  }, [tips]);

  useEffect(() => {
    if (collapsed || tips.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTipIndex((current) => (current + 1) % tips.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [collapsed, tips]);

  if (collapsed) {
    return (
      <button
        type="button"
        className="assistant-fab"
        onClick={() => setCollapsed(false)}
      >
        NEURA
      </button>
    );
  }

  return (
    <aside className="glass-panel assistant-panel">
      <div className="assistant-topline">
        <div>
          <span className="panel-kicker">NEURA</span>
          <h3>Asistente</h3>
        </div>
        <button
          type="button"
          className="assistant-close"
          onClick={() => setCollapsed(true)}
          aria-label="Ocultar asistente"
        >
          ×
        </button>
      </div>

      <p>{activeTip.body}</p>

      <div className="assistant-actions">
        <button
          type="button"
          className="primary-button"
          onClick={() => actions.openSection(activeTip.target)}
        >
          {activeTip.actionLabel}
        </button>
        {tips.length > 1 ? (
          <button
            type="button"
            className="secondary-button"
            onClick={() => setTipIndex((current) => (current + 1) % tips.length)}
          >
            Otro consejo
          </button>
        ) : null}
      </div>
    </aside>
  );
}

export default FloatingAssistant;
