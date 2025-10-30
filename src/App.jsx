import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import CubeNav from "./components/CubeNav";
import "./App.css";
import GuideArrows from "./components/GuideArrows";

export default function App() {
	return (
		<>
			<section id="home" className="hero">
				<div className="canvas-wrap">
					<Canvas camera={{ position: [3.2, 2.0, 4.0], fov: 50 }}>
						<ambientLight intensity={0.3} />

						{/* KEY light: from front-right, low enough so the front really gets light */}
						<directionalLight position={[2.2, 1.0, 3.2]} intensity={1.55} />

						{/* FILL light: soft, from front-left (so shadows are less harsh)  */}
						<directionalLight position={[-2.0, 0.6, 1.2]} intensity={0.55} />

						{/* RIM light: from behind for relief/contour */}
						<directionalLight position={[-0.6, 0.9, -3.6]} intensity={0.75} />

						{/* HDRI for realistic reflections */}
						<Environment preset="city" />

						<CubeNav />

						<OrbitControls enableZoom={false} />
					</Canvas>
					<GuideArrows />
				</div>
				<h1 className="brand">Beatrice Bjoko</h1>
			</section>

			{/* Target sections*/}
			<section id="projects" className="section">
				Projects sectie (grid komt later)
			</section>
			<section id="about" className="section">
				About sectie (bio/skills)
			</section>
			<section id="contact" className="section">
				Contact sectie (mail + socials)
			</section>
		</>
	);
}
