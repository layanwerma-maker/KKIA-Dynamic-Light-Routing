import { useState } from 'react'
import {
  Speaker,
  Users,
  Volume2,
  VolumeX,
  RadioTower,
  Cpu,
  Router,
  PlugZap,
  Sparkles,
  Activity,
  Server,
  BrainCircuit,
  ClipboardCheck,
  LayoutDashboard,
  Info,
  Target,
  Ear,
  Moon,
  MessageSquare,
  Hand,
  Lightbulb,
} from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import SectionHeader from '../components/common/SectionHeader'
import SimBadge from '../components/common/SimBadge'
import FlowRow from '../components/common/FlowRow'
import HardwareCard, { type HardwareCardData } from '../components/common/HardwareCard'

const HARDWARE_CARDS: HardwareCardData[] = [
  { icon: Speaker, titleKey: 'acoustic.cardATitle', doesKey: 'acoustic.cardADoes', installedKey: 'acoustic.cardAInstalled', connectsKey: 'acoustic.cardAConnects' },
  { icon: Cpu, titleKey: 'acoustic.cardBTitle', doesKey: 'acoustic.cardBDoes', installedKey: 'acoustic.cardBInstalled', connectsKey: 'acoustic.cardBConnects' },
  { icon: Router, titleKey: 'acoustic.cardCTitle', doesKey: 'acoustic.cardCDoes', installedKey: 'acoustic.cardCInstalled', connectsKey: 'acoustic.cardCConnects' },
  { icon: PlugZap, titleKey: 'acoustic.cardDTitle', doesKey: 'acoustic.cardDDoes', noteKey: 'acoustic.cardDNote', installedKey: 'acoustic.cardDInstalled', connectsKey: 'acoustic.cardDConnects' },
  { icon: RadioTower, titleKey: 'acoustic.cardETitle', doesKey: 'acoustic.cardEDoes', installedKey: 'acoustic.cardEInstalled', connectsKey: 'acoustic.cardEConnects' },
  { icon: Router, titleKey: 'acoustic.cardFTitle', doesKey: 'acoustic.cardFDoes', installedKey: 'acoustic.cardFInstalled', connectsKey: 'acoustic.cardFConnects' },
  { icon: Server, titleKey: 'acoustic.cardGTitle', doesKey: 'acoustic.cardGDoes', installedKey: 'acoustic.cardGInstalled', connectsKey: 'acoustic.cardGConnects' },
  { icon: LayoutDashboard, titleKey: 'acoustic.cardHTitle', doesKey: 'acoustic.cardHDoes', installedKey: 'acoustic.cardHInstalled', connectsKey: 'acoustic.cardHConnects' },
]

const FACTORS = ['factor1', 'factor2', 'factor3', 'factor4', 'factor5', 'factor6', 'factor7', 'factor8']

const SILENT_ITEMS = ['silentItem1', 'silentItem2', 'silentItem3', 'silentItem4', 'silentItem5']

const MESSAGES_AR = ['message1', 'message2', 'message3', 'message4', 'message5']

const AUDIO_CHAIN = ['acoustic.audioChain1', 'acoustic.audioChain2', 'acoustic.audioChain3', 'acoustic.audioChain4', 'acoustic.audioChain5', 'acoustic.audioChain6']
const LIGHT_CHAIN = ['acoustic.lightChain1', 'acoustic.lightChain2', 'acoustic.lightChain3']

type OutputMode = 'light' | 'audio' | 'both'

