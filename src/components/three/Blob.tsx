import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import type { Mesh } from 'three'
import { MathUtils } from 'three'

type BlobProps = {
  reducedMotion?: boolean
}

/**
 * A glossy, gently distorted sphere - the hero focal point.
 * Rotates slowly on its own and leans subtly toward the pointer.
 */
export default function Blob({ reducedMotion = false }: BlobProps) {
  const mesh = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (!mesh.current) return
    const t = state.clock.getElapsedTime()

    // Idle rotation
    if (!reducedMotion) {
      mesh.current.rotation.y += delta * 0.12
      mesh.current.rotation.z = Math.sin(t * 0.2) * 0.06
    }

    // Subtle pointer parallax (pointer is normalized -1..1)
    const targetX = MathUtils.clamp(state.pointer.y * 0.25, -0.4, 0.4)
    const targetY = mesh.current.rotation.y
    mesh.current.rotation.x = MathUtils.lerp(mesh.current.rotation.x, targetX, 0.05)
    mesh.current.rotation.y = MathUtils.lerp(targetY, targetY + state.pointer.x * 0.15, 0.05)
  })

  return (
    <mesh ref={mesh} scale={2.1} castShadow>
      <icosahedronGeometry args={[1, 64]} />
      <MeshDistortMaterial
        color="#3b5bdb"
        distort={reducedMotion ? 0.18 : 0.38}
        speed={reducedMotion ? 0 : 1.6}
        roughness={0.12}
        metalness={0.9}
        envMapIntensity={1.15}
      />
    </mesh>
  )
}
