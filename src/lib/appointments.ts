export const APPOINTMENT_STATUSES = ["new", "rendezvous", "payement", "completed"] as const;
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  new: "Nouveau",
  rendezvous: "Rendez-vous",
  payement: "Paiement",
  completed: "Termine",
};

export const getAppointmentStatusLabel = (status: string) => {
  if (status in APPOINTMENT_STATUS_LABELS) {
    return APPOINTMENT_STATUS_LABELS[status as AppointmentStatus];
  }
  return status;
};

export const APPOINTMENT_STATUS_OPTIONS = APPOINTMENT_STATUSES.map((status) => ({
  value: status,
  label: APPOINTMENT_STATUS_LABELS[status],
}));

export const APPOINTMENT_STATUS_BADGE: Record<AppointmentStatus, string> = {
  new: "bg-amber-100 text-amber-800",
  rendezvous: "bg-blue-100 text-blue-800",
  payement: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
};

export const getAppointmentBadgeClass = (status: string) => {
  if (status in APPOINTMENT_STATUS_BADGE) {
    return APPOINTMENT_STATUS_BADGE[status as AppointmentStatus];
  }
  return "bg-slate-100 text-slate-700";
};

export const normalizeAppointmentStatus = (status?: string | null): AppointmentStatus => {
  if (status && APPOINTMENT_STATUSES.includes(status as AppointmentStatus)) {
    return status as AppointmentStatus;
  }
  return "new";
};
