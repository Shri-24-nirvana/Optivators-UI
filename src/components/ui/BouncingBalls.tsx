import React, { useEffect, useRef } from "react";

export interface BouncingBallsProps {
  backgroundColor?: string;
  colors?: string[];
  numBalls?: number;
  minRadius?: number;
  maxRadius?: number;
  speed?: number;
  interactive?: boolean;
  interactionRadius?: number;
  interactionScale?: number;
  className?: string;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
}

export function BouncingBalls({
  backgroundColor = "transparent",
  colors = ["#FD3702", "#FE8505"],
  numBalls = 28,
  minRadius = 2.5,
  maxRadius = 6,
  speed = 0.35,
  interactive = true,
  interactionRadius = 90,
  interactionScale = 1.8,
  className = "",
}: BouncingBallsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize balls
    const balls: Ball[] = [];
    for (let i = 0; i < numBalls; i++) {
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.random() * Math.PI * 2;
      const ballSpeed = (0.2 + Math.random() * 0.8) * speed;

      balls.push({
        x: radius + Math.random() * (width - radius * 2),
        y: radius + Math.random() * (height - radius * 2),
        vx: Math.cos(angle) * ballSpeed,
        vy: Math.sin(angle) * ballSpeed,
        radius,
        baseRadius: radius,
        color,
        alpha: 0.35 + Math.random() * 0.45,
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    if (interactive) {
      window.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (backgroundColor && backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      const mouse = mouseRef.current;

      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];

        // Normal movement
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Bounce off edges
        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= -1;
        } else if (ball.x + ball.radius > width) {
          ball.x = width - ball.radius;
          ball.vx *= -1;
        }

        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy *= -1;
        } else if (ball.y + ball.radius > height) {
          ball.y = height - ball.radius;
          ball.vy *= -1;
        }

        // Mouse interaction
        let targetRadius = ball.baseRadius;
        if (interactive && mouse.active) {
          const dx = mouse.x - ball.x;
          const dy = mouse.y - ball.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < interactionRadius) {
            const force = (1 - dist / interactionRadius) * 0.8;
            ball.vx -= (dx / dist) * force;
            ball.vy -= (dy / dist) * force;
            targetRadius = ball.baseRadius * interactionScale;
          }
        }

        // Smoothly interpolate radius
        ball.radius += (targetRadius - ball.radius) * 0.1;

        // Max velocity clamp
        const maxV = speed * 3.5;
        const currentSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        if (currentSpeed > maxV) {
          ball.vx = (ball.vx / currentSpeed) * maxV;
          ball.vy = (ball.vy / currentSpeed) * maxV;
        }

        // Draw ball with soft glowing radial gradient
        ctx.save();
        ctx.globalAlpha = ball.alpha;

        const grad = ctx.createRadialGradient(
          ball.x,
          ball.y,
          0,
          ball.x,
          ball.y,
          ball.radius * 1.8
        );
        grad.addColorStop(0, ball.color);
        grad.addColorStop(0.7, ball.color);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Inner solid core
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [
    backgroundColor,
    colors,
    numBalls,
    minRadius,
    maxRadius,
    speed,
    interactive,
    interactionRadius,
    interactionScale,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

export default BouncingBalls;
