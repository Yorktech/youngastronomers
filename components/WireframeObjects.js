"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function WireframePlanet({ position, size, color, speed }) {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * speed;
        meshRef.current.rotation.x += delta * (speed * 0.5);
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshBasicMaterial color={color} wireframe />
        </mesh>
    );
}

export function WireframeSun({ position, size, color }) {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.05;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 24, 24]} />
            <meshBasicMaterial color={color} wireframe />
        </mesh>
    );
}

export function WireframeShip({ position, rotation, scale = 1, color = "cyan" }) {
    const groupRef = useRef();

    useFrame((state, delta) => {
        // Gentle floating/rotation
        groupRef.current.rotation.z += delta * 0.05;
        groupRef.current.rotation.x += delta * 0.02;
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            {/* Main Body */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 3, 8]} />
                <meshBasicMaterial color={color} wireframe />
            </mesh>

            {/* Solar Panels / Wings */}
            <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[4, 0.1, 1]} />
                <meshBasicMaterial color={color} wireframe />
            </mesh>
            <mesh position={[-2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[4, 0.1, 1]} />
                <meshBasicMaterial color={color} wireframe />
            </mesh>

            {/* Dish */}
            <mesh position={[0, 1.5, 0]}>
                <coneGeometry args={[1, 0.5, 8, 1, true]} />
                <meshBasicMaterial color={color} wireframe side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

export function HubbleTelescope({ position, rotation, scale = 1, color = "lime" }) {
    const groupRef = useRef();

    useFrame((state, delta) => {
        groupRef.current.rotation.y += delta * 0.03;
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            {/* Main Cylinder */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.8, 0.8, 4, 12]} />
                <meshBasicMaterial color={color} wireframe />
            </mesh>
            {/* Front Aperture */}
            <mesh position={[0, 2, 0]}>
                <cylinderGeometry args={[0.8, 0.8, 0.5, 12]} />
                <meshBasicMaterial color={color} wireframe />
            </mesh>

            {/* Solar Arrays */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[6, 0.1, 1.5]} />
                <meshBasicMaterial color={color} wireframe />
            </mesh>
        </group>
    )
}
