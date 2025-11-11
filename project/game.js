const SPEED_PX_S = 420;         
const HIT_MS      = 220;        
const AUTO_MISS   = 260;       
const PASS_ACC    = 60;         
const NEXT_DELAY  = 900;        

const ROUNDS = [
  {
    label: "ROUND 1 - 전주",
    lyrics: "🎵",
    times: [1136,1402,2002,2645,2975,3625,4632,5557,6216,6500,7191,7774,8124,8723,9719,9875,10684,11315,11464,11930,12502,12917,13225,13852,14027,14484,14968,15419,15749,16414,16548,17075,17574,18009,18335,18911,19082,19592,20076,20224,20540,20889,21175,21474]
  },
  {
    label: "ROUND 2 - Verse 1",
    lyrics: "매일이 좋을 순 없어도 가끔은 기대해 실망에 빠져 버리지 난 아직도 자라는 중일까 멈춘 것보다야 훨씬 기뻐할 일이지만",
    times: [21860,22159,22466,22815,23129,23434,23728,24096,24583,26858,27242,27551,27733,28101,28417,28858,29215,29533,29692,29999,30316,30958,31109,31259,32027,32375,32680,32994,33358,33667,33960,34293,34787,37142,37477,37775,37935,38301,38619,39045,39392,39697,39886,40167,40514,41162,41332,41501]
  },
  {
    label: "ROUND 3 - Verse 2",
    lyrics: "아무리 마음을 먹어봐도 왠지 어디서 잘못된 건지 막막하기만 해 어쩌면 보여진 내 모습이 전부는 아닐까 두려워 수면에 오를 때",
    times: [41985,42133,42468,42859,43042,43416,43833,44193,44518,44964,45677,46343,46982,47173,47533,47953,48149,48485,48908,49251,49900,50223,50526,50852,51165,51473,52073,52268,52607,53035,53218,53618,54032,54367,54697,55134,56233,56577,56876,57552,57891,58200,58801,59099,59499,60073,60414,60733,61064,61383,61699]
  },
  {
    label: "ROUND 4 - Hook",
    lyrics: "별일 아닐 거라 했지 반짝여 세상을 비춰 어기지 않은 약속 태양이 건네줬던 힘 어떤 누구의 얘기도 기꺼이 미소 짓도록 단단한 내가 되기를 하늘 담은 바다처럼",
    times: [62617,62941,63256,63586,63823,63970,64242,64582,65198,65523,65825,66150,66353,66485,66802,67118,67449,
            67608,67935,68423,68885,69391,69708,70291,70650,71112,71290,71473,71629,71908,72225,72858,73185,73534,
            73859,74013,74144,74458,74815,75132,75453,76036,76409,76578,76717,77026,77373,77702,78159,78306,78643,
            79149,79601,79899,80227,81335,81500,81666,81823,81986,82128,82435,82762]
  },
  {
    label: "ROUND 5 - 간주",
    lyrics: "🎵",
    times: [82792, 82975, 83453, 84005, 84450, 84771, 85407, 85557, 86066, 86610, 87007, 87322, 87937, 88097, 88565, 88963, 89557, 89887, 90481, 90644, 91108, 91422, 91569, 92042, 92378, 92518, 92694
]}
];


const audio = document.getElementById('song');

const lane       = document.getElementById('lane');
const hitline    = document.getElementById('hitline');
const buttonsBox = document.getElementById('buttons');
const accDisp    = document.getElementById('acc');
const judge      = document.getElementById('judge');
const roundLabel = document.getElementById('roundLabel');
const startBtn   = document.getElementById('start');

const charBtnMap = new Map();

let cur = { roundIdx:0, notes:[], times:[], expect:[], i:0, hits:0, total:0, startMs:0, endMs:0 };


function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]];} return a; }
function wordsForButtons(t){ return t.trim().split(/\s+/).map(w=>w.replace(/[^\p{L}\p{N}가-힣]/gu,'')).filter(Boolean); }
function syllableCount(w){ return Array.from(w.replace(/[^가-힣]/g,'')).length; }


function buildAnswerSequence(lyrics, len){
  const words = wordsForButtons(lyrics);
  if (!words.length) return Array(len).fill("🎵");
  const out=[];
  for(const w of words){
    const n = Math.max(1, syllableCount(w));
    for(let i=0;i<n && out.length<len;i++) out.push(w);
  }
  while(out.length<len) out.push(words[words.length-1]);
  return out;
}


