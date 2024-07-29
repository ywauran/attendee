import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li>
          <Link
            to="/"
            className={`nav__link ${isActive("/") ? "active-link" : ""}`}
          >
            <i className="ri-home-smile-2-line"></i>
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className={`nav__link ${isActive("/history") ? "active-link" : ""}`}
          >
            <i className="ri-history-line"></i>
          </Link>
        </li>
        <li>
          <button className="nav__expand" id="nav-expand">
            <i
              className="ri-add-line nav__expand-icon"
              id="nav-expand-icon"
            ></i>
          </button>
        </li>
        <li>
          <Link
            to="/help"
            className={`nav__link ${isActive("/help") ? "active-link" : ""}`}
          >
            <i className="ri-question-line"></i>
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`nav__link ${isActive("/profile") ? "active-link" : ""}`}
          >
            <i className="ri-user-line"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

BottomNavigation.propTypes = {};

export default BottomNavigation;
