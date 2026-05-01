import { useEffect, useRef, useState } from 'react'

const TERMS = [
  { name: 'Term 1', start: new Date(2026, 0, 28), end: new Date(2026, 3, 3)  },
  { name: 'Term 2', start: new Date(2026, 3, 20), end: new Date(2026, 5, 26) },
  { name: 'Term 3', start: new Date(2026, 6, 13), end: new Date(2026, 8, 18) },
  { name: 'Term 4', start: new Date(2026, 9, 5),  end: new Date(2026, 11, 18)},
]

const NORMAL_SCHEDULE = [
  { period: 'Locker Music', start: '08:55', end: '09:00' },
  { period: 'Period 1',     start: '09:00', end: '10:14' },
  { period: 'Period 2',     start: '10:14', end: '11:28' },
  { period: 'RECESS TIME',  start: '11:28', end: '11:48' },
  { period: 'Locker Music', start: '11:48', end: '11:53' },
  { period: 'Period 3',     start: '11:53', end: '13:07' },
  { period: 'LUNCH TIME',   start: '13:07', end: '13:52' },
  { period: 'Locker Music', start: '13:52', end: '13:57' },
  { period: 'Period 4',     start: '13:57', end: '15:11' },
]

const ASSEMBLY_SCHEDULE = [
  { period: 'Locker Music', start: '08:55', end: '09:00' },
  { period: 'Period 1',     start: '09:00', end: '10:09' },
  { period: 'Period 2',     start: '10:09', end: '11:18' },
  { period: 'RECESS TIME',  start: '11:18', end: '11:38' },
  { period: 'Locker Music', start: '11:38', end: '11:43' },
  { period: 'Period 3',     start: '11:43', end: '12:52' },
  { period: 'Assembly Time',start: '12:52', end: '13:12' },
  { period: 'LUNCH TIME',   start: '13:12', end: '13:57' },
  { period: 'Locker Music', start: '13:57', end: '14:02' },
  { period: 'Period 4',     start: '14:02', end: '15:11' },
]

const PUBLIC_HOLIDAYS = new Set([
  '2026-01-01', '2026-01-26', '2026-03-09',
  '2026-04-03', '2026-04-04', '2026-04-06',
  '2026-04-25', '2026-06-08', '2026-09-25',
  '2026-11-03', '2026-12-25', '2026-12-26', '2026-12-28',
])

const SPECIAL_DAYS = {
  '2026-03-26': {
    name: 'Sub-school Assembly Day',
    schedule: ASSEMBLY_SCHEDULE,
  },
  '2026-04-02': {
    name: 'Last Day of Term 1 – Whole School Assembly P3',
    schedule: [
      { period: 'Locker Music',                             start: '08:55', end: '09:00' },
      { period: 'Period 1',                                 start: '09:00', end: '10:05' },
      { period: 'Period 2',                                 start: '10:05', end: '11:10' },
      { period: 'RECESS TIME',                              start: '11:10', end: '11:30' },
      { period: 'Locker Music',                             start: '11:30', end: '11:35' },
      { period: 'Period 3 – WHOLE SCHOOL ASSEMBLY AT GYM!', start: '11:35', end: '12:40' },
      { period: 'LUNCH TIME',                               start: '12:40', end: '13:15' },
      { period: 'Locker Music',                             start: '13:15', end: '13:20' },
      { period: 'Period 4',                                 start: '13:20', end: '14:30' },
    ],
  },
}

const toLocalDateString = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const getWeekNumber = (now, termStart) => {
  const startDow = termStart.getDay()
  const mondayOffset = startDow === 0 ? -6 : 1 - startDow
  const monday = new Date(termStart)
  monday.setDate(termStart.getDate() + mondayOffset)
  monday.setHours(0, 0, 0, 0)
  return Math.floor((now - monday) / 86_400_000 / 7) + 1
}

const timeOnDay = (ref, hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  const d = new Date(ref)
  d.setHours(h, m, 0, 0)
  return d
}

const getCurrentPeriod = (schedule, now) =>
  schedule.find((slot) => now >= timeOnDay(now, slot.start) && now < timeOnDay(now, slot.end)) ?? null

