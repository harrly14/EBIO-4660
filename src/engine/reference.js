// Reference tab: a shell with one tab per section. Each section is { id, label, mount(container) }.
import { delegate, render } from './dom.js';

export function createReferenceTab(pane, app) {
  const { intro, sections } = app.config.reference;
  let activeId = sections[0].id;
  let built = false;

  function show() {
    if (built) return;
    built = true;
    renderShell();
  }

  function renderShell() {
    pane.innerHTML = render('reference-shell', {
      intro,
      multiple: sections.length > 1,
      sections: sections.map(section => ({ id: section.id, label: section.label, active: section.id === activeId }))
    });
    sections.find(section => section.id === activeId).mount(pane.querySelector('[data-role="reference-section"]'));
  }

  delegate(pane, 'click', {
    'reference-section': button => {
      activeId = button.dataset.section;
      renderShell();
    }
  });

  return { show };
}

/* A section showing one table per segment (e.g. External / Internal), switched by buttons. */
export function segmentedTableSection({ id, label, columns, segments }) {
  return {
    id,
    label,
    mount(container) {
      let active = 0;
      const draw = () => {
        container.innerHTML = render('reference/segmented-table', {
          columns,
          rows: segments[active].rows,
          segments: segments.map((segment, index) => ({ label: segment.label, active: index === active }))
        });
      };
      container.onclick = event => {
        const button = event.target.closest('[data-action="reference-segment"]');
        if (!button) return;
        active = Number(button.dataset.index);
        draw();
      };
      draw();
    }
  };
}

/* A section that renders a template once from fixed data. */
export function staticSection({ id, label, template, data }) {
  return { id, label, mount(container) { container.innerHTML = render(template, data); } };
}
