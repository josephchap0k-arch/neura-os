import React, { useEffect, useMemo, useState } from 'react';
import { useAppState } from '../../state/appState';

const assistantTips = {
  chat: [
    {
      body: 'Escribí una idea y NEURA la convierte en automatización.',
      actionLabel: 'Abrir CODEX',
      target: 'codex',
    },
  ],
  codex: [
    {
      body: 'Primero contame qué querés automatizar.',
      actionLabel: 'Ver conectores',
      target: 'conectores',
    },
    {
      body: 'Después conectá tus apps para usar datos reales.',
      actionLabel: 'Abrir apps',
      target: 'conectores',
    },
    {
      body: 'Probalo en modo práctica antes de activarlo.',
      actionLabel: 'Ver automatizaciones',
      target: 'automatizaciones',
    },
  ],
  automatizaciones: [
    {
      body: 'Acá vas a ver tus flujos listos para usar.',
      actionLabel: 'Crear automatización',
      target: 'codex',
    },
  ],
  conectores: [
    {
      body: 'Conectar una app te permite pasar de prueba a acción.',
      actionLabel: 'Volver a CODEX',
      target: 'codex',
    },
  ],
  memoria: [
    {
      body: 'La memoria guarda contexto útil para seguir trabajando más rápido.',
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
    }, 5200);

    return () => window.clearInterval(timer);
  }, [collapsed, tips]);

  if (collapsed) {
    return (
      <button type="button" className="assistant-fab" onClick={() => setCollapsed(false)}>
        NEURA
      </button>
    );
  }

  return (
    <aside className="glass-panel assistant-panel">
      <div className="assistant-topline">
        <div>
          <span className="panel-kicker">NEURA</span>
          <h3>Te guío</h3>
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
            Siguiente
          </button>
        ) : null}
      </div>
    </aside>
  );
}

export default FloatingAssistant;
