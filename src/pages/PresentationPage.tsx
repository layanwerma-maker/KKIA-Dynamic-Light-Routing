import { Link } from 'react-router-dom'
import { Maximize2, Video, FileVideo2 } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import SectionHeader from '../components/common/SectionHeader'
import VideoDemoPanel from '../components/presentation/VideoDemoPanel'

const CHAPTERS = [
  'presentation.challenge',
  'presentation.detection',
  'presentation.analysis',
  'presentation.verification',
  'presentation.guidance',
  'presentation.redistribution',
  'presentation.improvement',
]

export default function PresentationPage() {
  const { t } = useLang()

  return (
    <div>
      <SectionHeader
        title={t('presentation.title')}
        subtitle={t('video.subtitle')}
        actions={
          <Link to="/presentation/live" className="btn-primary">
            <Maximize2 size={16} /> {t('presentation.enter')}
          </Link>
        }
      />

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {CHAPTERS.map((key, i) => (
          <div key={key} className="panel flex flex-col items-center gap-1 p-3 text-center">
            <span className="text-xs font-bold text-teal-400">{i + 1}</span>
            <span className="text-[11px] font-semibold text-slate-300">{t(key)}</span>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <VideoDemoPanel />
      </div>

      <div className="panel flex flex-col gap-3 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <FileVideo2 size={16} className="text-teal-400" /> {t('video.recordingGuide')}
        </h3>
        <ol className="list-inside list-decimal space-y-1.5 text-sm text-slate-400">
          <li>{t('presentation.enter')} → {t('presentation.playSequence')} (16:9, 1920×1080 layout).</li>
          <li>
            Windows: <code className="rounded bg-white/10 px-1">Win+Alt+R</code> · macOS:{' '}
            <code className="rounded bg-white/10 px-1">Shift+Cmd+5</code> · or any OBS/screen-recorder set to 1920×1080.
          </li>
          <li>Let the 7-chapter story play through once (~45–90s), then stop the recording.</li>
          <li>
            Optional: re-encode with ffmpeg — <code className="rounded bg-white/10 px-1">ffmpeg -i input.mov -vf scale=1920:1080 -r 30 output.mp4</code>
          </li>
          <li>Import the resulting MP4 directly into PowerPoint / Keynote / your presentation deck.</li>
        </ol>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Video size={14} /> {t('video.exportBtn')}: this in-app deterministic sequence is the source; recording it is the recommended export path (see steps above).
        </div>
      </div>
    </div>
  )
}
