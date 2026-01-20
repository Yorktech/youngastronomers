"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// EliteObject: Renders a solid black mesh to occlude background, 
// transparently overlaid with EdgesGeometry for the vector look.
function EliteObject({ geometry, color, position, rotation, scale }) {
    const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Occlusion Mesh (Black Solid) */}
            <mesh geometry={geometry} renderOrder={1}>
                <meshBasicMaterial color="#020617" polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
            </mesh>
            {/* Wireframe Lines */}
            <lineSegments geometry={edges}>
                <lineBasicMaterial color={color} />
            </lineSegments>
        </group>
    );
}

export function WireframePlanet({ position, size = 5, color = "white", speed = 0.1 }) {
    const groupRef = useRef();
    const geometry = useMemo(() => new THREE.SphereGeometry(size, 16, 16), [size]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * speed;
            groupRef.current.rotation.x += delta * (speed * 0.5);
        }
    });

    return (
        <group ref={groupRef} position={position}>
            <EliteObject geometry={geometry} color={color} />
        </group>
    );
}

export function RetroSun({ position, size = 15, color = "yellow" }) {
    const groupRef = useRef();
    const sphereGeo = useMemo(() => new THREE.SphereGeometry(size, 12, 12), [size]);
    const torusGeo = useMemo(() => new THREE.TorusGeometry(size * 1.5, 0.2, 8, 32), [size]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05;
            groupRef.current.rotation.z -= delta * 0.01;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            <EliteObject geometry={sphereGeo} color={color} />
            <EliteObject
                geometry={torusGeo}
                color={color}
                rotation={[Math.PI / 2, 0, 0]}
            />
        </group>
    );
}

function useCobraGeometry() {
    return useMemo(() => {
        const geometry = new THREE.BufferGeometry();

        // Authentic Elite Cobra Mk III Vertices
        // Wide, flat, hexagonal profile
        const vertices = new Float32Array([
            0, 0, 1.5,  // 0: Nose Tip
            2.0, -0.2, -0.5,  // 1: Far Right Wingtip
            -2.0, -0.2, -0.5,  // 2: Far Left Wingtip
            0.8, 0.3, -0.2,  // 3: Upper Hull Mid-Right
            -0.8, 0.3, -0.2,  // 4: Upper Hull Mid-Left
            0.8, -0.4, -0.2,  // 5: Lower Hull Mid-Right
            -0.8, -0.4, -0.2,  // 6: Lower Hull Mid-Left
            1.2, 0.1, -1.2,  // 7: Rear Upper Right
            -1.2, 0.1, -1.2,  // 8: Rear Upper Left
            1.2, -0.2, -1.2,  // 9: Rear Lower Right
            -1.2, -0.2, -1.2   // 10: Rear Lower Left
        ]);

        const indices = [
            // Nose to Mid-section
            0, 3, 4, 0, 4, 2, 0, 2, 6, 0, 6, 5, 0, 5, 1, 0, 1, 3,
            // Top Surfaces
            3, 7, 8, 3, 8, 4, 1, 7, 3, 2, 4, 8,
            // Bottom Surfaces
            5, 6, 10, 5, 10, 9, 1, 5, 9, 2, 10, 6,
            // Side Edges
            1, 9, 7, 2, 8, 10,
            // Rear Engine Plate
            7, 9, 10, 7, 10, 8
        ];

        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();
        return geometry;
    }, []);
}

// Custom Geometry for the Viper Ship
function useViperGeometry() {
    return useMemo(() => {
        const geometry = new THREE.BufferGeometry();

        // Authentic Elite Viper Mk1 Vertices
        const vertices = new Float32Array([
            0, 0, 1.2,  // 0: Nose tip
            0.6, 0.1, 0.2,  // 1: Top Right mid
            -0.6, 0.1, 0.2,  // 2: Top Left mid
            0.6, -0.2, 0.2,  // 3: Bottom Right mid
            -0.6, -0.2, 0.2,  // 4: Bottom Left mid
            0.4, 0.1, -1.0, // 5: Top Right rear
            -0.4, 0.1, -1.0, // 6: Top Left rear
            0.4, -0.1, -1.0, // 7: Bottom Right rear
            -0.4, -0.1, -1.0  // 8: Bottom Left rear
        ]);

        // Faces defined to ensure EdgesGeometry draws the correct outlines
        const indices = [
            0, 1, 2, 0, 2, 4, 0, 4, 3, 0, 3, 1, // Nose
            1, 5, 6, 1, 6, 2, 3, 4, 8, 3, 8, 7, // Top/Bottom
            1, 3, 7, 1, 7, 5, 2, 6, 8, 2, 8, 4, // Sides
            5, 7, 8, 5, 8, 6                     // Rear
        ];

        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();
        return geometry;
    }, []);
}

