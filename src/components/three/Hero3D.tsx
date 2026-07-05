import { Component, lazy, Suspense, type ReactNode } from 'react'

const Scene = lazy(() => import('./Scene'))

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/** Soft radial gradient shown while loading or when WebGL is unavailable. */
function GradientFallback() {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute right-[-10%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-80 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, #6f8bff 0%, #3b5bdb 40%, #2c3e63 75%, transparent 100%)',
        }}
      />
    </div>
  )
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) return <GradientFallback />
    return this.props.children
  }
}

export default function Hero3D() {
  if (!hasWebGL()) return <GradientFallback />

  return (
    <SceneBoundary>
      <Suspense fallback={<GradientFallback />}>
        <Scene />
      </Suspense>
    </SceneBoundary>
  )
}
