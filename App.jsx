import React, { useMemo, useState } from "react";

const VALUE_OPTIONS = [
  {
    id: "courage",
    label: "Courage",
    description: "Between Avoidance/Fear and Recklessness",
    value: "Courage",
    lowExtreme: "Avoidance/Fear",
    highExtreme: "Recklessness",
  },
  {
    id: "temperance",
    label: "Temperance",
    description: "Between Self-Denial and Impulsivity",
    value: "Temperance",
    lowExtreme: "Self-Denial",
    highExtreme: "Impulsivity",
  },
  {
    id: "patience",
    label: "Patience",
    description: "Between Passive Resignation and Hostile Urgency",
    value: "Patience",
    lowExtreme: "Passive Resignation",
    highExtreme: "Hostile Urgency",
  },
  {
    id: "authenticity",
    label: "Authenticity",
    description: "Between Social Masking and Over-sharing/Tactlessness",
    value: "Authenticity",
    lowExtreme: "Social Masking",
    highExtreme: "Over-sharing/Tactlessness",
  },
  {
    id: "humility",
    label: "Humility",
    description: "Between Self-Deprecation and Arrogance",
    value: "Humility",
    lowExtreme: "Self-Deprecation",
    highExtreme: "Arrogance",
  },
  {
    id: "diligence",
    label: "Diligence",
    description: "Between Sloth/Procrastination and Burnout/Perfectionism",
    value: "Diligence",
    lowExtreme: "Sloth/Procrastination",
    highExtreme: "Burnout/Perfectionism",
  },
  {
    id: "compassion",
    label: "Compassion",
    description: "Between Emotional Coldness and Enmeshment/Codependency",
    value: "Compassion",
    lowExtreme: "Emotional Coldness",
    highExtreme: "Enmeshment/Codependency",
  },
  {
    id: "justice",
    label: "Justice",
    description: "Between Apathy and Retribution/Rigidity",
    value: "Justice",
    lowExtreme: "Apathy",
    highExtreme: "Retribution/Rigidity",
  },
  {
    id: "prudence",
    label: "Prudence",
    description: "Between Indecision and Impulsivity",
    value: "Prudence",
    lowExtreme: "Indecision",
    highExtreme: "Impulsivity",
  },
  {
    id: "curiosity",
    label: "Curiosity",
    description: "Between Judgmentalism and Indifference",
    value: "Curiosity",
    lowExtreme: "Judgmentalism",
    highExtreme: "Indifference",
  },
];

const CUSTOM_OPTION = "custom";

const createInitialSelection = (slotNumber) => ({
  optionId: slotNumber === 1 ? VALUE_OPTIONS[0].id : VALUE_OPTIONS[1].id,
  customValue: "",
  customLowExtreme: "",
  customHighExtreme: "",
  middlePathAction: "",
});

function getOptionById(optionId) {
  return VALUE_OPTIONS.find((option) => option.id === optionId);
}

// This helper turns either a preset virtue or a user-authored virtue into one
// normalized shape. That keeps the rest of the UI focused on practice rather
// than on whether the source was preset or custom.
function resolveSelection(selection) {
  if (selection.optionId === CUSTOM_OPTION) {
    return {
      value: selection.customValue.trim() || "Custom Value",
      lowExtreme: selection.customLowExtreme.trim() || "Deficiency",
      highExtreme: selection.customHighExtreme.trim() || "Excess",
      description: "User-defined golden mean",
      isCustom: true,
    };
  }

  const preset = getOptionById(selection.optionId);

  return {
    value: preset?.value || "Value",
    lowExtreme: preset?.lowExtreme || "Deficiency",
    highExtreme: preset?.highExtreme || "Excess",
    description: preset?.description || "",
    isCustom: false,
  };
}

