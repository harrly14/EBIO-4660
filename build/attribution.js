// Writes images/ATTRIBUTION.md from the image credits recorded in content/.
export function attributionMarkdown(imageSets) {
  const lines = ['# Image attribution', '', 'Generated from content/orders/photos.json and content/practical/images.json.', ''];
  imageSets.forEach(({ label, images }) => {
    lines.push(`## ${label}`, '');
    images.forEach(image => {
      if (!image.sourceUrl) {
        lines.push(`- \`${image.src}\` (${image.taxon}): credit not yet recorded`);
        return;
      }
      lines.push(`- \`${image.src}\` (${image.taxon}): [${image.title || 'source'}](${image.sourceUrl}) by ${image.creator || 'unknown creator'}, ${image.license || 'license unknown'}`);
    });
    lines.push('');
  });
  return lines.join('\n');
}
