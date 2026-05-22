import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { requestCodexParse } from '../api/codex';
import {
  buildCanvasAddonNode,
  buildCanvasConnectionEdge,
  buildDefaultConnectors,
  buildInitialCodexState,
  buildPracticeLogEntry,
} from '../utils/codexEngine';

const AppStateContext = createContext(null);

const initialConnectors = buildDefaultConnectors();
const defaultView = resolveViewFromHash(
  typeof window !== 'undefined' ? window.location.hash : '',
);

const initialState = {
  view: defaultView,
  navigation: {
    active: defaultView === 'codex' ? 'codex' : 'chat',
  },
  theme: {
    name: 'NEURA One',
    accent: 'Cian orbital',
    surface: 'Vidrio obsidiana',
  },
  layout: {
    sidebarCollapsed: false,
    workspaceMode: defaultView === 'codex' ? 'Operativo' : 'Conversacional',
  },
  auth: {
    status: 'authenticated',
    user: {
      name: 'Noxi Operator',
      email: 'ops@neura.ai',
      role: 'Directora de Operaciones IA',
    },
  },
  session: {
    id: 'SESSION-NEURA-042',
    workspaceName: 'Centro Neura',
    region: 'LATAM Sur',
    startedAt: '2026-05-22T16:42:00-03:00',
  },
  memory: [
    {
      id: 'memory-1',
      title: 'Memoria operacional encendida',
      body: 'NEURA conserva contexto compartido entre chat, parser y CODEX.',
      source: 'sistema',
    },
    {
      id: 'memory-2',
      title: 'Sesion activa sincronizada',
      body: 'Tema, sesiones, conectores y navegacion viven en un solo shell.',
      source: 'sesion',
    },
  ],
  chat: {
    draft: '',
    busy: false,
    messages: [
      {
        id: 'msg-1',
        role: 'assistant',
        content:
          'NEURA ya esta online. El chat sigue intacto mientras CODEX se abre como espacio operativo separado.',
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content:
          'Decime "quiero automatizar..." y muevo la solicitud al parser interno para construir el flujo en tiempo real.',
      },
    ],
  },
  codex: buildInitialCodexState(
    'Quiero automatizar alertas premium desde Gmail hacia Slack y archivar resumen en Drive cada manana.',
    initialConnectors,
  ),
};

function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return {
        ...state,
        view: action.payload,
        layout: {
          ...state.layout,
          workspaceMode: action.payload === 'codex' ? 'Operativo' : 'Conversacional',
        },
      };
    case 'SET_ACTIVE_SECTION':
      return {
        ...state,
        navigation: {
          ...state.navigation,
          active: action.payload,
        },
      };
    case 'SET_CHAT_DRAFT':
      return {
        ...state,
        chat: { ...state.chat, draft: action.payload },
      };
    case 'SET_CHAT_BUSY':
      return {
        ...state,
        chat: { ...state.chat, busy: action.payload },
      };
    case 'PUSH_CHAT_MESSAGE':
      return {
        ...state,
        chat: {
          ...state.chat,
          messages: [...state.chat.messages, action.payload],
        },
      };
    case 'APPEND_MEMORY':
      return {
        ...state,
        memory: [action.payload, ...state.memory].slice(0, 7),
      };
    case 'SET_CODEX_INPUT':
      return {
        ...state,
        codex: { ...state.codex, input: action.payload },
      };
    case 'SYNC_CODEX_STATE':
      return {
        ...state,
        codex: mergeCodexState(state.codex, action.payload, action.meta),
      };
    case 'TOGGLE_CONNECTOR':
      return {
        ...state,
        codex: {
          ...state.codex,
          connectors: state.codex.connectors.map((connector) =>
            connector.id === action.payload
              ? {
                  ...connector,
                  connected: !connector.connected,
                  statusLabel: !connector.connected ? 'Conectado' : 'Desconectado',
                }
              : connector,
          ),
        },
      };
    case 'RUN_SIMULATION':
      return {
        ...state,
        codex: runSimulation(state.codex),
      };
    case 'EXECUTE_FLOW':
      return {
        ...state,
        codex: executeFlow(state.codex),
      };
    case 'TOGGLE_PRACTICE_MODE':
      return {
        ...state,
        codex: {
          ...state.codex,
          practiceMode: !state.codex.practiceMode,
          logs: [
            {
              id: `log-${Date.now()}`,
              level: 'info',
              title: state.codex.practiceMode
                ? 'Modo practica pausado'
                : 'Modo practica activado',
              message: state.codex.practiceMode
                ? 'La simulacion queda congelada y los logs en vivo se detienen.'
                : 'La simulacion vuelve a generar actividad visual y ejecucion falsa.',
              time: 'Ahora',
            },
            ...state.codex.logs,
          ].slice(0, 10),
        },
      };
    case 'PULSE_PRACTICE':
      return {
        ...state,
        codex: pulsePractice(state.codex),
      };
    case 'APPLY_CANVAS_NODE_CHANGES':
      return {
        ...state,
        codex: {
          ...state.codex,
          canvas: {
            ...state.codex.canvas,
            nodes: applyNodeChanges(action.payload, state.codex.canvas.nodes),
          },
        },
      };
    case 'APPLY_CANVAS_EDGE_CHANGES':
      return {
        ...state,
        codex: {
          ...state.codex,
          canvas: {
            ...state.codex.canvas,
            edges: applyEdgeChanges(action.payload, state.codex.canvas.edges),
          },
        },
      };
    case 'CONNECT_CANVAS_EDGE':
      return {
        ...state,
        codex: {
          ...state.codex,
          canvas: {
            ...state.codex.canvas,
            edges: addEdge(
              {
                ...action.payload,
                type: 'neura',
                animated: true,
                data: { label: 'Ruta visual' },
              },
              state.codex.canvas.edges,
            ),
          },
          logs: [
            {
              id: `log-${Date.now()}`,
              level: 'info',
              title: 'Conexion manual agregada',
              message: 'El canvas visual recibio una nueva conexion arrastrada por el usuario.',
              time: 'Ahora',
            },
            ...state.codex.logs,
          ].slice(0, 10),
        },
      };
    case 'ADD_CANVAS_NODE':
      return {
        ...state,
        codex: addCanvasNode(state.codex, action.payload),
      };
    default:
      return state;
  }
}

