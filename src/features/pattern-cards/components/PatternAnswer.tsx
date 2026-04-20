import type { Card } from '../../study/types'
import { RichText } from '../../rich-text/components/RichText'
import { renderInline } from '../../rich-text/utils/render-inline'
import { buildMnemonic } from '../utils/mnemonic'
import { splitPatternSections } from '../utils/pattern-sections'
import { getPatternTheme } from '../utils/pattern-theme'
import { inferPatternStepLabel } from '../utils/step-labels'

type PatternAnswerProps = {
  card: Card
}

export function PatternAnswer({ card }: PatternAnswerProps) {
  const theme = getPatternTheme(card)
  const sections = splitPatternSections(card.back)
  const structure = sections[0] || []
  const example = sections[1] || []
  const upgrade = sections[2] || []

  const intro = structure[0] || ''
  const stepLines = structure.slice(1)
  const stepLabels = stepLines.map((line, index) => inferPatternStepLabel(line, index))
  const mnemonic = stepLabels.length >= 3 ? buildMnemonic(stepLabels) : ''

  return (
    <div className="pattern-answer">
      {intro ? (
        <div className="pattern-banner" style={{ backgroundColor: theme.soft, borderColor: theme.border }}>
          <span className="pattern-kicker" style={{ color: theme.text }}>Pattern</span>
          <div className="pattern-banner-text">{renderInline(intro)}</div>
        </div>
      ) : null}

      {stepLines.length ? (
        <div className="pattern-structure">
          <div className="pattern-structure-head">
            <span className="pattern-kicker" style={{ color: theme.text }}>Structure</span>
            {mnemonic ? (
              <span
                className="pattern-mnemonic"
                style={{ backgroundColor: theme.soft, borderColor: theme.border, color: theme.text }}
              >
                {mnemonic}
              </span>
            ) : null}
          </div>

          <div className="pattern-steps">
            {stepLines.map((line, index) => (
              <div key={`${card.id}-step-${index}`} className="pattern-step" style={{ borderColor: theme.border }}>
                <span className="pattern-step-label" style={{ backgroundColor: theme.soft, color: theme.text }}>
                  {stepLabels[index]}
                </span>
                <div className="pattern-step-text">{renderInline(line)}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {example.length ? (
        <div className="pattern-section-card" style={{ borderColor: theme.border }}>
          <span className="pattern-kicker" style={{ color: theme.text }}>Example</span>
          <RichText text={example.join('\n')} />
        </div>
      ) : null}

      {upgrade.length ? (
        <div className="pattern-section-card" style={{ borderColor: theme.border, backgroundColor: theme.soft }}>
          <span className="pattern-kicker" style={{ color: theme.text }}>Senior upgrade</span>
          <RichText text={upgrade.join('\n')} />
        </div>
      ) : null}
    </div>
  )
}
