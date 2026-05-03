"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { EliteObject } from "./WireframeObjects";

export function WireframeTelescope({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "dodgerblue" }) {
    const groupRef = useRef();
    const tubeRef = useRef();

    // Geometries for a modern equatorial mounted refractor / reflector
    // 1. Tripod Legs
    const legGeo = useMemo(() => new THREE.CylinderGeometry(0.1, 0.2, 5, 8), []);
    // 2. Equatorial Mount Base
    const mountBaseGeo = useMemo(() => new THREE.CylinderGeometry(0.5, 0.5, 1, 16), []);
    // 3. Counterweight Shaft
    const shaftGeo = useMemo(() => new THREE.CylinderGeometry(0.05, 0.05, 3, 8), []);
    // 4. Counterweights
    const weightGeo = useMemo(() => new THREE.CylinderGeometry(0.4, 0.4, 0.5, 16), []);
    // 5. Optical Tube (Main Telescope)
    const tubeGeo = useMemo(() => new THREE.CylinderGeometry(0.6, 0.6, 6, 16), []);
    // 6. Dew Shield / Front Lens 
    const shieldGeo = useMemo(() => new THREE.CylinderGeometry(0.65, 0.65, 1.5, 16), []);
    // 7. Eyepiece / Focuser
    const eyepieceGeo = useMemo(() => new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8), []);
    // 8. Finderscope
    const finderGeo = useMemo(() => new THREE.CylinderGeometry(0.15, 0.15, 1.5, 8), []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Very slow pan as if tracking the stars
            groupRef.current.rotation.y += delta * 0.05;
        }
        if (tubeRef.current) {
            // The tube slowly adjusting its altitude
            tubeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2 + (Math.PI / 4);
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>

            {/* Tripod */}
            <group position={[0, -0.5, 0]}>
                {/* 
                  To splay outward from the top Center:
                  The cylinder is centered at 0,0,0. 
                  We translate it down by half its height (2.5) after rotating.
                  This ensures the "top" of the cylinder stays at the hub.
                */}
                <group rotation={[0.3, 0, 0]}>
                    <EliteObject geometry={legGeo} color={color} position={[0, -2.5, 0]} />
                </group>
                <group rotation={[-0.15, 0, 0.26]}>
                    <EliteObject geometry={legGeo} color={color} position={[0, -2.5, 0]} />
                </group>
                <group rotation={[-0.15, 0, -0.26]}>
                    <EliteObject geometry={legGeo} color={color} position={[0, -2.5, 0]} />
                </group>

                {/* Center Tray */}
                <EliteObject geometry={new THREE.CylinderGeometry(0.8, 0.8, 0.1, 3)} color={color} position={[0, -2.0, 0]} rotation={[0, Math.PI / 6, 0]} />
            </group>

            {/* Mount Base */}
            <EliteObject geometry={mountBaseGeo} color={color} position={[0, 0, 0]} />

            {/* Equatorial Head (Tilted) */}
            <group position={[0, 0.5, 0]} rotation={[Math.PI / 6, 0, 0]}>
                <EliteObject geometry={new THREE.CylinderGeometry(0.4, 0.4, 1.5, 16)} color={color} position={[0, 0, 0]} />

                {/* Counterweights */}
                <group position={[0, -1.5, 0]}>
                    <EliteObject geometry={shaftGeo} color={color} position={[0, 0, 0]} />
                    <EliteObject geometry={weightGeo} color={color} position={[0, -0.8, 0]} />
                    <EliteObject geometry={weightGeo} color={color} position={[0, -1.4, 0]} />
                </group>

                {/* Optical Tube Assembly (OTA) */}
                <group ref={tubeRef} position={[0, 0.75, 0]} rotation={[Math.PI / 4, 0, 0]}>
                    <EliteObject geometry={tubeGeo} color={color} position={[0, 0, 0]} />
                    <EliteObject geometry={shieldGeo} color={color} position={[0, 3, 0]} />

                    {/* Eyepiece Holder at the back */}
                    <EliteObject geometry={eyepieceGeo} color={color} position={[0, -3.2, 0]} rotation={[Math.PI / 2, 0, 0]} />

                    {/* Finderscope on top/side */}
                    <group position={[0.4, -1, 0.7]}>
                        <EliteObject geometry={finderGeo} color={color} position={[0, 0, 0]} />
                        {/* Finder Bracket */}
                        <EliteObject geometry={new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8)} color={color} position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]} />
                    </group>
                </group>
            </group>
        </group>
    );
}
