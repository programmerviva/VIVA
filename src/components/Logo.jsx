import logo from "../assets/viva logo.png";
import PropTypes from "prop-types";

function Logo({ width = "100px" }) {
  return <img src={logo} alt="Website Logo" style={{ width }} />;
}

Logo.propTypes = {
  width: PropTypes.string,
};

export default Logo;
