import { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactSection.scss';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  SERVICE_OPTIONS,
  TELEGRAM_HANDLE,
  TELEGRAM_URL,
} from '../../../config/site';
import { sendTelegramLead } from '../../../utils/sendTelegramLead';

const INITIAL_FORM = {
  name: '',
  contact: '',
  service: SERVICE_OPTIONS[0],
  message: '',
};

const QUICK_CONTACTS = [
  {
    id: 'telegram',
    label: 'Telegram',
    value: TELEGRAM_HANDLE,
    href: TELEGRAM_URL,
    hint: 'Самый быстрый способ связаться',
    accent: 'cyan',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21.5 3.5L2.5 10.5l6 2 2 6 3-4 5 4 3-15z"
          stroke="currentColor" strokeWidth="1.7"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    hint: 'Для подробных запросов',
    accent: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2"
          stroke="currentColor" strokeWidth="1.7" />
        <path d="M2 8l10 6 10-6"
          stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Телефон',
    value: CONTACT_PHONE,
    href: CONTACT_PHONE_HREF,
    hint: 'Молдова · WhatsApp',
    accent: 'violet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.6 10.8a15.4 15.4 0 006.6 6.6l2.2-2.2a1 1 0 011-.2 11.5 11.5 0 003.6.6 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.2 1L6.6 10.8z"
          stroke="currentColor" strokeWidth="1.7"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const blockVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function ContactSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (status !== 'idle') {
      setStatus('idle');
      setFeedback('');
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Укажите имя';
    }

    if (!form.contact.trim()) {
      nextErrors.contact = 'Укажите Telegram или телефон';
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Опишите задачу';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('loading');
    setFeedback('');

    try {
      await sendTelegramLead({
        name: form.name.trim(),
        contact: form.contact.trim(),
        service: form.service,
        message: form.message.trim(),
      });

      setStatus('success');
      setFeedback('Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
      setForm(INITIAL_FORM);
      setErrors({});
    } catch (error) {
      setStatus('error');
      setFeedback(
        error.message || 'Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.'
      );
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="contact__heading" variants={headingVariants}>
            <span className="contact__badge">Контакт</span>
            <h2 className="contact__title">
              Обсудим{' '}
              <span className="contact__title-accent">ваш проект</span>
            </h2>
            <p className="contact__description">
              Расскажите, что нужно вашему бизнесу: контент, реклама, сайт или полный цикл.
              Мы изучим задачу и свяжемся с вами.
            </p>
          </motion.div>

          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            noValidate
            variants={blockVariants}
          >
            <div className="contact__form-grid">
              <label className="contact__field">
                <span className="contact__field-label">Имя</span>
                <input
                  className={`contact__input${errors.name ? ' contact__input--error' : ''}`}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={updateField('name')}
                  placeholder="Ваше имя"
                  autoComplete="name"
                  disabled={status === 'loading'}
                />
                {errors.name && (
                  <span className="contact__field-error" role="alert">{errors.name}</span>
                )}
              </label>

              <label className="contact__field">
                <span className="contact__field-label">Контакт</span>
                <input
                  className={`contact__input${errors.contact ? ' contact__input--error' : ''}`}
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={updateField('contact')}
                  placeholder="Telegram или телефон"
                  autoComplete="tel"
                  disabled={status === 'loading'}
                />
                {errors.contact && (
                  <span className="contact__field-error" role="alert">{errors.contact}</span>
                )}
              </label>
            </div>

            <label className="contact__field">
              <span className="contact__field-label">Услуга</span>
              <div className="contact__select-wrap">
                <select
                  className="contact__select"
                  name="service"
                  value={form.service}
                  onChange={updateField('service')}
                  disabled={status === 'loading'}
                >
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className="contact__field">
              <span className="contact__field-label">Сообщение</span>
              <textarea
                className={`contact__textarea${errors.message ? ' contact__input--error' : ''}`}
                name="message"
                value={form.message}
                onChange={updateField('message')}
                placeholder="Коротко опишите задачу"
                rows={5}
                disabled={status === 'loading'}
              />
              {errors.message && (
                <span className="contact__field-error" role="alert">{errors.message}</span>
              )}
            </label>

            <div className="contact__form-footer">
              <button
                className="contact__submit"
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
              </button>

              {feedback && (
                <p
                  className={`contact__feedback contact__feedback--${status}`}
                  role={status === 'error' ? 'alert' : 'status'}
                >
                  {feedback}
                </p>
              )}
            </div>
          </motion.form>

          <motion.div className="contact__quick" variants={blockVariants}>
            <p className="contact__quick-label">Или свяжитесь напрямую</p>
            <div className="contact__grid">
              {QUICK_CONTACTS.map((item) => (
                <a
                  key={item.id}
                  className={`contact__card contact__card--${item.accent}`}
                  href={item.href}
                  target={item.id !== 'phone' ? '_blank' : undefined}
                  rel={item.id !== 'phone' ? 'noopener noreferrer' : undefined}
                >
                  <div className="contact__card-icon">{item.icon}</div>
                  <div className="contact__card-body">
                    <span className="contact__card-label">{item.label}</span>
                    <span className="contact__card-value">{item.value}</span>
                    <span className="contact__card-hint">{item.hint}</span>
                  </div>
                  <div className="contact__card-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
