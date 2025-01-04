import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "../../assetTypes";

export default function StationaryWeapon({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          x="21.83"
          y="12.35"
          width="1.36"
          height="0.06"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          points="23.37 12.4 23.37 12.43 23.37 12.57 21.66 12.57 21.66 12.43 21.66 12.4 21.66 12.35 21.37 12.35 21.37 12.82 23.61 12.82 23.61 12.35 23.37 12.35 23.37 12.4"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          points="20.15 8.07 20.15 7.73 16.5 7.73 16.5 8.07 0.9 8.07 0.9 10.59 5.46 10.59 5.46 11.81 9.88 11.81 9.88 12.35 14.76 12.35 8.7 22.73 10.6 22.73 16.18 13.02 16.5 13.57 16.5 21.99 20.15 21.99 20.15 19.78 21.88 22.73 23.91 22.73 20.15 16.4 20.15 12.35 21.37 12.35 21.66 12.35 21.66 11.96 19.84 11.96 19.84 16.93 23 22.34 22.3 22.34 19.84 18.13 19.84 21.69 16.81 21.69 16.81 21.36 16.81 20.73 16.81 20.09 16.81 19.46 16.81 18.83 16.81 18.19 16.81 17.56 16.81 16.93 16.81 16.29 16.81 15.66 16.81 15.03 16.81 14.39 16.81 13.76 16.81 13.13 16.81 12.93 16.24 11.96 10.19 22.34 9.48 22.34 15.54 11.96 10.25 11.96 10.25 11.44 5.91 11.44 5.91 10.51 10.25 10.51 10.25 10.28 10.25 10.25 10.25 10.15 3.38 10.15 3.38 10.38 3.11 10.38 3.11 10.15 1.13 10.15 1.13 8.89 3.11 8.89 3.11 8.67 3.38 8.67 3.38 8.89 10.25 8.89 10.25 8.57 16.81 8.57 16.81 8.15 19.84 8.15 19.84 8.57 26.62 8.57 26.62 10.28 26.4 10.28 26.4 11.96 23.37 11.96 23.37 12.35 23.61 12.35 26.8 12.35 26.8 10.59 27.01 10.59 27.01 8.07 20.15 8.07"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M23.19,12h-.37a.47.47,0,0,1-.44.32v-.1a.36.36,0,0,0,.33-.22h-.88v.39h1.36Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M21.66,12.43v.14h1.71V12h3V10.28h.22V8.57H19.84V8.15h-3v.42H10.25v.32H3.38V8.67H3.11v.22h-2v1.26h2v.23h.27v-.23h6.87v.36H5.91v.93h4.34V12h5.29L9.48,22.34h.71l6-10.37.57,1v.19c0-.29,2.22-.31,2.66-.31h0v0l.07,0s-.06,0-.07,0a.06.06,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32s2.22-.31,2.66-.32h0v0a.11.11,0,0,1,.07,0,.1.1,0,0,1-.07,0l-.06,0c-.62,0-2.65,0-2.65-.31s2.22-.32,2.66-.32h0s0,0,0,0a.08.08,0,0,1,.07,0s-.06,0-.07,0a.06.06,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32s2.22-.31,2.66-.31h0v0l.07,0s-.06,0-.07,0a.06.06,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32s2.22-.31,2.66-.32h0s0,0,0,0a.08.08,0,0,1,.07,0,.1.1,0,0,1-.07,0l-.06,0c-.62,0-2.65,0-2.65-.31s2.22-.32,2.66-.32h.05l.07,0s-.06,0-.07,0a.06.06,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32S19,9,19.47,9h0V9l.07,0h.18s.07,0,.07,0V9.6s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0V14s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0,.07,0,.07,0V21s0,0-.07,0,.07,0,.07,0v.56s0,0-.07,0h-.18s-.06,0-.07,0a.06.06,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32v.33h3V18.13l2.46,4.21H23l-3.16-5.41V12h1.82v.47Zm.17-.47h.88a.36.36,0,0,1-.33.22v.1a.47.47,0,0,0,.44-.32h.37v.44H21.83V12Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,13.44h0s0,0,0,0a.08.08,0,0,1,.07,0s-.06,0-.07,0a.06.06,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32v.64C16.81,13.46,19,13.44,19.47,13.44Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,16h0v0l.07,0a.09.09,0,0,1-.07,0,.09.09,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32v.63C16.81,16,19,16,19.47,16Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,17.24h0s0,0,0,0a.08.08,0,0,1,.07,0,.1.1,0,0,1-.07,0l-.06,0c-.62,0-2.65,0-2.65-.31v.63C16.81,17.27,19,17.24,19.47,17.24Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,18.51h0a0,0,0,0,1,0,0l.07,0s-.06,0-.07,0a.06.06,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32v.64C16.81,18.53,19,18.51,19.47,18.51Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,14.08h0v0a.11.11,0,0,1,.07,0,.1.1,0,0,1-.07,0l-.06,0c-.62,0-2.65,0-2.65-.31v.63C16.81,14.1,19,14.08,19.47,14.08Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,21h0s0,0,0,0a.11.11,0,0,1,.07,0,.1.1,0,0,1-.07,0l-.06,0c-.62,0-2.65,0-2.65-.31v.63C16.81,21.07,19,21.05,19.47,21Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,15.34h0s0,0,0,0a.08.08,0,0,1,.07,0,.1.1,0,0,1-.07,0l-.06,0c-.62,0-2.65,0-2.65-.31v.63C16.81,15.37,19,15.34,19.47,15.34Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,14.71h.05l.07,0s-.06,0-.07,0a.06.06,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32V15C16.81,14.73,19,14.71,19.47,14.71Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,20.41h.05l.07,0s-.06,0-.07,0a.06.06,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32v.64C16.81,20.43,19,20.41,19.47,20.41Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,16.61h.05l.07,0s-.06,0-.07,0a.06.06,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32v.64C16.81,16.63,19,16.61,19.47,16.61Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,19.78h0s0,0,0,0l.07,0s-.06,0-.07,0a.06.06,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32v.63C16.81,19.8,19,19.78,19.47,19.78Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,19.14h0s0,0,0,0a.08.08,0,0,1,.07,0,.1.1,0,0,1-.07,0l-.06,0c-.62,0-2.65,0-2.65-.31v.63C16.81,19.17,19,19.15,19.47,19.14Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M19.47,17.88h0v0l.07,0a.09.09,0,0,1-.07,0,.09.09,0,0,1-.06,0c-.62,0-2.65,0-2.65-.32v.63C16.81,17.9,19,17.88,19.47,17.88Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 9.13 17.8 9.52 17.8 9.52 17.8 9.13 17.8 9.13"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.93,9.31a.39.39,0,0,1-.09.24c.48,0,1.07.06,1.62.06h0V9h0c-.48,0-1.11,0-1.63.06A.32.32,0,0,1,17.93,9.31Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,9.1c-.52.05-.91.12-.91.22s.38.18.91.23c0,0,0,0,0,0V9.13Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,9.13v.39A.34.34,0,0,0,17.8,9.13Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.78,9.6V9h-.21V9.6h.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.84,9.6V9s0,0-.07,0h-.18l-.07,0V9h0c-.44,0-2.66,0-2.66.31s2,.32,2.65.32a.06.06,0,0,0,.06,0s0,0,.07,0h.18S19.84,9.62,19.84,9.6Zm-2-.08s0,0,0,0c-.53-.05-.91-.12-.91-.23s.39-.17.91-.22l0,0h0a.34.34,0,0,1,0,.39ZM19.47,9h0V9.6h0c-.55,0-1.14,0-1.62-.06a.39.39,0,0,0,.09-.24.32.32,0,0,0-.09-.21C18.36,9.05,19,9,19.47,9Zm.1.56V9h.21V9.6h-.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 9.77 17.8 10.15 17.8 10.15 17.8 9.77 17.8 9.77"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.93,9.94a.36.36,0,0,1-.09.24c.48,0,1.07.06,1.62.06h0V9.67h0c-.48,0-1.11,0-1.63.06A.35.35,0,0,1,17.93,9.94Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,9.73c-.52,0-.91.12-.91.23s.38.17.91.22l0,0V9.77S17.79,9.75,17.78,9.73Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,9.77v.38A.32.32,0,0,0,17.8,9.77Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.78,10.24V9.68h-.21v.56h.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.84,10.24V9.68s0,0-.07,0h-.18l-.07,0h-.05c-.44,0-2.66,0-2.66.32s2,.31,2.65.31l.06,0a.1.1,0,0,0,.07,0h.18S19.84,10.26,19.84,10.24Zm-2-.09,0,0c-.53,0-.91-.12-.91-.22s.39-.18.91-.23c0,0,0,0,0,0h0a.32.32,0,0,1,0,.38Zm1.67-.48h0v.57h0c-.55,0-1.14,0-1.62-.06a.36.36,0,0,0,.09-.24.35.35,0,0,0-.09-.21c.52,0,1.15-.06,1.63-.06Zm.1.57V9.68h.21v.56h-.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 10.4 17.8 10.79 17.8 10.79 17.8 10.4 17.8 10.4"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.93,10.58a.42.42,0,0,1-.09.24c.48,0,1.07.06,1.62.06a0,0,0,0,0,0,0V10.3h0c-.48,0-1.11,0-1.63.06A.35.35,0,0,1,17.93,10.58Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,10.37c-.52,0-.91.11-.91.22s.38.18.91.22c0,0,0,0,0,0V10.4Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,10.4v.39A.34.34,0,0,0,17.8,10.4Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.78,10.87v-.56h-.21v.56s0,0,0,0h.18S19.78,10.88,19.78,10.87Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.84,10.87v-.56s0,0-.07,0h-.18a.08.08,0,0,0-.07,0s0,0,0,0h0c-.44,0-2.66,0-2.66.32s2,.31,2.65.32a.06.06,0,0,0,.06,0s0,0,.07,0h.18S19.84,10.89,19.84,10.87Zm-2-.08s0,0,0,0c-.53,0-.91-.11-.91-.22s.39-.18.91-.22l0,0h0a.34.34,0,0,1,0,.39Zm1.67-.49h0v.57a0,0,0,0,1,0,0c-.55,0-1.14,0-1.62-.06a.42.42,0,0,0,.09-.24.35.35,0,0,0-.09-.22c.52,0,1.15-.06,1.63-.06Zm.1.57v-.56h.21v.56s0,0,0,0h-.18S19.57,10.88,19.57,10.87Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 11.03 17.8 11.42 17.8 11.42 17.8 11.03 17.8 11.03"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.93,11.21a.39.39,0,0,1-.09.24c.48,0,1.07.06,1.62.06h0v-.56h0c-.48,0-1.11,0-1.63.06A.32.32,0,0,1,17.93,11.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,11c-.52.05-.91.12-.91.22s.38.18.91.23l0,0V11Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,11v.39A.34.34,0,0,0,17.8,11Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.78,11.5v-.56h-.21v.56h.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.84,11.5v-.56s0,0-.07,0h-.18l-.07,0v0h0c-.44,0-2.66,0-2.66.31s2,.32,2.65.32a.06.06,0,0,0,.06,0s0,0,.07,0h.18S19.84,11.52,19.84,11.5Zm-2-.08,0,0c-.53,0-.91-.12-.91-.23s.39-.17.91-.22l0,0h0a.34.34,0,0,1,0,.39Zm1.67-.48h0v.56h0c-.55,0-1.14,0-1.62-.06a.39.39,0,0,0,.09-.24.32.32,0,0,0-.09-.21c.52-.05,1.15-.06,1.63-.06Zm.1.56v-.56h.21v.56h-.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 11.67 17.8 12.05 17.8 12.05 17.8 11.67 17.8 11.67"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.93,11.84a.42.42,0,0,1-.09.25c.48,0,1.07.05,1.62.06h0v-.57h0c-.48,0-1.11,0-1.63.06A.35.35,0,0,1,17.93,11.84Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,11.64c-.52,0-.91.11-.91.22s.38.18.91.22l0,0v-.38Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,11.67v.38A.32.32,0,0,0,17.8,11.67Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.78,12.14v-.56h-.21v.56h.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.84,12.14v-.56s0,0-.07,0h-.18a.08.08,0,0,0-.07,0s0,0,0,0h0c-.44,0-2.66,0-2.66.32s2,.31,2.65.31l.06,0a.1.1,0,0,0,.07,0h.18S19.84,12.16,19.84,12.14Zm-2-.09,0,0c-.53,0-.91-.12-.91-.22s.39-.18.91-.22l0,0h0a.32.32,0,0,1,0,.38Zm1.67-.48h0v.57h0c-.55,0-1.14,0-1.62-.06a.42.42,0,0,0,.09-.25.35.35,0,0,0-.09-.21c.52,0,1.15-.06,1.63-.06Zm.1.57v-.56h.21v.56h-.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 12.3 17.8 12.69 17.8 12.69 17.8 12.3 17.8 12.3"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.93,12.48a.42.42,0,0,1-.09.24c.48,0,1.07.06,1.62.06h0v-.56h0c-.48,0-1.11,0-1.63.06A.37.37,0,0,1,17.93,12.48Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,12.27c-.52,0-.91.11-.91.22s.38.18.91.22l0,0V12.3Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,12.3v.39A.34.34,0,0,0,17.8,12.3Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.78,12.77v-.56a0,0,0,0,0,0,0h-.2v.56h.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.84,12.77v-.56s0,0-.07,0h-.18a.11.11,0,0,0-.07,0v0h0c-.44,0-2.66,0-2.66.32s2,.32,2.65.32a.06.06,0,0,0,.06,0s0,0,.07,0h.18S19.84,12.79,19.84,12.77Zm-2-.08,0,0c-.53,0-.91-.11-.91-.22s.39-.18.91-.22l0,0h0a.34.34,0,0,1,0,.39Zm1.67-.49h0v.56h0c-.55,0-1.14,0-1.62-.06a.42.42,0,0,0,.09-.24.37.37,0,0,0-.09-.22c.52,0,1.15,0,1.63-.06Zm.1.57v-.56h.2a0,0,0,0,1,0,0v.56h-.21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 13.32 17.8 12.94 17.8 12.94 17.8 13.32 17.8 13.32"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,13.35c.48,0,1.07.06,1.62.06h0v-.56h0c-.48,0-1.11,0-1.63.06a.32.32,0,0,1,.09.21A.39.39,0,0,1,17.84,13.35Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,13.35l0,0v-.39l0,0c-.52,0-.91.12-.91.22S17.25,13.3,17.78,13.35Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,12.93v.39A.34.34,0,0,0,17.8,12.93Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,13.41h0v-.56h-.21v.56h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,13.44a.06.06,0,0,0,.06,0s0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18l-.07,0v0h0c-.44,0-2.66,0-2.66.31S18.84,13.44,19.46,13.44Zm.11-.6h.21v.56h-.21Zm-.1,0h0v.56h0c-.55,0-1.14,0-1.62-.06a.39.39,0,0,0,.09-.24.32.32,0,0,0-.09-.21C18.36,12.86,19,12.84,19.47,12.84Zm-1.69.06,0,0h0a.34.34,0,0,1,0,.39h0l0,0c-.53,0-.91-.12-.91-.23S17.26,13,17.78,12.9Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 13.95 17.8 13.57 17.8 13.57 17.8 13.95 17.8 13.95"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,14c.48,0,1.07,0,1.62.06h0v-.57h0c-.48,0-1.11,0-1.63.06a.35.35,0,0,1,.09.21A.42.42,0,0,1,17.84,14Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,14l0,0v-.38l0,0c-.52,0-.91.11-.91.22S17.25,13.94,17.78,14Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,13.57V14A.32.32,0,0,0,17.8,13.57Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,14.05a0,0,0,0,0,0,0v-.56h-.21V14h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,14.07l.06,0a.1.1,0,0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18a.08.08,0,0,0-.07,0s0,0,0,0h0c-.44,0-2.66,0-2.66.32S18.84,14.07,19.46,14.07Zm.11-.59h.21V14a0,0,0,0,1,0,0h-.2Zm-.1,0h0V14h0c-.55,0-1.14,0-1.62-.06a.42.42,0,0,0,.09-.25.35.35,0,0,0-.09-.21C18.36,13.49,19,13.47,19.47,13.47Zm-1.69.07,0,0h0a.32.32,0,0,1,0,.38h0l0,0c-.53,0-.91-.12-.91-.22S17.26,13.58,17.78,13.54Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 14.59 17.8 14.2 17.8 14.2 17.8 14.59 17.8 14.59"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,14.62c.48,0,1.07.06,1.62.06h0v-.56h0c-.48,0-1.11,0-1.63.06a.37.37,0,0,1,.09.22A.42.42,0,0,1,17.84,14.62Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,14.62l0,0V14.2l0,0c-.52,0-.91.11-.91.22S17.25,14.57,17.78,14.62Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,14.2v.39A.34.34,0,0,0,17.8,14.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,14.68h0v-.56h-.21v.56h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,14.71a.06.06,0,0,0,.06,0s0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18a.11.11,0,0,0-.07,0v0h0c-.44,0-2.66,0-2.66.31S18.84,14.71,19.46,14.71Zm.11-.6h.21v.56h-.21Zm-.1,0h0v.56h0c-.55,0-1.14,0-1.62-.06a.42.42,0,0,0,.09-.24.37.37,0,0,0-.09-.22C18.36,14.12,19,14.11,19.47,14.1Zm-1.69.07,0,0h0a.34.34,0,0,1,0,.39h0l0,0c-.53,0-.91-.12-.91-.23S17.26,14.21,17.78,14.17Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 15.22 17.8 14.84 17.8 14.84 17.8 15.22 17.8 15.22"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,15.25c.48,0,1.07.06,1.62.06h0v-.56h0c-.48,0-1.11,0-1.63.06a.32.32,0,0,1,.09.21A.36.36,0,0,1,17.84,15.25Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,15.25l0,0v-.38l0,0c-.52,0-.91.12-.91.23S17.25,15.2,17.78,15.25Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,14.84v.38A.32.32,0,0,0,17.8,14.84Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,15.31h0v-.56h-.21v.56h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,15.34l.06,0a.1.1,0,0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18l-.07,0h-.05c-.44,0-2.66,0-2.66.32S18.84,15.34,19.46,15.34Zm.11-.59h.21v.56h-.21Zm-.1,0h0v.56h0c-.55,0-1.14,0-1.62-.06a.36.36,0,0,0,.09-.24.32.32,0,0,0-.09-.21C18.36,14.76,19,14.74,19.47,14.74Zm-1.69.06,0,0h0a.32.32,0,0,1,0,.38h0l0,0c-.53-.05-.91-.12-.91-.22S17.26,14.85,17.78,14.8Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 15.86 17.8 15.47 17.8 15.47 17.8 15.86 17.8 15.86"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,15.89c.48,0,1.07,0,1.62.06h0v-.57h0c-.48,0-1.11,0-1.63.06a.35.35,0,0,1,.09.21A.42.42,0,0,1,17.84,15.89Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,15.88l0,0v-.38l0,0c-.52,0-.91.11-.91.22S17.25,15.84,17.78,15.88Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,15.47v.38A.32.32,0,0,0,17.8,15.47Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,16h0v-.56s0,0,0,0h-.18s0,0,0,0v.56h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,16a.09.09,0,0,0,.06,0,.09.09,0,0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18a.08.08,0,0,0-.07,0s0,0,0,0h0c-.44,0-2.66,0-2.66.32S18.84,16,19.46,16Zm.11-.6s0,0,0,0h.18s0,0,0,0v.56h-.21Zm-.1,0h0v.57h0c-.55,0-1.14,0-1.62-.06a.42.42,0,0,0,.09-.25.35.35,0,0,0-.09-.21C18.36,15.39,19,15.37,19.47,15.37Zm-1.69.07,0,0h0a.32.32,0,0,1,0,.38h0l0,0c-.53,0-.91-.11-.91-.22S17.26,15.48,17.78,15.44Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 16.49 17.8 16.1 17.8 16.1 17.8 16.49 17.8 16.49"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,16.52c.48,0,1.07.06,1.62.06h0V16h0c-.48,0-1.11,0-1.63.06a.37.37,0,0,1,.09.22A.42.42,0,0,1,17.84,16.52Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,16.52l0,0V16.1l0,0c-.52,0-.91.11-.91.22S17.25,16.47,17.78,16.52Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,16.1v.39A.34.34,0,0,0,17.8,16.1Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,16.58h0V16a0,0,0,0,0,0,0h-.2v.56h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,16.61a.06.06,0,0,0,.06,0s0,0,.07,0h.18s.07,0,.07,0V16s0,0-.07,0h-.18l-.07,0v0h0c-.44,0-2.66,0-2.66.31S18.84,16.61,19.46,16.61Zm.11-.6h.2a0,0,0,0,1,0,0v.56h-.21Zm-.1,0h0v.56h0c-.55,0-1.14,0-1.62-.06a.42.42,0,0,0,.09-.24.37.37,0,0,0-.09-.22C18.36,16,19,16,19.47,16Zm-1.69.07,0,0h0a.34.34,0,0,1,0,.39h0l0,0c-.53-.05-.91-.12-.91-.23S17.26,16.11,17.78,16.07Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 17.12 17.8 16.74 17.8 16.74 17.8 17.12 17.8 17.12"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,17.15c.48,0,1.07.06,1.62.06h0v-.57h0c-.48,0-1.11,0-1.63.06a.32.32,0,0,1,.09.21A.36.36,0,0,1,17.84,17.15Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,17.15l0,0v-.38s0,0,0,0c-.52.05-.91.12-.91.23S17.25,17.1,17.78,17.15Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,16.74v.38A.32.32,0,0,0,17.8,16.74Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,17.21h0v-.56h-.21v.56h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,17.24l.06,0a.1.1,0,0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18l-.07,0h-.05c-.44,0-2.66,0-2.66.32S18.84,17.24,19.46,17.24Zm.11-.59h.21v.56h-.21Zm-.1,0h0v.57h0c-.55,0-1.14,0-1.62-.06a.36.36,0,0,0,.09-.24.32.32,0,0,0-.09-.21C18.36,16.66,19,16.64,19.47,16.64Zm-1.69.06s0,0,0,0h0a.32.32,0,0,1,0,.38h0l0,0c-.53,0-.91-.12-.91-.22S17.26,16.75,17.78,16.7Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 17.75 17.8 17.37 17.8 17.37 17.8 17.75 17.8 17.75"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,17.79c.48,0,1.07.06,1.62.06h0v-.57h0c-.48,0-1.11,0-1.63.06a.35.35,0,0,1,.09.22A.42.42,0,0,1,17.84,17.79Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,17.78s0,0,0,0v-.39l0,0c-.52,0-.91.11-.91.22S17.25,17.74,17.78,17.78Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,17.37v.39A.34.34,0,0,0,17.8,17.37Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,17.85a0,0,0,0,0,0,0v-.56a0,0,0,0,0,0,0h-.2v.56h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,17.88a.09.09,0,0,0,.06,0,.09.09,0,0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18a.08.08,0,0,0-.07,0s0,0,0,0h0c-.44,0-2.66,0-2.66.32S18.84,17.87,19.46,17.88Zm.11-.6h.2a0,0,0,0,1,0,0v.56a0,0,0,0,1,0,0h-.2Zm-.1,0h0v.57h0c-.55,0-1.14,0-1.62-.06a.42.42,0,0,0,.09-.24.35.35,0,0,0-.09-.22C18.36,17.29,19,17.27,19.47,17.27Zm-1.69.07,0,0h0a.34.34,0,0,1,0,.39h0s0,0,0,0c-.53,0-.91-.11-.91-.22S17.26,17.38,17.78,17.34Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 18.39 17.8 18 17.8 18 17.8 18.39 17.8 18.39"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,18.42c.48,0,1.07.06,1.62.06a0,0,0,0,0,0,0v-.56h0c-.48,0-1.11,0-1.63.06a.32.32,0,0,1,.09.21A.39.39,0,0,1,17.84,18.42Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,18.42s0,0,0,0V18l0,0c-.52,0-.91.12-.91.22S17.25,18.37,17.78,18.42Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,18v.39A.34.34,0,0,0,17.8,18Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,18.48s0,0,0,0v-.56h-.21v.56s0,0,0,0Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,18.51a.06.06,0,0,0,.06,0s0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18l-.07,0v0h0c-.44,0-2.66,0-2.66.31S18.84,18.51,19.46,18.51Zm.11-.6h.21v.56s0,0,0,0h-.18s0,0,0,0Zm-.1,0h0v.56a0,0,0,0,1,0,0c-.55,0-1.14,0-1.62-.06a.39.39,0,0,0,.09-.24.32.32,0,0,0-.09-.21C18.36,17.92,19,17.91,19.47,17.91ZM17.78,18l0,0h0a.34.34,0,0,1,0,.39h0s0,0,0,0c-.53-.05-.91-.12-.91-.23S17.26,18,17.78,18Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 19.02 17.8 18.64 17.8 18.64 17.8 19.02 17.8 19.02"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,19.05c.48,0,1.07.06,1.62.06h0v-.57h0c-.48,0-1.11,0-1.63.06a.35.35,0,0,1,.09.21A.36.36,0,0,1,17.84,19.05Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,19.05s0,0,0,0v-.38s0,0,0,0c-.52,0-.91.12-.91.23S17.25,19,17.78,19.05Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,18.64V19A.32.32,0,0,0,17.8,18.64Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,19.11h0v-.56s0,0,0,0h-.18s0,0,0,0v.56h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,19.14l.06,0a.1.1,0,0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18l-.07,0a0,0,0,0,0,0,0h0c-.44,0-2.66,0-2.66.32S18.84,19.14,19.46,19.14Zm.11-.59s0,0,0,0h.18s0,0,0,0v.56h-.21Zm-.1,0h0v.57h0c-.55,0-1.14,0-1.62-.06a.36.36,0,0,0,.09-.24.35.35,0,0,0-.09-.21C18.36,18.56,19,18.54,19.47,18.54Zm-1.69.06s0,0,0,0h0a.32.32,0,0,1,0,.38h0s0,0,0,0c-.53-.05-.91-.12-.91-.22S17.26,18.65,17.78,18.6Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 19.66 17.8 19.27 17.8 19.27 17.8 19.66 17.8 19.66"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,19.69c.48,0,1.07.06,1.62.06a0,0,0,0,0,0,0v-.57h0c-.48,0-1.11,0-1.63.06a.35.35,0,0,1,.09.22A.42.42,0,0,1,17.84,19.69Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,19.68s0,0,0,0v-.39l0,0c-.52,0-.91.11-.91.22S17.25,19.64,17.78,19.68Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,19.27v.39A.34.34,0,0,0,17.8,19.27Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,19.75a0,0,0,0,0,0,0v-.56h-.21v.56h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,19.78a.06.06,0,0,0,.06,0s0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18a.08.08,0,0,0-.07,0s0,0,0,0h0c-.44,0-2.66,0-2.66.32S18.84,19.77,19.46,19.78Zm.11-.6h.21v.56a0,0,0,0,1,0,0h-.2Zm-.1,0h0v.57a0,0,0,0,1,0,0c-.55,0-1.14,0-1.62-.06a.42.42,0,0,0,.09-.24.35.35,0,0,0-.09-.22C18.36,19.19,19,19.17,19.47,19.17Zm-1.69.07,0,0h0a.34.34,0,0,1,0,.39h0s0,0,0,0c-.53,0-.91-.11-.91-.22S17.26,19.28,17.78,19.24Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 20.29 17.8 19.9 17.8 19.9 17.8 20.29 17.8 20.29"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,20.32c.48,0,1.07.06,1.62.06h0v-.56h0c-.48,0-1.11,0-1.63.06a.32.32,0,0,1,.09.21A.39.39,0,0,1,17.84,20.32Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,20.32s0,0,0,0V19.9l0,0c-.52.05-.91.12-.91.22S17.25,20.27,17.78,20.32Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,19.9v.39A.34.34,0,0,0,17.8,19.9Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,20.38h0v-.56h-.21v.56h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,20.41a.06.06,0,0,0,.06,0s0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18l-.07,0s0,0,0,0h0c-.44,0-2.66,0-2.66.31S18.84,20.41,19.46,20.41Zm.11-.6h.21v.56h-.21Zm-.1,0h0v.56h0c-.55,0-1.14,0-1.62-.06a.39.39,0,0,0,.09-.24.32.32,0,0,0-.09-.21C18.36,19.82,19,19.81,19.47,19.81Zm-1.69.06,0,0h0a.34.34,0,0,1,0,.39h0s0,0,0,0c-.53-.05-.91-.12-.91-.23S17.26,19.92,17.78,19.87Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 20.92 17.8 20.54 17.8 20.54 17.8 20.92 17.8 20.92"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,21c.48,0,1.07.05,1.62.06h0v-.57h0c-.48,0-1.11,0-1.63.06a.35.35,0,0,1,.09.21A.42.42,0,0,1,17.84,21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,21l0,0v-.38s0,0,0,0c-.52.05-.91.12-.91.23S17.25,20.91,17.78,21Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,20.54v.38A.32.32,0,0,0,17.8,20.54Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,21h0v-.56h-.21V21h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,21l.06,0a.1.1,0,0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18l-.07,0h-.05c-.44,0-2.66,0-2.66.32S18.84,21,19.46,21Zm.11-.59h.21V21h-.21Zm-.1,0h0V21h0c-.55,0-1.14,0-1.62-.06a.42.42,0,0,0,.09-.25.35.35,0,0,0-.09-.21C18.36,20.46,19,20.44,19.47,20.44Zm-1.69.06s0,0,0,0h0a.32.32,0,0,1,0,.38h0l0,0c-.53,0-.91-.12-.91-.22S17.26,20.55,17.78,20.5Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.STATIONARY_TWO}
          points="17.8 21.56 17.8 21.17 17.8 21.17 17.8 21.56 17.8 21.56"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.84,21.59c.48,0,1.07.06,1.62.06h0v-.57h0c-.48,0-1.11,0-1.63.06a.37.37,0,0,1,.09.22A.42.42,0,0,1,17.84,21.59Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.78,21.58l0,0v-.39l0,0c-.52,0-.91.11-.91.22S17.25,21.54,17.78,21.58Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M17.8,21.17v.39A.34.34,0,0,0,17.8,21.17Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.STATIONARY_THREE}
          d="M19.77,21.65h0v-.56h-.21v.56h.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.STATIONARY_FOUR}
          d="M19.46,21.68a.06.06,0,0,0,.06,0s0,0,.07,0h.18s.07,0,.07,0v-.56s0,0-.07,0h-.18a.11.11,0,0,0-.07,0s0,0,0,0h0c-.44,0-2.66,0-2.66.32S18.84,21.68,19.46,21.68Zm.11-.6h.21v.56h-.21Zm-.1,0h0v.57h0c-.55,0-1.14,0-1.62-.06a.42.42,0,0,0,.09-.24.37.37,0,0,0-.09-.22C18.36,21.09,19,21.07,19.47,21.07Zm-1.69.07,0,0h0a.34.34,0,0,1,0,.39h0l0,0c-.53,0-.91-.11-.91-.22S17.26,21.18,17.78,21.14Z"
        />
      </g>
    </>
  );
}
