import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDownToLine,
  Check,
  ChevronDown,
  CircleHelp,
  CloudUpload,
  FileImage,
  Github,
  Image as ImageIcon,
  Info,
  Layers,
  LayoutDashboard,
  Menu,
  Monitor,
  Moon,
  MoreHorizontal,
  Smartphone,
  Sparkles,
  UploadCloud,
  X
} from 'lucide-react'
import './index.css'
import WatermarkOverlay from './WatermarkOverlay'
import { PLATFORMS, PlatformIcon } from './platforms/data'
import { MultiPlatformPreviewFrame } from './platforms/mockups'

class AppErrorBoundary extends React.Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="grid min-h-screen place-items-center bg-[#1e1f22] px-6 text-white">
          <div className="max-w-lg rounded-2xl border border-[#ed4245]/30 bg-[#2b2d31] p-6 shadow-2xl">
            <h1 className="text-lg font-bold">Previewer failed to load</h1>
            <p className="mt-2 text-sm leading-6 text-[#949ba4]">
              Refresh the page or restart the dev server. The browser reported: {this.state.error.message}
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

const acceptedImageTypes = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
const acceptedImageLabel = 'PNG, JPG, Animated WebP, GIF'

function assetReducer(state, action) {
  switch (action.type) {
    case 'upload':
      return { ...state, [action.assetType]: action.asset }
    case 'remove':
      return { ...state, [action.assetType]: undefined }
    default:
      return state
  }
}

function isAnimatedAsset(file) {
  return file.type === 'image/gif' || file.type === 'image/webp' || /\.(gif|webp)$/i.test(file.name)
}

async function createAsset(file) {
  const url = URL.createObjectURL(file)
  const image = new Image()
  try {
    image.src = url
    await image.decode()

    const asset = {
      file,
      url,
      width: image.naturalWidth,
      height: image.naturalHeight,
      animated: isAnimatedAsset(file),
      renderUrl: url
    }

    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    canvas.getContext('2d').drawImage(image, 0, 0)
    asset.palette = extractDominantColors(canvas)
    if (!asset.animated) asset.renderUrl = canvas.toDataURL(file.type)

    return asset
  } catch (error) {
    URL.revokeObjectURL(url)
    throw error
  }
}

function extractDominantColors(canvas) {
  const sample = document.createElement('canvas')
  const size = 48
  sample.width = size
  sample.height = size
  sample.getContext('2d').drawImage(canvas, 0, 0, size, size)
  const pixels = sample.getContext('2d').getImageData(0, 0, size, size).data
  const buckets = new Map()

  for (let index = 0; index < pixels.length; index += 4) {
    const alpha = pixels[index + 3]
    if (alpha < 180) continue
    const red = Math.min(255, Math.round(pixels[index] / 24) * 24)
    const green = Math.min(255, Math.round(pixels[index + 1] / 24) * 24)
    const blue = Math.min(255, Math.round(pixels[index + 2] / 24) * 24)
    const key = `${red},${green},${blue}`
    buckets.set(key, (buckets.get(key) || 0) + 1)
  }

  return [...buckets.entries()]
    .sort(([, first], [, second]) => second - first)
    .slice(0, 4)
    .map(([key]) => key.split(',').map(Number).map((value) => value.toString(16).padStart(2, '0')).join('').toUpperCase())
    .map((hex) => `#${hex}`)
}

function drawRoundedRect(context, x, y, width, height, radius) {
  if (typeof context.roundRect === 'function') {
    context.roundRect(x, y, width, height, radius)
    return
  }
  context.beginPath()
  context.moveTo(x + radius, y)
  context.arcTo(x + width, y, x + width, y + height, radius)
  context.arcTo(x + width, y + height, x, y + height, radius)
  context.arcTo(x, y + height, x, y, radius)
  context.arcTo(x, y, x + width, y, radius)
  context.closePath()
}

