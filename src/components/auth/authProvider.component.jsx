import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { login } from "../../services/auth.service";
import { LINKS } from "../../constants/links.constant";
import { SESSION_END_REASONS } from "../../constants/auth.constant";
import { clearSession, isSessionExpired, readSession, saveSession } from "../../utils/session.util";

// A session saved in a previous visit is only used if its token has not expired. It must stay pure:
// StrictMode calls it twice, so the expired session is removed in an effect, not here.
const initialState = () => {
  const stored = readSession();
  if (stored && isSessionExpired(stored)) {
    return { session: null, endedReason: SESSION_END_REASONS.expired };
  }
  return { session: stored, endedReason: null };
};

// Holds the session of the user (#23): sign in, sign out and the end of the session when the token expires.
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [{ session, endedReason }, setState] = useState(initialState);

  const signIn = useCallback(async (email, password) => {
    const newSession = await login(email, password);
    saveSession(newSession);
    setState({ session: newSession, endedReason: null });
    return newSession;
  }, []);

  const signOut = useCallback(
    (reason = SESSION_END_REASONS.logout) => {
      clearSession();
      setState({ session: null, endedReason: reason });
      navigate(`${LINKS.login.url}?reason=${reason}`, { replace: true });
    },
    [navigate]
  );

  useEffect(() => {
    if (isSessionExpired(readSession())) clearSession();
  }, []);

  // The token expires even if the user does nothing: back to the login at that moment.
  useEffect(() => {
    if (!session) return undefined;
    const timer = setTimeout(() => signOut(SESSION_END_REASONS.expired), Date.parse(session.expiresAt) - Date.now());
    return () => clearTimeout(timer);
  }, [session, signOut]);

  const value = useMemo(() => ({ session, endedReason, signIn, signOut }), [session, endedReason, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
