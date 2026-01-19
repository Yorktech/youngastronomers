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
            <mesh geometry={geometry}>
                <meshBasicMaterial color="black" polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
            </mesh>
            {/* Wireframe Lines */}
            <lineSegments geometry={edges}>
                <lineBasicMaterial color={color} />
            </lineSegments>
        </group>
    );
}

export function WireframePlanet({ position, size = 5, color = "white", speed = 0.1 }) {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * speed;
            meshRef.current.rotation.x += delta * (speed * 0.5);
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshBasicMaterial color={color} wireframe />
        </mesh>
    );
}

export function RetroSun({ position, size = 15, color = "yellow" }) {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
            meshRef.current.rotation.z -= delta * 0.01;
        }
    });

    return (
        <group ref={meshRef} position={position}>
            <mesh>
                <sphereGeometry args={[size, 12, 12]} />
                <meshBasicMaterial color={color} wireframe />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[size * 1.5, 0.2, 8, 32]} />
                <meshBasicMaterial color={color} wireframe />
            </mesh>
        </group>
    );
}

// Custom Geometry for the Viper Ship
function useViperGeometry() {
    return useMemo(() => {
        // Main Fuselage (Wedge)
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0.5, -1);
        shape.lineTo(1, 0); // Nose taper? 
        // Actually lets simpler: Extrude a triangle for the nose/body

        // Define the cross-section of the back
        const fuselageShape = new THREE.Shape();
        fuselageShape.moveTo(-0.5, 0);
        fuselageShape.lineTo(0.5, 0);
        fuselageShape.lineTo(0.5, 1);
        fuselageShape.lineTo(-0.5, 1);
        fuselageShape.lineTo(-0.5, 0);

        // This is hard to model with just Shapes. Let's composite primitives.
        // But for EliteObject we need a single Geometry to calculate edges nicely, 
        // OR we just use multiple EliteObjects in a group.

        // Let's create a single merged BufferGeometry for the Viper to treat it as one solid object.
        return null; // Logic moved to component to allow composition
    }, []);
}

export function WireframeShip({ position, rotation = [0, 0, 0], scale = 1, color = "cyan", type = "basic", orbit = null }) {
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

            // Gentle floating/rotation
            groupRef.current.rotation.z += delta * 0.05;
            groupRef.current.rotation.x += delta * 0.02;
        }
    });

    const renderShipType = () => {
        switch (type) {
            case 'viper':
                // Classic Wedge Shape
                // Composition of multiple EliteObjects for parts
                return (
                    <group rotation={[0, Math.PI, 0]}>
                        {/* Nose / Main Body */}
                        <EliteObject
                            geometry={new THREE.ConeGeometry(0.8, 4, 4)}
                            color={color}
                            rotation={[Math.PI / 2, Math.PI / 4, 0]} // Rotate so flat side is down/up
                        />
                        {/* Engines (Side intakes) */}
                        <EliteObject
                            geometry={new THREE.BoxGeometry(0.8, 0.8, 2.5)}
                            color={color}
                            position={[0.8, 0, 0.5]}
                        />
                        <EliteObject
                            geometry={new THREE.BoxGeometry(0.8, 0.8, 2.5)}
                            color={color}
                            position={[-0.8, 0, 0.5]} // moved back slightly relative to nose
                        />
                        {/* Top Fin (Optional, Viper Mk1 didn't have huge fin but reference has high back) */}
                        <EliteObject
                            geometry={new THREE.BoxGeometry(0.4, 0.6, 1.5)}
                            color={color}
                            position={[0, 0.6, 1]}
                            rotation={[-0.2, 0, 0]} // Sloped
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