function App() {
  const [activePlatformId, setActivePlatformId] = useState('discord')
  const [view, setView] = useState('desktop')
  const [files, dispatchFiles] = useReducer(assetReducer, {})
  const [dragging, setDragging] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [safeZoneGrid, setSafeZoneGrid] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [copiedColor, setCopiedColor] = useState('')
  const [processingAsset, setProcessingAsset] = useState(null)
  const uploadRequestRef = useRef({})

  const activePlatform = useMemo(
    () => PLATFORMS.find((p) => p.id === activePlatformId) || PLATFORMS[0],
    [activePlatformId]
  )

  const currentAssets = useMemo(
    () => [
      {
        id: 'banner',
        label: activePlatform.bannerSpecs.label,
        hint: activePlatform.bannerSpecs.hint,
        kind: 'banner'
      },
      {
        id: 'icon',
        label: activePlatform.iconSpecs.label,
        hint: activePlatform.iconSpecs.hint,
        kind: 'icon'
      }
    ],
    [activePlatform]
  )

  const filesRef = useRef(files)
  useEffect(() => {
    filesRef.current = files
  }, [files])

  useEffect(() => () => {
    Object.values(filesRef.current).forEach((asset) => asset?.url && URL.revokeObjectURL(asset.url))
  }, [])

  const addFile = useCallback(async (type, file) => {
    if (!file) return
    if (!acceptedImageTypes.has(file.type) && !/\.(png|jpe?g|webp|gif)$/i.test(file.name)) {
      setUploadError(`"${file.name}" is not supported. Use ${acceptedImageLabel}.`)
      return
    }

    const requestId = (uploadRequestRef.current[type] || 0) + 1
    uploadRequestRef.current[type] = requestId
    try {
      setProcessingAsset(type)
      setUploadError('')
      const asset = await createAsset(file)
      if (uploadRequestRef.current[type] !== requestId) {
        URL.revokeObjectURL(asset.url)
        return
      }
      const previousAsset = filesRef.current[type]
      if (previousAsset?.url && previousAsset.url !== asset.url) URL.revokeObjectURL(previousAsset.url)
      dispatchFiles({ type: 'upload', assetType: type, asset })
      setProcessingAsset(null)
    } catch {
      if (uploadRequestRef.current[type] === requestId) {
        setProcessingAsset(null)
        setUploadError(`Could not read "${file.name}". Try another image.`)
      }
    }
  }, [])

  const handleDrop = (event, type) => {
    event.preventDefault()
    setDragging(null)
    addFile(type, event.dataTransfer.files?.[0])
  }

  const clearFile = (event, type) => {
    event.stopPropagation()
    uploadRequestRef.current[type] = (uploadRequestRef.current[type] || 0) + 1
    setProcessingAsset(null)
    const asset = files[type]
    if (asset?.url) URL.revokeObjectURL(asset.url)
    dispatchFiles({ type: 'remove', assetType: type })
  }

  const bannerStyle = useMemo(
    () => (files.banner && !files.banner.animated ? { backgroundImage: `url(${files.banner.renderUrl})` } : {}),
    [files.banner]
  )
  const palette = files.banner?.palette || []

  const copyColor = async (color) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopiedColor(color)
      window.setTimeout(() => setCopiedColor(''), 1400)
    } catch {
      setUploadError('Clipboard access is unavailable. Select the HEX value manually.')
    }
  }

  const downloadSpecSheet = async () => {
    if (!files.banner) {
      setUploadError('Upload a banner image before downloading a spec sheet.')
      return
    }
    try {
      const image = new Image()
      image.src = files.banner.url
      await image.decode()

      const canvas = document.createElement('canvas')
      canvas.width = 1200
      canvas.height = 760
      const context = canvas.getContext('2d')

      // Background
      context.fillStyle = '#18191c'
      context.fillRect(0, 0, canvas.width, canvas.height)

      // Header branding
      context.fillStyle = '#ffffff'
      context.font = '700 32px Arial'
      context.fillText('bannerpreview.tech', 64, 72)

      // Platform label
      context.fillStyle = activePlatform.brandColor || '#5865f2'
      context.font = '700 16px Arial'
      context.fillText(`${activePlatform.name.toUpperCase()} ASSET SPECIFICATION`, 64, 104)

      // Banner preview container
      context.fillStyle = '#232428'
      drawRoundedRect(context, 64, 136, 1072, 360, 18)
      context.fill()

      // Scaled banner inside container
      const scale = Math.min(1010 / image.naturalWidth, 300 / image.naturalHeight)
      const width = image.naturalWidth * scale
      const height = image.naturalHeight * scale
      context.drawImage(image, 95 + (1010 - width) / 2, 166 + (300 - height) / 2, width, height)

      // Details section
      context.fillStyle = '#ffffff'
      context.font = '700 20px Arial'
      context.fillText(`${activePlatform.name} banner details`, 64, 550)

      context.fillStyle = '#b5bac1'
      context.font = '15px Arial'
      context.fillText(`Target specs:  ${activePlatform.bannerSpecs.width} × ${activePlatform.bannerSpecs.height} px (${activePlatform.bannerSpecs.ratio})`, 64, 584)
      context.fillText(`Uploaded image:  ${files.banner.width} × ${files.banner.height} px (${files.banner.file.type || 'image'})`, 64, 610)
      context.fillText(`Avatar recommended:  ${activePlatform.iconSpecs.width} × ${activePlatform.iconSpecs.height} px`, 64, 636)

      // Dominant Palette
      context.fillStyle = '#ffffff'
      context.font = '700 20px Arial'
      context.fillText('Dominant palette', 64, 690)

      palette.forEach((color, index) => {
        const x = 270 + index * 180
        context.fillStyle = color
        drawRoundedRect(context, x, 660, 32, 32, 7)
        context.fill()
        context.fillStyle = '#b5bac1'
        context.font = '15px monospace'
        context.fillText(color, x + 44, 682)
      })

      const link = document.createElement('a')
      link.download = `bannerpreview-${activePlatform.id}-spec-sheet.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      setUploadError('Could not generate the spec sheet. Please try the upload again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#131416] text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-white/[.07] bg-[#131416]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <a className="flex items-center gap-2.5" href="/">
            <div
              className="grid h-8 w-8 place-items-center rounded-lg shadow-lg transition-colors"
              style={{ backgroundColor: activePlatform.brandColor }}
            >
              <Sparkles size={17} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-[15px] font-bold tracking-[-.02em]">
              banner<span style={{ color: activePlatform.brandColor }}>preview</span>
              <span className="text-[#949ba4]">.tech</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-[13px] font-medium text-[#949ba4] md:flex">
            <a className="text-white transition hover:text-white" href="#preview">Previewer</a>
            <a className="transition hover:text-white" href="#platforms">Platforms</a>
            <a className="transition hover:text-white" href="#guidelines">Guidelines</a>
            <a className="transition hover:text-white" href="#about">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#949ba4] sm:flex">
              <Github size={15} /> All Platforms Supported
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-lg text-[#949ba4]" title="Dark mode enabled" aria-label="Dark mode enabled">
              <Moon size={16} />
            </div>
            <button
              className="grid h-9 w-9 place-items-center rounded-lg text-[#949ba4] transition hover:bg-white/[.06] hover:text-white md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/[.06] bg-[#191a1d] px-5 py-3 md:hidden">
            <div className="flex flex-col gap-3 text-sm text-[#b5bac1]">
              <a href="#preview" onClick={() => setMenuOpen(false)}>Previewer</a>
              <a href="#platforms" onClick={() => setMenuOpen(false)}>Platforms</a>
              <a href="#guidelines" onClick={() => setMenuOpen(false)}>Guidelines</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-[1440px] px-5 pb-20 pt-8 lg:px-10 lg:pt-12">
        {/* Hero Section */}
        <section className="mb-8 max-w-3xl" id="preview">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.15em] transition-all"
            style={{
              borderColor: `${activePlatform.brandColor}40`,
              backgroundColor: `${activePlatform.brandColor}15`,
              color: activePlatform.brandColor === '#000000' ? '#ffffff' : activePlatform.brandColor
            }}
          >
            <PlatformIcon platformId={activePlatform.id} size={13} />
            <span>{activePlatform.badgeText}</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-[-.045em] text-white sm:text-5xl">
            {activePlatform.heroTitle}{' '}
            <span style={{ color: activePlatform.brandColor }}>{activePlatform.heroTitleHighlight}</span>
          </h1>

          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#949ba4]">
            {activePlatform.heroDescription}
          </p>
        </section>

        {/* Platform Selector Bar */}
        <section className="mb-8" id="platforms">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#949ba4]">Select Platform</span>
            <span className="text-xs text-[#949ba4]">Switching keeps your uploaded assets</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
            {PLATFORMS.map((item) => {
              const isActive = item.id === activePlatformId
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePlatformId(item.id)}
                  className={`group relative flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? 'border-white/20 bg-white/10 text-white shadow-md'
                      : 'border-white/[.07] bg-[#1e2024]/60 text-[#949ba4] hover:border-white/15 hover:bg-[#1e2024] hover:text-white'
                  }`}
                  style={isActive ? { borderColor: `${item.brandColor}70`, backgroundColor: `${item.brandColor}22` } : {}}
                >
                  <span
                    className="grid h-5 w-5 place-items-center rounded-md text-white transition-transform group-hover:scale-110"
                    style={{ color: item.brandColor === '#000000' ? '#ffffff' : item.brandColor }}
                  >
                    <PlatformIcon platformId={item.id} size={15} />
                  </span>
                  <span>{item.name}</span>
                  {isActive && (
                    <span
                      className="h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: item.brandColor }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* Main Work Area: Asset Upload & Live Preview */}
        <div className="grid gap-6 xl:grid-cols-[minmax(330px,390px)_1fr]">
          {/* Left Column: Asset Dropzones */}
          <section className="rounded-2xl border border-white/[.07] bg-[#1a1c20] p-4 shadow-xl sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white">Your assets</h2>
                <p className="mt-1 text-xs text-[#949ba4]">Upload images for {activePlatform.name}</p>
              </div>
              <CircleHelp size={17} className="text-[#949ba4]" />
            </div>

            <div className="space-y-3">
              {currentAssets.map((asset) => (
                <AssetDropzone
                  key={asset.id}
                  asset={asset}
                  brandColor={activePlatform.brandColor}
                  value={files[asset.id]}
                  dragging={dragging === asset.id}
                  onDragEnter={() => setDragging(asset.id)}
                  onDragLeave={() => setDragging(null)}
                  onDrop={(event) => handleDrop(event, asset.id)}
                  onFile={(file) => addFile(asset.id, file)}
                  onClear={(event) => clearFile(event, asset.id)}
                />
              ))}
            </div>

            {uploadError && (
              <p className="mt-3 rounded-lg border border-[#ed4245]/30 bg-[#ed4245]/[.08] px-3 py-2 text-[11px] leading-5 text-[#ff9b9b]" role="alert" aria-live="polite">
                {uploadError}
              </p>
            )}

            <div className="my-6 h-px bg-white/[.07]" />

            {/* Contextual Tip */}
            <div
              className="rounded-xl border p-4 transition-all"
              style={{
                borderColor: `${activePlatform.brandColor}30`,
                backgroundColor: `${activePlatform.brandColor}0d`
              }}
            >
              <div className="flex gap-3">
                <Info size={16} className="mt-0.5 shrink-0" style={{ color: activePlatform.brandColor }} />
                <div>
                  <p className="text-xs font-semibold text-white">{activePlatform.tip.title}</p>
                  <p className="mt-1.5 text-[11px] leading-5 text-[#949ba4]">{activePlatform.tip.text}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#949ba4]">
              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-[#23a559]" /> Browser-only · 100% private
              </span>
              <span>{processingAsset ? `Processing ${processingAsset}…` : acceptedImageLabel}</span>
            </div>
          </section>

          {/* Right Column: Live Mockup Preview */}
          <section className="min-w-0 rounded-2xl border border-white/[.07] bg-[#1a1c20] p-4 shadow-xl sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <LayoutDashboard size={16} style={{ color: activePlatform.brandColor }} />
                  <h2 className="text-sm font-bold text-white">Live preview ({activePlatform.name})</h2>
                </div>
                <p className="mt-1 text-xs text-[#949ba4]">Realistic interface rendering with device crops</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSafeZoneGrid((current) => !current)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    safeZoneGrid
                      ? 'border-white/30 bg-white/10 text-white shadow'
                      : 'border-white/[.08] text-[#949ba4] hover:border-white/[.18] hover:text-white'
                  }`}
                  style={safeZoneGrid ? { borderColor: activePlatform.brandColor, color: '#ffffff' } : {}}
                  aria-pressed={safeZoneGrid}
                >
                  <Layers size={14} /> Safe-Zone Grid
                </button>

                <div className="flex rounded-lg bg-[#222428] p-1">
                  <ViewButton
                    active={view === 'desktop'}
                    onClick={() => setView('desktop')}
                    icon={<Monitor size={14} />}
                    label="Desktop"
                  />
                  <ViewButton
                    active={view === 'mobile'}
                    onClick={() => setView('mobile')}
                    icon={<Smartphone size={14} />}
                    label="Mobile"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Platform Mockup */}
            <div className="min-h-[380px] w-full">
              <MultiPlatformPreviewFrame
                platformId={activePlatform.id}
                view={view}
                bannerStyle={bannerStyle}
                bannerAsset={files.banner}
                iconUrl={files.icon?.renderUrl || files.icon?.url}
                safeZoneGrid={safeZoneGrid}
              />
            </div>

            {/* Actions Bar */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#949ba4]">
                {files.banner || files.icon
                  ? `Banner and avatar ready for ${activePlatform.name}. Switch platforms anytime to check fit.`
                  : `Upload an image to preview on ${activePlatform.name}.`}
              </span>
              <button
                onClick={downloadSpecSheet}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold text-white shadow-lg transition hover:brightness-110"
                style={{ backgroundColor: activePlatform.brandColor === '#000000' ? '#2f3336' : activePlatform.brandColor }}
              >
                <ArrowDownToLine size={14} /> Download Spec Sheet
              </button>
            </div>
          </section>
        </div>

        {/* Dominant Palette Section */}
        <section className="mt-6 rounded-2xl border border-white/[.07] bg-[#1a1c20] p-5 shadow-xl sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} style={{ color: activePlatform.brandColor }} />
                <h2 className="text-sm font-bold text-white">Dominant palette</h2>
              </div>
              <p className="mt-1 text-xs text-[#949ba4]">
                Top colors extracted from your uploaded banner image. Use these for profile accent colors and themes.
              </p>
            </div>
            <span className="text-[11px] text-[#949ba4]">Click a swatch to copy HEX</span>
          </div>

          {palette.length ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {palette.map((color) => (
                <button
                  key={color}
                  onClick={() => copyColor(color)}
                  className="group flex items-center gap-3 rounded-xl border border-white/[.07] bg-[#222428] p-3 text-left transition hover:border-white/30"
                >
                  <span
                    className="h-9 w-9 shrink-0 rounded-lg border border-white/10 shadow-inner"
                    style={{ backgroundColor: color }}
                  />
                  <span className="min-w-0">
                    <span className="block font-mono text-xs font-bold tracking-wide text-white">
                      {copiedColor === color ? 'Copied!' : color}
                    </span>
                    <span className="mt-1 block text-[10px] text-[#949ba4]">
                      {copiedColor === color ? 'Ready to paste' : 'Copy color'}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-white/[.1] px-4 py-5 text-xs text-[#949ba4]">
              <ImageIcon size={17} /> Upload a banner to extract its palette.
            </div>
          )}
        </section>

        {/* Guidelines Section for Active Platform */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3" id="guidelines">
          {activePlatform.guidelines.map((guide, idx) => (
            <Feature
              key={idx}
              brandColor={activePlatform.brandColor}
              icon={guide.icon}
              title={guide.title}
              text={guide.text}
            />
          ))}
        </section>
      </main>

      <footer id="about" className="border-t border-white/[.07] px-5 py-6 text-center text-xs text-[#949ba4]">
        Made for creators, designers, and developers who care about the little details <span className="mx-1 text-[#5865f2]">✦</span> bannerpreview.tech
      </footer>

      <WatermarkOverlay />
    </div>
  )
}

function AssetDropzone({ asset, brandColor, value, dragging, onDragEnter, onDragLeave, onDrop, onFile, onClear }) {
  const inputRef = useRef(null)
  const chooseFile = () => {
    if (inputRef.current) inputRef.current.value = ''
    inputRef.current?.click()
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Upload ${asset.label}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          chooseFile()
        }
      }}
      onClick={chooseFile}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border border-dashed p-4 transition ${
        dragging
          ? 'border-white bg-white/10'
          : value
          ? 'border-white/30 bg-[#222428]'
          : 'border-white/[.12] bg-[#222428]/60 hover:border-white/30 hover:bg-[#222428]'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(event) => onFile(event.target.files?.[0])}
      />
      <div className="flex items-center gap-3">
        {value ? (
          <img
            src={value.url}
            alt=""
            className={`h-12 w-12 shrink-0 object-cover ${asset.kind === 'icon' ? 'rounded-full' : 'rounded-lg'}`}
          />
        ) : (
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-white/[.06] text-[#949ba4]">
            <FileImage size={20} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-white">{value?.file.name || asset.label}</p>
          <p className="mt-1 truncate text-[11px] text-[#949ba4]">
            {value ? `${(value.file.size / 1024 / 1024).toFixed(1)} MB · Ready to preview` : asset.hint}
          </p>
        </div>
        {value ? (
          <button
            onClick={onClear}
            className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-md text-[#949ba4] hover:bg-white/[.08] hover:text-white"
            aria-label={`Remove ${asset.label}`}
          >
            <X size={15} />
          </button>
        ) : (
          <CloudUpload size={18} className="shrink-0 text-[#949ba4] transition group-hover:text-white" />
        )}
      </div>
    </div>
  )
}

function ViewButton({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
        active ? 'bg-[#1a1c20] text-white shadow-sm' : 'text-[#949ba4] hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function Feature({ brandColor, icon, title, text }) {
  return (
    <div className="rounded-xl border border-white/[.07] bg-[#1a1c20] p-4 shadow-sm">
      <div
        className="mb-3 grid h-8 w-8 place-items-center rounded-lg text-white"
        style={{ backgroundColor: `${brandColor || '#5865f2'}25`, color: brandColor || '#5865f2' }}
      >
        {icon}
      </div>
      <h3 className="text-xs font-bold text-white">{title}</h3>
      <p className="mt-1.5 text-[11px] leading-5 text-[#949ba4]">{text}</p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
)
