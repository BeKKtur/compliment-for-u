// ==================================================
// ❤️ НАСТРОЙКИ КЛИЕНТА — ВСЁ МЕНЯТЬ ТОЛЬКО ЗДЕСЬ
// ==================================================
const loveConfig = {
  recipientName: "Амина",
  recipientNameFor: "Амины",
  senderName: "Бектур",
  meetingDate: "14 • 02 • 2025",
  mainPhoto: "./assets/story-1.jpg",
  secondPhoto: "./assets/story-2.jpg",
  thirdPhoto: "./assets/story-3.jpg",
  music: "./audio/love-song.mp3",
  heroTitle: "Ты — моё любимое совпадение.",
  heroText: "Среди миллионов случайностей мне особенно нравится одна — наша встреча.",
  firstMomentText: "Тогда я ещё не знал, насколько важным для меня станет этот человек.",
  storyTexts: [
    "Знаешь...",
    "Иногда я думаю о том, насколько случайной была наша встреча.",
    "Мы могли оказаться в другом месте.",
    "В другое время.",
    "И вообще никогда не познакомиться.",
    "Но из всех возможных вариантов случился именно наш."
  ],
  typingTexts: ["Твоя улыбка.", "Твой голос.", "То, как ты смеёшься.", "То, как ты иногда злишься."],
  typingFinal: "Хотя кого я обманываю... Мне нравится в тебе всё.",
  quotes: [
    "Если бы мне дали возможность прожить этот день ещё раз — я бы снова захотел провести его с тобой.",
    "Ты удивительным образом умеешь делать мои обычные дни лучше.",
    "Напоминание: где-то есть человек, который сейчас улыбается, думая о тебе.",
    "Из всех уведомлений твоё имя всё ещё моё любимое.",
    "Ты красивее, чем фотографии, которые я пытаюсь выбрать для этого сайта.",
    "Моё любимое место — там, где рядом ты.",
    "Ты всё ещё моя любимая случайность.",
    "Если сегодня никто тебе этого не говорил: ты невероятная."
  ],
  letter: `Я долго думал, какие слова здесь написать.

Но понял, что никакой красивый текст не сможет полностью объяснить, насколько ты стала для меня важна.

Спасибо тебе за каждый разговор. За каждую улыбку. За каждый обычный день, который рядом с тобой становится особенным.

Я не знаю, сколько ещё историй ждёт нас впереди. Но очень хочу узнать.

Люблю тебя.`,
  finalText: "Я бы снова выбрал тебя."
};

const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
$$('[data-recipient]').forEach(e=>e.textContent=loveConfig.recipientName);
$$('[data-recipient-for]').forEach(e=>e.textContent=loveConfig.recipientNameFor);
$$('[data-sender]').forEach(e=>e.textContent=loveConfig.senderName);
$('[data-date]').textContent=loveConfig.meetingDate;
$('[data-hero-title]').textContent=loveConfig.heroTitle;
$('[data-hero-text]').textContent=loveConfig.heroText;
$('[data-first-moment]').textContent=loveConfig.firstMomentText;
const letterBody=$('[data-letter]');
loveConfig.letter.split(/\n\s*\n/).forEach(text=>{const p=document.createElement('p');p.textContent=text;letterBody.append(p)});
$('[data-final]').innerHTML=loveConfig.finalText.replace('выбрал','<i>выбрал</i>');
$('[data-photo="main"]').src=loveConfig.mainPhoto;
$('[data-photo="second"]').src=loveConfig.secondPhoto;
const third=$('[data-photo="third"]'); third.src=loveConfig.thirdPhoto||loveConfig.secondPhoto;
$('#audio').src=loveConfig.music;
document.title=`Для ${loveConfig.recipientNameFor} — любовное письмо`;
$('#storyLines').innerHTML=loveConfig.storyTexts.map((t,i)=>`<p class="story-line reveal ${i===loveConfig.storyTexts.length-1?'story-climax':''}">${t}</p>`).join('');

const opening=$('#opening'), story=$('#story'), openBtn=$('#openBtn');
openBtn.addEventListener('click',()=>{
  openBtn.disabled=true;
  opening.classList.add('opened');
  setTimeout(()=>opening.classList.add('letter-cleared'),3050);
  setTimeout(()=>{document.body.classList.remove('locked');document.body.classList.add('ready');story.setAttribute('aria-hidden','false');$('#musicBtn').classList.add('visible')},4900);
  setTimeout(()=>opening.classList.add('complete'),5900);
});

let pointerFrame=0;
document.addEventListener('pointermove',e=>{if(pointerFrame)return;pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;const glow=$('.cursor-glow');glow.style.transform=`translate3d(${e.clientX-175}px,${e.clientY-175}px,0)`;if(!opening.classList.contains('opened')){$('.seal').style.setProperty('--seal-x',`${(e.clientX/innerWidth-.5)*7}px`);$('.seal').style.setProperty('--seal-y',`${(e.clientY/innerHeight-.5)*7}px`)}})} ,{passive:true});

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revealObserver.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
$$('.reveal').forEach(el=>revealObserver.observe(el));
let visibleParallax=new Set(),scrollFrame=0;
const parallaxObserver=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?visibleParallax.add(e.target):visibleParallax.delete(e.target)),{rootMargin:'20% 0px'});
$$('.parallax').forEach(el=>parallaxObserver.observe(el));
addEventListener('scroll',()=>{if(reduced||scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{visibleParallax.forEach(el=>{const r=el.getBoundingClientRect(),y=Math.max(-20,Math.min(20,(innerHeight*.5-r.top)*.022));el.style.setProperty('--parallax-y',`${y}px`)});scrollFrame=0})},{passive:true});

