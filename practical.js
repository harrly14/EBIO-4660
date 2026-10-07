/* Practical 1 content is deliberately data-driven so later course notes can extend it. */
const anatomy = [
  ['External anatomy', 'Head', 'compound eyes; ocellus; antenna; pedicel; scape', 'Head structures used for vision and sensory input; the pedicel and scape are antenna segments.'],
  ['External anatomy', 'Mouth', 'clypeus; labrum; mandibles; maxilla; maxillary palp; labium; labial palp', 'Mouth structures to identify on the insect head.'],
  ['External anatomy', 'Thorax', 'prothorax; mesothorax; metathorax; nota; pleura; sterna', 'The thorax is divided into pro-, meso-, and metathorax; nota, pleura, and sterna are regional surfaces.'],
  ['External anatomy', 'Leg', 'coxa; trochanter; femur; tibia; tarsus; tarsomere; tarsal claw', 'Leg segments run from the body outward: coxa → trochanter → femur → tibia → tarsus; the tarsus contains tarsomeres and ends in a tarsal claw.'],
  ['External anatomy', 'Abdomen', 'spiracles; cerci; sterna; terga', 'Identify spiracles and distinguish abdominal sterna (ventral) from terga (dorsal); cerci occur at the posterior end.'],
  ['Internal anatomy', 'Circulatory system', 'heart; aorta; dorsal vessel', 'Moves nutrients, metabolic waste, and hormones.'],
  ['Internal anatomy', 'Respiratory system', 'trunk; tracheoles; taenidea', 'Delivers oxygen to cells and removes carbon dioxide.'],
  ['Internal anatomy', 'Digestive system', 'crop; proventriculus; gastric caecum; ventriculus; peritrophic membrane; Malpighian tubule; ileum; colon; rectum', 'Processes and absorbs nutrients from food.'],
  ['Internal anatomy', 'Nervous system', 'ganglia', 'Receives and responds to sensory input from internal and external sources.']
];
const anatomyDetails = {
  'compound eyes': ['head', 'used for vision'], ocellus: ['head', 'used for vision'],
  antenna: ['head', 'sensory input'], pedicel: ['antenna', 'an antenna segment'], scape: ['antenna', 'an antenna segment'],
  clypeus: ['mouth', 'attached to the labrum'], labrum: ['mouth', 'a movable flap covering the mouth; it contains sensory hairs'],
  mandibles: ['mouth', 'cut and grind food'], maxilla: ['mouth', 'manipulate food'],
  'maxillary palp': ['maxilla', 'has sensory hairs with mechano- and chemoreceptors'],
  labium: ['mouth', 'supports food in the mouth cavity'], 'labial palp': ['labium', 'has sensory hairs and helps manipulate food'],
  prothorax: ['thorax', 'the anterior thoracic segment'], mesothorax: ['thorax', 'the middle thoracic segment'],
  metathorax: ['thorax', 'the posterior thoracic segment'], nota: ['thorax', 'the dorsal thoracic region'],
  pleura: ['thorax', 'the lateral thoracic regions'], sterna: ['thorax', 'the ventral thoracic region'],
  coxa: ['leg', 'articulates the leg with the thorax'], trochanter: ['leg', 'a leg segment between the coxa and femur'],
  femur: ['leg', 'often the stoutest leg segment'], tibia: ['leg', 'the segment following the femur'],
  tarsus: ['leg', 'contains multiple tarsomeres'], tarsomere: ['tarsus', 'one of the segments that make up the tarsus'],
  'tarsal claw': ['pretarsus', 'a claw at the end of the leg'], spiracles: ['abdomen', 'openings associated with respiration'],
  cerci: ['posterior abdomen', 'small appendages at the end of the abdomen'], terga: ['dorsal body surface', 'the dorsal sclerites'],
  heart: ['abdomen', 'the portion of the dorsal vessel perforated with ostia'],
  aorta: ['anterior to the heart', 'the portion of the dorsal vessel lacking ostia'],
  'dorsal vessel': ['posterior abdomen into the head region', 'the dorsal longitudinal vessel carrying hemolymph'],
  trunk: ['throughout the body', 'a distinct tracheal branch'],
  tracheoles: ['throughout the body', 'the smallest tubes where gas exchange occurs'],
  taenidea: ['tracheal system', 'the supplied guide term; the detailed notes do not clearly define this term; the notes use a different spelling'],
  crop: ['foregut', 'storage and initial food processing'], proventriculus: ['foregut', 'mechanical breakdown and initial food processing'],
  'gastric caecum': ['digestive system', 'the source materials conflict on foregut versus midgut placement; placement is not tested'],
  ventriculus: ['midgut', 'digestion and absorption'],
  'peritrophic membrane': ['midgut', 'the guide term for the digestive matrix; terminology conflicts with the notes'],
  'Malpighian tubule': ['hindgut', 'excretion and water regulation'], ileum: ['hindgut', 'excretion and water regulation'],
  colon: ['hindgut', 'excretion and water regulation'], rectum: ['hindgut', 'excretion and water regulation'],
  ganglia: ['nervous system', 'receive and respond to sensory input']
};
const anatomyAliases = { taenidea: ['taenidia'], 'peritrophic membrane': ['peritrophic matrix'], 'dorsal vessel': ['dorsal longitudinal vessel'] };
const morphology = [
  ['Leg types', 'raptorial; cursorial; fossorial; saltatorial; natatorial; scansorial', 'Raptorial forelegs grasp prey; cursorial legs are long and slender for running; fossorial forelegs dig; saltatorial hind femora are enlarged for jumping; natatorial legs are oar-like and hairy for swimming; scansorial legs are hook-shaped for clinging.'],
  ['Mouthpart types', 'mandibulate; piercing/sucking; siphoning; sponging', 'Mandibulate mouthparts bite and chew solid food; piercing/sucking mouthparts take liquid food through stylets; siphoning mouthparts use elongated fused maxillae; sponging mouthparts use a modified labellum.'],
  ['Wing types', 'fringed wings; hemelytra; elytra; scaly wings; tegmina', 'Fringed wings are surrounded by hairs; hemelytra are basally hardened and apically membranous; elytra are entirely hardened forewings; scaly wings are covered with scales; tegmina are leathery forewings.'],
  ['Antenna types', 'plumose; setaceous; moniliform; filiform; serrate; geniculate/elbowed; aristate; clavate/clubbed; lamellate', 'Plumose antennae are feather-like; setaceous are hair-like; moniliform are bead-like; filiform are thread-like; serrate are saw-like; geniculate are elbowed; aristate have bristles; clavate are clubbed; lamellate are a special case of clubbed.']
];
const morphologyTypes = morphology.flatMap(([category, terms, descriptions]) => terms.split('; ').map(term => ({
  category, term, description: descriptions.split('; ').find(description => description.toLowerCase().startsWith(term.split('/')[0].toLowerCase())) || descriptions
})));
const sourceClarifications = [
  'The official guide says Coccoidae; the detailed notes and key say Coccoidea.',
  'The official guide places gastric caecum under the foregut; the detailed notes place caeca with the midgut.',
  'The official guide says dorsal vessel; the detailed notes say dorsal longitudinal vessel.',
  'The official guide says taenidea; the detailed notes do not clearly define that term.',
  'The official guide says peritrophic membrane; the detailed notes say peritrophic matrix.'
];
const groups = [
  ['Arthropoda', 'Phylum', 'Hexapoda'],
  ['Hexapoda', 'Subphylum', 'Arthropoda'],
  ['Entognatha', 'Class', 'Collembola, Diplura, Protura'],
  ['Insecta', 'Class', 'Archaeognatha, Zygentoma, Ephemeroptera, Odonata, Orthoptera, Phasmatodea, Dermaptera, Plecoptera, Blattodea, Mantodea, Hemiptera, Psocodea, Thysanoptera'],
  ['Apterygote', 'Grouping', 'Archaeognatha; Zygentoma'],
  ['Paleoptera', 'Grouping', 'Ephemeroptera; Odonata'],
  ['Neoptera', 'Grouping', 'Polyneoptera; Dictyoptera; Paraneoptera'],
  ['Polyneoptera', 'Grouping', 'Orthoptera; Phasmatodea; Dermaptera; Plecoptera'],
  ['Dictyoptera', 'Grouping', 'Blattodea; Mantodea'],
  ['Paraneoptera', 'Grouping', 'Hemiptera; Psocodea; Thysanoptera'],
  ['Odonata', 'Order', 'Anisoptera; Zygoptera'],
  ['Orthoptera', 'Order', 'Caelifera; Ensifera'],
  ['Hemiptera', 'Order', 'Sternorrhyncha; Auchenorrhyncha; Heteroptera']
];
const orders = 'Collembola|Diplura|Protura|Archaeognatha|Zygentoma|Ephemeroptera|Odonata|Orthoptera|Phasmatodea|Dermaptera|Plecoptera|Blattodea|Mantodea|Hemiptera|Psocodea|Thysanoptera'.split('|');
const suborders = 'Anisoptera|Zygoptera|Caelifera|Ensifera|Sternorrhyncha|Auchenorrhyncha|Heteroptera'.split('|');
const families = 'Aeshnidae|Libellulidae|Acrididae|Gryllidae|Tettigoniidae|Rhaphidophoridae|Aphididae|Coccoidae|Cicadidae|Membracidae|Cicadellidae|Cercopidae|Fulgoroidea|Belostomatidae|Corixidae|Gerridae|Cimicidae|Pentatomidae|Scutelleridae|Reduviidae|Coreidae|Lygaeidae|Miridae'.split('|');
const comparisonData = [
  ['Archaeognatha vs Zygentoma', 'Both are wingless, ametabolous, indirectly fertilized, and have a long caudal filament plus two cerci. The supplied notes give monocondylic mandibles for Archaeognatha but no contrasting Zygentoma character.'],
  ['Ephemeroptera vs Plecoptera', 'Ephemeroptera have aquatic juveniles, a subimago, and adults that live minutes to days without feeding; Plecoptera have aquatic nymphs and membranous forewings rather than tegmina.'],
  ['Anisoptera vs Zygoptera', 'Anisoptera have robust bodies, powerful flight, and wings held horizontally; Zygoptera have delicate bodies, similar forewings and hindwings, and typically hold wings vertically.'],
  ['Aeshnidae vs Libellulidae', 'Aeshnidae have similar wing triangles pointing the same direction and no foot-shaped anal loop; Libellulidae have different triangles and a foot-shaped anal loop.'],
  ['Caelifera vs Ensifera', 'Caelifera have shorter antennae, a small ovipositor, and tympana on the first abdominal segment; Ensifera have longer antennae, usually long ovipositors, and tympana when present on the fore tibiae.'],
  ['Gryllidae vs Tettigoniidae', 'Both have long antennae and fore-tibial tympana, but Gryllidae have 3 tarsomeres and Tettigoniidae have 4; Tettigoniidae also have a blade-like ovipositor.'],
  ['Tettigoniidae vs Rhaphidophoridae', 'Both have long antennae and 4 tarsomeres; Tettigoniidae have fore-tibial tympana, while Rhaphidophoridae lack tympanal organs entirely and are wingless.'],
  ['Aphididae vs Coccoidea', 'Aphididae have cornicles and always three pairs of legs; Coccoidea lack cornicles and females are often legless.'],
  ['Cicadellidae vs Cercopidae', 'Cicadellidae have rows of smaller hind-tibial spines; Cercopidae have 1–2 stout spines and an apical ring of spines.'],
  ['Membracidae vs other Auchenorrhyncha', 'Membracidae have a pronotum greatly expanded and extending over the abdomen.'],
  ['Fulgoroidea vs other Auchenorrhyncha', 'Fulgoroidea have aristate antennae with a bulbous pedicel below the eyes and a Y-shaped anal vein.'],
  ['Belostomatidae vs Corixidae', 'Belostomatidae have large raptorial forelegs and a relatively long thin beak; Corixidae have reduced forelegs with scoop-shaped tarsi and a short broad rounded beak.'],
  ['Belostomatidae vs Gerridae', 'Belostomatidae are predatory with large raptorial forelegs; Gerridae live on the water surface and have very long slender middle and hind legs.'],
  ['Pentatomidae vs Scutelleridae', 'Pentatomidae have a shield-shaped body, 5-segmented antennae, and a large scutellum; Scutelleridae have a scutellum that completely covers the abdomen and wings.'],
  ['Coreidae vs Lygaeidae', 'Both have 4-segmented beaks, but Coreidae have many veins in the wing membrane, while Lygaeidae have 4–5 distinct membrane veins and simple forelegs.'],
  ['Miridae vs Lygaeidae', 'Miridae have a cuneus and 1–2 closed cells in the membrane and lack ocelli; Lygaeidae lack a cuneus and have 4–5 membrane veins.']
];
const questionBankExtras = [
  { type: 'select-all', category: 'Select all', taxon: 'Ephemeroptera', prompt: 'Which statements are true of Ephemeroptera?', answer: ['aquatic juveniles', 'a subimago stage', 'adults live minutes to days and do not feed'], choices: ['aquatic juveniles', 'a subimago stage', 'adults live minutes to days and do not feed', 'hindwing has a foot-shaped anal loop', 'forewings are membranous rather than tegmina', 'females are often legless'], explanation: 'The supplied notes support aquatic juveniles, a subimago stage, and short-lived non-feeding adults.' },
  { type: 'select-all', category: 'Select all', taxon: 'Odonata', prompt: 'Which statements are true of Odonata?', answer: ['predatory nymphs and adults', 'nymphal labium forms a hinged mask with two claws', 'mate in a pinwheel formation'], choices: ['predatory nymphs and adults', 'nymphal labium forms a hinged mask with two claws', 'mate in a pinwheel formation', 'adults live minutes to days and do not feed', 'forewings are entirely hardened'], explanation: 'These three statements are directly supported by the Odonata notes.' },
  { type: 'select-all', category: 'Select all', taxon: 'Hemiptera', prompt: 'Which statements are true of Hemiptera?', answer: ['piercing-sucking rostrum/beak', 'postclypeus swollen for cibarial pump', 'tarsi no more than 3 tarsomeres'], choices: ['piercing-sucking rostrum/beak', 'postclypeus swollen for cibarial pump', 'tarsi no more than 3 tarsomeres', 'forewings always entirely hardened', 'mandibulate mouthparts'], explanation: 'These are the Hemiptera synapomorphies listed in the supplied notes.' },
  { type: 'reverse-anatomy', category: 'Reverse anatomy', prompt: 'Which structure cuts and grinds food?', answer: 'mandibles', choices: ['mandibles', 'labrum', 'maxilla', 'labium'], explanation: 'The notes define mandibles as hardened structures to cut and grind food.' },
  { type: 'reverse-anatomy', category: 'Reverse anatomy', prompt: 'Which structure is the portion of the dorsal vessel lacking ostia?', answer: 'aorta', choices: ['aorta', 'heart', 'tracheoles', 'ganglia'], explanation: 'The aorta is anterior to the heart and lacks ostia.' },
  { type: 'reverse-anatomy', category: 'Reverse anatomy', prompt: 'Which respiratory structure is the smallest tube where gas exchange occurs?', answer: 'tracheoles', choices: ['tracheoles', 'trunk', 'aorta', 'spiracles'], explanation: 'The notes identify tracheoles as the smallest tubes where actual gas exchange occurs.' },
  { type: 'mystery-specimen', category: 'Mystery specimen', taxon: 'Aeshnidae', prompt: 'A specimen has similar forewing and hindwing triangles pointing the same direction, and no foot-shaped anal loop. Which family is it?', answer: 'Aeshnidae', choices: ['Aeshnidae', 'Libellulidae', 'Gryllidae', 'Cercopidae'], explanation: 'Those are the supplied key characters for Aeshnidae.' },
  { type: 'mystery-specimen', category: 'Mystery specimen', taxon: 'Corixidae', prompt: 'A specimen has reduced forelegs with scoop-shaped tarsi and a short, broad, rounded beak. Which family is it?', answer: 'Corixidae', choices: ['Corixidae', 'Belostomatidae', 'Gerridae', 'Miridae'], explanation: 'Those are the supplied key characters for Corixidae.' },
  { type: 'ecology-life-history', category: 'Ecology/life history', taxon: 'Belostomatidae', prompt: 'Which family has males that carry eggs on their backs?', answer: 'Belostomatidae', choices: ['Belostomatidae', 'Cimicidae', 'Aphididae', 'Gryllidae'], explanation: 'The supplied notes state that Belostomatidae males carry eggs on their backs.' },
  { type: 'ecology-life-history', category: 'Ecology/life history', taxon: 'Cimicidae', prompt: 'Which family practices traumatic (hemocoelic) insemination?', answer: 'Cimicidae', choices: ['Cimicidae', 'Coccoidae', 'Belostomatidae', 'Acrididae'], explanation: 'The supplied notes identify traumatic hemocoelic insemination in Cimicidae.' },
  { type: 'functional-morphology', category: 'Functional morphology', prompt: 'Which leg type has an enlarged hind femur for jumping?', answer: 'saltatorial', choices: ['saltatorial', 'raptorial', 'fossorial', 'natatorial'], explanation: 'Saltatorial legs have enlarged hind femora and are used for jumping.' },
  { type: 'functional-morphology', category: 'Functional morphology', prompt: 'Which leg type has oar-like, hairy legs for swimming?', answer: 'natatorial', choices: ['natatorial', 'cursorial', 'scansorial', 'raptorial'], explanation: 'The notes define natatorial legs as oar-like and hairy for swimming.' },
  { type: 'functional-morphology', category: 'Functional morphology', prompt: 'Which leg type has forelegs for grasping prey?', answer: 'raptorial', choices: ['raptorial', 'fossorial', 'saltatorial', 'cursorial'], explanation: 'The notes define raptorial forelegs as grasping prey.' }
];
const questionBankExtrasWithComparisons = [
  ...questionBankExtras,
  ...comparisonData.map(([pair, distinction]) => ({ type: 'comparison', category: 'Comparison', prompt: `Which distinction is supported for <strong>${pair}</strong>?`, answer: distinction, choices: [distinction, ...comparisonData.filter(item => item[0] !== pair).slice(0, 3).map(item => item[1])], explanation: distinction })),
  { type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Aphididae', prompt: 'Do Aphididae have cornicles near the posterior end of the abdomen?', answer: 'Yes', choices: ['Yes', 'No'], explanation: 'The Hemiptera key uses cornicles to separate Aphididae from Coccoidea.' },
  { type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Rhaphidophoridae', prompt: 'Do Rhaphidophoridae lack tympanal organs entirely?', answer: 'Yes', choices: ['Yes', 'No'], explanation: 'The supplied Orthoptera notes state that Rhaphidophoridae lack tympanal organs entirely.' }
];
const keyFamilies = { Odonata: ['Aeshnidae', 'Libellulidae'], Orthoptera: ['Acrididae', 'Gryllidae', 'Tettigoniidae', 'Rhaphidophoridae'], Hemiptera: ['Aphididae', 'Coccoidae', 'Fulgoroidea', 'Cicadidae', 'Membracidae', 'Cercopidae', 'Cicadellidae', 'Belostomatidae', 'Corixidae', 'Gerridae', 'Cimicidae', 'Pentatomidae', 'Scutelleridae', 'Reduviidae', 'Coreidae', 'Lygaeidae', 'Miridae'] };
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
const list = value => `<ul>${value.split(';').map(item => `<li>${esc(item.trim())}</li>`).join('')}</ul>`;
let practicalState = { tab: 'learn', score: 0, asked: 0, flashIndex: 0, flashFlipped: false, key: {} };
function getProgress() { try { return JSON.parse(localStorage.getItem('ebioPracticalProgress') || '{"answered":0,"correct":0,"topics":{},"misses":{}}'); } catch (error) { return { answered: 0, correct: 0, topics: {}, misses: {} }; } }
function recordProgress(question, correct) { const progress = getProgress(); progress.answered += 1; progress.correct += correct ? 1 : 0; progress.topics[question.category || question.topic || 'general'] = (progress.topics[question.category || question.topic || 'general'] || 0) + (correct ? 1 : -1); if (!correct) progress.misses[question.taxon || question.answer] = (progress.misses[question.taxon || question.answer] || 0) + 1; localStorage.setItem('ebioPracticalProgress', JSON.stringify(progress)); }
function progressCard() { const progress = getProgress(); const accuracy = progress.answered ? Math.round((progress.correct / progress.answered) * 100) : 0; const misses = Object.entries(progress.misses).sort((a, b) => b[1] - a[1]).slice(0, 5).map(item => `${item[0]} (${item[1]})`).join(', ') || 'None yet'; return card('Progress', `<p><strong>${accuracy}% accuracy</strong> across ${progress.answered} answered questions.</p><p class="subtle">Most-missed concepts: ${esc(misses)}</p><button class="secondary" data-jump="practice">Practice missed material</button>`); }
function card(title, body, className = '') { return `<article class="practical-card ${className}"><h3>${esc(title)}</h3>${body}</article>`; }
function renderLearn() {
  return `<div class="practical-grid">${progressCard()}${card('What do I actually need to know?', '<div class="priority-list"><strong>Know cold:</strong> all orders and suborders, without a key.<br><strong>Be able to key out:</strong> listed families and superfamilies.<br><strong>Identify + function/location:</strong> external anatomy.<br><strong>Identify + function:</strong> internal anatomy.<br><strong>Recognize name + function:</strong> leg, wing, mouthpart, and antenna types.<br><strong>Know key traits/ecology:</strong> every taxon listed in the practical guide.</div>')}${card('Instructor clarification required', `<ul>${sourceClarifications.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`)}${card('The practical loop', '<ol><li>Observe the visible feature.</li><li>Choose the smallest defensible group.</li><li>Explain which diagnostic evidence supports it.</li></ol><p class="subtle">Family identification is practiced through a supplied key; this app does not invent missing couplets.</p>')}${card('Study roadmap', '<div class="roadmap"><button class="secondary" data-jump="groups">1. Orders/suborders</button><button class="secondary" data-jump="anatomy">2. Anatomy</button><button class="secondary" data-jump="families">3. Families with a key</button><button class="secondary" data-jump="simulation">4. Simulate</button></div>')}</div>`;
}
function renderAnatomy() {
  return `<div class="controls"><label for="anatomyFilter">Focus</label><select id="anatomyFilter"><option>All anatomy</option><option>External anatomy</option><option>Internal anatomy</option></select></div><div class="practical-grid" id="anatomyCards">${anatomy.map((item, index) => card(item[1], `<span class="tag">${esc(item[0])}</span>${list(item[2])}<p>${esc(item[3])}<button class="link-button anatomy-check" data-anatomy="${index}">Test this structure</button></p>`)).join('')}</div><div id="anatomyQuestionArea"></div>`;
}
function renderGroups() {
  return `<div class="practice-banner"><strong>No-key recognition.</strong> Start from observable traits, then identify the order or suborder. Diagnostic explanations appear after each answer.</div><div class="controls"><label for="groupRank">Rank</label><select id="groupRank"><option value="order">Orders</option><option value="suborder">Suborders</option><option value="group">Major groupings</option></select><button class="primary" id="groupQuestion">New question</button></div><div id="groupQuestionArea" class="question-area">${groupPrompt()}</div>`;
}
function groupPrompt() {
  const rank = document.getElementById('groupRank')?.value || 'order';
  const pool = rank === 'order' ? orders.filter(name => practicalTaxa.find(taxon => taxon.name === name)?.diagnosticTraits.length) : rank === 'suborder' ? suborders.filter(name => practicalTaxa.find(taxon => taxon.name === name)?.diagnosticTraits.length) : groups.map(item => item[0]);
  const answer = pool[Math.floor(Math.random() * pool.length)];
  const entry = practicalTaxa.find(taxon => taxon.name === answer);
  const choices = [...new Set([answer, ...pool.sort(() => Math.random() - .5).slice(0, 3)])].sort(() => Math.random() - .5);
  const groupEntry = groups.find(item => item[0] === answer);
  const clue = entry?.diagnosticTraits?.[Math.floor(Math.random() * entry.diagnosticTraits.length)] || (groupEntry ? `${groupEntry[1]} containing ${groupEntry[2]}` : 'a listed grouping');
  return `<div class="eyebrow">${rank === 'group' ? 'Grouping ID' : `${rank} ID`}</div><h2 class="question">Which ${rank} matches this observable clue?</h2><p class="mystery-clue"><strong>${esc(clue)}</strong></p><div class="options">${choices.map(choice => `<button class="option group-choice" data-answer="${esc(choice)}" data-correct="${esc(answer)}">${esc(choice)}</button>`).join('')}</div><div id="groupFeedback" class="explain"></div>`;
}
function renderFamilies() {
  return `<div class="practice-banner"><strong>Real course keys.</strong> Select an order, inspect the named feature, choose a branch, and use Back or Restart to work the couplets again. The Odonata key first identifies the suborder, then the applicable Anisoptera family.</div><div class="family-columns">${Object.entries(practicalFamilyKeys).map(([order, key]) => `<section class="family-key"><h3>${esc(key.title)}</h3><p class="subtle">${order}</p><button class="primary open-key" data-order="${order}">Open Key</button><div class="key-body hidden" id="key-${order}"><div id="key-work-${order}"></div></div></section>`).join('')}</div>`;
}
function renderComparisons() { return `<div class="practical-grid">${comparisonData.map(item => card(item[0], `<p>${esc(item[1])}</p><button class="secondary compare-reveal">Reveal study prompt</button><div class="hidden compare-answer"><strong>Observable-feature check:</strong> write the feature and the course-note couplet that separates the two groups.</div>`)).join('')}</div>`; }
function renderFlashcards() { const terms = [...anatomy.flatMap(item => item[2].split(';').map(term => term.trim())), ...practicalTaxa.map(taxon => taxon.name)]; const term = terms[(practicalState.flashIndex + terms.length) % terms.length]; const entry = practicalTaxa.find(taxon => taxon.name === term); const detail = entry ? [...entry.diagnosticTraits, ...entry.practicalFacts].join('; ') : anatomy.find(item => item[2].includes(term))?.[3] || 'Use the official study guide to recall its location and function.'; return `<div class="flash-wrap"><div class="flash ${practicalState.flashFlipped ? 'flipped' : ''}" id="practicalFlash"><div class="face front"><span class="eyebrow">Term</span><h2>${esc(term)}</h2><p class="subtle">What should you identify, locate, or explain?</p></div><div class="face back"><span class="eyebrow">Recall check</span><h2>${esc(term)}</h2><p>${esc(detail)}</p></div></div></div><div class="flash-actions"><button class="secondary" id="prevPracticalFlash">← Previous</button><button class="primary" id="flipPracticalFlash">Flip card</button><button class="secondary" id="nextPracticalFlash">Next →</button></div>`; }
function renderReference() {
  const entries = [...practicalTaxa.map(taxon => [taxon.rank, taxon.name, taxon]), ...anatomy.map(item => [item[0], item[1], { diagnosticTraits: item[2].split(';'), practicalFacts: [item[3]], aliases: item[2].split(';').flatMap(term => anatomyAliases[term.trim()] || []) }]), ...morphologyTypes.map(item => [item.category, item.term, { diagnosticTraits: [item.description] }])];
  return `<div class="ref-toolbar"><input id="practicalSearch" type="search" placeholder="Search orders, families, structures, or morphology…"><span class="pill">${entries.length} scoped entries</span></div><div class="ref-grid" id="practicalReference">${entries.map(entry => { const aliases = entry[2].aliases || []; const searchable = [entry[0], entry[1], ...aliases, ...(entry[2].diagnosticTraits || []), ...(entry[2].practicalFacts || [])].join(' '); return `<article class="ref-card" data-search="${esc(searchable)}"><span class="tag">${esc(entry[0])}</span><h3>${esc(entry[1])}</h3>${aliases.length ? `<p class="subtle">Also listed as: ${esc(aliases.join(', '))}</p>` : ''}${entry[2].diagnosticTraits?.length ? `<p><strong>How to recognize/use:</strong> ${esc(entry[2].diagnosticTraits.join('; '))}</p>` : ''}${entry[2].ecology?.length ? `<p><strong>Ecology:</strong> ${esc(entry[2].ecology.join('; '))}</p>` : ''}${entry[2].lifeHistory?.length ? `<p><strong>Life history:</strong> ${esc(entry[2].lifeHistory.join('; '))}</p>` : ''}${entry[2].sourceLimitation ? `<p class="explain show"><strong>Source limitation:</strong> ${esc(entry[2].sourceLimitation)}</p>` : ''}${entry[2].requiresKey !== undefined ? `<p class="subtle">${entry[2].requiresKey ? 'Use the family key.' : 'Memorize order/suborder recognition.'}</p>` : ''}</article>`; }).join('')}</div>`;
}
function renderPractice() { return `<div class="practice-setup"><div class="eyebrow">Mixed practical practice</div><h2>Choose a focus</h2><select id="practiceFocus"><option value="mixed">Mixed practical</option><option value="anatomy">Anatomy</option><option value="taxonomy">Orders and suborders</option><option value="families">Family key workflow</option><option value="morphology">Leg, wing, mouthpart, antenna types</option></select><label>Question count <input id="practiceCount" type="number" min="1" max="10" value="5"></label><button class="primary" id="startPractice">Start practice</button></div><div id="practiceQuestionArea"></div>`; }
function renderSimulation() { return `<div class="simulation-intro"><div class="eyebrow">No immediate feedback</div><h2>20-question practical simulation</h2><p>Mixed order/suborder ID, anatomy, morphology, family-key workflow, comparisons, true statements, feature checks, and functional morphology. Answers and explanations appear at the end.</p><button class="primary" id="startSimulation">Start simulation</button></div><div id="simulationArea"></div>`; }
function renderSpeed() { return `<div class="speed"><button class="primary" id="startPracticalSpeed">Start 60-second round</button><span class="timer" id="practicalTimer">1:00</span><span id="practicalSpeedScore">Score: 0</span></div><div id="practicalSpeedArea"><p class="subtle">Fast recognition of the scoped orders, suborders, and anatomy terms.</p></div>`; }
function renderKeyWork(order, nodeId = null, history = []) {
  const key = practicalFamilyKeys[order];
  if (nodeId && !key.nodes.some(item => item.id === nodeId)) {
    const finalTaxon = practicalTaxa.find(taxon => taxon.name === nodeId);
    return `<div class="key-result"><div class="eyebrow">Identification</div><h3>${esc(nodeId)}</h3><p>${esc(finalTaxon?.diagnosticTraits.join('; ') || '')}</p><button class="secondary key-back" data-order="${order}" data-history="${esc(JSON.stringify(history.slice(0, -1)))}">← Back</button><button class="secondary key-restart" data-order="${order}">Restart key</button></div>`;
  }
  const node = key.nodes.find(item => item.id === nodeId) || key.nodes[0];
  return `<div class="eyebrow">Inspect: ${esc(node.feature)}</div><h3>${esc(node.prompt)}</h3><div class="options key-options"><button class="option key-branch" data-order="${order}" data-node="${node.yes}" data-history="${esc(JSON.stringify([...history, node.id]))}">Yes</button><button class="option key-branch" data-order="${order}" data-node="${node.no}" data-history="${esc(JSON.stringify([...history, node.id]))}">No</button></div><p class="mini">Course couplet feature: ${esc(node.feature)}</p>${history.length ? `<button class="secondary key-back" data-order="${order}" data-history="${esc(JSON.stringify(history.slice(0, -1)))}">← Back</button>` : ''}<button class="secondary key-restart" data-order="${order}">Restart key</button>`;
}

function renderTab() {
  const views = { learn: renderLearn, anatomy: renderAnatomy, groups: renderGroups, families: renderFamilies, comparisons: renderComparisons, flashcards: renderFlashcards, reference: renderReference, practice: renderPractice, simulation: renderSimulation, speed: renderSpeed };
  document.getElementById('practicalContent').innerHTML = views[practicalState.tab]();
  document.querySelectorAll('[data-practical-tab]').forEach(button => button.classList.toggle('active', button.dataset.practicalTab === practicalState.tab));
  bindTabEvents();
}
function setPracticalTab(tab) { practicalState.tab = tab; renderTab(); }
function bindTabEvents() {
  document.querySelectorAll('[data-practical-tab]').forEach(button => button.onclick = () => setPracticalTab(button.dataset.practicalTab));
  document.querySelectorAll('[data-jump]').forEach(button => button.onclick = () => setPracticalTab(button.dataset.jump));
  document.querySelectorAll('.compare-reveal').forEach(button => button.onclick = () => { button.nextElementSibling.classList.toggle('hidden'); button.textContent = button.nextElementSibling.classList.contains('hidden') ? 'Reveal study prompt' : 'Hide prompt'; });
  document.querySelectorAll('.open-key, .open-question-key').forEach(button => button.onclick = () => { const work = document.getElementById(`key-work-${button.dataset.order}`); if (work) { work.innerHTML = renderKeyWork(button.dataset.order); document.getElementById(`key-${button.dataset.order}`).classList.remove('hidden'); bindKeyEvents(); } });
  bindKeyEvents();
  document.querySelectorAll('.anatomy-check').forEach(button => button.onclick = () => {
    const item = anatomy[Number(button.dataset.anatomy)];
    const terms = item[2].split(';').map(term => term.trim());
    const term = terms[Math.floor(Math.random() * terms.length)];
    const choices = [...new Set([term, ...terms.sort(() => Math.random() - 0.5).slice(0, 3)])];
    const area = document.getElementById('anatomyQuestionArea');
    area.innerHTML = `<div class="question-area"><div class="eyebrow">${esc(item[0])} • direct identification</div><h2 class="question">Which structure belongs to the ${esc(item[1])}?</h2><p class="mystery-clue"><strong>${esc(item[3])}</strong></p><div class="options">${choices.sort(() => Math.random() - 0.5).map(choice => `<button class="option anatomy-answer" data-choice="${esc(choice)}" data-correct="${esc(term)}">${esc(choice)}</button>`).join('')}</div><div id="anatomyFeedback" class="explain"></div></div>`;
    document.querySelectorAll('.anatomy-answer').forEach(answer => answer.onclick = () => {
      const correct = answer.dataset.choice === answer.dataset.correct;
      document.querySelectorAll('.anatomy-answer').forEach(option => { option.disabled = true; if (option.dataset.choice === option.dataset.correct) option.classList.add('correct'); });
      answer.classList.toggle('wrong', !correct);
      document.getElementById('anatomyFeedback').className = 'explain show';
      document.getElementById('anatomyFeedback').innerHTML = `<strong>${correct ? 'Correct.' : `Answer: ${esc(term)}`}</strong><p>${esc(item[3])}</p>`;
    });
  });
  const search = document.getElementById('practicalSearch'); if (search) search.oninput = () => document.querySelectorAll('#practicalReference article').forEach(card => card.hidden = !card.dataset.search.toLowerCase().includes(search.value.toLowerCase()));
  const filter = document.getElementById('anatomyFilter'); if (filter) filter.onchange = () => document.querySelectorAll('#anatomyCards .practical-card').forEach(card => card.hidden = filter.value !== 'All anatomy' && !card.querySelector('.tag').textContent.includes(filter.value));
  const groupButton = document.getElementById('groupQuestion'); if (groupButton) groupButton.onclick = () => { document.getElementById('groupQuestionArea').innerHTML = groupPrompt(); bindGroupChoices(); };
  bindGroupChoices();
  const flip = document.getElementById('flipPracticalFlash'); if (flip) flip.onclick = () => { practicalState.flashFlipped = !practicalState.flashFlipped; renderTab(); };
  ['nextPracticalFlash', 'prevPracticalFlash'].forEach(id => { const button = document.getElementById(id); if (button) button.onclick = () => { practicalState.flashIndex += id.startsWith('next') ? 1 : -1; practicalState.flashFlipped = false; renderTab(); }; });
  const startPractice = document.getElementById('startPractice'); if (startPractice) startPractice.onclick = () => startPracticeQuestion();
  const startSimulation = document.getElementById('startSimulation'); if (startSimulation) startSimulation.onclick = () => startSimulationRun();
  const startSpeed = document.getElementById('startPracticalSpeed'); if (startSpeed) startSpeed.onclick = () => startPracticalSpeed();
}
function bindKeyEvents() {
  document.querySelectorAll('.key-branch').forEach(button => button.onclick = () => { document.getElementById(`key-work-${button.dataset.order}`).innerHTML = renderKeyWork(button.dataset.order, button.dataset.node, JSON.parse(button.dataset.history)); bindKeyEvents(); });
  document.querySelectorAll('.key-back').forEach(button => button.onclick = () => { const history = JSON.parse(button.dataset.history); const node = history[history.length - 1] || null; document.getElementById(`key-work-${button.dataset.order}`).innerHTML = renderKeyWork(button.dataset.order, node, history); bindKeyEvents(); });
  document.querySelectorAll('.key-restart').forEach(button => button.onclick = () => { document.getElementById(`key-work-${button.dataset.order}`).innerHTML = renderKeyWork(button.dataset.order); bindKeyEvents(); });
}
function bindQuestionKeyEvents() {
  document.querySelectorAll('.open-question-key').forEach(button => button.onclick = () => {
    const work = document.getElementById(`key-work-${button.dataset.order}`);
    if (work) {
      work.innerHTML = renderKeyWork(button.dataset.order);
      document.getElementById(`key-${button.dataset.order}`).classList.remove('hidden');
      bindKeyEvents();
    }
  });
}
function bindGroupChoices() { document.querySelectorAll('.group-choice').forEach(button => button.onclick = () => { document.querySelectorAll('.group-choice').forEach(item => { item.disabled = true; if (item.dataset.correct === item.dataset.answer) item.classList.add('correct'); }); const ok = button.dataset.answer === button.dataset.correct; button.classList.toggle('wrong', !ok); document.getElementById('groupFeedback').className = 'explain show'; document.getElementById('groupFeedback').innerHTML = `<strong>${ok ? 'Correct.' : 'Use the guide to re-check this choice.'}</strong><p>The practical requires an observable diagnostic explanation, not only a name. Record the feature or grouping relationship that supports <strong>${esc(button.dataset.correct)}</strong>.</p>`; }); }
function makePracticeQuestions(focus) {
  const anatomyQuestions = anatomy.flatMap(item => {
    const terms = item[2].split(';').map(term => term.trim());
    const identification = terms.map(term => ({ type: 'anatomy-identification', category: item[0], prompt: `Which structure belongs to the <strong>${esc(item[1])}</strong>?`, answer: term, choices: [...new Set([term, ...terms])].slice(0, 4), explanation: item[3] }));
    const location = terms.map(term => ({ type: 'anatomy-location', category: item[0], prompt: `Where should you locate <strong>${esc(term)}</strong>?`, answer: item[1], choices: [...new Set([item[1], ...anatomy.map(candidate => candidate[1])])], explanation: item[3] }));
    const functions = terms.filter(term => anatomyDetails[term] && term !== 'gastric caecum').map(term => ({ type: 'anatomy-function', category: item[0], prompt: `Which function or relationship belongs to <strong>${esc(term)}</strong>?`, answer: anatomyDetails[term][1], choices: [anatomyDetails[term][1], ...terms.filter(candidate => candidate !== term && anatomyDetails[candidate] && candidate !== 'gastric caecum').slice(0, 3).map(candidate => anatomyDetails[candidate][1])], explanation: `${term}: ${anatomyDetails[term][1]}.` }));
    return [...identification, ...location, ...functions];
  });
  const taxonomyQuestions = practicalTaxa.filter(taxon => (taxon.rank === 'order' || taxon.rank === 'suborder') && !taxon.sourceLimitation).flatMap(taxon => taxon.diagnosticTraits.slice(0, 2).map(clue => ({ type: `${taxon.rank}-identification`, taxon: taxon.name, prompt: `Which ${taxon.rank} matches this supported clue? <strong>${esc(clue)}</strong>`, answer: taxon.name, choices: [taxon.name, ...practicalTaxa.filter(candidate => candidate.rank === taxon.rank && candidate.name !== taxon.name && !candidate.sourceLimitation).slice(0, 3).map(candidate => candidate.name)], explanation: `${taxon.name}: ${clue}. Orders and suborders are recognition objectives and should be identified without a key.` })));
  const familyQuestions = Object.values(keyFamilies).flat().flatMap(answer => {
    const entry = practicalTaxa.find(taxon => taxon.name === answer);
    const acceptedAnswers = [answer, ...(entry?.aliases || [])];
    const choices = [answer, ...(entry?.aliases || []), ...families.filter(family => family !== answer).slice(0, 3)];
    return [...(entry?.diagnosticTraits || []).map(clue => ({ type: 'family-identification', taxon: answer, keyOrder: Object.keys(keyFamilies).find(order => keyFamilies[order].includes(answer)), prompt: `Which family or superfamily is supported by this diagnostic feature? <strong>${esc(clue)}</strong>`, answer, acceptedAnswers, choices, explanation: `${answer}: ${clue}.` })), { type: 'family-identification', taxon: answer, keyOrder: Object.keys(keyFamilies).find(order => keyFamilies[order].includes(answer)), prompt: 'Which family or superfamily should you reach through the supplied key?', answer, acceptedAnswers, choices, explanation: 'Open the supplied key, record the diagnostic couplet, and then submit the identification.' }];
  });
  const morphologyQuestions = morphologyTypes.map(item => ({ type: 'morphology', category: item.category, prompt: `Which type is described by this course-note feature? <strong>${esc(item.description)}</strong>`, answer: item.term, choices: [item.term, ...morphologyTypes.filter(candidate => candidate.category === item.category && candidate.term !== item.term).slice(0, 3).map(candidate => candidate.term)], explanation: item.description }));
  const extras = questionBankExtrasWithComparisons;
  const all = focus === 'anatomy' ? [...anatomyQuestions, ...extras.filter(question => question.type.includes('anatomy'))] : focus === 'taxonomy' ? taxonomyQuestions : focus === 'families' ? familyQuestions : focus === 'morphology' ? [...morphologyQuestions, ...extras.filter(question => question.type === 'functional-morphology')] : [...anatomyQuestions, ...taxonomyQuestions, ...familyQuestions, ...morphologyQuestions, ...extras];
  return all.sort(() => Math.random() - 0.5);
}
function startPracticeQuestion() {
  const focus = document.getElementById('practiceFocus').value;
  const count = Math.min(10, Math.max(1, Number(document.getElementById('practiceCount').value) || 5));
  const questions = makePracticeQuestions(focus).slice(0, count);
  let index = 0;
  let score = 0;
  const area = document.getElementById('practiceQuestionArea');
  const next = () => {
    if (index >= questions.length) { area.innerHTML = `<div class="speed-end"><h2>${score}/${questions.length}</h2><p>Review the explanations, then repeat this focus or switch modes.</p><button class="secondary" id="restartPractice">Try again</button></div>`; document.getElementById('restartPractice').onclick = startPracticeQuestion; return; }
    const question = questions[index];
    const key = question.keyOrder ? `<button class="secondary open-question-key" data-order="${question.keyOrder}">Open ${question.keyOrder} Key</button><div class="key-body hidden" id="key-${question.keyOrder}"><div id="key-work-${question.keyOrder}"></div></div>` : '';
    const options = question.type === 'select-all' ? question.choices.map(choice => `<label class="option"><input type="checkbox" class="practice-select" value="${esc(choice)}"> ${esc(choice)}</label>`).join('') : question.choices.sort(() => Math.random() - 0.5).map(choice => `<button class="option practice-answer" data-choice="${esc(choice)}">${esc(choice)}</button>`).join('');
    area.innerHTML = `<div class="question-area"><div class="eyebrow">${esc(focus)} • ${index + 1}/${questions.length}</div><h2 class="question">${question.prompt}</h2>${key}<div class="options">${options}</div>${question.type === 'select-all' ? '<button class="primary" id="submitSelectAll">Submit selections</button>' : ''}<div id="practiceFeedback" class="explain"></div></div>`;
    bindKeyEvents();
    bindQuestionKeyEvents();
    document.querySelectorAll('.practice-answer').forEach(button => button.onclick = () => {
      document.querySelectorAll('.practice-answer').forEach(item => { item.disabled = true; if ((question.acceptedAnswers || [question.answer]).includes(item.dataset.choice)) item.classList.add('correct'); });
      const correct = (question.acceptedAnswers || [question.answer]).includes(button.dataset.choice);
      if (correct) score += 1; else button.classList.add('wrong');
      recordProgress(question, correct);
      showPracticeFeedback(question, correct, () => { index += 1; next(); });
    });
    const submitSelectAll = document.getElementById('submitSelectAll');
    if (submitSelectAll) submitSelectAll.onclick = () => {
      const selected = [...document.querySelectorAll('.practice-select:checked')].map(input => input.value).sort();
      const expected = [...question.answer].sort();
      const correct = JSON.stringify(selected) === JSON.stringify(expected);
      document.querySelectorAll('.practice-select').forEach(input => { input.disabled = true; if (question.answer.includes(input.value)) input.parentElement.classList.add('correct'); });
      submitSelectAll.disabled = true;
      if (correct) score += 1;
      recordProgress(question, correct);
      showPracticeFeedback(question, correct, () => { index += 1; next(); });
    };
  };
  next();
}
function showPracticeFeedback(question, correct, advance) {
  const feedback = document.getElementById('practiceFeedback');
  feedback.className = 'explain show';
  const answer = Array.isArray(question.answer) ? question.answer.join('; ') : question.answer;
  feedback.innerHTML = `<strong>${correct ? 'Correct.' : `Answer: ${esc(answer)}`}</strong><p>${esc(question.explanation)}</p><button class="secondary" id="nextPractice">Next</button>`;
  document.getElementById('nextPractice').onclick = advance;
}
function simulationQuestions() {
  const byName = name => practicalTaxa.find(taxon => taxon.name === name);
  const taxonomy = practicalTaxa.filter(taxon => taxon.rank === 'order' || taxon.rank === 'suborder');
  const orderQs = taxonomy.slice().sort(() => Math.random() - 0.5).slice(0, 5).map(taxon => ({ category: 'Order/suborder ID', prompt: `Identify this practical taxon from its clue: <strong>${esc(taxon.diagnosticTraits[0] || taxon.grouping)}</strong>.`, answer: taxon.name, choices: [taxon.name, ...taxonomy.filter(item => item.name !== taxon.name).slice(0, 3).map(item => item.name)], explanation: `${taxon.name}: ${taxon.diagnosticTraits.join('; ') || 'Use the memorized classification and visual diagnosis.'}` }));
  const external = anatomy.filter(item => item[0] === 'External anatomy').slice(0, 3).map(item => ({ category: 'External anatomy', prompt: `Which region contains <strong>${esc(item[2].split(';')[0])}</strong>?`, answer: item[1], choices: anatomy.filter(candidate => candidate[0] === 'External anatomy').map(candidate => candidate[1]), explanation: item[3] }));
  const internal = anatomy.filter(item => item[0] === 'Internal anatomy').slice(0, 3).map(item => ({ category: 'Internal anatomy', prompt: `Which system includes <strong>${esc(item[2].split(';')[0])}</strong>?`, answer: item[1], choices: anatomy.filter(candidate => candidate[0] === 'Internal anatomy').map(candidate => candidate[1]), explanation: item[3] }));
  const morphologyQs = [{ category: 'Morphology', prompt: 'Which leg type has an enlarged hind femur for jumping?', answer: 'saltatorial', choices: ['saltatorial', 'raptorial', 'fossorial', 'natatorial'], explanation: 'Saltatorial legs have enlarged hind femora and are used for jumping.' }, { category: 'Morphology', prompt: 'Which wing type is basally hardened and apically membranous?', answer: 'hemelytra', choices: ['hemelytra', 'elytra', 'tegmina', 'fringed wings'], explanation: 'Hemelytra are the forewings of many Heteroptera.' }];
  const familyQs = ['Aeshnidae', 'Gryllidae', 'Aphididae'].map(answer => ({ category: 'Family key', prompt: `Use the available family key to reach <strong>${answer}</strong>. Which family is the answer?`, answer, choices: [answer, ...families.filter(family => family !== answer).slice(0, 3)], explanation: `${answer}: ${byName(answer)?.diagnosticTraits.join('; ') || 'Follow the supplied couplets.'}` }));
  const comparison = { category: 'Comparison', prompt: 'How do you distinguish Aeshnidae from Libellulidae?', answer: 'Compare wing triangles and the hindwing anal loop', choices: ['Compare wing triangles and the hindwing anal loop', 'Count abdominal spiracles', 'Inspect cornicles', 'Look for a cuneus'], explanation: 'Aeshnidae have similar triangles pointing the same direction and no foot-shaped anal loop; Libellulidae differ.' };
  const truth = { category: 'True statements', prompt: 'Which statement is true about Rhaphidophoridae?', answer: 'They lack tympanal organs entirely', choices: ['They lack tympanal organs entirely', 'They have 3 tarsomeres', 'They have short antennae', 'They have raptorial forelegs'], explanation: 'Rhaphidophoridae are wingless, have long antennae, lack tympana, and have 4 tarsomeres.' };
  const yesNo = { category: 'Feature check', prompt: 'Do Aphididae have cornicles near the posterior end of the abdomen?', answer: 'Yes', choices: ['Yes', 'No'], explanation: 'The Hemiptera key uses cornicles to separate Aphididae from Coccoidea.' };
  const ecology = { category: 'Ecology/function', prompt: 'Why are Belostomatidae forelegs notable?', answer: 'They are massive raptorial forelegs used in predation', choices: ['They are massive raptorial forelegs used in predation', 'They are scoop-shaped for algae', 'They are hydrophobic walking legs', 'They are wing-folding structures'], explanation: 'Belostomatidae are predatory and have massive raptorial forelegs.' };
  return [...orderQs, ...external, ...morphologyQs, ...internal, ...familyQs, comparison, truth, yesNo, ecology];
}
function startSimulationRun() {
  const questions = simulationQuestions();
  let index = 0; const answers = [];
  const area = document.getElementById('simulationArea');
  const show = () => {
    if (index >= questions.length) {
      const score = answers.filter(item => item.correct).length;
      area.innerHTML = `<div class="simulation-running"><h2>Simulation complete: ${score}/${questions.length}</h2><p>Review every answer below. Return to the matching mode for missed categories.</p><div class="review-list">${answers.map((item, number) => `<article class="review-item"><strong>${number + 1}. ${item.category}</strong><p>${item.prompt}</p><p class="${item.correct ? 'review-correct' : 'review-incorrect'}">Your answer: ${esc(item.choice || 'No answer')}<br>Answer: ${esc(item.answer)}</p><p>${esc(item.explanation)}</p></article>`).join('')}</div><button class="secondary" id="restartSimulation">Run again</button></div>`;
      document.getElementById('restartSimulation').onclick = startSimulationRun;
      return;
    }
    const question = questions[index];
    area.innerHTML = `<div class="question-area"><div class="eyebrow">${esc(question.category)} • ${index + 1}/${questions.length}</div><h2 class="question">${question.prompt}</h2><div class="options">${question.choices.sort(() => Math.random() - 0.5).map(choice => `<button class="option simulation-answer" data-choice="${esc(choice)}">${esc(choice)}</button>`).join('')}</div><button class="secondary" id="skipSimulation">Skip</button></div>`;
    const record = choice => { const correct = choice === question.answer; answers.push({ ...question, choice, correct }); recordProgress(question, correct); index += 1; show(); };
    document.querySelectorAll('.simulation-answer').forEach(button => button.onclick = () => record(button.dataset.choice));
    document.getElementById('skipSimulation').onclick = () => record('');
  };
  show();
}
function startPracticalSpeed() { let left = 60, score = 0; const area = document.getElementById('practicalSpeedArea'); const timer = document.getElementById('practicalTimer'); const scoreNode = document.getElementById('practicalSpeedScore'); const tick = () => { timer.textContent = `0:${String(left).padStart(2, '0')}`; }; const ask = () => { const term = [...orders, ...suborders, ...anatomy.flatMap(item => item[2].split(';'))][Math.floor(Math.random() * 40)].trim(); area.innerHTML = `<div class="question-area"><h2 class="question">What should you recall about <strong>${esc(term)}</strong>?</h2><button class="primary" id="speedPoint">I know it</button><button class="secondary" id="speedSkip">Skip</button></div>`; document.getElementById('speedPoint').onclick = () => { score += 1; scoreNode.textContent = `Score: ${score}`; ask(); }; document.getElementById('speedSkip').onclick = ask; }; tick(); ask(); const interval = setInterval(() => { left -= 1; tick(); if (left <= 0) { clearInterval(interval); area.innerHTML = `<div class="speed-end"><h2>${score} points</h2><p>Review the terms you skipped, then try again.</p></div>`; } }, 1000); }
renderTab();
