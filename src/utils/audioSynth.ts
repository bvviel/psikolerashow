/**
 * Web Audio API synthesizer for member sound samples and atmospheric sonic textures.
 * Uses native Web Audio API oscillators, distortion wave-shapers, noise buffers and biquad filters.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function makeDistortionCurve(amount = 50): Float32Array {
  const k = amount;
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;
  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

export function playMemberSample(soundType: 'vocal' | 'drums' | 'guitar' | 'bass' | 'synth') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (soundType === 'guitar') {
      // Drop A power chord with heavy tube distortion
      const fundamental = 55.0; // A1
      const freqs = [fundamental, fundamental * 1.5, fundamental * 2]; // A, E, A octave

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const dist = ctx.createWaveShaper();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        dist.curve = makeDistortionCurve(280) as unknown as Float32Array<ArrayBuffer>;
        dist.oversample = '4x';

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3200, now);
        filter.frequency.exponentialRampToValueAtTime(800, now + 0.8);

        gain.gain.setValueAtTime(0.18 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(dist);
        dist.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);
      });
    } else if (soundType === 'bass') {
      // Cindy's heavy fuzz bass sub-punch
      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const dist = ctx.createWaveShaper();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(41.2, now); // E0 Drop

      sub.type = 'sine';
      sub.frequency.setValueAtTime(41.2, now);

      dist.curve = makeDistortionCurve(160) as unknown as Float32Array<ArrayBuffer>;

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      osc.connect(dist);
      dist.connect(filter);
      sub.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      sub.start(now);
      osc.stop(now + 1.4);
      sub.stop(now + 1.4);
    } else if (soundType === 'drums') {
      // Eloy's heavy double kick + snare blast
      // Kick:
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.frequency.setValueAtTime(140, now);
      kickOsc.frequency.exponentialRampToValueAtTime(38, now + 0.12);
      kickGain.gain.setValueAtTime(0.6, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      kickOsc.connect(kickGain);
      kickGain.connect(ctx.destination);
      kickOsc.start(now);
      kickOsc.stop(now + 0.4);

      // Rapid double kick hit at now + 0.14
      const kickOsc2 = ctx.createOscillator();
      const kickGain2 = ctx.createGain();
      kickOsc2.frequency.setValueAtTime(130, now + 0.14);
      kickOsc2.frequency.exponentialRampToValueAtTime(35, now + 0.26);
      kickGain2.gain.setValueAtTime(0.5, now + 0.14);
      kickGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      kickOsc2.connect(kickGain2);
      kickGain2.connect(ctx.destination);
      kickOsc2.start(now + 0.14);
      kickOsc2.stop(now + 0.5);

      // Noise Snare crack:
      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(1000, now + 0.28);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now + 0.28);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now + 0.28);
      noise.stop(now + 0.55);
    } else if (soundType === 'synth') {
      // Alê's dark cyberpunk industrial atmospheric sweep
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(110, now);
      osc1.frequency.linearRampToValueAtTime(220, now + 1.2);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(111.5, now);
      osc2.frequency.linearRampToValueAtTime(222.5, now + 1.2);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 0.8);
      filter.Q.setValueAtTime(6, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.5);
      osc2.stop(now + 1.5);
    } else if (soundType === 'vocal') {
      // Caio's visceral guttural resonance echo
      const osc = ctx.createOscillator();
      const mod = ctx.createOscillator();
      const modGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(85, now);
      osc.frequency.exponentialRampToValueAtTime(65, now + 0.9);

      // FM growl modulation
      mod.type = 'square';
      mod.frequency.setValueAtTime(45, now);
      modGain.gain.setValueAtTime(180, now);

      mod.connect(modGain);
      modGain.connect(osc.frequency);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      mod.start(now);
      osc.start(now);
      mod.stop(now + 1.1);
      osc.stop(now + 1.1);
    }
  } catch (err) {
    console.warn('Audio playback not allowed before user interaction:', err);
  }
}
