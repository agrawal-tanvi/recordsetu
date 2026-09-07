const API_BASE_URL = import.meta.env.VITE_API_BASE_URL !== undefined
  ? import.meta.env.VITE_API_BASE_URL
  : (import.meta.env.DEV ? "http://127.0.0.1:8000" : "");

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/api/documents/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Document upload failed");
  }

  return response.json();
}

export async function processDocument(documentId) {
  const response = await fetch(
    `${API_BASE_URL}/api/documents/${documentId}/process`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Document processing failed");
  }

  return response.json();
}

export async function getDocument(documentId) {
  const response = await fetch(
    `${API_BASE_URL}/api/documents/${documentId}`
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Could not fetch document");
  }

  return response.json();
}

export async function getReviewQueue() {
  const response = await fetch(
    `${API_BASE_URL}/api/review-queue`
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Could not fetch review queue");
  }

  return response.json();
}

export async function getAuditLog(documentId) {
  const response = await fetch(
    `${API_BASE_URL}/api/audit/${documentId}`
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Could not fetch audit log");
  }

  return response.json();
}
export async function updateReview(documentId, reviewData) {
  const response = await fetch(
    `${API_BASE_URL}/api/review/${documentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Review update failed");
  }

  return response.json();
}

export async function searchLandRecords(params = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  }

  const queryString = query.toString();
  const url = `${API_BASE_URL}/api/search${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to search land records");
  }

  return response.json();
}