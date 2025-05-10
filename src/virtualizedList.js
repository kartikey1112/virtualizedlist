import React, { useState, useRef, } from "react";

export const VirtualizedList = ({
  containerHeight = 500,
  itemHeight = 50,
  overscan = 2,
  data,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  const totalItems = data.length;
  const totalHeight = totalItems * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleItemCount = Math.ceil(containerHeight / itemHeight);
  const endIndex = Math.min(
    data.length - 1,
    startIndex + visibleItemCount + overscan * 2
  );

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  const visibleItems = data.slice(startIndex, endIndex + 1);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          height: `${containerHeight}px`,
          position: "relative",
          border: "1px solid black",
          overflowY: "auto",
        }}
        onScroll={handleScroll}
      >
        <div style={{ height: `${totalHeight}px`, position: "relative" }}>
          {visibleItems.map((item, index) => {
            const actualIndex = startIndex + index;
            return (
              <div
                key={actualIndex}
                style={{
                  position: "absolute",
                  top: `${actualIndex * itemHeight}px`,
                  height: `${itemHeight}px`,
                  left: 0,
                  right: 0,
                  borderBottom: "1px solid #ddd",
                  boxSizing: "border-box",
                  padding: "10px",
                  background: `${actualIndex % 2 === 0 ? "#f9f9f9" : "fff"}`,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
