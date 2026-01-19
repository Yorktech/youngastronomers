"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { WireframePlanet, WireframeShip, RetroSun, WireframeHubble } from "./WireframeObjects";
import { useBackground } from "./BackgroundContext";

function GenerateCircleTexture() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
}

function MovingStars({ count = 2000 }) {
    const mesh = useRef();

    const circleTexture = useMemo(() => {
        if (typeof document !== 'undefined') {
            return GenerateCircleTexture();
        }
        return null;
    }, []);

    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color();
        const palette = [0xffffff, 0xffff00, 0x00ffff, 0xff00ff];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

            color.setHex(palette[Math.floor(Math.random() * palette.length)]);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return [positions, colors];
    }, [count]);

    useFrame((state, delta) => {
        const positionsAttr = mesh.current.geometry.attributes.position;
        const moveSpeed = 2;

        for (let i = 0; i < count; i++) {
            let z = positionsAttr.array[i * 3 + 2];
            z += delta * moveSpeed * 5;

            if (z > 50) {
                z = -150;
                positionsAttr.array[i * 3] = (Math.random() - 0.5) * 200;
                positionsAttr.array[i * 3 + 1] = (Math.random() - 0.5) * 200;
            }
            positionsAttr.array[i * 3 + 2] = z;
        }
        positionsAttr.needsUpdate = true;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.8}
                map={circleTexture}
                vertexColors
                transparent
                alphaTest={0.5}
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
}

function RandomFlybys() {
    const [flybys, setFlybys] = useState([]);

    useEffect(() => {
        // Spawn loop
        const interval = setInterval(() => {
            if (Math.random() > 0.7) return; // 30% chance per check

            const id = Math.random().toString(36).substr(2, 9);
            const type = Math.random() > 0.5 ? 'viper' : 'saucer';

            // Random start and end points
            const startX = Math.random() > 0.5 ? -80 : 80;
            const endX = -startX;
            const startY = (Math.random() - 0.5) * 50;
            const endY = (Math.random() - 0.5) * 50;
            const z = (Math.random() - 0.5) * 60 - 30; // Between -10 and -70

            // Control point for Bezier curve (random deflection)
            const controlX = (startX + endX) / 2 + (Math.random() - 0.5) * 40;
            const controlY = (startY + endY) / 2 + (Math.random() - 0.5) * 40;

            // Speed varies
            const speed = 10 + Math.random() * 15;

            const newFlyby = {
                id,
                type,
                start: [startX, startY, z],
                end: [endX, endY, z],
                control: [controlX, controlY, z],
                startTime: Date.now(),
                speed,
                color: type === 'viper' ? 'orange' : 'lime'
            };

            setFlybys(prev => [...prev, newFlyby]);

            // Auto cleanup after 15 seconds
            setTimeout(() => {
                setFlybys(prev => prev.filter(f => f.id !== id));
            }, 15000);

        }, 3000); // Check every 3 seconds

        return () => clearInterval(interval);
    }, []);

    useFrame((state, delta) => {
        // cleanup managed by TransientShip onComplete or timeout
    });

    return (
        <>
            {flybys.map(flyby => (
                <TransientShip key={flyby.id} {...flyby} onComplete={() => setFlybys(prev => prev.filter(f => f.id !== flyby.id))} />
            ))}
        </>
    )
}

function TransientShip({ type, start, end, control, speed, color, onComplete }) {
    const groupRef = useRef();
    const progress = useRef(0);

    // Stable vectors
    const p0 = useMemo(() => new THREE.Vector3(...start), [start]);
    const p1 = useMemo(() => new THREE.Vector3(...control), [control]);
    const p2 = useMemo(() => new THREE.Vector3(...end), [end]);

    // Estimate curve length for duration (rough distance)
    const dist = useMemo(() => p0.distanceTo(p2), [p0, p2]); // linear dist approximation
    const duration = dist / speed;

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        progress.current += delta;
        const t = Math.min(progress.current / duration, 1);

        // Quadratic Bezier: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
        // Three.js provides curve classes but doing it manually is cheap here
        const oneMinusT = 1 - t;
        const x = oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * p1.x + t * t * p2.x;
        const y = oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * p1.y + t * t * p2.y;
        const z = oneMinusT * oneMinusT * p0.z + 2 * oneMinusT * t * p1.z + t * t * p2.z;

        const nextPos = new THREE.Vector3(x, y, z);

        // Face forward (look at next position)
        // We look slightly ahead (t + epsilon) to determine tangent
        if (t < 0.99) {
            const tNext = t + 0.01;
            const oneMinusTNext = 1 - tNext;
            const nextX = oneMinusTNext * oneMinusTNext * p0.x + 2 * oneMinusTNext * tNext * p1.x + tNext * tNext * p2.x;
            const nextY = oneMinusTNext * oneMinusTNext * p0.y + 2 * oneMinusTNext * tNext * p1.y + tNext * tNext * p2.y;
            const nextZ = oneMinusTNext * oneMinusTNext * p0.z + 2 * oneMinusTNext * tNext * p1.z + tNext * tNext * p2.z;
            groupRef.current.lookAt(nextX, nextY, nextZ);
        }

        groupRef.current.position.copy(nextPos);

        // Spin/Roll
        if (type === 'saucer') {
            // Rotate mesh inside? 
            // We can't access inner mesh easily unless we query selector, 
            // but we can add a child group ref if needed. 
            // Or just rotate the whole group on local Z axis if LookAt uses Y up?
            // LookAt points +Z axis to target.
            // Saucer spins around its UP axis (Y). In local space that's Y.
            // But LookAt changes orientation.
            // Let's rely on internal WireframeShip animation for local spin if possible?
            // WireframeShip has `useFrame` that rotates `groupRef.current`.
        }

        if (t >= 1) {
            onComplete();
        }
    });

    return (
        <group ref={groupRef}>
            <WireframeShip
                type={type}
                color={color}
                scale={type === 'saucer' ? 1.5 : 1}
            // No 'position' passed so it stays at 0,0,0 relative to group
            />
        </group>
    )
}

function Scene() {
    const { config } = useBackground();

    return (
        <>
            <MovingStars count={3000} />
            <RandomFlybys />

            {/* Dynamic Objects based on Config */}
            {config.sun && config.sun.visible !== false && (
                <RetroSun
                    position={config.sun.position || [40, 20, -80]}
                    size={config.sun.size || 15}
                    color={config.sun.color || "yellow"}
                />
            )}

            {config.planets?.map((planet, idx) => (
                <WireframePlanet
                    key={`planet-${idx}`}
                    position={planet.position || [-30, -10, -50]}
                    size={planet.size || 8}
                    color={planet.color || "dodgerblue"}
                    speed={planet.speed || 0.1}
                />
            ))}

            {config.ships?.map((ship, idx) => {
                if (ship.type === 'hubble') {
                    return <WireframeHubble
                        key={`ship-${idx}`}
                        position={ship.position}
                        rotation={ship.rotation}
                        scale={ship.scale}
                        color={ship.color}
                        orbit={ship.orbit}
                    />
                }
                return <WireframeShip
                    key={`ship-${idx}`}
                    position={ship.position || [-15, 10, -20]}
                    rotation={ship.rotation || [0.2, 0.5, 0]}
                    scale={ship.scale || 0.5}
                    color={ship.color || "cyan"}
                    type={ship.type || "basic"}
                    orbit={ship.orbit}
                />
            })}
        </>
    )
}

export default function Starfield() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#020617]">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
