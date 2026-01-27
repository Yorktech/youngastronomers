'use client';

import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider, RapierRigidBody } from "@react-three/rapier";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export function BlackHole({ position = [0, 0, 0], strength = 50 }) {
    const meshRef = useRef();

    // Visuals for the black hole
    // Accretion disk
    const diskGeometry = useMemo(() => new THREE.TorusGeometry(3, 0.5, 16, 100), []);
    const diskMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: 'orange', wireframe: true }), []);

    // Event Horizon
    const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1.5, 32, 32), []);
    const sphereMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: 'black' }), []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += delta * 0.5;
            meshRef.current.rotation.x += delta * 0.2;
        }
    });

    // We will handle gravity in a parent component or via a custom hook that iterates bodies, 
    // OR we can make this component a "sensor" that applies forces to things entering it.
    // For a "suck everything" effect, usually we iterate over all rigid bodies in the scene.
    // simpler approach: The objects themselves should be attracted to the BH.
    // But we want the BH to be the source. 

    return (
        <group position={position}>
            <mesh ref={meshRef} geometry={diskGeometry} material={diskMaterial} />
            <mesh geometry={sphereGeometry} material={sphereMaterial} />
            {/* Sensor collider to detect things nearby? Or just visual? */}
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
