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
  'dorsal vessel': ['posterior abdomen into the head region', 'the dorsal vessel, also called the dorsal longitudinal vessel, carries hemolymph'],
  trunk: ['throughout the body', 'a distinct tracheal branch'],
  tracheoles: ['throughout the body', 'the smallest tubes where gas exchange occurs'],
  taenidea: ['inside the tracheal cuticle', 'circumferential transverse thickenings that reinforce tracheae and tracheoles and help prevent collapse'],
  crop: ['foregut', 'storage and initial food processing'], proventriculus: ['foregut', 'mechanical breakdown and initial food processing'],
  'gastric caecum': ['midgut', 'a caecum associated with the midgut; the midgut is responsible for digestion and absorption'],
  ventriculus: ['midgut', 'digestion and absorption'],
  'peritrophic membrane': ['midgut', 'the peritrophic matrix associated with the midgut; it is made of chitin and glycoproteins and is essential for digestion'],
  'Malpighian tubule': ['hindgut', 'excretion and water regulation'], ileum: ['hindgut', 'excretion and water regulation'],
  colon: ['hindgut', 'excretion and water regulation'], rectum: ['hindgut', 'excretion and water regulation'],
  ganglia: ['nervous system', 'receive and respond to sensory input']
};
const anatomyAliases = { taenidea: ['taenidia'], 'peritrophic membrane': ['peritrophic matrix'], 'dorsal vessel': ['dorsal longitudinal vessel'] };
const morphology = [
  ['Leg types', ['raptorial', 'cursorial', 'fossorial', 'saltatorial', 'natatorial', 'scansorial'], ['grasping prey', 'running', 'digging', 'jumping', 'swimming', 'clinging']],
  ['Mouthpart types', ['mandibulate', 'piercing/sucking', 'siphoning', 'sponging'], ['biting and chewing food', 'piercing and sucking liquids', 'using elongated fused maxillae', 'using a modified labellum to sponge fluids']],
  ['Wing types', ['fringed wings', 'hemelytra', 'elytra', 'scaly wings', 'tegmina'], ['fringed with hairs', 'basally hardened and apically membranous', 'entirely hardened forewings', 'covered with scales', 'leathery']],
  ['Antenna types', ['plumose', 'setaceous', 'moniliform', 'filiform', 'serrate', 'geniculate/elbowed', 'aristate', 'clavate/clubbed', 'lamellate'], ['feather-like', 'hair-like', 'bead-like', 'thread-like', 'saw-like', 'elbowed', 'with bristles', 'clubbed', 'plate-like']]
];
const morphologyTypes = morphology.flatMap(([category, terms, descriptions]) => terms.map((term, index) => ({
  category, term, description: descriptions[index] || descriptions[0]
})));
const sourceClarifications = [
  'Instructor resolution: use Coccoidae; recognize Coccoidea as the alternate source spelling.',
  'Instructor resolution: place gastric caecum/caeca with the midgut.',
  'Instructor resolution: use dorsal vessel; dorsal longitudinal vessel is the detailed-notes synonym.',
  'Instructor resolution: taenidea/taenidia are transverse or circumferential thickenings of the tracheal cuticle that reinforce tracheae and tracheoles and help prevent collapse.',
  'Instructor resolution: use peritrophic matrix; recognize peritrophic membrane as the official-guide wording.'
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
  ['Aphididae vs Coccoidae', 'Aphididae have cornicles and always three pairs of legs; Coccoidae lack cornicles and females are often legless.'],
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
  { type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Aphididae', prompt: 'Do Aphididae have cornicles near the posterior end of the abdomen?', answer: 'Yes', choices: ['Yes', 'No'], explanation: 'The Hemiptera key uses cornicles to separate Aphididae from Coccoidae.' },
  { type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Rhaphidophoridae', prompt: 'Do Rhaphidophoridae lack tympanal organs entirely?', answer: 'Yes', choices: ['Yes', 'No'], explanation: 'The supplied Orthoptera notes state that Rhaphidophoridae lack tympanal organs entirely.' }
];
const keyFamilies = { Odonata: ['Aeshnidae', 'Libellulidae'], Orthoptera: ['Acrididae', 'Gryllidae', 'Tettigoniidae', 'Rhaphidophoridae'], Hemiptera: ['Aphididae', 'Coccoidae', 'Fulgoroidea', 'Cicadidae', 'Membracidae', 'Cercopidae', 'Cicadellidae', 'Belostomatidae', 'Corixidae', 'Gerridae', 'Cimicidae', 'Pentatomidae', 'Scutelleridae', 'Reduviidae', 'Coreidae', 'Lygaeidae', 'Miridae'] };
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
const list = value => `<ul>${value.split(';').map(item => `<li>${esc(item.trim())}</li>`).join('')}</ul>`;
let practicalState = { tab: 'learn', score: 0, asked: 0, flashIndex: 0, flashFlipped: false, key: {}, missedOnly: false, lessonIndex: 0, practiceSession: null, practiceIndex: 0, practiceScore: 0, practiceSetupVisible: true, referenceTab: 'taxa', referenceQuery: '', referenceTaxaFilter: 'all', referenceAnatomyTab: 'external', referenceAnatomyCategory: 'Head', referenceMorphologyTab: 'Legs' };
function getProgress() { try { return JSON.parse(localStorage.getItem('ebioPracticalProgress') || '{"answered":0,"correct":0,"topics":{},"misses":{}}'); } catch (error) { return { answered: 0, correct: 0, topics: {}, misses: {} }; } }
function recordProgress(question, correct) { const progress = getProgress(); progress.answered += 1; progress.correct += correct ? 1 : 0; progress.topics[question.category || question.topic || 'general'] = (progress.topics[question.category || question.topic || 'general'] || 0) + (correct ? 1 : -1); if (!correct) progress.misses[question.taxon || question.answer] = (progress.misses[question.taxon || question.answer] || 0) + 1; localStorage.setItem('ebioPracticalProgress', JSON.stringify(progress)); }
function progressCard() { const progress = getProgress(); const accuracy = progress.answered ? Math.round((progress.correct / progress.answered) * 100) : 0; const misses = Object.entries(progress.misses).sort((a, b) => b[1] - a[1]).slice(0, 5).map(item => `${item[0]} (${item[1]})`).join(', ') || 'None yet'; return card('Progress', `<p><strong>${accuracy}% accuracy</strong> across ${progress.answered} answered questions.</p><p class="subtle">Most-missed concepts: ${esc(misses)}</p><button class="secondary" data-missed-practice>Practice missed material</button>`); }
function card(title, body, className = '') { return `<article class="practical-card ${className}"><h3>${esc(title)}</h3>${body}</article>`; }
const practicalLessons = [
  { kicker: 'Lesson 1', title: 'What the practical expects', intro: 'You need to recognize taxa quickly, explain the feature that supports each ID, and link the feature to anatomy or ecology.', cards: [['Observe', 'Find the feature', 'Look for a visible character before naming the group.'], ['Group', 'Choose the smallest defensible unit', 'Order or suborder first; family only when the key is supplied.'], ['Explain', 'State the evidence', 'Name the diagnostic trait and what it means.']] },
  { kicker: 'Lesson 2', title: 'External anatomy', intro: 'Focus on the head, thorax, legs, and abdomen. Learn where structures sit and what they do before working through taxonomic identifications.', cards: [['Head', 'compound eyes, ocellus, antennae', 'Sensory input and sight.'], ['Mouthparts', 'labrum, mandibles, maxilla, labium', 'Feeding structures and function.'], ['Thorax', 'prothorax, mesothorax, metathorax', 'Leg and wing attachment points.'], ['Abdomen', 'spiracles, cerci, terga, sterna', 'Breathing and posterior structures.']] },
  { kicker: 'Lesson 3', title: 'Internal anatomy', intro: 'Internal anatomy is usually less about huge memorization and more about the relationship between structure and function: respiration, circulation, digestion, and neural coordination.', cards: [['Circulation', 'heart + aorta + dorsal vessel', 'Moves hemolymph through the body.'], ['Respiration', 'tracheae, tracheoles, taenidia', 'Delivers oxygen to tissues.'], ['Digestion', 'crop, ventriculus, Malpighian tubules', 'Processes and moves nutrients and waste.']] },
  { kicker: 'Lesson 4', title: 'Legs, wings, mouthparts & antennae', intro: 'Learn the basic type, its function, and what feature distinguishes it from a similar structure.', cards: [['Legs', 'saltatorial, fossorial, raptorial, natatorial', 'Jumping, digging, grasping, swimming.'], ['Wings', 'tegmina, elytra, hemelytra, fringed wings', 'Leathery, membranous, or fringe-winged forms.'], ['Antennae', 'serrate, plumose, filiform, geniculate', 'Saw-like, feather-like, thread-like, elbowed.']] },
  { kicker: 'Lesson 5', title: 'Taxonomic hierarchy and major groups', intro: 'Keep the hierarchy clear: order, suborder, family, and grouping. The practical likely expects you to identify a group by a combination of characters rather than a single detail.', cards: [['Major groups', 'Apterygote, Paleoptera, Neoptera', 'Primitive and derived lineages.'], ['Orders', 'Ephemeroptera, Odonata, Orthoptera, Hemiptera', 'Use orders as the core recognition target.'], ['Suborders', 'Zygoptera, Anisoptera, Ensifera, Heteroptera', 'Look for the correct subordinate grouping.']] },
  { kicker: 'Lesson 6', title: 'Orders & suborders: how to recognize them', intro: 'A strong answer usually names the specific trait that distinguishes one order or suborder from the others. Practice from a clue to the taxon, then reverse it and say why the answer matches.', cards: [['Odonata', 'strong flyers, aquatic nymphs, hinged mask', 'Often obvious by wing plan and predatory nymphs.'], ['Orthoptera', 'saltatorial hind legs, tegmina, tympana', 'Classic jumping grasshopper and cricket clues.'], ['Hemiptera', 'piercing-sucking beak, often hemelytra or wings', 'A beak and stylized mouthparts are the key giveaway.']] },
  { kicker: 'Lesson 7', title: 'Polyneoptera & Dictyoptera', intro: 'These groups are best recognized by the combination of morphology and life history. Focus on wing form, mouthparts, and the presence of a distinctive body plan or feeding habit.', cards: [['Polyneoptera', 'Orthoptera, Phasmatodea, Dermaptera, Plecoptera', 'Diverse assemblage with major morphological variation.'], ['Dictyoptera', 'Blattodea, Mantodea', 'Commonly recognized by body plan and forewing features.']] },
  { kicker: 'Lesson 8', title: 'Hemiptera and its suborders', intro: 'Learn the three suborders and the common family-level key characters that the supplied keys rely on in practice.', cards: [['Sternorrhyncha', 'aphids, scale insects', 'Often soft-bodied and plant-feeding.'], ['Auchenorrhyncha', 'cicadas, leafhoppers', 'Membranous wings and hind leg/wing patterns often matter.'], ['Heteroptera', 'true bugs', 'Beak-based predators and plant feeders, often with hemelytra.']] },
  { kicker: 'Lesson 9', title: 'Families: what features the provided keys use', intro: 'The study guide says that they will provide a key for the families, so you don\'t have to memorize them. The course keys depend on a small set of structures: wing veins, beak segments, abdomen shape, and foreleg specialization.', cards: [['Odonata key', 'triangle shape, anal loop, wing position', 'The family key begins with wing characters.'], ['Orthoptera key', 'antenna length, ovipositor, ear position', 'Suborder-level cues feed into family-level distinctions.'], ['Hemiptera key', 'beak, wing structure, tarsi, cornicles', 'These are the most common decision points in the family key.']] },
  { kicker: 'Lesson 10', title: 'Final practical strategy', intro: 'Start with the biggest visible clue, then narrow down by order, suborder, and any supplied key characters. Do not chase every tiny detail: choose the strongest, most identifying trait and explain it.', cards: [['Step 1', 'Find the main feature', 'Wing plan, mouthparts, leg type, or body form.'], ['Step 2', 'Match the group', 'Use the smallest group that fits the evidence.'], ['Step 3', 'State the reason', 'Explain which characteristic makes that answer strongest.']] }
];
function renderLearn() {
  const lessonIndex = practicalState.lessonIndex || 0;
  const lesson = practicalLessons[lessonIndex];
  return `<div class="learn-layout"><div class="learn-nav">${practicalLessons.map((item, index) => `<button class="learn-step ${index === lessonIndex ? 'active' : ''}" data-learn-nav="${index}">${index + 1}. ${esc(item.title)}</button>`).join('')}</div><article class="lesson-panel"><div class="eyebrow">${esc(lesson.kicker)}</div><h2>${esc(lesson.title)}</h2><p>${esc(lesson.intro)}</p>${lesson.cards ? `<div class="learn-grid">${lesson.cards.map(([label, title, detail]) => `<div class="memory-card"><div class="order-name">${esc(label)}</div><strong>${esc(title)}</strong><div>${esc(detail)}</div></div>`).join('')}</div>` : ''}<div class="lesson-actions"><button class="secondary" id="prevPracticalLesson" ${lessonIndex === 0 ? 'disabled' : ''}>← Previous</button><button class="primary" id="nextPracticalLesson">${lessonIndex === practicalLessons.length - 1 ? 'Go to Practice →' : 'Next lesson →'}</button></div></article></div>`;
}
function renderAnatomy() {
  return `<div class="controls"><label for="anatomyFilter">Focus</label><select id="anatomyFilter"><option>All anatomy</option><option>External anatomy</option><option>Internal anatomy</option></select></div><div class="practical-grid" id="anatomyCards">${anatomy.map((item, index) => card(item[1], `<span class="tag">${esc(item[0])}</span>${list(item[2])}<p>${esc(item[3])}<button class="link-button anatomy-check" data-anatomy="${index}">Test this structure</button></p>`)).join('')}</div><div id="anatomyQuestionArea"></div>`;
}
function renderGroups() {
  return `<div class="practice-banner"><strong>No-key recognition.</strong> Start from observable traits, then identify the order or suborder. Diagnostic explanations appear after each answer.</div><div class="controls"><label for="groupRank">Rank</label><select id="groupRank"><option value="order">Orders</option><option value="suborder">Suborders</option><option value="group">Major groupings</option></select><button class="primary" id="groupQuestion">New question</button></div><div id="groupQuestionArea" class="question-area">${groupPrompt()}</div>`;
}
function groupPrompt() {
  const rank = document.getElementById('groupRank')?.value || 'order';
  const pool = rank === 'order' ? orders.filter(name => { const taxon = practicalTaxa.find(item => item.name === name); return taxon?.diagnosticTraits.length && !taxon.sourceLimitation; }) : rank === 'suborder' ? suborders.filter(name => { const taxon = practicalTaxa.find(item => item.name === name); return taxon?.diagnosticTraits.length && !taxon.sourceLimitation; }) : groups.map(item => item[0]);
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
  const searchTerm = '';
  const tab = practicalState.referenceTab || 'taxa';
  const taxaFilter = practicalState.referenceTaxaFilter || 'all';
  const anatomyTab = practicalState.referenceAnatomyTab || 'external';
  const morphologyTab = ['Legs', 'Mouthparts', 'Wings', 'Antennae'].includes(practicalState.referenceMorphologyTab) ? practicalState.referenceMorphologyTab : 'Legs';

  const listItems = items => items && items.length ? `<ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : '';
  const cardList = (title, items) => items && items.length ? `<div class="reference-card-block"><h4>${esc(title)}</h4>${listItems(items)}</div>` : '';

  const taxaEntries = practicalTaxa.filter(taxon => {
    if (taxaFilter === 'all') return true;
    if (taxaFilter === 'major') return ['grouping', 'phylum', 'subphylum', 'class'].includes(taxon.rank) || ['Arthropoda', 'Hexapoda', 'Insecta', 'Entognatha', 'Apterygote', 'Paleoptera', 'Neoptera', 'Polyneoptera', 'Dictyoptera', 'Paraneoptera'].includes(taxon.name);
    if (taxaFilter === 'orders') return taxon.rank === 'order';
    if (taxaFilter === 'suborders') return taxon.rank === 'suborder';
    return ['family', 'superfamily'].includes(taxon.rank);
  });

  const referenceTaxaCards = taxaEntries.map(taxon => {
    const label = taxon.rank === 'phylum' ? 'Phylum' : taxon.rank === 'subphylum' ? 'Subphylum' : taxon.rank === 'class' ? 'Class' : taxon.rank === 'grouping' ? 'Major group' : taxon.rank === 'order' ? 'Order' : taxon.rank === 'suborder' ? 'Suborder' : taxon.rank === 'family' ? 'Family' : 'Superfamily';
    const classification = [taxon.parent, taxon.grouping].filter(Boolean).join(' › ');
    const aliases = (taxon.aliases || []).filter(Boolean);
    const searchable = [taxon.name, label, classification, ...(taxon.diagnosticTraits || []), ...(taxon.ecology || []), ...(taxon.lifeHistory || []), ...(taxon.practicalFacts || []), ...(taxon.confusionTaxa || []), ...(taxon.distinctions || []), ...(aliases || [])].join(' ');
    if (searchTerm && !searchable.toLowerCase().includes(searchTerm)) return '';
    const sections = [];
    sections.push(cardList('How to identify', taxon.diagnosticTraits || []));
    sections.push(cardList('Ecology / biology', taxon.ecology || []));
    sections.push(cardList('Life history', taxon.lifeHistory || []));
    sections.push(cardList('Relevant morphology', [taxon.legType ? `Legs: ${taxon.legType}` : '', taxon.wingType ? `Wings: ${taxon.wingType}` : '', taxon.mouthpartType ? `Mouthparts: ${taxon.mouthpartType}` : '', taxon.antennaType ? `Antennae: ${taxon.antennaType}` : ''].filter(Boolean)));
    sections.push(cardList('Important practical facts', taxon.practicalFacts || []));
    sections.push(cardList('Confusion taxa', taxon.confusionTaxa || []));
    sections.push(cardList('Distinctions', taxon.distinctions || []));
    if (taxon.sourceLimitation) sections.push(`<div class="reference-card-block reference-note"><h4>Source limitation</h4><p>${esc(taxon.sourceLimitation)}</p></div>`);
    return `<article class="reference-taxon-row reference-rank-${esc(taxon.rank)}" data-reference-search="${esc(searchable)}"><div><span class="tag">${esc(label)}</span><h3>${esc(taxon.name)}</h3><p class="common-name">${esc(taxon.commonName)}</p>${classification ? `<p class="subtle">${esc(classification)}</p>` : ''}</div><button class="secondary reference-details-button" data-reference-taxon="${esc(taxon.name)}">View details</button><div class="reference-taxon-details" data-reference-details="${esc(taxon.name)}" hidden>${sections.join('')}</div></article>`;
  }).join('');

  const anatomyRows = anatomy.filter(([kind]) => kind === (anatomyTab === 'external' ? 'External anatomy' : 'Internal anatomy')).flatMap(([kind, region, structures]) => structures.split(';').map(str => {
    const term = str.trim();
    const detail = anatomyDetails[term] || ['',''];
    return { term, location: detail[0], function: detail[1] };
  }));

  const referenceAnatomyCards = `<div class="reference-controls"><div class="reference-segmented">${['external', 'internal'].map(mode => `<button class="segment-button ${anatomyTab === mode ? 'active' : ''}" data-reference-anatomy-tab="${mode}">${mode === 'external' ? 'External' : 'Internal'}</button>`).join('')}</div></div><div class="reference-table-wrap"><table class="reference-table"><thead><tr><th>Region</th><th>Structure</th><th>Location</th><th>Function</th></tr></thead><tbody>${anatomyRows.length ? anatomyRows.map(row => `<tr data-reference-search="${esc([row.term, row.location, row.function].join(' '))}"><td>${esc(row.region)}</td><td>${esc(row.term)}</td><td>${esc(row.location)}</td><td>${esc(row.function)}</td></tr>`).join('') : `<tr><td colspan="4" class="empty-state">No supporting entries for this anatomy category yet.</td></tr>`}</tbody></table></div>`;

  const morphologyCategories = ['Legs', 'Mouthparts', 'Wings', 'Antennae'];
  const morphologyRows = morphology
    .filter(([category]) => category === (morphologyTab === 'Legs' ? 'Leg types' : morphologyTab === 'Mouthparts' ? 'Mouthpart types' : morphologyTab === 'Wings' ? 'Wing types' : 'Antenna types'))
    .flatMap(([category, terms, descriptions]) => terms.map((term, index) => ({ term, description: descriptions[index] || descriptions[0] })));
  const referenceMorphology = `<div class="reference-controls"><div class="reference-segmented">${morphologyCategories.map(value => `<button class="segment-button ${morphologyTab === value ? 'active' : ''}" data-reference-morphology-tab="${value}">${esc(value)}</button>`).join('')}</div></div><div class="reference-table-wrap"><table class="reference-table"><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody>${morphologyRows.length ? morphologyRows.map(row => `<tr data-reference-search="${esc([row.term, row.description].join(' '))}"><td>${esc(row.term)}</td><td>${esc(row.description)}</td></tr>`).join('') : `<tr><td colspan="2" class="empty-state">No morphological entries available.</td></tr>`}</tbody></table></div>`;

  const referenceComparisons = comparisonData.map(([pair, explanation]) => {
    const searchable = `${pair} ${explanation}`;
    return (searchTerm && !searchable.toLowerCase().includes(searchTerm)) ? '' : `<article class="reference-comparison-card" data-reference-search="${esc(searchable)}"><h3>${esc(pair)}</h3><p>${esc(explanation)}</p></article>`;
  }).join('') || '<p class="empty-state">No comparison matches this search.</p>';

  const referenceKeys = Object.entries(practicalFamilyKeys).map(([order, key]) => {
    const searchable = [order, key.title, ...key.nodes.map(node => `${node.feature} ${node.prompt} ${node.yes || ''} ${node.no || ''}`)].join(' ');
    return (searchTerm && !searchable.toLowerCase().includes(searchTerm)) ? '' : `<article class="reference-key-card" data-reference-search="${esc(searchable)}"><h3>${esc(order)}</h3><p class="subtle">${esc(key.title)}</p><ul>${key.nodes.slice(0, 5).map(node => `<li><strong>${esc(node.feature)}</strong>: ${esc(node.prompt)}</li>`).join('')}</ul></article>`;
  }).join('') || '<p class="empty-state">No key entries match this search.</p>';

  const anatomyRowsAll = anatomy.flatMap(([kind, region, structures]) => structures.split(';').map(str => {
    const term = str.trim();
    const detail = anatomyDetails[term] || ['',''];
    return { kind, region, term, location: detail[0], function: detail[1], searchable: `${kind} ${region} ${term} ${detail[0]} ${detail[1]}` };
  }));
  const morphologyRowsAll = morphology.flatMap(([category, terms, descriptions]) => terms.map((term, index) => ({ category, term, recognition: term, function: descriptions[index] || descriptions[0], searchable: `${category} ${term} ${descriptions[index] || descriptions[0]}` })));

  const searchResults = searchTerm ? [
    ['Taxa', taxaEntries.filter(taxon => [taxon.name, taxon.parent, taxon.grouping, ...(taxon.diagnosticTraits || []), ...(taxon.ecology || []), ...(taxon.lifeHistory || []), ...(taxon.practicalFacts || []), ...(taxon.confusionTaxa || []), ...(taxon.distinctions || [])].join(' ').toLowerCase().includes(searchTerm)).map(taxon => { const label = taxon.rank === 'phylum' ? 'Phylum' : taxon.rank === 'subphylum' ? 'Subphylum' : taxon.rank === 'class' ? 'Class' : taxon.rank === 'grouping' ? 'Major group' : taxon.rank === 'order' ? 'Order' : taxon.rank === 'suborder' ? 'Suborder' : taxon.rank === 'family' ? 'Family' : 'Superfamily'; return `<article class="reference-card" data-reference-search="${esc([taxon.name, label, taxon.parent, taxon.grouping].join(' '))}"><div class="reference-card-header"><div><span class="tag">${esc(label)}</span><h3>${esc(taxon.name)}</h3><p class="subtle">${esc([taxon.parent, taxon.grouping].filter(Boolean).join(' › '))}</p></div></div>${cardList('How to identify', taxon.diagnosticTraits || '') || ''}${cardList('Important practical facts', taxon.practicalFacts || '') || ''}</article>`; }).join('')],
    ['Anatomy', (() => {
      const rows = anatomyRowsAll.filter(row => row.searchable.toLowerCase().includes(searchTerm));
      if (!rows.length) return '';
      return `<table class="reference-table"><thead><tr><th>Section</th><th>Structure</th><th>Location</th><th>Function</th></tr></thead><tbody>${rows.map(row => `<tr data-reference-search="${esc(row.searchable)}"><td>${esc(row.kind.replace(' anatomy', ''))}</td><td>${esc(row.term)}</td><td>${esc(row.location)}</td><td>${esc(row.function)}</td></tr>`).join('')}</tbody></table>`;
    })()],
    ['Morphology', (() => {
      const rows = morphologyRowsAll.filter(row => row.searchable.toLowerCase().includes(searchTerm));
      if (!rows.length) return '';
      return `<table class="reference-table"><thead><tr><th>Category</th><th>Type</th><th>Function</th></tr></thead><tbody>${rows.map(row => `<tr data-reference-search="${esc(row.searchable)}"><td>${esc(row.category)}</td><td>${esc(row.term)}</td><td>${esc(row.function)}</td></tr>`).join('')}</tbody></table>`;
    })()],
    ['Comparisons', (() => {
      const matches = comparisonData.filter(([pair, explanation]) => `${pair} ${explanation}`.toLowerCase().includes(searchTerm));
      if (!matches.length) return '';
      return matches.map(([pair, explanation]) => `<article class="reference-comparison-card" data-reference-search="${esc(`${pair} ${explanation}`)}"><h3>${esc(pair)}</h3><p>${esc(explanation)}</p></article>`).join('');
    })()],
    ['Keys', (() => {
      const matches = Object.entries(practicalFamilyKeys).filter(([order, key]) => [order, key.title, ...key.nodes.map(node => `${node.feature} ${node.prompt}`)].join(' ').toLowerCase().includes(searchTerm));
      if (!matches.length) return '';
      return matches.map(([order, key]) => `<article class="reference-key-card" data-reference-search="${esc([order, key.title].join(' '))}"><h3>${esc(order)}</h3><p class="subtle">${esc(key.title)}</p><ul>${key.nodes.slice(0, 5).map(node => `<li><strong>${esc(node.feature)}</strong>: ${esc(node.prompt)}</li>`).join('')}</ul></article>`).join('');
    })()]
  ].filter(([, content]) => content).map(([title, content]) => `<section class="reference-search-group"><h3>${esc(title)}</h3>${content}</section>`): [];
  const renderCurrentTab = () => {
    if (tab === 'taxa') return `<div class="reference-panel reference-taxonomy">${referenceTaxaCards || '<p class="empty-state">No taxa match that filter or search.</p>'}</div>`;
    if (tab === 'anatomy') return `<div class="reference-panel">${referenceAnatomyCards}</div>`;
    if (tab === 'morphology') return `<div class="reference-panel">${referenceMorphology}</div>`;
    if (tab === 'comparisons') return `<div class="reference-panel">${referenceComparisons}</div>`;
    return `<div class="reference-panel">${referenceKeys}</div>`;
  };

  if (searchTerm) {
    const hitGroups = searchResults.filter(Boolean);
    return `<div class="reference-shell"><header class="reference-header"><div><h2>Reference</h2><p>Look up any taxon, anatomical structure, morphology type, comparison, or family-key character for Practical 1.</p></div></header><div class="reference-toolbar"><input id="practicalSearch" type="search" value="${esc(practicalState.referenceQuery || '')}" placeholder="Search reference..." /><span class="pill">${hitGroups.length} matching groups</span></div><nav class="reference-tabs" aria-label="Reference sections">${['taxa', 'anatomy', 'morphology', 'comparisons', 'keys'].map(name => `<button class="tab ${tab === name ? 'active' : ''}" data-reference-tab="${name}">${name === 'taxa' ? 'Taxa' : name === 'anatomy' ? 'Anatomy' : name === 'morphology' ? 'Morphology' : name === 'comparisons' ? 'Comparisons' : 'Keys'}</button>`).join('')}</nav><div class="reference-panel">${hitGroups.length ? hitGroups.join('') : '<p class="empty-state">No reference entries match that search.</p>'}</div></div>`;
  }

  return `<div class="reference-shell"><header class="reference-header"><div><h2>Reference</h2><p>Use the sections below to review taxa, anatomy, morphology, comparisons, and keys for Practical 1.</p></div></header><nav class="reference-tabs" aria-label="Reference sections">${['taxa', 'anatomy', 'morphology', 'comparisons', 'keys'].map(name => `<button class="tab ${tab === name ? 'active' : ''}" data-reference-tab="${name}">${name === 'taxa' ? 'Taxa' : name === 'anatomy' ? 'Anatomy' : name === 'morphology' ? 'Morphology' : name === 'comparisons' ? 'Comparisons' : 'Keys'}</button>`).join('')}</nav>${tab === 'taxa' ? `<div class="reference-chip-row">${['all', 'major', 'orders', 'suborders', 'families'].map(filter => `<button class="segment-button ${taxaFilter === filter ? 'active' : ''}" data-reference-filter="${filter}">${filter === 'all' ? 'All' : filter === 'major' ? 'Major Groups' : filter === 'orders' ? 'Orders' : filter === 'suborders' ? 'Suborders' : 'Families / Superfamilies'}</button>`).join('')}</div>` : ''}${renderCurrentTab()}${tab === 'taxa' ? '<div class="reference-dialog" id="referenceTaxonDialog" hidden><div class="reference-dialog-card" role="dialog" aria-modal="true" aria-labelledby="referenceDialogTitle"><button class="reference-dialog-close secondary" data-reference-dialog-close>Close</button><div id="referenceDialogContent"></div></div></div>' : ''}</div>`;
}
function syncPracticeCount() {
  const slider = document.getElementById('practiceCountRange');
  if (!slider) return;
  const count = Number(slider.value) || 20;
  const label = document.getElementById('practiceCountValue');
  if (label) label.textContent = String(count);
  slider.value = String(Math.min(Math.max(count, 5), 100));
}
function renderPractice() {
  const missed = practicalState.missedOnly;
  const practiceSetupVisible = practicalState.practiceSetupVisible !== false;
  const activeQuestion = practicalState.practiceSession && practicalState.practiceIndex < practicalState.practiceSession.length ? practicalState.practiceSession[practicalState.practiceIndex] : null;
  const setupMarkup = `<div class="practice-setup ${practiceSetupVisible ? '' : 'hidden'}" id="practiceSetup"><div class="eyebrow">${missed ? 'Missed material' : 'Choose your session'}</div><h2>${missed ? 'Practice concepts you missed' : 'Mixed practical practice'}</h2><div class="practice-control"><label for="practiceFocus">Question type</label><select id="practiceFocus"><option value="mixed">Mixed practical</option><option value="order-suborder">Order &amp; suborder identification</option><option value="family-superfamily">Family &amp; superfamily identification</option><option value="anatomy">External anatomy &amp; internal anatomy</option><option value="morphology">Morphology types</option><option value="compare">Compare two groups</option><option value="select-all">Select all that apply</option><option value="yes-no">Yes / No feature</option><option value="ecology">Ecology &amp; life history</option><option value="simulation">Full practical simulation</option></select></div><div class="practice-control"><label for="practiceCountRange">Question count</label><div class="range-row"><input id="practiceCountRange" type="range" min="5" max="100" value="20" step="1"><output class="range-value" id="practiceCountValue" for="practiceCountRange">20</output></div></div><button class="primary" id="startPractice">Start practice</button></div>`;
  const sessionMarkup = activeQuestion ? `<div class="question-area"><div class="eyebrow">${esc(activeQuestion.type || 'practical')} • ${practicalState.practiceIndex + 1}/${practicalState.practiceSession.length}</div><h2 class="question">${activeQuestion.prompt}</h2><div class="options">${(activeQuestion.choices || []).map(choice => `<button class="option practice-answer" data-choice="${esc(choice)}">${esc(choice)}</button>`).join('')}</div><div id="practiceFeedback" class="explain"></div></div>` : '';
  return `${setupMarkup}<div id="practiceQuestionArea">${sessionMarkup}</div>`;
}
function renderSimulation() { return `<div class="simulation-intro"><div class="eyebrow">No immediate feedback</div><h2>20-question practical simulation</h2><p>Mixed order/suborder ID, anatomy, morphology, family-key workflow, comparisons, true statements, feature checks, and functional morphology. Answers and explanations appear at the end.</p><button class="primary" id="startSimulation">Start simulation</button></div><div id="simulationArea"></div>`; }
function renderSpeed() { return `<div class="speed"><button class="primary" id="startPracticalSpeed">Start 60-second round</button><span class="timer" id="practicalTimer">1:00</span><span id="practicalSpeedScore">Score: 0</span></div><div id="practicalSpeedArea"><p class="subtle">Fast recognition of the scoped orders, suborders, and anatomy terms.</p></div>`; }
function renderKeyWork(order, nodeId = null, history = []) {
  const key = practicalFamilyKeys[order];
  if (nodeId === 'h-invalid') {
    return `<div class="key-result"><div class="eyebrow">Outside this branch</div><h3>Reconsider the previous couplet</h3><p>A beak that is not 4-segmented does not match the supported Coreidae/Lygaeidae branch. Return to the preceding couplet rather than forcing an identification.</p><button class="secondary key-back" data-order="${order}" data-history="${esc(JSON.stringify(history.slice(0, -1)))}">← Back</button><button class="secondary key-restart" data-order="${order}">Restart key</button></div>`;
  }
  if (nodeId && !key.nodes.some(item => item.id === nodeId)) {
    const finalTaxon = practicalTaxa.find(taxon => taxon.name === nodeId);
    return `<div class="key-result"><div class="eyebrow">Identification</div><h3>${esc(nodeId)}</h3><p>${esc(finalTaxon?.diagnosticTraits.join('; ') || '')}</p><button class="secondary key-back" data-order="${order}" data-history="${esc(JSON.stringify(history.slice(0, -1)))}">← Back</button><button class="secondary key-restart" data-order="${order}">Restart key</button></div>`;
  }
  const node = key.nodes.find(item => item.id === nodeId) || key.nodes[0];
  return `<div class="eyebrow">Inspect: ${esc(node.feature)}</div><h3>${esc(node.prompt)}</h3><div class="options key-options"><button class="option key-branch" data-order="${order}" data-node="${node.yes}" data-history="${esc(JSON.stringify([...history, node.id]))}">Yes</button><button class="option key-branch" data-order="${order}" data-node="${node.no}" data-history="${esc(JSON.stringify([...history, node.id]))}">No</button></div><p class="mini">Course couplet feature: ${esc(node.feature)}</p>${history.length ? `<button class="secondary key-back" data-order="${order}" data-history="${esc(JSON.stringify(history.slice(0, -1)))}">← Back</button>` : ''}<button class="secondary key-restart" data-order="${order}">Restart key</button>`;
}

function renderTab() {
  const views = { learn: renderLearn, practice: renderPractice, reference: renderReference };
  document.getElementById('practicalContent').innerHTML = views[practicalState.tab]();
  document.querySelectorAll('[data-practical-tab]').forEach(button => button.classList.toggle('active', button.dataset.practicalTab === practicalState.tab));
  bindTabEvents();
}
function setPracticalTab(tab) { practicalState.tab = tab; renderTab(); }
function bindTabEvents() {
  document.querySelectorAll('[data-practical-tab]').forEach(button => button.onclick = () => setPracticalTab(button.dataset.practicalTab));
  const prevLesson = document.getElementById('prevPracticalLesson');
  const nextLesson = document.getElementById('nextPracticalLesson');
  if (prevLesson) prevLesson.onclick = () => { if (practicalState.lessonIndex > 0) { practicalState.lessonIndex -= 1; renderTab(); } };
  if (nextLesson) nextLesson.onclick = () => { if (practicalState.lessonIndex < practicalLessons.length - 1) { practicalState.lessonIndex += 1; renderTab(); } else { practicalState.tab = 'practice'; practicalState.practiceSetupVisible = true; renderTab(); } };
  document.querySelectorAll('[data-learn-nav]').forEach(button => button.onclick = () => { practicalState.lessonIndex = Number(button.dataset.learnNav); renderTab(); });
  document.querySelectorAll('.compare-reveal').forEach(button => button.onclick = () => { button.nextElementSibling.classList.toggle('hidden'); button.textContent = button.nextElementSibling.classList.contains('hidden') ? 'Reveal study prompt' : 'Hide prompt'; });
  document.querySelectorAll('.open-key, .open-question-key').forEach(button => button.onclick = () => { const work = document.getElementById(`key-work-${button.dataset.order}`); if (work) { work.innerHTML = renderKeyWork(button.dataset.order); document.getElementById(`key-${button.dataset.order}`).classList.remove('hidden'); bindKeyEvents(); } });
  bindKeyEvents();
  const search = document.getElementById('practicalSearch');
  if (search) {
    search.oninput = () => {
      practicalState.referenceQuery = search.value;
      document.getElementById('practicalContent').innerHTML = renderReference();
      bindTabEvents();
      requestAnimationFrame(() => {
        const activeSearch = document.getElementById('practicalSearch');
        if (activeSearch) {
          activeSearch.focus();
          activeSearch.setSelectionRange(activeSearch.value.length, activeSearch.value.length);
        }
      });
    };
  }
  document.querySelectorAll('[data-reference-tab]').forEach(button => button.onclick = () => {
    practicalState.referenceTab = button.dataset.referenceTab;
    document.getElementById('practicalContent').innerHTML = renderReference();
    bindTabEvents();
  });
  document.querySelectorAll('[data-reference-filter]').forEach(button => button.onclick = () => {
    practicalState.referenceTaxaFilter = button.dataset.referenceFilter;
    document.getElementById('practicalContent').innerHTML = renderReference();
    bindTabEvents();
  });
  document.querySelectorAll('[data-reference-anatomy-tab]').forEach(button => button.onclick = () => {
    practicalState.referenceAnatomyTab = button.dataset.referenceAnatomyTab;
    document.getElementById('practicalContent').innerHTML = renderReference();
    bindTabEvents();
  });
  document.querySelectorAll('[data-reference-morphology-tab]').forEach(button => button.onclick = () => {
    practicalState.referenceMorphologyTab = button.dataset.referenceMorphologyTab;
    document.getElementById('practicalContent').innerHTML = renderReference();
    bindTabEvents();
  });
  document.querySelectorAll('[data-reference-taxon]').forEach(button => button.onclick = () => {
    const dialog = document.getElementById('referenceTaxonDialog');
    const content = document.getElementById('referenceDialogContent');
    const taxon = practicalTaxa.find(item => item.name === button.dataset.referenceTaxon);
    if (!dialog || !content || !taxon) return;
    const details = document.querySelector(`[data-reference-details="${CSS.escape(taxon.name)}"]`);
    content.innerHTML = `<div class="eyebrow">${esc(taxon.rank)}</div><h2 id="referenceDialogTitle">${esc(taxon.name)}</h2><p class="common-name">${esc(taxon.commonName)}</p><p class="subtle">${esc([taxon.parent, taxon.grouping].filter(Boolean).join(' › '))}</p>${details ? details.innerHTML : '<p class="subtle">No additional supporting information is available.</p>'}`;
    dialog.hidden = false;
  });
  document.querySelectorAll('[data-reference-dialog-close]').forEach(button => button.onclick = () => {
    const dialog = document.getElementById('referenceTaxonDialog');
    if (dialog) dialog.hidden = true;
  });
  const range = document.getElementById('practiceCountRange');
  if (range) {
    range.oninput = () => { syncPracticeCount(); };
    syncPracticeCount();
  }
  const startPractice = document.getElementById('startPractice'); if (startPractice) startPractice.onclick = () => startPracticeQuestion();
  const returnSetup = document.getElementById('returnPracticeSetup'); if (returnSetup) returnSetup.onclick = () => { practicalState.practiceSession = null; practicalState.practiceSetupVisible = true; renderTab(); };
  const restartPractice = document.getElementById('restartPracticeSet'); if (restartPractice) restartPractice.onclick = () => startPracticeQuestion();
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
const shuffle = items => items.slice().sort(() => Math.random() - 0.5);
const anatomyRecords = anatomy.flatMap(item => item[2].split(';').map(term => term.trim()).map(term => ({
  term, region: item[1], category: item[0], detail: anatomyDetails[term], explanation: item[3]
})));
function buildCanonicalQuestions() {
  const questions = practicalQuestionBank.map(question => ({
    ...question, category: question.topic || question.category || 'general',
    acceptedAnswers: question.acceptedAnswers || [question.answer],
    choices: question.choices || []
  }));
  anatomyRecords.forEach(item => {
    const alternatives = anatomyRecords.filter(candidate => candidate.term !== item.term);
    questions.push(
      { id: `anatomy-name-${item.term}`, type: 'external-anatomy', topic: item.category, taxon: item.term, answer: item.term, choices: [item.term, ...shuffle(alternatives.map(candidate => candidate.term)).slice(0, 3)], prompt: `Which structure is described as <strong>${esc(item.detail?.[1] || item.explanation)}</strong>?`, explanation: `${item.term} is the relevant ${item.region.toLowerCase()} structure. ${item.detail?.[1] || item.explanation}`, acceptedAnswers: [item.term] },
      { id: `anatomy-location-${item.term}`, type: 'anatomy-location', topic: item.category, taxon: item.term, answer: item.region, choices: shuffle([...new Set([item.region, ...anatomy.map(candidate => candidate[1])])]), prompt: `Where should you locate <strong>${esc(item.term)}</strong>?`, explanation: `${item.term} belongs to the ${item.region.toLowerCase()}; ${item.detail?.[1] || item.explanation}`, acceptedAnswers: [item.region] }
    );
    if (item.detail) questions.push({
      id: `anatomy-function-${item.term}`, type: 'reverse-anatomy', topic: item.category, taxon: item.term,
      answer: item.term, choices: [item.term, ...shuffle(alternatives.filter(candidate => candidate.detail).map(candidate => candidate.term)).slice(0, 3)],
      prompt: `Which structure <strong>${esc(item.detail[1])}</strong>?`, explanation: `${item.term}: ${item.detail[1]}.`, acceptedAnswers: [item.term]
    });
  });
  practicalTaxa.filter(taxon => ['order', 'suborder'].includes(taxon.rank) && !taxon.sourceLimitation).forEach(taxon => {
    taxon.diagnosticTraits.forEach((clue, index) => questions.push({
      id: `id-${taxon.name}-${index}`, type: `${taxon.rank}-identification`, topic: 'taxonomy', taxon: taxon.name,
      rank: taxon.rank, answer: taxon.name, choices: [taxon.name, ...shuffle(practicalTaxa.filter(candidate => candidate.rank === taxon.rank && candidate.name !== taxon.name && !candidate.sourceLimitation).map(candidate => candidate.name)).slice(0, 3)],
      prompt: `Which ${taxon.rank} matches this supported clue? <strong>${esc(clue)}</strong>`, explanation: `${clue} supports ${taxon.name}; the other choices lack this supported combination.`, requiresKey: false
    }));
  });
  practicalTaxa.filter(taxon => taxon.requiresKey && !taxon.sourceLimitation).forEach(taxon => {
    const keyOrder = Object.keys(keyFamilies).find(order => keyFamilies[order].includes(taxon.name));
    taxon.diagnosticTraits.forEach((clue, index) => questions.push({
      id: `family-id-${taxon.name}-${index}`, type: 'family-identification', topic: 'family key', taxon: taxon.name,
      rank: taxon.rank, keyOrder, answer: taxon.name, acceptedAnswers: [taxon.name, ...(taxon.aliases || [])],
      choices: [taxon.name, ...shuffle(families.filter(family => family !== taxon.name)).slice(0, 3)],
      prompt: `Which family or superfamily is supported by this specimen feature? <strong>${esc(clue)}</strong>`,
      explanation: `${taxon.name} is supported by ${clue}. Use the ${keyOrder || 'supplied'} key to confirm the couplet.`, requiresKey: true
    }));
  });
  morphologyTypes.forEach(item => questions.push({
    id: `morphology-${item.category}-${item.term}`, type: 'functional-morphology', topic: 'morphology',
    answer: item.term, choices: [item.term, ...shuffle(morphologyTypes.filter(candidate => candidate.category === item.category && candidate.term !== item.term).map(candidate => candidate.term)).slice(0, 3)],
    prompt: `Which ${esc(item.category.toLowerCase().replace(/ types$/, ' type'))} is ${esc(item.description)}?`, explanation: `${item.term} is ${item.description}.`
  }));
  return [...questions, ...questionBankExtrasWithComparisons].map((question, index) => ({
    id: question.id || `canonical-${index}`, ...question, category: question.category || question.topic || 'general',
    acceptedAnswers: question.acceptedAnswers || [question.answer]
  }));
}
const canonicalQuestions = buildCanonicalQuestions();
window.practicalAudit = () => ({
  total: canonicalQuestions.length,
  byType: canonicalQuestions.reduce((counts, question) => { counts[question.type] = (counts[question.type] || 0) + 1; return counts; }, {}),
  byTaxon: practicalTaxa.filter(taxon => ['order', 'suborder', 'family', 'superfamily'].includes(taxon.rank)).map(taxon => ({
    taxon: taxon.name, questions: canonicalQuestions.filter(question => question.taxon === taxon.name).length,
    types: [...new Set(canonicalQuestions.filter(question => question.taxon === taxon.name).map(question => question.type))],
    sourceLimited: Boolean(taxon.sourceLimitation), usesKey: Boolean(taxon.requiresKey)
  })),
  limitations: practicalTaxa.filter(taxon => taxon.sourceLimitation).map(taxon => `${taxon.name}: ${taxon.sourceLimitation}`)
});
function makePracticeQuestions(focus, missedOnly = false) {
  const progress = getProgress();
  let pool = canonicalQuestions;
  if (missedOnly) {
    const missed = new Set(Object.keys(progress.misses));
    pool = pool.filter(question => missed.has(question.taxon) || missed.has(question.answer) || missed.has(question.id));
  }
  if (focus === 'anatomy') pool = pool.filter(question => /anatomy|reverse-anatomy/.test(question.type));
  if (focus === 'order-suborder') pool = pool.filter(question => ['order-identification', 'suborder-identification', 'grouping'].includes(question.type) || question.topic === 'taxonomy');
  if (focus === 'family-superfamily') pool = pool.filter(question => question.requiresKey || /family-identification|mystery-specimen/.test(question.type));
  if (focus === 'morphology') pool = pool.filter(question => /morphology/.test(question.type));
  if (focus === 'compare') pool = pool.filter(question => question.type === 'comparison');
  if (focus === 'select-all') pool = pool.filter(question => question.type === 'select-all');
  if (focus === 'yes-no') pool = pool.filter(question => question.type === 'yes-no-feature');
  if (focus === 'ecology') pool = pool.filter(question => /ecology-life-history|functional-morphology/.test(question.type));
  if (focus === 'simulation') pool = canonicalQuestions.filter(question => !question.requiresKey || /family-identification|mystery-specimen/.test(question.type));
  return shuffle(pool);
}
function startPracticeQuestion() {
  const focus = document.getElementById('practiceFocus') ? document.getElementById('practiceFocus').value : 'mixed';
  const slider = document.getElementById('practiceCountRange');
  const count = Math.min(100, Math.max(5, Number(slider ? slider.value : 20) || 20));
  const questions = makePracticeQuestions(focus, practicalState.missedOnly).slice(0, count);
  practicalState.practiceSession = questions;
  practicalState.practiceIndex = 0;
  practicalState.practiceScore = 0;
  practicalState.practiceSetupVisible = false;
  const setup = document.getElementById('practiceSetup');
  if (setup) setup.classList.add('hidden');
  const area = document.getElementById('practiceQuestionArea');
  if (!questions.length) {
    area.innerHTML = '<div class="explain show">No questions match this focus or your recorded misses.</div>';
    return;
  }
  let index = 0;
  let score = 0;
  let skipped = 0;
  const finishSet = () => {
    const answered = index - skipped;
    area.innerHTML = `<div class="speed-end"><div class="eyebrow">Set ended early</div><h2>${score}/${answered} correct</h2><p>Answered ${answered} of ${questions.length}; skipped ${skipped}.</p><div class="next-row"><button class="secondary" id="restartPracticeSet">Try another set</button><button class="primary" id="returnPracticeSetup">Return to setup</button></div></div>`;
    document.getElementById('restartPracticeSet').onclick = () => startPracticeQuestion();
    document.getElementById('returnPracticeSetup').onclick = () => { practicalState.practiceSession = null; practicalState.practiceSetupVisible = true; renderTab(); };
  };
  const next = () => {
    if (index >= questions.length) {
      const answered = questions.length - skipped;
      area.innerHTML = `<div class="speed-end"><div class="eyebrow">Set complete</div><h2>${score}/${answered} correct</h2><p>Answered ${answered} of ${questions.length}; skipped ${skipped}.</p><div class="next-row"><button class="secondary" id="restartPracticeSet">Try another set</button><button class="primary" id="returnPracticeSetup">Return to setup</button></div></div>`;
      document.getElementById('restartPracticeSet').onclick = () => startPracticeQuestion();
      document.getElementById('returnPracticeSetup').onclick = () => { practicalState.practiceSession = null; practicalState.practiceSetupVisible = true; renderTab(); };
      return;
    }
    const question = questions[index];
    const options = question.type === 'select-all'
      ? question.choices.map(choice => `<label class="option"><input type="checkbox" class="practice-select" value="${esc(choice)}"> ${esc(choice)}</label>`).join('')
      : (question.type === 'yes-no-feature' ? ['Yes', 'No'] : question.choices.sort(() => Math.random() - 0.5)).map(choice => `<button class="option practice-answer" data-choice="${esc(choice)}">${esc(choice)}</button>`).join('');
    area.innerHTML = `<div class="question-area"><div class="eyebrow">${esc(focus)} • ${index + 1}/${questions.length}</div><h2 class="question">${question.prompt}</h2><div class="options">${options}</div>${question.type === 'select-all' ? '<button class="primary" id="submitSelectAll">Submit selections</button>' : ''}<div id="practiceFeedback" class="explain"></div><div class="next-row practice-actions"><button class="secondary" id="skipPractice">Unsure / Skip</button><button class="secondary" id="finishPractice">Finish early</button></div></div>`;
    document.getElementById('skipPractice').onclick = () => { skipped += 1; index += 1; next(); };
    document.getElementById('finishPractice').onclick = finishSet;
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
  const pick = (predicate, count) => shuffle(canonicalQuestions.filter(predicate)).slice(0, count);
  const order = pick(question => ['order-identification', 'suborder-identification'].includes(question.type) && !question.requiresKey, 5);
  const external = pick(question => question.type === 'external-anatomy', 3);
  const morphologyQs = pick(question => question.type === 'functional-morphology', 2);
  const internal = pick(question => question.type === 'internal-anatomy' || (question.type === 'anatomy-location' && question.topic === 'Internal anatomy'), 3);
  const familyQs = pick(question => question.type === 'family-identification' && question.requiresKey, 3);
  const comparison = pick(question => question.type === 'comparison', 1);
  const selectAll = pick(question => question.type === 'select-all', 1);
  const yesNo = pick(question => question.type === 'yes-no-feature', 1);
  const ecology = pick(question => question.type === 'ecology-life-history' || question.type === 'functional-morphology', 1);
  return [...order, ...external, ...morphologyQs, ...internal, ...familyQs, ...comparison, ...selectAll, ...yesNo, ...ecology].slice(0, 20);
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
    const key = question.requiresKey && question.keyOrder ? `<button class="secondary open-question-key" data-order="${question.keyOrder}">Open key</button><div class="key-body hidden" id="key-${question.keyOrder}"><div id="key-work-${question.keyOrder}"></div></div>` : '';
    const options = question.type === 'select-all'
      ? question.choices.map(choice => `<label class="option"><input type="checkbox" class="simulation-select" value="${esc(choice)}"> ${esc(choice)}</label>`).join('')
      : question.choices.sort(() => Math.random() - 0.5).map(choice => `<button class="option simulation-answer" data-choice="${esc(choice)}">${esc(choice)}</button>`).join('');
    area.innerHTML = `<div class="question-area"><div class="eyebrow">Station ${index + 1}/${questions.length}</div><h2 class="question">${question.prompt}</h2>${key}<div class="options">${options}</div>${question.type === 'select-all' ? '<button class="primary" id="submitSimulationSelectAll">Submit selections</button>' : ''}<button class="secondary" id="skipSimulation">Skip</button></div>`;
    bindQuestionKeyEvents();
    const record = choice => { const expected = Array.isArray(question.answer) ? question.answer.slice().sort().join('|') : question.answer; const actual = Array.isArray(choice) ? choice.slice().sort().join('|') : choice; const correct = actual === expected; answers.push({ ...question, choice: Array.isArray(choice) ? choice.join(', ') : choice, correct }); recordProgress(question, correct); index += 1; show(); };
    document.querySelectorAll('.simulation-answer').forEach(button => button.onclick = () => record(button.dataset.choice));
    const submitAll = document.getElementById('submitSimulationSelectAll');
    if (submitAll) submitAll.onclick = () => record([...document.querySelectorAll('.simulation-select:checked')].map(input => input.value));
    document.getElementById('skipSimulation').onclick = () => record('');
  };
  show();
}
function startPracticalSpeed() { let left = 60, score = 0; const area = document.getElementById('practicalSpeedArea'); const timer = document.getElementById('practicalTimer'); const scoreNode = document.getElementById('practicalSpeedScore'); const tick = () => { timer.textContent = `0:${String(left).padStart(2, '0')}`; }; const ask = () => { const term = [...orders, ...suborders, ...anatomy.flatMap(item => item[2].split(';'))][Math.floor(Math.random() * 40)].trim(); area.innerHTML = `<div class="question-area"><h2 class="question">What should you recall about <strong>${esc(term)}</strong>?</h2><button class="primary" id="speedPoint">I know it</button><button class="secondary" id="speedSkip">Skip</button></div>`; document.getElementById('speedPoint').onclick = () => { score += 1; scoreNode.textContent = `Score: ${score}`; ask(); }; document.getElementById('speedSkip').onclick = ask; }; tick(); ask(); const interval = setInterval(() => { left -= 1; tick(); if (left <= 0) { clearInterval(interval); area.innerHTML = `<div class="speed-end"><h2>${score} points</h2><p>Review the terms you skipped, then try again.</p></div>`; } }, 1000); }
renderTab();
