import React from 'react';
import { useAppState } from '../../state/appState';

const headerContent = {
  chat: {
    eyebrow: 'NEURA',
    title: 'Chat',
    description: 'Hablá con NEURA y convertí una idea en un flujo real.',
  },
  codex: {
    eyebrow: 'CODEX',
    title: 'CODEX',
    description: 'Creá automatizaciones escribiendo lo que querés.',
  },
  automatizaciones: {
    eyebrow: 'CODEX',
    title: 'Automatizaciones',
    description: 'Tus flujos listos, ordenados y fáciles de revisar.',
  },
  conectores: {
    eyebrow: 'CODEX',
    title: 'Conectores',
    description: 'Conectá apps reales para pasar de prueba a ejecución.',
  },
  memoria: {
    eyebrow: 'NEURA',
    title: 'Memoria',
    description: 'Todo tu contexto activo en un solo lugar.',
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
