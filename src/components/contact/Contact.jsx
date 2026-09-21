import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

/* Clés EmailJS publiques (surchargeables via .env : VITE_EMAILJS_*) */
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_gjhs94d",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_i8queid",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "ID02cnIwxSCL9HOqx",
};

const contactCards = [
  {
    icon: "uil-envelope",
    title: "Email",
    data: "nagoloumtalladanielparfait@gmail.com",
    display: "nagoloum***@gmail.com",
    href: "mailto:nagoloumtalladanielparfait@gmail.com",
    label: "Écrire un email",
  },
  {
    icon: "uil-phone",
    title: "Téléphone",
    data: "+33 6 25 83 90 07",
    href: "tel:+33625839007",
    label: "Appeler",
  },
  {
    icon: "uil-linkedin-alt",
    title: "LinkedIn",
    data: "linkedin.com/in/nagoloum",
    href: "https://www.linkedin.com/in/nagoloum",
    label: "Voir le profil LinkedIn",
    action: "Visiter",
  },
  {
    icon: "uil-github-alt",
    title: "GitHub",
    data: "github.com/nagoloumdaniel",
    href: "https://github.com/nagoloumdaniel",
    label: "Voir le profil GitHub",
    action: "Visiter",
  },
];

const LIMITS = { name: 80, email: 254, message: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: "", email: "", message: "" };

const validate = ({ name, email, message }) => {
  const errors = {};
  const n = name.trim();
  const e = email.trim();
  const m = message.trim();

  if (!n) errors.name = "Indiquez votre nom.";
  else if (n.length < 2) errors.name = "Le nom doit contenir au moins 2 caractères.";

  if (!e) errors.email = "Indiquez votre adresse email.";
  else if (!EMAIL_RE.test(e)) errors.email = "Adresse email invalide (ex. nom@domaine.fr).";

  if (!m) errors.message = "Écrivez votre message.";
  else if (m.length < 10) errors.message = "Votre message doit contenir au moins 10 caractères.";

  return errors;
};

/* États du bouton d'envoi : contenu + message annoncé sous le bouton */
const SUBMIT = {
  idle:    { icon: "uil-message",              text: "Envoyer le message", note: "" },
  sending: { icon: "uil-spinner-alt",          text: "Envoi en cours…",   note: "" },
  success: { icon: "uil-check-circle",         text: "Message envoyé",    note: "Merci ! Je vous réponds rapidement." },
  error:   { icon: "uil-exclamation-triangle", text: "Échec de l'envoi",  note: "L'envoi a échoué. Réessayez dans un instant ou écrivez-moi par email." },
};
const RESET_DELAY = 3500;

const formatDate = (d) =>
  d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }) +
  " à " +
  d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

const Field = ({ id, label, error, children }) => (
  <div className={`contact__field${error ? " contact__field--invalid" : ""}`}>
    <label htmlFor={id} className="contact__label">{label}</label>
    {children}
    {/* Espace réservé : l'apparition d'une erreur ne décale pas le formulaire */}
    <p id={`${id}-error`} className="contact__error">{error}</p>
  </div>
);

const Contact = () => {
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  /* Retour à l'état normal après une confirmation ou une erreur */
  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const t = setTimeout(() => setStatus("idle"), RESET_DELAY);
    return () => clearTimeout(t);
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    /* Les erreurs n'apparaissent qu'au clic sur « Envoyer » ;
       une erreur affichée disparaît dès que le champ est corrigé */
    if (errors[name] && !validate(next)[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(values);
    setErrors(found);
    const firstInvalid = ["name", "email", "message"].find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          date: formatDate(new Date()),
        },
        EMAILJS.publicKey,
      );
      setValues(EMPTY);
      setErrors({});
      setStatus("success");
    } catch (error) {
      /* Aucun détail technique affiché ; trace uniquement en développement */
      if (import.meta.env.DEV) console.error("EmailJS :", error);
      setStatus("error");
    }
  };

  const inputProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    maxLength: LIMITS[name],
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": `contact-${name}-error`,
  });

  const submit = SUBMIT[status];

  return (
    <section className="contact section" id="contact">
      <span className="section__subtitle">Travaillons ensemble</span>
      <h2 className="section__title reveal">Entrer en contact</h2>

      <div className="contact__container container grid">
        <div className="contact__col reveal-left d2">
          <div className="contact__info">
            {contactCards.map(({ icon, title, data, display, href, label, action = "Contacter" }) => {
              const external = href.startsWith("http");
              return (
                <a
                  key={title}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="contact__card"
                  aria-label={`${label} : ${data}`}
                >
                  <span className="contact__card-icon-wrap">
                    <i className={`uil ${icon} contact__card-icon`} />
                  </span>
                  <span className="contact__card-title">{title}</span>
                  <span className="contact__card-data">{display || data}</span>
                  <span className="contact__button" aria-hidden="true">
                    {action}{" "}
                    <i className="uil uil-arrow-right contact__button-icon" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="contact__col reveal-right d2">
          <form ref={formRef} onSubmit={sendEmail} className="contact__form" noValidate>
            <Field id="contact-name" label="Nom" error={errors.name}>
              <input
                {...inputProps("name")}
                type="text"
                autoComplete="name"
                className="contact__input"
                placeholder="Votre nom complet"
              />
            </Field>

            <Field id="contact-email" label="Email" error={errors.email}>
              <input
                {...inputProps("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                className="contact__input"
                placeholder="nom@domaine.fr"
              />
            </Field>

            <div className="contact__field-grow">
              <Field id="contact-message" label="Message" error={errors.message}>
                <textarea
                  {...inputProps("message")}
                  className="contact__input contact__textarea"
                  placeholder="Présentez votre entreprise, le poste ou votre projet"
                />
              </Field>
            </div>

            <div className="contact__actions">
              <button
                type="submit"
                className="button button--flex contact__submit"
                data-state={status}
                disabled={status !== "idle"}
                aria-busy={status === "sending"}
              >
                {/* key : remonte le contenu à chaque état pour rejouer l'animation d'entrée */}
                <span key={status} className="contact__submit-content">
                  <i className={`uil ${submit.icon} contact__submit-icon`} aria-hidden="true" />
                  {submit.text}
                </span>
              </button>
              <p className="contact__note" data-state={status} role="status" aria-live="polite">
                {submit.note}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
