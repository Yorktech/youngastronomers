'use client';

import { useEffect, useRef } from 'react';

export default function Starfield() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let stars = [];
        let nebulae = [];
        let frame = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initVisuals();
        };

        const initVisuals = () => {
            stars = [];
            nebulae = [];
            const numStars = Math.floor((canvas.width * canvas.height) / 3000);

            // Init Stars
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: Math.random() * 0.1 + 0.05,
                    opacity: Math.random(),
                    twinkleSpeed: Math.random() * 0.005 + 0.002
                });
            }

            // Init Edge Plasma (Swirling Blobs)
            const anchors = [
                { x: 0, y: 0, color: 'rgba(76, 29, 149, 0.5)' }, // Top Left - Purple (Increased opacity)
                { x: canvas.width, y: 0, color: 'rgba(37, 99, 235, 0.5)' }, // Top Right - Blue (Increased opacity)
                { x: 0, y: canvas.height, color: 'rgba(37, 99, 235, 0.5)' }, // Bottom Left - Blue (Increased opacity)
                { x: canvas.width, y: canvas.height, color: 'rgba(147, 51, 234, 0.5)' }, // Bottom Right - Purple (Increased opacity)
                { x: canvas.width / 2, y: -100, color: 'rgba(236, 72, 153, 0.4)' }, // Top Center - Pinkish (Increased opacity)
                { x: canvas.width / 2, y: canvas.height + 100, color: 'rgba(79, 70, 229, 0.4)' } // Bottom Center - Indigo (Increased opacity)
            ];

            anchors.forEach(anchor => {
                nebulae.push({
                    anchorX: anchor.x,
                    anchorY: anchor.y,
                    x: anchor.x,
                    y: anchor.y,
                    radius: Math.max(canvas.width, canvas.height) * 0.4,
                    color: anchor.color,
                    phaseX: Math.random() * Math.PI * 2,
                    phaseY: Math.random() * Math.PI * 2,
                    speedX: 0.0005 + Math.random() * 0.001,
                    speedY: 0.0005 + Math.random() * 0.001,
                    range: 150
                });
            });
        };

        const draw = () => {
            frame++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Deep Space Background
            const bgGradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width
            );
            bgGradient.addColorStop(0, '#0f172a');
            bgGradient.addColorStop(1, '#020617');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Swirling Plasma
            nebulae.forEach(nebula => {
                nebula.x = nebula.anchorX + Math.sin(frame * nebula.speedX + nebula.phaseX) * nebula.range;
                nebula.y = nebula.anchorY + Math.cos(frame * nebula.speedY + nebula.phaseY) * nebula.range;

                const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius);
                gradient.addColorStop(0, nebula.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Stars
            ctx.fillStyle = 'white';
            stars.forEach(star => {
                ctx.beginPath();
                star.opacity += star.twinkleSpeed;
                if (star.opacity > 1 || star.opacity < 0.2) star.twinkleSpeed = -star.twinkleSpeed;

                ctx.globalAlpha = Math.max(0, Math.min(1, star.opacity));
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();

                star.x += star.vx;
                star.y += star.vy;

                if (star.y > canvas.height) { star.y = 0; star.x = Math.random() * canvas.width; }
                if (star.x > canvas.width) star.x = 0;
                if (star.x < 0) star.x = canvas.width;
            });
            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
}
