import React, { useState, useEffect } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { COMPETITION_SLIDES } from '../../data/competitionSlides';
import { Turbine3DViewer } from '../turbine3d/Turbine3DViewer';
import { soundFx } from '../../utils/audio';
import { launchConfetti } from '../../utils/confetti';
import {
  Trophy,
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
  Printer
} from 'lucide-react';

export const CompetitionModeModal: React.FC = () => {
  const { isCompetitionModeOpen, setIsCompetitionModeOpen, telemetry } = useTelemetry();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showPresenterNotes, setShowPresenterNotes] = useState(false);

  const currentSlide = COMPETITION_SLIDES[currentStepIndex];

  // Auto-play timer for presentation sequence
  useEffect(() => {
    if (!isCompetitionModeOpen) return;

    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompetitionModeOpen]);

  // Slide transition timer when auto-play is active
  useEffect(() => {
    if (!isCompetitionModeOpen || !isAutoPlay) return;

    const slideTimer = setTimeout(() => {
      handleNext();
    }, (currentSlide.targetDurationSec || 35) * 1000);

    return () => clearTimeout(slideTimer);
  }, [isCompetitionModeOpen, isAutoPlay, currentStepIndex, currentSlide]);

  // Trigger confetti when reaching final slide (Future Vision)
  useEffect(() => {
    if (isCompetitionModeOpen && currentStepIndex === COMPETITION_SLIDES.length - 1) {
      launchConfetti();
      soundFx.playOptimalFound();
    }
  }, [isCompetitionModeOpen, currentStepIndex]);

  if (!isCompetitionModeOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleNext = () => {
    soundFx.playClick();
    setCurrentStepIndex((prev) => (prev + 1) % COMPETITION_SLIDES.length);
  };

  const handlePrev = () => {
    soundFx.playClick();
    setCurrentStepIndex((prev) => (prev - 1 + COMPETITION_SLIDES.length) % COMPETITION_SLIDES.length);
  };

  const handlePrintRubric = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-space-950/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 overflow-y-auto">
      {/* Top Presentation Bar: Step progress, timer, controls, close */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-glow-purple">
            <Trophy className="w-5 h-5 text-purple-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                5-Minute Judge Showcase Sequence
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-space-850 text-slate-300 border border-slate-700">
                Slide {currentSlide.step} of {COMPETITION_SLIDES.length}
              </span>
            </div>
            <h1 className="text-lg font-mono font-bold text-white mt-0.5">
              {currentSlide.title}
            </h1>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          {/* Elapsed Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-900 border border-slate-800 font-mono text-xs text-white">
            <Clock className="w-3.5 h-3.5 text-wind-cyan" />
            <span>Time: <strong>{formatTime(elapsedSeconds)}</strong> / 5:00</span>
          </div>

          {/* Autoplay / Pause */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`p-2 rounded-lg border font-mono text-xs transition ${
              isAutoPlay
                ? 'bg-purple-600/20 text-purple-300 border-purple-500/40'
                : 'bg-space-900 text-slate-400 border-slate-800'
            }`}
            title={isAutoPlay ? 'Pause Auto-Advance' : 'Resume Auto-Advance'}
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Presenter Notes Toggle */}
          <button
            onClick={() => setShowPresenterNotes(!showPresenterNotes)}
            className={`px-3 py-1.5 rounded-lg border font-mono text-xs transition ${
              showPresenterNotes
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                : 'bg-space-900 text-slate-400 border-slate-800'
            }`}
          >
            {showPresenterNotes ? 'Hide Speaker Notes' : 'Speaker Notes'}
          </button>

          {/* Print Rubric / One-Pager */}
          <button
            onClick={handlePrintRubric}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-xs transition"
            title="Print Judge One-Pager"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print One-Pager</span>
          </button>

          {/* Close */}
          <button
            onClick={() => setIsCompetitionModeOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-space-900 border border-slate-800 transition"
            title="Exit Competition Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide Navigation Dots / Timeline Bar */}
      <div className="grid grid-cols-8 gap-2 py-3">
        {COMPETITION_SLIDES.map((slide, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;
          return (
            <button
              key={slide.id}
              onClick={() => {
                soundFx.playClick();
                setCurrentStepIndex(idx);
              }}
              className={`h-2 rounded-full transition-all ${
                isActive
                  ? 'bg-purple-400 shadow-glow-purple'
                  : isPassed
                  ? 'bg-purple-800'
                  : 'bg-slate-800'
              }`}
              title={`${slide.step}. ${slide.title}`}
            />
          );
        })}
      </div>

      {/* Main Slide Content Presentation Area */}
      <div className="my-auto py-4 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Visual Demonstration Graphic or 3D viewer */}
        <div className="lg:col-span-6 bg-space-900/80 rounded-2xl p-5 border border-purple-500/20 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[360px]">
          {currentSlide.id === 'solution' || currentSlide.id === 'prototype' ? (
            <div className="w-full">
              <Turbine3DViewer height="320px" showControls={false} />
              <div className="mt-3 flex items-center justify-between font-mono text-xs text-slate-300 px-2">
                <span>Rotor Speed: <strong className="text-emerald-400">{telemetry.rpm} RPM</strong></span>
                <span>Power: <strong className="text-amber-400">{telemetry.power} W</strong></span>
                <span>Cut-in: <strong className="text-wind-cyan">1.48 m/s</strong></span>
              </div>
            </div>
          ) : currentSlide.id === 'ai-optimizer' ? (
            <div className="p-4 bg-space-950 rounded-xl border border-slate-800 text-center font-mono">
              <span className="text-xs text-purple-400 block mb-2 font-bold uppercase">
                AI Building Siting Model (Dhaka)
              </span>
              <div className="text-5xl font-extrabold text-emerald-400 my-2">92%</div>
              <span className="text-sm text-white font-bold block">
                Optimal: South-East Rooftop Parapet
              </span>
              <p className="text-xs text-slate-400 mt-2 font-sans">
                Bernoulli channel compression maximizes rotational torque along the windward lip.
              </p>
            </div>
          ) : currentSlide.id === 'air-intel' ? (
            <div className="p-4 bg-space-950 rounded-xl border border-slate-800 text-center font-mono">
              <span className="text-xs text-wind-cyan block mb-1 uppercase font-bold">
                Self-Powered Environmental Sentinel
              </span>
              <div className="text-4xl font-extrabold text-white my-2">
                {telemetry.pm25} <span className="text-sm text-slate-400">µg/m³ PM2.5</span>
              </div>
              <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
                Wind Dispersion Correlation Active
              </span>
            </div>
          ) : (
            <div className="p-6 text-center font-mono space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-sans">
                {currentSlide.subtitle}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto font-sans leading-relaxed">
                Focused sustainable technology adaptation specifically calibrated for Bangladesh’s urban energy transition.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Key Takeaways for Judges & Narrative */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block font-bold">
              STEP {currentSlide.step}: CORE TAKEAWAY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-tight font-sans">
              {currentSlide.subtitle}
            </h2>
          </div>

          <div className="space-y-3">
            {currentSlide.judgeKeyTakeaways.map((point, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Speaker Notes Drawer */}
          {showPresenterNotes && (
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs text-purple-200 font-mono space-y-1">
              <div className="flex items-center gap-1.5 font-bold uppercase text-[10px] text-purple-300">
                <FileText className="w-3.5 h-3.5" />
                <span>Presenter Speech Cue:</span>
              </div>
              <p className="font-sans text-slate-200 leading-relaxed">
                {currentSlide.presenterNotes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Strip: Prev, Next, Exit */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-space-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-xs font-bold transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PREVIOUS STEP</span>
        </button>

        <div className="text-xs font-mono text-slate-400">
          Slide <strong className="text-white">{currentSlide.step}</strong> of {COMPETITION_SLIDES.length}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold transition shadow-glow-purple"
        >
          <span>{currentStepIndex === COMPETITION_SLIDES.length - 1 ? 'RESTART DEMO' : 'NEXT STEP'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
