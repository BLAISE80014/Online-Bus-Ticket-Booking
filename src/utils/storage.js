export function readStoredArray(key) {
  const value = localStorage.getItem(key);
  if (!value) return [];

  const parsed = JSON.parse(value);
  if (!Array.isArray(parsed)) {
    throw new Error(`Stored value for "${key}" must be an array.`);
  }
  return parsed;
}

export function writeStoredArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(
    new CustomEvent("app-storage-change", { detail: { key } }),
  );
}

export function addSystemNotification(message, type = "system") {
  const notifications = readStoredArray("notifications");
  const notification = {
    id: `NT${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    message,
    date: new Date().toLocaleString(),
    read: false,
  };
  writeStoredArray("notifications", [notification, ...notifications]);
  return notification;
}
