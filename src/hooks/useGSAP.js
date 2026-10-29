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

 * @param {Function} callback
 * @param {Array} dependencies 
 * @returns {React.RefObject}
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
