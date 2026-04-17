'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  violet:       '#685EFC',
  green:        '#12895E',
  dark:         '#16252D',
  muted:        '#A49595',
  mint:         '#37ffb7',
  lightStroke:  '#c1eddd',
  lavender:     '#9b94ff',
  bg:           '#0f1e25',
  surface:      '#1a2e38',
  surfaceHover: '#1f3541',
  border:       '#243c48',
  text:         '#e8f0ed',
  textSoft:     '#94b0a8',
  error:        '#ff6b6b',
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: '100vh',
    background: C.bg,
    color: C.text,
    fontFamily: "'DM Sans', sans-serif",
  },
  header: {
    padding: '28px 40px',
    borderBottom: `1px solid ${C.border}`,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '18px',
    color: C.text,
    letterSpacing: '-0.3px',
  },
  logoAccent: { color: C.mint },
  badge: {
    marginLeft: 'auto',
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: C.textSoft,
    background: C.surface,
    border: `1px solid ${C.border}`,
    padding: '4px 10px',
    borderRadius: '4px',
  },
  wrapper: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '48px 24px 80px',
  },
  stepIndicator: {
    display: 'flex',
    gap: '6px',
    marginBottom: '48px',
    alignItems: 'center',
  },
  stepDot: (active, done) => ({
    height: '3px',
    flex: 1,
    borderRadius: '2px',
    background: done ? C.mint : active ? C.violet : C.border,
    transition: 'background 0.3s ease',
  }),
  stepLabel: {
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: C.muted,
    marginBottom: '8px',
  },
  sectionTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '28px',
    fontWeight: '400',
    color: C.text,
    letterSpacing: '-0.5px',
    marginBottom: '6px',
    lineHeight: '1.25',
  },
  sectionSub: {
    fontSize: '14px',
    color: C.textSoft,
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  fieldGroup: { marginBottom: '32px' },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: C.text,
    marginBottom: '12px',
    lineHeight: '1.5',
  },
  labelSub: {
    display: 'block',
    fontSize: '12px',
    color: C.textSoft,
    fontWeight: '400',
    marginTop: '2px',
  },
  input: (focused, hasError) => ({
    width: '100%',
    background: C.surface,
    border: `1.5px solid ${hasError ? C.error : focused ? C.violet : C.border}`,
    borderRadius: '10px',
    color: C.text,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '15px',
    lineHeight: '1.5',
    padding: '14px 16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease',
  }),
  errorMsg: {
    fontSize: '12px',
    color: C.error,
    marginTop: '8px',
  },
  confirmCard: {
    background: C.surface,
    border: `1.5px solid ${C.border}`,
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '32px',
  },
  confirmCardHighlight: {
    background: 'rgba(104,94,252,0.08)',
    border: `1.5px solid ${C.violet}`,
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '32px',
  },
  confirmName: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '20px',
    color: C.text,
    marginBottom: '6px',
  },
  confirmMeta: {
    fontSize: '13px',
    color: C.textSoft,
    lineHeight: '1.6',
  },
  confirmDot: {
    display: 'inline-block',
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    background: C.border,
    margin: '0 8px',
    verticalAlign: 'middle',
  },
  ratingRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  ratingBtn: (selected) => ({
    width: '44px',
    height: '44px',
    borderRadius: '8px',
    border: `1.5px solid ${selected ? C.violet : C.border}`,
    background: selected ? C.violet : 'transparent',
    color: selected ? '#fff' : C.textSoft,
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  textarea: {
    width: '100%',
    background: C.surface,
    border: `1.5px solid ${C.border}`,
    borderRadius: '10px',
    color: C.text,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    lineHeight: '1.6',
    padding: '14px 16px',
    resize: 'vertical',
    minHeight: '100px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease',
  },
  choiceGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  choiceBtn: (selected) => ({
    padding: '13px 16px',
    borderRadius: '10px',
    border: `1.5px solid ${selected ? C.violet : C.border}`,
    background: selected ? 'rgba(104,94,252,0.1)' : 'transparent',
    color: selected ? C.lavender : C.textSoft,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '13px',
    fontWeight: selected ? '500' : '400',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
    lineHeight: '1.4',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }),
  choiceIndicator: (selected) => ({
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: `2px solid ${selected ? C.violet : C.border}`,
    background: selected ? C.violet : 'transparent',
    flexShrink: 0,
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  navRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '48px',
    paddingTop: '32px',
    borderTop: `1px solid ${C.border}`,
  },
  btnBack: {
    background: 'transparent',
    border: `1.5px solid ${C.border}`,
    color: C.textSoft,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    fontWeight: '500',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  btnPrimary: (disabled) => ({
    background: disabled ? C.border : C.violet,
    border: 'none',
    color: disabled ? C.muted : '#fff',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    fontWeight: '600',
    padding: '12px 28px',
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s ease',
    letterSpacing: '0.01em',
  }),
  btnSubmit: {
    background: C.green,
    border: 'none',
    color: '#fff',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    fontWeight: '600',
    padding: '12px 28px',
    borderRadius: '8px',
    cursor: 'pointer',
    letterSpacing: '0.01em',
  },
  successWrap: {
    textAlign: 'center',
    padding: '80px 24px',
  },
  successIcon: (color = C.mint, bg = 'rgba(18,137,94,0.15)', border = C.green) => ({
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: bg,
    border: `2px solid ${border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    color,
    fontSize: '22px',
  }),
  successTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '32px',
    fontWeight: '400',
    color: C.text,
    marginBottom: '12px',
    letterSpacing: '-0.5px',
  },
  successSub: {
    fontSize: '15px',
    color: C.textSoft,
    lineHeight: '1.6',
    maxWidth: '420px',
    margin: '0 auto',
  },
};

// ─── Section configs ──────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: 'onboarding',
    label: 'Getting started',
    title: 'How was your onboarding experience?',
    sub: "First impressions shape everything. We want to know how easy it was to get off the ground.",
  },
  {
    id: 'hiring',
    label: 'Hiring & matching',
    title: 'Finding the right talent',
    sub: 'Walk us through how the hiring request and candidate matching process felt.',
  },
  {
    id: 'ai',
    label: 'AI analysis',
    title: 'The AI candidate reports',
    sub: "We built a scoring and analysis system — help us understand whether it's actually useful.",
  },
  {
    id: 'platform',
    label: 'Overall experience',
    title: 'The platform as a whole',
    sub: 'Be honest. What worked, and what needs fixing.',
  },
  {
    id: 'pricing',
    label: 'Pricing',
    title: 'Pricing and willingness to pay',
    sub: "Understanding what feels fair helps us build a sustainable model. Nothing here is binding.",
  },
  {
    id: 'nps',
    label: 'Final thoughts',
    title: "Last one — we promise.",
    sub: "Share what you'd change and whether you'd come back.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const RatingField = ({ label, sub, value, onChange, lowLabel = 'Very difficult', highLabel = 'Very easy' }) => (
  <div style={S.fieldGroup}>
    <label style={S.label}>
      {label}
      {sub && <span style={S.labelSub}>{sub}</span>}
    </label>
    <div style={S.ratingRow}>
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} style={S.ratingBtn(value === n)} onClick={() => onChange(n)} type="button">
          {n}
        </button>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
      <span style={{ fontSize: '11px', color: C.muted }}>{lowLabel}</span>
      <span style={{ fontSize: '11px', color: C.muted }}>{highLabel}</span>
    </div>
  </div>
);

const ChoiceField = ({ label, sub, options, value, onChange }) => (
  <div style={S.fieldGroup}>
    <label style={S.label}>
      {label}
      {sub && <span style={S.labelSub}>{sub}</span>}
    </label>
    <div style={S.choiceGrid}>
      {options.map(opt => {
        const isSelected = value === opt;
        return (
          <button key={opt} style={S.choiceBtn(isSelected)} onClick={() => onChange(opt)} type="button">
            <div style={S.choiceIndicator(isSelected)}>
              {isSelected && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#fff' }} />}
            </div>
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

const TextareaField = ({ label, sub, value, onChange, placeholder }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={S.fieldGroup}>
      <label style={S.label}>
        {label}
        {sub && <span style={S.labelSub}>{sub}</span>}
      </label>
      <textarea
        style={{ ...S.textarea, borderColor: focused ? C.violet : C.border }}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Write here…'}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

// ─── Lookup pre-step ──────────────────────────────────────────────────────────
// lookupState: 'idle' | 'searching' | 'found' | 'not_found' | 'error'
const LookupStep = ({ onConfirmed, onAlreadySubmitted }) => {
  const [nameInput, setNameInput]     = useState('');
  const [focused, setFocused]         = useState(false);
  const [lookupState, setLookupState] = useState('idle');
  const [foundStartup, setFoundStartup] = useState(null);
  const [errorMsg, setErrorMsg]       = useState('');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleLookup = async () => {
    const name = nameInput.trim();
    if (!name) return;

    setLookupState('searching');
    setErrorMsg('');

    try {
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback/lookup?name=${encodeURIComponent(name)}`);
      const json = await res.json();

      if (!json.success) {
        setLookupState('not_found');
        setErrorMsg(json.message);
        return;
      }

      if (json.hasSubmitted) {
        onAlreadySubmitted();
        return;
      }

      setFoundStartup(json.startup);
      setLookupState('found');
    } catch (_) {
      setLookupState('error');
      setErrorMsg('Something went wrong. Please check your connection and try again.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && lookupState !== 'searching') handleLookup();
  };

  const handleReset = () => {
    setLookupState('idle');
    setFoundStartup(null);
    setErrorMsg('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div>
      <div style={{ ...S.stepLabel }}>Before you begin</div>
      <div style={S.sectionTitle}>Who's filling this in?</div>
      <p style={S.sectionSub}>
        Enter your startup's registered name and we'll pull up your account — no login needed.
      </p>

      {lookupState !== 'found' && (
        <div style={S.fieldGroup}>
          <label style={S.label}>Your startup name</label>
          <input
            ref={inputRef}
            type="text"
            value={nameInput}
            onChange={e => { setNameInput(e.target.value); if (lookupState !== 'idle') setLookupState('idle'); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Acme Technologies"
            style={S.input(focused, lookupState === 'not_found' || lookupState === 'error')}
          />
          {(lookupState === 'not_found' || lookupState === 'error') && (
            <p style={S.errorMsg}>{errorMsg}</p>
          )}
        </div>
      )}

      {lookupState === 'found' && foundStartup && (
        <div>
          <p style={{ fontSize: '13px', color: C.textSoft, marginBottom: '12px' }}>
            Is this you?
          </p>
          <div style={S.confirmCardHighlight}>
            <div style={S.confirmName}>{foundStartup.companyName}</div>
            <div style={S.confirmMeta}>
              {[foundStartup.industry, foundStartup.stage, foundStartup.location?.city && `${foundStartup.location.city}, ${foundStartup.location.country}`]
                .filter(Boolean)
                .map((item, i, arr) => (
                  <span key={i}>
                    {item}
                    {i < arr.length - 1 && <span style={S.confirmDot} />}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ ...S.navRow, marginTop: lookupState === 'found' ? '0' : undefined }}>
        {lookupState === 'found' ? (
          <>
            <button style={S.btnBack} onClick={handleReset} type="button">
              ← Not me
            </button>
            <button style={S.btnPrimary(false)} onClick={() => onConfirmed(foundStartup)} type="button">
              Yes, that's me →
            </button>
          </>
        ) : (
          <>
            <div />
            <button
              style={S.btnPrimary(lookupState === 'searching' || !nameInput.trim())}
              onClick={handleLookup}
              disabled={lookupState === 'searching' || !nameInput.trim()}
              type="button"
            >
              {lookupState === 'searching' ? 'Looking up…' : 'Find my startup →'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Main form ────────────────────────────────────────────────────────────────
export default function FeedbackForm() {
  // 'lookup' → pre-step | 'form' → main form | 'submitted' | 'already_submitted'
  const [screen, setScreen]         = useState('lookup');
  const [confirmedStartup, setConfirmedStartup] = useState(null);
  const [step, setStep]             = useState(0);
  const [loading, setLoading]       = useState(false);

  const [data, setData] = useState({
    onboardingEase:            null,
    onboardingFrustrations:    '',
    hiringRequestEase:         null,
    candidateRelevance:        null,
    aiReportHelpfulness:       null,
    missingProfileInfo:        '',
    aiAnalysisConviction:      null,
    aiDecisionConfidence:      null,
    aiAnalysisWeighting:       null,
    aiTrustIssues:             '',
    aiImprovementSuggestions:  '',
    overallExperience:         null,
    mostBrokenFeature:         '',
    pricingModelFairness:      null,
    preferredFeeRange:         null,
    subscriptionWillingness:   null,
    pricingHardNo:             '',
    returnLikelihood:          null,
    topFeatureRequest:         '',
  });

  const set = (key) => (val) => setData(d => ({ ...d, [key]: val }));

  const canProceed = [
    data.onboardingEase !== null,
    data.hiringRequestEase !== null && data.candidateRelevance !== null,
    data.aiAnalysisConviction !== null && data.aiDecisionConfidence !== null,
    data.overallExperience !== null,
    data.pricingModelFairness !== null && data.preferredFeeRange !== null,
    data.returnLikelihood !== null,
  ];

  const handleSubmit = async () => {
    if (!confirmedStartup?.id) return;
    setLoading(true);
    try {
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startupId: confirmedStartup.id, ...data }),
      });
      const json = await res.json();

      if (json.success)      setScreen('submitted');
      else if (res.status === 409) setScreen('already_submitted');
    } catch (_) {}
    setLoading(false);
  };

  if (screen === 'submitted') {
    return (
      <div style={S.page}>
        <GoogleFonts />
        <Header />
        <div style={S.wrapper}>
          <div style={S.successWrap}>
            <div style={S.successIcon()}>✓</div>
            <div style={S.successTitle}>Thank you.</div>
            <p style={S.successSub}>
              Your feedback has been recorded. This genuinely helps us build a better product — we'll review every response carefully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'already_submitted') {
    return (
      <div style={S.page}>
        <GoogleFonts />
        <Header />
        <div style={S.wrapper}>
          <div style={{ ...S.successWrap, maxWidth: '480px', margin: '0 auto' }}>
            <div style={S.successIcon(C.lavender, 'rgba(104,94,252,0.12)', C.violet)}>✓</div>
            <div style={S.successTitle}>Already submitted</div>
            <p style={S.successSub}>
              Your startup has already submitted feedback. We have everything we need — thank you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <GoogleFonts />
      <Header />
      <div style={S.wrapper}>

        {screen === 'lookup' && (
          <LookupStep
            onConfirmed={(startup) => { setConfirmedStartup(startup); setScreen('form'); }}
            onAlreadySubmitted={() => setScreen('already_submitted')}
          />
        )}

        {screen === 'form' && (
          <>
            {/* Step progress */}
            <div style={S.stepIndicator}>
              {SECTIONS.map((_, i) => (
                <div key={i} style={S.stepDot(i === step, i < step)} />
              ))}
            </div>

            <div style={S.stepLabel}>{`${step + 1} of ${SECTIONS.length} — ${SECTIONS[step].label}`}</div>
            <div style={S.sectionTitle}>{SECTIONS[step].title}</div>
            <p style={S.sectionSub}>{SECTIONS[step].sub}</p>

            {/* ── Section 1: Onboarding ── */}
            {step === 0 && (
              <>
                <RatingField label="How easy was it to get started on JuniorForge?" value={data.onboardingEase} onChange={set('onboardingEase')} lowLabel="Very difficult" highLabel="Effortless" />
                <TextareaField label="Did anything frustrate you during onboarding?" sub="Optional — but specific examples help the most." value={data.onboardingFrustrations} onChange={set('onboardingFrustrations')} placeholder="e.g. the verification step was confusing, I didn't know what to expect next…" />
              </>
            )}

            {/* ── Section 2: Hiring ── */}
            {step === 1 && (
              <>
                <RatingField label="How easy was it to submit a hiring request?" value={data.hiringRequestEase} onChange={set('hiringRequestEase')} lowLabel="Very difficult" highLabel="Very easy" />
                <RatingField label="How relevant were the candidates matched to your request?" value={data.candidateRelevance} onChange={set('candidateRelevance')} lowLabel="Poor fit" highLabel="Strong fit" />
                <ChoiceField label="Did the AI candidate report help you make a decision?" options={['Yes — significantly', 'Somewhat — it helped but I still needed more', 'Not really — I relied on my own interview', "I haven't reviewed a report yet"]} value={data.aiReportHelpfulness} onChange={set('aiReportHelpfulness')} />
                <TextareaField label="What information was missing from the candidate profiles?" sub="Optional" value={data.missingProfileInfo} onChange={set('missingProfileInfo')} placeholder="e.g. portfolio links, GitHub activity, prior startup exposure…" />
              </>
            )}

            {/* ── Section 3: AI Analysis ── */}
            {step === 2 && (
              <>
                <RatingField label="How convincing was the AI analysis?" sub="Did the scores and tier classification feel trustworthy?" value={data.aiAnalysisConviction} onChange={set('aiAnalysisConviction')} lowLabel="Not convincing" highLabel="Very convincing" />
                <RatingField label="Did the AI report increase your decision confidence?" value={data.aiDecisionConfidence} onChange={set('aiDecisionConfidence')} lowLabel="Not at all" highLabel="Significantly" />
                <ChoiceField label="Which part of the AI analysis did you rely on most?" options={['Technical score / tier classification', 'Behavioral assessment (communication, ownership, resilience, etc.)', 'The written AI summary of the candidate', "None — I didn't find the analysis useful"]} value={data.aiAnalysisWeighting} onChange={set('aiAnalysisWeighting')} />
                <TextareaField label="Was there anything about the AI output you didn't trust?" sub="Optional" value={data.aiTrustIssues} onChange={set('aiTrustIssues')} placeholder="e.g. scores felt too high, behavioral ratings seemed arbitrary…" />
                <TextareaField label="How would you improve the AI analysis?" sub="Optional" value={data.aiImprovementSuggestions} onChange={set('aiImprovementSuggestions')} placeholder="e.g. show confidence intervals, explain the scoring criteria…" />
              </>
            )}

            {/* ── Section 4: Platform ── */}
            {step === 3 && (
              <>
                <RatingField label="Overall, how would you rate the platform experience?" value={data.overallExperience} onChange={set('overallExperience')} lowLabel="Poor" highLabel="Excellent" />
                <TextareaField label="What's the most broken or frustrating part of the platform?" sub="Don't hold back — we need to know what's actually broken." value={data.mostBrokenFeature} onChange={set('mostBrokenFeature')} placeholder="e.g. the dashboard is slow, I can't tell which candidates are available…" />
              </>
            )}

            {/* ── Section 5: Pricing ── */}
            {step === 4 && (
              <>
                <RatingField label="How fair does our current pricing model feel?" value={data.pricingModelFairness} onChange={set('pricingModelFairness')} lowLabel="Unfair" highLabel="Very fair" />
                <ChoiceField label="What fee range feels reasonable for a successful hire?" options={['Under $100', '$100 – $250', '$250 – $500', '$500 – $1,000', "A % of first month's salary (e.g. 10 – 15%)"]} value={data.preferredFeeRange} onChange={set('preferredFeeRange')} />
                <ChoiceField label="Would you consider a subscription plan?" options={['Yes — predictable costs work better for me', "Maybe — depends on how often I'm hiring", 'No — I only want to pay per hire']} value={data.subscriptionWillingness} onChange={set('subscriptionWillingness')} />
                <TextareaField label="Is there any pricing structure that would be a hard no?" sub="Optional" value={data.pricingHardNo} onChange={set('pricingHardNo')} placeholder="e.g. I'd never pay upfront without seeing candidates first…" />
              </>
            )}

            {/* ── Section 6: NPS ── */}
            {step === 5 && (
              <>
                <RatingField label="How likely are you to return to JuniorForge for your next hire?" value={data.returnLikelihood} onChange={set('returnLikelihood')} lowLabel="Very unlikely" highLabel="Definitely" />
                <TextareaField label="If you could add one thing to the platform, what would it be?" sub="This is the most valuable answer on this form." value={data.topFeatureRequest} onChange={set('topFeatureRequest')} placeholder="Be as specific as you can…" />
              </>
            )}

            {/* ── Navigation ── */}
            <div style={S.navRow}>
              {step > 0 ? (
                <button style={S.btnBack} onClick={() => setStep(s => s - 1)} type="button">← Back</button>
              ) : (
                <button style={S.btnBack} onClick={() => setScreen('lookup')} type="button">← Back</button>
              )}

              {step < SECTIONS.length - 1 ? (
                <button
                  style={S.btnPrimary(!canProceed[step])}
                  onClick={() => canProceed[step] && setStep(s => s + 1)}
                  type="button"
                >
                  Continue →
                </button>
              ) : (
                <button
                  style={loading || !canProceed[step] ? S.btnPrimary(true) : S.btnSubmit}
                  onClick={handleSubmit}
                  disabled={loading || !canProceed[step]}
                  type="button"
                >
                  {loading ? 'Submitting…' : 'Submit feedback'}
                </button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  return (
    <div style={S.header}>
      <span style={S.logo}>Junior<span style={S.logoAccent}>Forge</span></span>
      <span style={S.badge}>Founder Feedback</span>
    </div>
  );
}

// ─── Google fonts injector ────────────────────────────────────────────────────
function GoogleFonts() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
}