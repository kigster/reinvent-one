"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const minDist = 10;
    const maxDist = 30;
    const initialWidth = 10;
    const maxLines = 100;
    const initialLines = 4;
    const speed = 5;
    let lines: Line[] = [];
    let frame = 0;
    let timeSinceLast = 0;
    let animId: number;

    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [0.7, 0.7],
      [0.7, -0.7],
      [-0.7, 0.7],
      [-0.7, -0.7],
    ];

    const starter = { x: w / 2, y: h / 2, vx: 0, vy: 0, width: initialWidth };

    interface Line {
      x: number;
      y: number;
      width: number;
      vx: number;
      vy: number;
      dist: number;
    }

    function createLine(parent: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      width: number;
    }): Line {
      const line: Line = {
        x: parent.x | 0,
        y: parent.y | 0,
        width: parent.width / 1.25,
        vx: 0,
        vy: 0,
        dist: Math.random() * (maxDist - minDist) + minDist,
      };
      let dir: number[];
      do {
        dir = dirs[(Math.random() * dirs.length) | 0];
        line.vx = dir[0];
        line.vy = dir[1];
      } while (
        (line.vx === -parent.vx && line.vy === -parent.vy) ||
        (line.vx === parent.vx && line.vy === parent.vy)
      );
      line.vx *= speed;
      line.vy *= speed;
      return line;
    }

    function getColor(x: number) {
      return `hsl(${(x / w) * 360 + frame}, 80%, 50%)`;
    }

    function stepLine(line: Line): boolean {
      const prevX = line.x;
      const prevY = line.y;
      line.x += line.vx;
      line.y += line.vy;
      --line.dist;

      let dead = false;
      if (line.x < 0 || line.x > w || line.y < 0 || line.y > h) dead = true;

      if (line.dist <= 0 && line.width > 1) {
        line.dist = Math.random() * (maxDist - minDist) + minDist;
        if (lines.length < maxLines) lines.push(createLine(line));
        if (lines.length < maxLines && Math.random() < 0.5)
          lines.push(createLine(line));
        if (Math.random() < 0.2) dead = true;
      }

      ctx!.strokeStyle = ctx!.shadowColor = getColor(line.x);
      ctx!.beginPath();
      ctx!.lineWidth = line.width;
      ctx!.moveTo(line.x, line.y);
      ctx!.lineTo(prevX, prevY);
      ctx!.stroke();

      return dead;
    }

    function init() {
      lines = [];
      for (let i = 0; i < initialLines; ++i) lines.push(createLine(starter));
      ctx!.fillStyle = "#1a1a2e";
      ctx!.fillRect(0, 0, w, h);
    }

    function anim() {
      animId = requestAnimationFrame(anim);
      ++frame;
      ctx!.shadowBlur = 0;
      ctx!.fillStyle = "rgba(26,26,46,.02)";
      ctx!.fillRect(0, 0, w, h);
      ctx!.shadowBlur = 0.5;

      for (let i = 0; i < lines.length; ++i) {
        if (stepLine(lines[i])) {
          lines.splice(i, 1);
          --i;
        }
      }

      ++timeSinceLast;
      if (
        lines.length < maxLines &&
        timeSinceLast > 10 &&
        Math.random() < 0.5
      ) {
        timeSinceLast = 0;
        lines.push(createLine(starter));
        ctx!.fillStyle = ctx!.shadowColor = getColor(starter.x);
        ctx!.beginPath();
        ctx!.arc(starter.x, starter.y, initialWidth, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    init();
    anim();

    const handleResize = () => {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
      starter.x = w / 2;
      starter.y = h / 2;
      init();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0, opacity: 0.5 }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-32 text-center">
        <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6 text-white">
          AI-First Engineering
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 font-light">
          We help companies build with AI — from strategy to production.
        </p>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 font-light">
          LLM integration, intelligent automation, AI-powered products, and
          scalable infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#services"
            className="inline-block px-8 py-3 bg-brand-accent text-white font-semibold rounded hover:bg-red-600 transition-colors"
          >
            Our Services
          </a>
          <a
            href="#contact"
            className="inline-block px-8 py-3 border border-white/30 text-white font-semibold rounded hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
