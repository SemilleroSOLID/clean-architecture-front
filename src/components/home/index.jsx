import { Link } from "react-router-dom";
import { Card } from "antd";
import { linksFor } from "../../constants/links.constant";
import { useAuth } from "../../hooks/useAuth";

// Start page: what the signed in user can do, according to the role (#23).
const Home = () => {
  const { session } = useAuth();
  const isAdmin = session.role === "ADMIN";
  return (
    <div className="home">
      <h2 className="home__title">Hola, {session.name}</h2>
      <div className="home__cards">
        {linksFor(session.role).map(({ url, label, description, adminDescription }) => (
          <Link key={url} to={url}>
            <Card hoverable className="home__card" title={label}>
              {(isAdmin && adminDescription) || description}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
