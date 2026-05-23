import React from 'react';

const steps = [
  '1. Elegí qué querés automatizar',
  '2. Conectá tus apps',
  '3. Probá en modo práctica',
  '4. Activá cuando esté listo',
];

function CodexOnboarding() {
  return (
    <section className="glass-panel cinematic-panel onboarding-panel onboarding-panel-inline">
      <div className="panel-heading compact-panel-heading">
        <div>
          <span className="panel-kicker">Guía rápida</span>
          <h2>Empezá en minutos</h2>
        </div>
      </div>

      <div className="onboarding-grid onboarding-grid-inline">
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
