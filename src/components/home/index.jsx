
import { Header } from "../shared/header.component";
import { useRoutes, BrowserRouter } from "react-router-dom";
import { Init } from "./children/init.component";
import { Example } from "./../example/example.component";
import { Convocation } from "./../convocation/index.component";


const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <Init />
    },
    {
      path: "/example",
      element: <Example />
    },
    {
      path: "/convocation",
      element: <Convocation />
    },
    {
      path: "/request",
      element: <Request />
    }
  ])
  return routes;
};
const Home = () => {


  return (
    <div className="home-container">
      <Header />
      <main className="home-container__main">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </main>
    </div>
  );
};

export default Home;
