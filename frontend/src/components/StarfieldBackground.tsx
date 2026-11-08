import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    const starColors = ['#ffffff', '#e0f2fe', '#f3e8ff', '#bae6fd', '#ddd6fe', '#fef08a'];
    let stars: Star[] = [];

    const initStars = () => {
      const starCount = Math.floor((width * height) / 3200);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const baseAlpha = 0.2 + Math.random() * 0.7;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.85 ? Math.random() * 1.5 + 0.5 : Math.random() * 2.5 + 1.5,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
    };

    initStars();

    // Shooting stars
    const shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 120,
      speed: 15,
      angle: Math.PI / 4,
      alpha: 0,
      active: false,
    };

    let shootingTimer = 0;

    const spawnShootingStar = () => {
      shootingStar.x = Math.random() * (width * 0.7);
      shootingStar.y = Math.random() * (height * 0.4);
      shootingStar.length = 80 + Math.random() * 80;
      shootingStar.speed = 12 + Math.random() * 12;
      shootingStar.angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1);
      shootingStar.alpha = 1;
      shootingStar.active = true;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background nebula gradients
      const grad1 = ctx.createRadialGradient(width * 0.15, height * 0.2, 50, width * 0.15, height * 0.2, 450);
      grad1.addColorStop(0, 'rgba(126, 34, 206, 0.12)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.85, height * 0.4, 50, width * 0.85, height * 0.4, 500);
      grad2.addColorStop(0, 'rgba(6, 182, 212, 0.10)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      const grad3 = ctx.createRadialGradient(width * 0.5, height * 0.85, 50, width * 0.5, height * 0.85, 600);
      grad3.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
      grad3.addColorStop(1, 'transparent');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95) {
          star.alpha = 0.95;
          star.twinkleSpeed = -Math.abs(star.twinkleSpeed);
        } else if (star.alpha < 0.15) {
          star.alpha = 0.15;
          star.twinkleSpeed = Math.abs(star.twinkleSpeed);
        }

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra flare for larger bright stars
        if (star.size > 2 && star.alpha > 0.7) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }
      }

      // Handle shooting stars
      shootingTimer++;
      if (shootingTimer > 250 && !shootingStar.active && Math.random() < 0.03) {
        spawnShootingStar();
        shootingTimer = 0;
      }

      if (shootingStar.active) {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.015;

        if (shootingStar.alpha <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar.active = false;
        } else {
          ctx.save();
          ctx.globalAlpha = shootingStar.alpha;
          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;
          const shootGrad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
          shootGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
          shootGrad.addColorStop(0.8, 'rgba(192, 132, 252, 0.6)');
          shootGrad.addColorStop(1, 'rgba(255, 255, 255, 1)');

          ctx.strokeStyle = shootGrad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(shootingStar.x, shootingStar.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'radial-gradient(circle at 50% 0%, #0d102b 0%, #060714 80%)' }}
    />
  );
};
