'use client';

import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider, RapierRigidBody } from "@react-three/rapier";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useGravityLensGeometry } from "./WireframeObjects";

export function BlackHole({ position = [0, 0, 0], strength = 50 }) {
    const meshRef = useRef();
    const geometry = useGravityLensGeometry();
    const color = "lime"; // Matching original color from physics.md

    useFrame((state, delta) => {
        // Spin the funnel/black hole itself to show the twisting of spacetime
        // The funnel's symmetry axis is Y, so we spin around Y.
        if (meshRef.current) {
            meshRef.current.rotation.y -= delta * 0.3;
        }
    });

    return (
        <group position={position} >
            {/* Tilt Group - Fixes the viewing angle */}
            <group rotation={[2.0, 0, 1]} scale={1.5}>
                {/* Spinning Group - Spins the funnel around its axis */}
                <group ref={meshRef}>
                    {/* Gravity Well Funnel */}
                    <mesh geometry={geometry} renderOrder={1}>
                        <meshBasicMaterial color="#020617" opacity={0.8} transparent polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
                    </mesh>
                    <lineSegments>
                        <wireframeGeometry args={[geometry]} />
                        <lineBasicMaterial color={color} opacity={0.5} transparent />
                    </lineSegments>
                </group>
            </group>
        </group>
    );
}

// Gravity component that pulls everything towards a point
export function GravityWell({ position = [0, 0, 0], strength = 100 }) {
    // This needs access to all rigid bodies. 
    // In Rapier, we can't easily "get all bodies" without managing them.
    // So we'll wrap our "Debris" in a component that keys off this GravityWell's existence.
    // OR: We just assume the scene has a gravity well and objects query it.
    return null;
}
