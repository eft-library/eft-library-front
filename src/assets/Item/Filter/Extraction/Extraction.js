import PropTypes from 'prop-types';

const Extraction = ({ border, color, width, height }) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={width ? width : '20px'}
      height={height ? height : '20px'}
      viewBox="0 0 22 32"
      style={{ enableBackground: 'new 0 0 22 32' }}
      xmlSpace="preserve"
    >
      <g>
        <path
          className="st0"
          fill={border ? border : '#010101'}
          d="M21,1v30H1V1H21 M22,0H0v32h22V0L22,0z"
        />
      </g>
      <g>
        <path
          className="st0"
          fill={border ? border : '#010101'}
          d="M21,1.26v29.47L7,27.44V4.56L21,1.26 M22,0L6,3.76v24.47L22,32V0L22,0z"
        />
      </g>
      <g>
        <path
          className="st0"
          fill={border ? border : '#010101'}
          d="M21,1.26v29.47L7,27.44V4.56L21,1.26 M22,0L6,3.76v24.47L22,32V0L22,0z"
        />
      </g>
      <g>
        <path
          className="st0"
          fill={border ? border : '#010101'}
          d="M21,1.26v29.47L7,27.44V4.56L21,1.26 M22,0L6,3.76v24.47L22,32V0L22,0z"
        />
      </g>
      <g>
        <path
          className="st0"
          fill={border ? border : '#010101'}
          d="M21,1.26v29.47L7,27.44V4.56L21,1.26 M22,0L6,3.76v24.47L22,32V0L22,0z"
        />
      </g>
      <g>
        <path
          className="st0"
          fill={border ? border : '#010101'}
          d="M21,1.26v29.47L7,27.44V4.56L21,1.26 M22,0L6,3.76v24.47L22,32V0L22,0z"
        />
      </g>
      <g>
        <path
          className="st0"
          fill={border ? border : '#010101'}
          d="M21,1.26v29.47L7,27.44V4.56L21,1.26 M22,0L6,3.76v24.47L22,32V0L22,0z"
        />
      </g>
      <g>
        <polygon
          className="st1"
          fill={color ? color : '#010101'}
          points="22,0 6,3.76 6,28.24 22,32 	"
        />
      </g>
      <g>
        <path
          className="st0"
          fill={border ? border : '#010101'}
          d="M21,1.26v29.47L7,27.44V4.56L21,1.26 M22,0L6,3.76v24.47L22,32V0L22,0z"
        />
      </g>
      <path
        className="st0"
        fill={border ? border : '#010101'}
        d="M21,1v29.74L7,27.44V4.56l14-3.29 M22,0L6,3.76v24.47L22,32V0L22,0z"
      />
      <g>
        <path
          className="st0"
          fill={border ? border : '#010101'}
          d="M9,15c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1c0.55,0,1-0.45,1-1C10,15.45,9.55,15,9,15L9,15z"
        />
      </g>
    </svg>
  );
};

Extraction.propTypes = {
  border: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Extraction;
