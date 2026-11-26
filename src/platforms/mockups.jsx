import React from 'react'
import {
  ArrowLeft,
  Bell,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Globe,
  Heart,
  HelpCircle,
  Link as LinkIcon,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Radio,
  Repeat,
  Search,
  Share2,
  ShieldAlert,
  Sparkles,
  Tv,
  UserCheck,
  UserPlus,
  Users,
  Video
} from 'lucide-react'

// Generic Banner Image Container with Animated or Static support
export function BannerImage({ bannerAsset, bannerStyle, className = '', fallbackGradient = '' }) {
  const hasImage = Boolean(bannerAsset || bannerStyle?.backgroundImage)
  return (
    <div className={`relative h-full w-full overflow-hidden ${fallbackGradient || 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900'} ${className}`}>
      {bannerStyle?.backgroundImage && !bannerAsset?.animated && (
        <div className="absolute inset-0 bg-cover bg-center" style={bannerStyle} />
      )}
      {bannerAsset?.animated && (
        <img src={bannerAsset.url} alt="Banner" className="absolute inset-0 h-full w-full object-cover object-center" />
      )}
      {!hasImage && (
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_30%,white_0,transparent_25%),radial-gradient(circle_at_80%_70%,#1e1f22_0,transparent_35%)]" />
      )}
    </div>
  )
}

