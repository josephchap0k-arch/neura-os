import React, { useEffect, useMemo, useState } from 'react';
import OperationalRail from '../components/layout/OperationalRail';
import { useAppState } from '../state/appState';
import { parseAutomationInput } from '../utils/parser';

const examples = [
  'Quiero responder automáticamente mails VIP',
  'Mandar resumen diario a Slack',
  'Guardar leads en Sheets',
  'Enviar alertas importantes',
];

function ChatWorkspace() {
  const { state, actions } = useAppState();
  const [exampleIndex, setExampleIndex] = useState(0);
  const previewInput =
    state.chat.draft.trim() || 'quiero automatizar respuestas VIP desde Gmail hacia Slack';
  const livePreview = useMemo(() => parseAutomationInput(previewInput), [previewInput]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setExampleIndex((current) => (current + 1) % examples.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="workspace-view">
      <div className="neura-layout">
        <section className="center-stage">
          <section className="glass-panel command-stage">
            <div className="command-copy">
              <span className="panel-kicker">Centro operativo</span>
              <h1>Automatizá tareas sin tocar código.</h1>
              <p>Escribí una idea y NEURA te muestra cómo se va a ejecutar.</p>
            </div>

            <div className="composer-shell giant-composer">
              <textarea
                className="prompt-input giant-input"
                value={state.chat.draft}
                onChange={(event) => actions.setChatDraft(event.target.value)}
                placeholder="Decime qué querés automatizar"
              />

              <div className="dynamic-example">
                <span>Ejemplo</span>
                <strong>{examples[exampleIndex]}</strong>
              </div>

              <div className="suggestion-row">
                {examples.map((example) => (
                  <button
                    key={example}
                    type="button"
                    className="chip-button"
                    onClick={() => actions.setChatDraft(example)}
                  >
                    {example}
                  </button>
                ))}
              </div>

              <div className="input-footer">
                <div className="status-pill">
                  <span className="status-dot" />
                  {state.chat.busy ? 'Abriendo CODEX' : 'Listo para ayudarte'}
                </div>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => void actions.sendChatMessage()}
                  disabled={state.chat.busy}
                >
                  Enviar
                </button>
              </div>
            </div>
          </section>

          <section className="chat-columns">
            <section className="glass-panel chat-panel cinematic-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">Chat</span>
                  <h2>Conversación</h2>
                </div>
                <span className="confidence-badge">Sesión activa</span>
              </div>

              <div className="message-stream">
                {state.chat.messages.map((message) => (
                  <article key={message.id} className={`message-card message-${message.role}`}>
                    <span>{message.role === 'assistant' ? 'NEURA' : 'Vos'}</span>
                    <p>{message.content}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="glass-panel parser-panel cinematic-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">Vista previa</span>
                  <h2>NEURA ya entendió esto</h2>
                </div>
                <span className="confidence-badge">{livePreview.confidence}% listo</span>
              </div>

              <div className="detector-grid">
                <article className="detector-card">
                  <span>Inicio</span>
                  <strong>{livePreview.trigger}</strong>
                </article>
                <article className="detector-card">
                  <span>Acción</span>
                  <strong>{livePreview.action}</strong>
                </article>
                <article className="detector-card">
                  <span>App</span>
                  <strong>{livePreview.platformLabel}</strong>
                </article>
                <article className="detector-card">
                  <span>Momento</span>
                  <strong>{livePreview.schedule.label}</strong>
                </article>
              </div>

              <div className="chat-flow-line">
                <div className="flow-orb">
                  <small>1</small>
                  <strong>Idea</strong>
                </div>
                <div className="flow-link" />
                <div className="flow-orb">
                  <small>2</small>
                  <strong>NEURA</strong>
                </div>
                <div className="flow-link" />
                <div className="flow-orb">
                  <small>3</small>
                  <strong>CODEX</strong>
                </div>
              </div>
            </section>
          </section>

          <section className="glass-panel cinematic-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">Actividad</span>
                <h2>Últimos cambios</h2>
              </div>
            </div>

            <div className="log-list">
              {state.codex.logs.slice(0, 3).map((log) => (
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
        </section>

        <OperationalRail />
      </div>
    </section>
  );
}

export default ChatWorkspace;
