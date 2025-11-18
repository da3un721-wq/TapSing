
const HIT_MS     = 180;   
const AUTO_MISS  = 220;   
const SPEED_PX_S = 260;   
const PASS_SCORE = 70;    
const COUNTDOWN_START = 3;


const ROUND1 = [
  {
    phrase: "inst",
    syllables: ["🎵"], 
    times: [
      1136, 1402, 2002, 2645, 2975, 3625, 4632, 5557, 6216, 6500, 7191,
      7774, 8124, 8723, 9719, 9875, 10684, 11315, 11464, 11930, 12502,
      12917, 13225, 13852, 14027, 14484, 14968, 15419, 15749, 16414,
      16548, 17075, 17574, 18009, 18335, 18911, 19082, 19592, 20076,
      20224, 20540, 20889, 21175, 21474
    ]
  }
];

const ROUND2 = [
  { phrase: "매일이", syllables: ["매","일","이"], times: [21860, 22159, 22466] },
  { phrase: "좋을", syllables: ["좋","을"], times: [22815, 23129] },
  { phrase: "순", syllables: ["순"], times: [23434] },
  { phrase: "없어도", syllables: ["없","어","도"], times: [23728, 24096, 24583] },
  { phrase: "가끔은", syllables: ["가","끔","은"], times: [26858, 27242, 27551] },
  { phrase: "기대해", syllables: ["기","대","해"], times: [27733, 28101, 28417] },
  { phrase: "실망에", syllables: ["실","망","에"], times: [28858, 29215, 29533] },
  { phrase: "빠져", syllables: ["빠","져"], times: [29692, 29999] },
  { phrase: "버리지", syllables: ["버","리","지"], times: [30316, 30958, 31109] },
  { phrase: "난", syllables: ["난"], times: [31259] },
  { phrase: "아직도", syllables: ["아","직","도"], times: [32027, 32375, 32680] },
  { phrase: "자라는", syllables: ["자","라","는"], times: [32994, 33358, 33667] },
  { phrase: "중일까", syllables: ["중","일","까"], times: [33960, 34293, 34787] },
  { phrase: "멈춘", syllables: ["멈","춘"], times: [37142, 37477] },
  { phrase: "것보다야", syllables: ["것","보","다","야"], times: [37775, 37935, 38301, 38619] },
  { phrase: "훨씬", syllables: ["훨","씬"], times: [39045, 39392] },
  { phrase: "기뻐할", syllables: ["기","뻐","할"], times: [39697, 39886, 40167] },
  { phrase: "일이지만", syllables: ["일","이","지","만"], times: [40514, 41162, 41332, 41501] },
];

const ROUND3 = [
  { phrase: "아무리", syllables: ["아","무","리"], times: [41985, 42133, 42468] },
  { phrase: "마음을", syllables: ["마","음","을"], times: [42859, 43042, 43416] },
  { phrase: "먹어봐도", syllables: ["먹","어","봐","도"], times: [43833, 44193, 44518, 44964] },
  { phrase: "왠지", syllables: ["왠","지"], times: [45677, 46343] },
  { phrase: "어디서", syllables: ["어","디","서"], times: [46982, 47173, 47533] },
  { phrase: "잘못된", syllables: ["잘","못","된"], times: [47953, 48149, 48485] },
  { phrase: "건지", syllables: ["건","지"], times: [48908, 49251] },
  { phrase: "막막하기만", syllables: ["막","막","하","기","만"], times: [49900, 50223, 50526, 50852, 51165] },
  { phrase: "해", syllables: ["해"], times: [51473] },
  { phrase: "어쩌면", syllables: ["어","쩌","면"], times: [52073, 52268, 52607] },
  { phrase: "보여진", syllables: ["보","여","진"], times: [53035, 53218, 53618] },
  { phrase: "내", syllables: ["내"], times: [54032] },
  { phrase: "모습이", syllables: ["모","습","이"], times: [54367, 54697, 55134] },
  { phrase: "전부는", syllables: ["전","부","는"], times: [56233, 56577, 56876] },
  { phrase: "아닐까", syllables: ["아","닐","까"], times: [57552, 57891, 58200] },
  { phrase: "두려워", syllables: ["두","려","워"], times: [58801, 59099, 59499] },
  { phrase: "수면에", syllables: ["수","면","에"], times: [60073, 60414, 60733] },
  { phrase: "오를", syllables: ["오","를"], times: [61064, 61383] },
  { phrase: "때", syllables: ["때"], times: [61699] },
];

