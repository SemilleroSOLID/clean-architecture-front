import Footer from "./children/footer.component";
import Header from "./children/header.component";
import PropTypes from "prop-types";

const ContentLayout = ({ children }) => {
  return (
    <div className="layout">
      <div>
        <Header />
      </div>
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  );
};
ContentLayout.propTypes = {
  children: PropTypes.node,
};

export default ContentLayout;
