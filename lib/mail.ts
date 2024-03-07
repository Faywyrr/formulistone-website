const API_URL = `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`;

export async function sendMail(subject: string, body: string) {
  const form = new FormData();
  form.append("from", process.env.MAILGUN_FROM_EMAIL || "");
  form.append("to", process.env.MAILGUN_TO_EMAIL || "");
  form.append("subject", subject);
  form.append("text", body);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`api:${process.env.MAILGUN_API_KEY}`),
    },
    body: form,
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return response.json();
}
