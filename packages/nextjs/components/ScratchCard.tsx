import React from 'react';
import Sketch from "react-p5";

function ScratchCard({ image }) {
  const setup = (p5, canvasParentRef) => {
    if (typeof window !== 'undefined') {
      p5.createCanvas(270, 180).parent(canvasParentRef);
    }
   
  };

  const draw = (p5) => {
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
        <center className="box">
          <img src={image} alt="Icon" />
        </center>
      </section>
      <Sketch setup={setup} draw={draw} />
    </div>
  )
}

export default ScratchCard;