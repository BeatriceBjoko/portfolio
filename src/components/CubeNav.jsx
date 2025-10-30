import { Text } from "@react-three/drei";
import CubeEdgesFlow from "./CubeEdgesFlow";
import { useState } from "react";

// Config constants
const PLANE_SIZE = 1.8;
const TEXT_OFFSET_Z = 0.02;
const FRAME_SIZE = 2.02;

const faces = [
	{ name: "home", label: "HOME", pos: [0, 0, 1], rot: [0, 0, 0] }, // front
	{ name: "projects", label: "PROJECTS", pos: [1, 0, 0], rot: [0, Math.PI / 2, 0] }, // right
	{ name: "about", label: "ABOUT", pos: [0, 0, -1], rot: [0, Math.PI, 0] }, // back
	{ name: "contact", label: "CONTACT", pos: [-1, 0, 0], rot: [0, -Math.PI / 2, 0] }, // left
];

function Face({ label, name, position, rotation, onSelect }) {
	const [hovered, setHovered] = useState(false);

	return (
		<group position={position} rotation={rotation} scale={hovered ? 1.05 : 1}>
			<mesh
				name={name}
				onClick={(e) => {
					e.stopPropagation();
					onSelect?.(name);
				}}
				onPointerOver={(e) => {
					e.stopPropagation();
					setHovered(true);
					document.body.style.cursor = "pointer";
				}}
				onPointerOut={() => {
					setHovered(false);
					document.body.style.cursor = "default";
				}}
			>
				<planeGeometry args={[PLANE_SIZE, PLANE_SIZE]} />
				<meshStandardMaterial color="#15161a" metalness={0.2} roughness={0.35} />
			</mesh>

			<Text position={[0, 0, TEXT_OFFSET_Z]} fontSize={0.26} maxWidth={1.4} anchorX="center" anchorY="middle" fontWeight={700} color="#eaeaea" outlineWidth={0.005} outlineColor="#000">
				{label}
			</Text>
		</group>
	);
}

export default function CubeNav() {
	const handleSelect = (name) => {
		// smooth scroll
		const id = { home: "home", projects: "projects", about: "about", contact: "contact" }[name];
		const el = id && document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<group>
			{/* frame kubus */}

			{/* gradient + animated flow edges */}

			<CubeEdgesFlow size={FRAME_SIZE} lineWidth={1.2} opacity={0.95} />

			{/* rendering faces */}

			{faces.map((face) => (
				<Face key={face.name} name={face.name} label={face.label} position={face.pos} rotation={face.rot} onSelect={handleSelect} />
			))}
		</group>
	);
}
