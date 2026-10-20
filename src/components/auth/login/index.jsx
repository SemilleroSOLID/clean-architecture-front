import { useState } from "react";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Button, Card, Form, Input } from "antd";
import { LockOutlined, LoginOutlined, MailOutlined } from "@ant-design/icons";
import { useAuth } from "../../../hooks/useAuth";
import { DEV_USERS, ROLE_LABELS, SESSION_END_MESSAGES } from "../../../constants/auth.constant";
import { canOpen } from "../../../constants/links.constant";

// Login page (#23): the only page that can be seen without a session.
const Login = () => {
  const { session, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const endMessage = SESSION_END_MESSAGES[searchParams.get("reason")];
  const from = location.state?.from ?? "/";
  const targetFor = (role) => (canOpen(from, role) ? from : "/");

  if (session) {
    return <Navigate to={targetFor(session.role)} replace />;
  }

  const submit = async ({ email, password }) => {
    setSending(true);
    setError(null);
    try {
      const newSession = await signIn(email.trim(), password);
      navigate(targetFor(newSession.role), { replace: true });
    } catch (loginError) {
      setError(loginError.message);
      form.setFieldValue("password", "");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="login">
      <Card className="login__card" title="Iniciar sesión">
        {endMessage && !error && <Alert className="login__alert" type={endMessage.type} showIcon title={endMessage.title} />}
        {error && <Alert className="login__alert" type="error" showIcon title={error} />}
        <Form form={form} layout="vertical" requiredMark={false} onFinish={submit}>
          <Form.Item
            label="Correo"
            name="email"
            rules={[
              { required: true, message: "Ingrese su correo" },
              { type: "email", message: "Ingrese un correo válido" },
            ]}
          >
            <Input id="login-email" prefix={<MailOutlined />} autoComplete="username" placeholder="usuario@ucaldas.test" autoFocus />
          </Form.Item>
          <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: "Ingrese su contraseña" }]}>
            <Input.Password id="login-password" prefix={<LockOutlined />} autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block icon={<LoginOutlined />} loading={sending}>
            Ingresar
          </Button>
        </Form>
        {import.meta.env.DEV && (
          <Alert
            className="login__dev"
            type="info"
            title="Usuarios de prueba (solo en desarrollo)"
            description={
              <ul>
                {DEV_USERS.map(({ email, password, role }) => (
                  <li key={email}>
                    {ROLE_LABELS[role]}: <code>{email}</code> / <code>{password}</code>
                  </li>
                ))}
              </ul>
            }
          />
        )}
      </Card>
    </div>
  );
};

export default Login;
