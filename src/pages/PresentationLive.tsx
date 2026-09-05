import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Volume2, VolumeX } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { useSimulation, SECURITY_STEP_COUNT, ARRIVALS_STEP_COUNT } from '../state/SimulationContext'
import BrandMark from '../components/common/BrandMark'
import LanguageSwitcher from '../components/common/LanguageSwitcher'
import AirportMap from '../components/map/AirportMap'

const CHAPTERS = [
  { title: 'presentation.challenge', body: 'presentation.challengeBody' },
  { title: 'presentation.detection', body: 'presentation.detectionBody' },
  { title: 'presentation.analysis', body: 'presentation.analysisBody' },
  { title: 'presentation.verification', body: 'presentation.verificationBody' },
  { title: 'presentation.guidance', body: 'presentation.guidanceBody' },
  { title: 'presentation.redistribution', body: 'presentation.redistributionBody' },
  { title: 'presentation.improvement', body: 'presentation.improvementBody' },
]

const TOTAL_STEPS = SECURITY_STEP_COUNT + ARRIVALS_STEP_COUNT

export default function PresentationLive() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const { state, dispatch } = useSimulation()
  const [narration, setNarration] = useState(false)
  const spokenChapterRef = useRef<number>(-1)

  useEffect(() => {
    if (state.scenario === 'IDLE') {
      dispatch({ type: 'START_FULL_DEMO' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const globalStep = useMemo(() => {
    if (state.scenario === 'SECURITY') return state.stepIndex
    if (state.scenario === 'ARRIVALS_PEAK') return SECURITY_STEP_COUNT + state.stepIndex
    if (state.scenario === 'IDLE' && state.timeline.length > 0) return TOTAL_STEPS
    return 0
  }, [state.scenario, state.stepIndex, state.timeline.length])

  const progress = Math.min(1, globalStep / TOTAL_STEPS)
  const chapterIndex = Math.min(CHAPTERS.length - 1, Math.floor(progress * CHAPTERS.length))
  const chapter = CHAPTERS[chapterIndex]

  useEffect(() => {
    if (!narration) return
    if (!('speechSynthesis' in window)) return
    if (spokenChapterRef.current === chapterIndex) return
    spokenChapterRef.current = chapterIndex
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(`${t(chapter.title)}. ${t(chapter.body)}`)
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US'
    window.speechSynthesis.speak(utterance)
  }, [chapterIndex, narration, lang, chapter, t])

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [])

  const exit = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    navigate('/presentation')
  }

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-navy-950 text-slate-100">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <BrandMark size="md" />
        <div className="flex items-center gap-3">
          <button
            className="btn-ghost"
            onClick={() => setNarration((v) => !v)}
            title={narration ? t('presentation.narrationOn') : t('presentation.narrationOff')}
          >
            {narration ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <LanguageSwitcher />
          <button className="btn-secondary" onClick={exit}>
            <X size={16} /> {t('presentation.exit')}
          </button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-6 px-6 py-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-400">{t('common.orgEn')}</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{t(chapter.title)}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300 sm:text-lg">{t(chapter.body)}</p>
        </div>

        <div className="mx-auto w-full max-w-5xl">
          <AirportMap compact />
        </div>

        <div className="flex items-center justify-center gap-2">
          {CHAPTERS.map((c, i) => (
            <div
              key={c.title}
              className={`h-1.5 w-10 rounded-full transition-colors ${i <= chapterIndex ? 'bg-teal-400' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-3 text-center text-[11px] text-slate-500">
        <strong className="font-semibold text-slate-400">{t('disclaimerBar.label')}</strong> {t('disclaimerBar.text')}
      </div>
    </div>
  )
}
