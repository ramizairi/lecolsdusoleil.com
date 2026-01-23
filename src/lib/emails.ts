import { getAppointmentStatusLabel } from "@/lib/appointments";

type EmailTemplate = {
  subject: string;
  text: string;
  html: string;
};

export const buildRendezvousEmail = ({
  name,
  email,
  password,
  loginUrl,
}: {
  name: string;
  email: string;
  password: string;
  loginUrl: string;
}): EmailTemplate => {
  const subject = "Votre rendez-vous chez Clos du Soleil";

  const text = [
    `Bonjour ${name},`,
    "",
    "Merci pour votre demande de rendez-vous chez Clos du Soleil.",
    "Votre compte client a ete cree automatiquement.",
    "",
    "Identifiants de connexion :",
    `Email : ${email}`,
    `Mot de passe temporaire : ${password}`,
    "",
    "Connectez-vous ici :",
    loginUrl,
    "",
    "Pour votre securite, changez ce mot de passe des votre premiere connexion.",
    "",
    "A tres bientot,",
    "L'equipe Clos du Soleil",
  ].join("\n");

  const html = `
  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background:#f7f4ef; padding:32px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 12px 30px rgba(0,0,0,0.08);">
      <div style="background:linear-gradient(90deg,#f59e0b,#f97316,#fb7185); padding:22px 28px; color:#ffffff;">
        <h1 style="margin:0; font-size:22px; letter-spacing:0.4px;">Clos du Soleil</h1>
        <p style="margin:6px 0 0; font-size:14px; opacity:0.9;">Confirmation de votre rendez-vous</p>
      </div>
      <div style="padding:28px; color:#2d241b;">
        <p style="font-size:16px; margin:0 0 12px;">Bonjour ${name},</p>
        <p style="font-size:15px; line-height:1.6; margin:0 0 16px;">
          Merci pour votre demande de rendez-vous chez Clos du Soleil. Votre compte client vient d'etre cree automatiquement.
        </p>
        <div style="background:#fff7ed; border:1px solid #f7d7b8; border-radius:12px; padding:16px; margin:20px 0;">
          <p style="margin:0 0 10px; font-weight:600;">Vos identifiants :</p>
          <p style="margin:0; font-size:14px;">Email : <strong>${email}</strong></p>
          <p style="margin:8px 0 0; font-size:14px;">Mot de passe temporaire : <strong>${password}</strong></p>
        </div>
        <a href="${loginUrl}" style="display:inline-block; padding:12px 20px; background:#f97316; color:#ffffff; text-decoration:none; border-radius:999px; font-weight:600; font-size:14px;">Se connecter</a>
        <p style="font-size:12px; color:#6b5e51; margin:18px 0 0;">
          Pour votre securite, nous vous invitons a modifier ce mot de passe des votre premiere connexion.
        </p>
      </div>
      <div style="padding:16px 28px 22px; font-size:12px; color:#8b7b6d; border-top:1px solid #f0e7dd;">
        <p style="margin:0;">A tres bientot,</p>
        <p style="margin:4px 0 0;">L'equipe Clos du Soleil</p>
      </div>
    </div>
  </div>
  `;

  return { subject, text, html };
};

export const buildAdminOtpEmail = ({ otp }: { otp: string }): EmailTemplate => {
  const subject = "Votre code administrateur";

  const text = [
    "Bonjour,",
    "",
    "Votre code de verification administrateur est :",
    otp,
    "",
    "Ce code expire dans 10 minutes.",
    "",
    "Si vous n'etes pas a l'origine de cette demande, ignorez cet email.",
  ].join("\n");

  const html = `
  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background:#f7f4ef; padding:32px;">
    <div style="max-width:520px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 12px 30px rgba(0,0,0,0.08);">
      <div style="background:linear-gradient(90deg,#f59e0b,#f97316,#fb7185); padding:18px 24px; color:#ffffff;">
        <h1 style="margin:0; font-size:20px;">Clos du Soleil</h1>
        <p style="margin:6px 0 0; font-size:13px; opacity:0.9;">Code administrateur</p>
      </div>
      <div style="padding:24px; color:#2d241b;">
        <p style="font-size:15px; margin:0 0 12px;">Bonjour,</p>
        <p style="margin:0 0 14px;">Voici votre code de verification :</p>
        <div style="font-size:26px; font-weight:700; letter-spacing:6px; background:#fff7ed; border:1px solid #f7d7b8; padding:14px 18px; border-radius:12px; display:inline-block;">
          ${otp}
        </div>
        <p style="font-size:12px; color:#6b5e51; margin:16px 0 0;">Ce code expire dans 10 minutes.</p>
      </div>
    </div>
  </div>
  `;

  return { subject, text, html };
};

