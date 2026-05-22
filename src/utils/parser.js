const triggerPatterns = [
  { test: /(cuando llegue|nuevo lead|lead|formulario)/i, value: 'Nuevo lead detectado' },
  { test: /(respuesta|reply|correo|gmail|mail vip|mails vip)/i, value: 'Respuesta prioritaria' },
  { test: /(quiero automatizar|automatizar|automation)/i, value: 'Intencion de automatizacion' },
  { test: /(pago|suscripcion|stripe|compra)/i, value: 'Evento comercial' },
  { test: /(lunes|cada semana|weekly|resumen)/i, value: 'Rutina programada' },
];

const actionPatterns = [
  { test: /(notifica|avis|slack|alerta)/i, value: 'Notificar al equipo' },
  { test: /(crear|tarea|task|notion)/i, value: 'Crear tarea operativa' },
  { test: /(guardar|drive|archivo|documento|sheets|sheet)/i, value: 'Guardar registro operativo' },
  { test: /(enviar|correo|mail|gmail|responder)/i, value: 'Enviar mensaje' },
  { test: /(cobro|factura|stripe)/i, value: 'Monitorear movimiento financiero' },
  { test: /(automatizar|automation)/i, value: 'Orquestar automatizacion' },
];

const platformPatterns = [
  { test: /slack/i, value: 'slack', label: 'Slack' },
  { test: /gmail|correo|email|mail/i, value: 'gmail', label: 'Gmail' },
  { test: /drive|google drive|sheet|sheets/i, value: 'drive', label: 'Drive' },
  { test: /notion/i, value: 'notion', label: 'Notion' },
  { test: /github|git hub|pull request|repo/i, value: 'github', label: 'GitHub' },
  { test: /whatsapp|wa/i, value: 'whatsapp', label: 'WhatsApp' },
  { test: /stripe|pago|suscripcion/i, value: 'stripe', label: 'Stripe' },
];

export function detectTrigger(input) {
  return triggerPatterns.find((pattern) => pattern.test.test(input))?.value ?? 'Evento manual';
}

export function detectAction(input) {
  return actionPatterns.find((pattern) => pattern.test.test(input))?.value ?? 'Ejecutar automatizacion';
}

export function detectPlatform(input) {
  return (
    platformPatterns.find((pattern) => pattern.test.test(input)) ?? {
      value: 'gmail',
      label: 'Gmail',
    }
  );
}

export function detectSchedule(input) {
  if (/(instante|inmediat|ahora|al instante|urgente)/i.test(input)) {
    return { type: 'instant', label: 'Salida inmediata' };
  }

  if (/(cada manana|cada mañana|daily|todos los dias|todos los dias a las)/i.test(input)) {
    return { type: 'daily', label: 'Trigger diario' };
  }

  if (/(lunes|cada semana|weekly|semanal)/i.test(input)) {
    return { type: 'weekly', label: 'Trigger semanal' };
  }

  return { type: 'smart', label: 'Deteccion inteligente' };
}

export function parseAutomationInput(input) {
  const trigger = detectTrigger(input);
  const action = detectAction(input);
  const platform = detectPlatform(input);
  const schedule = detectSchedule(input);
  const confidence = calculateConfidence({ trigger, action, platform, schedule, input });

  return {
    trigger,
    action,
    platform: platform.value,
    platformLabel: platform.label,
    schedule,
    confidence,
  };
}

function calculateConfidence({ trigger, action, platform, schedule, input }) {
  let score = 54;

  if (trigger !== 'Evento manual') score += 10;
  if (action !== 'Ejecutar automatizacion') score += 12;
  if (platform.value !== 'gmail') score += 8;
  if (schedule.type !== 'smart') score += 8;
  if (/quiero automatizar/i.test(input)) score += 6;
  if (input.length > 70) score += 4;

  return Math.min(score, 97);
}
