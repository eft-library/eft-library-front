export default function Loading() {
  const spinnerStyle = {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTop: "4px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite", // 애니메이션 설정
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-black bg-opacity-80 text-white flex justify-center items-center rounded-lg z-50 border-2 border-solid border-white">
      <style>
        {`
          @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
          }   
        `}
      </style>
      <div className="flex flex-col items-center justify-center gap-4">
        <div style={spinnerStyle}></div>
        <span className="font-bold text-white text-lg">Loading...</span>
      </div>
    </div>
  );
}
