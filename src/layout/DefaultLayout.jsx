import PropTypes from "prop-types";
import BottomNavigation from "../components/navigation/BottomNavigation";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <main className="container">
        <section className="section">{children}</section>
      </main>

      <BottomNavigation />
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;
