import { useCallback, useRef, useState } from 'react'
import { Box, Button, Card, Flex, Text } from '@sanity/ui'
import { UploadIcon } from '@sanity/icons'
import { useClient } from 'sanity'
import { convertHeicIfNeeded } from '../lib/heic'

const API_VERSION = '2024-01-01'

// Props typed as `any` rather than importing AssetSourceComponentProps from @sanity/types —
// the `sanity` package ships its own nested copy of @sanity/types with a slightly different
// version, and cross-importing the top-level one causes type-identity conflicts on the
// onSelect/onClose callback signatures. Runtime shape verified against Sanity's
// AssetSourceComponentProps contract (asset source docs).
function HeicSafeUploadComponent(props: {
  assetType?: string
  onSelect: (assets: any[]) => void
  onClose: () => void
}) {
  const assetType: 'file' | 'image' = props.assetType === 'file' ? 'file' : 'image'
  const { onSelect, onClose } = props
  const client = useClient({ apiVersion: API_VERSION })
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleFile = useCallback(
    async (file: File) => {
      setStatus('uploading')
      setErrorMessage('')
      try {
        const uploadFile = assetType === 'image' ? await convertHeicIfNeeded(file) : file
        const asset = await client.assets.upload(assetType, uploadFile)
        onSelect([{ kind: 'assetDocumentId', value: asset._id, assetDocumentProps: asset }])
      } catch (err) {
        setStatus('error')
        setErrorMessage(err instanceof Error ? err.message : 'Upload failed')
      }
    },
    [assetType, client, onSelect]
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const file = event.dataTransfer.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  return (
    <Box padding={4}>
      <Card
        padding={4}
        radius={2}
        border
        tone={status === 'error' ? 'critical' : 'default'}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Flex direction="column" align="center" gap={3}>
          <Text size={1} muted>
            Drag and drop a file here, or
          </Text>
          <Button
            text={status === 'uploading' ? 'Uploading…' : 'Select file'}
            icon={UploadIcon}
            tone="primary"
            disabled={status === 'uploading'}
            onClick={() => inputRef.current?.click()}
          />
          <Text size={1} muted>
            Supports HEIC/HEIF (auto-converted to JPEG)
          </Text>
          {status === 'error' && (
            <Text size={1} style={{ color: 'var(--card-critical-fg-color, #f03e2f)' }}>
              {errorMessage}
            </Text>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={assetType === 'image' ? 'image/*,.heic,.heif' : undefined}
            style={{ display: 'none' }}
            onChange={handleInputChange}
          />
        </Flex>
      </Card>
      <Flex justify="flex-end" marginTop={3}>
        <Button text="Cancel" mode="bleed" onClick={onClose} />
      </Flex>
    </Box>
  )
}

export const heicSafeUploadSource = {
  name: 'heic-safe-upload',
  title: 'Upload',
  component: HeicSafeUploadComponent,
  icon: UploadIcon,
  uploadMode: 'component' as const,
}
