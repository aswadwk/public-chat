import React from "react";

interface Bubble {
  x: number;
  y: number;
  swaySpeed: number;
  swayAmount: number;
  bubbleSpeed: number;
  size: number;
}

const drawBubbles = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  width: number,
  height: number
): void => {
  let globalCounter = 0;
  let ctx: CanvasRenderingContext2D;
  let bubbles: Bubble[] = [];

  // Replace image drawing with message component drawing.
  const addMessageComponent = (x: number, y: number, size: number = 100): void => {
    // Draw a rounded rectangle to simulate message bubble
    ctx.fillStyle = "#3b82f6"; // blue color
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, size * 1.5, size, 10);
    } else {
      // Fallback if roundRect is unavailable:
      ctx.fillRect(x, y, size * 1.5, size);
    }
    ctx.fill();
    // Draw text inside the bubble
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("Pesan", x + 10, y + size / 2);
  };

  const createBubble = (): void => {
    const rnd = (low: number, high: number): number =>
      Math.random() * (high - low) + low;

    const bubbleSpeed = rnd(2, 4) * -1;
    const size = rnd(5, 200);
    bubbles.push({
      x: height,
      y: rnd(0, width * 2) - width,
      swaySpeed: rnd(50, 100),
      swayAmount: rnd(50, 100),
      bubbleSpeed,
      size,
    });
  };

  const update = (): void => {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    globalCounter++;

    const globalSway = Math.sin(globalCounter / 1000) * (width / 1.5);
    bubbles.forEach((b, k) => {
      const xSwayModify = b.swayAmount * Math.sin(b.x / b.swaySpeed);
      addMessageComponent(b.y + xSwayModify + globalSway, b.x, (b.size + b.x) / 8);
      bubbles[k].x = bubbles[k].x + b.bubbleSpeed;
      if (b.x < -20) {
        bubbles.splice(k, 1);
        createBubble();
      }
    });

    requestAnimationFrame(update);
  };

  const initApp = (): void => {
    if (!canvasRef.current) return;
    ctx = canvasRef.current.getContext("2d")!;
    ctx.imageSmoothingEnabled = true;
    ctx.globalAlpha = 0.5;

    // Create initial message bubbles and start animation loop.
    for (let x = 0; x < 80; x++) {
      setTimeout(() => {
        createBubble();
      }, x * 150);
    }
    update();
  };

  initApp();
};

export default drawBubbles;
