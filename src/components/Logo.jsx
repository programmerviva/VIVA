import PropTypes from 'prop-types';


function Logo({ width = "100px" }) {
  return <div style={{ width }}>logo</div>;
}

Logo.propTypes = {
  width: PropTypes.string
};

export default Logo;
