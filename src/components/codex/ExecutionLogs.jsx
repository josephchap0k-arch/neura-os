import React from 'react';
import { useCodex } from '../../state/codexState';

function ExecutionLogs() {
  const { state } = useCodex();

  return (
    <section className="glass-panel cinematic-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">Logs inteligentes</span>
          <h2>Logs inteligentes</h2>
        </div>
      </div>

      <div className="log-list">
        {state.logs.map((log) => (
          <article key={log.id} className="log-entry">
            <div className={`log-marker log-${log.level}`} />
            <div>
              <strong>{log.title}</strong>
              <p>{log.message}</p>
            </div>
            <time>{log.time}</time>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ExecutionLogs;
