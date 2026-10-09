// Taxon hierarchy helpers: a photo of a family also counts for its suborder, order, grouping and class.
const lastOf = parent => String(parent || '').split('→').pop().trim();

/* Taxa above `taxon`, nearest first. Orders climb through their grouping (e.g. Odonata → Paleoptera → Insecta);
   everything else climbs through its parent. */
export function ancestorsOf(taxon, taxa) {
  const byName = new Map(taxa.map(item => [item.name, item]));
  const chain = [];
  let current = taxon;
  while (current && chain.length < 12) {
    const viaGrouping = current.rank === 'order' && current.grouping !== current.name ? current.grouping : null;
    const next = byName.get(viaGrouping || lastOf(current.parent));
    if (!next || next === taxon || chain.includes(next)) break;
    chain.push(next);
    current = next;
  }
  return chain;
}

/* Photos per taxon, counting each photo once for its own taxon and once for every ancestor. */
export function photoCoverage(taxa, images) {
  const counts = Object.fromEntries(taxa.map(taxon => [taxon.name, { own: 0, total: 0, from: {} }]));
  const byName = new Map(taxa.map(taxon => [taxon.name, taxon]));
  images.filter(image => image.quiz !== false && byName.has(image.taxon)).forEach(image => {
    const taxon = byName.get(image.taxon);
    counts[taxon.name].own += 1;
    [taxon, ...ancestorsOf(taxon, taxa)].forEach(node => {
      counts[node.name].total += 1;
      counts[node.name].from[taxon.name] = (counts[node.name].from[taxon.name] || 0) + 1;
    });
  });
  return counts;
}