function mergeCodexState(currentCodex, payload, meta = {}) {
  const logs =
    meta.source === 'chat'
      ? [
          {
            id: `log-${Date.now()}`,
            level: 'success',
            title: 'Solicitud capturada',
            message: 'NEURA envio la idea al parser y abrio CODEX automaticamente.',
            time: 'Ahora',
          },
          ...payload.logs,
        ].slice(0, 10)
      : payload.logs;

  return {
    ...currentCodex,
    ...payload,
    input: meta.input ?? payload.input ?? currentCodex.input,
    connectors: currentCodex.connectors,
    logs,
    requests: [
      {
        id: `request-${Date.now()}`,
        source: meta.source ?? 'codex',
        createdAt: new Date().toISOString(),
        summary: payload.parsed.action,
        platform: payload.parsed.platformLabel,
      },
      ...currentCodex.requests,
    ].slice(0, 8),
  };
}

function runSimulation(codex) {
  const hasTargetConnector = codex.connectors.some(
    (connector) => connector.id === codex.parsed.platform && connector.connected,
  );
  const scoreShift = hasTargetConnector ? 4 : -10;
  const nextScore = clamp(codex.simulation.score + scoreShift);
  const metrics = codex.simulation.metrics.map((metric, index) => ({
    ...metric,
    value: clamp(metric.value + (hasTargetConnector ? index + 1 : -index - 1)),
  }));

  return {
    ...codex,
    simulation: {
      ...codex.simulation,
      score: nextScore,
      metrics,
      summary: hasTargetConnector
        ? `${codex.parsed.platformLabel} ya responde dentro de la sesion activa. La simulacion puede escalar a ejecucion controlada.`
        : `${codex.parsed.platformLabel} sigue sin handshake activo. NEURA mantiene el flujo en modo seguro.`,
    },
    logs: [
      {
        id: `log-${Date.now()}`,
        level: hasTargetConnector ? 'success' : 'warning',
        title: 'Simulacion visual actualizada',
        message: hasTargetConnector
          ? 'Los conectores premium confirmaron disponibilidad para la ruta actual.'
          : 'La simulacion detecto un conector faltante para la ruta actual.',
        time: 'Ahora',
      },
      ...codex.logs,
    ].slice(0, 10),
  };
}

