import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import Blob from './Blob'
import { usePrefersReducedMotion, useIsMobile } from '../../hooks/useMediaQuery'

/**
 * Hero 3D scene. Uses a procedurally-built studio environment (Lightformers)
 * so there is no external HDRI download - fully self-contained and offline-safe.
 */
export default function Scene() {
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} />
        <directionalLight position={[-6, -2, -4]} intensity={0.4} color="#9db4ff" />

        <Float
          speed={reducedMotion ? 0 : 1.1}
          rotationIntensity={reducedMotion ? 0 : 0.4}
          floatIntensity={reducedMotion ? 0 : 0.7}
        >
          <Blob reducedMotion={reducedMotion} />
        </Float>

        {/* Procedural studio env for glossy reflections (no network fetch) */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 0]}>
            <Lightformer intensity={2} position={[0, 4, -6]} scale={[10, 10, 1]} color="#ffffff" />
            <Lightformer intensity={1.4} position={[-4, 1, -4]} scale={[6, 6, 1]} color="#c9d6ff" />
            <Lightformer intensity={1.2} position={[4, -1, -4]} scale={[6, 6, 1]} color="#eef2ff" />
            <Lightformer intensity={0.8} position={[0, -4, 2]} scale={[10, 6, 1]} color="#dfe6f5" />
          </group>
        </Environment>
      </Suspense>
    </Canvas>
  )
}
