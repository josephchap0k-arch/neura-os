import { parseAutomationInput } from './parser';

export function buildDefaultConnectors() {
  return [
    {
      id: 'gmail',
      name: 'Gmail',
      brand: 'brand-gmail',
      icon: 'gmail',
      account: 'ops@neura.ai',
      description: 'Mails, respuestas VIP y enrutamiento inmediato.',
      connected: true,
      statusLabel: 'Conectado',
    },
    {
      id: 'slack',
      name: 'Slack',
      brand: 'brand-slack',
      icon: 'slack',
      account: '#neura-ops',
      description: 'Alertas internas y coordinacion en tiempo real.',
      connected: true,
      statusLabel: 'Conectado',
    },
    {
      id: 'drive',
      name: 'Drive',
      brand: 'brand-drive',
      icon: 'drive',
      account: 'Archivo central NEURA',
      description: 'Resguardos, reportes y evidencia operativa.',
      connected: true,
      statusLabel: 'Conectado',
    },
    {
      id: 'notion',
      name: 'Notion',
      brand: 'brand-notion',
      icon: 'notion',
      account: 'Espacio ejecutivo',
      description: 'Base de conocimiento y tareas activas.',
      connected: false,
      statusLabel: 'Desconectado',
    },
    {
      id: 'github',
      name: 'GitHub',
      brand: 'brand-github',
      icon: 'github',
      account: 'neura/codex',
      description: 'Issues, PRs y trazabilidad tecnica.',
      connected: true,
      statusLabel: 'Conectado',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      brand: 'brand-whatsapp',
      icon: 'whatsapp',
      account: 'Linea comercial',
      description: 'Mensajeria de alta prioridad para clientes.',
      connected: false,
      statusLabel: 'Desconectado',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      brand: 'brand-stripe',
      icon: 'stripe',
      account: 'Cobros premium',
      description: 'Pagos, eventos de suscripcion y alertas de revenue.',
      connected: false,
      statusLabel: 'Desconectado',
    },
  ];
}

export function buildInitialCodexState(input, connectors = buildDefaultConnectors()) {
  const payload = buildCodexPayload(input, connectors);

  return {
    input,
    connectors,
    requests: [],
    practiceMode: true,
    practicePulse: 0,
    ...payload,
  };
}

export function buildCodexPayload(input, connectors = buildDefaultConnectors()) {
  const parsed = parseAutomationInput(input);

  return {
    input,
    parsed,
    flow: buildFlow(parsed, connectors),
    simulation: buildSimulation(parsed, connectors),
    execution: buildExecution(parsed),
    logs: buildLogs(parsed, connectors),
    canvas: buildCanvasFromParsed(input, parsed, connectors),
  };
}

export function buildPracticeLogEntry(codex) {
  const pulseMessages = [
    {
      title: 'Parser observando intencion',
      message: `Se confirmo ${codex.parsed.trigger.toLowerCase()} como disparador principal.`,
    },
    {
      title: 'Canvas cognitivo en movimiento',
      message: `El flujo hacia ${codex.parsed.platformLabel} sigue ensayando una salida sin tocar backend real.`,
    },
    {
      title: 'IA ejecutiva ajustando conexiones',
      message: `NEURA reordeno ${codex.parsed.action.toLowerCase()} para la siguiente fase del recorrido.`,
    },
    {
      title: 'Memoria operativa viva',
      message: 'La sesion inteligente guardo la intencion y el mapa visual de la automatizacion.',
    },
  ];

  const pulse = pulseMessages[codex.practicePulse % pulseMessages.length];

  return {
    id: `practice-${Date.now()}`,
    level: codex.practicePulse % 2 === 0 ? 'info' : 'success',
    title: pulse.title,
    message: pulse.message,
    time: 'Ahora',
  };
}

export function buildCanvasAddonNode(type, canvas) {
  const nodeCount = canvas.nodes.length;
  const x = 140 + nodeCount * 260;
  const y = nodeCount % 2 === 0 ? 120 : 280;

  switch (type) {
    case 'condition':
      return createCanvasNode({
        id: `condition-${Date.now()}`,
        type: 'condition',
        position: { x, y },
        data: {
          title: 'IF',
          subtitle: 'Filtro conversacional',
          description: 'Agrega una condicion visual para decidir si el flujo continua.',
          accent: '#7B4DFF',
          runtimeState: 'idle',
        },
      });
    case 'delay':
      return createCanvasNode({
        id: `delay-${Date.now()}`,
        type: 'delay',
        position: { x, y },
        data: {
          title: 'Espera',
          subtitle: 'Espera inteligente',
          description: 'Introduce una pausa visual antes del siguiente nodo.',
          accent: '#35D8FF',
          runtimeState: 'idle',
        },
      });
    case 'agent':
    default:
      return createCanvasNode({
        id: `agent-${Date.now()}`,
        type: 'agent',
        position: { x, y },
        data: {
          title: 'Agente IA',
          subtitle: 'Memoria + parser',
          description: 'Nodo cognitivo extra para decidir o reescribir la accion.',
          accent: '#00E5FF',
          runtimeState: 'idle',
        },
      });
  }
}