function App() {
  const [selections, setSelections] = useState([
    createInitialSelection(1),
    createInitialSelection(2),
  ]);
  const [expandedCards, setExpandedCards] = useState([true, false]);
  const [observerMode, setObserverMode] = useState("hook");
  const [hookThought, setHookThought] = useState("");
  const [observerReality, setObserverReality] = useState("");
  const [objectiveData, setObjectiveData] = useState("");
  const [hookReality, setHookReality] = useState("");

  const resolvedSelections = useMemo(
    () => selections.map((selection) => resolveSelection(selection)),
    [selections]
  );

  const updateSelection = (index, field, nextValue) => {
    setSelections((currentSelections) =>
      currentSelections.map((selection, selectionIndex) =>
        selectionIndex === index
          ? { ...selection, [field]: nextValue }
          : selection
      )
    );
  };

  const toggleCard = (index) => {
    setExpandedCards((current) =>
      current.map((isExpanded, currentIndex) =>
        currentIndex === index ? !isExpanded : isExpanded
      )
    );
  };

  // Aristotelian framing: each value is treated as a practical mean between
  // two common extremes. ACT framing: the user commits to an observable action
  // instead of trying to eliminate discomfort before living the value.
  const buildCommitmentSummary = () =>
    resolvedSelections
      .map((selection, index) => {
        const action = selections[index].middlePathAction.trim();
        return action ? `${selection.value}: ${action}` : null;
      })
      .filter(Boolean)
      .join(" | ");

  const commitmentSummary = buildCommitmentSummary();

  return (
    <div className="min-h-screen bg-paper text-slate-deep">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <header className="border-b border-stone-muted/50 pb-5 sm:pb-6">
          <p className="font-sans text-xs uppercase tracking-[0.24em] text-sage sm:text-sm">
            Wise Realism
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-display text-[2.2rem] leading-tight text-slate-deep sm:text-5xl">
                The Wise Compass
              </h1>
              <p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-slate-ink sm:text-base sm:leading-7">
                A structured daily practice for choosing values, locating the
                middle path, and relating to difficult thoughts with objective
                clarity.
              </p>
            </div>

            <div className="rounded-2xl border border-sage/30 bg-white/70 p-3 shadow-soft sm:p-4">
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-slate-ink">
                Today&apos;s commitments
              </p>
              <p className="mt-2 max-w-md font-sans text-sm leading-5 text-slate-deep sm:leading-6">
                {commitmentSummary ||
                  "Choose two values and define one committed middle-path action for each."}
              </p>
            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-6 py-6 sm:gap-8 sm:py-8 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6 sm:space-y-8">
            <SectionIntro
              eyebrow="Morning practice"
              title="Choose two values for today"
              body="Each value is framed as a mean between two distortions. Pick two preset virtues or define your own."
            />

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              {selections.map((selection, index) => (
                <ValueCard
                  key={`value-slot-${index}`}
                  selection={selection}
                  resolvedSelection={resolvedSelections[index]}
                  slotNumber={index + 1}
                  isExpanded={expandedCards[index]}
                  onToggle={() => toggleCard(index)}
                  onUpdate={(field, value) =>
                    updateSelection(index, field, value)
                  }
                />
              ))}
            </div>

            <SectionIntro
              eyebrow="Midday reset"
              title="The Hook and The Observer"
              body="Use this toggle when a difficult thought shows up. First name the hook, then step into an observing stance grounded in facts."
            />

            <div className="rounded-[1.75rem] border border-stone-muted/60 bg-white/75 p-4 shadow-soft sm:rounded-[2rem] sm:p-6">
              <div className="flex flex-col gap-4 border-b border-stone-muted/40 pb-4 sm:pb-5">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.22em] text-slate-ink">
                    Perspective switch
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-slate-deep sm:text-3xl">
                    {observerMode === "hook" ? "The Hook" : "The Observer"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setObserverMode((current) =>
                      current === "hook" ? "observer" : "hook"
                    )
                  }
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-sage/50 bg-sage px-5 py-3 font-sans text-sm font-medium text-paper transition hover:bg-sage-deep"
                >
                  Switch to{" "}
                  {observerMode === "hook" ? "The Observer" : "The Hook"}
                </button>
              </div>

              <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-2">
                <PromptPanel
                  title="The Hook"
                  helper="Name the difficult thought exactly as it appears, without arguing with it."
                  prompt="What thought is pulling for avoidance, control, or fusion right now?"
                  value={hookThought}
                  onChange={setHookThought}
                  placeholder="Example: If I speak honestly, this conversation will go badly."
                  isActive={observerMode === "hook"}
                />

                <PromptPanel
                  title="The Observer"
                  helper="Shift from the story in your head to what can be known directly."
                  prompt="What objective reality can you observe right now, even while the thought is present?"
                  value={observerReality}
                  onChange={setObserverReality}
                  placeholder="Example: My heart rate is elevated, the thought is present, and I can still choose one concrete next step."
                  isActive={observerMode === "observer"}
                />
              </div>
            </div>
          </section>

          <aside className="space-y-6 sm:space-y-8">
            <SectionIntro
              eyebrow="Evening reflection"
              title="ACT reflection log"
              body="End the day by separating behavior from internal noise. The goal is honest contact with reality, not a perfect score."
            />

            <div className="rounded-[1.75rem] border border-stone-muted/60 bg-white/80 p-4 shadow-soft sm:rounded-[2rem] sm:p-6">
              <ReflectionField
                label="Objective Data"
                prompt="What actually happened when you took the action?"
                value={objectiveData}
                onChange={setObjectiveData}
                placeholder="Record observable events, responses, and outcomes."
              />

              <ReflectionField
                label="The Reality of the Hook"
                prompt="Did the internal 'Hook' prevent action, or was it simply present during the action?"
                value={hookReality}
                onChange={setHookReality}
                placeholder="Describe whether the thought stopped behavior or merely accompanied it."
              />
            </div>

            <div className="rounded-[1.75rem] border border-slate-muted/60 bg-slate-panel p-4 text-paper shadow-soft sm:rounded-[2rem] sm:p-6">
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-stone-light">
                Clinical note
              </p>
              <h3 className="mt-3 font-display text-xl sm:text-2xl">
                Reality over reassurance
              </h3>
              <p className="mt-3 font-sans text-sm leading-6 text-stone-light sm:leading-7">
                This tool is designed to support defusion and committed action.
                It does not ask whether the day felt easy. It asks whether your
                behavior aligned with the chosen mean while difficult internal
                content was present.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

function SectionIntro({ eyebrow, title, body }) {
  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-[0.22em] text-sage">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-[1.7rem] text-slate-deep sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl font-sans text-sm leading-6 text-slate-ink sm:text-base sm:leading-7">
        {body}
      </p>
    </div>
  );
}

