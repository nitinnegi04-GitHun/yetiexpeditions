import { set } from 'sanity'
import type { BooleanInputProps } from 'sanity'

export function VisibilityToggle(props: BooleanInputProps) {
  const { value, onChange, readOnly } = props
  const isVisible = value !== false

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (!readOnly) {
      onChange(set(!isVisible))
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={readOnly}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '6px',
        border: `1px solid ${isVisible ? '#16a34a' : '#dc2626'}`,
        backgroundColor: isVisible ? '#f0fdf4' : '#fef2f2',
        cursor: readOnly ? 'not-allowed' : 'pointer',
        width: '100%',
        textAlign: 'left',
        transition: 'all 0.15s ease',
        outline: 'none',
      }}
    >
      {/* Toggle pill */}
      <div
        style={{
          position: 'relative',
          width: '40px',
          height: '22px',
          borderRadius: '999px',
          backgroundColor: isVisible ? '#16a34a' : '#dc2626',
          flexShrink: 0,
          transition: 'background-color 0.15s ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '3px',
            left: isVisible ? '21px' : '3px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            transition: 'left 0.15s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: isVisible ? '#15803d' : '#b91c1c',
        }}
      >
        {isVisible ? '✓ Visible on homepage' : '✕ Hidden from homepage'}
      </span>
    </button>
  )
}
