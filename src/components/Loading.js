import React from "react";

const Loading = () => {
  const [dots, setDots] = React.useState("");

  React.useEffect(() => {
    const dotTimer = setInterval(dotAnimation, 1000);
    return () => {
      clearInterval(dotTimer);
    };
  });
  const dotAnimation = () => {
    if (dots.length === 3) return setDots("");
    setDots(dots + ".");
  };

  return (
    <aside>
      Loading<span className="dots">{dots}</span>
    </aside>
  );
};

export default Loading;
