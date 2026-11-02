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

export function saveRegisteredUsers(users) {
  const registeredIds = new Set(users.map((user) => user.id));
  const systemUsersById = new Map(
    readStoredArray("systemUsers")
      .filter((user) => !registeredIds.has(user.id))
      .map((user) => [user.id, user]),
  );
  users.forEach(({ password, ...user }) => {
    systemUsersById.set(user.id, user);
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("systemUsers", JSON.stringify([...systemUsersById.values()]));
  window.dispatchEvent(
    new CustomEvent("app-storage-change", {
      detail: { key: "users" },
    }),
  );
}