function executeFlow(codex) {
  return {
    ...codex,
    execution: codex.execution.map((step, index) => ({
      ...step,
      status: index < 2 ? 'done' : 'active',
      detail:
        index === 2
          ? `Despachando la automatizacion hacia ${codex.parsed.platformLabel} dentro de la sesion NEURA.`
          : step.detail,
    })),
    canvas: {
      ...codex.canvas,
      nodes: codex.canvas.nodes.map((node, index) => ({
        ...node,
        data: {
          ...node.data,
          runtimeState:
            index === codex.canvas.nodes.length - 1
              ? 'active'
              : index < codex.canvas.nodes.length - 1
                ? 'done'
                : 'idle',
        },
      })),
    },
    logs: [
      {
        id: `log-${Date.now()}`,
        level: 'success',
        title: 'Ejecucion armada',
        message: `CODEX activo ${codex.parsed.action.toLowerCase()} sobre ${codex.parsed.platformLabel}.`,
        time: 'Ahora',
      },
      ...codex.logs,
    ].slice(0, 10),
  };
}

function pulsePractice(codex) {
  if (!codex.practiceMode) {
    return codex;
  }

  const practiceLog = buildPracticeLogEntry(codex);
  const pulseValue = codex.practicePulse + 1;
  const activeIndex = pulseValue % codex.canvas.nodes.length;

  return {
    ...codex,
    practicePulse: pulseValue,
    simulation: {
      ...codex.simulation,
      score: clamp(codex.simulation.score + (pulseValue % 2 === 0 ? 1 : -1)),
    },
    execution: codex.execution.map((step, index) => ({
      ...step,
      status:
        index === pulseValue % codex.execution.length
          ? 'active'
          : index < pulseValue % codex.execution.length
            ? 'done'
            : 'queued',
    })),
    canvas: {
      ...codex.canvas,
      nodes: codex.canvas.nodes.map((node, index) => ({
        ...node,
        data: {
          ...node.data,
          runtimeState:
            index === activeIndex
              ? 'active'
              : index < activeIndex
                ? 'done'
                : 'idle',
        },
      })),
    },
    logs: [practiceLog, ...codex.logs].slice(0, 10),
  };
}

function addCanvasNode(codex, type) {
  const newNode = buildCanvasAddonNode(type, codex.canvas);
  const lastNode = codex.canvas.nodes[codex.canvas.nodes.length - 1];
  const nextEdges = lastNode
    ? [...codex.canvas.edges, buildCanvasConnectionEdge(lastNode.id, newNode.id, 'Extender')]
    : codex.canvas.edges;

  return {
    ...codex,
    canvas: {
      ...codex.canvas,
      nodes: [...codex.canvas.nodes, newNode],
      edges: nextEdges,
    },
    logs: [
      {
        id: `log-${Date.now()}`,
        level: 'info',
        title: 'Nodo agregado al canvas',
        message: `Se agrego un nodo ${type.toUpperCase()} al constructor visual.`,
        time: 'Ahora',
      },
      ...codex.logs,
    ].slice(0, 10),
  };
}

function clamp(value) {
  return Math.max(24, Math.min(98, value));
}

function resolveViewFromHash(hash) {
  return hash === '#codex' ? 'codex' : 'chat';
}

