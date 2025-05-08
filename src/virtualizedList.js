import React, { useState, useRef } from "react";

export const VirtualizedList = ({
  data,
  itemHeight = 50,
  containerHeight = 500,
  overscan = 2,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const totalItems = data.length;
  const totalHeight = totalItems * itemHeight;
  const visibleItemCount = Math.ceil(containerHeight / itemHeight);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);

  const endIndex = Math.min(
    totalItems - 1,
    startIndex + visibleItemCount + overscan * 2
  );

  const visibleItems = data.slice(startIndex, endIndex);

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: `${containerHeight}px`,
          overflowY: "auto",
          border: "1px solid black",
          position: "relative",
        }}
      >
         <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex+index
          return (
            <div
              key={actualIndex}
              style={{
                position: "absolute", // Position absolutely within the spacer div
                top: `${actualIndex * itemHeight}px`, // Vertically place the item
                height: `${itemHeight}px`, // Fixed height of item
                left: 0,
                right: 0,
                borderBottom: "1px solid #ddd", // Optional styling
                padding: "10px",
                boxSizing: "border-box",
                background: actualIndex % 2 === 0 ? "#f9f9f9" : "#fff", // Zebra striping
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
