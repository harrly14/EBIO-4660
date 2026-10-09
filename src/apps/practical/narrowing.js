// Progressive identification: broad group → … → order → suborder → family. Pure, so the quiz and the home page share it.
import { makeChoices, pickDistractors, shuffle } from '../../engine/util.js';
import { ancestorsOf } from './taxonomy.js';

export const isFamilyRank = taxon => taxon.rank === 'family' || taxon.rank === 'superfamily';
export const orderOf = taxon => String(taxon.parent || '').split('→')[0].trim();

/* Everything at or above this level adds nothing: every family in the course is an insect. */
const TOP = 'Insecta';
const LEVELS = {
  grouping: { level: 'major group', prompt: 'Which major group?' },
  order: { level: 'order', prompt: 'Which order?' },
  suborder: { level: 'suborder', prompt: 'Which suborder?' }
};

/* The taxon plus three same-rank wrong answers (same order first for families) that do not share the clue. */
export function taxonChoices(taxa, taxon, sharesClue = () => false) {
  const keyed = isFamilyRank(taxon);
  const candidates = taxa.filter(item => item.name !== taxon.name && !item.sourceLimitation && !sharesClue(item.name) && (keyed ? isFamilyRank(item) : item.rank === taxon.rank));
  const preferred = keyed ? item => orderOf(item) === orderOf(taxon)
    : taxon.rank === 'order' ? item => item.grouping === taxon.grouping
      : item => item.parent === taxon.parent;
  return shuffle([taxon.name, ...pickDistractors(candidates, preferred).map(item => item.name)]);
}

/* One step per level above the family, broadest first, e.g. Neoptera → Polyneoptera → Orthoptera → Caelifera for Acrididae.
   Wrong answers are siblings first, then (except for nested major groups) other taxa of the same rank, never a direct ancestor or descendant of the answer. */
export function narrowingSteps(taxon, taxa) {
  const chain = ancestorsOf(taxon, taxa);
  const top = chain.findIndex(node => node.name === TOP);
  const above = (top === -1 ? chain : chain.slice(0, top)).filter(node => LEVELS[node.rank]).reverse();
  return above.map(node => {
    const related = new Set([node.name, ...ancestorsOf(node, taxa).map(item => item.name)]);
    const parent = ancestorsOf(node, taxa)[0]?.name;
    const rivals = taxa.filter(item => item.rank === node.rank && !related.has(item.name) && !ancestorsOf(item, taxa).some(ancestor => ancestor.name === node.name))
      .filter(item => node.rank !== 'grouping' || ancestorsOf(item, taxa)[0]?.name === parent); // major groups nest, so only compare same-depth groups
    const choices = makeChoices(node.name, rivals.map(item => item.name), name => ancestorsOf(rivals.find(item => item.name === name), taxa)[0]?.name === parent);
    return { ...LEVELS[node.rank], answer: node.name, choices };
  });
}
