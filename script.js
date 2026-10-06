let learnIndex=0;

const templates = ['learn-nav','lesson','question','feedback','review-item','quiz-end','flash','flash-back','speed-question','speed-end','reference'].reduce((all,name)=>{
  all[name]=Handlebars.compile(document.getElementById(`${name}-template`).innerHTML);
  return all;
},{});
const numbered = values => values.map((value,index)=>({value,number:index+1}));

function renderLearnNav(){
  document.getElementById('learnNav').innerHTML=templates['learn-nav']({lessons:learnLessons.map((lesson,index)=>({index,number:index+1,title:lesson.title.split(':').pop().trim(),active:index===learnIndex}))});
  document.querySelectorAll('[data-learn]').forEach(b=>b.onclick=()=>{learnIndex=Number(b.dataset.learn);renderLesson();});
}
function renderLesson(){
  const l=learnLessons[learnIndex];
  const lesson={...l,first:learnIndex===0,nextLabel:learnIndex===learnLessons.length-1?'Go to Practice →':'Next lesson →',
    cards:l.cards?.map(c=>({order:c[0],label:c[1],detail:c[2],mnemonic:c[3]})),
    comparisons:l.comparisons?.map(c=>({comparison:c[0],orderA:c[1],detailA:c[2],orderB:c[3],detailB:c[4]})),
    algorithm:l.algorithm?.map(c=>({step:c[0],title:c[1],detail:c[2]})),
    check:{question:l.check.q,choices:numbered(l.check.choices),answer:l.check.answer,explain:l.check.explain}};
  document.getElementById('lessonArea').innerHTML=templates.lesson(lesson);
  document.querySelectorAll('.learnOpt').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('.learnOpt').forEach(x=>{x.disabled=true;if(x.dataset.answer===l.check.answer)x.classList.add('correct')});
    const ok=b.dataset.answer===l.check.answer;if(!ok)b.classList.add('wrong');
    document.getElementById('learnFeedback').innerHTML=templates.feedback({ok,message:ok?'Correct.':'Not quite.',explain:l.check.explain});
  });
  document.getElementById('prevLesson').onclick=()=>{if(learnIndex>0){learnIndex--;renderLesson()}};
  document.getElementById('nextLesson').onclick=()=>{if(learnIndex<learnLessons.length-1){learnIndex++;renderLesson()}else setTab('practice')};
  document.getElementById('practiceLesson').onclick=()=>{setTab('practice');document.getElementById('modeSelect').value=learnIndex===3?'confusion':learnIndex===1?'visual':learnIndex===0?'common':'mixed';document.getElementById('countRange').value='10';syncCountOptions();startQuiz()};
  renderLearnNav();
}