export const buildAppointmentStatusEmail = ({
  name,
  status,
  price,
  rendezvousDate,
  tunisDate,
  notes,
  loginUrl,
}: {
  name: string;
  status: string;
  price?: number | null;
  rendezvousDate?: string | null;
  tunisDate?: string | null;
  notes?: string | null;
  loginUrl: string;
}): EmailTemplate => {
  const subject = "Mise a jour de votre dossier";
  const statusLabel = getAppointmentStatusLabel(status);

  const lines = [
    `Bonjour ${name},`,
    "",
    "Une mise a jour a ete effectuee sur votre dossier.",
    `Statut : ${statusLabel}`,
  ];

  if (rendezvousDate) {
    lines.push(`Rendez-vous : ${rendezvousDate}`);
  }

  if (tunisDate) {
    lines.push(`Date en Tunisie : ${tunisDate}`);
  }

  if (typeof price === "number") {
    lines.push(`Montant a regler : ${price} EUR`);
  }

  if (notes) {
    lines.push("", `Note : ${notes}`);
  }

  lines.push("", `Acces a votre espace : ${loginUrl}`, "", "Cordialement,", "Clos du Soleil");

  const detailRows = [
    `<p style="margin:0 0 8px;">Statut : <strong>${statusLabel}</strong></p>`,
  ];

  if (rendezvousDate) {
    detailRows.push(`<p style="margin:0 0 8px;">Rendez-vous : <strong>${rendezvousDate}</strong></p>`);
  }

  if (tunisDate) {
    detailRows.push(`<p style="margin:0 0 8px;">Date en Tunisie : <strong>${tunisDate}</strong></p>`);
  }

  if (typeof price === "number") {
    detailRows.push(`<p style="margin:0 0 8px;">Montant a regler : <strong>${price} EUR</strong></p>`);
  }

  if (notes) {
    detailRows.push(`<p style="margin:12px 0 0;">Note : ${notes}</p>`);
  }

  const html = `
  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background:#f7f4ef; padding:32px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 12px 30px rgba(0,0,0,0.08);">
      <div style="background:linear-gradient(90deg,#f59e0b,#f97316,#fb7185); padding:18px 24px; color:#ffffff;">
        <h1 style="margin:0; font-size:20px;">Clos du Soleil</h1>
        <p style="margin:6px 0 0; font-size:13px; opacity:0.9;">Mise a jour de votre dossier</p>
      </div>
      <div style="padding:24px; color:#2d241b;">
        <p style="font-size:15px; margin:0 0 10px;">Bonjour ${name},</p>
        <p style="margin:0 0 16px;">Une mise a jour a ete effectuee sur votre dossier.</p>
        <div style="background:#fff7ed; border:1px solid #f7d7b8; border-radius:12px; padding:16px;">
          ${detailRows.join("")}
        </div>
        <a href="${loginUrl}" style="display:inline-block; margin-top:16px; padding:12px 20px; background:#f97316; color:#ffffff; text-decoration:none; border-radius:999px; font-weight:600; font-size:14px;">Acceder a mon espace</a>
      </div>
      <div style="padding:16px 24px; font-size:12px; color:#8b7b6d; border-top:1px solid #f0e7dd;">
        <p style="margin:0;">Cordialement,</p>
        <p style="margin:4px 0 0;">Clos du Soleil</p>
      </div>
    </div>
  </div>
  `;

  return { subject, text: lines.join("\n"), html };
};
