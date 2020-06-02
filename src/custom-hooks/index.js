import { useEffect, useState, useCallback, useRef } from 'react'

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export function useIsMobile(prop) {
  const isClient = typeof window === 'object'

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : null,
      height: isClient ? window.innerHeight : null,
    }
  }, [isClient])

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getSize, isClient])

  if (prop === 'width') {
    return windowSize.width
  }
  if (prop === 'height') {
    return windowSize.height
  }
  return windowSize.width <= 768
}

export function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler)

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler
  }, [handler, savedHandler])

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event)

      // Add event listener
      element.addEventListener(eventName, eventListener)

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element, savedHandler] // Re-run if eventName or element changes
  )
}

export function useKeyPress(targetKeyCode, ref) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false)

  // If pressed key is our target key then set to true
  const downHandler = useCallback(
    ({ keyCode }) => {
      if (keyCode && keyCode === targetKeyCode) {
        setKeyPressed(true)
      }
    },
    [targetKeyCode]
  )

  // clears state the next time this function triggers.
  useEffect(() => {
    if (keyPressed) {
      setKeyPressed(false)
    }
  }, [keyPressed])

  // Add event listeners
  useEffect(() => {
    if (ref) {
      ref.addEventListener('keydown', downHandler)
      return () => {
        ref.removeEventListener('keydown', downHandler)
      }
    }
  }, [downHandler, ref])

  return keyPressed
}
