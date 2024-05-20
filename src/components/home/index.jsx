import { links } from "../../constants/links.constant";

const Home = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: 10}}>
      <ul>
        <li><a type="primary" href={links.example}>example</a></li>
        <li><a href={links.convocation}>convocations</a></li>
        <li><a href={links.request}>request</a></li>
      </ul>
    </div>
  );
};

export default Home;
