import i18n from '../i18n';

const TELEGRAM_API = 'https://api.telegram.org/bot';

function formatLeadMessage({ name, contact, service, message }) {
  const t = (key) => i18n.t(key, { ns: 'contact' });

  return [
    t('telegram.leadTitle'),
    '',
    `${t('telegram.name')}: ${name}`,
    `${t('telegram.contact')}: ${contact}`,
    `${t('telegram.service')}: ${service}`,
    `${t('telegram.message')}: ${message}`,
  ].join('\n');
}

export async function sendTelegramLead(formData) {
  const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error(i18n.t('contact:feedback.telegramNotConfigured'));
  }

  const response = await fetch(`${TELEGRAM_API}${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLeadMessage(formData),
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.description || i18n.t('contact:feedback.sendFailed'));
  }

  return data;
}
