const orders = [
{order:'Archaeognatha',common:'Jumping bristletails',aliases:['bristletail','jumping bristletail'],traits:['Wingless with a humped, cylindrical body','Three tail filaments; the middle filament is especially long','Large eyes and an ability to jump'],key:'Humped wingless jumper with 3 tails',meta:'wingless',tags:['wingless','3 tails','jumping']},
{order:'Odonata',common:'Dragonflies and damselflies',aliases:['dragonfly','damselfly'],traits:['Two pairs of long membranous wings','Very large eyes and a long abdomen','Predatory adults; aquatic nymphs'],key:'Huge eyes + long abdomen + 2 pairs of long wings',meta:'hemi',tags:['aquatic nymph','predator','4 wings']},
{order:'Grylloblattodea',common:'Rock crawlers / ice crawlers',aliases:['rock crawler','ice crawler'],traits:['Wingless, elongated, pale insects','Long antennae and cerci','Strongly associated with cold environments'],key:'Wingless cold-adapted crawler',meta:'wingless',tags:['wingless','cold','long antennae']},
{order:'Mantophasmatodea',common:'Gladiators / heelwalkers',aliases:['gladiator','heelwalker'],traits:['Wingless predatory insects','Long legs and antennae','Mantis/stick-insect appearance without classic mantis raptorial forelegs'],key:'Wingless predator that looks mantis/stick-like',meta:'wingless',tags:['wingless','predator','long legs']},
{order:'Dermaptera',common:'Earwigs',aliases:['earwig'],traits:['Forceps-like cerci at the end of the abdomen','Short leathery forewings in many adults','Elongate, flattened body'],key:'Pincers on the rear end',meta:'hemi',tags:['pincers','cerci','earwig']},
{order:'Mantodea',common:'Mantises',aliases:['mantis','praying mantis'],traits:['Raptorial grasping forelegs','Long prothorax and triangular mobile head','Predatory'],key:'Praying/grasping forelegs',meta:'hemi',tags:['raptorial legs','predator','long prothorax']},
{order:'Ephemeroptera',common:'Mayflies',aliases:['mayfly'],traits:['Two or three long tail filaments','Large triangular forewings held upright','Short antennae; aquatic nymphs'],key:'Upright wings + 2–3 long tails',meta:'hemi',tags:['upright wings','tails','aquatic nymph']},
{order:'Trichoptera',common:'Caddisflies',aliases:['caddisfly'],traits:['Moth-like adults with hairy rather than scaly wings','Wings often held tent-like over the body','Long antennae; aquatic larvae'],key:'Moth-like, but hairy tented wings',meta:'holo',tags:['hairy wings','aquatic larva','long antennae']},
{order:'Siphonaptera',common:'Fleas',aliases:['flea'],traits:['Wingless and laterally compressed','Powerful jumping hind legs','Blood-feeding ectoparasites with piercing-sucking mouthparts'],key:'Sideways-flat wingless jumper',meta:'holo',tags:['parasite','jumping','laterally compressed']},
{order:'Blattodea',common:'Cockroaches and termites',aliases:['cockroach','roach','termite'],traits:['Cockroaches are flattened, oval, long-antennaed insects','Termites are soft-bodied social insects','Termite alates have two pairs of similar-sized wings'],key:'Roaches + termites',meta:'hemi',tags:['roach','termite','social']},
{order:'Plecoptera',common:'Stoneflies',aliases:['stonefly'],traits:['Two tail filaments in many species','Wings lie flat or folded over the abdomen','Long antennae; aquatic nymphs usually in streams'],key:'Flat-folded wings + 2 tails',meta:'hemi',tags:['2 tails','flat wings','stream']},
{order:'Embioptera',common:'Webspinners',aliases:['webspinner'],traits:['Slender insects that live in silken galleries','Enlarged front tarsi contain silk glands','Females are usually wingless'],key:'Silk-spinning front feet',meta:'hemi',tags:['silk feet','gallery','slender']},
{order:'Orthoptera',common:'Grasshoppers, crickets, and locusts',aliases:['grasshopper','cricket','locust','katydid'],traits:['Enlarged hind legs specialized for jumping','Chewing mouthparts','Forewings often leathery; many species stridulate'],key:'Huge jumping hind legs',meta:'hemi',tags:['jumping legs','stridulation','chewing']},
{order:'Phasmatodea',common:'Stick and leaf insects',aliases:['stick insect','walking stick','leaf insect'],traits:['Extreme stick or leaf mimicry','Long body and legs in many species','Chewing herbivores'],key:'Looks like a stick or leaf',meta:'hemi',tags:['camouflage','stick-like','leaf-like']},
{order:'Psocodea',common:'Booklice, barklice, and parasitic lice',aliases:['booklouse','booklice','barklouse','barklice','louse','lice'],traits:['Book/barklice are tiny, soft-bodied and often large-headed','Parasitic lice are wingless and flattened','Parasitic forms cling to hosts'],key:'Booklice/barklice + parasitic lice',meta:'hemi',tags:['lice','tiny','parasite']},
{order:'Megaloptera',common:'Dobsonflies, alderflies, and fishflies',aliases:['dobsonfly','alderfly','fishfly'],traits:['Large insects with two broad, heavily veined wings','Dobsonfly males may have enormous mandibles','Aquatic predatory larvae'],key:'Large net-winged insect; dobsonfly may have huge jaws',meta:'holo',tags:['large','net wings','huge mandibles']},
{order:'Raphidioptera',common:'Snakeflies',aliases:['snakefly'],traits:['Distinctively elongated prothorax creates a long neck','Two pairs of clear, net-veined wings','Predatory'],key:'Long snake-like neck',meta:'holo',tags:['long neck','net wings','predator']},
{order:'Coleoptera',common:'Beetles',aliases:['beetle'],traits:['Forewings hardened into elytra','Elytra usually meet in a straight line down the back','Chewing mouthparts'],key:'Hard shell-like forewings (elytra)',meta:'holo',tags:['elytra','hard forewings','largest order']},
{order:'Strepsiptera',common:'Twisted-wing parasites',aliases:['twisted-wing parasite','strepsipteran'],traits:['Highly specialized insect parasites','Males have tiny forewings and large fan-shaped hindwings','Females of many species remain largely within the host'],key:'Tiny forewings + fan-shaped hindwings; parasite',meta:'holo',tags:['parasite','fan wings','reduced forewings']},
{order:'Mecoptera',common:'Scorpionflies and hangingflies',aliases:['scorpionfly','hangingfly'],traits:['Elongated beak-like rostrum','Many scorpionfly males have an upcurved terminal genital bulb','Two pairs of membranous wings'],key:'Long snout; male may look scorpion-tailed',meta:'holo',tags:['snout','scorpion tail','rostrum']},
{order:'Diptera',common:'True flies and mosquitoes',aliases:['fly','true fly','mosquito','gnat','midge'],traits:['Only one pair of functional wings','Hindwings are reduced to halteres','Adults often have large compound eyes'],key:'One pair of wings + halteres',meta:'holo',tags:['1 pair wings','halteres','fly']},
{order:'Lepidoptera',common:'Butterflies and moths',aliases:['butterfly','moth'],traits:['Wings covered with scales','Adults often have a coiled proboscis','Larvae are caterpillars'],key:'Scaly wings',meta:'holo',tags:['scales','caterpillar','proboscis']},
{order:'Hymenoptera',common:'Ants, bees, wasps, and sawflies',aliases:['ant','bee','wasp','sawfly','hornet'],traits:['Usually two pairs of membranous wings with smaller hindwings','Many have a constricted waist','Includes ants, bees, wasps, and sawflies'],key:'Ant/bee/wasp/sawfly; often narrow waist',meta:'holo',tags:['narrow waist','bee','wasp']},
{order:'Zoraptera',common:'Angel insects / zorapterans',aliases:['angel insect','zorapteran'],traits:['Very small, soft-bodied insects','Often found under bark or in rotting wood','Winged and wingless forms occur'],key:'Tiny soft-bodied termite-like insect',meta:'hemi',tags:['tiny','soft-bodied','under bark']},
{order:'Thysanoptera',common:'Thrips',aliases:['thrips'],traits:['Very small, slender insects','Narrow wings with conspicuous fringes of hairs','Asymmetrical rasping-sucking mouthparts'],key:'Tiny insect with narrow fringed wings',meta:'hemi',tags:['fringed wings','tiny','slender']},
{order:'Hemiptera',common:'True bugs, aphids, cicadas, and hoppers',aliases:['true bug','aphid','cicada','leafhopper','planthopper','stink bug','assassin bug'],traits:['Piercing-sucking beak or rostrum','True bugs often have partly hardened forewings','Includes aphids, cicadas, and many hoppers'],key:'Piercing-sucking beak',meta:'hemi',tags:['beak','piercing-sucking','true bug']},
{order:'Neuroptera',common:'Lacewings, antlions, and owlflies',aliases:['lacewing','antlion','owlfly'],traits:['Two pairs of delicate, similarly sized net-veined wings','Adults often look fragile compared with Megaloptera','Many species are predatory'],key:'Delicate net-veined wings',meta:'holo',tags:['net wings','delicate','predator']},
{order:'Zygentoma',common:'Silverfish',aliases:['silverfish','firebrat'],traits:['Wingless, flattened, carrot-shaped body','Three long tail filaments of roughly similar prominence','Body often covered in scales; fast runner'],key:'Flat wingless runner with 3 tails',meta:'wingless',tags:['3 tails','flat','scales']}
];


