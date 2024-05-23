
import { Header } from "../shared/header.component";
import { useRoutes, BrowserRouter } from "react-router-dom";
import { Init } from "./children/init.component";
import { Example } from "../example/example.component";
import { CreateConvocation } from "../convocation/index";
import { Request } from "../request/index";
import { links } from "../../constants/links.constant";


const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <Init />,
    },
    {
      path: links.example,
      element: <Example />,
    },
    {
      path: links.convocation,
      element: <CreateConvocation />,
    },
    {
      path: links.request,
      element: <Request />,
    }
  ])
  return routes;
};
const Home = () => {


  return (
    <div className="home-container">
      <div>
      <Header />
      </div>
      <main className="home-container__main">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </main>
    </div>
  );
};

export default Home;
 