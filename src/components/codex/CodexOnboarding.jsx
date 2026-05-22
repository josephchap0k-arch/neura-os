import React, { useEffect, useState } from 'react';

const steps = [
  'Paso 1: Escribí lo que querés automatizar',
  'Paso 2: NEURA arma el flujo',
  'Paso 3: Probalo gratis',
  'Paso 4: Conectá apps reales',
];

function CodexOnboarding() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadySeen = window.localStorage.getItem('neura-codex-onboarding-seen');
    setVisible(!alreadySeen);
  }, []);

  function dismiss() {
    window.localStorage.setItem('neura-codex-onboarding-seen', 'true');
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <section className="glass-panel cinematic-panel onboarding-panel">
      <div className="panel-heading compact-panel-heading">
        <div>
          <span className="panel-kicker">Primeros pasos</span>
          <h2>Empezá en 30 segundos</h2>
        </div>
        <button type="button" className="secondary-button" onClick={dismiss}>
          Entendido
        </button>
      </div>

      <div className="onboarding-grid">
        {steps.map((step) => (
          <article key={step} className="onboarding-step">
            <strong>{step}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CodexOnboarding;