const learnLessons = [
  {
    title:'Start here: 12 giveaway orders',
    kicker:'Chunk 1 • easiest points',
    intro:'Memorize these as one-to-one visual hooks. You should eventually be able to answer these without thinking.',
    cards:[
      ['Dermaptera','Earwig','Rear pincers / forceps','DERMaptera → imagine an earwig pinching your dermis.'],
      ['Orthoptera','Grasshopper / cricket','Huge jumping hind legs','ORtho → enormous rear legs are the obvious clue.'],
      ['Mantodea','Mantis','Praying / grasping forelegs','Manto = mantis; the name already almost gives it away.'],
      ['Phasmatodea','Stick / leaf insect','Looks like a stick or leaf','PHASM = apparition/disguise → extreme camouflage.'],
      ['Coleoptera','Beetle','Hard forewings called elytra','Think beetle shell: the front wings form hard covers.'],
      ['Diptera','True flies / mosquitoes','One pair of functional wings','DI = two wings total; the hind pair became halteres.'],
      ['Lepidoptera','Butterflies / moths','Scaly wings','Lepid- refers to scales.'],
      ['Siphonaptera','Fleas','Wingless, sideways-flat jumper','Flea = flattened parasite that jumps.'],
      ['Hymenoptera','Ant / bee / wasp / sawfly','Often a narrow waist; 2 wing pairs','Learn the common-name group first.'],
      ['Hemiptera','True bugs / aphids / cicadas / hoppers','Piercing-sucking beak','HEMIptera true bugs often have half-hardened forewings, but the beak is the safer broad clue.'],
      ['Thysanoptera','Thrips','Tiny, narrow fringed wings','THYSANO = fringe/tassel → fringed wings.'],
      ['Odonata','Dragonflies / damselflies','Huge eyes, long abdomen, 4 long wings','The dragonfly silhouette is usually enough.']
    ],
    rule:'Do not memorize a paragraph for each order yet. Memorize exactly three links: ORDER NAME ↔ COMMON NAME ↔ ONE GIVEAWAY.',
    check:{q:'An insect has forceps-like pincers at the end of its abdomen. Which order?',choices:['Dermaptera','Orthoptera','Plecoptera','Mecoptera'],answer:'Dermaptera',explain:'Dermaptera is the earwig order; rear forceps are the giveaway.'}
  },
  {
    title:'Read the wings first',
    kicker:'Chunk 2 • wing shortcuts',
    intro:'For a winged adult, wing number, texture, and resting position often get you to the answer immediately.',
    cards:[
      ['Diptera','1 functional pair','Hindwings reduced to halteres','Count functional wings first.'],
      ['Coleoptera','Hard forewings','Elytra make a shell over the back','Hard covers = beetle.'],
      ['Lepidoptera','Scaly wings','Butterflies and moths','Scales can look powdery.'],
      ['Trichoptera','Hairy wings','Caddisflies; wings often tented','Moth-like, but hair rather than scales.'],
      ['Thysanoptera','Fringed narrow wings','Thrips','Tiny straps with a hairy fringe.'],
      ['Ephemeroptera','Wings held upright','Mayflies','Usually paired with 2–3 long tails.'],
      ['Plecoptera','Wings folded flat','Stoneflies','Usually paired with 2 tails.'],
      ['Strepsiptera','Tiny forewings + fanlike hindwings','Twisted-wing parasites','Very unusual/reduced wing arrangement.']
    ],
    rule:'Fast wing ladder: ONE PAIR → Diptera. HARD COVERS → Coleoptera. SCALES → Lepidoptera. HAIR → Trichoptera. FRINGE → Thysanoptera. UPRIGHT + tails → Ephemeroptera. FLAT + tails → Plecoptera.',
    check:{q:'A moth-like insect has long antennae and hairy wings held tent-like over its body. Which order?',choices:['Trichoptera','Lepidoptera','Neuroptera','Thysanoptera'],answer:'Trichoptera',explain:'Caddisflies are moth-like, but their wings are hairy rather than covered in scales.'}
  },
  {
    title:'Tails, legs, and body shape',
    kicker:'Chunk 3 • silhouette clues',
    intro:'When wing clues are absent or weak, look at the rear end, specialized legs, and overall body profile.',
    cards:[
      ['Archaeognatha','3 tails + humped body','Jumping bristletail','Humped jumper.'],
      ['Zygentoma','3 tails + flat carrot shape','Silverfish','Flat runner.'],
      ['Ephemeroptera','2–3 tails + upright wings','Mayfly','Up wings.'],
      ['Plecoptera','2 tails + flat-folded wings','Stonefly','Down/flat wings.'],
      ['Dermaptera','Forceps at rear','Earwig','Pincers.'],
      ['Orthoptera','Huge hind legs','Grasshoppers / crickets','Jumping legs.'],
      ['Mantodea','Raptorial front legs','Mantises','Grabbing legs.'],
      ['Embioptera','Silk-producing front feet','Webspinners','Silk comes from enlarged front tarsi.'],
      ['Siphonaptera','Laterally compressed body','Fleas','Sideways-flat parasite.'],
      ['Phasmatodea','Stick/leaf silhouette','Walking sticks / leaf insects','Camouflage dominates the whole body plan.']
    ],
    rule:'For anything with “tails,” count them and then check posture: 3 tails + wingless humped = Archaeognatha; 3 tails + wingless flat = Zygentoma; tails + upright wings = Ephemeroptera; 2 tails + flat wings = Plecoptera.',
    check:{q:'Wingless, flattened, carrot-shaped, fast-running insect with three similar tail filaments:',choices:['Zygentoma','Archaeognatha','Ephemeroptera','Dermaptera'],answer:'Zygentoma',explain:'Silverfish (Zygentoma) are flat runners; jumping bristletails (Archaeognatha) are more humped and can jump.'}
  },
  {
    title:'Master the confusing look-alikes',
    kicker:'Chunk 4 • comparison rules',
    intro:'These are the pairs and trios most worth comparing directly. Learn the difference, not two separate definitions.',
    comparisons:[
      ['Mayfly vs stonefly','Ephemeroptera','upright wings; 2–3 long tails; short antennae','Plecoptera','wings flat over back; usually 2 tails; long antennae'],
      ['Bristletail vs silverfish','Archaeognatha','humped; jumps; middle tail especially long','Zygentoma','flat; carrot-shaped; fast runner; 3 similar tails'],
      ['Caddisfly vs moth','Trichoptera','hairy, tented wings; long antennae','Lepidoptera','scaly wings; butterfly/moth body plan'],
      ['Net-winged trio','Neuroptera','delicate lacewing-type net wings','Megaloptera','large/robust; dobsonfly may have huge jaws'],
      ['Snakefly separator','Raphidioptera','long snake-like neck','Neuroptera / Megaloptera','no extremely elongated neck'],
      ['True bug vs beetle','Hemiptera','piercing-sucking beak','Coleoptera','hard elytra; chewing mouthparts']
    ],
    rule:'When two orders look similar, ask for the single contrast feature: UP vs FLAT wings, HUMPED vs FLAT body, HAIR vs SCALES, DELICATE vs HUGE, LONG NECK vs normal neck, BEAK vs ELYTRA.',
    check:{q:'You see a delicate insect with many net-like wing veins and no elongated neck. It is not large or heavy-bodied. Best order?',choices:['Neuroptera','Megaloptera','Raphidioptera','Trichoptera'],answer:'Neuroptera',explain:'Neuroptera are the delicate net-winged insects; Megaloptera are generally more robust, and Raphidioptera have the conspicuous long neck.'}
  },
  {
    title:'The rare-name cleanup',
    kicker:'Chunk 5 • low-frequency orders',
    intro:'These are harder mostly because the names are unfamiliar. Attach each name to one memorable fact or common name.',
    cards:[
      ['Grylloblattodea','Rock / ice crawlers','Wingless + cold habitats','Think glacier/ice.'],
      ['Mantophasmatodea','Heelwalkers / gladiators','Wingless predator; mantis/stick-like','The hybrid-sounding name matches the hybrid-looking body.'],
      ['Zoraptera','Angel insects','Tiny, soft-bodied, termite-like','Tiny under bark/rotting wood.'],
      ['Psocodea','Booklice, barklice, parasitic lice','Lice grouping','Memorize the common names as a package.'],
      ['Megaloptera','Dobsonflies / alderflies / fishflies','Large net-winged; huge jaws possible','MEGA = big.'],
      ['Raphidioptera','Snakeflies','Long neck','Snake-like neck.'],
      ['Mecoptera','Scorpionflies / hangingflies','Long snout; male may curve tail upward','Scorpionfly name is the hook.'],
      ['Strepsiptera','Twisted-wing parasites','Parasites; strange fan-shaped hindwings','The weird order gets the weird wing plan.'],
      ['Embioptera','Webspinners','Silk from front feet','Web = silk.']
    ],
    rule:'For rare orders, common-name recall may be more useful than morphology at first. Say them as pairs: “Grylloblattodea—ice crawler,” “Raphidioptera—snakefly,” “Mecoptera—scorpionfly.”',
    check:{q:'Which order contains snakeflies and is recognized by a long, snake-like neck?',choices:['Raphidioptera','Megaloptera','Mecoptera','Mantophasmatodea'],answer:'Raphidioptera',explain:'Raphidioptera = snakeflies = elongated prothorax/neck.'}
  },
  {
    title:'Put it all together',
    kicker:'Chunk 6 • identification algorithm',
    intro:'Use the same scan every time. This prevents you from staring at a picture and trying to recall all 28 names at once.',
    algorithm:[
      ['1','Wingless?','Check 3 tails, jumping body, flea shape, lice, ice crawler, heelwalker, etc.'],
      ['2','Number of wings?','One functional pair strongly suggests Diptera.'],
      ['3','Wing texture?','Hard = Coleoptera; scales = Lepidoptera; hairs = Trichoptera; fringe = Thysanoptera.'],
      ['4','Wing posture / veins?','Upright = mayfly; flat + tails = stonefly; net-veined = Neuroptera/Megaloptera/Raphidioptera.'],
      ['5','Rear end?','Pincers, 2 tails, 3 tails, or scorpion-like curve can be decisive.'],
      ['6','Legs?','Jumping hind legs, mantis forelegs, or webspinner front feet.'],
      ['7','Head/thorax?','Piercing beak, long snout, huge jaws, or long snake-like neck.'],
      ['8','Only then use habitat','Cold habitat, aquatic nymph/larva, under bark, or parasitic lifestyle can confirm an ID.']
    ],
    rule:'Your goal is not “remember 28 definitions.” Your goal is “notice a clue → shrink the possibilities → distinguish the last 2–3 orders.”',
    check:{q:'A specimen has two long tails and its wings lie flat over its abdomen. What should you answer?',choices:['Plecoptera','Ephemeroptera','Zygentoma','Neuroptera'],answer:'Plecoptera',explain:'Stoneflies (Plecoptera) pair two tails with flat-folded wings.'}
  }
];
let learnIndex=0;

