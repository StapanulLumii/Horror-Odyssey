import type { Mood } from "../engine";

type Voice = {
  stop: () => void;
};

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private currentVoice: Voice | null = null;
  private currentMood: Mood | null = null;
  private muted = false;

  async resume() {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.4;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(
        muted ? 0 : 0.4,
        this.ctx.currentTime + 0.2,
      );
    }
  }

  isMuted() {
    return this.muted;
  }

  playMood(mood: Mood | undefined) {
    if (!this.ctx || !this.master) return;
    if (this.currentMood === mood) return;
    this.stopCurrent();
    this.currentMood = mood ?? null;
    if (!mood) return;

    switch (mood) {
      case "rain":
        this.currentVoice = this.rainLoop();
        break;
      case "fog":
        this.currentVoice = this.drone(55, 0.18);
        break;
      case "candle":
        this.currentVoice = this.drone(82, 0.12, true);
        break;
      case "blood":
        this.currentVoice = this.heartbeat();
        break;
      case "ravens":
        this.currentVoice = this.drone(110, 0.14);
        break;
      case "void":
        this.currentVoice = this.voidWhisper();
        break;
    }
  }

  private stopCurrent() {
    if (this.currentVoice) {
      this.currentVoice.stop();
      this.currentVoice = null;
    }
  }

  playChoiceClick() {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.08);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain).connect(this.master);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  playDeathSting() {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 1.6);
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
    osc.connect(gain).connect(this.master);
    osc.start(t);
    osc.stop(t + 1.9);
  }

  private drone(freq: number, gainLevel: number, shimmer = false): Voice {
    const ctx = this.ctx!;
    const master = this.master!;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();
    osc1.type = "sine";
    osc2.type = "triangle";
    osc1.frequency.value = freq;
    osc2.frequency.value = freq * 1.498;
    lfo.type = "sine";
    lfo.frequency.value = shimmer ? 5 : 0.15;
    lfoGain.gain.value = shimmer ? 0.05 : gainLevel * 0.4;
    lfo.connect(lfoGain).connect(gain.gain);
    gain.gain.value = gainLevel;
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(master);
    osc1.start();
    osc2.start();
    lfo.start();
    return {
      stop: () => {
        const now = ctx.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.linearRampToValueAtTime(0, now + 0.6);
        osc1.stop(now + 0.7);
        osc2.stop(now + 0.7);
        lfo.stop(now + 0.7);
      },
    };
  }

  private rainLoop(): Voice {
    const ctx = this.ctx!;
    const master = this.master!;
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.6;
    }
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.loop = true;
    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 1200;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 5000;
    const gain = ctx.createGain();
    gain.gain.value = 0.22;
    src.connect(highpass).connect(lowpass).connect(gain).connect(master);
    src.start();
    return {
      stop: () => {
        const now = ctx.currentTime;
        gain.gain.linearRampToValueAtTime(0, now + 0.5);
        src.stop(now + 0.6);
      },
    };
  }

  private heartbeat(): Voice {
    const ctx = this.ctx!;
    const master = this.master!;
    const gain = ctx.createGain();
    gain.gain.value = 1;
    gain.connect(master);
    let stopped = false;
    const beat = () => {
      if (stopped || !this.ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(60, t);
      osc.frequency.exponentialRampToValueAtTime(30, t + 0.15);
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.55, t + 0.02);
      env.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(env).connect(gain);
      osc.start(t);
      osc.stop(t + 0.3);

      const osc2 = ctx.createOscillator();
      const env2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(55, t + 0.22);
      osc2.frequency.exponentialRampToValueAtTime(28, t + 0.35);
      env2.gain.setValueAtTime(0, t + 0.22);
      env2.gain.linearRampToValueAtTime(0.4, t + 0.24);
      env2.gain.exponentialRampToValueAtTime(0.001, t + 0.42);
      osc2.connect(env2).connect(gain);
      osc2.start(t + 0.22);
      osc2.stop(t + 0.45);

      setTimeout(beat, 1100);
    };
    beat();
    return {
      stop: () => {
        stopped = true;
        const now = ctx.currentTime;
        gain.gain.linearRampToValueAtTime(0, now + 0.4);
      },
    };
  }

  private voidWhisper(): Voice {
    const ctx = this.ctx!;
    const master = this.master!;
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.loop = true;
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 800;
    bandpass.Q.value = 0.8;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.25;
    lfoGain.gain.value = 400;
    lfo.connect(lfoGain).connect(bandpass.frequency);
    const gain = ctx.createGain();
    gain.gain.value = 0.16;
    src.connect(bandpass).connect(gain).connect(master);
    src.start();
    lfo.start();
    return {
      stop: () => {
        const now = ctx.currentTime;
        gain.gain.linearRampToValueAtTime(0, now + 0.5);
        src.stop(now + 0.6);
        lfo.stop(now + 0.6);
      },
    };
  }
}

export const audioEngine = new AudioEngine();