function ValueCard({
  selection,
  resolvedSelection,
  slotNumber,
  isExpanded,
  onToggle,
  onUpdate,
}) {
  return (
    <article className="rounded-[1.75rem] border border-stone-muted/60 bg-white/80 p-4 shadow-soft sm:rounded-[2rem] sm:p-6">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div className="min-w-0">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-slate-ink">
            Value {slotNumber}
          </p>
          <h3 className="mt-2 font-display text-[1.55rem] text-slate-deep sm:text-2xl">
            {resolvedSelection.value}
          </h3>
          <p className="mt-2 font-sans text-sm leading-5 text-slate-ink">
            {resolvedSelection.lowExtreme} to {resolvedSelection.highExtreme}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden rounded-full border border-sage/30 bg-sage-pale px-3 py-1 text-[11px] font-sans uppercase tracking-[0.18em] text-sage-deep sm:block">
            Golden mean
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-muted/70 bg-paper text-xl text-slate-deep">
            {isExpanded ? "−" : "+"}
          </div>
        </div>
      </button>

      {!isExpanded ? (
        <p className="mt-4 font-sans text-sm leading-6 text-slate-ink">
          {selection.middlePathAction.trim() ||
            "Tap to choose the pair and define today’s committed middle-path action."}
        </p>
      ) : null}

      {isExpanded ? (
        <div className="mt-5 border-t border-stone-muted/40 pt-5 sm:mt-6 sm:pt-6">
          <div>
            <label className="font-sans text-sm font-medium text-slate-deep">
              Select a value pair
            </label>
            <select
              value={selection.optionId}
              onChange={(event) => onUpdate("optionId", event.target.value)}
              className="mt-2 min-h-12 w-full rounded-2xl border border-stone-muted/70 bg-paper px-4 py-3 font-sans text-sm text-slate-deep outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
            >
              {VALUE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}: {option.description}
                </option>
              ))}
              <option value={CUSTOM_OPTION}>Other / Custom</option>
            </select>
          </div>

          {selection.optionId === CUSTOM_OPTION ? (
            <div className="mt-5 grid gap-4">
              <TextInput
                label="Custom value"
                value={selection.customValue}
                onChange={(event) => onUpdate("customValue", event.target.value)}
                placeholder="Example: Steady Leadership"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput
                  label="Low extreme"
                  value={selection.customLowExtreme}
                  onChange={(event) =>
                    onUpdate("customLowExtreme", event.target.value)
                  }
                  placeholder="Example: Avoidant silence"
                />
                <TextInput
                  label="High extreme"
                  value={selection.customHighExtreme}
                  onChange={(event) =>
                    onUpdate("customHighExtreme", event.target.value)
                  }
                  placeholder="Example: Dominating control"
                />
              </div>
            </div>
          ) : null}

          <div className="mt-5 rounded-2xl border border-stone-muted/50 bg-paper px-4 py-4 sm:mt-6 sm:py-5">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-slate-ink">
              Mean alignment
            </p>
            <div className="mt-3 grid gap-2 sm:gap-3 sm:grid-cols-3">
              <ExtremePill
                tone="stone"
                label="Deficiency"
                value={resolvedSelection.lowExtreme}
              />
              <ExtremePill
                tone="sage"
                label="Value"
                value={resolvedSelection.value}
              />
              <ExtremePill
                tone="stone"
                label="Excess"
                value={resolvedSelection.highExtreme}
              />
            </div>

            <label className="mt-5 block font-sans text-sm font-medium text-slate-deep">
              What is the objective, committed action that represents the
              &apos;Middle Path&apos; for this value today?
            </label>
            <textarea
              value={selection.middlePathAction}
              onChange={(event) =>
                onUpdate("middlePathAction", event.target.value)
              }
              rows={5}
              className="mt-2 w-full rounded-2xl border border-stone-muted/70 bg-white px-4 py-3 font-sans text-sm leading-6 text-slate-deep outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
              placeholder="Define one observable action you can take even if difficult thoughts or feelings show up."
            />
          </div>
        </div>
      ) : null}
    </article>
  );
}

