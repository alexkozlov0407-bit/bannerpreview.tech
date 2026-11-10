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

class AppErrorBoundary extends React.Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return <div className="grid min-h-screen place-items-center bg-discord-canvas px-6 text-white"><div className="max-w-lg rounded-2xl border border-[#ed4245]/30 bg-discord-panel p-6"><h1 className="text-lg font-bold">Previewer failed to load</h1><p className="mt-2 text-sm leading-6 text-discord-muted">Refresh the page or restart the dev server. The browser reported: {this.state.error.message}</p></div></div>
    }
    return this.props.children
  }
}

const initialAssets = [
  { id: 'banner', label: 'Server banner', hint: 'Recommended 960 × 540', kind: 'banner' },
  { id: 'icon', label: 'Server icon', hint: 'Recommended 512 × 512', kind: 'icon' }
]

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
  const [view, setView] = useState('desktop')
  const [files, dispatchFiles] = useReducer(assetReducer, {})
  const [dragging, setDragging] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [safeZoneGrid, setSafeZoneGrid] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [copiedColor, setCopiedColor] = useState('')
  const [processingAsset, setProcessingAsset] = useState(null)
  const uploadRequestRef = useRef({})

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
      setUploadError('Upload a banner before downloading a spec sheet.')
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
      context.fillStyle = '#1e1f22'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#ffffff'
      context.font = '700 32px Arial'
      context.fillText('bannerpreview.tech', 64, 72)
      context.fillStyle = '#949ba4'
      context.font = '16px Arial'
      context.fillText('Discord server asset specification', 64, 102)
      context.fillStyle = '#2b2d31'
      drawRoundedRect(context, 64, 140, 1072, 360, 18)
      context.fill()
      const scale = Math.min(1010 / image.naturalWidth, 300 / image.naturalHeight)
      const width = image.naturalWidth * scale
      const height = image.naturalHeight * scale
      context.drawImage(image, 95 + (1010 - width) / 2, 170 + (300 - height) / 2, width, height)
      context.fillStyle = '#ffffff'
      context.font = '700 20px Arial'
      context.fillText('Banner details', 64, 560)
      context.fillStyle = '#b5bac1'
      context.font = '16px Arial'
      context.fillText(`Source dimensions  ${files.banner.width} × ${files.banner.height}px`, 64, 594)
      context.fillText(`Format  ${files.banner.file.type || 'image'}`, 64, 620)
      context.fillStyle = '#ffffff'
      context.font = '700 20px Arial'
      context.fillText('Dominant palette', 64, 680)
      palette.forEach((color, index) => {
        const x = 270 + index * 190
        context.fillStyle = color
        drawRoundedRect(context, x, 650, 32, 32, 7)
        context.fill()
        context.fillStyle = '#b5bac1'
        context.font = '15px monospace'
        context.fillText(color, x + 44, 672)
      })
      const link = document.createElement('a')
      link.download = 'bannerpreview-spec-sheet.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      setUploadError('Could not generate the spec sheet. Please try the upload again.')
    }
  }

  return (
    <div className="min-h-screen bg-discord-canvas text-white">
      <header className="sticky top-0 z-30 border-b border-white/[.06] bg-discord-canvas/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <a className="flex items-center gap-2.5" href="/">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-discord-blurple shadow-[0_6px_18px_rgba(88,101,242,.3)]">
              <Sparkles size={17} strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-bold tracking-[-.02em]">banner<span className="text-discord-blurple">preview</span><span className="text-discord-muted">.tech</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-[13px] font-medium text-discord-muted md:flex">
            <a className="text-white transition hover:text-white" href="#preview">Previewer</a>
            <a className="transition hover:text-white" href="#guidelines">Guidelines</a>
            <a className="transition hover:text-white" href="#about">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-discord-muted sm:flex" title="This previewer is always in Discord dark mode">
              <Github size={15} /> Open source
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-lg text-discord-muted" title="Dark mode enabled" aria-label="Dark mode enabled">
              <Moon size={16} />
            </div>
            <button className="grid h-9 w-9 place-items-center rounded-lg text-discord-muted transition hover:bg-white/[.06] hover:text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
              <Menu size={18} />
            </button>
          </div>
        </div>
        {menuOpen && <div className="border-t border-white/[.06] px-5 py-3 md:hidden"><div className="flex flex-col gap-3 text-sm text-discord-faint"><a href="#preview">Previewer</a><a href="#guidelines">Guidelines</a><a href="#about">About</a></div></div>}
      </header>

      <main className="mx-auto max-w-[1440px] px-5 pb-20 pt-10 lg:px-10 lg:pt-14">
        <section className="mb-10 max-w-2xl" id="preview">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-discord-blurple/20 bg-discord-blurple/[.08] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.15em] text-[#9ba5ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9ba5ff]" /> Built for Discord
          </div>
          <h1 className="text-4xl font-bold tracking-[-.045em] text-white sm:text-5xl">See your server in a <span className="text-discord-blurple">new light.</span></h1>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-discord-muted">Preview your server banner and icon across Discord's desktop and mobile layouts before you upload.</p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(330px,390px)_1fr]">
          <section className="rounded-2xl border border-white/[.065] bg-discord-panel p-4 shadow-panel sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div><h2 className="text-sm font-bold">Your assets</h2><p className="mt-1 text-xs text-discord-muted">Upload images to get started</p></div>
              <CircleHelp size={17} className="text-discord-muted" />
            </div>
            <div className="space-y-3">
              {initialAssets.map((asset) => <AssetDropzone key={asset.id} asset={asset} value={files[asset.id]} dragging={dragging === asset.id} onDragEnter={() => setDragging(asset.id)} onDragLeave={() => setDragging(null)} onDrop={(event) => handleDrop(event, asset.id)} onFile={(file) => addFile(asset.id, file)} onClear={(event) => clearFile(event, asset.id)} />)}
            </div>
            {uploadError && <p className="mt-3 rounded-lg border border-[#ed4245]/30 bg-[#ed4245]/[.08] px-3 py-2 text-[11px] leading-5 text-[#ff9b9b]" role="alert" aria-live="polite">{uploadError}</p>}
            <div className="my-6 h-px bg-white/[.06]" />
            <div className="rounded-xl border border-discord-blurple/15 bg-discord-blurple/[.07] p-4">
              <div className="flex gap-3"><Info size={16} className="mt-0.5 shrink-0 text-[#9ba5ff]" /><div><p className="text-xs font-semibold text-[#d8dcff]">Tip for the best result</p><p className="mt-1.5 text-[11px] leading-5 text-discord-muted">Use a high-resolution image with a focal point near the center. Your banner will be cropped on mobile.</p></div></div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-discord-muted"><span className="flex items-center gap-1.5"><Check size={13} className="text-discord-green" /> Files stay in your browser</span><span>{processingAsset ? `Processing ${processingAsset}…` : acceptedImageLabel}</span></div>
          </section>

          <section className="min-w-0 rounded-2xl border border-white/[.065] bg-discord-panel p-4 shadow-panel sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div><div className="flex items-center gap-2"><LayoutDashboard size={16} className="text-discord-blurple" /><h2 className="text-sm font-bold">Live preview</h2></div><p className="mt-1 text-xs text-discord-muted">This is how your server will look</p></div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setSafeZoneGrid((current) => !current)} className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${safeZoneGrid ? 'border-discord-blurple/50 bg-discord-blurple/[.12] text-[#c8ccff]' : 'border-white/[.08] text-discord-muted hover:border-white/[.18] hover:text-white'}`} aria-pressed={safeZoneGrid}><Layers size={14} /> Safe-Zone Grid</button>
                <div className="flex rounded-lg bg-discord-elevated p-1">
                <ViewButton active={view === 'desktop'} onClick={() => setView('desktop')} icon={<Monitor size={14} />} label="Desktop" />
                <ViewButton active={view === 'mobile'} onClick={() => setView('mobile')} icon={<Smartphone size={14} />} label="Mobile" />
                </div>
              </div>
            </div>
            <PreviewFrame view={view} bannerStyle={bannerStyle} bannerAsset={files.banner} iconUrl={files.icon?.renderUrl || files.icon?.url} safeZoneGrid={safeZoneGrid} />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-discord-muted">{files.banner || files.icon ? 'Looking good. You can swap assets anytime.' : 'Add an asset to see it in the preview.'}</span>
              <button onClick={downloadSpecSheet} className="inline-flex items-center gap-2 rounded-lg bg-discord-blurple px-3.5 py-2.5 text-xs font-bold transition hover:bg-[#4752c4]"><ArrowDownToLine size={14} /> Download Spec Sheet</button>
            </div>
          </section>
        </div>
        <section className="mt-6 rounded-2xl border border-white/[.065] bg-discord-panel p-5 shadow-panel sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><div className="flex items-center gap-2"><Sparkles size={16} className="text-discord-blurple" /><h2 className="text-sm font-bold">Dominant palette</h2></div><p className="mt-1 text-xs text-discord-muted">Top colors extracted from your uploaded banner.</p></div>
            <span className="text-[11px] text-discord-muted">Click a swatch to copy HEX</span>
          </div>
          {palette.length ? <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{palette.map((color) => <button key={color} onClick={() => copyColor(color)} className="group flex items-center gap-3 rounded-xl border border-white/[.07] bg-discord-elevated p-3 text-left transition hover:border-discord-blurple/50"><span className="h-9 w-9 shrink-0 rounded-lg border border-white/10 shadow-inner" style={{ backgroundColor: color }} /><span className="min-w-0"><span className="block font-mono text-xs font-bold tracking-wide text-white">{copiedColor === color ? 'Copied!' : color}</span><span className="mt-1 block text-[10px] text-discord-muted">{copiedColor === color ? 'Ready to paste' : 'Copy color'}</span></span></button>)}</div> : <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-white/[.1] px-4 py-5 text-xs text-discord-muted"><ImageIcon size={17} /> Upload a banner to extract its palette.</div>}
        </section>
        <section className="mt-8 grid gap-4 sm:grid-cols-3" id="guidelines">
          <Feature icon={<ImageIcon size={17} />} title="Server banners" text="Recommended at 960 × 540px for a crisp, full-width look." />
          <Feature icon={<UploadCloud size={17} />} title="Instant preview" text="Everything happens locally in your browser. No uploads, ever." />
          <Feature icon={<Smartphone size={17} />} title="Responsive by design" text="Check desktop and mobile crops before you hit save." />
        </section>
      </main>
      <footer id="about" className="border-t border-white/[.06] px-5 py-6 text-center text-xs text-discord-muted">Made for server owners who care about the little details <span className="mx-1 text-discord-blurple">✦</span> bannerpreview.tech</footer>
      <WatermarkOverlay />
    </div>
  )
}

