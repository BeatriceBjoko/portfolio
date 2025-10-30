import { Line } from "@react-three/drei";
import * as THREE from "three";

// 12 edges as index pairs of the 8 vertices
const EDGE_INDICES = [
	[0, 1],
	[1, 2],
	[2, 3],
	[3, 0], // front
	[4, 5],
	[5, 6],
	[6, 7],
	[7, 4], // back
	[0, 4],
	[1, 5],
	[2, 6],
	[3, 7], // connectors
];

function cubeCorners(size) {
	const h = size / 2;
	return [new THREE.Vector3(-h, -h, h), new THREE.Vector3(h, -h, h), new THREE.Vector3(h, h, h), new THREE.Vector3(-h, h, h), new THREE.Vector3(-h, -h, -h), new THREE.Vector3(h, -h, -h), new THREE.Vector3(h, h, -h), new THREE.Vector3(-h, h, -h)];
}

function gradientColor(y, minY, maxY) {
	const raw = (y - minY) / Math.max(1e-6, maxY - minY); // 0..1
	const t = Math.pow(raw, 0.7); //  easing
	const cool = new THREE.Color("#4F46E5");
	const warm = new THREE.Color("#D946EF");
	return cool.clone().lerp(warm, t);
}

/**
 * draw gradient edges (still need do to the animation)
 * Props:
 *  - size: cube size (same as FRAME_SIZE)
 */
export default function CubeEdgesFlow({ size, lineWidth = 1.2, opacity = 0.95 }) {
	// just outside the cube to avoid z-fighting
	const sizeOffset = 0.02;
	const corners = cubeCorners(size + sizeOffset);

	// bounds for gradient
	const ys = corners.map((v) => v.y);
	const minY = Math.min(...ys);
	const maxY = Math.max(...ys);

	return EDGE_INDICES.map(([a, b], i) => {
		const A = corners[a];
		const B = corners[b];

		// NOTE: use real THREE.Color objects for vertexColors
		const ca = gradientColor(A.y, minY, maxY);
		const cb = gradientColor(B.y, minY, maxY);

		return <Line key={`grad-edge-${i}`} points={[A, B]} vertexColors={[ca, cb]} lineWidth={lineWidth} transparent opacity={opacity} depthTest={false} renderOrder={10} />;
	});
}
