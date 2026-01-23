import nodemailer from "nodemailer";
import { buildAdminOtpEmail, buildAppointmentStatusEmail, buildRendezvousEmail } from "@/lib/emails";
import { getMailerConfig } from "@/lib/env";

type MailPayload = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

let cachedTransporter: nodemailer.Transporter | null = null;

const createTransporter = () => {
  const config = getMailerConfig();

  if (config.service) {
    return nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
};

const getTransporter = () => {
  if (!cachedTransporter) {
    cachedTransporter = createTransporter();
  }
  return cachedTransporter;
};

const sendMail = async ({ to, subject, text, html }: MailPayload) => {
  const transporter = getTransporter();
  const config = getMailerConfig();

  return transporter.sendMail({
    from: `Clos du Soleil <${config.from}>`,
    to,
    subject,
    text,
    html,
  });
};

export const sendRendezvousEmail = async ({
  to,
  name,
  email,
  password,
  loginUrl,
}: {
  to: string;
  name: string;
  email: string;
  password: string;
  loginUrl: string;
}) => {
  const { subject, text, html } = buildRendezvousEmail({ name, email, password, loginUrl });
  return sendMail({ to, subject, text, html });
};

export const sendAdminOtpEmail = async ({ to, otp }: { to: string; otp: string }) => {
  const { subject, text, html } = buildAdminOtpEmail({ otp });
  return sendMail({ to, subject, text, html });
};

export const sendAppointmentStatusEmail = async ({
  to,
  name,
  status,
  price,
  rendezvousDate,
  tunisDate,
  notes,
  loginUrl,
}: {
  to: string;
  name: string;
  status: string;
  price?: number | null;
  rendezvousDate?: string | null;
  tunisDate?: string | null;
  notes?: string | null;
  loginUrl: string;
}) => {
  const { subject, text, html } = buildAppointmentStatusEmail({
    name,
    status,
    price,
    rendezvousDate,
    tunisDate,
    notes,
    loginUrl,
  });

  return sendMail({ to, subject, text, html });
};