export default function AcousticGuidancePage() {
  const { t } = useLang()
  const [mode, setMode] = useState<OutputMode>('both')
  const lightActive = mode === 'light' || mode === 'both'
  const audioActive = mode === 'audio' || mode === 'both'

  return (
    <div>
      <SectionHeader title={t('acoustic.title')} subtitle={t('acoustic.subtitle')} actions={<SimBadge />} />

      {/* 1. Intro */}
      <div className="mb-6 space-y-3 panel p-4">
        <p className="text-sm text-slate-300">{t('acoustic.intro1')}</p>
        <p className="text-sm text-slate-400">{t('acoustic.intro2')}</p>
        <p className="text-sm text-slate-400">{t('acoustic.intro3')}</p>
        <div className="flex items-start gap-2 rounded-lg border border-teal-500/25 bg-teal-500/5 px-3 py-2 text-xs text-teal-200">
          <Target size={14} className="mt-0.5 shrink-0" />
          <div>
            <p className="mb-0.5 font-semibold">{t('acoustic.targetedZoneTitle')}</p>
            <p>{t('acoustic.importantNote')}</p>
          </div>
        </div>
      </div>

      {/* 2. Visual Audio Beam Demonstration */}
      <div className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('acoustic.beamSectionTitle')}</h2>
        <div className="panel p-6">
          <div className="mx-auto flex max-w-xs flex-col items-center">
            <Speaker size={26} className="text-teal-300" />
            <span className="mt-1 text-[11px] font-medium text-slate-400">{t('acoustic.beamSpeakerLabel')}</span>
            <div className="relative mt-2 h-32 w-full">
              <div
                className="absolute inset-x-0 top-0 mx-auto h-full w-full opacity-[0.15]"
                style={{ clipPath: 'polygon(50% 0%, 8% 100%, 92% 100%)', background: '#37d0ff' }}
              />
              <div
                className="absolute inset-x-0 top-0 mx-auto h-full w-full opacity-60"
                style={{ clipPath: 'polygon(50% 0%, 38% 100%, 62% 100%)', background: '#37d0ff' }}
              />
              <span className="absolute inset-x-0 bottom-7 text-center text-[10px] font-medium text-navy-950">
                {t('acoustic.beamLabel')}
              </span>
            </div>
            <div className="flex gap-3">
              <Users size={16} className="text-status-guidance" />
              <Users size={16} className="text-status-guidance" />
              <Users size={16} className="text-status-guidance" />
            </div>
            <p className="mt-1 text-xs font-semibold text-status-guidance">{t('acoustic.beamZoneLabel')}</p>
            <p className="mt-3 max-w-[16rem] text-center text-[11px] text-slate-500">{t('acoustic.beamSpillLabel')}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 items-end justify-center gap-1">
                {[8, 14, 20, 26, 20, 14, 8].map((h, i) => (
                  <span key={i} className="w-2 rounded-t bg-slate-500/60" style={{ height: h }} />
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-200">{t('acoustic.comparisonConventionalTitle')}</p>
              <p className="text-xs text-slate-500">{t('acoustic.comparisonConventionalBody')}</p>
            </div>
            <div className="rounded-xl border border-teal-500/25 bg-teal-500/5 p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 items-end justify-center gap-1">
                {[4, 6, 26, 26, 26, 6, 4].map((h, i) => (
                  <span key={i} className="w-2 rounded-t bg-status-guidance/70" style={{ height: h }} />
                ))}
              </div>
              <p className="text-sm font-semibold text-status-guidance">{t('acoustic.comparisonDirectionalTitle')}</p>
              <p className="text-xs text-teal-200/80">{t('acoustic.comparisonDirectionalBody')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Hardware */}
      <div className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('acoustic.hardwareTitle')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HARDWARE_CARDS.map((card) => (
            <HardwareCard key={card.titleKey} card={card} />
          ))}
        </div>
      </div>

      {/* 4. Sound level */}
      <div className="mb-6 panel p-4">
        <h2 className="mb-2 text-sm font-semibold text-slate-200">{t('acoustic.soundLevelTitle')}</h2>
        <p className="mb-3 text-sm text-slate-400">{t('acoustic.soundLevelIntro')}</p>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('acoustic.factorsTitle')}</h3>
        <ul className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {FACTORS.map((key) => (
            <li key={key} className="rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1.5 text-[11px] text-slate-400">
              {t(`acoustic.${key}`)}
            </li>
          ))}
        </ul>
        <p className="mb-4 text-sm text-slate-400">{t('acoustic.designApproach')}</p>

        <div className="mb-4 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <span className="rounded-full border border-teal-500/25 bg-teal-500/5 px-3 py-1.5 text-xs font-semibold text-teal-200">
            {t('acoustic.formulaAmbient')}
          </span>
          <span className="text-slate-500">+</span>
          <span className="rounded-full border border-teal-500/25 bg-teal-500/5 px-3 py-1.5 text-xs font-semibold text-teal-200">
            {t('acoustic.formulaMargin')}
          </span>
          <span className="text-slate-500">=</span>
          <span className="rounded-full border border-status-guidance/40 bg-status-guidance/10 px-3 py-1.5 text-xs font-semibold text-status-guidance">
            {t('acoustic.formulaTarget')}
          </span>
        </div>

        <div className="mb-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-slate-400">
          <p className="font-mono text-slate-300">
            {t('acoustic.exampleAmbient')} → {t('acoustic.exampleTarget')}
          </p>
          <p className="mt-1">{t('acoustic.exampleLabel')}</p>
        </div>

        <p className="text-xs text-slate-500">{t('acoustic.dynamicAdjustNote')}</p>
      </div>

      {/* 5. Can only the person under it hear it */}
      <div className="mb-6 rounded-xl border border-status-guidance/30 bg-status-guidance/5 p-4">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-status-guidance">
          <Ear size={16} /> {t('acoustic.highlightTitle')}
        </h2>
        <p className="mb-3 text-sm font-medium text-slate-200">{t('acoustic.highlightQ')}</p>
        <p className="mb-4 text-sm text-slate-300">{t('acoustic.highlightA')}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-status-normal/30 bg-status-normal/10 px-3 py-2 text-xs font-semibold text-status-normal">
            {t('acoustic.zoneInside')}
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-400">
            {t('acoustic.zoneOutside')}
          </div>
        </div>
      </div>

      {/* 6. Light + Audio Integration */}
      <div className="mb-6 panel p-4">
        <h2 className="mb-4 text-sm font-semibold text-slate-200">{t('acoustic.integrationTitle')}</h2>

        <div className="mx-auto flex max-w-md flex-col items-center gap-1">
          {[
            { icon: RadioTower, key: 'acoustic.integrationNode1' },
            { icon: Activity, key: 'acoustic.integrationNode2' },
            { icon: BrainCircuit, key: 'acoustic.integrationNode3' },
            { icon: ClipboardCheck, key: 'acoustic.integrationNode4' },
          ].map((node) => (
            <div key={node.key} className="flex w-full flex-col items-center">
              <div className="flex w-full items-center gap-3 rounded-xl border border-teal-500/25 bg-teal-500/5 px-4 py-2.5">
                <node.icon size={18} className="shrink-0 text-teal-400" />
                <span className="text-sm font-medium text-slate-200">{t(node.key)}</span>
              </div>
              <span className="my-1 text-slate-600">↓</span>
            </div>
          ))}

          <div className="grid w-full grid-cols-2 gap-3">
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-status-guidance/30 bg-status-guidance/10 px-3 py-3 text-center">
              <Sparkles size={18} className="text-status-guidance" />
              <span className="text-xs font-semibold text-status-guidance">{t('acoustic.integrationBranchLight')}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-status-guidance/30 bg-status-guidance/10 px-3 py-3 text-center">
              <Volume2 size={18} className="text-status-guidance" />
              <span className="text-xs font-semibold text-status-guidance">{t('acoustic.integrationBranchAudio')}</span>
            </div>
          </div>
          <span className="my-1 text-slate-600">↓</span>

          <div className="flex w-full items-center gap-3 rounded-xl border border-teal-500/25 bg-teal-500/5 px-4 py-2.5">
            <Users size={18} className="shrink-0 text-teal-400" />
            <span className="text-sm font-medium text-slate-200">{t('acoustic.integrationNode5')}</span>
          </div>
          <span className="my-1 text-slate-600">↓</span>
          <div className="flex w-full items-center gap-3 rounded-xl border border-teal-500/25 bg-teal-500/5 px-4 py-2.5">
            <Activity size={18} className="shrink-0 text-teal-400" />
            <span className="text-sm font-medium text-slate-200">{t('acoustic.integrationNode6')}</span>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">{t('acoustic.integrationNote')}</p>

        <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('acoustic.integrationExampleTitle')}</p>
          <ol className="space-y-1.5 text-sm text-slate-400">
            <li>1. {t('acoustic.integrationExample1')}</li>
            <li>2. {t('acoustic.integrationExample2')}</li>
            <li>3. {t('acoustic.integrationExample3')}</li>
            <li>
              4. {t('acoustic.integrationExample4')}
              <span className="ms-1 font-mono text-teal-300">{t('acoustic.integrationExampleMessage')}</span>
            </li>
            <li>5. {t('acoustic.integrationExample5')}</li>
            <li>6. {t('acoustic.integrationExample6')}</li>
          </ol>
        </div>
      </div>

      {/* 7. Control Modes */}
      <div className="mb-6 panel p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">{t('acoustic.modesTitle')}</h2>
        <div className="mb-4 inline-flex overflow-hidden rounded-lg border border-white/15 text-xs font-semibold">
          <button
            onClick={() => setMode('light')}
            className={`px-3 py-1.5 ${mode === 'light' ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-300'}`}
          >
            {t('acoustic.modeLightOnlyTitle')}
          </button>
          <button
            onClick={() => setMode('audio')}
            className={`px-3 py-1.5 ${mode === 'audio' ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-300'}`}
          >
            {t('acoustic.modeAudioOnlyTitle')}
          </button>
          <button
            onClick={() => setMode('both')}
            className={`px-3 py-1.5 ${mode === 'both' ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-300'}`}
          >
            {t('acoustic.modeLightAudioTitle')}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div
            className={`flex items-center gap-3 rounded-xl border p-4 transition ${
              lightActive ? 'border-status-guidance/40 bg-status-guidance/10 text-status-guidance' : 'border-white/10 bg-white/[0.02] text-slate-600'
            }`}
          >
            <Lightbulb size={22} className={lightActive ? 'animate-pulseGlow' : ''} />
            <div>
              <p className="text-sm font-semibold">{t('acoustic.modeLightOnlyTitle')}</p>
              <p className="text-xs opacity-80">{lightActive ? t('acoustic.modeLightOnlyBody') : t('common.unavailable')}</p>
            </div>
          </div>
          <div
            className={`flex items-center gap-3 rounded-xl border p-4 transition ${
              audioActive ? 'border-status-guidance/40 bg-status-guidance/10 text-status-guidance' : 'border-white/10 bg-white/[0.02] text-slate-600'
            }`}
          >
            {audioActive ? <Volume2 size={22} className="animate-pulseGlow" /> : <VolumeX size={22} />}
            <div>
              <p className="text-sm font-semibold">{t('acoustic.modeAudioOnlyTitle')}</p>
              <p className="text-xs opacity-80">{audioActive ? t('acoustic.modeAudioOnlyBody') : t('common.unavailable')}</p>
            </div>
          </div>
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs text-slate-500">
          <Hand size={13} className="mt-0.5 shrink-0" /> {t('acoustic.modesRetainNote')}
        </p>
      </div>

      {/* 8. Audio Zone Mapping */}
      <div className="mb-6 panel p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">{t('acoustic.mappingTitle')}</h2>
        <p className="mb-3 text-sm font-semibold text-teal-300">{t('acoustic.mappingZoneName')}</p>
        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: 'acoustic.mappingSensor', value: 'S-01' },
            { label: 'acoustic.mappingLedA', value: 'LED-A' },
            { label: 'acoustic.mappingLedB', value: 'LED-B' },
            { label: 'acoustic.mappingSpeaker', value: 'SP-02' },
            { label: 'acoustic.mappingController', value: 'AC-01' },
            { label: 'acoustic.mappingMessage', value: 'MSG-B01' },
          ].map((f) => (
            <div key={f.label} className="rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1.5 text-center">
              <p className="text-[10px] text-slate-500">{t(f.label)}</p>
              <p className="font-mono text-xs text-slate-200">{f.value}</p>
            </div>
          ))}
        </div>
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-teal-500/20 bg-teal-500/5 px-3 py-2 text-xs text-teal-200">
          <MessageSquare size={14} className="mt-0.5 shrink-0" />
          <p>
            <span className="font-semibold">{t('acoustic.mappingMessage')} (MSG-B01): </span>
            {t('acoustic.mappingMessageText')}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('acoustic.mappingAudioChainTitle')}</h3>
            <FlowRow items={AUDIO_CHAIN} />
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('acoustic.mappingLightChainTitle')}</h3>
            <FlowRow items={LIGHT_CHAIN} />
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-slate-400">
          <Info size={14} className="mt-0.5 shrink-0 text-teal-400" />
          <p>{t('connectionDiagram.frontendNote')}</p>
        </div>
      </div>

      {/* 9. Silent Airport Compatibility */}
      <div className="mb-6 panel p-4">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Moon size={16} className="text-teal-400" /> {t('acoustic.silentTitle')}
        </h2>
        <p className="mb-3 text-sm text-slate-400">{t('acoustic.silentBody1')}</p>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('acoustic.silentDeliversTitle')}</p>
        <ul className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SILENT_ITEMS.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm text-slate-400">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
              {t(`acoustic.${key}`)}
            </li>
          ))}
        </ul>
        <p className="mb-3 text-sm text-slate-400">{t('acoustic.silentBody2')}</p>
        <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-slate-400">
          <Info size={14} className="mt-0.5 shrink-0 text-teal-400" />
          <p>{t('acoustic.silentNote')}</p>
        </div>
      </div>

      {/* 10. Message Library */}
      <div className="panel p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
          <MessageSquare size={16} className="text-teal-400" /> {t('acoustic.messageLibraryTitle')}
        </h2>
        <ul className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {MESSAGES_AR.map((key) => (
            <li key={key} className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-slate-300">
              {t(`acoustic.${key}`)}
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500">{t('acoustic.messageLibraryNote')}</p>
      </div>
    </div>
  )
}
