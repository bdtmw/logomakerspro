'use client';

import { useState } from 'react';

/** Rounds the axis up to a clean number with 2 to 4 integer steps. */
function axis(max) {
  if (max <= 0) return { top: 4, ticks: [0, 1, 2, 3, 4] };
  const raw = max / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = Math.max(1, [1, 2, 5, 10].map((m) => m * mag).find((s) => s >= raw));
  const top = Math.ceil(max / step) * step;
  const ticks = [];
  for (let t = 0; t <= top; t += step) ticks.push(t);
  return { top, ticks };
}

/**
 * Single-series column chart. data: [{ key, label, tick, value }]; `tick` is the short x-axis label and only some
 * are shown so they never collide. Each column shows its value on hover or keyboard focus; the busiest column is
 * labelled on its cap; the same numbers are in the table below the chart.
 */
export default function ColumnChart({ data, unit = 'leads', title }) {
  const [active, setActive] = useState(null);
  const max = Math.max(0, ...data.map((d) => d.value));
  const { top, ticks } = axis(max);
  const peak = max > 0 ? data.findIndex((d) => d.value === max) : -1;
  const every = Math.ceil(data.length / 7);
  const plural = (n) => `${n.toLocaleString('en-US')} ${n === 1 ? unit.replace(/s$/, '') : unit}`;

  return (
    <figure className="crm-chart">
      <div className="crm-chart__plot">
        <div className="crm-chart__grid" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} style={{ bottom: `${(t / top) * 100}%` }}>
              <em>{t.toLocaleString('en-US')}</em>
            </span>
          ))}
        </div>
        <div className="crm-chart__bars" role="list" aria-label={title} onPointerLeave={() => setActive(null)}>
          {data.map((d, i) => (
            <div
              key={d.key}
              role="listitem"
              tabIndex={0}
              aria-label={`${d.label}: ${plural(d.value)}`}
              className={active === i ? 'crm-chart__col is-active' : 'crm-chart__col'}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              {d.value > 0 && <span className="crm-chart__bar" style={{ height: `${(d.value / top) * 100}%` }} />}
              {i === peak && (
                <span className="crm-chart__cap" style={{ bottom: `${(d.value / top) * 100}%` }}>
                  {d.value.toLocaleString('en-US')}
                </span>
              )}
              {active === i && (
                <span className={i > data.length / 2 ? 'crm-chart__tip crm-chart__tip--left' : 'crm-chart__tip'} role="tooltip">
                  <strong>{plural(d.value)}</strong>
                  <span>{d.label}</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="crm-chart__x" aria-hidden="true">
        {data.map((d, i) => (
          <span key={d.key}>{i % every === 0 ? d.tick : ''}</span>
        ))}
      </div>
      <details className="crm-chart__table">
        <summary>Show as table</summary>
        <table className="crm-table">
          <thead>
            <tr>
              <th>Period</th>
              <th className="crm-num">{unit[0].toUpperCase() + unit.slice(1)}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.key}>
                <td>{d.label}</td>
                <td className="crm-num">{d.value.toLocaleString('en-US')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
