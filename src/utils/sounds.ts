type SoundName = 'click' | 'hover' | 'whoosh' | 'pop' | 'toggle' | 'success';

const soundPaths: Record<SoundName, string> = {
  click: '/sounds/click.mp3',
  hover: '/sounds/hover.mp3',
  whoosh: '/sounds/whoosh.mp3',
  pop: '/sounds/pop.mp3',
  toggle: '/sounds/toggle.mp3',
  success: '/sounds/success.mp3',
};

const audioCache: Partial<Record<SoundName, HTMLAudioElement[]>> = {};
const POOL_SIZE = 4;

let globalVolume = 0.15;
let soundEnabled = true;

function getAudio(name: SoundName): HTMLAudioElement | null {
  if (!soundEnabled) return null;

  if (!audioCache[name]) {
    audioCache[name] = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio(soundPaths[name]);
      audio.preload = 'auto';
      audio.volume = globalVolume;
      audioCache[name]!.push(audio);
    }
  }

  const pool = audioCache[name]!;
  const available = pool.find((a) => a.paused || a.ended);

  if (available) {
    available.volume = globalVolume;
    available.currentTime = 0;
    return available;
  }

  // All busy — clone one
  const clone = new Audio(soundPaths[name]);
  clone.volume = globalVolume;
  pool.push(clone);
  return clone;
}

export function playSound(name: SoundName) {
  const audio = getAudio(name);
  if (audio) {
    void audio.play().catch(() => {
      // Browser blocked autoplay — ignore
    });
  }
}

export function setVolume(vol: number) {
  globalVolume = Math.max(0, Math.min(1, vol));
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

// Preload all sounds
export function preloadSounds() {
  (Object.keys(soundPaths) as SoundName[]).forEach((name) => {
    getAudio(name);
  });
}