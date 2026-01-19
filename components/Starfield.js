"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { WireframePlanet, WireframeShip, WireframeSun, HubbleTelescope } from "./WireframeObjects";

function MovingStars({ count = 2000 }) {
    const mesh = useRef();

    // Create particles with random positions and colors
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color();

        // Palette: Blue, Purple, White, Pink, Cyan
        const palette = [0x5599ff, 0xaa55ff, 0xffffff, 0xff55aa, 0x55ffff];

        for (let i = 0; i < count; i++) {
            // x, y, z
            positions[i * 3] = (Math.random() - 0.5) * 200; // Spread wide
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200; // Deep depth

            // Pick a random color from palette
            color.setHex(palette[Math.floor(Math.random() * palette.length)]);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return [positions, colors];
    }, [count]);

    useFrame((state, delta) => {
        // Move stars towards camera (positive Z)
        // Since default camera looks down -Z? No, default camera is at 0,0,5 looking at 0,0,0
        // Let's settle: Stars move towards +Z to simulate camera moving -Z.

        const positionsAttr = mesh.current.geometry.attributes.position;
        const moveSpeed = 2; // Slow speed

        for (let i = 0; i < count; i++) {
            let z = positionsAttr.array[i * 3 + 2];
            z += delta * moveSpeed * 5;

            if (z > 50) {
                z = -150; // Reset way back
                // Randomize x/y again for variety
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
                size={0.6}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function Scene() {
    return (
        <>
            <MovingStars count={3000} />

            {/* Ambient light for subtle illumination if we add solid meshes later, 
                but currently we use MeshBasicMaterial wireframes which don't need light */}

            {/* Distant Wireframe Sun */}
            <WireframeSun position={[40, 20, -80]} size={15} color="gold" />

            {/* Wireframe Planets */}
            <WireframePlanet position={[-30, -10, -50]} size={8} color="dodgerblue" speed={0.1} />
            <WireframePlanet position={[35, -25, -30]} size={4} color="tomato" speed={0.2} />

            {/* Wireframe Ships flying by */}
            <WireframeShip position={[-15, 10, -20]} rotation={[0.2, 0.5, 0]} scale={0.5} color="cyan" />

            {/* Hubble telescope */}
            <HubbleTelescope position={[20, -5, -25]} rotation={[0.5, -0.2, 0]} scale={0.4} color="lime" />
        </>
    )
}

export default function Starfield() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#020617]">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
