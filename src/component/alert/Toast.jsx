import PropTypes from 'prop-types';

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor} `}
      style={{ top: "5px", right: "5px", minWidth: "200px", zIndex: 50 }}
    >
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="mr-auto text-light">{msg.title}</strong>&nbsp;
        <button
          className="ml-auto mb-1 close text-light"
          data-dismiss="toast"
          style={{
            border: "none",
            background: "none",
            fontSize: "30px",
            right: 0,
          }}
          onClick={handleShow}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

Toast.propTypes = {
  handleShow: PropTypes.func.isRequired,
  bgColor: PropTypes.string.isRequired,
  msg: PropTypes.object.isRequired,
};

export default Toast
