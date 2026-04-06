'use client';

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

interface DataPoint {
    day: number;
    label: string;
    altitude: number;
}

function CustomTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload as DataPoint;
    return (
        <div className="bg-slate-900 border border-zinc-border px-4 py-3 shadow-lg">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-1">Day {d.day}</p>
            <p className="text-sm font-black uppercase tracking-tight text-white">{d.label}</p>
            <p className="text-xs font-bold text-slate-300 mt-1">
                {d.altitude.toLocaleString()}m
            </p>
        </div>
    );
}

export default function AltitudeChart({ data, maxAltitude }: { data: DataPoint[]; maxAltitude: string }) {
    const altitudes = data.map(d => d.altitude);
    const min = Math.min(...altitudes);
    const max = Math.max(...altitudes);
    const yMin = Math.floor((min - 200) / 500) * 500;
    const yMax = Math.ceil((max + 200) / 500) * 500;

    return (
        <div className="w-full h-[280px] sm:h-[340px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="altGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff4500" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#ff4500" stopOpacity={0.02} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e4e4e7"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8', fontFamily: 'monospace' }}
                        axisLine={{ stroke: '#e4e4e7' }}
                        tickLine={false}
                        interval={0}
                        angle={-35}
                        textAnchor="end"
                        height={48}
                    />

                    <YAxis
                        domain={[yMin, yMax]}
                        tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8', fontFamily: 'monospace' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                        width={36}
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ff4500', strokeWidth: 1, strokeDasharray: '4 2' }} />

                    <ReferenceLine
                        y={max}
                        stroke="#ff4500"
                        strokeDasharray="4 3"
                        strokeOpacity={0.4}
                        label={{
                            value: `SUMMIT ${maxAltitude}`,
                            position: 'insideTopRight',
                            fontSize: 8,
                            fontWeight: 700,
                            fill: '#ff4500',
                            fontFamily: 'monospace',
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="altitude"
                        stroke="#ff4500"
                        strokeWidth={2}
                        fill="url(#altGradient)"
                        dot={{ r: 3.5, fill: '#ff4500', stroke: '#fff', strokeWidth: 1.5 }}
                        activeDot={{ r: 5, fill: '#ff4500', stroke: '#fff', strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
