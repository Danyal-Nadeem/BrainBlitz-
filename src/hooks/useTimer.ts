import { useState, useRef, useEffect, useCallback } from 'react'

interface UseTimerReturn {
  timeLeft: number
  progress: number   // 1.0 = full, 0.0 = empty
  reset: (duration: number) => void
  stop: () => void
}

export function useTimer(
  initialDuration: number,
  onExpire: () => void
): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState(initialDuration)
  const durationRef  = useRef(initialDuration)
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const onExpireRef  = useRef(onExpire)

  useEffect(() => { onExpireRef.current = onExpire }, [onExpire])

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback((duration: number) => {
    clearTimer()
    durationRef.current = duration
    setTimeLeft(duration)
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer()
          onExpireRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [clearTimer])

  const reset = useCallback((duration: number) => {
    startTimer(duration)
  }, [startTimer])

  const stop = useCallback(() => {
    clearTimer()
  }, [clearTimer])

  useEffect(() => {
    startTimer(initialDuration)
    return clearTimer
  }, []) // intentionally empty deps — only runs on mount

  const progress = timeLeft / durationRef.current

  return { timeLeft, progress, reset, stop }
}
