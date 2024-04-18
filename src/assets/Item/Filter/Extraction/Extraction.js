import PropTypes from 'prop-types';

const Extraction = ({ border, color, width, height, opacity }) => {
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
      opacity={opacity ? opacity : '1'}
      viewBox="0 0 22 32"
      style={{ enableBackground: 'new 0 0 22 32' }}
      xmlSpace="preserve"
    >
      <g>
        <rect
          x="0"
          class="st0"
          fill={border ? border : 'white'}
          width="24"
          height="34"
        />
      </g>
      <g>
        <path
          fill={border ? border : '#010101'}
          class="st1"
          d="M22,2v30H2V2H22 M23,1H1v32h22V1L23,1z"
        />
      </g>
      <g>
        <path
          class="st1"
          fill={border ? border : '#010101'}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <path
          class="st1"
          fill={border ? border : '#010101'}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <path
          class="st1"
          fill={border ? border : '#010101'}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <path
          class="st1"
          fill={border ? border : '#010101'}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <path
          class="st1"
          fill={border ? border : '#010101'}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <path
          class="st1"
          fill={border ? border : '#010101'}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <g>
        <polygon
          class="st2"
          fill={color ? color : '#44B8EA'}
          points="23,1 7,4.76 7,29.24 23,33 	"
        />
      </g>
      <g>
        <path
          class="st1"
          fill={border ? border : '#010101'}
          d="M22,2.26v29.47L8,28.44V5.56L22,2.26 M23,1L7,4.76v24.47L23,33V1L23,1z"
        />
      </g>
      <path
        class="st1"
        fill={border ? border : '#010101'}
        d="M22,2v29.74L8,28.44V5.56l14-3.29 M23,1L7,4.76v24.47L23,33V1L23,1z"
      />
      <g>
        <path
          class="st1"
          fill={border ? border : '#010101'}
          d="M10,16c-0.55,0-1,0.45-1,1s0.45,1,1,1s1-0.45,1-1S10.55,16,10,16L10,16z"
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
  opacity: PropTypes.string.isRequired,
};

export default Extraction;