// ----------------------------------------------------
// 1. DISCORD MOCKUP
// ----------------------------------------------------
export function DiscordMockup({ view, bannerStyle, bannerAsset, iconUrl, safeZoneGrid }) {
  return (
    <div className={`preview-shell mx-auto overflow-hidden border border-black/40 bg-[#313338] shadow-2xl transition-all duration-200 ${view === 'mobile' ? 'max-w-[420px]' : 'max-w-[840px]'}`}>
      <div className="flex h-9 items-center gap-2 border-b border-black/20 bg-[#2b2d31] px-3">
        <div className="h-2.5 w-2.5 rounded-full bg-[#ed4245]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#faa61a]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#23a559]" />
        <span className="ml-2 text-[10px] font-semibold text-[#949ba4]">Discord — {view === 'mobile' ? 'Mobile App' : 'Desktop Client'}</span>
        <MoreHorizontal size={13} className="ml-auto text-[#72767d]" />
      </div>

      <div className={`flex ${view === 'mobile' ? 'min-h-[360px] flex-col' : 'min-h-[390px]'}`}>
        {/* Desktop Sidebar */}
        {view !== 'mobile' && (
          <aside className="w-[200px] shrink-0 bg-[#2b2d31] p-3">
            <div className="mb-4 flex items-center gap-2 border-b border-black/20 pb-3">
              <div className="grid h-6 w-6 place-items-center rounded-md bg-[#5865F2] text-white">
                <Sparkles size={13} />
              </div>
              <span className="truncate text-[11px] font-bold">My Community</span>
              <ChevronDown size={12} className="ml-auto text-[#949ba4]" />
            </div>
            <div className="space-y-1 text-[10px] text-[#949ba4]">
              <div className="rounded bg-white/[.07] px-2 py-1.5 font-medium text-white"># general</div>
              <div className="px-2 py-1.5 hover:text-white"># announcements</div>
              <div className="px-2 py-1.5 hover:text-white"># showcase</div>
              <div className="px-2 py-1.5 hover:text-white"># resources</div>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <div className="min-w-0 flex-1 bg-[#313338]">
          <div className="relative h-[160px] overflow-hidden bg-gradient-to-br from-[#4c59b5] via-[#5865f2] to-[#9b6bd3]">
            <BannerImage bannerAsset={bannerAsset} bannerStyle={bannerStyle} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#313338]/80 via-transparent to-transparent" />
            {safeZoneGrid && <DiscordSafeZoneOverlay />}
          </div>

          <div className="relative px-5 pb-5">
            <div className="-mt-10 flex items-end justify-between">
              <div className={`grid h-[72px] w-[72px] shrink-0 place-items-center border-[5px] border-[#313338] bg-[#5865F2] text-white shadow-xl ${iconUrl ? 'overflow-hidden rounded-[24px]' : 'rounded-[24px]'}`}>
                {iconUrl ? <img src={iconUrl} alt="Server icon" className="h-full w-full object-cover" /> : <Sparkles size={28} />}
              </div>
              <button className="rounded-md bg-[#5865F2] px-3.5 py-1.5 text-xs font-bold text-white shadow transition hover:bg-[#4752c4]">
                Join Server
              </button>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">My Community</h3>
                <span className="rounded bg-[#5865F2]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#9ba5ff]">PARTNER</span>
              </div>
              <p className="mt-1 text-xs text-[#949ba4]">A vibrant space to hang out, share creations, and collaborate.</p>
              <div className="mt-2 flex items-center gap-3 text-[10px] text-[#949ba4]">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#23a559]" /> 842 Online</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#949ba4]" /> 3,920 Members</span>
              </div>
            </div>

            <div className="mt-4 flex gap-4 border-b border-white/[.07] pb-2 text-xs font-semibold text-[#949ba4]">
              <span className="border-b-2 border-[#5865F2] pb-2 text-white">Overview</span>
              <span>Events</span>
              <span>Members</span>
              <span>About</span>
            </div>

            <div className="mt-4 rounded-xl bg-[#2b2d31] p-3.5">
              <p className="text-xs font-bold text-[#dbdee1]">Welcome to the server!</p>
              <div className="mt-2 h-2 w-3/4 rounded bg-white/[.06]" />
              <div className="mt-1.5 h-2 w-1/2 rounded bg-white/[.06]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DiscordSafeZoneOverlay() {
  return (
    <svg className="safe-zone-overlay absolute inset-0 h-full w-full" viewBox="0 0 960 540" preserveAspectRatio="none" role="img" aria-label="Discord banner safe zones">
      <rect x="0" y="0" width="220" height="540" fill="#111214" fillOpacity=".5" />
      <rect x="220" y="0" width="740" height="94" fill="#f0b232" fillOpacity=".2" />
      <rect x="760" y="0" width="200" height="540" fill="#ed4245" fillOpacity=".25" />
      <path d="M220 0v540M220 94h740M760 0v540" stroke="#fff" strokeDasharray="10 8" strokeOpacity=".8" vectorEffect="non-scaling-stroke" />
      <g fontFamily="ui-sans-serif, system-ui" fontSize="16" fontWeight="700" textAnchor="middle">
        <rect x="18" y="24" width="184" height="34" rx="8" fill="#111214" fillOpacity=".85" />
        <text x="110" y="47" fill="#fff">CHANNEL SIDEBAR</text>
        <rect x="380" y="28" width="220" height="34" rx="8" fill="#111214" fillOpacity=".85" />
        <text x="490" y="51" fill="#ffe4a3">SERVER HEADER OVERLAY</text>
        <rect x="785" y="24" width="150" height="34" rx="8" fill="#111214" fillOpacity=".85" />
        <text x="860" y="47" fill="#ffc0c0">MEMBER LIST</text>
      </g>
    </svg>
  )
}

// ----------------------------------------------------
// 2. X / TWITTER MOCKUP
// ----------------------------------------------------
export function TwitterMockup({ view, bannerStyle, bannerAsset, iconUrl, safeZoneGrid }) {
  return (
    <div className={`preview-shell mx-auto overflow-hidden border border-[#2f3336] bg-[#000000] text-white shadow-2xl transition-all duration-200 ${view === 'mobile' ? 'max-w-[420px]' : 'max-w-[800px]'}`}>
      {/* Header Bar */}
      <div className="flex h-12 items-center gap-6 border-b border-[#2f3336] bg-black/80 px-4 backdrop-blur-md">
        <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10" aria-label="Back">
          <ArrowLeft size={17} />
        </button>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold leading-tight">Alex Kozlov</h3>
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1D9BF0] text-[9px] text-white font-black">✓</span>
          </div>
          <p className="text-[11px] text-[#71767b]">1,284 posts</p>
        </div>
      </div>

      {/* Header Banner */}
      <div className="relative aspect-[3/1] w-full overflow-hidden bg-[#16181c]">
        <BannerImage bannerAsset={bannerAsset} bannerStyle={bannerStyle} fallbackGradient="bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-950" />
        {safeZoneGrid && <TwitterSafeZoneOverlay />}
      </div>

      {/* Profile Details */}
      <div className="px-4 pb-4">
        <div className="relative flex justify-between">
          {/* Avatar */}
          <div className="-mt-10 sm:-mt-14 relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-full border-4 border-black bg-[#16181c] shadow-md overflow-hidden">
            {iconUrl ? (
              <img src={iconUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#1D9BF0] to-blue-700 text-white font-bold text-xl sm:text-2xl">
                AK
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-3 flex gap-2">
            <button className="rounded-full border border-[#536471] px-4 py-1.5 text-xs font-bold transition hover:bg-white/10">
              Edit profile
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-1.5">
            <h4 className="text-base font-bold text-white">Alex Kozlov</h4>
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1D9BF0] text-[9px] text-white font-black">✓</span>
          </div>
          <p className="text-xs text-[#71767b]">@alexkozlov</p>

          <p className="mt-2.5 text-xs leading-5 text-[#e7e9ea]">
            Building open-source tools for creators and engineers ✦ Creator of bannerpreview.tech. Designing digital interfaces that feel right.
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#71767b]">
            <span className="flex items-center gap-1"><MapPin size={13} /> San Francisco, CA</span>
            <span className="flex items-center gap-1 text-[#1D9BF0]"><LinkIcon size={13} /> bannerpreview.tech</span>
            <span className="flex items-center gap-1"><Calendar size={13} /> Joined March 2021</span>
          </div>

          <div className="mt-3 flex gap-4 text-xs">
            <span><strong className="font-bold text-white">418</strong> <span className="text-[#71767b]">Following</span></span>
            <span><strong className="font-bold text-white">14.6K</strong> <span className="text-[#71767b]">Followers</span></span>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="mt-4 flex border-b border-[#2f3336] text-xs font-bold text-[#71767b]">
          <div className="flex-1 border-b-2 border-[#1D9BF0] pb-3 text-center text-white">Posts</div>
          <div className="flex-1 pb-3 text-center hover:text-white">Replies</div>
          <div className="flex-1 pb-3 text-center hover:text-white">Highlights</div>
          <div className="flex-1 pb-3 text-center hover:text-white">Media</div>
        </div>

        {/* Sample Tweet */}
        <div className="mt-3 flex gap-3 border-b border-[#2f3336]/60 pb-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-[#1D9BF0]/20 text-center leading-9 font-bold text-xs text-[#1D9BF0]">
            AK
          </div>
          <div className="min-w-0 flex-1 text-xs">
            <div className="flex items-center gap-1">
              <span className="font-bold text-white">Alex Kozlov</span>
              <span className="text-[#71767b]">@alexkozlov · 2h</span>
            </div>
            <p className="mt-1 text-[#e7e9ea]">Just updated my banner! What do you think? Previewed everything first on bannerpreview.tech 🚀</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TwitterSafeZoneOverlay() {
  return (
    <svg className="safe-zone-overlay absolute inset-0 h-full w-full" viewBox="0 0 1500 500" preserveAspectRatio="none" role="img" aria-label="X banner safe zones">
      {/* Avatar Obstruction Area */}
      <circle cx="160" cy="500" r="190" fill="#111214" fillOpacity=".5" stroke="#1D9BF0" strokeWidth="6" strokeDasharray="16 10" />
      {/* Top & side margin guides */}
      <rect x="0" y="0" width="1500" height="50" fill="#000" fillOpacity=".3" />
      <rect x="0" y="450" width="1500" height="50" fill="#000" fillOpacity=".3" />
      <g fontFamily="ui-sans-serif, system-ui" fontSize="26" fontWeight="700">
        <rect x="60" y="380" width="280" height="50" rx="10" fill="#111214" fillOpacity=".85" />
        <text x="200" y="415" fill="#1D9BF0" textAnchor="middle">AVATAR OVERLAP</text>
        <rect x="520" y="20" width="460" height="46" rx="8" fill="#111214" fillOpacity=".85" />
        <text x="750" y="52" fill="#fff" textAnchor="middle">SAFE RECTANGLE (1500 × 500)</text>
      </g>
    </svg>
  )
}

// ----------------------------------------------------
// 3. YOUTUBE MOCKUP
// ----------------------------------------------------
export function YoutubeMockup({ view, bannerStyle, bannerAsset, iconUrl, safeZoneGrid }) {
  return (
    <div className={`preview-shell mx-auto overflow-hidden border border-[#272727] bg-[#0f0f0f] text-white shadow-2xl transition-all duration-200 ${view === 'mobile' ? 'max-w-[420px]' : 'max-w-[840px]'}`}>
      {/* Channel Banner */}
      <div className="relative aspect-[16/9] max-h-[190px] w-full overflow-hidden bg-[#1f1f1f]">
        <BannerImage bannerAsset={bannerAsset} bannerStyle={bannerStyle} fallbackGradient="bg-gradient-to-r from-red-950 via-zinc-900 to-black" />
        {safeZoneGrid && <YoutubeSafeZoneOverlay />}
      </div>

      {/* Channel Header Area */}
      <div className="p-4 sm:p-5">
        <div className={`flex ${view === 'mobile' ? 'flex-col items-center text-center' : 'items-start gap-5'}`}>
          {/* Avatar */}
          <div className="h-16 w-16 shrink-0 sm:h-20 sm:w-20 overflow-hidden rounded-full border-2 border-white/10 bg-[#272727] shadow-lg">
            {iconUrl ? (
              <img src={iconUrl} alt="Channel Avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-tr from-red-600 to-orange-500 text-xl font-bold">
                YT
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white sm:text-xl">Alex Studio</h3>
              <CheckCircle2 size={16} className="text-[#aaa]" />
            </div>
            <p className="mt-1 text-xs text-[#aaa]">@alexstudio · 128K subscribers · 340 videos</p>
            <p className="mt-1 text-xs text-[#aaa] line-clamp-1">Designing tools, code walkthroughs, and UI design systems...</p>
            
            <div className="mt-3 flex items-center gap-2">
              <button className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black transition hover:bg-neutral-200">
                Subscribe
              </button>
              <button className="rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Channel Navigation Tabs */}
        <div className="mt-5 flex gap-6 overflow-x-auto border-b border-white/10 pb-2.5 text-xs font-semibold text-[#aaa]">
          <span className="border-b-2 border-white pb-2.5 text-white">Home</span>
          <span>Videos</span>
          <span>Shorts</span>
          <span>Playlists</span>
          <span>Community</span>
        </div>

        {/* Sample Video Card */}
        <div className="mt-4 flex gap-3 rounded-xl bg-[#1f1f1f]/60 p-3">
          <div className="h-16 w-28 shrink-0 rounded-lg bg-[#272727] flex items-center justify-center text-red-500">
            <Tv size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white line-clamp-1">How to Design the Perfect Social Media Banner in 2026</p>
            <p className="mt-1 text-[11px] text-[#aaa]">Alex Studio · 24K views · 3 days ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function YoutubeSafeZoneOverlay() {
  return (
    <svg className="safe-zone-overlay absolute inset-0 h-full w-full" viewBox="0 0 2560 1440" preserveAspectRatio="none" role="img" aria-label="YouTube channel banner safe zones">
      {/* TV Area: Full 2560 x 1440 */}
      <rect x="0" y="0" width="2560" height="1440" fill="#000" fillOpacity=".3" />
      {/* Desktop Max Slice: 2560 x 423 (y: 508.5 to 931.5) */}
      <rect x="0" y="508" width="2560" height="424" fill="#0A66C2" fillOpacity=".2" stroke="#0A66C2" strokeWidth="6" strokeDasharray="24 16" />
      {/* Tablet Safe Zone: 1855 x 423 (x: 352.5 to 2207.5) */}
      <rect x="352" y="508" width="1856" height="424" fill="#f0b232" fillOpacity=".25" stroke="#f0b232" strokeWidth="6" strokeDasharray="20 14" />
      {/* Universal Desktop Min & Mobile Safe Zone: 1546 x 423 (x: 507 to 2053) */}
      <rect x="507" y="508" width="1546" height="424" fill="#23a559" fillOpacity=".38" stroke="#fff" strokeWidth="10" />

      <g fontFamily="ui-sans-serif, system-ui" fontSize="42" fontWeight="700" textAnchor="middle">
        <rect x="780" y="680" width="1000" height="80" rx="16" fill="#111214" fillOpacity=".9" />
        <text x="1280" y="736" fill="#23a559">★ TEXT & LOGO SAFE ZONE (1546 × 423) ★</text>
        <text x="1280" y="470" fill="#fff" fontSize="34">TV Display Full Canvas (2560 × 1440)</text>
        <text x="1280" y="990" fill="#ffe4a3" fontSize="32">Desktop Strip (2560 × 423) | Tablet (1855 × 423)</text>
      </g>
    </svg>
  )
}

// ----------------------------------------------------
// 4. LINKEDIN MOCKUP
// ----------------------------------------------------
export function LinkedinMockup({ view, bannerStyle, bannerAsset, iconUrl, safeZoneGrid }) {
  return (
    <div className={`preview-shell mx-auto overflow-hidden border border-[#38434f] bg-[#1d2226] text-white shadow-2xl transition-all duration-200 ${view === 'mobile' ? 'max-w-[420px]' : 'max-w-[800px]'}`}>
      {/* Background Banner */}
      <div className="relative aspect-[4/1] w-full overflow-hidden bg-[#283138]">
        <BannerImage bannerAsset={bannerAsset} bannerStyle={bannerStyle} fallbackGradient="bg-gradient-to-r from-blue-950 via-slate-900 to-[#0A66C2]" />
        {safeZoneGrid && <LinkedinSafeZoneOverlay />}
      </div>

      {/* Profile Details */}
      <div className="px-5 pb-5">
        <div className="relative flex justify-between">
          {/* Avatar */}
          <div className="-mt-10 sm:-mt-14 relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-full border-4 border-[#1d2226] bg-[#283138] shadow-xl overflow-hidden">
            {iconUrl ? (
              <img src={iconUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-tr from-[#0A66C2] to-sky-400 text-white font-bold text-xl sm:text-2xl">
                AK
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <button className="rounded-full bg-[#0A66C2] px-4 py-1.5 text-xs font-bold text-white shadow transition hover:bg-[#004182]">
              Open to
            </button>
            <button className="rounded-full border border-white/30 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-white/10">
              Add section
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">Alex Kozlov</h3>
            <span className="text-xs text-[#0A66C2] font-semibold">1st</span>
          </div>
          <p className="mt-1 text-xs text-[#e1e9ee] font-medium leading-relaxed">
            Lead Software Engineer & UI/UX Architect · Founder of bannerpreview.tech · Building high-craft digital products
          </p>
          <p className="mt-1.5 text-[11px] text-[#909ea8]">San Francisco Bay Area · <span className="text-[#70b5f9] font-semibold cursor-pointer">Contact info</span></p>
          <p className="mt-1 text-[11px] text-[#70b5f9] font-semibold">500+ connections</p>
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-[#161a1d] p-3 text-xs">
          <p className="font-bold text-white">Suggested for you</p>
          <p className="mt-1 text-[#909ea8]">Add banner imagery to showcase your team, product, or portfolio to recruiters and clients.</p>
        </div>
      </div>
    </div>
  )
}

function LinkedinSafeZoneOverlay() {
  return (
    <svg className="safe-zone-overlay absolute inset-0 h-full w-full" viewBox="0 0 1584 396" preserveAspectRatio="none" role="img" aria-label="LinkedIn banner safe zones">
      {/* Bottom left avatar obstruction */}
      <circle cx="180" cy="396" r="190" fill="#111214" fillOpacity=".55" stroke="#0A66C2" strokeWidth="8" strokeDasharray="18 12" />
      {/* Mobile shifting obstruction warning */}
      <circle cx="340" cy="396" r="140" fill="#111214" fillOpacity=".3" stroke="#f0b232" strokeWidth="6" strokeDasharray="14 10" />
      <g fontFamily="ui-sans-serif, system-ui" fontSize="24" fontWeight="700">
        <rect x="50" y="270" width="280" height="46" rx="8" fill="#111214" fillOpacity=".85" />
        <text x="190" y="302" fill="#0A66C2" textAnchor="middle">AVATAR OBSTRUCTION</text>
        <rect x="680" y="24" width="460" height="46" rx="8" fill="#111214" fillOpacity=".85" />
        <text x="910" y="56" fill="#fff" textAnchor="middle">RIGHT 60% SAFE TEXT AREA</text>
      </g>
    </svg>
  )
}

// ----------------------------------------------------
// 5. TWITCH MOCKUP
// ----------------------------------------------------
export function TwitchMockup({ view, bannerStyle, bannerAsset, iconUrl, safeZoneGrid }) {
  return (
    <div className={`preview-shell mx-auto overflow-hidden border border-[#26262c] bg-[#0e0e10] text-white shadow-2xl transition-all duration-200 ${view === 'mobile' ? 'max-w-[420px]' : 'max-w-[800px]'}`}>
      {/* Header Banner */}
      <div className="relative aspect-[5/2] max-h-[190px] w-full overflow-hidden bg-[#18181b]">
        <BannerImage bannerAsset={bannerAsset} bannerStyle={bannerStyle} fallbackGradient="bg-gradient-to-r from-purple-950 via-slate-900 to-[#9146FF]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-transparent to-transparent" />
        {safeZoneGrid && <TwitchSafeZoneOverlay />}
      </div>

      {/* Streamer Info */}
      <div className="px-5 pb-5">
        <div className="-mt-8 relative flex items-end justify-between">
          <div className="flex items-end gap-3.5">
            <div className="relative h-16 w-16 shrink-0 rounded-full border-4 border-[#0e0e10] bg-[#1f1f23] shadow-xl">
              {iconUrl ? (
                <img src={iconUrl} alt="Avatar" className="h-full w-full rounded-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center rounded-full bg-[#9146FF] font-bold text-white text-lg">
                  LIVE
                </div>
              )}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded bg-[#eb0400] px-1.5 py-0.2 text-[8px] font-black uppercase text-white tracking-wider">
                LIVE
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white">alex_stream</h3>
                <span className="text-[#9146FF]">✦</span>
              </div>
              <p className="text-xs text-[#adadb8]">Software and Game Development · 24.2K followers</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 rounded-lg bg-[#9146FF] px-3.5 py-1.5 text-xs font-bold text-white shadow transition hover:bg-[#772ce8]">
              <Heart size={14} /> Follow
            </button>
            <button className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/15">
              Subscribe
            </button>
          </div>
        </div>

        {/* Twitch Tabs */}
        <div className="mt-4 flex gap-5 border-b border-[#26262c] pb-2 text-xs font-semibold text-[#adadb8]">
          <span className="border-b-2 border-[#9146FF] pb-2 text-white">Home</span>
          <span>About</span>
          <span>Schedule</span>
          <span>Videos</span>
          <span>Chat</span>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#18181b] p-3 text-xs">
          <div className="flex items-center gap-2">
            <Radio size={16} className="text-[#eb0400]" />
            <span className="text-white font-medium">Currently building interactive banner preview tools!</span>
          </div>
          <span className="text-[#adadb8] text-[11px]">English</span>
        </div>
      </div>
    </div>
  )
}

function TwitchSafeZoneOverlay() {
  return (
    <svg className="safe-zone-overlay absolute inset-0 h-full w-full" viewBox="0 0 1200 480" preserveAspectRatio="none" role="img" aria-label="Twitch banner safe zones">
      <circle cx="120" cy="480" r="160" fill="#111214" fillOpacity=".5" stroke="#9146FF" strokeWidth="8" strokeDasharray="16 10" />
      <rect x="0" y="420" width="1200" height="60" fill="#000" fillOpacity=".4" />
      <g fontFamily="ui-sans-serif, system-ui" fontSize="22" fontWeight="700">
        <rect x="40" y="340" width="240" height="42" rx="8" fill="#111214" fillOpacity=".85" />
        <text x="160" y="369" fill="#9146FF" textAnchor="middle">AVATAR OVERLAY</text>
        <rect x="420" y="24" width="380" height="42" rx="8" fill="#111214" fillOpacity=".85" />
        <text x="610" y="53" fill="#fff" textAnchor="middle">1200 × 480 BANNER CANVAS</text>
      </g>
    </svg>
  )
}

// ----------------------------------------------------
// 6. FACEBOOK MOCKUP
// ----------------------------------------------------
export function FacebookMockup({ view, bannerStyle, bannerAsset, iconUrl, safeZoneGrid }) {
  return (
    <div className={`preview-shell mx-auto overflow-hidden border border-[#393a3b] bg-[#242526] text-white shadow-2xl transition-all duration-200 ${view === 'mobile' ? 'max-w-[420px]' : 'max-w-[800px]'}`}>
      {/* Cover Photo */}
      <div className={`relative w-full overflow-hidden bg-[#18191a] ${view === 'mobile' ? 'aspect-[640/360]' : 'aspect-[820/312]'}`}>
        <BannerImage bannerAsset={bannerAsset} bannerStyle={bannerStyle} fallbackGradient="bg-gradient-to-r from-blue-950 via-slate-900 to-[#1877F2]" />
        {safeZoneGrid && <FacebookSafeZoneOverlay />}
      </div>

      {/* Profile Details */}
      <div className="px-5 pb-5">
        <div className={`relative flex ${view === 'mobile' ? 'flex-col items-center text-center' : 'justify-between'}`}>
          <div className={`flex ${view === 'mobile' ? 'flex-col items-center' : 'items-end gap-4'} -mt-10 sm:-mt-12`}>
            {/* Avatar */}
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-full border-4 border-[#242526] bg-[#3a3b3c] shadow-xl overflow-hidden">
              {iconUrl ? (
                <img src={iconUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#1877F2] to-blue-700 font-bold text-2xl text-white">
                  FB
                </div>
              )}
            </div>
            <div className="mb-2">
              <h3 className="text-xl font-bold text-white">Alex Kozlov</h3>
              <p className="text-xs text-[#b0b3b8]">2.4K friends · 18 mutual</p>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button className="flex items-center gap-1.5 rounded-lg bg-[#1877F2] px-4 py-1.5 text-xs font-bold text-white shadow transition hover:bg-[#166fe5]">
              <Plus size={14} /> Add to story
            </button>
            <button className="rounded-lg bg-[#3a3b3c] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#4e4f50]">
              Edit profile
            </button>
          </div>
        </div>

        {/* Facebook Tabs */}
        <div className="mt-4 flex gap-5 border-b border-[#393a3b] pb-2 text-xs font-semibold text-[#b0b3b8]">
          <span className="border-b-2 border-[#1877F2] pb-2 text-[#1877F2]">Posts</span>
          <span>About</span>
          <span>Friends</span>
          <span>Photos</span>
          <span>Videos</span>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

function FacebookSafeZoneOverlay() {
  return (
    <svg className="safe-zone-overlay absolute inset-0 h-full w-full" viewBox="0 0 851 315" preserveAspectRatio="none" role="img" aria-label="Facebook cover photo safe zones">
      {/* Mobile Crop: crops left and right on mobile */}
      <rect x="0" y="0" width="105" height="315" fill="#ed4245" fillOpacity=".3" />
      <rect x="746" y="0" width="105" height="315" fill="#ed4245" fillOpacity=".3" />
      {/* Desktop Crop: crops top and bottom on desktop */}
      <rect x="105" y="0" width="641" height="315" fill="#23a559" fillOpacity=".2" stroke="#fff" strokeWidth="4" />
      <g fontFamily="ui-sans-serif, system-ui" fontSize="16" fontWeight="700" textAnchor="middle">
        <rect x="250" y="130" width="350" height="42" rx="8" fill="#111214" fillOpacity=".88" />
        <text x="425" y="157" fill="#23a559">UNIVERSAL SAFE CENTER (640 × 312)</text>
        <text x="52" y="160" fill="#ff9999" fontSize="11">MOBILE CROP</text>
        <text x="798" y="160" fill="#ff9999" fontSize="11">MOBILE CROP</text>
      </g>
    </svg>
  )
}

// ----------------------------------------------------
// 7. REDDIT MOCKUP
// ----------------------------------------------------
export function RedditMockup({ view, bannerStyle, bannerAsset, iconUrl, safeZoneGrid }) {
  return (
    <div className={`preview-shell mx-auto overflow-hidden border border-[#343536] bg-[#0e1113] text-white shadow-2xl transition-all duration-200 ${view === 'mobile' ? 'max-w-[420px]' : 'max-w-[800px]'}`}>
      {/* Subreddit Banner */}
      <div className="relative aspect-[5/1] w-full overflow-hidden bg-[#1a1a1b]">
        <BannerImage bannerAsset={bannerAsset} bannerStyle={bannerStyle} fallbackGradient="bg-gradient-to-r from-orange-950 via-zinc-900 to-[#FF4500]" />
        {safeZoneGrid && <RedditSafeZoneOverlay />}
      </div>

      {/* Community Info */}
      <div className="bg-[#1a1a1b] px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="-mt-8 relative h-16 w-16 shrink-0 rounded-full border-4 border-[#1a1a1b] bg-[#FF4500] shadow-xl overflow-hidden">
              {iconUrl ? (
                <img src={iconUrl} alt="Subreddit Icon" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-white font-black text-xl">
                  r/
                </div>
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">r/designers</h3>
              <p className="text-[11px] text-[#818384]">r/designers · 184K members · 412 online</p>
            </div>
          </div>

          <button className="rounded-full bg-[#FF4500] px-4 py-1.5 text-xs font-bold text-white shadow transition hover:bg-[#e03d00]">
            Join
          </button>
        </div>

        {/* Reddit Tabs */}
        <div className="mt-3 flex gap-4 text-xs font-semibold text-[#818384]">
          <span className="text-white">Hot</span>
          <span>New</span>
          <span>Top</span>
        </div>
      </div>
    </div>
  )
}

function RedditSafeZoneOverlay() {
  return (
    <svg className="safe-zone-overlay absolute inset-0 h-full w-full" viewBox="0 0 1920 384" preserveAspectRatio="none" role="img" aria-label="Reddit banner safe zones">
      <circle cx="160" cy="384" r="160" fill="#111214" fillOpacity=".5" stroke="#FF4500" strokeWidth="8" strokeDasharray="16 10" />
      <g fontFamily="ui-sans-serif, system-ui" fontSize="28" fontWeight="700">
        <rect x="50" y="270" width="280" height="46" rx="8" fill="#111214" fillOpacity=".85" />
        <text x="190" y="302" fill="#FF4500" textAnchor="middle">ICON OVERLAP</text>
        <rect x="750" y="24" width="450" height="46" rx="8" fill="#111214" fillOpacity=".85" />
        <text x="975" y="56" fill="#fff" textAnchor="middle">1920 × 384 (5:1 BANNER)</text>
      </g>
    </svg>
  )
}

// ----------------------------------------------------
// 8. GITHUB MOCKUP
// ----------------------------------------------------
export function GithubMockup({ view, bannerStyle, bannerAsset, iconUrl, safeZoneGrid }) {
  return (
    <div className={`preview-shell mx-auto overflow-hidden border border-[#30363d] bg-[#0d1117] text-white shadow-2xl transition-all duration-200 ${view === 'mobile' ? 'max-w-[420px]' : 'max-w-[800px]'}`}>
      {/* Social Card / Banner */}
      <div className="relative aspect-[2/1] max-h-[220px] w-full overflow-hidden bg-[#161b22]">
        <BannerImage bannerAsset={bannerAsset} bannerStyle={bannerStyle} fallbackGradient="bg-gradient-to-r from-slate-900 via-gray-900 to-[#24292F]" />
        {safeZoneGrid && <GithubSafeZoneOverlay />}
      </div>

      {/* GitHub Profile / Repository Details */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 shrink-0 rounded-2xl border border-[#30363d] bg-[#161b22] shadow overflow-hidden">
            {iconUrl ? (
              <img src={iconUrl} alt="GitHub Avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center bg-[#21262d] text-white font-mono font-bold text-lg">
                gh
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-white">alex-codes / bannerpreview.tech</h3>
            <p className="mt-1 text-xs text-[#7d8590]">Universal social media banner and asset previewer built for creators & developers.</p>
            <div className="mt-2.5 flex items-center gap-4 text-xs text-[#7d8590]">
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-[#f1e05a]" /> JavaScript</span>
              <span>★ 142 stars</span>
              <span>18 forks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GithubSafeZoneOverlay() {
  return (
    <svg className="safe-zone-overlay absolute inset-0 h-full w-full" viewBox="0 0 1280 640" preserveAspectRatio="none" role="img" aria-label="GitHub social preview safe zones">
      {/* 40px padding safe border for social card embeds */}
      <rect x="40" y="40" width="1200" height="560" fill="none" stroke="#58a6ff" strokeWidth="6" strokeDasharray="16 12" />
      <g fontFamily="ui-sans-serif, system-ui" fontSize="24" fontWeight="700" textAnchor="middle">
        <rect x="420" y="60" width="440" height="44" rx="8" fill="#0d1117" fillOpacity=".9" />
        <text x="640" y="90" fill="#58a6ff">SAFE SOCIAL CARD MARGIN (1280 × 640)</text>
      </g>
    </svg>
  )
}

// Master Preview Frame Switcher
export function MultiPlatformPreviewFrame({
  platformId,
  view,
  bannerStyle,
  bannerAsset,
  iconUrl,
  safeZoneGrid
}) {
  switch (platformId) {
    case 'twitter':
      return <TwitterMockup view={view} bannerStyle={bannerStyle} bannerAsset={bannerAsset} iconUrl={iconUrl} safeZoneGrid={safeZoneGrid} />
    case 'youtube':
      return <YoutubeMockup view={view} bannerStyle={bannerStyle} bannerAsset={bannerAsset} iconUrl={iconUrl} safeZoneGrid={safeZoneGrid} />
    case 'linkedin':
      return <LinkedinMockup view={view} bannerStyle={bannerStyle} bannerAsset={bannerAsset} iconUrl={iconUrl} safeZoneGrid={safeZoneGrid} />
    case 'twitch':
      return <TwitchMockup view={view} bannerStyle={bannerStyle} bannerAsset={bannerAsset} iconUrl={iconUrl} safeZoneGrid={safeZoneGrid} />
    case 'facebook':
      return <FacebookMockup view={view} bannerStyle={bannerStyle} bannerAsset={bannerAsset} iconUrl={iconUrl} safeZoneGrid={safeZoneGrid} />
    case 'reddit':
      return <RedditMockup view={view} bannerStyle={bannerStyle} bannerAsset={bannerAsset} iconUrl={iconUrl} safeZoneGrid={safeZoneGrid} />
    case 'github':
      return <GithubMockup view={view} bannerStyle={bannerStyle} bannerAsset={bannerAsset} iconUrl={iconUrl} safeZoneGrid={safeZoneGrid} />
    case 'discord':
    default:
      return <DiscordMockup view={view} bannerStyle={bannerStyle} bannerAsset={bannerAsset} iconUrl={iconUrl} safeZoneGrid={safeZoneGrid} />
  }
}
