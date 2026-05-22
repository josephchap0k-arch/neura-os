import React from 'react';
import FloatingAssistant from './FloatingAssistant';
import Sidebar from './Sidebar';
import WorkspaceHeader from './WorkspaceHeader';

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="workspace-shell">
        <WorkspaceHeader />
        {children}
      </div>
      <FloatingAssistant />
    </div>
  );
}

export default AppShell;
