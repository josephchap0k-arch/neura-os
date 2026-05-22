import React from 'react';
import AppShell from './components/layout/AppShell';
import ChatWorkspace from './pages/ChatWorkspace';
import Codex from './pages/Codex';
import { AppProvider, useAppState } from './state/appState';

function RouterView() {
  const { state } = useAppState();

  return state.view === 'codex' ? <Codex /> : <ChatWorkspace />;
}

function App() {
  return (
    <AppProvider>
      <AppShell>
        <RouterView />
      </AppShell>
    </AppProvider>
  );
}

export default App;