function renderLearnNav(){
  document.getElementById('learnNav').innerHTML=learnLessons.map((l,i)=>`<button class="learn-step ${i===learnIndex?'active':''}" data-learn="${i}">${i+1}. ${esc(l.title.split(':').pop().trim())}</button>`).join('');
  document.querySelectorAll('[data-learn]').forEach(b=>b.onclick=()=>{learnIndex=Number(b.dataset.learn);renderLesson();});
}
function renderLesson(){
  const l=learnLessons[learnIndex];
  let body='';
  if(l.cards){
    body=`<div class="learn-grid">${l.cards.map(c=>`<div class="memory-card"><div class="order-name">${esc(c[0])}</div><strong>${esc(c[1])}</strong><div>${esc(c[2])}</div><div class="mnemonic">${esc(c[3])}</div></div>`).join('')}</div>`;
  }
  if(l.comparisons){
    body=`<table class="compare-table"><thead><tr><th>Comparison</th><th>Order A</th><th>Order B</th></tr></thead><tbody>${l.comparisons.map(c=>`<tr><td><strong>${esc(c[0])}</strong></td><td><span class="chunk-pill">${esc(c[1])}</span><br>${esc(c[2])}</td><td><span class="chunk-pill">${esc(c[3])}</span><br>${esc(c[4])}</td></tr>`).join('')}</tbody></table>`;
  }
  if(l.algorithm){
    body=`<div class="learn-grid">${l.algorithm.map(c=>`<div class="memory-card"><div class="order-name">Step ${esc(c[0])}: ${esc(c[1])}</div><div>${esc(c[2])}</div></div>`).join('')}</div>`;
  }
  document.getElementById('lessonArea').innerHTML=`<div class="lesson"><div class="eyebrow">${esc(l.kicker)}</div><h2>${esc(l.title)}</h2><p>${esc(l.intro)}</p>${body}<div class="learn-check"><div class="eyebrow">30-second self-check</div><div class="question" style="font-size:1.15rem;margin-bottom:8px">${esc(l.check.q)}</div><div class="options">${l.check.choices.map((c,i)=>`<button class="option learnOpt" data-answer="${esc(c)}"><span class="num">${i+1}</span>${esc(c)}</button>`).join('')}</div><div class="learn-feedback" id="learnFeedback">Try it before moving on.</div></div><div class="lesson-actions"><button class="secondary" id="prevLesson" ${learnIndex===0?'disabled':''}>← Previous lesson</button><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="secondary" id="practiceLesson">Practice these ideas</button><button class="primary" id="nextLesson">${learnIndex===learnLessons.length-1?'Go to Practice →':'Next lesson →'}</button></div></div></div>`;
  document.querySelectorAll('.learnOpt').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('.learnOpt').forEach(x=>{x.disabled=true;if(x.dataset.answer===l.check.answer)x.classList.add('correct')});
    const ok=b.dataset.answer===l.check.answer;if(!ok)b.classList.add('wrong');
    document.getElementById('learnFeedback').innerHTML=`<strong class="${ok?'feedback-correct':'feedback-incorrect'}">${ok?'Correct.':'Not quite.'}</strong> ${esc(l.check.explain)}`;
  });
  document.getElementById('prevLesson').onclick=()=>{if(learnIndex>0){learnIndex--;renderLesson()}};
  document.getElementById('nextLesson').onclick=()=>{if(learnIndex<learnLessons.length-1){learnIndex++;renderLesson()}else setTab('practice')};
  document.getElementById('practiceLesson').onclick=()=>{setTab('practice');document.getElementById('modeSelect').value=learnIndex===3?'confusion':learnIndex===1?'visual':learnIndex===0?'common':'mixed';document.getElementById('countRange').value='10';syncCountOptions();startQuiz()};
  renderLearnNav();
}

