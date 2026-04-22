type SoundName = 'click' | 'hover' | 'whoosh' | 'pop' | 'toggle' | 'success';

// Жестко прописанный путь. Это 100% должно работать на GitHub Pages
const baseUrl = '/magazovdinar/sounds/';

const soundPaths: Record<SoundName, string> = {
  click: `${baseUrl}click.mp3`,
  hover: `${baseUrl}hover.mp3`,
  whoosh: `${baseUrl}whoosh.mp3`,
  pop: `${baseUrl}pop.mp3`,
  toggle: `${baseUrl}toggle.mp3`,
  success: `${baseUrl}success.mp3`,
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

  const clone = new Audio(soundPaths[name]);
  clone.volume = globalVolume;
  pool.push(clone);
  return clone;
}

export function playSound(name: SoundName) {
  const audio = getAudio(name);
  if (audio) {
    void audio.play().catch(() => {}); 
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

export function preloadSounds() {
  (Object.keys(soundPaths) as SoundName[]).forEach((name) => {
    getAudio(name);
  });
}
