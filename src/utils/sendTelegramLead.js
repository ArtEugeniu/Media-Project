const TELEGRAM_API = 'https://api.telegram.org/bot';

function formatLeadMessage({ name, contact, service, message }) {
  return [
    'Новая заявка с сайта',
    '',
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    `Услуга: ${service}`,
    `Сообщение: ${message}`,
  ].join('\n');
}

export async function sendTelegramLead(formData) {
  const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error(
      'Telegram не настроен. Укажите REACT_APP_TELEGRAM_BOT_TOKEN и REACT_APP_TELEGRAM_CHAT_ID в .env'
    );
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
    throw new Error(data.description || 'Не удалось отправить заявку');
  }

  return data;
}