export function buildCanvasConnectionEdge(source, target, label = 'Ruta') {
  return {
    id: `edge-${source}-${target}-${Date.now()}`,
    source,
    target,
    type: 'neura',
    animated: true,
    data: { label },
  };
}

function buildFlow(parsed, connectors) {
  const connector = connectors.find((item) => item.id === parsed.platform);
  const connectorStatus = connector?.connected ? 'conector premium enlazado' : 'pendiente de enlace';

  return [
    {
      id: 'trigger',
      title: 'Trigger',
      description: `${parsed.trigger} inicia el flujo bajo ${parsed.schedule.label.toLowerCase()}.`,
    },
    {
      id: 'action',
      title: 'Accion',
      description: `${parsed.action} se vuelve la orden dominante de la automatizacion.`,
    },
    {
      id: 'platform',
      title: 'Plataforma',
      description: `${parsed.platformLabel} queda seleccionada como salida principal con ${connectorStatus}.`,
    },
    {
      id: 'schedule',
      title: 'Horario',
      description: `${parsed.schedule.label} queda registrado en la sesion activa para ejecucion futura.`,
    },
  ];
}

function buildSimulation(parsed, connectors) {
  const connector = connectors.find((item) => item.id === parsed.platform);
  const connectorBoost = connector?.connected ? 5 : -6;
  const base = clamp(parsed.confidence + connectorBoost);
  const metrics = [
    { label: 'Velocidad', value: clamp(base + 2) },
    { label: 'Cobertura', value: clamp(base - 2) },
    { label: 'Precision', value: clamp(base + 1) },
    { label: 'Estabilidad', value: clamp(base + 3) },
  ];

  return {
    score: Math.round(metrics.reduce((sum, metric) => sum + metric.value, 0) / metrics.length),
    metrics,
    summary: connector?.connected
      ? `${parsed.platformLabel} ya esta dentro del ecosistema activo, asi que el flujo puede ensayarse y luego escalar sin salir de NEURA.`
      : `${parsed.platformLabel} todavia necesita conexion real. Mientras tanto, NEURA conserva una simulacion viva y segura.`,
  };
}

function buildExecution(parsed) {
  return [
    {
      id: 'ingest',
      label: 'Lectura del contexto',
      detail: `Analizando intencion, memoria y senal operativa para ${parsed.platformLabel}.`,
      status: 'done',
    },
    {
      id: 'routing',
      label: 'Diseno del flujo',
      detail: `Trazando ${parsed.action.toLowerCase()} con ${parsed.schedule.label.toLowerCase()}.`,
      status: parsed.schedule.type === 'instant' ? 'active' : 'queued',
    },
    {
      id: 'dispatch',
      label: 'Ejecucion simulada',
      detail: 'Listo para avanzar en modo practica o escalar a salida real.',
      status: 'queued',
    },
  ];
}

function buildLogs(parsed, connectors) {
  const connector = connectors.find((item) => item.id === parsed.platform);

  return [
    {
      id: 'log-1',
      level: 'success',
      title: 'Parser listo',
      message: `Detecte ${parsed.trigger.toLowerCase()} y lo traduje a ${parsed.action.toLowerCase()}.`,
      time: 'Ahora',
    },
    {
      id: 'log-2',
      level: connector?.connected ? 'success' : 'warning',
      title: 'Conector inspeccionado',
      message: connector?.connected
        ? `${parsed.platformLabel} ya conversa con la sesion activa.`
        : `${parsed.platformLabel} necesita conexion antes de una ejecucion real.`,
      time: 'Ahora',
    },
    {
      id: 'log-3',
      level: 'info',
      title: 'Canvas generado',
      message: 'NEURA dibujo el flujo automaticamente y dejo las conexiones listas para editar.',
      time: 'Ahora',
    },
  ];
}

