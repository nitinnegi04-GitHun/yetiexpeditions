import type { CSSProperties } from 'react'

/**
 * highlightSweep — animated marker-style background highlight.
 *
 * Usage:
 *   <span style={highlightSweep()}>Some text</span>
 *
 * Options:
 *   color   — rgba string for the highlight colour (default: amber)
 *   height  — percentage of line height to cover (default: 75%)
 *   delay   — animation delay in ms (default: 200)
 *   duration — animation duration in ms (default: 1000)
 *
 * Requires these keyframes in globals.css:
 *   @keyframes headline-bg-sweep {
 *     0%   { background-size: 0% 75%; }
 *     60%  { background-size: 105% 75%; }
 *     100% { background-size: 105% 75%; }
 *   }
 */
export function highlightSweep({
    color = 'rgba(255,200,0,0.35)',
    height = 75,
    delay = 200,
    duration = 1000,
}: {
    color?: string
    height?: number
    delay?: number
    duration?: number
} = {}): CSSProperties {
    return {
        background: `linear-gradient(${color}, ${color}) no-repeat left center`,
        backgroundSize: `0% ${height}%`,
        animation: `headline-bg-sweep ${duration}ms ease ${delay}ms 1 forwards`,
        paddingBottom: '2px',
    }
}