export function WireframeShip({ position, rotation = [0, 0, 0], scale = 1, color = "cyan", type = "basic", orbit = null }) {
    const groupRef = useRef();
    const viperGeo = useViperGeometry();
    const cobraGeo = useCobraGeometry();
    useFrame((state, delta) => {
        if (groupRef.current) {
            const time = state.clock.getElapsedTime();

            // Orbital Movement
            if (orbit) {
                const { radius = 10, speed = 0.5, axis = 'y', center = [0, 0, 0] } = orbit;
                const angle = time * speed;

                let x = center[0];
                let y = center[1];
                let z = center[2];

                if (axis === 'y') {
                    x += Math.cos(angle) * radius;
                    z += Math.sin(angle) * radius;
                } else if (axis === 'x') {
                    y += Math.cos(angle) * radius;
                    z += Math.sin(angle) * radius;
                } else {
                    x += Math.cos(angle) * radius;
                    y += Math.sin(angle) * radius;
                }

                groupRef.current.position.set(x, y, z);
                groupRef.current.rotation.y = -angle;
            }

            // Gentle floating/rotation
            groupRef.current.rotation.z += delta * 0.05;
            groupRef.current.rotation.x += delta * 0.02;
        }
    });

    const renderShipType = () => {
        switch (type) {
            case 'viper':
                return (
                    // The original models face "forward" on Z, 
                    // we rotate 180 (Math.PI) so they face the direction of travel
                    <group >
                        <EliteObject
                            geometry={viperGeo}
                            color={color}
                            position={[0, 0, 0]}
                        />
                    </group>
                );

            case 'saucer':
                return (
                    <group>
                        {/* Disk */}
                        <EliteObject
                            geometry={new THREE.CylinderGeometry(2, 2, 0.2, 16)}
                            color={color}
                        />
                        {/* Upper Dome */}
                        <EliteObject
                            geometry={new THREE.ConeGeometry(1, 0.8, 16)}
                            color={color}
                            position={[0, 0.5, 0]}
                        />
                        {/* Lower Dome */}
                        <EliteObject
                            geometry={new THREE.ConeGeometry(1, 0.5, 16)}
                            color={color}
                            position={[0, -0.35, 0]}
                            rotation={[Math.PI, 0, 0]}
                        />
                    </group>
                );
            case 'cobra':
                return (
                    <group >
                        <EliteObject
                            geometry={cobraGeo}
                            color={color}
                            position={[0, 0, 0]}
                        />
                    </group>
                );
            case 'satellite':
            case 'basic':
                return (
                    <group>
                        {/* Body */}
                        <EliteObject
                            geometry={new THREE.BoxGeometry(1, 1, 1)}
                            color={color}
                        />
                        {/* Panels */}
                        <EliteObject
                            geometry={new THREE.BoxGeometry(0.1, 2, 4)}
                            color={color}
                            position={[1.2, 0, 0]}
                            rotation={[Math.PI / 2, 0, 0]}
                        />
                        <EliteObject
                            geometry={new THREE.BoxGeometry(0.1, 2, 4)}
                            color={color}
                            position={[-1.2, 0, 0]}
                            rotation={[Math.PI / 2, 0, 0]}
                        />
                        {/* Dish */}
                        <EliteObject
                            geometry={new THREE.ConeGeometry(0.5, 0.5, 16, 1, true)}
                            color={color}
                            position={[0, 0.8, 0]}
                        />
                    </group>
                );
            case 'scout':
                return (
                    <group>
                        <EliteObject
                            geometry={new THREE.ConeGeometry(1, 3, 4)}
                            color={color}
                            rotation={[0, 0, -Math.PI / 2]}
                        />
                        <EliteObject
                            geometry={new THREE.BoxGeometry(0.5, 0.5, 2)}
                            color={color}
                            position={[-1.5, 0, 0]}
                        />
                    </group>
                );
            // Hubble is complex, skipping strict EliteObject conversion for now 
            // unless requested, as it has transparent parts (dishes).
            default:
                return null;
        }
    }

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            {renderShipType()}
        </group>
    );
}

export function WireframeHubble({ position, rotation, scale = 1, color = "lime", orbit = null }) {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            const time = state.clock.getElapsedTime();

            // Orbital Movement 
            if (orbit) {
                const { radius = 10, speed = 0.5, axis = 'y', center = [0, 0, 0] } = orbit;
                const angle = time * speed;

                let x = center[0];
                let y = center[1];
                let z = center[2];

                if (axis === 'y') {
                    x += Math.cos(angle) * radius;
                    z += Math.sin(angle) * radius;
                } else if (axis === 'x') {
                    y += Math.cos(angle) * radius;
                    z += Math.sin(angle) * radius;
                } else {
                    x += Math.cos(angle) * radius;
                    y += Math.sin(angle) * radius;
                }

                groupRef.current.position.set(x, y, z);
                groupRef.current.rotation.y = -angle;
            }

            groupRef.current.rotation.z += delta * 0.02;
            groupRef.current.rotation.x += delta * 0.01;
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            <EliteObject
                geometry={new THREE.CylinderGeometry(1, 1, 4.5, 16)}
                color={color}
                position={[0, 1, 0]}
            />
            <EliteObject
                geometry={new THREE.CylinderGeometry(1.2, 1.2, 2.5, 16)}
                color={color}
                position={[0, -1.5, 0]}
            />
            <EliteObject
                geometry={new THREE.BoxGeometry(0.2, 1.5, 1.2)}
                color={color}
                position={[0.8, 3.2, 0]}
                rotation={[0, 0, 0.5]}
            />
            {/* Panels - simplified for EliteObject */}
            <EliteObject
                geometry={new THREE.BoxGeometry(1.5, 4, 0.1)}
                color={color}
                position={[-1.2, 2.5, 0]}
                rotation={[0, 0, -Math.PI / 2]}
            />
            <EliteObject
                geometry={new THREE.BoxGeometry(1.5, 4, 0.1)}
                color={color}
                position={[1.2, 2.5, 0]}
                rotation={[0, 0, Math.PI / 2]}
            />
        </group>
    )
}
