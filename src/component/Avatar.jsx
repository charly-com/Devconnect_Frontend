import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

const Avatar = ({src, size}) => {
     const { theme } = useSelector((state) => state);
    return (
        <img
          src={src}
          alt="Avatar"
          className={size}
          style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
        />
    );
}

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
  };

export default Avatar
