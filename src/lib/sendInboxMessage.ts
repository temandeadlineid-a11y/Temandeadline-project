// Mencatat pesan pengunjung ke "Pesan Masuk" admin sebelum membuka WhatsApp.
// Fire-and-forget: kegagalan pencatatan tidak boleh menghalangi WA terbuka.

export function sendInboxMessage(data: {
  name?: string;
  service?: string;
  detail: string;
  source: string;
}) {
  try {
    fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