const ROUND4 = [
  { phrase: "별일", syllables: ["별","일"], times: [62617, 62941] },
  { phrase: "아닐", syllables: ["아","닐"], times: [63256, 63586] },
  { phrase: "거라", syllables: ["거","라"], times: [63823, 63970] },
  { phrase: "했지", syllables: ["했","지"], times: [64242, 64582] },
  { phrase: "반짝여", syllables: ["반","짝","여"], times: [65198, 65523, 65825] },
  { phrase: "세상을", syllables: ["세","상","을"], times: [66150, 66353, 66485] },
  { phrase: "비춰", syllables: ["비","춰"], times: [66802, 67118] },
  { phrase: "어기지", syllables: ["어","기","지"], times: [67449, 67608, 67935] },
  { phrase: "않은", syllables: ["안","은"], times: [68423, 68885] },
  { phrase: "약속", syllables: ["약","속"], times: [69391, 69708] },
  { phrase: "태양이", syllables: ["태","양","이"], times: [70291, 70650, 71112] },
  { phrase: "건네줬던", syllables: ["건","네","줬","던"], times: [71290, 71473, 71629, 71908] },
  { phrase: "힘", syllables: ["힘"], times: [72225] },
  { phrase: "어떤", syllables: ["어","떤"], times: [72858, 73185] },
  { phrase: "누구의", syllables: ["누","구","의"], times: [73534, 73859, 74013] },
  { phrase: "얘기도", syllables: ["얘","기","도"], times: [74144, 74458, 74815] },
  { phrase: "기꺼이", syllables: ["기","꺼","이"], times: [75132, 75453, 76036] },
  { phrase: "미소", syllables: ["미","소"], times: [76409, 76578] },
  { phrase: "짓도록", syllables: ["짓","도","록"], times: [76717, 77026, 77373] },
  { phrase: "단단한", syllables: ["단","단","한"], times: [77702, 78159, 78306] },
  { phrase: "내가", syllables: ["내","가"], times: [78643, 79149] },
  { phrase: "되기를", syllables: ["되","기","를"], times: [79601, 79899, 80227] },
  { phrase: "하늘", syllables: ["하","늘"], times: [81335, 81500] },
  { phrase: "담은", syllables: ["담","은"], times: [81666, 81823] },
  { phrase: "바다처럼", syllables: ["바","다","처","럼"], times: [81986, 82128, 82435, 82762] },
];


const ROUND5 = [
  {
    phrase: "inst",
    syllables: ["🎵"],
    times: [
      82792, 82975, 83453, 84005, 84450, 84771, 85407, 85557, 86066,
      86610, 87007, 87322, 87937, 88097, 88565, 88963, 89557, 89887,
      90481, 90644, 91108, 91422, 91569, 92042, 92378, 92518, 92694
    ]
  }
];


const ROUNDS = [
  { label: "ROUND 1", type: "inst",   segments: ROUND1 },
  { label: "ROUND 2", type: "lyrics", segments: ROUND2 },
  { label: "ROUND 3", type: "lyrics", segments: ROUND3 },
  { label: "ROUND 4", type: "lyrics", segments: ROUND4 },
  { label: "ROUND 5", type: "inst",   segments: ROUND5 },
];


const audio   = document.getElementById('song');
const lane    = document.getElementById('lane');
const hitline = document.getElementById('hitline');
const pads    = Array.from(document.querySelectorAll('.pad'));
const startBtn = document.getElementById('start-btn');

const resultOverlay  = document.getElementById('result-overlay');
const resultRoundEl  = document.getElementById('result-round');
const resultScoreEl  = document.getElementById('result-score');
const resultCommentEl = document.getElementById('result-comment');
const resultPassFailEl = document.getElementById('result-passfail');
const resultHintEl   = document.getElementById('result-hint');

const countdownOverlay = document.getElementById('countdown-overlay');
const countdownNumber  = document.getElementById('countdown-number');


let audioPrimed = false;         
let currentRoundIndex = 0;       
let roundScores = [0, 0, 0, 0, 0];

let state = {
  notes: [],                    
  idx: 0,                       
  hits: 0,                     
  total: 0,                     
  startMs: 0,
  endMs: 0,
  running: false,
  loopId: null,
};


