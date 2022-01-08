import addMinutes from '../addMinutes/index'
import startOfMinute from '../startOfMinute/index'
import type { Interval, StepOptions } from '../types'

/**
 * @name eachMinuteOfInterval
 * @category Interval Helpers
 * @summary Return the array of minutes within the specified time interval.
 *
 * @description
 * Returns the array of minutes within the specified time interval.
 *
 * @param interval - the interval. See [Interval]{@link https://date-fns.org/docs/Interval}
 * @param options - an object with options.
 * @throws {TypeError} 1 argument required
 * @returns {Date[]} the array with starts of minutes from the minute of the interval start to the minute of the interval end
 * @throws {RangeError} `options.step` must be a number equal or greater than 1
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each minute between 14 October 2020, 13:00 and 14 October 2020, 13:03
 * const result = eachMinuteOfInterval({
 *   start: new Date(2014, 9, 14, 13),
 *   end: new Date(2014, 9, 14, 13, 3)
 * })
 * //=> [
 * //   Wed Oct 14 2014 13:00:00,
 * //   Wed Oct 14 2014 13:01:00,
 * //   Wed Oct 14 2014 13:02:00,
 * //   Wed Oct 14 2014 13:03:00
 * // ]
 */
export default function eachMinuteOfInterval(
  interval: Interval,
  options?: StepOptions
): Date[] {
  const startDate = startOfMinute(new Date(interval.start))
  const endDate = new Date(interval.end)

  const startTime = startDate.getTime()
  const endTime = endDate.getTime()

  if (startTime >= endTime) {
    throw new RangeError('Invalid interval')
  }

  const dates = []

  let currentDate = startDate

  const step = Number(options?.step ?? 1)
  if (step < 1 || isNaN(step))
    throw new RangeError(
      '`options.step` must be a number equal to or greater than 1'
    )

  while (currentDate.getTime() <= endTime) {
    dates.push(new Date(currentDate))
    currentDate = addMinutes(currentDate, step)
  }

  return dates
}