const confusionGroups = [
['Ephemeroptera','Plecoptera'],['Archaeognatha','Zygentoma'],['Trichoptera','Lepidoptera'],['Neuroptera','Megaloptera','Raphidioptera'],['Mantodea','Phasmatodea','Mantophasmatodea'],['Hemiptera','Coleoptera'],['Siphonaptera','Psocodea'],['Blattodea','Hymenoptera'],['Diptera','Hymenoptera'],['Thysanoptera','Trichoptera']
];
const byOrder = Object.fromEntries(orders.map(o=>[o.order,o]));
const photoUrls = {
  'Archaeognatha': [
    'images/Archaeognatha_1.jpg',
    'images/Archaeognatha_2.jpg',
    'images/Archaeognatha_3.jpg',
    'images/Archaeognatha_4.jpg',
    'images/Archaeognatha_5.jpg',
    'images/Archaeognatha_6.jpg',
    'images/Archaeognatha_7.jpg'
  ],
  'Odonata': [
    'images/Odonata_1.jpg',
    'images/Odonata_2.jpg',
    'images/Odonata_3.jpg',
    'images/Odonata_4.jpg',
    'images/Odonata_5.jpg',
    'images/Odonata_6.jpg',
    'images/Odonata_7.jpg',
    'images/Odonata_8.jpg',
    'images/Odonata_9.jpg',
    'images/Odonata_10.jpg'
  ],
  'Grylloblattodea': [
    'images/Grylloblattodea_1.jpg',
    'images/Grylloblattodea_2.jpg'
  ],
  'Mantophasmatodea': [
    'images/Mantophasmatodea_1.jpg',
    'images/Mantophasmatodea_2.jpg'
  ],
  'Dermaptera': [
    'images/Dermaptera_1.jpg',
    'images/Dermaptera_2.jpg',
    'images/Dermaptera_3.jpg',
    'images/Dermaptera_4.png',
    'images/Dermaptera_5.jpg',
    'images/Dermaptera_6.jpg',
    'images/Dermaptera_7.jpg',
    'images/Dermaptera_8.jpg'
  ],
  'Mantodea': [
    'images/Mantodea_1.jpg',
    'images/Mantodea_2.jpg',
    'images/Mantodea_3.jpg',
    'images/Mantodea_4.jpg',
    'images/Mantodea_5.jpg',
    'images/Mantodea_6.jpg'
  ],
  'Ephemeroptera': [
    'images/Ephemeroptera_1.jpg',
    'images/Ephemeroptera_2.jpg',
    'images/Ephemeroptera_3.jpg',
    'images/Ephemeroptera_4.jpg',
    'images/Ephemeroptera_5.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e1/Mayfly_resting_on_the_river_bank_at_Thornborough_Bridge._-_geograph.org.uk_-_1503506.jpg',
    'images/Ephemeroptera_7.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7d/Strange_insect%3F_%282662850703%29.jpg',
    'images/Ephemeroptera_9.jpg'
  ],
  'Trichoptera': [
    'images/Trichoptera_1.jpg',
    'images/Trichoptera_2.jpg',
    'images/Trichoptera_3.jpg',
    'images/Trichoptera_4.jpg',
    'images/Trichoptera_5.jpg',
    'images/Trichoptera_6.jpg',
    'images/Trichoptera_7.jpg',
    'images/Trichoptera_8.jpg',
    'images/Trichoptera_9.jpg'
  ],
  'Siphonaptera': [
    'images/Siphonaptera_1.jpg',
    'images/Siphonaptera_2.jpg',
    'images/Siphonaptera_3.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6e/Craneopsylla_minerva.jpg'
  ],
  'Blattodea': [
    'images/Blattodea_1.png',
    'https://upload.wikimedia.org/wikipedia/commons/b/be/I_Chontal_1103_%28268%29_%2820713997975%29.jpg',
    'images/Blattodea_3.jpg',
    'images/Blattodea_4.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/27/Rochaina_bilunata_%28Nyctiboridae%29-%E3%82%B3%E3%82%B9%E3%82%BF%E3%83%AA%E3%82%AB201205-2.jpg',
    'images/Blattodea_6.jpg'
  ],
  'Plecoptera': [
    'images/Plecoptera_1.jpg',
    'images/Plecoptera_2.jpg',
    'images/Plecoptera_3.jpg',
    'images/Plecoptera_4.png',
    'images/Plecoptera_5.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b6/A_Stonefly_drying_its_wings_in_the_Spring_sunshine._-_geograph.org.uk_-_412660.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/52/Stonefly_-_geograph.org.uk_-_467522.jpg'
  ],
  'Embioptera': [
    'images/Embioptera_1.jpg',
    'images/Embioptera_2.jpg',
    'images/Embioptera_3.jpg',
    'images/Embioptera_4.jpg'
  ],
  'Orthoptera': [
    'images/Orthoptera_1.jpg',
    'images/Orthoptera_2.jpg',
    'images/Orthoptera_3.jpg',
    'images/Orthoptera_4.jpg',
    'images/Orthoptera_5.jpg',
    'images/Orthoptera_6.jpg',
    'images/Orthoptera_7.jpg',
    'images/Orthoptera_8.jpg',
    'images/Orthoptera_9.jpg',
    'images/Orthoptera_10.jpg'
  ],
  'Phasmatodea': [
    'images/Phasmatodea_1.jpg',
    'images/Phasmatodea_2.jpg',
    'images/Phasmatodea_3.jpg',
    'images/Phasmatodea_4.jpg',
    'images/Phasmatodea_5.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e1/Nesiophasma_sobesonbaii.jpg',
    'images/Phasmatodea_7.jpg',
    'images/Phasmatodea_8.jpg',
    'images/Phasmatodea_9.jpg'
  ],
  'Psocodea': [
    'images/Psocodea_1.jpg',
    'images/Psocodea_2.jpg',
    'images/Psocodea_3.jpg',
    'images/Psocodea_4.jpg',
    'images/Psocodea_5.jpg',
    'images/Psocodea_6.jpg',
    'images/Psocodea_7.jpg',
    'images/Psocodea_8.jpg',
    'images/Psocodea_9.jpg'
  ],
  'Megaloptera': [
    'images/Megaloptera_1.jpg',
    'images/Megaloptera_2.jpg',
    'images/Megaloptera_3.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fe/I_El_Chontal_%281%29_%2820527231899%29.jpg',
    'images/Megaloptera_5.jpg',
    'images/Megaloptera_6.jpg',
    'images/Megaloptera_7.jpg'
  ],
  'Raphidioptera': [
    'images/Raphidioptera_1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/90/D%C9%99v%C9%99_mil%C3%A7%C9%99k_%28Raphidioptera%29_.jpg',
    'images/Raphidioptera_3.jpg',
    'images/Raphidioptera_4.jpg',
    'images/Raphidioptera_5.jpg',
    'images/Raphidioptera_6.jpg',
    'images/Raphidioptera_7.jpg',
    'images/Raphidioptera_8.jpg'
  ],
  'Coleoptera': [
    'images/Coleoptera_1.jpg',
    'images/Coleoptera_2.jpg',
    'images/Coleoptera_3.jpg',
    'images/Coleoptera_4.jpg',
    'images/Coleoptera_5.jpg',
    'images/Coleoptera_6.jpg',
    'images/Coleoptera_7.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/09/Lucanus_cervus.jpg',
    'images/Coleoptera_9.jpg',
    'images/Coleoptera_10.jpg',
    'images/Coleoptera_11.jpg'
  ],
  'Strepsiptera': [
    'https://upload.wikimedia.org/wikipedia/commons/1/19/Elenchus_koebelei.jpg',
    'images/Strepsiptera_2.jpg'
  ],
  'Mecoptera': [
    'https://upload.wikimedia.org/wikipedia/commons/e/e9/Skorpion_mil%C3%A7%C9%99k_%28Mecoptera%29.png',
    'images/Mecoptera_2.jpg',
    'images/Mecoptera_3.jpg',
    'images/Mecoptera_4.jpg',
    'images/Mecoptera_5.jpg',
    'images/Mecoptera_6.jpg',
    'images/Mecoptera_7.jpg',
    'images/Mecoptera_8.jpg',
    'images/Mecoptera_9.jpg'
  ],
  'Diptera': [
    'images/Diptera_1.jpg',
    'images/Diptera_2.jpg',
    'images/Diptera_3.jpg',
    'images/Diptera_4.jpg',
    'images/Diptera_5.jpg',
    'images/Diptera_6.jpg',
    'images/Diptera_7.jpg',
    'images/Diptera_8.jpg',
    'images/Diptera_9.jpg',
    'images/Diptera_10.jpg',
    'images/Diptera_11.jpg'
  ],
  'Lepidoptera': [
    'images/Lepidoptera_1.jpg',
    'images/Lepidoptera_2.jpg',
    'images/Lepidoptera_3.jpg',
    'images/Lepidoptera_4.jpg',
    'images/Lepidoptera_5.jpg',
    'images/Lepidoptera_6.jpg',
    'images/Lepidoptera_7.jpg',
    'images/Lepidoptera_8.jpg',
    'images/Lepidoptera_9.jpg',
    'images/Lepidoptera_10.jpg'
  ],
  'Hymenoptera': [
    'images/Hymenoptera_1.jpg',
    'images/Hymenoptera_2.jpg',
    'images/Hymenoptera_3.jpg',
    'images/Hymenoptera_4.jpg',
    'images/Hymenoptera_5.jpg',
    'images/Hymenoptera_6.jpg',
    'images/Hymenoptera_7.jpg',
    'images/Hymenoptera_8.jpg',
    'images/Hymenoptera_9.jpg',
    'images/Hymenoptera_10.jpg',
    'images/Hymenoptera_11.jpg',
    'images/Hymenoptera_12.jpg'
  ],
  'Zoraptera': [
    'images/Zoraptera_1.png',
    'images/Zoraptera_2.jpg',
    'images/Zoraptera_3.jpg'
  ],
  'Thysanoptera': [
    'images/Thysanoptera_1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Thysanoptera.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1b/Thrips_tabaci.jpg',
    'images/Thysanoptera_4.jpg'
  ],
  'Hemiptera': [
    'images/Hemiptera_1.jpg',
    'images/Hemiptera_2.jpg',
    'images/Hemiptera_3.png',
    'images/Hemiptera_4.jpg',
    'images/Hemiptera_5.jpg',
    'images/Hemiptera_6.jpg',
    'images/Hemiptera_7.jpg',
    'images/Hemiptera_8.jpg',
    'images/Hemiptera_9.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/80/Leptoglossus_occidentalis.1.jpg'
  ],
  'Neuroptera': [
    'images/Neuroptera_1.jpg',
    'images/Neuroptera_2.jpg'
  ],
  'Zygentoma': [
    'images/Zygentoma_1.jpg',
    'images/Zygentoma_2.jpg',
    'images/Zygentoma_3.jpg'
  ]
};

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
function photoHTML(url){return `<img src="${url}" alt="Unlabeled insect specimen photograph" referrerpolicy="no-referrer" loading="eager" decoding="async" onerror="this.parentElement.innerHTML='<div class=&quot;subtle&quot; style=&quot;padding:30px;text-align:center&quot;>Photo could not load. Check your internet connection, then try another question.</div>'">`}

