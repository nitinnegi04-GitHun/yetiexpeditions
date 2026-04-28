import { CopyIcon } from '@sanity/icons'
import { useCallback, useState } from 'react'
import { DocumentActionComponent, useClient } from 'sanity'

const OMIT_KEYS = new Set(['_id', '_rev', '_createdAt', '_updatedAt'])

export const DuplicateTrekAction: DocumentActionComponent = ({ type, published }) => {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handle = useCallback(async () => {
    if (!published) return

    setIsLoading(true)
    setError(null)
    try {
      const rest = Object.fromEntries(
        Object.entries(published).filter(([k]) => !OMIT_KEYS.has(k))
      )

      const baseName = (rest.name as string) ?? 'Trek'
      const baseSlug =
        (rest.slug as { current: string } | undefined)?.current ??
        baseName.toLowerCase().replace(/\s+/g, '-')

      await client.create({
        ...rest,
        _type: type,
        name: `${baseName} (Copy)`,
        slug: { _type: 'slug', current: `${baseSlug}-copy` },
      })
    } catch (err) {
      setError(String(err))
    } finally {
      setIsLoading(false)
    }
  }, [published, client, type])

  if (type !== 'trek') return null

  return {
    label: isLoading ? 'Duplicating…' : 'Duplicate Trek',
    icon: CopyIcon,
    onHandle: handle,
    disabled: isLoading || !published,
    tone: error ? 'critical' : undefined,
    dialog: error
      ? { type: 'confirm', message: `Duplication failed: ${error}`, onConfirm: () => setError(null), onCancel: () => setError(null) }
      : undefined,
  }
}