function setupButtons(lyrics){
  buttonsBox.innerHTML="";
  charBtnMap.clear();
  const list = wordsForButtons(lyrics);
  const words = list.length ? Array.from(new Set(list)) : ["🎵"];
  shuffle(words).forEach(w=>{
    const btn=document.createElement("div");
    btn.className="charBtn";
    btn.textContent=w;
    btn.addEventListener("touchstart",e=>{if(e.cancelable)e.preventDefault();handleInput(w);},{passive:false});
    btn.addEventListener("click",()=>handleInput(w));
    buttonsBox.appendChild(btn);
    charBtnMap.set(w,btn);
  });
}


function updateHint(){
  charBtnMap.forEach(b=>b.classList.remove("hint-now","hint-next"));
  const now=cur.expect[cur.i];
  const nx =cur.expect[cur.i+1];
  if(now && charBtnMap.has(now)) charBtnMap.get(now).classList.add("hint-now");
  if(nx && charBtnMap.has(nx))   charBtnMap.get(nx).classList.add("hint-next");
}


function spawnNotes(times){
  cur.notes.forEach(n=>n.remove());
  cur.notes=[];
  const hitX = hitline.getBoundingClientRect().left - lane.getBoundingClientRect().left;
  times.forEach(t=>{
    const el=document.createElement("div");
    el.className="note";
    el.dataset.time=t;
    el.style.transform=`translateX(${hitX+820}px)`;
    el.textContent="●";
    lane.appendChild(el);
    cur.notes.push(el);
  });
}


function renderAcc(){
  const pct = cur.total ? Math.round((cur.hits/cur.total)*100) : 0;
  accDisp.textContent = pct+"%";
  return pct;
}


async function playFromMs(ms){
  try{ audio.currentTime=(ms||0)/1000; await audio.play(); }
  catch{ judge.textContent="🔇 화면 한번 더 탭!"; }
}


async function startRound(idx=cur.roundIdx){
  await doCountdown();   
  const r=ROUNDS[idx];
  roundLabel.textContent=r.label;
  cur.roundIdx=idx;
  cur.times=r.times.slice();
  cur.expect=buildAnswerSequence(r.lyrics, cur.times.length);
  cur.i=0; cur.hits=0; cur.total=cur.times.length;
  cur.startMs=cur.times[0]; cur.endMs=cur.times[cur.times.length-1]+1000;
  setupButtons(r.lyrics);
  spawnNotes(cur.times);
  updateHint();
  renderAcc();
  await playFromMs(cur.startMs);
  cancelAnimationFrame(loopRaf);
  loopRaf=requestAnimationFrame(loop);
}


let loopRaf=null;
function loop(){
  const now=audio.currentTime*1000;
  const hitX=hitline.offsetLeft;
  cur.notes.forEach(el=>{
    const dt=+el.dataset.time-now;
    el.style.transform=`translateX(${hitX+(dt/1000)*SPEED_PX_S}px)`;
    el.classList.toggle("inwin",Math.abs(dt)<=HIT_MS);
  });
  while(cur.i<cur.times.length && (now-cur.times[cur.i])>AUTO_MISS){ cur.i++; updateHint(); }
  if(cur.i>=cur.times.length || now>cur.endMs){ finishRound(); return; }
  loopRaf=requestAnimationFrame(loop);
}


function handleInput(word){
  const idx=cur.i;
  const want=cur.expect[idx];
  const now=audio.currentTime*1000;
  const dt=Math.abs(now-cur.times[idx]);

  if(word===want && dt<=HIT_MS){
    cur.hits++; judge.textContent="Perfect"; judge.className="perfect";
    cur.notes[idx].style.opacity=.25;
    cur.i++; updateHint();
  } else{
    judge.textContent="Miss"; judge.className="miss"; updateHint();
  }
  renderAcc();
}


function finishRound(){
  cancelAnimationFrame(loopRaf);
  const acc=renderAcc();
  if(acc>=PASS_ACC){
    judge.textContent="✅ PASS"; judge.className="perfect";
    if(cur.roundIdx<ROUNDS.length-1) setTimeout(()=>startRound(cur.roundIdx+1),NEXT_DELAY);
    else judge.textContent="🎉 ALL CLEAR!";
  } else{
    judge.textContent="💀 FAIL (다시!)"; judge.className="miss";
startBtn.textContent="RETRY";
startBtn.onclick=async ()=>{
  await doCountdown();  
  startRound(cur.roundIdx);
};

  }
}

startBtn.onclick = async ()=>{
  await doCountdown();   
  startRound(0);
};



async function doCountdown() {
  const box = document.getElementById("countdown");
  box.classList.add("show");

  const steps = ["3", "2", "1", "START!"];
  for (let s of steps) {
    box.textContent = s;
    await new Promise(res => setTimeout(res, 650));
  }

  box.classList.remove("show");
}
