"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { EliteObject } from "./WireframeObjects";

export function WireframeMinster({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "orange" }) {
    const groupRef = useRef();

    // Proportions carefully adjusted to real life York Minster ratios
    // Sourced to be thinner, taller, and much more elegant (less blocky).

    // Nave (West)
    const naveGeo = useMemo(() => new THREE.BoxGeometry(1.6, 2.8, 5.5), []);
    const naveRoofGeo = useMemo(() => new THREE.BoxGeometry(1.2, 0.6, 5.5), []);

    // Choir (East)
    const choirGeo = useMemo(() => new THREE.BoxGeometry(1.6, 2.8, 5.0), []);
    const choirRoofGeo = useMemo(() => new THREE.BoxGeometry(1.2, 0.6, 5.0), []);

    // Transepts (crossbar)
    const transeptGeo = useMemo(() => new THREE.BoxGeometry(6.0, 2.7, 1.6), []);
    const transeptRoofGeo = useMemo(() => new THREE.BoxGeometry(6.0, 0.6, 1.2), []);

    // Central Lantern Tower
    const centralTowerGeo = useMemo(() => new THREE.BoxGeometry(1.8, 5.0, 1.8), []);

    // Western Towers (twin tall towers)
    const westTowerGeo = useMemo(() => new THREE.BoxGeometry(1.3, 4.8, 1.3), []);

    // Chapter House
    const chapterHouseGeo = useMemo(() => new THREE.CylinderGeometry(0.8, 0.8, 2.0, 8), []);
    const chapterHouseRoofGeo = useMemo(() => new THREE.ConeGeometry(0.9, 1.0, 8), []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Majestic, slow rotation
            groupRef.current.rotation.y += delta * 0.15;
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
            groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>

            {/* Nave (West) */}
            <EliteObject geometry={naveGeo} color={color} position={[0, 1.4, 3.65]} />
            <EliteObject geometry={naveRoofGeo} color={color} position={[0, 3.1, 3.65]} />

            {/* Choir (East) */}
            <EliteObject geometry={choirGeo} color={color} position={[0, 1.4, -3.4]} />
            <EliteObject geometry={choirRoofGeo} color={color} position={[0, 3.1, -3.4]} />

            {/* Transepts */}
            <EliteObject geometry={transeptGeo} color={color} position={[0, 1.35, 0]} />
            <EliteObject geometry={transeptRoofGeo} color={color} position={[0, 3.0, 0]} />

            {/* Central Tower */}
            <EliteObject geometry={centralTowerGeo} color={color} position={[0, 2.5, 0]} />

            {/* Western Towers (at the +Z extremity of the Nave) */}
            <EliteObject geometry={westTowerGeo} color={color} position={[-1.1, 2.4, 6.0]} />
            <EliteObject geometry={westTowerGeo} color={color} position={[1.1, 2.4, 6.0]} />

            {/* Chapter House (attached to North Transept / Choir) */}
            <EliteObject geometry={chapterHouseGeo} color={color} position={[-2.8, 1.0, -2.0]} />
            <EliteObject geometry={chapterHouseRoofGeo} color={color} position={[-2.8, 2.5, -2.0]} />

        </group>
    );
}
