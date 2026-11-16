import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { triggerEspresso } from "@/lib/site";


function Cup() {
  const profile = useMemo(
    () => [[0, 0], [0.74, 0], [0.84, 0.06], [1.0, 1.2], [1.07, 1.42], [1.0, 1.44], [0.93, 1.3], [0.78, 0.14], [0, 0.14]].map(([x, y]) => new THREE.Vector2(x, y)),
    []
  );
  return (
    <group>
      <mesh castShadow>
        <latheGeometry args={[profile, 72]} />
        <meshStandardMaterial color="#F4EBDD" roughness={0.32} metalness={0.02} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 1.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.95, 64]} />
        <meshStandardMaterial color="#38251F" roughness={0.15} />
      </mesh>
      <mesh position={[0.05, 1.225, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.42, 48]} />
        <meshStandardMaterial color="#B58A63" roughness={0.4} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.97, 0.72, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.34, 0.085, 18, 48, Math.PI]} />
        <meshStandardMaterial color="#F4EBDD" roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <torusGeometry args={[0.93, 0.025, 8, 80]} />
        <meshStandardMaterial color="#C47B57" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <cylinderGeometry args={[1.75, 1.5, 0.1, 72]} />
        <meshStandardMaterial color="#E7D9C6" roughness={0.45} />
      </mesh>
    </group>
  );
}

function Steam({ offset }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const pts = Array.from({ length: 8 }, (_, i) => new THREE.Vector3(Math.sin(i * 0.9 + offset * 3) * 0.16, i * 0.2, Math.cos(i * 0.7 + offset) * 0.08));
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.03, 8, false);
  }, [offset]);
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.3 + offset) % 1;
    ref.current.position.y = 1.35 + t * 0.7;
    ref.current.material.opacity = Math.sin(t * Math.PI) * 0.55;
  });
  return (
    <mesh ref={ref} geometry={geo} position={[(offset - 0.5) * 0.6, 1.35, 0]}>
      <meshBasicMaterial color="#FDFBF7" transparent opacity={0.3} depthWrite={false} />
    </mesh>
  );
}

function NeuralNet({ count = 16 }) {
  const ref = useRef();
  const { nodes, segs } = useMemo(() => {
    const n = Array.from({ length: count }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const th = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.1 + (i % 3) * 0.2;
      return new THREE.Vector3(r * Math.cos(th) * Math.sin(phi), r * Math.cos(phi) * 0.75 + 0.6, r * Math.sin(th) * Math.sin(phi));
    });
    const s = [];
    n.forEach((a, i) => n.forEach((b, j) => { if (j > i && a.distanceTo(b) < 2.1) s.push(a.x, a.y, a.z, b.x, b.y, b.z); }));
    return { nodes: n, segs: new Float32Array(s) };
  }, [count]);
  useFrame((_, d) => { ref.current.rotation.y += d * 0.08; });
  return (
    <group ref={ref}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[segs, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#B58A63" transparent opacity={0.45} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[i % 4 === 0 ? 0.09 : 0.055, 16, 16]} />
          <meshStandardMaterial color={i % 4 === 0 ? "#C47B57" : "#38251F"} emissive={i % 4 === 0 ? "#C47B57" : "#000"} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Shapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh position={[-1.6, 2.5, -1]}><icosahedronGeometry args={[0.28, 0]} /><meshStandardMaterial color="#C47B57" flatShading /></mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1.5} floatIntensity={1.2}>
        <mesh position={[1.7, -0.8, 0.6]}><torusGeometry args={[0.22, 0.08, 16, 32]} /><meshStandardMaterial color="#B58A63" /></mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[1.4, 2.9, 0.2]}><octahedronGeometry args={[0.26]} /><meshStandardMaterial color="#38251F" wireframe /></mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.6}>
        <group position={[-1.8, 0.8, 1]} rotation={[0.2, 0.5, 0]}>
          <mesh><boxGeometry args={[0.7, 0.46, 0.06]} /><meshStandardMaterial color="#241713" roughness={0.3} /></mesh>
          <mesh position={[-0.12, 0.02, 0.035]}><planeGeometry args={[0.3, 0.05]} /><meshBasicMaterial color="#C47B57" /></mesh>
          <mesh position={[-0.05, -0.08, 0.035]}><planeGeometry args={[0.44, 0.04]} /><meshBasicMaterial color="#B58A63" /></mesh>
        </group>
      </Float>
    </>
  );
}

function Rig({ mobile }) {
  const ref = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const pulse = useRef(0);
  useEffect(() => {
    const on = (e) => { mouse.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 }; };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);
  useFrame(({ clock }) => {
    const g = ref.current;
    const t = clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, mouse.current.x * 0.6 + Math.sin(t * 0.3) * 0.15, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, mouse.current.y * 0.18 + 0.12, 0.05);
    pulse.current = THREE.MathUtils.lerp(pulse.current, 0, 0.08);
    g.scale.setScalar((mobile ? 0.82 : 1) * (1 + pulse.current));
  });
  return (
    <group ref={ref} onClick={() => { pulse.current = 0.1; }} onDoubleClick={triggerEspresso}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <group position={[0, -0.9, 0]}>
          <Cup />
          {[0.1, 0.45, 0.8].map((o) => <Steam key={o} offset={o} />)}
        </group>
      </Float>
      <NeuralNet count={mobile ? 11 : 16} />
      <Shapes />
    </group>
  );
}

export default function HeroScene({ mobile }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className="h-full w-full" data-testid="hero-3d-scene">
      <Canvas frameloop={visible ? "always" : "never"} dpr={[1, 1.75]} camera={{ position: [0, 1.0, 8.6], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 3]} intensity={1.6} color="#FFF3E3" />
        <pointLight position={[-3, 1, 2]} intensity={12} color="#C47B57" />
        <Rig mobile={mobile} />
        <ContactShadows position={[0, -1.05, 0]} opacity={0.35} blur={2.6} far={3} scale={8} color="#241713" />
      </Canvas>
    </div>
  );
}
