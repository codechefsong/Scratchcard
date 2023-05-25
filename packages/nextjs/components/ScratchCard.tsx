import React from 'react';
import dynamic from 'next/dynamic';

const Sketch = dynamic(() => import('react-p5'), { ssr: false });

type TScratchCard = {
  image: any
}

function ScratchCard({ image } : TScratchCard) {
  const setup = (p5 : any, canvasParentRef : any) => {
    if (typeof window !== 'undefined') {
      p5.createCanvas(270, 180).parent(canvasParentRef);
    }
   
  };

  const draw = (p5: any) => {
    if (typeof window !== 'undefined') {
      p5.strokeWeight(50);
      if(p5.mouseIsPressed === true) {
        p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <section className="scratch-card">
        <div className="center box">
          <img src={image} alt="Icon" />
        </div>
      </section>
      <Sketch setup={setup} draw={draw} />
    </div>
  )
}

export default ScratchCard;