const challengeBank = [
['Archaeognatha','A wingless insect is humped rather than flat, has three posterior filaments, and can spring into the air. Which order is it?','The humped jumping bristletails are Archaeognatha.',['Zygentoma','Grylloblattodea','Zoraptera']],
['Archaeognatha','You see a bristletail with very large eyes and a noticeably longer middle tail filament. Which order should you choose?','Archaeognatha are jumping bristletails; the humped body and long median filament separate them from silverfish.',['Zygentoma','Dermaptera','Plecoptera']],
['Odonata','An adult predator has an extremely long abdomen, enormous compound eyes, and two pairs of long transparent wings. Which order?','Dragonflies and damselflies are Odonata.',['Neuroptera','Ephemeroptera','Megaloptera']],
['Odonata','An aquatic nymph becomes a strong-flying adult dragonfly. What is the adult insect order?','Dragonflies and damselflies belong to Odonata.',['Ephemeroptera','Plecoptera','Trichoptera']],
['Grylloblattodea','A pale, wingless insect with long antennae is collected walking on snow and ice in a cold mountain habitat. Which order?','Extreme cold association is the signature clue for Grylloblattodea, the ice crawlers.',['Mantophasmatodea','Zoraptera','Orthoptera']],
['Grylloblattodea','Which order contains the rare rock crawlers or ice crawlers: elongated, wingless insects with long antennae and cerci?','Rock crawlers / ice crawlers are Grylloblattodea.',['Mantophasmatodea','Archaeognatha','Blattodea']],
['Mantophasmatodea','A wingless predatory insect resembles a cross between a mantis and a walking stick but lacks the classic grasping mantis forelegs. Which order?','That combination describes Mantophasmatodea, the heelwalkers/gladiators.',['Mantodea','Phasmatodea','Grylloblattodea']],
['Mantophasmatodea','Which order is nicknamed heelwalkers because these wingless predators hold the tips of their feet off the substrate?','Heelwalkers are Mantophasmatodea.',['Grylloblattodea','Mantodea','Embioptera']],
['Dermaptera','An elongate insect has a pair of unmistakable forceps at the end of its abdomen. Which order?','Rear forceps-like cerci are the classic Dermaptera character.',['Orthoptera','Plecoptera','Blattodea']],
['Dermaptera','The common name earwig should immediately trigger which order?','Earwigs are Dermaptera.',['Embioptera','Zoraptera','Psocodea']],
['Mantodea','The front legs are enlarged, spined, and folded for seizing prey; the head is triangular and mobile. Which order?','Raptorial praying forelegs identify Mantodea.',['Mantophasmatodea','Orthoptera','Phasmatodea']],
['Mantodea','A praying mantis specimen belongs to which order?','Mantises are Mantodea.',['Mantophasmatodea','Mecoptera','Neuroptera']],
['Ephemeroptera','An adult has short antennae, huge triangular forewings held vertically, and three long tail filaments. Which order?','Upright wings plus long tails identify Ephemeroptera.',['Plecoptera','Zygentoma','Odonata']],
['Ephemeroptera','You are choosing between a mayfly and a stonefly. The wings are held upright rather than flat over the abdomen. Which order?','Mayflies are Ephemeroptera and characteristically hold the wings upright.',['Plecoptera','Trichoptera','Neuroptera']],
['Trichoptera','A moth-like insect near a stream has very long antennae and hairy wings held like a little tent. Which order?','Hairy, tented wings distinguish Trichoptera from scaly Lepidoptera.',['Lepidoptera','Plecoptera','Mecoptera']],
['Trichoptera','Aquatic larvae build portable cases from bits of sand or plant material; the adult is moth-like. Which order?','Case-building aquatic larvae are a classic caddisfly clue: Trichoptera.',['Lepidoptera','Megaloptera','Ephemeroptera']],
['Siphonaptera','A tiny wingless ectoparasite is flattened side-to-side and has extremely powerful jumping hind legs. Which order?','Laterally compressed jumping ectoparasites are fleas, Siphonaptera.',['Psocodea','Thysanoptera','Zygentoma']],
['Siphonaptera','The common name flea maps to which retained insect order on your approved list?','Fleas are retained as Siphonaptera on your list.',['Mecoptera','Psocodea','Diptera']],
['Blattodea','A soft-bodied social insect is a termite. Under the modern classification used on your list, which order is it in?','Termites are included in Blattodea with cockroaches.',['Hymenoptera','Psocodea','Zoraptera']],
['Blattodea','A flattened oval insect with very long antennae and a shield-like pronotum looks unmistakably roach-like. Which order?','Cockroaches are Blattodea.',['Dermaptera','Orthoptera','Hemiptera']],
['Plecoptera','An aquatic-stream insect has long antennae, two posterior tails, and adult wings folded flat over the abdomen. Which order?','Two tails plus flat-folded wings is the stonefly pattern: Plecoptera.',['Ephemeroptera','Trichoptera','Neuroptera']],
['Plecoptera','A specimen resembles a mayfly but its wings lie over the back and it has two tails. Which order?','That is Plecoptera, not Ephemeroptera.',['Ephemeroptera','Megaloptera','Raphidioptera']],
['Embioptera','A slender insect lives inside silken galleries under bark; the silk is produced by enlarged front feet. Which order?','Silk-producing front tarsi are diagnostic for Embioptera.',['Zoraptera','Psocodea','Trichoptera']],
['Embioptera','The common name webspinner refers to which order?','Webspinners are Embioptera.',['Trichoptera','Thysanoptera','Neuroptera']],
['Orthoptera','An insect has massive femora on the hind legs for jumping and produces chirping sounds by stridulation. Which order?','Grasshoppers and crickets are Orthoptera.',['Mantodea','Dermaptera','Phasmatodea']],
['Orthoptera','Grasshoppers, crickets, locusts, and katydids all belong to which order?','These familiar jumping insects are Orthoptera.',['Phasmatodea','Hemiptera','Blattodea']],
['Phasmatodea','An herbivorous insect is almost indistinguishable from a twig, with a very long narrow body and legs. Which order?','Extreme stick/leaf mimicry identifies Phasmatodea.',['Mantophasmatodea','Mantodea','Orthoptera']],
['Phasmatodea','Walking sticks and leaf insects belong to which order?','Stick and leaf insects are Phasmatodea.',['Mantodea','Mantophasmatodea','Embioptera']],
['Psocodea','A wingless, flattened parasite is clinging tightly to feathers or hair on a host. Which order on your list includes it?','Parasitic lice are included in Psocodea.',['Siphonaptera','Thysanoptera','Zoraptera']],
['Psocodea','Booklice, barklice, and parasitic lice are combined into which modern order on your approved list?','They are grouped in Psocodea.',['Hemiptera','Siphonaptera','Embioptera']],
['Megaloptera','A very large soft-bodied insect has broad heavily veined wings; the male dobsonfly has enormous sickle-like mandibles. Which order?','Dobsonflies, alderflies, and fishflies are Megaloptera.',['Neuroptera','Raphidioptera','Trichoptera']],
['Megaloptera','An aquatic predatory larva called a hellgrammite will become an adult in which order?','Hellgrammites are larval dobsonflies in Megaloptera.',['Plecoptera','Neuroptera','Odonata']],
['Raphidioptera','A net-winged insect has a dramatically elongated prothorax that looks like a snake-like neck. Which order?','The long neck is the giveaway for Raphidioptera.',['Neuroptera','Megaloptera','Mecoptera']],
['Raphidioptera','The common name snakefly maps to which order?','Snakeflies are Raphidioptera.',['Mecoptera','Neuroptera','Megaloptera']],
['Coleoptera','The forewings are hardened into protective elytra that meet along a straight seam down the back. Which order?','Elytra are the defining visual shortcut for Coleoptera.',['Hemiptera','Dermaptera','Orthoptera']],
['Coleoptera','You are handed an ordinary beetle. Which insect order should you write?','Beetles are Coleoptera.',['Hemiptera','Neuroptera','Hymenoptera']],
['Strepsiptera','A tiny male parasite has very small club-like forewings but large fan-shaped hindwings. Which order?','Reduced forewings plus large hindwings are characteristic of male Strepsiptera.',['Diptera','Siphonaptera','Hymenoptera']],
['Strepsiptera','In which order do many females remain largely inside the body of another insect while the free-living males are bizarrely winged?','Twisted-wing parasites are Strepsiptera.',['Siphonaptera','Psocodea','Mecoptera']],
['Mecoptera','An insect has an elongated beak-like rostrum and the male abdomen curls upward into a scorpion-like genital bulb. Which order?','That combination is the classic scorpionfly, Mecoptera.',['Raphidioptera','Megaloptera','Diptera']],
['Mecoptera','Scorpionflies and hangingflies belong to which order?','They are Mecoptera.',['Raphidioptera','Siphonaptera','Neuroptera']],
['Diptera','An adult has exactly one functional pair of wings; the second pair is reduced to knob-like halteres. Which order?','One wing pair plus halteres identifies Diptera.',['Hymenoptera','Lepidoptera','Strepsiptera']],
['Diptera','Mosquitoes, house flies, gnats, and midges are all in which order?','True flies and mosquitoes are Diptera.',['Hymenoptera','Mecoptera','Neuroptera']],
['Lepidoptera','A winged adult has thousands of tiny overlapping scales on its wings and a caterpillar larval stage. Which order?','Scaly wings and caterpillars indicate Lepidoptera.',['Trichoptera','Neuroptera','Hymenoptera']],
['Lepidoptera','A specimen is clearly a butterfly or moth. Which order?','Butterflies and moths are Lepidoptera.',['Trichoptera','Diptera','Mecoptera']],
['Hymenoptera','A bee has two pairs of membranous wings, with the hind pair smaller and coupled to the forewings. Which order?','Bees belong to Hymenoptera.',['Diptera','Lepidoptera','Hemiptera']],
['Hymenoptera','Ants, bees, wasps, hornets, and sawflies all belong to which order?','Those groups are Hymenoptera.',['Blattodea','Coleoptera','Diptera']],
['Zoraptera','A minute, soft-bodied, termite-like insect is found under bark in decaying wood; both winged and wingless forms exist. Which order?','That rare combination describes Zoraptera.',['Psocodea','Blattodea','Grylloblattodea']],
['Zoraptera','The unusual common name angel insect refers to which order?','Angel insects / zorapterans are Zoraptera.',['Embioptera','Mantophasmatodea','Psocodea']],
['Thysanoptera','Under magnification, a tiny slender insect has extremely narrow wings edged by long hairs like a fringe. Which order?','Narrow fringed wings identify Thysanoptera.',['Trichoptera','Psocodea','Diptera']],
['Thysanoptera','The common name thrips belongs to which order?','Thrips are Thysanoptera.',['Trichoptera','Hemiptera','Psocodea']],
['Hemiptera','An insect feeds through a distinct piercing-sucking beak or rostrum; it could be an aphid, cicada, hopper, or true bug. Which order?','Piercing-sucking rostrum plus those common names indicates Hemiptera.',['Coleoptera','Hymenoptera','Orthoptera']],
['Hemiptera','A stink bug or assassin bug should be placed in which order?','True bugs such as stink bugs and assassin bugs are Hemiptera.',['Coleoptera','Dermaptera','Neuroptera']],
['Neuroptera','A delicate adult lacewing has two pairs of similarly sized transparent wings packed with a fine network of veins. Which order?','Delicate net-veined wings are characteristic of Neuroptera.',['Megaloptera','Raphidioptera','Odonata']],
['Neuroptera','Lacewings, antlions, and owlflies are members of which order?','Those groups make up Neuroptera.',['Megaloptera','Raphidioptera','Mecoptera']],
['Zygentoma','A wingless, flattened, carrot-shaped insect has long antennae and three long tail filaments but does not have the humped jumping form of a bristletail. Which order?','That is the silverfish body plan: Zygentoma.',['Archaeognatha','Plecoptera','Dermaptera']],
['Zygentoma','Silverfish and firebrats belong to which order on your list?','Silverfish are Zygentoma (formerly grouped under Thysanura).',['Archaeognatha','Psocodea','Zoraptera']]
];
let stats = JSON.parse(localStorage.getItem('insectOrderStats')||'{}');
orders.forEach(o=>{if(!stats[o.order]) stats[o.order]={c:0,w:0}});
let totalAnswered=Number(localStorage.getItem('insectTotalAnswered')||0), totalCorrect=Number(localStorage.getItem('insectTotalCorrect')||0);
let quiz=[],qIndex=0,answered=false,practiceView='setup',setAnswered=0,setCorrect=0,setReview=[];
let flashDeck=[...orders],flashIndex=0;
let speedTimer=null,speedLeft=60,speedPoints=0,speedCurrent=null,speedReview=[],speedUsedQuestions=new Set();