function photoKey(url){
  try{
    const path=decodeURIComponent(new URL(url).pathname).toLowerCase();
    const thumbMarker='/commons/thumb/';
    if(path.includes(thumbMarker)){
      const original=path.slice(path.indexOf(thumbMarker)+thumbMarker.length).split('/');
      return original.slice(0,-1).join('/');
    }
    return path.replace(/^\/wikipedia\/commons\//,'');
  }catch(err){return String(url).split('?')[0].toLowerCase()}
}
function normalizePhotoPool(order){
  const pool = Array.isArray(photoUrls[order]) ? photoUrls[order] : [photoUrls[order]];
  const keys=new Set();
  return pool.filter(Boolean).filter(url=>{const key=photoKey(url);if(keys.has(key))return false;keys.add(key);return true});
}

const photoCache = new Map();
function preloadAllPhotos(){
  orders.forEach(o=>{
    normalizePhotoPool(o.order).forEach(url=>{
      if (photoCache.has(url)) return;
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = url;
      photoCache.set(url, img);
    });
  });
}

function randomPhotoFor(order){
  const pool = normalizePhotoPool(order);
  if (!pool.length) return '';
  return pool[Math.floor(Math.random() * pool.length)];
}

function commonsFilePageFromUrl(url){
  try{
    const path = decodeURIComponent(new URL(url).pathname);
    const thumbMarker = '/commons/thumb/';
    let name;
    if (path.includes(thumbMarker)) {
      name = path.slice(path.indexOf(thumbMarker) + thumbMarker.length).split('/')[2];
    } else {
      name = path.split('/').pop();
    }
    return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name.replace(/ /g,'_'))}`;
  }catch(err){return 'https://commons.wikimedia.org/';}
}
let quiz=[],qIndex=0,answered=false,practiceView='setup',setAnswered=0,setCorrect=0,setReview=[];
let flashDeck=[...orders],flashIndex=0;
let speedTimer=null,speedLeft=60,speedPoints=0,speedCurrent=null,speedReview=[],speedUsedQuestions=new Set();

function getCookie(name){const match=document.cookie.split('; ').find(row=>row.startsWith(`${encodeURIComponent(name)}=`));return match?decodeURIComponent(match.split('=').slice(1).join('=')):''}
function setCookie(name,value,days=365){document.cookie=`${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${days*24*60*60}; path=/; SameSite=Lax`}
function getStoredHighScore(){return getCookie('insectSpeedHighScore')||localStorage.getItem('insectSpeedHighScore')||'0'}
function storeHighScore(score){setCookie('insectSpeedHighScore',String(score));localStorage.setItem('insectSpeedHighScore',String(score))}
function renderSpeedHighScore(){const highScore=document.getElementById('speedHighScore');highScore.textContent=`High score: ${getStoredHighScore()}`}
function sample(arr){return arr[Math.floor(Math.random()*arr.length)]}
function shuffled(arr){return [...arr].sort(()=>Math.random()-.5)}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function makeChoices(correct,pool=orders.map(o=>o.order)){let vals=[correct,...shuffled(pool.filter(x=>x!==correct)).slice(0,3)];return shuffled(vals)}
function confusableFor(order){let g=confusionGroups.find(g=>g.includes(order));return g?g:orders.map(o=>o.order)}
const orderBasedPracticeModes=new Set(['common','traits','feature','fill','visual']);
function practiceQuestionTotal(mode){
  if(orderBasedPracticeModes.has(mode))return orders.length;
  if(mode==='scenario')return challengeBank.length;
  if(mode==='confusion')return confusionGroups.reduce((total,group)=>total+group.length,0);
  if(mode==='mixed')return orders.length*5+challengeBank.length+confusionGroups.reduce((total,group)=>total+group.length,0);
  return orders.length;
}
function syncCountOptions(){
  const mode=document.getElementById('modeSelect').value;
  const count=document.getElementById('countRange');
  const maxQuestions=practiceQuestionTotal(mode);
  const current=Number(count.value)||20;
  count.max=String(maxQuestions);
  count.value=String(Math.min(Math.max(current,5),maxQuestions));
  document.getElementById('countValue').textContent=count.value;
}

function challengeQuestion(){
  const x=sample(challengeBank), correct=x[0], distract=x[3];
  return {type:'scenario',label:'Challenge question',prompt:esc(x[1]),correct,choices:shuffled([correct,...distract]),order:correct,why:x[2]};
}
function fillQuestion(order){
  const o=order||sample(orders);
  return {type:'fill',label:'Fill in the blanks',prompt:`${esc(o.common)} are recognized by: <strong>${esc(o.key)}</strong>. Type the insect order:`,correct:o.order,order:o.order,why:`${o.common} belong to ${o.order}.`};
}
function questionFor(mode='mixed'){
  let type=mode;
  if(mode==='mixed') type=sample(['common','traits','feature','fill','visual','confusion','scenario','scenario']);
  if(type==='scenario') return challengeQuestion();
  if(type==='fill') return fillQuestion();
  let o=sample(orders);
  if(type==='scenario'){
    const candidates=challengeBank.filter(x=>x[0]===o.order);
    if(candidates.length){const x=sample(candidates);return {type:'scenario',label:'Weak-spot challenge',prompt:esc(x[1]),correct:x[0],choices:shuffled([x[0],...x[3]]),order:x[0],why:x[2]}}
  }
  if(type==='common'){
    const alias=Math.random()<.55?sample(o.aliases):o.common;
    return {type,label:'Common name → order',prompt:`Which order does <strong>${esc(alias)}</strong> belong to?`,correct:o.order,choices:makeChoices(o.order),order:o.order,why:`${o.order}: ${o.key}.`};
  }
  if(type==='traits'){
    let selected=shuffled(o.traits).slice(0,2);
    return {type,label:'Description → order',prompt:`Identify the order: <strong>${esc(selected[0])}</strong>; ${esc(selected[1])}.`,correct:o.order,choices:makeChoices(o.order),order:o.order,why:`These clues point to ${o.order}. Key giveaway: ${o.key}.`};
  }
  if(type==='feature'){
    let correct=o.key; let distract=shuffled(orders.filter(x=>x.order!==o.order)).slice(0,3).map(x=>x.key);
    return {type,label:'Order → feature',prompt:`Which feature is the best match for <strong>${o.order}</strong>?`,correct,choices:shuffled([correct,...distract]),order:o.order,why:`${o.order} (${o.common}) is best recognized by: ${o.key}.`};
  }
  if(type==='visual'){
    return {type,label:'Photo visual ID',prompt:'Which order does the insect in this real specimen photograph belong to?',correct:o.order,choices:makeChoices(o.order,confusableFor(o.order).length>=4?confusableFor(o.order):orders.map(x=>x.order)),order:o.order,why:`Look for the this giveaway: ${o.key}.`,visual:true,photoUrl:randomPhotoFor(o.order)};
  }
  if(type==='confusion'){
    const group=sample(confusionGroups), target=byOrder[sample(group)];
    let clue=target.key;
    return {type,label:'Confusing orders',prompt:`Among commonly confused orders, which one matches: <strong>${esc(clue)}</strong>?`,correct:target.order,choices:makeChoices(target.order,[...new Set([...group,...orders.map(x=>x.order)])]),order:target.order,why:`${target.order} = ${target.key}. Compare it with ${group.filter(x=>x!==target.order).join(' / ')}.`};
  }
}
function questionSignature(question){return `${question.type}|${question.prompt}`}
function uniqueQuestionFor(mode,used){
  let question;
  for(let attempt=0;attempt<200;attempt++){
    question=questionFor(mode);
    if(!used.has(questionSignature(question))){used.add(questionSignature(question));return question}
  }
  return question;
}
function startQuiz(){
  const mode=document.getElementById('modeSelect').value;
  syncCountOptions();
  const maxQuestions=practiceQuestionTotal(mode);
  const n=Math.min(Number(document.getElementById('countRange').value),maxQuestions);
  document.getElementById('practiceSetup').classList.add('hidden');
  const usedQuestions=new Set();
  quiz=mode==='fill'?shuffled(orders).slice(0,n).map(o=>fillQuestion(o)):Array.from({length:n},()=>uniqueQuestionFor(mode,usedQuestions));qIndex=0;setAnswered=0;setCorrect=0;setReview=[];practiceView='quiz';renderQuestion();
}
function renderQuestion(){
  if(qIndex>=quiz.length){document.body.classList.remove('fill-active');renderQuizEnd();return}
  answered=false; const q=quiz[qIndex];
  document.body.classList.toggle('fill-active',q.type==='fill');
  document.getElementById('quizArea').innerHTML=templates.question({...q,position:qIndex+1,total:quiz.length,fill:q.type==='fill',choices:numbered(q.choices||[])});
  document.querySelectorAll('.option').forEach(b=>b.addEventListener('click',()=>answerQuestion(b,q)));
  if(q.type==='fill'){
    const fillInput=document.getElementById('fillAnswer');
    const submitFill=()=>answerFill(fillInput,q);
    document.getElementById('submitFill').onclick=submitFill;
    fillInput.focus();
  }
  document.getElementById('skipQ').onclick=()=>{
    if(answered) return;
    answered=true;
    document.querySelectorAll('.option').forEach(b=>{
      if(b.dataset.choice===q.correct) b.classList.add('correct');
      else b.classList.add('wrong');
      b.disabled=true;
    });
    if(q.type==='fill'){
      document.getElementById('fillAnswer').disabled=true;
      document.getElementById('submitFill').disabled=true;
    }
    const e=document.getElementById('explain');
    e.classList.add('show');
    setReview.push({q,answer:'Skipped',ok:false,skipped:true});
    e.innerHTML=templates.feedback({ok:false,message:'Skipped.',explain:q.why,source:q.visual?commonsFilePageFromUrl(q.photoUrl):''});
    document.getElementById('nextQ').disabled=false;
  };
  document.getElementById('finishSet').onclick=()=>renderQuizEnd();
  document.getElementById('nextQ').onclick=()=>{qIndex++;renderQuestion()};
}
function answerFill(input,q){
  if(answered)return;
  const typedDisplay=input.value.trim().replace(/\s+/g,' ');
  const typed=typedDisplay.toLowerCase();
  if(!typedDisplay)return;
  answered=true;
  const ok=typed===q.correct.toLowerCase();
  input.disabled=true;
  document.getElementById('submitFill').disabled=true;
  setAnswered++;if(ok)setCorrect++;
  const e=document.getElementById('explain');e.classList.add('show');
  const answerMarkup=fillAnswerMarkup(typedDisplay,q.correct);
  setReview.push({q,answer:typedDisplay,ok});
  e.innerHTML=templates.feedback({ok,message:ok?'Correct.':'Not quite.',explain:q.why})+(ok?'':`<div class="fill-correction">Your answer: ${answerMarkup}<br>Correct spelling: <strong>${esc(q.correct)}</strong></div>`);
  document.getElementById('nextQ').disabled=false;
}
function fillAnswerMarkup(answer,correct){
  const answerChars=[...answer],correctChars=[...correct];
  return answerChars.map((char,index)=>char.toLowerCase()===correctChars[index]?.toLowerCase()?esc(char):`<span class="fill-issue"><s>${esc(char)}</s></span>`).join('');
}
function answerQuestion(btn,q){
  if(answered)return;answered=true;
  const choice=btn.dataset.choice, ok=choice===q.correct;
  document.querySelectorAll('.option').forEach(b=>{if(b.dataset.choice===q.correct)b.classList.add('correct');else if(b===btn)b.classList.add('wrong');b.disabled=true});
  setAnswered++;if(ok)setCorrect++;
  setReview.push({q,answer:choice,ok});
  const e=document.getElementById('explain');e.classList.add('show');e.innerHTML=templates.feedback({ok,message:ok?'Correct.':'Not quite.',explain:q.why,source:q.visual?commonsFilePageFromUrl(q.photoUrl):''});
  document.getElementById('nextQ').disabled=false;
}
function renderQuizEnd(){
  document.body.classList.remove('fill-active');
  practiceView='complete';
  const skipped=quiz.length-setAnswered;
  const accuracy=setAnswered?Math.round(setCorrect/setAnswered*100):0;
  const heading=setAnswered===0?'Set ended':accuracy>=80?'Set complete':accuracy>=50?'Good effort':'Keep practicing';
  const review=setReview.map((item,index)=>templates['review-item']({question:`${index+1}. ${item.q.prompt}`,answer:item.answer,correct:item.q.correct,reviewClass:item.skipped?'':'review-'+(item.ok?'correct':'incorrect')})).join('')||'<p class="subtle">No questions were answered before the set ended.</p>';
  document.getElementById('quizArea').innerHTML=templates['quiz-end']({heading,correct:setCorrect,answered:setAnswered,accuracy,skipped,review});
  document.getElementById('continuePractice').onclick=renderPracticeSetup;
}

function renderPracticeSetup(){
  practiceView='setup';
  document.body.classList.remove('fill-active');
  document.getElementById('quizArea').innerHTML='';
  document.getElementById('practiceSetup').classList.remove('hidden');
}

function renderFlash(){
  const o=flashDeck[flashIndex%flashDeck.length],mode=document.getElementById('flashMode').value;
  document.getElementById('flashCard').classList.remove('flipped');
  const front=mode==='order'?{frontEyebrow:`Order ${flashIndex+1}/${flashDeck.length}`,front:o.order,frontHint:'Click or press Space to flip'}:mode==='common'?{frontEyebrow:'Common name',front:o.common,frontHint:'What order is this?'}:{frontEyebrow:'Recognition clue',front:o.key,frontClass:'flash-clue',frontHint:'Name the order'};
  document.getElementById('flashFront').innerHTML=templates.flash(front);
  document.getElementById('flashBack').innerHTML=templates['flash-back'](o);
}
function moveFlash(d){flashIndex=(flashIndex+d+flashDeck.length)%flashDeck.length;renderFlash()}

function startSpeed(){
  renderSpeedHighScore();
  clearInterval(speedTimer);speedLeft=60;speedPoints=0;speedReview=[];speedUsedQuestions=new Set();document.getElementById('timer').textContent='1:00';document.getElementById('speedScore').textContent='Score: 0';document.getElementById('startSpeed').disabled=true;nextSpeed();
  speedTimer=setInterval(()=>{speedLeft--;document.getElementById('timer').textContent=`0:${String(speedLeft).padStart(2,'0')}`;if(speedLeft<=0)endSpeed()},1000);
}
function nextSpeed(){
  speedCurrent=uniqueQuestionFor(Math.random()<.6?'common':'traits',speedUsedQuestions);
  document.getElementById('speedArea').innerHTML=templates['speed-question']({...speedCurrent,choices:numbered(speedCurrent.choices)});
  document.querySelectorAll('.speedOpt').forEach(b=>b.onclick=()=>{  const choice=b.dataset.choice;const ok=choice===speedCurrent.correct;speedReview.push({q:speedCurrent,answer:choice,ok});if(ok)speedPoints++;document.getElementById('speedScore').textContent='Score: '+speedPoints;nextSpeed()});
}
function endSpeed(){clearInterval(speedTimer);speedTimer=null;const previous=Number(getStoredHighScore());if(speedPoints>previous)storeHighScore(speedPoints);renderSpeedHighScore();document.getElementById('startSpeed').disabled=false;const review=speedReview.map((item,index)=>templates['review-item']({question:`${index+1}. ${item.q.prompt}`,answer:item.answer,correct:item.q.correct,reviewClass:`review-${item.ok?'correct':'incorrect'}`})).join('')||'<p class="subtle">No questions were answered before time ran out.</p>';document.getElementById('speedArea').innerHTML=templates['speed-end']({score:speedPoints,review})}

function renderReference(){
  const q=document.getElementById('refSearch').value.toLowerCase(),f=document.getElementById('refFilter').value;
  const arr=orders.filter(o=>(f==='all'||o.meta===f)&&([o.order,o.common,o.key,...o.traits,...o.tags].join(' ').toLowerCase().includes(q)));
  document.getElementById('refGrid').innerHTML=templates.reference({orders:arr});
}

function setTab(name){
  if(name!=='practice')document.body.classList.remove('fill-active');
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  ['learn','practice','flashcards','speed','reference'].forEach(n=>document.getElementById(n+'Pane').classList.toggle('hidden',n!==name));
  if(name==='reference')renderReference();if(name==='flashcards')renderFlash();if(name==='learn')renderLesson();
}

document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
document.getElementById('newSetBtn').onclick=startQuiz;
document.getElementById('modeSelect').onchange=syncCountOptions;
document.getElementById('countRange').oninput=()=>{document.getElementById('countValue').textContent=document.getElementById('countRange').value};
document.getElementById('flashCard').onclick=()=>document.getElementById('flashCard').classList.toggle('flipped');
document.getElementById('flipFlash').onclick=()=>document.getElementById('flashCard').classList.toggle('flipped');
document.getElementById('prevFlash').onclick=()=>moveFlash(-1);document.getElementById('nextFlash').onclick=()=>moveFlash(1);
document.getElementById('shuffleFlash').onclick=()=>{flashDeck=shuffled(orders);flashIndex=0;renderFlash()};
document.getElementById('flashMode').onchange=renderFlash;
document.getElementById('startSpeed').onclick=startSpeed;
renderSpeedHighScore();
document.getElementById('refSearch').oninput=renderReference;document.getElementById('refFilter').onchange=renderReference;
document.addEventListener('keydown',e=>{
  const active=document.querySelector('.tab.active')?.dataset.tab;
  if(active==='practice'&&!answered&&['1','2','3','4'].includes(e.key)){document.querySelectorAll('.option')[Number(e.key)-1]?.click()}
  else if(active==='practice'&&e.key==='Enter'){
    e.preventDefault();
    if(!answered)document.getElementById('submitFill')?.click();
    else document.getElementById('nextQ')?.click();
  }
  else if(active==='flashcards'&&e.code==='Space'){e.preventDefault();document.getElementById('flashCard').classList.toggle('flipped')}
  else if(active==='flashcards'&&e.key==='ArrowRight')moveFlash(1);else if(active==='flashcards'&&e.key==='ArrowLeft')moveFlash(-1);
  else if(active==='speed'&&speedTimer&&['1','2','3','4'].includes(e.key)){document.querySelectorAll('.speedOpt')[Number(e.key)-1]?.click()}
});

renderReference();
renderFlash();
renderLesson();
renderPracticeSetup();
setTab('learn');
syncCountOptions();
preloadAllPhotos();