function AssetDropzone({ asset, value, dragging, onDragEnter, onDragLeave, onDrop, onFile, onClear }) {
  const inputRef = useRef(null)
  const chooseFile = () => {
    if (inputRef.current) inputRef.current.value = ''
    inputRef.current?.click()
  }
  return <div role="button" tabIndex={0} aria-label={`Upload ${asset.label}`} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); chooseFile() } }} onClick={chooseFile} onDragOver={(event) => event.preventDefault()} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop} className={`group relative cursor-pointer overflow-hidden rounded-xl border border-dashed p-4 transition ${dragging ? 'border-discord-blurple bg-discord-blurple/[.1]' : value ? 'border-discord-blurple/40 bg-discord-elevated' : 'border-white/[.12] bg-discord-elevated/50 hover:border-discord-blurple/60 hover:bg-discord-elevated'}`}>
    <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(event) => onFile(event.target.files?.[0])} />
    <div className="flex items-center gap-3">
      {value ? <img src={value.url} alt="" className={`h-12 w-12 shrink-0 object-cover ${asset.kind === 'icon' ? 'rounded-xl' : 'rounded-lg'}`} /> : <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-white/[.06] text-discord-muted"><FileImage size={20} /></div>}
      <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{value?.file.name || asset.label}</p><p className="mt-1 truncate text-[11px] text-discord-muted">{value ? `${(value.file.size / 1024 / 1024).toFixed(1)} MB · Ready to preview` : asset.hint}</p></div>
      {value ? <button onClick={onClear} className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-md text-discord-muted hover:bg-white/[.08] hover:text-white" aria-label={`Remove ${asset.label}`}><X size={15} /></button> : <CloudUpload size={18} className="shrink-0 text-discord-muted transition group-hover:text-discord-blurple" />}
    </div>
  </div>
}

function ViewButton({ active, icon, label, onClick }) {
  return <button onClick={onClick} className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition ${active ? 'bg-discord-panel text-white shadow-sm' : 'text-discord-muted hover:text-white'}`}>{icon}{label}</button>
}

function PreviewFrame({ view, bannerStyle, bannerAsset, iconUrl, safeZoneGrid }) {
  return <div className={`preview-shell mx-auto overflow-hidden border border-black/40 bg-[#313338] shadow-2xl ${view === 'mobile' ? 'max-w-[440px]' : 'max-w-[840px]'}`}>
    <div className="flex h-9 items-center gap-2 border-b border-black/20 bg-[#2b2d31] px-3"><div className="h-2 w-2 rounded-full bg-[#ed4245]" /><div className="h-2 w-2 rounded-full bg-[#faa61a]" /><div className="h-2 w-2 rounded-full bg-[#23a559]" /><span className="ml-2 text-[9px] text-[#72767d]">Discord — {view === 'mobile' ? 'Mobile' : 'Desktop'}</span><MoreHorizontal size={13} className="ml-auto text-[#72767d]" /></div>
    <div className={`flex ${view === 'mobile' ? 'min-h-[350px]' : 'min-h-[390px]'}`}>
      <aside className={`${view === 'mobile' ? 'hidden' : 'w-[190px]'} shrink-0 bg-[#2b2d31] p-3`}><div className="mb-4 flex items-center gap-2 border-b border-black/20 pb-3"><div className="grid h-6 w-6 place-items-center rounded-md bg-discord-blurple"><Sparkles size={12} /></div><span className="text-[10px] font-bold">My Community</span><ChevronDown size={12} className="ml-auto text-[#949ba4]" /></div><div className="space-y-1 text-[9px] text-[#949ba4]"><div className="rounded bg-white/[.06] px-2 py-1.5 text-white"># general</div><div className="px-2 py-1.5"># announcements</div><div className="px-2 py-1.5"># showcase</div></div></aside>
      <div className="min-w-0 flex-1 bg-[#313338]"><div className="relative h-[154px] overflow-hidden bg-gradient-to-br from-[#4c59b5] via-[#5865f2] to-[#9b6bd3]"><div className={`absolute inset-0 bg-cover bg-center ${bannerStyle.backgroundImage ? '' : 'opacity-30'}`} style={bannerStyle} />{bannerAsset?.animated && <img src={bannerAsset.url} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />}{!bannerStyle.backgroundImage && !bannerAsset?.animated && <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_30%,white_0,transparent_25%),radial-gradient(circle_at_80%_70%,#1e1f22_0,transparent_35%)]" />}<div className="absolute inset-0 bg-gradient-to-t from-[#313338]/70 to-transparent" />{safeZoneGrid && <SafeZoneOverlay />}</div><div className="relative px-5 pb-5"><div className="-mt-9 flex items-end justify-between"><div className={`grid h-[68px] w-[68px] shrink-0 place-items-center border-[5px] border-[#313338] bg-discord-blurple text-xl font-black shadow-lg ${iconUrl ? 'overflow-hidden rounded-[22px]' : 'rounded-[22px]'}`}>{iconUrl ? <img src={iconUrl} alt="" className="h-full w-full object-cover" /> : <Sparkles size={25} />}</div><button className="rounded bg-discord-blurple px-3 py-2 text-[10px] font-bold text-white">Join Server</button></div><div className="mt-3"><h3 className="text-base font-bold">My Community <span className="text-[#949ba4]">✦</span></h3><p className="mt-1 text-[10px] text-[#949ba4]">A place to hang out, share, and create together.</p></div><div className="mt-5 flex gap-4 border-b border-white/[.07] pb-2 text-[10px] font-semibold text-[#949ba4]"><span className="border-b-2 border-discord-blurple pb-2 text-white">Overview</span><span>Members</span><span>About</span></div><div className="mt-5 rounded-lg bg-[#2b2d31] p-3"><p className="text-[9px] font-bold text-[#dbdee1]">Welcome to the server!</p><div className="mt-2 h-2 w-3/4 rounded bg-white/[.06]" /><div className="mt-1.5 h-2 w-1/2 rounded bg-white/[.06]" /></div></div></div>
    </div>
  </div>
}

function SafeZoneOverlay() {
  return <svg className="safe-zone-overlay absolute inset-0 h-full w-full" viewBox="0 0 960 540" preserveAspectRatio="none" role="img" aria-label="Discord banner safe zones">
    <rect x="0" y="0" width="220" height="540" fill="#111214" fillOpacity=".48" />
    <rect x="220" y="0" width="740" height="94" fill="#f0b232" fillOpacity=".18" />
    <rect x="760" y="0" width="200" height="540" fill="#ed4245" fillOpacity=".2" />
    <path d="M220 0v540M220 94h740M760 0v540" stroke="#fff" strokeDasharray="10 8" strokeOpacity=".7" vectorEffect="non-scaling-stroke" />
    <g fontFamily="ui-sans-serif, system-ui" fontSize="18" fontWeight="700" textAnchor="middle">
      <rect x="18" y="22" width="184" height="34" rx="8" fill="#111214" fillOpacity=".8" />
      <text x="110" y="45" fill="#fff">CHANNEL SIDEBAR</text>
      <rect x="390" y="28" width="200" height="34" rx="8" fill="#111214" fillOpacity=".8" />
      <text x="490" y="51" fill="#ffe4a3">SERVER NAME HEADER</text>
      <rect x="785" y="22" width="150" height="34" rx="8" fill="#111214" fillOpacity=".8" />
      <text x="860" y="45" fill="#ffc0c0">MEMBER LIST</text>
    </g>
  </svg>
}

function Feature({ icon, title, text }) {
  return <div className="rounded-xl border border-white/[.06] bg-discord-panel/60 p-4"><div className="mb-3 grid h-8 w-8 place-items-center rounded-lg bg-discord-blurple/[.12] text-discord-blurple">{icon}</div><h3 className="text-xs font-bold">{title}</h3><p className="mt-1.5 text-[11px] leading-5 text-discord-muted">{text}</p></div>
}

createRoot(document.getElementById('root')).render(<AppErrorBoundary><App /></AppErrorBoundary>)