function save(){localStorage.setItem('insectOrderStats',JSON.stringify(stats));localStorage.setItem('insectTotalAnswered',totalAnswered);localStorage.setItem('insectTotalCorrect',totalCorrect);renderStats()}
function getCookie(name){const match=document.cookie.split('; ').find(row=>row.startsWith(`${encodeURIComponent(name)}=`));return match?decodeURIComponent(match.split('=').slice(1).join('=')):''}
function setCookie(name,value,days=365){document.cookie=`${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${days*24*60*60}; path=/; SameSite=Lax`}
function getStoredHighScore(){return getCookie('insectSpeedHighScore')||localStorage.getItem('insectSpeedHighScore')||'0'}
function storeHighScore(score){setCookie('insectSpeedHighScore',String(score));localStorage.setItem('insectSpeedHighScore',String(score))}
function renderSpeedHighScore(){const highScore=document.getElementById('speedHighScore');highScore.textContent=`High score: ${getStoredHighScore()}`}
function sample(arr){return arr[Math.floor(Math.random()*arr.length)]}
function shuffled(arr){return [...arr].sort(()=>Math.random()-.5)}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function makeChoices(correct,pool=orders.map(o=>o.order)){let vals=[correct,...shuffled(pool.filter(x=>x!==correct)).slice(0,3)];return shuffled(vals)}
function weightedOrder(){
  const bag=[]; orders.forEach(o=>{const s=stats[o.order];const weight=2+Math.max(0,s.w-s.c)*2+(s.c+s.w===0?3:0);for(let i=0;i<weight;i++)bag.push(o)});return sample(bag)
}
function confusableFor(order){let g=confusionGroups.find(g=>g.includes(order));return g?g:orders.map(o=>o.order)}
const orderBasedPracticeModes=new Set(['common','traits','feature','fill','visual','weak']);
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
  let o=(mode==='weak')?weightedOrder():sample(orders);
  if(mode==='weak') type=sample(['common','traits','feature','confusion','scenario']);
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
  const pct=(qIndex/quiz.length)*100;
  document.getElementById('quizArea').innerHTML=`
    <div class="progress"><div style="width:${pct}%"></div></div>
    <div class="eyebrow">${esc(q.label)} • ${qIndex+1} of ${quiz.length}</div>
    <div class="question">${q.prompt}</div>
    ${q.visual?`<div class="visual-box">${photoHTML(q.photoUrl)}</div>`:''}
    ${q.type==='fill'?`<div class="fill-answer"><input id="fillAnswer" type="text" autocomplete="off" placeholder="Type the order name" aria-label="Order name"><button class="primary" id="submitFill" type="button">Check answer</button></div>`:`<div class="options">${q.choices.map((c,i)=>`<button class="option" data-choice="${esc(c)}"><span class="num">${i+1}</span>${esc(c)}</button>`).join('')}</div>`}
    <div class="explain" id="explain"></div>
    <div class="next-row" style="justify-content:space-between;align-items:center;">
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="secondary" id="skipQ" type="button">Unsure / Skip</button><button class="secondary" id="finishSet" type="button">Finish early</button></div>
      <button class="primary" id="nextQ" disabled>Next question →</button>
    </div>`;
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
    e.innerHTML=`<strong>Skipped.</strong> ${esc(q.why)}${q.visual?`<div class="photo-source">Photo via Wikimedia Commons. <a href="${commonsFilePageFromUrl(q.photoUrl)}" target="_blank" rel="noopener">Source, photographer, and license</a></div>`:''}`;
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
  totalAnswered++;setAnswered++;if(ok){totalCorrect++;setCorrect++;stats[q.order].c++}else stats[q.order].w++;
  const e=document.getElementById('explain');e.classList.add('show');
  const answerMarkup=fillAnswerMarkup(typedDisplay,q.correct);
  setReview.push({q,answer:typedDisplay,ok});
  e.innerHTML=`<strong class="${ok?'feedback-correct':'feedback-incorrect'}">${ok?'Correct.':'Not quite.'}</strong> ${esc(q.why)}${ok?'':`<div class="fill-correction">Your answer: ${answerMarkup}<br>Correct spelling: <strong>${esc(q.correct)}</strong></div>`}`;
  document.getElementById('nextQ').disabled=false;save();
}
function fillAnswerMarkup(answer,correct){
  const answerChars=[...answer],correctChars=[...correct];
  return answerChars.map((char,index)=>char.toLowerCase()===correctChars[index]?.toLowerCase()?esc(char):`<span class="fill-issue"><s>${esc(char)}</s></span>`).join('');
}
function answerQuestion(btn,q){
  if(answered)return;answered=true;
  const choice=btn.dataset.choice, ok=choice===q.correct;
  document.querySelectorAll('.option').forEach(b=>{if(b.dataset.choice===q.correct)b.classList.add('correct');else if(b===btn)b.classList.add('wrong');b.disabled=true});
  totalAnswered++;setAnswered++;if(ok){totalCorrect++;setCorrect++;stats[q.order].c++}else stats[q.order].w++;
  setReview.push({q,answer:choice,ok});
  const e=document.getElementById('explain');e.classList.add('show');e.innerHTML=`<strong class="${ok?'feedback-correct':'feedback-incorrect'}">${ok?'Correct.':'Not quite.'}</strong> ${esc(q.why)}${q.visual?`<div class="photo-source">Photo via Wikimedia Commons. <a href="${commonsFilePageFromUrl(q.photoUrl)}" target="_blank" rel="noopener">Source, photographer, and license</a></div>`:''}`;
  document.getElementById('nextQ').disabled=false;save();
}
function renderQuizEnd(){
  document.body.classList.remove('fill-active');
  practiceView='complete';
  const skipped=quiz.length-setAnswered;
  const accuracy=setAnswered?Math.round(setCorrect/setAnswered*100):0;
  const heading=setAnswered===0?'Set ended':accuracy>=80?'Set complete':accuracy>=50?'Good effort':'Keep practicing';
  const review=setReview.map((item,index)=>`<div class="review-item"><div class="review-question">${index+1}. ${item.q.prompt}</div><div class="review-answer ${item.skipped?'':'review-'+(item.ok?'correct':'incorrect')}"><strong>Your answer:</strong> ${esc(item.answer)}<br><strong>Correct answer:</strong> ${esc(item.q.correct)}</div></div>`).join('');
  document.getElementById('quizArea').innerHTML=`<div class="speed-end"><div class="eyebrow">Set complete</div><h2>${heading}</h2><p class="subtle">Review your results, then return to setup when you are ready for another round.</p><div class="set-stats"><div class="set-stat"><div class="big">${setCorrect}/${setAnswered}</div><div class="lbl">correct</div></div><div class="set-stat"><div class="big">${accuracy}%</div><div class="lbl">accuracy</div></div><div class="set-stat"><div class="big">${skipped}</div><div class="lbl">skipped</div></div></div><button class="primary" id="continuePractice">Continue practicing</button><div class="set-review"><h3>Question review</h3><div class="review-list">${review||'<p class="subtle">No questions were answered before the set ended.</p>'}</div></div></div>`;
  document.getElementById('continuePractice').onclick=renderPracticeSetup;
}

