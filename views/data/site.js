const navigation = [
  { label: 'Home', href: 'index.html' },
  { label: 'Orders Quiz', href: 'orders-quiz.html' },
  { label: 'Lab Practical', href: 'practical.html' }
];

const pages = [
  {
    template: 'pages/home.hbs',
    output: 'index.html',
    title: "Sully's Study Materials",
    page: 'home',
    headerDescription: 'Study resources for insect orders, identification, and practical preparation.'
  },
  {
    template: 'pages/orders-quiz.hbs',
    output: 'orders-quiz.html',
    title: 'Insect Orders Study Lab',
    page: 'quiz',
    scripts: [
      'https://cdn.jsdelivr.net/npm/handlebars@4.7.8/dist/handlebars.min.js',
      'data.js',
      'script.js'
    ]
  },
  {
    template: 'pages/practical.hbs',
    output: 'practical.html',
    title: 'Lab Practical',
    page: 'practical',
    scripts: ['practical-data.js', 'practical.js']
  }
];

module.exports = { navigation, pages };
