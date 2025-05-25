import React from "react";
import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent overlay
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        animation: "fadeIn 0.5s ease-in-out",
        backdropFilter: "blur(2px)", // Subtle blur effect
      }}
      role="status"
      aria-label="Loading content"
    >
      <FadeLoader
        color="#ff9900" // Matches ProductCard's button color
        height={15}
        width={5}
        radius={2}
        margin={2}
        speedMultiplier={1.5}
      />
    </div>
  );
};

// Inline keyframes for fade-in animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);

export default Loader;