function renderPracticeSetup(){
  practiceView='setup';
  document.body.classList.remove('fill-active');
  document.getElementById('quizArea').innerHTML='';
  document.getElementById('practiceSetup').classList.remove('hidden');
}

function renderStats(){
  document.getElementById('statAnswered').textContent=totalAnswered;
  document.getElementById('statAccuracy').textContent=totalAnswered?Math.round(totalCorrect/totalAnswered*100)+'%':'—';
  const ranked=orders
    .map(o=>{const s=stats[o.order],n=s.c+s.w;return {o,n,acc:n?s.c/n:1}})
    .sort((a,b)=>a.acc-b.acc||b.n-a.n);

  document.getElementById('weakList').innerHTML=ranked.map(x=>`<div class="weak"><span>${x.o.order}</span><span class="${x.acc<.7?'hot':'cool'}">${x.n?Math.round(x.acc*100)+'%':'0%'}</span></div>`).join('');
}

function renderFlash(){
  const o=flashDeck[flashIndex%flashDeck.length],mode=document.getElementById('flashMode').value;
  document.getElementById('flashCard').classList.remove('flipped');
  const front=mode==='order'?`<div class="eyebrow">Order ${flashIndex+1}/${flashDeck.length}</div><h2>${esc(o.order)}</h2><p class="subtle">Click or press Space to flip</p>`:mode==='common'?`<div class="eyebrow">Common name</div><h2>${esc(o.common)}</h2><p class="subtle">What order is this?</p>`:`<div class="eyebrow">Recognition clue</div><h2 style="font-size:1.55rem">${esc(o.key)}</h2><p class="subtle">Name the order</p>`;
  document.getElementById('flashFront').innerHTML=front;
  document.getElementById('flashBack').innerHTML=`<div class="eyebrow">${esc(o.common)}</div><h2>${esc(o.order)}</h2><strong>Best giveaway</strong><p>${esc(o.key)}</p><strong>Characteristics</strong><ul class="trait-list">${o.traits.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><div>${o.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>`;
}
function moveFlash(d){flashIndex=(flashIndex+d+flashDeck.length)%flashDeck.length;renderFlash()}

