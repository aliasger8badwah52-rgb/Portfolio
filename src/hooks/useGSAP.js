import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP as useGSAPOfficial } from '@gsap/react'

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAPOfficial)
}

export { gsap, ScrollTrigger }
export const useGSAP = useGSAPOfficial

/**
 * Custom hook to safely initialize GSAP context with automatic cleanup
 * @param {Function} callback - Function containing GSAP animations
 * @param {Array} dependencies - React dependency array
 * @returns {React.RefObject} - Ref object to attach to the container element
 */
export function useGSAPContext(callback, dependencies = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      callback(containerRef.current)
    }, containerRef)

    return () => ctx.revert()
  }, dependencies)

  return containerRef
}
