import { Outlet } from "react-router-dom";
import Footer from "./children/footer.component";
import Header from "./children/header.component";

// Root route: header and footer around the current page, inside the router so the header can navigate.
const ContentLayout = () => {
  return (
    <div className="layout">
      <div>
        <Header />
      </div>
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ContentLayout;
