// Mencatat pesan pengunjung ke "Pesan Masuk" admin.
// Fire-and-forget: kegagalan pencatatan tidak boleh mengganggu pengunjung.

export function sendInboxMessage(data: {
  name?: string;
  phone?: string;
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
