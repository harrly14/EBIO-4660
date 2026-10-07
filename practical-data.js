/* Authoritative Practical 1 content from all_topics.md and the official guide. */
const practicalTaxa = [];
const addTaxon = (name, rank, parent, grouping, details = {}) => practicalTaxa.push({
  name, rank, parent, grouping, requiresKey: rank === 'family' || rank === 'superfamily',
  diagnosticTraits: [], observableFeatures: [], ecology: [], feedingBiology: [],
  lifeHistory: [], legType: '', wingType: '', mouthpartType: '', antennaType: '',
  notableStructures: [], practicalFacts: [], confusionTaxa: [], distinctions: [], sourceLimitation: '', aliases: [], ...details
});
[
  ['Arthropoda', 'phylum', '', 'Arthropoda'],
  ['Hexapoda', 'subphylum', 'Arthropoda', 'Hexapoda'],
  ['Entognatha', 'class', 'Hexapoda', 'Entognatha'],
  ['Insecta', 'class', 'Hexapoda', 'Insecta'],
  ['Apterygote', 'grouping', 'Insecta', 'Apterygote'],
  ['Paleoptera', 'grouping', 'Insecta', 'Paleoptera'],
  ['Neoptera', 'grouping', 'Insecta', 'Neoptera'],
  ['Polyneoptera', 'grouping', 'Neoptera', 'Polyneoptera'],
  ['Dictyoptera', 'grouping', 'Neoptera', 'Dictyoptera'],
  ['Paraneoptera', 'grouping', 'Neoptera', 'Paraneoptera']
].forEach(item => addTaxon(...item));
const ordersAndGroups = [
  ['Collembola', 'order', 'Entognatha', 'Entognatha'], ['Diplura', 'order', 'Entognatha', 'Entognatha'], ['Protura', 'order', 'Entognatha', 'Entognatha'],
  ['Archaeognatha', 'order', 'Insecta', 'Apterygote'], ['Zygentoma', 'order', 'Insecta', 'Apterygote'],
  ['Ephemeroptera', 'order', 'Insecta', 'Paleoptera'], ['Odonata', 'order', 'Insecta', 'Paleoptera'],
  ['Orthoptera', 'order', 'Insecta', 'Polyneoptera'], ['Phasmatodea', 'order', 'Insecta', 'Polyneoptera'], ['Dermaptera', 'order', 'Insecta', 'Polyneoptera'], ['Plecoptera', 'order', 'Insecta', 'Polyneoptera'],
  ['Blattodea', 'order', 'Insecta', 'Dictyoptera'], ['Mantodea', 'order', 'Insecta', 'Dictyoptera'],
  ['Hemiptera', 'order', 'Insecta', 'Paraneoptera'], ['Psocodea', 'order', 'Insecta', 'Paraneoptera'], ['Thysanoptera', 'order', 'Insecta', 'Paraneoptera']
];
ordersAndGroups.forEach(item => addTaxon(...item));
[
  ['Anisoptera', 'suborder', 'Odonata', 'Paleoptera'], ['Zygoptera', 'suborder', 'Odonata', 'Paleoptera'],
  ['Caelifera', 'suborder', 'Orthoptera', 'Polyneoptera'], ['Ensifera', 'suborder', 'Orthoptera', 'Polyneoptera'],
  ['Sternorrhyncha', 'suborder', 'Hemiptera', 'Paraneoptera'], ['Auchenorrhyncha', 'suborder', 'Hemiptera', 'Paraneoptera'], ['Heteroptera', 'suborder', 'Hemiptera', 'Paraneoptera']
].forEach(item => addTaxon(...item));
[
  ['Aeshnidae', 'family', 'Odonata → Anisoptera', 'Paleoptera'], ['Libellulidae', 'family', 'Odonata → Anisoptera', 'Paleoptera'],
  ['Acrididae', 'family', 'Orthoptera → Caelifera', 'Polyneoptera'], ['Gryllidae', 'family', 'Orthoptera → Ensifera', 'Polyneoptera'], ['Tettigoniidae', 'family', 'Orthoptera → Ensifera', 'Polyneoptera'], ['Rhaphidophoridae', 'family', 'Orthoptera → Ensifera', 'Polyneoptera'],
  ['Aphididae', 'family', 'Hemiptera → Sternorrhyncha', 'Paraneoptera'], ['Coccoidae', 'superfamily', 'Hemiptera → Sternorrhyncha', 'Paraneoptera'],
  ['Cicadidae', 'family', 'Hemiptera → Auchenorrhyncha', 'Paraneoptera'], ['Membracidae', 'family', 'Hemiptera → Auchenorrhyncha', 'Paraneoptera'], ['Cicadellidae', 'family', 'Hemiptera → Auchenorrhyncha', 'Paraneoptera'], ['Cercopidae', 'family', 'Hemiptera → Auchenorrhyncha', 'Paraneoptera'], ['Fulgoroidea', 'superfamily', 'Hemiptera → Auchenorrhyncha', 'Paraneoptera'],
  ['Belostomatidae', 'family', 'Hemiptera → Heteroptera', 'Paraneoptera'], ['Corixidae', 'family', 'Hemiptera → Heteroptera', 'Paraneoptera'], ['Gerridae', 'family', 'Hemiptera → Heteroptera', 'Paraneoptera'], ['Cimicidae', 'family', 'Hemiptera → Heteroptera', 'Paraneoptera'], ['Pentatomidae', 'family', 'Hemiptera → Heteroptera', 'Paraneoptera'], ['Scutelleridae', 'family', 'Hemiptera → Heteroptera', 'Paraneoptera'], ['Reduviidae', 'family', 'Hemiptera → Heteroptera', 'Paraneoptera'], ['Coreidae', 'family', 'Hemiptera → Heteroptera', 'Paraneoptera'], ['Lygaeidae', 'family', 'Hemiptera → Heteroptera', 'Paraneoptera'], ['Miridae', 'family', 'Hemiptera → Heteroptera', 'Paraneoptera']
].forEach(item => addTaxon(...item));
const trait = (name, details) => Object.assign(practicalTaxa.find(item => item.name === name), details);
trait('Entognatha', { diagnosticTraits: ['internal mouthparts enclosed in a gnathal pouch', 'tarsi 1-segmented', 'many rely on cuticular respiration'], practicalFacts: ['Non-insect hexapods'] });
trait('Collembola', {
  diagnosticTraits: ['internal mouthparts enclosed in a gnathal pouch', 'tarsi 1-segmented'],
  practicalFacts: ['The supplied notes list Collembola as an Entognatha order.'],
  sourceLimitation: 'The supplied notes do not provide an order-specific diagnostic, ecology, or life-history trait for Collembola; no unique no-key question is generated.'
});
trait('Diplura', {
  diagnosticTraits: ['internal mouthparts enclosed in a gnathal pouch', 'tarsi 1-segmented'],
  practicalFacts: ['The supplied notes list Diplura as an Entognatha order.'],
  sourceLimitation: 'The supplied notes do not provide an order-specific diagnostic, ecology, or life-history trait for Diplura; no unique no-key question is generated.'
});
trait('Protura', {
  diagnosticTraits: ['internal mouthparts enclosed in a gnathal pouch', 'tarsi 1-segmented'],
  practicalFacts: ['The supplied notes list Protura as an Entognatha order.'],
  sourceLimitation: 'The supplied notes do not provide an order-specific diagnostic, ecology, or life-history trait for Protura; no unique no-key question is generated.'
});
trait('Archaeognatha', { diagnosticTraits: ['monocondylic mandibles', 'wingless', 'long caudal filament and two cerci'], lifeHistory: ['ametabolous', 'indirect fertilization'] });
trait('Zygentoma', { diagnosticTraits: ['wingless', 'long caudal filament and two cerci'], lifeHistory: ['ametabolous', 'indirect fertilization'] });
trait('Ephemeroptera', { diagnosticTraits: ['aquatic juveniles', 'subimago stage'], ecology: ['aquatic juveniles; terrestrial adults'], lifeHistory: ['adults live minutes to days and do not feed'] });
trait('Odonata', { diagnosticTraits: ['predatory nymphs and adults', 'nymphal labium forms a hinged mask with two claws'], ecology: ['aquatic nymphs; predatory nymphs and adults'], lifeHistory: ['mate in a pinwheel formation'] });
trait('Anisoptera', { diagnosticTraits: ['robust bodies', 'powerful fliers', 'wings held horizontally at rest'], observableFeatures: ['hindwing broader basally than forewing'] });
trait('Zygoptera', { diagnosticTraits: ['delicate bodies', 'distinct aquatic nymph gills'], observableFeatures: ['forewing and hindwing similar in size and shape', 'wings typically held vertically over body at rest'] });
trait('Aeshnidae', {
  diagnosticTraits: ['forewing and hindwing triangles similar in shape and pointing the same direction', 'hindwing lacks a foot-shaped anal loop'],
  observableFeatures: ['adult Anisoptera with hindwing broader basally than forewing'],
  confusionTaxa: ['Libellulidae'],
  distinctions: ['Aeshnidae have similar wing triangles pointing the same direction and no foot-shaped anal loop; Libellulidae differ.']
});
trait('Libellulidae', {
  diagnosticTraits: ['forewing and hindwing triangles differ in shape and point in different directions', 'hindwing has a foot-shaped anal loop'],
  observableFeatures: ['adult Anisoptera with hindwing broader basally than forewing'],
  confusionTaxa: ['Aeshnidae'],
  distinctions: ['Libellulidae have different wing triangles and a foot-shaped anal loop; Aeshnidae have similar triangles and no foot-shaped anal loop.']
});
trait('Orthoptera', { diagnosticTraits: ['saltatorial hind legs', 'tegmina in most', 'auditory organs on abdomen or front tibiae'], legType: 'saltatorial', mouthpartType: 'mandibulate' });
trait('Caelifera', { diagnosticTraits: ['short antennae', 'small ovipositor', 'tympana on first abdominal segment'], observableFeatures: ['antennae shorter than body'] });
trait('Ensifera', { diagnosticTraits: ['antennae longer than body', 'long conspicuous ovipositor usually', 'tympana when present on fore tibiae'] });
trait('Acrididae', { diagnosticTraits: ['short/thick antennae', 'small ovipositor', 'tympana on first abdominal segment', '3 tarsomeres'], lifeHistory: ['includes swarming locusts'] });
trait('Gryllidae', { diagnosticTraits: ['dorsoventrally flattened', 'long antennae', 'long slender ovipositor', 'tympana on front tibiae', '3 tarsomeres'], lifeHistory: ['chirp rates can estimate temperature'] });
trait('Tettigoniidae', { diagnosticTraits: ['laterally compressed', 'blade-like ovipositor', 'long antennae', 'tympana on front tibiae', '4 tarsomeres'] });
trait('Rhaphidophoridae', { diagnosticTraits: ['wingless', 'long antennae', 'lack tympanal organs', '4 tarsomeres'] });
trait('Phasmatodea', { diagnosticTraits: ['walking sticks; plant mimics'], lifeHistory: ['juveniles can regenerate lost limbs', 'many are parthenogenic', 'thoracic scent glands'] });
trait('Dermaptera', { diagnosticTraits: ['greatly enlarged cerci', 'short thick tegmina with large hind wings folded beneath'], ecology: ['nocturnal, omnivorous'], lifeHistory: ['maternal care'] });
trait('Blattodea', { diagnosticTraits: ['cockroaches and termites'], lifeHistory: ['termites evolved from roach-like ancestors', 'termites rely on complex gut microbiomes to digest wood'] });
trait('Mantodea', { diagnosticTraits: ['greatly elongated prothorax', 'raptorial forelegs with spikes'], ecology: ['predatory; highly visual'] });
trait('Plecoptera', { diagnosticTraits: ['stoneflies', 'forewings membranous rather than tegmina'], ecology: ['aquatic nymphs'] });
trait('Hemiptera', { diagnosticTraits: ['piercing-sucking rostrum/beak', 'postclypeus swollen for cibarial pump', 'tarsi no more than 3 tarsomeres'], mouthpartType: 'piercing/sucking' });
trait('Sternorrhyncha', { diagnosticTraits: ['mouthparts base behind/under eyes', 'roof-like wings at rest', 'long filamentous antennae', 'forewings absent or indistinct'] });
trait('Auchenorrhyncha', { diagnosticTraits: ['mouthparts base behind/under eyes', 'roof-like wings at rest', 'short bristle-like antennae', 'forewings absent or indistinct'] });
trait('Heteroptera', { diagnosticTraits: ['mouthparts in front of eyes', 'large distinct scutellum', 'hemelytra held flat over abdomen'], wingType: 'hemelytra' });
trait('Aphididae', { diagnosticTraits: ['cornicles near posterior abdomen', 'wingless or with two pairs of wings', 'three pairs of legs'], ecology: ['phloem feeders'], lifeHistory: ['excrete honeydew; mutualism with ants', 'alternation of generations'] });
trait('Coccoidae', { aliases: ['Coccoidea'], diagnosticTraits: ['cornicles absent', 'wingless or with one pair of wings', 'females often legless'], lifeHistory: ['extreme sexual dimorphism; females sedentary/neotenic, males tiny and short-lived'] });
trait('Fulgoroidea', { diagnosticTraits: ['aristate antennae with bulbous pedicel', 'antennae below eyes', 'Y-shaped anal vein'] });
trait('Cicadidae', { diagnosticTraits: ['usually 3 cm or more', '3 prominent ocelli'], lifeHistory: ['subterranean nymphs; males call with timbals on first abdominal segment'] });
trait('Membracidae', { diagnosticTraits: ['pronotum greatly expanded and extending over abdomen'] });
trait('Cicadellidae', { diagnosticTraits: ['hind tibia with one or more rows of smaller spines'], lifeHistory: ['vector plant pathogens'] });
trait('Cercopidae', { diagnosticTraits: ['hind tibia with 1–2 stout spines and apical ring of spines'], lifeHistory: ['nymphs produce protective spittle'] });
trait('Belostomatidae', { diagnosticTraits: ['large raptorial forelegs', 'relatively long thin beak'], ecology: ['predatory'], lifeHistory: ['males carry eggs on backs'] });
trait('Corixidae', { diagnosticTraits: ['short broad rounded beak', 'reduced forelegs with scoop-shaped tarsi'], ecology: ['aquatic; feed on algae/protozoans'], notableStructures: ['plastron'] });
trait('Gerridae', { diagnosticTraits: ['aquatic bugs on water surface', 'very long slender middle and hind legs'], notableStructures: ['hydrophobic setae'] });
trait('Cimicidae', { diagnosticTraits: ['flat oval body', 'vestigial non-functional wings'], ecology: ['parasitic'], lifeHistory: ['traumatic hemocoelic insemination'] });
trait('Pentatomidae', { diagnosticTraits: ['5-segmented antennae', 'shield-shaped body', 'large scutellum'] });
trait('Scutelleridae', { diagnosticTraits: ['scutellum completely covers abdomen and wings'] });
trait('Reduviidae', { diagnosticTraits: ['3-segmented beak fitting prosternal groove', 'simple venation'], ecology: ['predatory'], legType: 'often raptorial' });
trait('Coreidae', { diagnosticTraits: ['many veins in wing membrane', '4-segmented beak'], lifeHistory: ['emit stinky secretions'] });
trait('Lygaeidae', { diagnosticTraits: ['4–5 distinct wing membrane veins', '4-segmented beak', 'simple forelegs'] });
trait('Miridae', { diagnosticTraits: ['cuneus', '1–2 closed cells in membrane', 'lack ocelli'] });
trait('Psocodea', { diagnosticTraits: ['book lice, bark lice, and parasitic lice'], lifeHistory: ['parasitic forms evolved from free-living dander feeders'] });
trait('Thysanoptera', { diagnosticTraits: ['fringed wings', 'asymmetric mouthparts', 'left mandible thin stylet; right mandible virtually absent'], ecology: ['feed on flowers/fungi by piercing cells'], notableStructures: ['eversible adhesive pretarsal bladders'] });

