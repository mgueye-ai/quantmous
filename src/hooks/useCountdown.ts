import { useEffect, useState } from 'react'

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** True once the target moment has passed. */
  done: boolean
}

function remaining(target: number): Countdown {
  const diff = Math.max(0, target - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff === 0,
  }
}

/** Ticks once per second toward an ISO target date. */
export function useCountdown(targetIso: string): Countdown {
  const target = new Date(targetIso).getTime()
  const [value, setValue] = useState(() => remaining(target))

  useEffect(() => {
    setValue(remaining(target))
    const id = window.setInterval(() => setValue(remaining(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  return value
}