function resolveViewFromSection(section) {
  if (section === 'chat') {
    return 'chat';
  }

  if (['codex', 'automatizaciones', 'conectores', 'memoria'].includes(section)) {
    return 'codex';
  }

  return 'codex';
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleHashChange = () => {
      dispatch({ type: 'NAVIGATE', payload: resolveViewFromHash(window.location.hash) });
      dispatch({
        type: 'SET_ACTIVE_SECTION',
        payload: resolveViewFromHash(window.location.hash) === 'codex' ? 'codex' : 'chat',
      });
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const nextHash = state.view === 'codex' ? '#codex' : '#chat';

    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }, [state.view]);

  const actions = useMemo(
    () => ({
      navigate(view) {
        dispatch({ type: 'NAVIGATE', payload: view });
      },
      setView(view) {
        dispatch({
          type: 'SET_ACTIVE_SECTION',
          payload: view === 'codex' ? 'codex' : 'chat',
        });
        dispatch({ type: 'NAVIGATE', payload: view });
      },
      openSection(section) {
        dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
        dispatch({ type: 'NAVIGATE', payload: resolveViewFromSection(section) });
      },
      setChatDraft(value) {
        dispatch({ type: 'SET_CHAT_DRAFT', payload: value });
      },
      async sendChatMessage() {
        const message = state.chat.draft.trim();

        if (!message) {
          return;
        }

        dispatch({
          type: 'PUSH_CHAT_MESSAGE',
          payload: {
            id: `msg-${Date.now()}`,
            role: 'user',
            content: message,
          },
        });
        dispatch({ type: 'SET_CHAT_DRAFT', payload: '' });

        if (/quiero automatizar/i.test(message)) {
          dispatch({ type: 'SET_CHAT_BUSY', payload: true });

          try {
            const result = await requestCodexParse(message, {
              sessionId: state.session.id,
              connectors: state.codex.connectors,
            });

            dispatch({
              type: 'SYNC_CODEX_STATE',
              payload: result,
              meta: { source: 'chat', input: message },
            });
            dispatch({
              type: 'PUSH_CHAT_MESSAGE',
              payload: {
                id: `msg-${Date.now() + 1}`,
                role: 'assistant',
                content:
                  'Listo. Abri CODEX, detecte trigger, accion, plataforma y horario, y arme el flujo visual en tiempo real.',
              },
            });
            dispatch({
              type: 'APPEND_MEMORY',
              payload: {
                id: `memory-${Date.now()}`,
                title: 'Nueva automatizacion detectada',
                body: message,
                source: 'chat',
              },
            });
            dispatch({ type: 'SET_ACTIVE_SECTION', payload: 'codex' });
            dispatch({ type: 'NAVIGATE', payload: 'codex' });
          } catch (error) {
            dispatch({
              type: 'PUSH_CHAT_MESSAGE',
              payload: {
                id: `msg-${Date.now() + 1}`,
                role: 'assistant',
                content:
                  'El parser no respondio a tiempo. Mantengo el chat activo y no promuevo la solicitud hasta que lo confirmemos.',
              },
            });
          } finally {
            dispatch({ type: 'SET_CHAT_BUSY', payload: false });
          }

          return;
        }

        dispatch({
          type: 'PUSH_CHAT_MESSAGE',
          payload: {
            id: `msg-${Date.now() + 1}`,
            role: 'assistant',
            content:
              'Te escucho desde el chat inteligente. Cuando quieras llevarlo a automatizacion, escribi "quiero automatizar".',
          },
        });
      },
      setCodexInput(value) {
        dispatch({ type: 'SET_CODEX_INPUT', payload: value });
      },
      async parseCodexInput(inputOverride) {
        const input = (inputOverride ?? state.codex.input).trim();

        if (!input) {
          return;
        }

        const result = await requestCodexParse(input, {
          sessionId: state.session.id,
          connectors: state.codex.connectors,
        });

        dispatch({
          type: 'SYNC_CODEX_STATE',
          payload: result,
          meta: { source: 'codex', input },
        });
        dispatch({
          type: 'APPEND_MEMORY',
          payload: {
            id: `memory-${Date.now()}`,
            title: 'Parser actualizado',
            body: `${result.parsed.trigger} -> ${result.parsed.action} -> ${result.parsed.platformLabel}`,
            source: 'codex',
          },
        });
      },
      async loadCodexSuggestion(value) {
        dispatch({ type: 'SET_CODEX_INPUT', payload: value });
        const result = await requestCodexParse(value, {
          sessionId: state.session.id,
          connectors: state.codex.connectors,
        });
        dispatch({
          type: 'SYNC_CODEX_STATE',
          payload: result,
          meta: { source: 'codex', input: value },
        });
      },
      toggleConnector(connectorId) {
        dispatch({ type: 'TOGGLE_CONNECTOR', payload: connectorId });
      },
      runSimulation() {
        dispatch({ type: 'RUN_SIMULATION' });
      },
      executeFlow() {
        dispatch({ type: 'EXECUTE_FLOW' });
      },
      togglePracticeMode() {
        dispatch({ type: 'TOGGLE_PRACTICE_MODE' });
      },
      tickPractice() {
        dispatch({ type: 'PULSE_PRACTICE' });
      },
      applyCanvasNodeChanges(changes) {
        dispatch({ type: 'APPLY_CANVAS_NODE_CHANGES', payload: changes });
      },
      applyCanvasEdgeChanges(changes) {
        dispatch({ type: 'APPLY_CANVAS_EDGE_CHANGES', payload: changes });
      },
      connectCanvasEdge(connection) {
        dispatch({ type: 'CONNECT_CANVAS_EDGE', payload: connection });
      },
      addCanvasNode(type) {
        dispatch({ type: 'ADD_CANVAS_NODE', payload: type });
      },
    }),
    [state],
  );

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }

  return context;
}