const practicalFamilyKeys = {
  Odonata: { title: 'Adult Odonata suborder/family key', nodes: [
    { id: 'o1', feature: 'Wing shape', prompt: 'Are the forewing and hindwing similar in size and shape?', yes: 'Zygoptera', no: 'o2' },
    { id: 'o2', feature: 'Wing triangles', prompt: 'Are the triangles similar in shape and pointing the same direction, with no foot-shaped anal loop?', yes: 'Aeshnidae', no: 'Libellulidae' }
  ] },
  Orthoptera: { title: 'Common Orthoptera key', nodes: [
    { id: 'r1', feature: 'Antennae and tympanum', prompt: 'Are antennae shorter than body, ovipositor small, and tympana on the first abdominal segment?', yes: 'Acrididae', no: 'r2' },
    { id: 'r2', feature: 'Tarsomeres', prompt: 'Are there 3 tarsomeres?', yes: 'Gryllidae', no: 'r3' },
    { id: 'r3', feature: 'Fore-tibial tympanum', prompt: 'Are tympana present on the fore tibiae?', yes: 'Tettigoniidae', no: 'Rhaphidophoridae' }
  ] },
  Hemiptera: { title: 'Common Hemiptera family key', nodes: [
    { id: 'h1', feature: 'Mouthpart base and wings', prompt: 'Mouthparts behind/under eyes, scutellum indistinct, forewings not hemelytra and roof-like?', yes: 'h2', no: 'h8' },
    { id: 'h2', feature: 'Antennae', prompt: 'Are antennae long and threadlike?', yes: 'h3', no: 'h4' },
    { id: 'h3', feature: 'Cornicles', prompt: 'Are cornicles present near the posterior abdomen?', yes: 'Aphididae', no: 'Coccoidae' },
    { id: 'h4', feature: 'Antennae and pedicel', prompt: 'Are antennae aristate with a bulbous pedicel below the eyes?', yes: 'Fulgoroidea', no: 'h5' },
    { id: 'h5', feature: 'Ocelli and size', prompt: 'Is the insect usually 3 cm or more with 3 prominent ocelli?', yes: 'Cicadidae', no: 'h6' },
    { id: 'h6', feature: 'Pronotum', prompt: 'Does the pronotum extend over the abdomen?', yes: 'Membracidae', no: 'h7' },
    { id: 'h7', feature: 'Hind tibia', prompt: 'Does the hind tibia have 1–2 stout spines and an apical ring?', yes: 'Cercopidae', no: 'Cicadellidae' },
    { id: 'h8', feature: 'Antennae', prompt: 'Are antennae very short?', yes: 'h9', no: 'h10' },
    { id: 'h9', feature: 'Forelegs and beak', prompt: 'Are forelegs reduced, tarsi scoop-shaped, and the beak short, broad, and rounded?', yes: 'Corixidae', no: 'Belostomatidae' },
    { id: 'h10', feature: 'Habitat and legs', prompt: 'Is it aquatic on the water surface with very long slender middle and hind legs?', yes: 'Gerridae', no: 'h11' },
    { id: 'h11', feature: 'Scutellum', prompt: 'Does the scutellum extend to the end of the abdomen?', yes: 'Scutelleridae', no: 'h12' },
    { id: 'h12', feature: 'Wings', prompt: 'Is the body flat and oval with vestigial, non-functional wings?', yes: 'Cimicidae', no: 'h13' },
    { id: 'h13', feature: 'Antennae and scutellum', prompt: 'Are antennae 5-segmented, with a shield-shaped body and large scutellum?', yes: 'Pentatomidae', no: 'h14' },
    { id: 'h14', feature: 'Beak segments', prompt: 'Is the beak 3-segmented and is wing venation simple?', yes: 'Reduviidae', no: 'h15' },
    { id: 'h15', feature: 'Beak segments', prompt: 'Is the beak 4-segmented?', yes: 'h16', no: 'h16' },
    { id: 'h16', feature: 'Wing membrane', prompt: 'Does the hemelytral membrane have many veins?', yes: 'Coreidae', no: 'h17' },
    { id: 'h17', feature: 'Cuneus and cells', prompt: 'Is a cuneus present with 1–2 closed cells?', yes: 'Miridae', no: 'Lygaeidae' }
  ] }
};
const practicalQuestionBank = [
  ...practicalTaxa.filter(taxon => (taxon.rank === 'order' || taxon.rank === 'suborder') && !taxon.sourceLimitation).flatMap(taxon => taxon.diagnosticTraits.slice(0, 2).map((clue, index) => ({
    id: `taxon-${taxon.name}-${index}`, type: taxon.rank === 'order' ? 'order-identification' : 'suborder-identification', topic: 'taxonomy', taxon: taxon.name,
    prompt: `Which ${taxon.rank} matches this observable feature? <strong>${clue}</strong>`, answer: taxon.name,
    explanation: `${taxon.name}: ${taxon.diagnosticTraits.join('; ')}.`, requiresKey: false
  }))),
  ...practicalTaxa.filter(taxon => taxon.rank === 'family' || taxon.rank === 'superfamily').flatMap(taxon => [
    ...taxon.diagnosticTraits.map((clue, index) => ({
      id: `family-${taxon.name}-trait-${index}`, type: 'family-identification', topic: 'family key', taxon: taxon.name,
      prompt: `Use the available family key. Which group is supported by this diagnostic feature? <strong>${clue}</strong>`,
      answer: taxon.name, acceptedAnswers: [taxon.name, ...taxon.aliases], explanation: `${taxon.name}: ${clue}.`, requiresKey: true
    })),
    ...taxon.ecology.map((clue, index) => ({
      id: `family-${taxon.name}-ecology-${index}`, type: 'ecology-life-history', topic: 'ecology/life history', taxon: taxon.name,
      prompt: `Which family or superfamily has this supported ecology or life-history feature? <strong>${clue}</strong>`,
      answer: taxon.name, acceptedAnswers: [taxon.name, ...taxon.aliases], explanation: `${taxon.name}: ${clue}.`, requiresKey: true
    })),
    ...taxon.lifeHistory.map((clue, index) => ({
      id: `family-${taxon.name}-life-${index}`, type: 'ecology-life-history', topic: 'ecology/life history', taxon: taxon.name,
      prompt: `Which family or superfamily has this supported life-history feature? <strong>${clue}</strong>`,
      answer: taxon.name, explanation: `${taxon.name}: ${clue}.`, requiresKey: true
    })),
    {
    id: `family-${taxon.name}`, type: 'family-identification', topic: 'family key', taxon: taxon.name,
    prompt: `Use the available family key. Which group is supported by this diagnostic feature? <strong>${taxon.diagnosticTraits[0] || 'the applicable couplet'}</strong>`,
    answer: taxon.name, acceptedAnswers: [taxon.name, ...taxon.aliases], explanation: `${taxon.name}: ${taxon.diagnosticTraits.join('; ')}.`, requiresKey: true
    }
  ])
];
