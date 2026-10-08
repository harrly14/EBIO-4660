// Learn tab: lesson navigation, optional self-check, and "Practice these ideas".
import { delegate, render, revealOptions, role } from './dom.js';
import { numbered, shuffle } from './util.js';

export function createLearnTab(pane, app) {
  const lessons = app.config.lessons;
  let index = 0;

  function show() {
    const lesson = lessons[index];
    const last = index === lessons.length - 1;
    pane.innerHTML = render('learn', {
      nav: lessons.map((item, i) => ({ index: i, number: i + 1, label: item.navTitle || item.title, active: i === index })),
      lesson,
      check: lesson.check && { question: lesson.check.question, choices: numbered(shuffle(lesson.check.choices)) },
      first: index === 0,
      nextLabel: last ? 'Go to Practice →' : 'Next lesson →'
    });
  }

  const goTo = next => {
    index = next;
    show();
  };

  delegate(pane, 'click', {
    'lesson-go': button => goTo(Number(button.dataset.index)),
    'lesson-prev': () => index > 0 && goTo(index - 1),
    'lesson-next': () => (index < lessons.length - 1 ? goTo(index + 1) : app.setTab('practice')),
    'lesson-practice': () => app.tabs.practice.startFromLesson(lessons[index].practiceMode),
    'lesson-check': button => {
      const { answer, explanation } = lessons[index].check;
      const ok = button.dataset.value === answer;
      revealOptions(pane, { correct: [answer], chosen: [button.dataset.value] });
      role(pane, 'lesson-feedback').innerHTML = render('feedback', { ok, message: ok ? 'Correct.' : 'Not quite.', explanation });
    }
  });

  return { show };
}
