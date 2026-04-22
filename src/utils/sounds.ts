type SoundName = 'click' | 'hover' | 'whoosh' | 'pop' | 'toggle' | 'success';

// Получаем базовый путь (автоматически '/magazovdinar/' на GitHub)
const baseUrl = import.meta.env.BASE_URL;

const soundPaths: Record<SoundName, string> = {
  click: `${baseUrl}sounds/click.mp3`,
  hover: `${baseUrl}sounds/hover.mp3`,
  whoosh: `${baseUrl}sounds/whoosh.mp3`,
  pop: `${baseUrl}sounds/pop.mp3`,
  toggle: `${baseUrl}sounds/toggle.mp3`,
  success: `${baseUrl}sounds/success.mp3`,
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
