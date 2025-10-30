import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default function GuideArrows() {
	const leftPathRef = useRef(null);
	const rightPathRef = useRef(null);
	const leftDotRef = useRef(null);
	const rightDotRef = useRef(null);

	useLayoutEffect(() => {
		const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

		const setupDotOnly = (pathEl, dotEl) => {
			if (!pathEl || !dotEl) return;

			// line stays static; only dot moves
			if (!reduce) {
				gsap.to(dotEl, {
					duration: 2.2,
					ease: "none",
					repeat: -1,
					motionPath: {
						path: pathEl,
						align: pathEl,
						autoRotate: true,
						alignOrigin: [0.5, 0.5],
					},
				});
			} else {
				dotEl.style.display = "none";
			}
		};

		setupDotOnly(leftPathRef.current, leftDotRef.current);
		setupDotOnly(rightPathRef.current, rightDotRef.current);

		return () => {
			gsap.killTweensOf(leftDotRef.current);
			gsap.killTweensOf(rightDotRef.current);
		};
	}, []);

	return (
		<>
			{/* LEFT */}
			<div className="arrow arrow-left">
				<svg viewBox="0 0 120 120" className="arrow-svg" aria-hidden="true">
					{/* Arrowhead marker */}
					<defs>
						<marker id="arrowHeadL" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
							<path d="M 0 0 L 10 5 L 0 10 z" />
						</marker>
					</defs>

					<path ref={leftPathRef} d="M 100 90 Q 30 60 100 30" className="arrow-path" markerEnd="url(#arrowHeadL)" />

					{/* Glow dot that slides over the path  */}
					<circle ref={leftDotRef} className="arrow-dot" r="3" cx="0" cy="0" />
				</svg>
				<span className="arrow-label">turn around</span>
			</div>

			{/* RIGHT */}
			<div className="arrow arrow-right">
				<svg viewBox="0 0 120 120" className="arrow-svg" aria-hidden="true">
					<defs>
						<marker id="arrowHeadR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
							<path d="M 0 0 L 10 5 L 0 10 z" />
						</marker>
					</defs>

					<path ref={rightPathRef} d="M 20 30 Q 90 60 20 90" className="arrow-path" markerEnd="url(#arrowHeadR)" />

					<circle ref={rightDotRef} className="arrow-dot" r="3" cx="0" cy="0" />
				</svg>
				<span className="arrow-label">turn around</span>
			</div>
		</>
	);
}
