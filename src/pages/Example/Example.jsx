// import { useRef } from 'react';
// import { useDrag } from 'react-use-gesture';
// import memopic1 from "../../img/memopic1.png";

// import styles from './Example.module.scss';

// export default function App() {
//   const domTarget = useRef(null);

//   const bind = useDrag(({ offset: [dx, dy] }) => {
//     // 특정 범위 내에서만 드래그 허용
//     const newX = Math.min(Math.max(dx, -100), 100);
//     const newY = Math.min(Math.max(dy, -100), 100);

//     domTarget.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
//   });

//   return (
//     <div className={styles.container}>
//       <img
//         ref={domTarget}
//         className={styles.card}
//         style={{
//           transform: 'perspective(600px)',
//         }}
//         {...bind()}
//         src={memopic1}
//         alt="memopic"
//       />
//     </div>
//   );
// }

import { useState, useRef } from 'react';
import imageUrl from "../../img/memopic1.png";

const DraggableImage = () => {
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const handleImageDrag = (clientX, clientY) => {
    // Update the image position based on the drag
    setImagePosition({ x: clientX, y: clientY });
  };
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef(null);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', ''); // Necessary for some browsers
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e) => {
    if (isDragging) {
      handleImageDrag(e.clientX, e.clientY);
    }
  };

  return (
    <img
      ref={imageRef}
      src={imageUrl}
      alt="draggable"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
    />
  );
};

export default DraggableImage;