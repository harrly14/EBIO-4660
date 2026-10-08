// DOM helpers shared by every tab: delegated events, role lookup, keyboard checks.
import { templates } from '../generated/templates.js';

export function render(name, data) {
  const template = templates[name];
  if (!template) throw new Error(`Unknown template "${name}"`);
  return template(data);
}

/* Routes `type` events from elements with data-<attribute>="<name>" to handlers[name](element, event). */
export function delegate(root, type, handlers, attribute = 'action') {
  root.addEventListener(type, event => {
    const element = event.target.closest(`[data-${attribute}]`);
    const handler = element && root.contains(element) && handlers[element.dataset[attribute]];
    if (handler) handler(element, event);
  });
}

export const role = (root, name) => root.querySelector(`[data-role="${name}"]`);
export const roles = (root, name) => [...root.querySelectorAll(`[data-role="${name}"]`)];

/* True while the user is typing into a field, so single-key shortcuts should not fire. */
export function isTyping(event) {
  const target = event.target;
  if (target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return true;
  return target instanceof HTMLInputElement && !['checkbox', 'radio', 'range', 'button'].includes(target.type);
}

/* 0-based option index for number keys 1-9, otherwise null. */
export function digitIndex(event) {
  return /^[1-9]$/.test(event.key) ? Number(event.key) - 1 : null;
}

/* Marks the option buttons/labels of an answered question and disables them. */
export function revealOptions(root, { correct, chosen = [], markOthersWrong = false }) {
  root.querySelectorAll('.option').forEach(option => {
    const value = option.dataset.value ?? option.querySelector('input')?.value;
    const input = option.querySelector('input');
    if (correct.includes(value)) option.classList.add('correct');
    else if (markOthersWrong || chosen.includes(value)) option.classList.add('wrong');
    if (input) input.disabled = true;
    else option.disabled = true;
  });
}
