import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

const PARTICLE_COUNT = 500;

const Field = () => {
  const pointsRef = useRef(null);
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const t = state.clock.elapsedTime;
    points.rotation.y = t * 0.015;
    points.position.x = Math.sin(t * 0.05) * 0.3 + state.pointer.x * viewport.width * 0.02;
    points.position.y = Math.cos(t * 0.04) * 0.2 + state.pointer.y * viewport.height * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#F5F5F5"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

/**
 * Ambient depth layer for the hero: a soft field of drifting particles that
 * parallax gently with the pointer, like dust in a light beam. Pure
 * decoration — pointer-events-none, low particle count, capped dpr. Hero.jsx
 * only mounts this while the hero is in view and motion isn't reduced.
 */
const HeroParticles = ({ className = '' }) => (
  <Canvas
    className={className}
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 5], fov: 50 }}
    gl={{ alpha: true, antialias: true }}
  >
    <Field />
  </Canvas>
);

export default HeroParticles;
