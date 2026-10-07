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
  ['Hexapoda', 'Subphylum', 'Entognatha; Insecta'],
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
/* Structured version of comparisonData. holder: 'a' | 'b' | 'both' | 'neither'. Every answer option names only the two groups in the prompt. */
const comparisonCharacters = [
  { title: 'Archaeognatha vs Zygentoma', a: 'Archaeognatha', b: 'Zygentoma', features: [['monocondylic mandibles', 'a'], ['wingless', 'both'], ['ametabolous development', 'both'], ['a long caudal filament plus two cerci', 'both'], ['a subimago stage', 'neither', 'Ephemeroptera']] },
  { title: 'Ephemeroptera vs Plecoptera', a: 'Ephemeroptera', b: 'Plecoptera', features: [['a subimago stage', 'a'], ['adults that live minutes to days without feeding', 'a'], ['aquatic juveniles', 'both'], ['cornicles near the posterior abdomen', 'neither', 'Aphididae']] },
  { title: 'Anisoptera vs Zygoptera', a: 'Anisoptera', b: 'Zygoptera', features: [['robust bodies and powerful flight', 'a'], ['wings held horizontally at rest', 'a'], ['delicate bodies', 'b'], ['forewings and hindwings similar in size and shape', 'b'], ['wings typically held vertically over the body at rest', 'b'], ['tympana on the first abdominal segment', 'neither', 'Caelifera']] },
  { title: 'Aeshnidae vs Libellulidae', a: 'Aeshnidae', b: 'Libellulidae', features: [['wing triangles that are similar and point the same direction', 'a'], ['no foot-shaped anal loop on the hindwing', 'a'], ['a foot-shaped anal loop on the hindwing', 'b'], ['wing triangles that differ in shape and point in different directions', 'b'], ['hindwings broader basally than the forewings', 'both'], ['tympana on the fore tibiae', 'neither', 'Gryllidae and Tettigoniidae']] },
  { title: 'Caelifera vs Ensifera', a: 'Caelifera', b: 'Ensifera', features: [['shorter antennae', 'a'], ['a small ovipositor', 'a'], ['tympana on the first abdominal segment', 'a'], ['longer antennae', 'b'], ['a long, conspicuous ovipositor (usually)', 'b'], ['tympana, when present, on the fore tibiae', 'b'], ['enlarged saltatorial (jumping) hind legs', 'both'], ['cornicles near the posterior abdomen', 'neither', 'Aphididae']] },
  { title: 'Gryllidae vs Tettigoniidae', a: 'Gryllidae', b: 'Tettigoniidae', features: [['3 tarsomeres', 'a'], ['a dorsoventrally flattened body', 'a'], ['4 tarsomeres', 'b'], ['a laterally compressed body', 'b'], ['a blade-like ovipositor', 'b'], ['long antennae', 'both'], ['tympana on the fore tibiae', 'both'], ['cornicles near the posterior abdomen', 'neither', 'Aphididae']] },
  { title: 'Tettigoniidae vs Rhaphidophoridae', a: 'Tettigoniidae', b: 'Rhaphidophoridae', features: [['tympana on the fore tibiae', 'a'], ['no tympanal organs', 'b'], ['wingless', 'b'], ['long antennae', 'both'], ['4 tarsomeres', 'both'], ['3 tarsomeres', 'neither', 'Acrididae and Gryllidae']] },
  { title: 'Aphididae vs Coccoidae', a: 'Aphididae', b: 'Coccoidae', features: [['cornicles near the posterior abdomen', 'a'], ['always three pairs of legs', 'a'], ['no cornicles', 'b'], ['females that are often legless', 'b'], ['mouthparts arising behind or under the eyes', 'both'], ['hemelytra held flat over the abdomen', 'neither', 'Heteroptera']] },
  { title: 'Cicadellidae vs Cercopidae', a: 'Cicadellidae', b: 'Cercopidae', features: [['hind tibiae with rows of smaller spines', 'a'], ['1–2 stout hind-tibial spines and an apical ring of spines', 'b'], ['short, bristle-like antennae', 'both'], ['a pronotum greatly expanded over the abdomen', 'neither', 'Membracidae']] },
  { title: 'Membracidae vs other Auchenorrhyncha', a: 'Membracidae', b: 'other Auchenorrhyncha', features: [['a pronotum greatly expanded and extending over the abdomen', 'a'], ['mouthparts arising behind or under the eyes', 'both'], ['hemelytra held flat over the abdomen', 'neither', 'Heteroptera']] },
  { title: 'Fulgoroidea vs other Auchenorrhyncha', a: 'Fulgoroidea', b: 'other Auchenorrhyncha', features: [['aristate antennae with a bulbous pedicel, positioned below the eyes', 'a'], ['a Y-shaped anal vein', 'a'], ['mouthparts arising behind or under the eyes', 'both'], ['cornicles near the posterior abdomen', 'neither', 'Aphididae']] },
  { title: 'Belostomatidae vs Corixidae', a: 'Belostomatidae', b: 'Corixidae', features: [['large raptorial forelegs', 'a'], ['a relatively long, thin beak', 'a'], ['reduced forelegs with scoop-shaped tarsi', 'b'], ['a short, broad, rounded beak', 'b'], ['hemelytra held flat over the abdomen', 'both'], ['a pronotum greatly expanded over the abdomen', 'neither', 'Membracidae']] },
  { title: 'Belostomatidae vs Gerridae', a: 'Belostomatidae', b: 'Gerridae', features: [['large raptorial forelegs', 'a'], ['life on the water surface', 'b'], ['very long, slender middle and hind legs', 'b'], ['mouthparts arising in front of the eyes', 'both'], ['tympana on the first abdominal segment', 'neither', 'Caelifera']] },
  { title: 'Pentatomidae vs Scutelleridae', a: 'Pentatomidae', b: 'Scutelleridae', features: [['a scutellum that completely covers the abdomen and wings', 'b'], ['a large, distinct scutellum', 'both'], ['cornicles near the posterior abdomen', 'neither', 'Aphididae']] },
  { title: 'Coreidae vs Lygaeidae', a: 'Coreidae', b: 'Lygaeidae', features: [['many veins in the wing membrane', 'a'], ['4–5 distinct veins in the wing membrane', 'b'], ['simple forelegs', 'b'], ['a 4-segmented beak', 'both'], ['a cuneus with 1–2 closed cells in the membrane', 'neither', 'Miridae']] },
  { title: 'Miridae vs Lygaeidae', a: 'Miridae', b: 'Lygaeidae', features: [['a cuneus', 'a'], ['1–2 closed cells in the membrane', 'a'], ['no ocelli', 'a'], ['no cuneus', 'b'], ['4–5 distinct veins in the wing membrane', 'b'], ['hemelytra held flat over the abdomen', 'both'], ['a subimago stage', 'neither', 'Ephemeroptera']] }
];
const buildComparisonQuestions = () => comparisonCharacters.flatMap(({ title, a, b, features }, pairIndex) => features.map(([feature, holder, owner], index) => {
  const both = `Both ${a} and ${b}`;
  const answer = { a, b, both, neither: 'Neither' }[holder];
  const context = (comparisonData.find(item => item[0] === title) || [])[1] || '';
  const explanation = holder === 'neither' ? `Neither: ${feature} belongs to ${owner}, not to ${a} or ${b}. ${context}` : holder === 'both' ? `Both ${a} and ${b} have ${feature}. ${context}` : `${answer}: ${feature}. ${context}`;
  return { id: `cmp-${pairIndex}-${index}`, type: 'comparison', category: 'Comparison', taxon: holder === 'b' ? b : a, prompt: `<strong>${a} vs ${b}</strong>: which is characterized by <strong>${feature}</strong>?`, answer, choices: [a, b, both, 'Neither'], explanation: explanation.trim() };
}));
const questionBankExtras = [
  { type: 'select-all', category: 'Select all', taxon: 'Ephemeroptera', prompt: 'Which statements are true of Ephemeroptera?', answer: ['aquatic juveniles', 'a subimago stage', 'adults live minutes to days and do not feed'], choices: ['aquatic juveniles', 'a subimago stage', 'adults live minutes to days and do not feed', 'hindwing has a foot-shaped anal loop', 'cornicles near the posterior abdomen', 'females are often legless'], explanation: 'The supplied notes support aquatic juveniles, a subimago stage, and short-lived non-feeding adults.' },
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
  ...buildComparisonQuestions(),
  { type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Aphididae', prompt: 'Do Aphididae have cornicles near the posterior end of the abdomen?', answer: 'Yes', choices: ['Yes', 'No'], explanation: 'The Hemiptera key uses cornicles to separate Aphididae from Coccoidae.' },
  { type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Rhaphidophoridae', prompt: 'Do Rhaphidophoridae lack tympanal organs entirely?', answer: 'Yes', choices: ['Yes', 'No'], explanation: 'The supplied Orthoptera notes state that Rhaphidophoridae lack tympanal organs entirely.' },
  { id: 'yn-coccoidae-cornicles', type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Coccoidae', prompt: 'Do Coccoidae have cornicles near the posterior end of the abdomen?', answer: 'No', choices: ['Yes', 'No'], explanation: 'Coccoidae lack cornicles; cornicles separate Aphididae from Coccoidae in the Hemiptera key.' },
  { id: 'yn-gryllidae-tarsomeres', type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Gryllidae', prompt: 'Do Gryllidae have 4 tarsomeres?', answer: 'No', choices: ['Yes', 'No'], explanation: 'Gryllidae have 3 tarsomeres; Tettigoniidae have 4.' },
  { id: 'yn-libellulidae-loop', type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Libellulidae', prompt: 'Do Libellulidae lack a foot-shaped anal loop on the hindwing?', answer: 'No', choices: ['Yes', 'No'], explanation: 'Libellulidae have a foot-shaped anal loop; Aeshnidae lack it.' },
  { id: 'yn-lygaeidae-cuneus', type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Lygaeidae', prompt: 'Do Lygaeidae have a cuneus?', answer: 'No', choices: ['Yes', 'No'], explanation: 'Lygaeidae lack a cuneus; Miridae have one.' },
  { id: 'yn-tettigoniidae-tarsomeres', type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Tettigoniidae', prompt: 'Do Tettigoniidae have 4 tarsomeres?', answer: 'Yes', choices: ['Yes', 'No'], explanation: 'Tettigoniidae have 4 tarsomeres; Gryllidae have 3.' },
  { id: 'yn-miridae-cuneus', type: 'yes-no-feature', category: 'Yes/no feature', taxon: 'Miridae', prompt: 'Do Miridae have a cuneus?', answer: 'Yes', choices: ['Yes', 'No'], explanation: 'Miridae have a cuneus and 1–2 closed cells in the membrane.' }
];
const keyFamilies = { Odonata: ['Aeshnidae', 'Libellulidae'], Orthoptera: ['Acrididae', 'Gryllidae', 'Tettigoniidae', 'Rhaphidophoridae'], Hemiptera: ['Aphididae', 'Coccoidae', 'Fulgoroidea', 'Cicadidae', 'Membracidae', 'Cercopidae', 'Cicadellidae', 'Belostomatidae', 'Corixidae', 'Gerridae', 'Cimicidae', 'Pentatomidae', 'Scutelleridae', 'Reduviidae', 'Coreidae', 'Lygaeidae', 'Miridae'] };
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
const list = value => `<ul>${value.split(';').map(item => `<li>${esc(item.trim())}</li>`).join('')}</ul>`;
let practicalState = { tab: 'learn', score: 0, asked: 0, flashIndex: 0, flashFlipped: false, key: {}, missedOnly: false, lessonIndex: 0, practiceSession: null, practiceIndex: 0, practiceScore: 0, practiceSkipped: 0, practiceSetupVisible: true, referenceTab: 'taxa', referenceQuery: '', referenceTaxaFilter: 'all', referenceAnatomyTab: 'external', referenceAnatomyCategory: 'Head', referenceMorphologyTab: 'Legs' };
const SEEN_KEY = 'ebioPracticalSeen';
function loadSeen() { try { return new Set(JSON.parse(localStorage.getItem(SEEN_KEY) || '[]')); } catch (error) { return new Set(); } }
function saveSeen(seen) { try { localStorage.setItem(SEEN_KEY, JSON.stringify([...seen])); } catch (error) { /* storage unavailable: questions just won't be remembered */ } }
function markSeen(id) { if (!id) return; const seen = loadSeen(); seen.add(id); saveSeen(seen); }
function hashId(text) { let hash = 5381; for (let i = 0; i < text.length; i++) hash = ((hash << 5) + hash + text.charCodeAt(i)) | 0; return (hash >>> 0).toString(36); }
/* Pick `count` questions, never-seen ones first. Only when fewer than `count` unseen remain does a new round start for this pool. */
function pickFresh(pool, count) {
  const seen = loadSeen();
  const fresh = shuffle(pool.filter(question => !seen.has(question.id)));
  if (fresh.length >= count) return fresh.slice(0, count);
  const recycled = shuffle(pool.filter(question => seen.has(question.id)));
  pool.forEach(question => seen.delete(question.id));
  saveSeen(seen);
  return [...fresh, ...recycled].slice(0, count);
}
function pickFreshOne(candidates) {
  const seen = loadSeen();
  let fresh = candidates.filter(item => !seen.has(item.id));
  if (!fresh.length) { candidates.forEach(item => seen.delete(item.id)); saveSeen(seen); fresh = candidates; }
  const choice = fresh[Math.floor(Math.random() * fresh.length)];
  return choice;
}
let clueOwnerIndex = null;
/* True when `name` itself has this clue, so it must not be offered as a wrong answer for it. */
function sharesClue(name, clue) {
  if (!clueOwnerIndex) {
    clueOwnerIndex = {};
    practicalTaxa.forEach(taxon => [...taxon.diagnosticTraits, ...taxon.observableFeatures, ...taxon.ecology, ...taxon.lifeHistory].forEach(text => { (clueOwnerIndex[text] = clueOwnerIndex[text] || new Set()).add(taxon.name); }));
  }
  return Boolean(clueOwnerIndex[clue] && clueOwnerIndex[clue].has(name));
}
function seenSummary() { const ids = new Set(canonicalQuestions.map(question => question.id)); return [...loadSeen()].filter(id => ids.has(id)).length; }
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
  const usable = names => names.filter(name => { const taxon = practicalTaxa.find(item => item.name === name); return taxon?.diagnosticTraits.length && !taxon.sourceLimitation; });
  const pool = rank === 'order' ? usable(orders) : rank === 'suborder' ? usable(suborders) : groups.map(item => item[0]);
  const candidates = pool.flatMap(name => {
    const entry = practicalTaxa.find(taxon => taxon.name === name);
    const groupEntry = groups.find(item => item[0] === name);
    const clues = entry?.diagnosticTraits?.length ? entry.diagnosticTraits : [groupEntry ? `${groupEntry[1]} containing ${groupEntry[2]}` : 'a listed grouping'];
    return clues.map(clue => ({ id: `group|${rank}|${name}|${clue}`, answer: name, clue }));
  });
  const { answer, clue, id } = pickFreshOne(candidates);
  const others = pool.filter(name => name !== answer && !sharesClue(name, clue));
  const choices = shuffle([answer, ...shuffle(others).slice(0, 3)]);
  return `<div class="eyebrow">${rank === 'group' ? 'Grouping ID' : `${rank} ID`}</div><h2 class="question">Which ${rank} matches this observable clue?</h2><p class="mystery-clue"><strong>${esc(clue)}</strong></p><div class="options">${choices.map(choice => `<button class="option group-choice" data-answer="${esc(choice)}" data-correct="${esc(answer)}" data-question-id="${esc(id)}">${esc(choice)}</button>`).join('')}</div><div id="groupFeedback" class="explain"></div>`;
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

  const rankLabels = { phylum: 'Phylum', subphylum: 'Subphylum', class: 'Class', grouping: 'Major group', order: 'Order', suborder: 'Suborder', family: 'Family', superfamily: 'Superfamily' };
  const taxonDetails = taxon => {
    const sections = [];
    sections.push(imageGallery(taxon));
    sections.push(cardList('How to identify', taxon.diagnosticTraits || []));
    sections.push(cardList('Ecology / biology', taxon.ecology || []));
    sections.push(cardList('Life history', taxon.lifeHistory || []));
    sections.push(cardList('Relevant morphology', [taxon.legType ? `Legs: ${taxon.legType}` : '', taxon.wingType ? `Wings: ${taxon.wingType}` : '', taxon.mouthpartType ? `Mouthparts: ${taxon.mouthpartType}` : '', taxon.antennaType ? `Antennae: ${taxon.antennaType}` : ''].filter(Boolean)));
    sections.push(cardList('Important practical facts', taxon.practicalFacts || []));
    sections.push(cardList('Confusion taxa', taxon.confusionTaxa || []));
    sections.push(cardList('Distinctions', taxon.distinctions || []));
    if (taxon.sourceLimitation) sections.push(`<div class="reference-card-block reference-note"><h4>Source limitation</h4><p>${esc(taxon.sourceLimitation)}</p></div>`);
    return sections.join('');
  };
  // Tree parent: families use the last segment of "Order → Suborder"; orders hang off their major group when it differs from their parent.
  const taxonByName = Object.fromEntries(practicalTaxa.map(t => [t.name, t]));
  const treeParent = taxon => {
    if (taxon.rank === 'family' || taxon.rank === 'superfamily') return (taxon.parent || '').split('→').pop().trim();
    if (taxon.rank === 'order' && taxon.grouping && taxon.grouping !== taxon.parent && taxonByName[taxon.grouping]) return taxon.grouping;
    return taxon.parent || '';
  };
  const childrenOf = {};
  practicalTaxa.forEach(t => { const p = treeParent(t); (childrenOf[p] = childrenOf[p] || []).push(t); });
  const countDescendants = name => (childrenOf[name] || []).reduce((n, c) => n + 1 + countDescendants(c.name), 0);
  const expandedSet = practicalState.taxaExpanded = practicalState.taxaExpanded || new Set(['Arthropoda', 'Hexapoda', 'Insecta']);
  const openSet = practicalState.taxaOpen = practicalState.taxaOpen || new Set();
  const renderTaxonNode = taxon => {
    const kids = childrenOf[taxon.name] || [];
    const hasKids = kids.length > 0;
    const expanded = hasKids && expandedSet.has(taxon.name);
    const open = openSet.has(taxon.name);
    const hasDetails = Boolean(taxonDetails(taxon));
    const label = rankLabels[taxon.rank] || taxon.rank;
    const common = taxon.commonName && taxon.commonName !== 'common name not specified' ? taxon.commonName : '';
    return `<li class="taxon-node taxon-rank-${esc(taxon.rank)}${expanded ? ' is-expanded' : ''}${open ? ' is-open' : ''}" data-taxon-node="${esc(taxon.name)}">
      <div class="taxon-row">
        ${hasKids ? `<button class="taxon-toggle" data-taxon-toggle="${esc(taxon.name)}" aria-expanded="${expanded}" aria-label="Expand ${esc(taxon.name)}"><span class="taxon-chevron">▸</span></button>` : '<span class="taxon-toggle taxon-toggle-leaf" aria-hidden="true"><span class="taxon-dot"></span></span>'}
        <button class="taxon-label" data-taxon-info="${esc(taxon.name)}" aria-expanded="${open}">
          <span class="tag">${esc(label)}</span>
          <span class="taxon-name">${esc(taxon.name)}</span>
          ${common ? `<span class="taxon-common">${esc(common)}</span>` : ''}
          ${hasKids ? `<span class="taxon-count">${kids.length} ${kids.length === 1 ? 'child' : 'children'}</span>` : ''}
          <span class="taxon-info-hint">${open ? 'Hide details' : 'Details'}</span>
        </button>
      </div>
      <div class="taxon-details"${open ? '' : ' hidden'}>${hasDetails ? taxonDetails(taxon) : '<p class="subtle">No additional supporting information is available.</p>'}</div>
      ${hasKids ? `<ul class="taxon-children"${expanded ? '' : ' hidden'}>${kids.map(renderTaxonNode).join('')}</ul>` : ''}
    </li>`;
  };
  const referenceTaxaCards = `<ul class="taxon-tree taxon-children-root">${(childrenOf[''] || []).map(renderTaxonNode).join('')}</ul>`;

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

const renderReferenceKey = (order, key) => {
  const searchable = [
    order,
    key.title,
    ...key.couplets.flatMap(couplet => [
      couplet.number,
      couplet.text,
      couplet.result
    ])
  ].join(' ');

  return `
    <article
      class="reference-key-card"
      data-reference-search="${esc(searchable)}"
    >
      <div class="reference-card-header">
        <div>
          <h3>${esc(order)}</h3>
          <p class="subtle">${esc(key.title)}</p>
        </div>
      </div>

      <div class="reference-table-wrap">
        <table class="reference-table reference-key-table">
          <thead>
            <tr>
              <th>Couplet</th>
              <th>Character</th>
              <th>Go to / identification</th>
            </tr>
          </thead>

          <tbody>
            ${key.couplets.map(couplet => `
              <tr>
                <td>
                  <strong>${esc(couplet.number)}</strong>
                </td>

                <td>
                  ${esc(couplet.text)}
                </td>

                <td>
                  <strong>${esc(couplet.result)}</strong>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </article>
  `;
};

const referenceKeys = Object.entries(practicalReferenceKeys)
  .map(([order, key]) => {
    const searchable = [
      order,
      key.title,
      ...key.couplets.flatMap(couplet => [
        couplet.number,
        couplet.text,
        couplet.result
      ])
    ].join(' ');

    if (searchTerm && !searchable.toLowerCase().includes(searchTerm)) {
      return '';
    }

    return renderReferenceKey(order, key);
  })
  .join('') || '<p class="empty-state">No key entries match this search.</p>';

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
    const matches = Object.entries(practicalReferenceKeys)
      .filter(([order, key]) => {
        const searchable = [
          order,
          key.title,
          ...key.couplets.flatMap(couplet => [
            couplet.number,
            couplet.text,
            couplet.result
          ])
        ].join(' ').toLowerCase();

        return searchable.includes(searchTerm);
      });

    if (!matches.length) return '';

    return matches
      .map(([order, key]) => renderReferenceKey(order, key))
      .join('');
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

  return `<div class="reference-shell"><header class="reference-header"><div><h2>Reference</h2><p>Use the sections below to review taxa, anatomy, morphology, comparisons, and keys for Practical 1.</p></div></header><nav class="reference-tabs" aria-label="Reference sections">${['taxa', 'anatomy', 'morphology', 'comparisons', 'keys'].map(name => `<button class="tab ${tab === name ? 'active' : ''}" data-reference-tab="${name}">${name === 'taxa' ? 'Taxa' : name === 'anatomy' ? 'Anatomy' : name === 'morphology' ? 'Morphology' : name === 'comparisons' ? 'Comparisons' : 'Keys'}</button>`).join('')}</nav>${tab === 'taxa' ? `<div class="reference-chip-row taxon-controls"><button class="segment-button" data-taxa-expand-all>Expand all</button><button class="segment-button" data-taxa-collapse-all>Collapse all</button><button class="segment-button" data-taxa-close-details>Close all details</button></div>` : ''}${renderCurrentTab()}</div>`;
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
  const setupMarkup = `<div class="practice-setup ${practiceSetupVisible ? '' : 'hidden'}" id="practiceSetup"><div class="eyebrow">${missed ? 'Missed material' : 'Choose your session'}</div><h2>${missed ? 'Practice concepts you missed' : 'Mixed practical practice'}</h2><div class="practice-control"><label for="practiceFocus">Question type</label><select id="practiceFocus"><option value="mixed">Mixed practical</option><option value="order-suborder">Order &amp; suborder identification</option><option value="family-superfamily">Family &amp; superfamily identification</option><option value="anatomy">External anatomy &amp; internal anatomy</option><option value="morphology">Morphology types</option><option value="compare">Compare two groups</option><option value="select-all">Select all that apply</option><option value="yes-no">Yes / No feature</option><option value="ecology">Ecology &amp; life history</option><option value="simulation">Full practical simulation</option></select></div><div class="practice-control"><label for="practiceCountRange">Question count</label><div class="range-row"><input id="practiceCountRange" type="range" min="5" max="100" value="20" step="1"><output class="range-value" id="practiceCountValue" for="practiceCountRange">20</output></div></div><button class="primary" id="startPractice">Start practice</button><p class="subtle">${seenSummary()} of ${canonicalQuestions.length} questions seen. Unseen questions are served first. <button class="secondary" id="resetSeenQuestions" type="button">Reset</button></p></div>`;
  const sessionMarkup = activeQuestion ? `<div class="question-area"><div class="eyebrow">${esc(activeQuestion.type || 'practical')} • ${practicalState.practiceIndex + 1}/${practicalState.practiceSession.length}</div>${questionImage(activeQuestion)}<h2 class="question">${activeQuestion.prompt}</h2><div class="options">${activeQuestion.type === 'select-all' ? (activeQuestion.choices || []).map(choice => `<label class="option"><input type="checkbox" class="practice-select" value="${esc(choice)}"> ${esc(choice)}</label>`).join('') : (activeQuestion.type === 'yes-no-feature' ? ['Yes', 'No'] : (activeQuestion.choices || [])).map(choice => `<button class="option practice-answer" data-choice="${esc(choice)}">${esc(choice)}</button>`).join('')}</div>${activeQuestion.type === 'select-all' ? '<button class="primary" id="submitSelectAll">Submit selections</button>' : ''}<div id="practiceFeedback" class="explain"></div><div class="next-row practice-actions"><button class="secondary" id="skipPractice">Unsure / Skip</button><button class="secondary" id="finishPractice">Finish early</button></div></div>` : '';
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
  const taxaTree = document.querySelector('.taxon-tree');
  if (taxaTree) {
    const expanded = practicalState.taxaExpanded, openSet = practicalState.taxaOpen;
    const nodeFor = name => taxaTree.querySelector(`[data-taxon-node="${CSS.escape(name)}"]`);
    const setExpanded = (node, on) => {
      const name = node.dataset.taxonNode;
      const kids = node.querySelector(':scope > .taxon-children');
      if (!kids) return;
      kids.hidden = !on;
      node.classList.toggle('is-expanded', on);
      const btn = node.querySelector(':scope > .taxon-row .taxon-toggle');
      if (btn) btn.setAttribute('aria-expanded', String(on));
      on ? expanded.add(name) : expanded.delete(name);
    };
    const setOpen = (node, on) => {
      const name = node.dataset.taxonNode;
      node.querySelector(':scope > .taxon-details').hidden = !on;
      node.classList.toggle('is-open', on);
      const label = node.querySelector(':scope > .taxon-row .taxon-label');
      label.setAttribute('aria-expanded', String(on));
      label.querySelector('.taxon-info-hint').textContent = on ? 'Hide details' : 'Details';
      on ? openSet.add(name) : openSet.delete(name);
    };
    taxaTree.onclick = event => {
      const toggle = event.target.closest('[data-taxon-toggle]');
      const info = event.target.closest('[data-taxon-info]');
      if (toggle) { const node = nodeFor(toggle.dataset.taxonToggle); setExpanded(node, !node.classList.contains('is-expanded')); }
      else if (info) { const node = nodeFor(info.dataset.taxonInfo); setOpen(node, !node.classList.contains('is-open')); }
    };
    document.querySelector('[data-taxa-expand-all]').onclick = () => taxaTree.querySelectorAll('.taxon-node').forEach(n => setExpanded(n, true));
    document.querySelector('[data-taxa-collapse-all]').onclick = () => taxaTree.querySelectorAll('.taxon-node').forEach(n => setExpanded(n, false));
    document.querySelector('[data-taxa-close-details]').onclick = () => taxaTree.querySelectorAll('.taxon-node').forEach(n => setOpen(n, false));
  }
  const range = document.getElementById('practiceCountRange');
  if (range) {
    range.oninput = () => { syncPracticeCount(); };
    syncPracticeCount();
  }
  const startPractice = document.getElementById('startPractice'); if (startPractice) startPractice.onclick = () => startPracticeQuestion();
  const returnSetup = document.getElementById('returnPracticeSetup'); if (returnSetup) returnSetup.onclick = () => { practicalState.practiceSession = null; practicalState.practiceSetupVisible = true; renderTab(); };
  const restartPractice = document.getElementById('restartPracticeSet'); if (restartPractice) restartPractice.onclick = () => startPracticeQuestion();
  if (practicalState.tab === 'practice' && practicalState.practiceSession && practicalState.practiceSession[practicalState.practiceIndex]) bindResumedPracticeQuestion();
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
function bindGroupChoices() { document.querySelectorAll('.group-choice').forEach(button => button.onclick = () => { document.querySelectorAll('.group-choice').forEach(item => { item.disabled = true; if (item.dataset.correct === item.dataset.answer) item.classList.add('correct'); }); const ok = button.dataset.answer === button.dataset.correct; if (ok) markSeen(button.dataset.questionId); button.classList.toggle('wrong', !ok); document.getElementById('groupFeedback').className = 'explain show'; document.getElementById('groupFeedback').innerHTML = `<strong>${ok ? 'Correct.' : 'Use the guide to re-check this choice.'}</strong><p>The practical requires an observable diagnostic explanation, not only a name. Record the feature or grouping relationship that supports <strong>${esc(button.dataset.correct)}</strong>.</p>`; }); }
const shuffle = items => { const copy = items.slice(); for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; };
const anatomyRecords = anatomy.flatMap(item => item[2].split(';').map(term => term.trim()).map(term => ({
  term, region: item[1], category: item[0], detail: anatomyDetails[term], explanation: item[3]
})));
const clueOf = question => (String(question.prompt).match(/<strong>(.*?)<\/strong>/) || [])[1] || '';
const pickDistractors = (candidates, isPreferred, count = 3) => [...shuffle(candidates.filter(isPreferred)), ...shuffle(candidates.filter(item => !isPreferred(item)))].slice(0, count);
/* Four options: the taxon plus three wrong answers of the same rank (same parent/order first) that do not also have the clue. */
function choicesForTaxon(taxon, clue) {
  const keyed = Boolean(taxon.requiresKey);
  const orderOf = item => String(item.parent || '').split(' → ')[0];
  const candidates = practicalTaxa.filter(item => item.name !== taxon.name && !item.sourceLimitation && !sharesClue(item.name, clue) && (keyed ? item.requiresKey : item.rank === taxon.rank));
  const preferred = keyed ? item => orderOf(item) === orderOf(taxon) : taxon.rank === 'order' ? item => item.grouping === taxon.grouping : item => item.parent === taxon.parent;
  return shuffle([taxon.name, ...pickDistractors(candidates, preferred).map(item => item.name)]);
}
const practicalImagesByTaxon = practicalImages.reduce((groups, image) => {
  (groups[image.taxon] = groups[image.taxon] || []).push(image);
  return groups;
}, {});
const imageAttribution = image => `Image: ${image.creator || 'Creator information supplied by Wikimedia Commons'} · ${image.license}`;
const imageGallery = taxon => {
  const images = practicalImagesByTaxon[taxon.name] || [];
  if (!images.length) return '';
  return `<div class="practical-image-gallery"><h4>Approved specimen images</h4><div class="practical-image-grid">${images.map(image => `<figure><img src="${esc(image.src)}" alt="${esc(`${taxon.name} specimen`)}" loading="lazy"><figcaption><a href="${esc(image.sourceUrl)}" target="_blank" rel="noopener">Image source</a><span>${esc(imageAttribution(image))}</span></figcaption></figure>`).join('')}</div></div>`;
};
const questionImage = question => question.image ? `<figure class="question-image"><img src="${esc(question.image.src)}" alt="Insect specimen for identification"><figcaption>Specimen image for identification</figcaption></figure>` : '';
const answeredImageAttribution = question => question.image ? `<div class="image-attribution"><a href="${esc(question.image.sourceUrl)}" target="_blank" rel="noopener">Image source</a> · ${esc(imageAttribution(question.image))}</div>` : '';
function buildCanonicalQuestions() {
  const questions = [];
  const describe = record => record.detail?.[1] || record.explanation;
  const anatomyTerms = [...new Map(anatomyRecords.map(record => [record.term, record])).values()];
  anatomyTerms.forEach(item => {
    const ownRegions = anatomyRecords.filter(record => record.term === item.term).map(record => record.region);
    const sameCategory = anatomyTerms.filter(candidate => candidate.category === item.category && candidate.term !== item.term && describe(candidate) !== describe(item));
    const regionPool = [...new Set(anatomy.filter(entry => entry[0] === item.category).map(entry => entry[1]))].filter(region => !ownRegions.includes(region) && !(item.region === 'Mouth' && region === 'Head'));
    questions.push(
      { id: `anatomy-name-${item.term}`, type: 'external-anatomy', topic: item.category, taxon: item.term, answer: item.term, choices: shuffle([item.term, ...pickDistractors(sameCategory, candidate => candidate.region === item.region).map(candidate => candidate.term)]), prompt: `Which structure is described as <strong>${esc(describe(item))}</strong>?`, explanation: `${item.term} is the relevant ${item.region.toLowerCase()} structure. ${describe(item)}`, acceptedAnswers: [item.term] },
      { id: `anatomy-location-${item.term}`, type: 'anatomy-location', topic: item.category, taxon: item.term, answer: item.region, choices: shuffle([item.region, ...shuffle(regionPool).slice(0, 3)]), prompt: `Which region or system is <strong>${esc(item.term)}</strong> part of?`, explanation: `${item.term} belongs to the ${item.region.toLowerCase()}${ownRegions.length > 1 ? ` (it is listed under ${ownRegions.join(' and ')})` : ''}; ${describe(item)}`, acceptedAnswers: [item.region] }
    );
  });
  practicalTaxa.filter(taxon => ['order', 'suborder'].includes(taxon.rank) && !taxon.sourceLimitation).forEach(taxon => {
    taxon.diagnosticTraits.forEach((clue, index) => questions.push({
      id: `id-${taxon.name}-${index}`, type: `${taxon.rank}-identification`, topic: 'taxonomy', taxon: taxon.name,
      rank: taxon.rank, answer: taxon.name, choices: choicesForTaxon(taxon, clue),
      prompt: `Which ${taxon.rank} matches this supported clue? <strong>${esc(clue)}</strong>`, explanation: `${clue} supports ${taxon.name}; the other choices lack this supported combination.`, requiresKey: false
    }));
  });
  practicalTaxa.filter(taxon => taxon.requiresKey && !taxon.sourceLimitation).forEach(taxon => {
    const keyOrder = Object.keys(keyFamilies).find(order => keyFamilies[order].includes(taxon.name));
    taxon.diagnosticTraits.forEach((clue, index) => questions.push({
      id: `family-id-${taxon.name}-${index}`, type: 'family-identification', topic: 'family key', taxon: taxon.name,
      rank: taxon.rank, keyOrder, answer: taxon.name, acceptedAnswers: [taxon.name, ...(taxon.aliases || [])],
      choices: choicesForTaxon(taxon, clue),
      prompt: `Which family or superfamily is supported by this specimen feature? <strong>${esc(clue)}</strong>`,
      explanation: `${taxon.name} is supported by ${clue}. Use the ${keyOrder || 'supplied'} key to confirm the couplet.`, requiresKey: true
    }));
    (practicalImagesByTaxon[taxon.name] || []).filter(image => image.quiz).forEach(image => questions.push({
      id: `family-image-${image.id}`, type: 'family-image-identification', topic: 'family key', taxon: taxon.name,
      rank: taxon.rank, keyOrder, answer: taxon.name, acceptedAnswers: [taxon.name, ...(taxon.aliases || [])],
      image, choices: choicesForTaxon(taxon, (taxon.diagnosticTraits || []).join('|')),
      prompt: 'What family or superfamily is this specimen?',
      explanation: `${taxon.name}: useful family characters include ${(taxon.diagnosticTraits || []).join('; ') || 'the supplied family-key characters'}. Image-associated study traits include ${image.visibleTraits.join('; ')}. These traits are diagnostic for the taxon, not a claim that every feature is visible in this photograph.`,
      requiresKey: true
    }));
  });
  morphologyTypes.forEach(item => questions.push({
    id: `morphology-${item.category}-${item.term}`, type: 'functional-morphology', topic: 'morphology',
    answer: item.term, choices: shuffle([item.term, ...shuffle(morphologyTypes.filter(candidate => candidate.category === item.category && candidate.term !== item.term).map(candidate => candidate.term)).slice(0, 3)]),
    prompt: `Which ${esc(item.category.toLowerCase().replace(/ types$/, ' type'))} is described as <strong>${esc(item.description)}</strong>?`, explanation: `${item.term} is ${item.description}.`
  }));
  /* practicalQuestionBank (practical-data.js) has no answer options and mostly repeats the generated identification questions above.
     Keep only the entries with no generated twin (ecology/life-history) and give them real options. */
  const covered = new Set(questions.filter(question => /-identification$/.test(question.type)).map(question => `${question.taxon}|${clueOf(question)}`));
  const bankQuestions = practicalQuestionBank
    .filter(question => !/applicable couplet/.test(question.prompt) && (question.type === 'ecology-life-history' || !covered.has(`${question.taxon}|${clueOf(question)}`)))
    .map(question => {
      const taxon = practicalTaxa.find(item => item.name === question.taxon);
      return { ...question, choices: question.choices && question.choices.length ? question.choices : (taxon ? choicesForTaxon(taxon, clueOf(question)) : []) };
    });
  const mapped = [...questions, ...bankQuestions, ...questionBankExtrasWithComparisons].map(question => ({
    ...question, id: question.id || `q-${hashId(`${question.type}|${question.prompt}|${[].concat(question.answer).join('|')}`)}`,
    category: question.category || question.topic || 'general',
    acceptedAnswers: question.acceptedAnswers || [question.answer]
  }));
  const usedIds = new Set();
  mapped.forEach(question => { let id = question.id; for (let n = 2; usedIds.has(id); n++) id = `${question.id}-${n}`; question.id = id; usedIds.add(id); });
  return mapped;
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
function makePracticeQuestions(focus, missedOnly = false, count = 20) {
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
  return pickFresh(pool, count);
}
function startPracticeQuestion() {
  const focus = document.getElementById('practiceFocus') ? document.getElementById('practiceFocus').value : 'mixed';
  const slider = document.getElementById('practiceCountRange');
  const count = Math.min(100, Math.max(5, Number(slider ? slider.value : 20) || 20));
  const questions = makePracticeQuestions(focus, practicalState.missedOnly, count);
  practicalState.practiceSession = questions;
  practicalState.practiceIndex = 0;
  practicalState.practiceScore = 0;
  practicalState.practiceSkipped = 0;
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
      : (question.type === 'yes-no-feature' ? ['Yes', 'No'] : shuffle(question.choices)).map(choice => `<button class="option practice-answer" data-choice="${esc(choice)}">${esc(choice)}</button>`).join('');
    area.innerHTML = `<div class="question-area"><div class="eyebrow">${esc(focus)} • ${index + 1}/${questions.length}</div>${questionImage(question)}<h2 class="question">${question.prompt}</h2><div class="options">${options}</div>${question.type === 'select-all' ? '<button class="primary" id="submitSelectAll">Submit selections</button>' : ''}<div id="practiceFeedback" class="explain"></div><div class="next-row practice-actions"><div class="practice-secondary-actions"><button class="secondary" id="skipPractice">Unsure / Skip</button><button class="secondary" id="finishPractice">Finish early</button></div><button class="primary" id="nextPractice" disabled>Next question →</button></div></div>`;
    document.getElementById('skipPractice').onclick = () => { skipped += 1; practicalState.practiceSkipped = skipped; index += 1; practicalState.practiceIndex = index; next(); };
    document.getElementById('finishPractice').onclick = finishSet;
    document.querySelectorAll('.practice-answer').forEach(button => button.onclick = () => {
      document.querySelectorAll('.practice-answer').forEach(item => { item.disabled = true; if ((question.acceptedAnswers || [question.answer]).includes(item.dataset.choice)) item.classList.add('correct'); });
      const correct = (question.acceptedAnswers || [question.answer]).includes(button.dataset.choice);
      if (correct) { score += 1; practicalState.practiceScore = score; markSeen(question.id); } else button.classList.add('wrong');
      recordProgress(question, correct);
      showPracticeFeedback(question, correct, () => { index += 1; practicalState.practiceIndex = index; next(); });
    });
    const submitSelectAll = document.getElementById('submitSelectAll');
    if (submitSelectAll) submitSelectAll.onclick = () => {
      const selected = [...document.querySelectorAll('.practice-select:checked')].map(input => input.value).sort();
      const expected = [...question.answer].sort();
      const correct = JSON.stringify(selected) === JSON.stringify(expected);
      document.querySelectorAll('.practice-select').forEach(input => { input.disabled = true; if (question.answer.includes(input.value)) input.parentElement.classList.add('correct'); });
      submitSelectAll.disabled = true;
      if (correct) { score += 1; practicalState.practiceScore = score; markSeen(question.id); }
      recordProgress(question, correct);
      showPracticeFeedback(question, correct, () => { index += 1; practicalState.practiceIndex = index; next(); });
    };
  };
  next();
}
function showPracticeFeedback(question, correct, advance) {
  const feedback = document.getElementById('practiceFeedback');
  feedback.className = 'explain show';
  const answer = Array.isArray(question.answer) ? question.answer.join('; ') : question.answer;
  feedback.innerHTML = `<strong class="${correct ? 'feedback-correct' : 'feedback-incorrect'}">${correct ? 'Correct.' : `Answer: ${esc(answer)}`}</strong><p>${esc(question.explanation)}</p>${answeredImageAttribution(question)}`;
  const nextButton = document.getElementById('nextPractice');
  if (nextButton) {
    nextButton.disabled = false;
    nextButton.onclick = advance;
  }
  document.querySelectorAll('#skipPractice, #finishPractice').forEach(button => { button.disabled = true; });
}
function bindResumedPracticeQuestion() {
  const question = practicalState.practiceSession[practicalState.practiceIndex];
  const advance = () => { practicalState.practiceIndex += 1; renderTab(); };
  document.querySelectorAll('.practice-answer').forEach(button => button.onclick = () => {
    document.querySelectorAll('.practice-answer').forEach(item => {
      item.disabled = true;
      if ((question.acceptedAnswers || [question.answer]).includes(item.dataset.choice)) item.classList.add('correct');
    });
    const correct = (question.acceptedAnswers || [question.answer]).includes(button.dataset.choice);
    if (correct) { practicalState.practiceScore += 1; markSeen(question.id); } else button.classList.add('wrong');
    recordProgress(question, correct);
    showPracticeFeedback(question, correct, advance);
  });
  const submitSelectAll = document.getElementById('submitSelectAll');
  if (submitSelectAll) submitSelectAll.onclick = () => {
    const selected = [...document.querySelectorAll('.practice-select:checked')].map(input => input.value).sort();
    const correct = JSON.stringify(selected) === JSON.stringify([...question.answer].sort());
    document.querySelectorAll('.practice-select').forEach(input => {
      input.disabled = true;
      if (question.answer.includes(input.value)) input.parentElement.classList.add('correct');
    });
    submitSelectAll.disabled = true;
    if (correct) markSeen(question.id);
    recordProgress(question, correct);
    showPracticeFeedback(question, correct, advance);
  };
  const skip = document.getElementById('skipPractice');
  if (skip) skip.onclick = () => {
    practicalState.practiceSkipped += 1;
    practicalState.practiceIndex += 1;
    renderTab();
  };
  const finish = document.getElementById('finishPractice');
  if (finish) finish.onclick = () => {
    const answered = practicalState.practiceIndex - practicalState.practiceSkipped;
    document.getElementById('practiceQuestionArea').innerHTML = `<div class="speed-end"><div class="eyebrow">Set ended early</div><h2>${practicalState.practiceScore}/${answered} correct</h2><p>Answered ${answered} of ${practicalState.practiceSession.length}; skipped ${practicalState.practiceSkipped}.</p><div class="next-row"><button class="secondary" id="restartPracticeSet">Try another set</button><button class="primary" id="returnPracticeSetup">Return to setup</button></div></div>`;
    document.getElementById('restartPracticeSet').onclick = () => startPracticeQuestion();
    document.getElementById('returnPracticeSetup').onclick = () => { practicalState.practiceSession = null; practicalState.practiceSetupVisible = true; renderTab(); };
  };
}
function simulationQuestions() {
  const taken = new Set();
  const pick = (predicate, count) => {
    const chosen = pickFresh(canonicalQuestions.filter(question => predicate(question) && !taken.has(question.id)), count);
    chosen.forEach(question => taken.add(question.id));
    return chosen;
  };
  const order = pick(question => ['order-identification', 'suborder-identification'].includes(question.type) && !question.requiresKey, 5);
  const external = pick(question => question.type === 'external-anatomy', 3);
  const morphologyQs = pick(question => question.type === 'functional-morphology', 2);
  const internal = pick(question => question.type === 'internal-anatomy' || (question.type === 'anatomy-location' && question.topic === 'Internal anatomy'), 3);
  const familyQs = pick(question => /family-(identification|image-identification)|mystery-specimen/.test(question.type) && question.requiresKey, 3);
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
    const key = question.requiresKey && question.keyOrder && question.type !== 'family-image-identification' ? `<button class="secondary open-question-key" data-order="${question.keyOrder}">Open key</button><div class="key-body hidden" id="key-${question.keyOrder}"><div id="key-work-${question.keyOrder}"></div></div>` : '';
    const options = question.type === 'select-all'
      ? question.choices.map(choice => `<label class="option"><input type="checkbox" class="simulation-select" value="${esc(choice)}"> ${esc(choice)}</label>`).join('')
      : shuffle(question.choices).map(choice => `<button class="option simulation-answer" data-choice="${esc(choice)}">${esc(choice)}</button>`).join('');
    area.innerHTML = `<div class="question-area"><div class="eyebrow">Station ${index + 1}/${questions.length}</div>${questionImage(question)}<h2 class="question">${question.prompt}</h2>${key}<div class="options">${options}</div>${question.type === 'select-all' ? '<button class="primary" id="submitSimulationSelectAll">Submit selections</button>' : ''}<button class="secondary" id="skipSimulation">Skip</button></div>`;
    bindQuestionKeyEvents();
    const record = choice => { const expected = Array.isArray(question.answer) ? question.answer.slice().sort().join('|') : question.answer; const actual = Array.isArray(choice) ? choice.slice().sort().join('|') : choice; const correct = actual === expected; if (correct) markSeen(question.id); answers.push({ ...question, choice: Array.isArray(choice) ? choice.join(', ') : choice, correct }); recordProgress(question, correct); index += 1; show(); };
    document.querySelectorAll('.simulation-answer').forEach(button => button.onclick = () => record(button.dataset.choice));
    const submitAll = document.getElementById('submitSimulationSelectAll');
    if (submitAll) submitAll.onclick = () => record([...document.querySelectorAll('.simulation-select:checked')].map(input => input.value));
    document.getElementById('skipSimulation').onclick = () => record('');
  };
  show();
}
function startPracticalSpeed() { let left = 60, score = 0, deck = []; const area = document.getElementById('practicalSpeedArea'); const timer = document.getElementById('practicalTimer'); const scoreNode = document.getElementById('practicalSpeedScore'); const tick = () => { timer.textContent = `0:${String(left).padStart(2, '0')}`; }; const ask = () => { if (!deck.length) deck = shuffle([...orders, ...suborders, ...anatomy.flatMap(item => item[2].split(';'))].map(item => item.trim())); const term = deck.pop(); area.innerHTML = `<div class="question-area"><h2 class="question">What should you recall about <strong>${esc(term)}</strong>?</h2><button class="primary" id="speedPoint">I know it</button><button class="secondary" id="speedSkip">Skip</button></div>`; document.getElementById('speedPoint').onclick = () => { score += 1; scoreNode.textContent = `Score: ${score}`; ask(); }; document.getElementById('speedSkip').onclick = ask; }; tick(); ask(); const interval = setInterval(() => { left -= 1; tick(); if (left <= 0) { clearInterval(interval); area.innerHTML = `<div class="speed-end"><h2>${score} points</h2><p>Review the terms you skipped, then try again.</p></div>`; } }, 1000); }
document.addEventListener('click', event => { if (event.target && event.target.id === 'resetSeenQuestions') { try { localStorage.removeItem(SEEN_KEY); } catch (error) { /* ignore */ } renderTab(); } });
renderTab();
