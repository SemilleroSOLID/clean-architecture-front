// The session of the signed in user (#23): { token, expiresAt, email, name, role, studentId }.
// It is kept in localStorage so a reload does not sign the user out; every access is guarded because
// storage can be blocked (private windows, cleared site data).
const SESSION_KEY = "session";

export const readSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveSession = (session) => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Without storage the session lives only in memory until the page is reloaded.
  }
};

export const clearSession = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Nothing to clear.
  }
};

export const isSessionExpired = (session, now = Date.now()) => !session?.expiresAt || Date.parse(session.expiresAt) <= now;
