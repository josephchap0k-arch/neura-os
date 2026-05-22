import React from 'react';
import { useAppState } from '../../state/appState';

const sections = [
  { id: 'chat', label: 'Chat' },
  { id: 'codex', label: 'CODEX' },
  { id: 'automatizaciones', label: 'Automatizaciones' },
  { id: 'conectores', label: 'Conectores' },
  { id: 'memoria', label: 'Memoria' },
];

function Sidebar() {
  const { state, actions } = useAppState();

  return (
    <aside className="sidebar-shell glass-panel sidebar-minimal">
      <div className="brand-block">
        <span className="brand-mark">NEURA</span>
        <h1>Centro operativo</h1>
      </div>

      <nav className="sidebar-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`nav-link ${state.navigation.active === section.id ? 'is-active' : ''}`}
            onClick={() => {
              if (section.id === 'codex') {
                actions.setView('codex');
                return;
              }

              if (section.id === 'chat') {
                actions.setView('chat');
                return;
              }

              actions.openSection(section.id);
            }}
          >
            <span>{section.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