$('#heartBtn').addEventListener('click',e=>{e.currentTarget.classList.add('beat');$('.heart-section').classList.add('revealed');burst($('.heart-section'),18);setTimeout(()=>e.currentTarget.classList.remove('beat'),1500)});
function burst(host,count=16){if(reduced)return;for(let i=0;i<count;i++){const s=document.createElement('i');s.className='spark';s.style.setProperty('--x',`${(Math.random()-.5)*Math.min(innerWidth,700)}px`);s.style.setProperty('--y',`${(Math.random()-.65)*420}px`);host.append(s);s.addEventListener('animationend',()=>s.remove(),{once:true})}}

let typingStarted=false,typingCancelled=false;
const typingObserver=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!typingStarted){typingStarted=true;runTyping()}},{threshold:.45});typingObserver.observe($('.typing-scene'));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function typePhrase(text){const target=$('#typeText');target.textContent='';for(const ch of text){if(typingCancelled)return;target.textContent+=ch;await wait(reduced?0:55)}await wait(reduced?0:1050);for(let i=text.length;i>=0;i--){if(typingCancelled)return;target.textContent=text.slice(0,i);await wait(reduced?0:25)}await wait(260)}
async function runTyping(){for(const phrase of loveConfig.typingTexts)await typePhrase(phrase);$('#typeText').textContent=loveConfig.typingFinal;$('.type-line').classList.add('final-typed')}

let lastQuote=-1,quoteBusy=false;
$('#quoteBtn').addEventListener('click',async()=>{if(quoteBusy)return;quoteBusy=true;let next;do next=Math.floor(Math.random()*loveConfig.quotes.length);while(next===lastQuote&&loveConfig.quotes.length>1);lastQuote=next;const card=$('#quoteCard'),text=$('#randomQuote');card.classList.add('changing');await wait(reduced?0:280);text.textContent=loveConfig.quotes[next];card.classList.remove('changing');card.classList.add('touched');setTimeout(()=>card.classList.remove('touched'),550);quoteBusy=false});

$$('[data-know]').forEach(btn=>btn.addEventListener('click',()=>{const yes=btn.dataset.know==='yes';$('#knowAnswer').textContent=yes?'Хорошо. Но я всё равно буду напоминать.':'Тогда придётся напоминать тебе об этом чаще.';$('#knowCard').classList.add('answered');$$('[data-know]').forEach(b=>b.disabled=true)}));

let gameTimer=null,score=0,timeLeft=10,playing=false;
function moveHeart(){const field=$('#gameField'),heart=$('#catchHeart'),pad=16,maxX=field.clientWidth-heart.offsetWidth-pad*2,maxY=field.clientHeight-heart.offsetHeight-pad*2;heart.style.transform=`translate3d(${pad+Math.random()*Math.max(0,maxX)}px,${pad+Math.random()*Math.max(0,maxY)}px,0)`}
function startGame(){clearInterval(gameTimer);score=0;timeLeft=10;playing=true;$('#score').textContent='Сердечки: 0';$('#timer').textContent='Осталось: 10 сек.';$('#gameCover').classList.add('hidden');$('#giftUnlock').classList.remove('show');$('#catchHeart').classList.add('active');moveHeart();gameTimer=setInterval(()=>{timeLeft--;$('#timer').textContent=`Осталось: ${timeLeft} сек.`;if(timeLeft<=0)endGame()},1000)}
function endGame(){clearInterval(gameTimer);playing=false;$('#catchHeart').classList.remove('active');const result=score<=3?'Хмм... Моё сердце оказалось не таким простым 😏':score<=7?'Уже неплохо. Кажется, оно начинает тебе доверять ♥':'Ладно, сдаюсь. Моё сердце твоё ♥';$('#gameResult').textContent=result;$('#startGame').textContent='Ещё раз';$('#gameCover').classList.remove('hidden');if(score>=4)$('#giftUnlock').classList.add('show')}
$('#startGame').addEventListener('click',startGame);$('#catchHeart').addEventListener('click',()=>{if(!playing)return;score++;$('#score').textContent=`Сердечки: ${score}`;$('#catchHeart').classList.remove('pop');void $('#catchHeart').offsetWidth;$('#catchHeart').classList.add('pop');moveHeart()});
$('#giftBtn').addEventListener('click',()=>$('#giftDialog').showModal());$('.dialog-close').addEventListener('click',()=>$('#giftDialog').close());$('#giftDialog').addEventListener('click',e=>{if(e.target===$('#giftDialog'))$('#giftDialog').close()});

const readButton=$('#readBtn');
readButton.setAttribute('aria-expanded','false');
readButton.addEventListener('click',()=>{
  const paper=$('#paper'),open=paper.classList.toggle('open');
  $('.read-label',readButton).textContent=open?'Закрыть':'Прочитать';
  $('.read-icon',readButton).textContent=open?'×':'↗';
  readButton.setAttribute('aria-expanded',String(open));
});
$('#yesFuture').addEventListener('click',acceptFuture);
function acceptFuture(){const card=$('#lastCard'),button=$('#yesFuture');if(card.classList.contains('accepted'))return;button.disabled=true;card.classList.add('accepted');burst(card,22)}

const audio=$('#audio'),music=$('#musicBtn');music.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();music.classList.add('playing');music.setAttribute('aria-label','Выключить музыку')}catch{music.title='Добавьте файл audio/love-song.mp3'}}else{audio.pause();music.classList.remove('playing');music.setAttribute('aria-label','Включить музыку')}});