export function useDateTime() {
  const [state, setState] = useState({
    dateTime: '',
    termWeek: '',
    weekType: '',
    periodText: '',
    lateNight: false,
    showTimezoneWarning: false,
  })

  const isNarrowRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 600)

  useEffect(() => {
    const onResize = () => { isNarrowRef.current = window.innerWidth <= 600 }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const hour = now.getHours()
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const isMelbourne = tz === 'Australia/Melbourne'
      const showTimezoneWarning = !isMelbourne

      const dateOpts = isNarrowRef.current
        ? { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
        : { weekday: 'long',  day: 'numeric', month: 'long',  year: 'numeric' }

      const dateStr = now.toLocaleDateString('en-GB', dateOpts)
      let timeStr = now.toLocaleTimeString('en-GB', {
        hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,
      })
      timeStr = timeStr.replace(/^0:/, '12:')

      const dateTime = isMelbourne
        ? `${dateStr} – ${timeStr}`
        : `${dateStr} – ${timeStr} (${tz})`

      if (hour >= 23 || hour < 4) {
        setState({ dateTime, termWeek: '', weekType: '', periodText: "Better sleep now, it's gettin late! 💔💔🥀", lateNight: true, showTimezoneWarning })
        return
      }

      const dow = now.getDay()
      if (dow === 0 || dow === 6) {
        setState({ dateTime, termWeek: 'Weekend times! Have a good rest!', weekType: '', periodText: '', lateNight: false, showTimezoneWarning })
        return
      }

      const yyyyMmDd = toLocalDateString(now)
      if (PUBLIC_HOLIDAYS.has(yyyyMmDd)) {
        setState({ dateTime, termWeek: 'Public Holiday! Have fun!', weekType: '', periodText: '', lateNight: false, showTimezoneWarning })
        return
      }

      const currentTerm = TERMS.find((t) => {
        const endOfDay = new Date(t.end)
        endOfDay.setHours(23, 59, 59, 999)
        return now >= t.start && now <= endOfDay
      })

      if (!currentTerm) {
        const nextTerm = TERMS.find((t) => now < t.start)
        const daysUntil = nextTerm ? Math.ceil((nextTerm.start - now) / 86_400_000) : null
        const termWeek = nextTerm
          ? `Holiday break – ${daysUntil} day${daysUntil !== 1 ? 's' : ''} until ${nextTerm.name}`
          : 'End of year holiday, see you next year!'
        setState({ dateTime, termWeek, weekType: '', periodText: '', lateNight: false, showTimezoneWarning })
        return
      }

      const weekNumber   = getWeekNumber(now, currentTerm.start)
      const isThursday   = dow === 4
      const isAssemblyWk = weekNumber % 2 === 0
      const specialDay   = SPECIAL_DAYS[yyyyMmDd]

      const termWeek = `${currentTerm.name} – Week ${weekNumber}`

      let weekType = ''
      if (specialDay) {
        weekType = specialDay.name
      } else if (isAssemblyWk && isThursday) {
        const assemblyStart = timeOnDay(now, '12:52')
        const msUntil = assemblyStart - now
        if (msUntil > 0 && msUntil <= 3_600_000) {
          const mins = Math.floor(msUntil / 60_000)
          const secs = Math.floor((msUntil % 60_000) / 1_000)
          weekType = `Assembly starts in ${mins}m ${secs}s!`
        } else if (now >= assemblyStart) {
          weekType = 'Assembly Week'
        } else {
          weekType = 'Assembly today at 12:52 PM!'
        }
      } else if (isAssemblyWk) {
        weekType = 'Assembly Week'
      } else {
        weekType = 'Regular Week'
      }

      const schedule =
        specialDay?.schedule ??
        (isAssemblyWk && isThursday ? ASSEMBLY_SCHEDULE : NORMAL_SCHEDULE)

      const schoolStart = timeOnDay(now, '08:55')
      const schoolEnd   = timeOnDay(now, '15:11')

      let periodText = ''
      if (now >= schoolStart && now < schoolEnd) {
        const slot = getCurrentPeriod(schedule, now)
        periodText = slot ? `${slot.period} | ${slot.start} – ${slot.end}` : 'Between periods...'
      } else if (now >= schoolEnd) {
        periodText = 'School ended! Have a great day!'
      }

      setState({ dateTime, termWeek, weekType, periodText, lateNight: false, showTimezoneWarning })
    }

    tick()
    const id = window.setInterval(tick, 1_000)
    return () => window.clearInterval(id)
  }, [])

  return state
}