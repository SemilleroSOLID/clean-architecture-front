import { links } from "../../constants/links.constant";

const Home = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: 10}}>
      <a href={links.example}>example</a>
      <a href={links.convocation}>convocations</a>
      <a>solicitudes</a>
    </div>
  );
};

export default Home;
