"use client"

export function submitToSales({
  subject,
  body,
}: {
  subject: string
  body: string
}) {
  const mailto = `mailto:sales@rollin.ng?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = mailto
}
