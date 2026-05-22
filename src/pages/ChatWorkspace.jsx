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
  const previewInput = state.chat.draft.trim() || 'quiero automatizar respuestas VIP desde Gmail hacia Slack';
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
              <span className="panel-kicker">Centro Operativo</span>
              <h1>Un centro operativo de automatización del futuro.</h1>
              <p>
                Conversá con NEURA como si fuera tu operador ejecutivo. Cuando aparezca una intención de automatizar, el sistema abre CODEX y construye el flujo solo.
              </p>
            </div>

            <div className="composer-shell giant-composer">
              <textarea
                className="prompt-input giant-input"
                value={state.chat.draft}
                onChange={(event) => actions.setChatDraft(event.target.value)}
                placeholder="Decime qué querés automatizar..."
              />

              <div className="dynamic-example">
                <span>Ejemplo activo</span>
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
                  {state.chat.busy ? 'Abriendo CODEX...' : 'Chat Inteligente listo'}
                </div>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => void actions.sendChatMessage()}
                  disabled={state.chat.busy}
                >
                  Activar
                </button>
              </div>
            </div>
          </section>

          <section className="chat-columns">
            <section className="glass-panel chat-panel cinematic-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">Chat Inteligente</span>
                  <h2>Chat Inteligente</h2>
                </div>
                <span className="confidence-badge">Sesión Activa: {state.session.workspaceName}</span>
              </div>

              <div className="message-stream">
                {state.chat.messages.map((message) => (
                  <article
                    key={message.id}
                    className={`message-card message-${message.role}`}
                  >
                    <span>{message.role === 'assistant' ? 'NEURA' : 'Vos'}</span>
                    <p>{message.content}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="glass-panel parser-panel cinematic-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">Flujo Visual Dinámico</span>
                  <h2>Flujo visual dinámico</h2>
                </div>
                <span className="confidence-badge">{livePreview.confidence}% lectura</span>
              </div>

              <div className="detector-grid">
                <article className="detector-card">
                  <span>Trigger</span>
                  <strong>{livePreview.trigger}</strong>
                </article>
                <article className="detector-card">
                  <span>Acción</span>
                  <strong>{livePreview.action}</strong>
                </article>
                <article className="detector-card">
                  <span>Plataforma</span>
                  <strong>{livePreview.platformLabel}</strong>
                </article>
                <article className="detector-card">
                  <span>Horario</span>
                  <strong>{livePreview.schedule.label}</strong>
                </article>
              </div>

              <div className="chat-flow-line">
                <div className="flow-orb">
                  <small>01</small>
                  <strong>Entrada</strong>
                </div>
                <div className="flow-link" />
                <div className="flow-orb">
                  <small>02</small>
                  <strong>Parser</strong>
                </div>
                <div className="flow-link" />
                <div className="flow-orb">
                  <small>03</small>
                  <strong>CODEX</strong>
                </div>
              </div>
            </section>
          </section>

          <section className="glass-panel cinematic-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">Logs Inteligentes</span>
                <h2>Logs inteligentes</h2>
              </div>
            </div>

            <div className="log-list">
              {state.codex.logs.slice(0, 4).map((log) => (
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
