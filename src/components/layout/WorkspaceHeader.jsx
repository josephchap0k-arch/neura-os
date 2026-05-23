import React from 'react';
import { useAppState } from '../../state/appState';

const headerContent = {
  chat: {
    eyebrow: 'NEURA',
    title: 'Chat',
    description: 'Escribí una idea y seguí el flujo en tiempo real.',
  },
  codex: {
    eyebrow: 'CODEX',
    title: 'CODEX',
    description: 'Creá automatizaciones con una sola instrucción.',
  },
  automatizaciones: {
    eyebrow: 'CODEX',
    title: 'Automatizaciones',
    description: 'Tus flujos, ordenados y listos para activar.',
  },
  conectores: {
    eyebrow: 'CODEX',
    title: 'Conectores',
    description: 'Conectá tus apps para usar datos reales.',
  },
  memoria: {
    eyebrow: 'NEURA',
    title: 'Memoria',
    description: 'Todo tu contexto útil en un solo lugar.',
  },
};

function WorkspaceHeader() {
  const { state } = useAppState();
  const section = headerContent[state.navigation.active] ?? headerContent[state.view];

  return (
    <header className="workspace-header glass-panel workspace-header-minimal">
      <div>
        <span className="eyebrow">{section.eyebrow}</span>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
      </div>
    </header>
  );
}

export default WorkspaceHeader;