function randInt4() {
  return Math.floor(Math.random() * 4);
}


function buildNotesForRound(roundIndex) {
  const r = ROUNDS[roundIndex];
  const segments = r.segments;

  const notes = [];
  let prevCol = -1;

  segments.forEach(seg => {
    const { phrase, syllables, times } = seg;

    
    if (r.type === "inst") {
      times.forEach(t => {
        const col = randInt4();
        notes.push({
          time: t,
          col,
          syllable: "●",
          phrase,
        });
      });
      return;
    }

   
    let col = randInt4();
    if (col === prevCol) {
      col = (col + 1 + randInt4()) % 4; 
    }
    prevCol = col;

    syllables.forEach((sy, i) => {
      const t = times[i];
      if (t == null) return;  
      notes.push({
        time: t,
        col,
        syllable: sy,
        phrase,
      });
    });
  });

  notes.sort((a, b) => a.time - b.time);

  
  const first = notes[0]?.time ?? 0;
  const last  = notes[notes.length-1]?.time ?? first;

  state.startMs = Math.max(0, first - 800);
  state.endMs   = last + 1200;

  return notes;
}


function updatePadLabels() {
  pads.forEach(p => p.textContent = ""); 

  const note = state.notes[state.idx];
  if (!note) return;

  const pad = pads[note.col];
  if (pad) {
    pad.textContent = note.syllable;
  }
}

function calcScore() {
  if (!state.total) return 0;
  return Math.round((state.hits / state.total) * 100);
}

function finalComment(avg) {
  if (avg < 20) return "리듬 게임에는 소질이 없으시군요…";
  if (avg < 40) return "아직 몸이 풀리지 않았어요.";
  if (avg < 60) return "살짝 아쉽지만, 감은 잡은 것 같아요.";
  if (avg < 90) return "꽤나 리듬을 아시는 분!";
  if (avg < 100) return "거의 리듬의 신…!";
  return "당신은 리듬의 신!!";
}


function primeAudio() {
  if (audioPrimed) return;
  const p = audio.play();
  if (p && p.then) {
    p.then(() => {
      audio.pause();
      audio.currentTime = 0;
      audioPrimed = true;
    }).catch(() => {
      
    });
  } else {
    audioPrimed = true;
  }
}


function playFromMs(ms) {
  audio.currentTime = (ms || 0) / 1000;
  const p = audio.play();
  if (p && p.catch) p.catch(() => {});
}

function startRound(roundIndex) {
  currentRoundIndex = roundIndex;

  state.notes = buildNotesForRound(roundIndex);
  state.idx   = 0;
  state.hits  = 0;
  state.total = state.notes.length;
  state.running = true;


  const old = lane.querySelectorAll('.note');
  old.forEach(el => el.remove());


  const laneRect = lane.getBoundingClientRect();
  const colWidth = laneRect.width / 4;

  state.notes.forEach(n => {
    const el = document.createElement('div');
    el.className = 'note';
    el.textContent = '●';
    el.dataset.time = String(n.time);
    el.dataset.col  = String(n.col);

   
    const x = (n.col + 0.5) * colWidth;
    el.style.left = `${x}px`;

    lane.appendChild(el);
    n.el = el; 
  });

  updatePadLabels();
  playFromMs(state.startMs);

  cancelAnimationFrame(state.loopId);
  state.loopId = requestAnimationFrame(gameLoop);
}

function endRound() {
  state.running = false;
  cancelAnimationFrame(state.loopId);

  const score = calcScore();
  roundScores[currentRoundIndex] = score;


  const isLast = currentRoundIndex === (ROUNDS.length - 1);

  showRoundResult(score, isLast);
}


function gameLoop() {
  if (!state.running) return;

  const nowMs = audio.currentTime * 1000;
  const laneRect = lane.getBoundingClientRect();
  const hitY = laneRect.height - 70; 


  state.notes.forEach(n => {
    const el = n.el;
    if (!el) return;
    const dt = n.time - nowMs; 

    const y = hitY - (dt / 1000) * SPEED_PX_S;
    el.style.transform = `translate(-50%, ${y}px)`;
  });


  while (state.idx < state.total &&
         (nowMs - state.notes[state.idx].time) > (HIT_MS + AUTO_MISS)) {
    state.idx++;
    updatePadLabels();
  }


  if (state.idx >= state.total || nowMs > state.endMs) {
    endRound();
    return;
  }

  state.loopId = requestAnimationFrame(gameLoop);
}