function TextInput({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="font-sans text-sm font-medium text-slate-deep">
        {label}
      </span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 min-h-12 w-full rounded-2xl border border-stone-muted/70 bg-paper px-4 py-3 font-sans text-sm text-slate-deep outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
      />
    </label>
  );
}

function ExtremePill({ tone, label, value }) {
  const toneStyles =
    tone === "sage"
      ? "border-sage/40 bg-sage-pale text-sage-deep"
      : "border-stone-muted/60 bg-white text-slate-ink";

  return (
    <div className={`rounded-2xl border px-4 py-3 ${toneStyles}`}>
      <p className="font-sans text-xs uppercase tracking-[0.18em]">{label}</p>
      <p className="mt-2 font-sans text-sm font-medium">{value}</p>
    </div>
  );
}

function PromptPanel({
  title,
  helper,
  prompt,
  value,
  onChange,
  placeholder,
  isActive,
}) {
  return (
    <div
      className={`rounded-[1.75rem] border p-5 transition ${
        isActive
          ? "border-sage/50 bg-sage-pale/70 shadow-soft"
          : "border-stone-muted/50 bg-paper"
      }`}
    >
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-slate-ink">
        {title}
      </p>
      <p className="mt-2 font-sans text-sm leading-6 text-slate-ink">
        {helper}
      </p>
      <label className="mt-4 block font-sans text-sm font-medium text-slate-deep">
        {prompt}
      </label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={6}
        className="mt-2 w-full rounded-2xl border border-stone-muted/70 bg-white px-4 py-3 font-sans text-sm leading-6 text-slate-deep outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
        placeholder={placeholder}
      />
    </div>
  );
}

function ReflectionField({ label, prompt, value, onChange, placeholder }) {
  return (
    <div className="mt-5 first:mt-0 sm:mt-6">
      <p className="font-sans text-xs uppercase tracking-[0.22em] text-slate-ink">
        {label}
      </p>
      <label className="mt-3 block font-sans text-sm font-medium text-slate-deep">
        {prompt}
      </label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={6}
        className="mt-2 w-full rounded-2xl border border-stone-muted/70 bg-paper px-4 py-3 font-sans text-sm leading-6 text-slate-deep outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
        placeholder={placeholder}
      />
    </div>
  );
}

export default App;
