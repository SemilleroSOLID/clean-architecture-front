import { LINKS } from "../../constants/links.constant";

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <ul>
        <li>
          <a type="primary" href={LINKS.example.url}>
            example
          </a>
        </li>
        <li>
          <a href={LINKS.convocation.url}>convocations</a>
        </li>
        <li>
          <a href={LINKS.request.url}>request</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