function buildCanvasFromParsed(input, parsed, connectors) {
  const nodes = [];
  const edges = [];
  const shouldAddDelay = /(espera|esperar|delay|despues|despu[eé]s)/i.test(input);
  const shouldAddCondition = /(si |solo si|if |condicion|condici[oó]n|filtro)/i.test(input);

  const triggerNode = buildTriggerCanvasNode(input, parsed);
  const agentNode = createCanvasNode({
    id: 'agent-node',
    type: 'agent',
    position: { x: 340, y: 140 },
    data: {
      title: 'Agente IA',
      subtitle: 'Interpreta y decide',
      description: `${parsed.trigger} + ${parsed.action}`,
      accent: '#00E5FF',
      runtimeState: 'active',
    },
  });

  nodes.push(triggerNode, agentNode);

  let previousNode = agentNode;
  let lastX = 640;

  if (shouldAddCondition) {
    const conditionNode = createCanvasNode({
      id: 'condition-node',
      type: 'condition',
      position: { x: 640, y: 140 },
      data: {
        title: 'Condicion',
        subtitle: 'Filtro',
        description: 'Solo avanza si la condicion se cumple.',
        accent: '#7B4DFF',
        runtimeState: 'idle',
      },
    });
    nodes.push(conditionNode);
    edges.push(buildCanvasConnectionEdge(previousNode.id, conditionNode.id, 'Evaluar'));
    previousNode = conditionNode;
    lastX = 940;
  }

  if (shouldAddDelay) {
    const delayNode = createCanvasNode({
      id: 'delay-node',
      type: 'delay',
      position: { x: lastX, y: 140 },
      data: {
        title: 'Espera',
        subtitle: 'Pausa',
        description: parsed.schedule.label,
        accent: '#35D8FF',
        runtimeState: 'idle',
      },
    });
    nodes.push(delayNode);
    edges.push(buildCanvasConnectionEdge(previousNode.id, delayNode.id, 'Esperar'));
    previousNode = delayNode;
    lastX += 300;
  }

  const platformNode = buildPlatformCanvasNode(parsed, connectors, lastX);
  nodes.push(platformNode);

  edges.unshift(buildCanvasConnectionEdge(triggerNode.id, agentNode.id, 'Interpretar'));
  edges.push(buildCanvasConnectionEdge(previousNode.id, platformNode.id, 'Ejecutar'));

  return {
    nodes,
    edges,
  };
}

function buildTriggerCanvasNode(input, parsed) {
  if (parsed.schedule.type !== 'smart' || /(todos los dias|cada dia|cada semana|9am|am|pm|horario)/i.test(input)) {
    return createCanvasNode({
      id: 'trigger-node',
      type: 'trigger',
      position: { x: 40, y: 140 },
      data: {
        title: 'Trigger diario',
        subtitle: parsed.schedule.label,
        description: 'Se activa por horario.',
        accent: '#35D8FF',
        runtimeState: 'done',
      },
    });
  }

  if (/(gmail|correo|mail)/i.test(input)) {
    return createCanvasNode({
      id: 'trigger-node',
      type: 'trigger',
      position: { x: 40, y: 140 },
      data: {
        title: 'Trigger Gmail',
        subtitle: parsed.trigger,
        description: 'Se activa cuando llega un correo.',
        accent: '#00E5FF',
        runtimeState: 'done',
      },
    });
  }

  if (/webhook/i.test(input)) {
    return createCanvasNode({
      id: 'trigger-node',
      type: 'trigger',
      position: { x: 40, y: 140 },
      data: {
        title: 'Trigger webhook',
        subtitle: 'Evento externo',
        description: 'Se activa desde otro sistema.',
        accent: '#00E5FF',
        runtimeState: 'done',
      },
    });
  }

  return createCanvasNode({
    id: 'trigger-node',
    type: 'trigger',
    position: { x: 40, y: 140 },
    data: {
      title: 'Trigger manual',
      subtitle: parsed.trigger,
      description: 'Se activa desde una orden en NEURA.',
      accent: '#00E5FF',
      runtimeState: 'done',
    },
  });
}

function buildPlatformCanvasNode(parsed, connectors, xPosition) {
  const connector = connectors.find((item) => item.id === parsed.platform);
  const baseData = {
    subtitle: connector?.connected ? 'Conectado' : 'Pendiente',
    accent: '#7B4DFF',
    runtimeState: 'idle',
  };

  const typeMap = {
    gmail: {
      type: 'gmail',
      title: 'Gmail',
      description: 'Enviar o responder mensajes.',
    },
    slack: {
      type: 'slack',
      title: 'Slack',
      description: 'Enviar alertas o mensajes.',
    },
    drive: {
      type: 'drive',
      title: 'Drive',
      description: 'Guardar archivos o reportes.',
    },
    notion: {
      type: 'service',
      title: 'Notion',
      description: 'Registrar informacion.',
    },
    github: {
      type: 'service',
      title: 'GitHub',
      description: 'Crear seguimiento tecnico.',
    },
    whatsapp: {
      type: 'service',
      title: 'WhatsApp',
      description: 'Enviar mensajes urgentes.',
    },
    stripe: {
      type: 'service',
      title: 'Stripe',
      description: 'Reaccionar a cobros o suscripciones.',
    },
  };

  const platformConfig = typeMap[parsed.platform] ?? {
    type: 'service',
    title: parsed.platformLabel,
    description: 'Ejecuta la accion en la plataforma elegida.',
  };

  return createCanvasNode({
    id: 'platform-node',
    type: platformConfig.type,
    position: { x: xPosition, y: 140 },
    data: {
      title: platformConfig.title,
      description: platformConfig.description,
      ...baseData,
    },
  });
}

function createCanvasNode(config) {
  return {
    draggable: true,
    selectable: true,
    ...config,
  };
}

function clamp(value) {
  return Math.max(24, Math.min(98, value));
}
