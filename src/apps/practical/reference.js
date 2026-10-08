// Lab Practical reference sections: taxa tree, anatomy, morphology, comparisons, keys.
import { render } from '../../engine/dom.js';
import { segmentedTableSection, staticSection } from '../../engine/reference.js';
import { groupBy } from '../../engine/util.js';
import { isFamilyRank } from './questions.js';

export const RANK_LABELS = { phylum: 'Phylum', subphylum: 'Subphylum', class: 'Class', grouping: 'Major group', order: 'Order', suborder: 'Suborder', family: 'Family', superfamily: 'Superfamily' };

/* Families hang off the last segment of "Order → Suborder"; orders hang off their major group when it differs from their parent. */
function treeParent(taxon, names) {
  if (isFamilyRank(taxon)) return taxon.parent.split('→').pop().trim();
  if (taxon.rank === 'order' && taxon.grouping && taxon.grouping !== taxon.parent && names.has(taxon.grouping)) return taxon.grouping;
  return taxon.parent || '';
}

function detailBlocks(taxon) {
  const morphology = [
    taxon.legType && `Legs: ${taxon.legType}`, taxon.wingType && `Wings: ${taxon.wingType}`,
    taxon.mouthpartType && `Mouthparts: ${taxon.mouthpartType}`, taxon.antennaType && `Antennae: ${taxon.antennaType}`
  ].filter(Boolean);
  return [
    ['How to identify', taxon.diagnosticTraits],
    ['Ecology / biology', taxon.ecology],
    ['Life history', taxon.lifeHistory],
    ['Relevant morphology', morphology],
    ['Important practical facts', taxon.practicalFacts],
    ['Confusion taxa', taxon.confusionTaxa],
    ['Distinctions', taxon.distinctions]
  ].filter(([, items]) => items.length).map(([heading, items]) => ({ heading, items }));
}

function taxaSection(taxa, images) {
  const names = new Set(taxa.map(taxon => taxon.name));
  const childrenOf = groupBy(taxa, taxon => treeParent(taxon, names));
  const imagesByTaxon = groupBy(images, image => image.taxon);
  const expanded = new Set(['Arthropoda', 'Hexapoda', 'Insecta']);
  const open = new Set();

  const node = taxon => {
    const children = (childrenOf[taxon.name] || []).map(node);
    const blocks = detailBlocks(taxon);
    const nodeImages = imagesByTaxon[taxon.name] || [];
    return {
      name: taxon.name, rank: taxon.rank, rankLabel: RANK_LABELS[taxon.rank], commonName: taxon.commonName,
      children, childCount: `${children.length} ${children.length === 1 ? 'child' : 'children'}`,
      expanded: children.length > 0 && expanded.has(taxon.name), open: open.has(taxon.name),
      images: nodeImages, blocks, sourceLimitation: taxon.sourceLimitation,
      hasDetails: Boolean(blocks.length || nodeImages.length || taxon.sourceLimitation)
    };
  };

  /* Expand/collapse and details toggle in place so the tree keeps its scroll position. */
  const setExpanded = (element, on) => {
    const children = element.querySelector(':scope > .taxon-children');
    if (!children) return;
    children.hidden = !on;
    element.classList.toggle('is-expanded', on);
    element.querySelector(':scope > .taxon-row .taxon-toggle').setAttribute('aria-expanded', String(on));
    if (on) expanded.add(element.dataset.taxon);
    else expanded.delete(element.dataset.taxon);
  };
  const setOpen = (element, on) => {
    element.querySelector(':scope > .taxon-details').hidden = !on;
    element.classList.toggle('is-open', on);
    const label = element.querySelector(':scope > .taxon-row .taxon-label');
    label.setAttribute('aria-expanded', String(on));
    label.querySelector('.taxon-info-hint').textContent = on ? 'Hide details' : 'Details';
    if (on) open.add(element.dataset.taxon);
    else open.delete(element.dataset.taxon);
  };

  return {
    id: 'taxa',
    label: 'Taxa',
    mount(container) {
      container.innerHTML = render('reference/taxa', { roots: (childrenOf[''] || []).map(node) });
      const all = () => container.querySelectorAll('.taxon-node');
      const actions = {
        'taxon-toggle': element => setExpanded(element, !element.classList.contains('is-expanded')),
        'taxon-details': element => setOpen(element, !element.classList.contains('is-open')),
        'taxa-expand-all': () => all().forEach(element => setExpanded(element, true)),
        'taxa-collapse-all': () => all().forEach(element => setExpanded(element, false)),
        'taxa-close-details': () => all().forEach(element => setOpen(element, false))
      };
      container.onclick = event => {
        const button = event.target.closest('[data-action]');
        if (button && actions[button.dataset.action]) actions[button.dataset.action](button.closest('.taxon-node'));
      };
    }
  };
}

export function referenceSections({ taxa, images, anatomy, morphology, comparisons, keys }) {
  const anatomyRows = category => anatomy.filter(region => region.category === category)
    .flatMap(region => region.structures.map(structure => [region.region, structure.term, structure.location, structure.function]));
  return [
    taxaSection(taxa, images),
    segmentedTableSection({
      id: 'anatomy', label: 'Anatomy',
      columns: ['Region', 'Structure', 'Location', 'Function'],
      segments: [
        { label: 'External', rows: anatomyRows('External anatomy') },
        { label: 'Internal', rows: anatomyRows('Internal anatomy') }
      ]
    }),
    segmentedTableSection({
      id: 'morphology', label: 'Morphology',
      columns: ['Type', 'Description'],
      segments: morphology.map(group => ({ label: group.label, rows: group.types.map(type => [type.term, type.description]) }))
    }),
    staticSection({ id: 'comparisons', label: 'Comparisons', template: 'reference/comparisons', data: { comparisons } }),
    staticSection({ id: 'keys', label: 'Keys', template: 'reference/keys', data: { keys } })
  ];
}
