import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useIsomorphicLayoutEffect from "@/hooks/useLayoutEffect";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

export default function Canvas() {
  const location = useRouter();
  /*--------------------
    Utils
    --------------------*/
  const deg = (a) => {
    return (Math.PI / 180) * a;
  };

  const randomness = () => {
    return Math.floor(40 + Math.random() * 1080) * Math.round(Math.random());
  };

  /*--------------------
    Setup
    --------------------*/
  const Points = [];
  let rotation = 0;
  let newRotation = Math.random() * 360;
  let theme = false;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );

    for (let i = 0; i < 200; i += 1) {
      Points.push({
        ox: 0,
        oy: 0,
        x: 0,
        y: 0,
      });
    }

    if (p5) {
      createLines(p5);
    }
  };

  /*--------------------
    Lines
    --------------------*/
  const createLines = (p5) => {
    const radius = Math.min(250, window.innerWidth * 0.48);
    const increment = 2;
    newRotation = rotation + 45;
    const r1 = randomness();
    const r2 = randomness();
    const r3 = randomness();
    const r4 =
      r1 !== 0 && r2 !== 0 && r3 !== 0 ? randomness() : Math.random() * 360;

    if (p5) {
      for (let i = 0; i < 200; i += increment) {
        const x1 = radius * p5.sin(deg(i + r1));
        const y1 = radius * p5.cos(deg(i + r2));
        Points[i].x = x1;
        Points[i].y = y1;
        const x2 = radius * p5.sin(deg(i + r3));
        const y2 = radius * p5.cos(deg(i + r4));
        Points[i + 1].x = x2;
        Points[i + 1].y = y2;
      }
    }
  };

  /*--------------------
    Draw Lines
    --------------------*/
  const drawLines = (p5) => {
    const smooth = 0.06;
    const stagger = 0.0005;
    for (let i = 0; i < Points.length; i += 2) {
      p5.stroke(255, i * 0.4);
      Points[i].ox = p5.lerp(Points[i].ox, Points[i].x, smooth + i * stagger);
      Points[i].oy = p5.lerp(Points[i].oy, Points[i].y, smooth + i * stagger);
      Points[i + 1].ox = p5.lerp(
        Points[i + 1].ox,
        Points[i + 1].x,
        smooth + i * stagger
      );
      Points[i + 1].oy = p5.lerp(
        Points[i + 1].oy,
        Points[i + 1].y,
        smooth + i * stagger
      );
      const x = p5.lerp(Points[i].ox, Points[i + 1].ox, 0.3);
      const y = p5.lerp(Points[i].oy, Points[i + 1].oy, 0.7);
      p5.bezier(
        Points[i].ox,
        Points[i].oy,
        y,
        x,
        x,
        y,
        Points[i + 1].ox,
        Points[i + 1].oy
      );
    }
  };

  let time;
  const draw = (p5) => {
    time += 0.01;
    p5.background(13, 17, 23);
    p5.strokeWeight(1);
    p5.noFill();
    p5.translate(p5.width / 2, p5.height / 2);
    rotation = p5.lerp(rotation, newRotation, p5.smooth);
    p5.rotate(deg(rotation));
    drawLines(p5);
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
  };

  const mousePressed = (p5) => {
    createLines(p5);
  };

  const [loading, setLoading] = useState(false);
  useIsomorphicLayoutEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setTimeout(() => {
        setLoading(true);
      }, 300);
    }

    return () => {
      isMounted = false;
      setLoading(false);
    };
  }, [location]);

  return (
    <React.Fragment>
      {loading && (
        <Sketch
          setup={setup}
          draw={draw}
          windowResized={windowResized}
          mousePressed={mousePressed}
        />
      )}
    </React.Fragment>
  );
}