function handlePadPress(col) {
  if (!state.running) return;
  const i = state.idx;
  const note = state.notes[i];
  if (!note) return;

  const nowMs = audio.currentTime * 1000;
  const dt = Math.abs(nowMs - note.time);

  const correctColumn = (note.col === col);
  const hitInTime     = (dt <= HIT_MS);


  if (correctColumn && hitInTime) {
    state.hits++;
    state.idx++;
    updatePadLabels();

    if (note.el) note.el.style.opacity = 0.3;
  } else {

  }
}


function showRoundResult(score, isLastRound) {
  const roundLabel = ROUNDS[currentRoundIndex].label;
  resultRoundEl.textContent = `${roundLabel}`;
  resultScoreEl.textContent = `${score}점!`;

 
  if (score < 30) {
    resultCommentEl.textContent = "리듬을 아직 몸에 안 익힌 것 같아요.";
  } else if (score < 60) {
    resultCommentEl.textContent = "조금만 더 박자에 집중해 볼까요?";
  } else if (score < 90) {
    resultCommentEl.textContent = "꽤 잘 맞추고 있어요!";
  } else {
    resultCommentEl.textContent = "완전 노래랑 한 몸이네요!";
  }

  const pass = score >= PASS_SCORE;
  if (pass) {
    resultPassFailEl.textContent = "PASS";
    resultPassFailEl.style.color = "#00ff96";
    resultHintEl.textContent = isLastRound
      ? "화면을 탭하면 최종 결과를 봅니다"
      : "화면을 탭하면 다음 라운드로 넘어갑니다";
  } else {
    resultPassFailEl.textContent = "FAIL";
    resultPassFailEl.style.color = "#ff5c7a";
    resultHintEl.textContent = "화면을 탭하면 이 라운드를 다시 플레이합니다";
  }


  resultOverlay.classList.remove('hidden');
  resultOverlay.style.display = "flex";

  resultOverlay.onclick = () => {
    resultOverlay.onclick = null;
    resultOverlay.classList.add('hidden');
    resultOverlay.style.display = "none";

    if (!pass) {

      runCountdown(() => startRound(currentRoundIndex));
      return;
    }

    if (isLastRound) {

      showFinalResult();
    } else {

      runCountdown(() => startRound(currentRoundIndex + 1));
    }
  };
}

function showFinalResult() {
  const sum = roundScores.reduce((a, b) => a + b, 0);
  const avg = Math.round(sum / ROUNDS.length);

  resultRoundEl.textContent   = "FINAL RESULT";
  resultScoreEl.textContent   = `${avg}점`;
  resultCommentEl.textContent = finalComment(avg);
  resultPassFailEl.textContent = "";
  resultHintEl.textContent = "화면을 탭하면 처음부터 다시 시작합니다";

  resultOverlay.classList.remove('hidden');
  resultOverlay.style.display = "flex";

  resultOverlay.onclick = () => {
    resultOverlay.onclick = null;
    resultOverlay.classList.add('hidden');
    resultOverlay.style.display = "none";

    roundScores = [0,0,0,0,0];
    currentRoundIndex = 0;
    startBtn.textContent = "START";
    startBtn.classList.remove('disabled');
  };
}

function runCountdown(onDone) {
  let n = COUNTDOWN_START;
  countdownNumber.textContent = n;
  countdownOverlay.classList.remove('hidden');
  countdownOverlay.style.display = "flex";

  const timer = setInterval(() => {
    n--;
    if (n <= 0) {
      clearInterval(timer);
      countdownOverlay.classList.add('hidden');
      countdownOverlay.style.display = "none";
      onDone();
    } else {
      countdownNumber.textContent = n;
    }
  }, 1000);
}

pads.forEach((pad, idx) => {
  pad.addEventListener('click', () => handlePadPress(idx));
  pad.addEventListener('touchstart', (e) => {
    if (e.cancelable) e.preventDefault();
    handlePadPress(idx);
  }, { passive: false });
});

startBtn.addEventListener('click', () => {
  primeAudio(); 

  
  if (state.running) return;

  startBtn.classList.add('disabled');
  startBtn.textContent = "PLAYING...";
  runCountdown(() => startRound(0));
});