function startSpeed(){
  renderSpeedHighScore();
  clearInterval(speedTimer);speedLeft=60;speedPoints=0;speedReview=[];speedUsedQuestions=new Set();document.getElementById('timer').textContent='1:00';document.getElementById('speedScore').textContent='Score: 0';document.getElementById('startSpeed').disabled=true;nextSpeed();
  speedTimer=setInterval(()=>{speedLeft--;document.getElementById('timer').textContent=`0:${String(speedLeft).padStart(2,'0')}`;if(speedLeft<=0)endSpeed()},1000);
}
function nextSpeed(){
  speedCurrent=uniqueQuestionFor(Math.random()<.6?'common':'traits',speedUsedQuestions);
  document.getElementById('speedArea').innerHTML=`<div class="eyebrow">Rapid fire</div><div class="question">${speedCurrent.prompt}</div><div class="options">${speedCurrent.choices.map((c,i)=>`<button class="option speedOpt" data-choice="${esc(c)}"><span class="num">${i+1}</span>${esc(c)}</button>`).join('')}</div>`;
  document.querySelectorAll('.speedOpt').forEach(b=>b.onclick=()=>{const choice=b.dataset.choice;const ok=choice===speedCurrent.correct;speedReview.push({q:speedCurrent,answer:choice,ok});totalAnswered++;if(ok){speedPoints++;totalCorrect++;stats[speedCurrent.order].c++}else stats[speedCurrent.order].w++;document.getElementById('speedScore').textContent='Score: '+speedPoints;save();nextSpeed()});
}
function endSpeed(){clearInterval(speedTimer);speedTimer=null;const previous=Number(getStoredHighScore());if(speedPoints>previous)storeHighScore(speedPoints);renderSpeedHighScore();document.getElementById('startSpeed').disabled=false;const review=speedReview.map((item,index)=>`<div class="review-item"><div class="review-question">${index+1}. ${item.q.prompt}</div><div class="review-answer review-${item.ok?'correct':'incorrect'}"><strong>Your answer:</strong> ${esc(item.answer)}<br><strong>Correct answer:</strong> ${esc(item.q.correct)}</div></div>`).join('');document.getElementById('speedArea').innerHTML=`<div class="speed-end"><div class="eyebrow">Time</div><h2>${speedPoints}</h2><p class="subtle">correct answers in 60 seconds</p><div class="set-review"><h3>Question review</h3><div class="review-list">${review||'<p class="subtle">No questions were answered before time ran out.</p>'}</div></div></div>`}

function renderReference(){
  const q=document.getElementById('refSearch').value.toLowerCase(),f=document.getElementById('refFilter').value;
  const arr=orders.filter(o=>(f==='all'||o.meta===f)&&([o.order,o.common,o.key,...o.traits,...o.tags].join(' ').toLowerCase().includes(q)));
  document.getElementById('refGrid').innerHTML=arr.map(o=>`<div class="ref-card"><h3>${esc(o.order)}</h3><div class="common">${esc(o.common)}</div><div style="margin-top:7px"><strong>${esc(o.key)}</strong></div><ul>${o.traits.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>${o.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>`).join('');
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
function toggleProgress(){const drawer=document.querySelector('.side');const toggles=document.querySelectorAll('#progressToggle,#progressInnerToggle');const innerToggle=document.getElementById('progressInnerToggle');const open=drawer.classList.toggle('open');toggles.forEach(toggle=>toggle.setAttribute('aria-expanded',String(open)));innerToggle.textContent=open?'<':'Progress';innerToggle.setAttribute('aria-label',open?'Close progress drawer':'Open progress drawer');document.getElementById('progressToggle').classList.toggle('is-hidden',open)}
document.getElementById('progressToggle').onclick=toggleProgress;
document.getElementById('progressInnerToggle').onclick=toggleProgress;
document.getElementById('flashCard').onclick=()=>document.getElementById('flashCard').classList.toggle('flipped');
document.getElementById('flipFlash').onclick=()=>document.getElementById('flashCard').classList.toggle('flipped');
document.getElementById('prevFlash').onclick=()=>moveFlash(-1);document.getElementById('nextFlash').onclick=()=>moveFlash(1);
document.getElementById('shuffleFlash').onclick=()=>{flashDeck=shuffled(orders);flashIndex=0;renderFlash()};
document.getElementById('flashMode').onchange=renderFlash;
document.getElementById('startSpeed').onclick=startSpeed;
renderSpeedHighScore();
document.getElementById('refSearch').oninput=renderReference;document.getElementById('refFilter').onchange=renderReference;
document.getElementById('resetProgress').onclick=()=>{if(confirm('Reset all saved study progress?')){stats={};orders.forEach(o=>stats[o.order]={c:0,w:0});totalAnswered=0;totalCorrect=0;save()}};
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

renderStats();renderReference();renderFlash();renderLesson();renderPracticeSetup();setTab('learn');
syncCountOptions();
preloadAllPhotos();