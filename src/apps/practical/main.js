// Lab Practical: content + question pools plugged into the shared study engine.
import content from '../../generated/practical-content.js';
import { createStudyApp } from '../../engine/app.js';
import { buildPools, PRACTICE_MODES } from './questions.js';
import { RANK_LABELS, referenceSections } from './reference.js';

/* Flashcards: every taxon with traits, plus every anatomy structure. */
const taxonCards = content.taxa.filter(taxon => taxon.diagnosticTraits.length).map(taxon => ({
  term: taxon.name,
  clue: taxon.diagnosticTraits.join('; '),
  eyebrow: [RANK_LABELS[taxon.rank], taxon.commonName].filter(Boolean).join(' • '),
  sections: [
    { heading: 'How to identify', items: taxon.diagnosticTraits },
    { heading: 'Ecology & life history', items: [...taxon.ecology, ...taxon.lifeHistory] },
    { heading: 'Practical facts', items: taxon.practicalFacts }
  ].filter(section => section.items.length),
  tags: [RANK_LABELS[taxon.rank]]
}));
const anatomyCards = [...new Map(content.anatomy.flatMap(region => region.structures.map(structure => [structure.term, {
  term: structure.term,
  clue: structure.function,
  eyebrow: `${region.category} • ${region.region}`,
  sections: [{ heading: 'Location', text: structure.location }, { heading: 'Function', text: structure.function }],
  tags: [region.region, ...(structure.aliases || [])]
}]))).values()];

createStudyApp({
  id: 'practical',
  storageMigrations: [['ebioPracticalSeen', 'seen'], ['ebioPracticalProgress', null]],
  lessons: content.lessons,
  practice: {
    pools: buildPools(content),
    modes: PRACTICE_MODES
  },
  flashcards: {
    deck: [...taxonCards, ...anatomyCards],
    modes: [
      { value: 'term', label: 'Term' },
      { value: 'clue', label: 'Description' }
    ],
    front: (card, mode) => (mode === 'term'
      ? { eyebrow: 'Term', text: card.term, hint: 'What should you identify, locate, or explain?' }
      : { eyebrow: 'Description', text: card.clue, hint: 'Name the taxon or structure', clue: true }),
    back: card => ({ eyebrow: card.eyebrow, title: card.term, sections: card.sections, tags: card.tags })
  },
  reference: {
    intro: 'Review taxa, anatomy, morphology, comparisons, and keys for Practical 1.',
    sections: referenceSections(content)
  }
});
