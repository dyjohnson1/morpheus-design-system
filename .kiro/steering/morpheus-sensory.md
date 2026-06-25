---
inclusion: manual
---

# Morpheus — Sound & Haptics (reference with #morpheus-sensory)

Restrained, warm, low-register — the audio/tactile equivalent of plum-on-blue. Off by default, user-toggleable, always with a non-sensory equivalent. Never the sole signal.

## Sound tokens (≤400ms, normalized, respect OS silent/DND)
sound-tap (confirm primary; short soft low) · sound-toggle (on/off; two-note) · sound-notify (warm single tone) · sound-success (gentle rising two-note) · sound-error (low soft non-alarming) · sound-agent-start (near-subliminal swell) · sound-agent-done (success motif, softer). Character: soft rounded synths; no bright digital blips.

## Haptic tokens (map to UIFeedbackGenerator / VibrationEffect / Web Vibration; honor OS settings; no sustained vibration)
haptic-light (selection / touch hover-equiv) · haptic-medium (confirm primary) · haptic-success (light-light) · haptic-warning (medium-light) · haptic-error (sharp single, not a long buzz) · haptic-agent-checkpoint (gentle medium to draw attention at HITL prompts). Always paired with visual.
