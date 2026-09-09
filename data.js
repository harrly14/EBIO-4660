const orders = [
{order:'Archaeognatha',common:'Jumping bristletails',aliases:['bristletail','jumping bristletail'],traits:['Wingless with a humped, cylindrical body','Three tail filaments; the middle filament is especially long','Large eyes and an ability to jump'],key:'Humped wingless jumper with 3 tails',meta:'wingless',tags:['wingless','3 tails','jumping']},
{order:'Odonata',common:'Dragonflies and damselflies',aliases:['dragonfly','damselfly'],traits:['Two pairs of long membranous wings','Very large eyes and a long abdomen','Predatory adults; aquatic nymphs'],key:'Huge eyes + long abdomen + 2 pairs of long wings',meta:'hemi',tags:['aquatic nymph','predator','4 wings']},
{order:'Grylloblattodea',common:'Rock crawlers / ice crawlers',aliases:['rock crawler','ice crawler'],traits:['Wingless, elongated, pale insects','Long antennae and cerci','Strongly associated with cold environments'],key:'Wingless cold-adapted crawler',meta:'wingless',tags:['wingless','cold','long antennae']},
{order:'Mantophasmatodea',common:'Gladiators / heelwalkers',aliases:['gladiator','heelwalker'],traits:['Wingless predatory insects','Long legs and antennae','Mantis/stick-insect appearance without classic mantis raptorial forelegs'],key:'Wingless predator that looks mantis/stick-like',meta:'wingless',tags:['wingless','predator','long legs']},
{order:'Dermaptera',common:'Earwigs',aliases:['earwig'],traits:['Forceps-like cerci at the end of the abdomen','Short leathery forewings in many adults','Elongate, flattened body'],key:'Pincers on the rear end',meta:'hemi',tags:['pincers','cerci','earwig']},
{order:'Mantodea',common:'Mantises',aliases:['mantis','praying mantis'],traits:['Raptorial grasping forelegs','Long prothorax and triangular mobile head','Predatory'],key:'Praying/grasping forelegs',meta:'hemi',tags:['raptorial legs','predator','long prothorax']},
{order:'Ephemeroptera',common:'Mayflies',aliases:['mayfly'],traits:['Two or three long tail filaments','Large triangular forewings held upright','Short antennae; aquatic nymphs'],key:'Upright wings + 2-3 long tails',meta:'hemi',tags:['upright wings','tails','aquatic nymph']},
{order:'Trichoptera',common:'Caddisflies',aliases:['caddisfly'],traits:['Moth-like adults with hairy rather than scaly wings','Wings often held tent-like over the body','Long antennae; aquatic larvae'],key:'Moth-like, but hairy tented wings',meta:'holo',tags:['hairy wings','aquatic larva','long antennae']},
{order:'Siphonaptera',common:'Fleas',aliases:['flea'],traits:['Wingless and laterally compressed','Powerful jumping hind legs','Blood-feeding ectoparasites with piercing-sucking mouthparts'],key:'Sideways-flat wingless jumper',meta:'holo',tags:['parasite','jumping','laterally compressed']},
{order:'Blattodea',common:'Cockroaches and termites',aliases:['cockroach','roach','termite'],traits:['Cockroaches are flattened, oval, long-antennaed insects','Termites are soft-bodied social insects','Termite alates have two pairs of similar-sized wings'],key:'Roaches + termites',meta:'hemi',tags:['roach','termite','social']},
{order:'Plecoptera',common:'Stoneflies',aliases:['stonefly'],traits:['Two tail filaments in many species','Wings lie flat or folded over the abdomen','Long antennae; aquatic nymphs usually in streams'],key:'Flat-folded wings + 2 tails',meta:'hemi',tags:['2 tails','flat wings','stream']},
{order:'Embioptera',common:'Webspinners',aliases:['webspinner'],traits:['Slender insects that live in silken galleries','Enlarged front tarsi contain silk glands','Females are usually wingless'],key:'Silk-spinning front feet',meta:'hemi',tags:['silk feet','gallery','slender']},
{order:'Orthoptera',common:'Grasshoppers, crickets, and locusts',aliases:['grasshopper','cricket','locust','katydid'],traits:['Enlarged hind legs specialized for jumping','Chewing mouthparts','Forewings often leathery; many species stridulate'],key:'Huge jumping hind legs',meta:'hemi',tags:['jumping legs','stridulation','chewing']},
{order:'Phasmatodea',common:'Stick and leaf insects',aliases:['stick insect','walking stick','leaf insect'],traits:['Extreme stick or leaf mimicry','Long body and legs in many species','Chewing herbivores'],key:'Looks like a stick or leaf',meta:'hemi',tags:['camouflage','stick-like','leaf-like']},
{order:'Psocodea',common:'Booklice, barklice, and parasitic lice',aliases:['booklouse','booklice','barklouse','barklice','louse','lice'],traits:['Book/barklice are tiny, soft-bodied and often large-headed','Parasitic lice are wingless and flattened','Parasitic forms cling to hosts'],key:'Booklice/barklice + parasitic lice',meta:'hemi',tags:['lice','tiny','parasite']},
{order:'Megaloptera',common:'Dobsonflies, alderflies, and fishflies',aliases:['dobsonfly','alderfly','fishfly'],traits:['Large insects with two broad, heavily veined wings','Dobsonfly males may have enormous mandibles','Aquatic predatory larvae'],key:'Large net-winged insect; dobsonfly may have huge jaws',meta:'holo',tags:['large','net wings','huge mandibles']},
{order:'Raphidioptera',common:'Snakeflies',aliases:['snakefly'],traits:['Distinctively elongated prothorax creates a long neck','Two pairs of clear, net-veined wings','Predatory'],key:'Long snake-like neck',meta:'holo',tags:['long neck','net wings','predator']},
{order:'Coleoptera',common:'Beetles',aliases:['beetle'],traits:['Forewings hardened into elytra','Elytra usually meet in a straight line down the back','Chewing mouthparts'],key:'Hard shell-like forewings (elytra)',meta:'holo',tags:['elytra','hard forewings','largest order']},
{order:'Strepsiptera',common:'Twisted-wing parasites',aliases:['twisted-wing parasite','strepsipteran'],traits:['Highly specialized insect parasites','Males have tiny forewings and large fan-shaped hindwings','Females of many species remain largely within the host'],key:'Tiny forewings + fan-shaped hindwings; parasite',meta:'holo',tags:['parasite','fan wings','reduced forewings']},
{order:'Mecoptera',common:'Scorpionflies and hangingflies',aliases:['scorpionfly','hangingfly'],traits:['Elongated beak-like rostrum','Many scorpionfly males have an upcurved terminal genital bulb','Two pairs of membranous wings'],key:'Long snout; male may look scorpion-tailed',meta:'holo',tags:['snout','scorpion tail','rostrum']},
{order:'Diptera',common:'True flies and mosquitoes',aliases:['fly','true fly','mosquito','gnat','midge'],traits:['Only one pair of functional wings','Hindwings are reduced to halteres','Adults often have large compound eyes'],key:'One pair of wings + halteres',meta:'holo',tags:['1 pair wings','halteres','fly']},
{order:'Lepidoptera',common:'Butterflies and moths',aliases:['butterfly','moth'],traits:['Wings covered with scales','Adults often have a coiled proboscis','Larvae are caterpillars'],key:'Scaly wings',meta:'holo',tags:['scales','caterpillar','proboscis']},
{order:'Hymenoptera',common:'Ants, bees, wasps, and sawflies',aliases:['ant','bee','wasp','sawfly','hornet'],traits:['Usually two pairs of membranous wings with smaller hindwings','Many have a constricted waist','Includes ants, bees, wasps, and sawflies'],key:'Ant/bee/wasp/sawfly; often narrow waist',meta:'holo',tags:['narrow waist','bee','wasp']},
{order:'Zoraptera',common:'Angel insects / zorapterans',aliases:['angel insect','zorapteran'],traits:['Very small, soft-bodied insects','Often found under bark or in rotting wood','Winged and wingless forms occur'],key:'Tiny soft-bodied termite-like insect',meta:'hemi',tags:['tiny','soft-bodied','under bark']},
{order:'Thysanoptera',common:'Thrips',aliases:['thrips'],traits:['Very small, slender insects','Narrow wings with conspicuous fringes of hairs','Asymmetrical rasping-sucking mouthparts'],key:'Tiny insect with narrow fringed wings',meta:'hemi',tags:['fringed wings','tiny','slender']},
{order:'Hemiptera',common:'True bugs, aphids, cicadas, and hoppers',aliases:['true bug','aphid','cicada','leafhopper','planthopper','stink bug','assassin bug'],traits:['Piercing-sucking beak or rostrum','True bugs often have partly hardened forewings','Includes aphids, cicadas, and many hoppers'],key:'Piercing-sucking beak',meta:'hemi',tags:['beak','piercing-sucking','true bug']},
{order:'Neuroptera',common:'Lacewings, antlions, and owlflies',aliases:['lacewing','antlion','owlfly'],traits:['Two pairs of delicate, similarly sized net-veined wings','Adults often look fragile compared with Megaloptera','Many species are predatory'],key:'Delicate net-veined wings',meta:'holo',tags:['net wings','delicate','predator']},
{order:'Zygentoma',common:'Silverfish',aliases:['silverfish','firebrat'],traits:['Wingless, flattened, carrot-shaped body','Three long tail filaments of roughly similar prominence','Body often covered in scales; fast runner'],key:'Flat wingless runner with 3 tails',meta:'wingless',tags:['3 tails','flat','scales']}
];

const learnLessons = [
  {
    title:'Start here: 12 giveaway orders',
    kicker:'Chunk 1 • easiest points',
    intro:'Memorize these as one-to-one visual hooks. You should eventually be able to answer these without thinking.',
    cards:[
      ['Dermaptera','Earwig','Rear pincers / forceps','DERMaptera → imagine an earwig pinching your dermis.'],
      ['Orthoptera','Grasshopper / cricket','Huge jumping hind legs','ORtho → enormous rear legs are the obvious clue.'],
      ['Mantodea','Mantis','Praying / grasping forelegs','Manto = mantis; the name already almost gives it away.'],
      ['Phasmatodea','Stick / leaf insect','Looks like a stick or leaf','PHASM = apparition/disguise → extreme camouflage.'],
      ['Coleoptera','Beetle','Hard forewings called elytra','Think beetle shell: the front wings form hard covers.'],
      ['Diptera','True flies / mosquitoes','One pair of functional wings','DI = two wings total; the hind pair became halteres.'],
      ['Lepidoptera','Butterflies / moths','Scaly wings','Lepid- refers to scales.'],
      ['Siphonaptera','Fleas','Wingless, sideways-flat jumper','Flea = flattened parasite that jumps.'],
      ['Hymenoptera','Ant / bee / wasp / sawfly','Often a narrow waist; 2 wing pairs','Learn the common-name group first.'],
      ['Hemiptera','True bugs / aphids / cicadas / hoppers','Piercing-sucking beak','HEMIptera true bugs often have half-hardened forewings, but the beak is the safer broad clue.'],
      ['Thysanoptera','Thrips','Tiny, narrow fringed wings','THYSANO = fringe/tassel → fringed wings.'],
      ['Odonata','Dragonflies / damselflies','Huge eyes, long abdomen, 4 long wings','The dragonfly silhouette is usually enough.']
    ],
    rule:'Do not memorize a paragraph for each order yet. Memorize ORDER NAME ↔ COMMON NAME ↔ ONE GIVEAWAY.',
    check:{q:'An insect has forceps-like pincers at the end of its abdomen. Which order?',choices:['Dermaptera','Orthoptera','Plecoptera','Mecoptera'],answer:'Dermaptera',explain:'Dermaptera is the earwig order; rear forceps are the giveaway.'}
  },
  {
    title:'Read the wings first',
    kicker:'Chunk 2 • wing shortcuts',
    intro:'For a winged adult, wing number, texture, and resting position often get you to the answer immediately.',
    cards:[
      ['Diptera','1 functional pair','Hindwings reduced to halteres','Count functional wings first.'],
      ['Coleoptera','Hard forewings','Elytra make a shell over the back','Hard covers = beetle.'],
      ['Lepidoptera','Scaly wings','Butterflies and moths','Scales can look powdery.'],
      ['Trichoptera','Hairy wings','Caddisflies; wings often tented','Moth-like, but hair rather than scales.'],
      ['Thysanoptera','Fringed narrow wings','Thrips','Tiny straps with a hairy fringe.'],
      ['Ephemeroptera','Wings held upright','Mayflies','Usually paired with 2-3 long tails.'],
      ['Plecoptera','Wings folded flat','Stoneflies','Usually paired with 2 tails.'],
      ['Strepsiptera','Tiny forewings + fanlike hindwings','Twisted-wing parasites','Very unusual/reduced wing arrangement.']
    ],
    rule:'ONE PAIR → Diptera. HARD COVERS → Coleoptera. SCALES → Lepidoptera. HAIR → Trichoptera. FRINGE → Thysanoptera. UPRIGHT + tails → Ephemeroptera. FLAT + tails → Plecoptera.',
    check:{q:'A moth-like insect has long antennae and hairy wings held tent-like over its body. Which order?',choices:['Trichoptera','Lepidoptera','Neuroptera','Thysanoptera'],answer:'Trichoptera',explain:'Caddisflies are moth-like, but their wings are hairy rather than covered in scales.'}
  },
  {
    title:'Tails, legs, and body shape',
    kicker:'Chunk 3 • silhouette clues',
    intro:'When wing clues are absent or weak, look at the rear end, specialized legs, and overall body profile.',
    cards:[
      ['Archaeognatha','3 tails + humped body','Jumping bristletail','Humped jumper.'],
      ['Zygentoma','3 tails + flat carrot shape','Silverfish','Flat runner.'],
      ['Ephemeroptera','2-3 tails + upright wings','Mayfly','Up wings.'],
      ['Plecoptera','2 tails + flat-folded wings','Stonefly','Down/flat wings.'],
      ['Dermaptera','Forceps at rear','Earwig','Pincers.'],
      ['Orthoptera','Huge hind legs','Grasshoppers / crickets','Jumping legs.'],
      ['Mantodea','Raptorial front legs','Mantises','Grabbing legs.'],
      ['Embioptera','Silk-producing front feet','Webspinners','Silk comes from enlarged front tarsi.'],
      ['Siphonaptera','Laterally compressed body','Fleas','Sideways-flat parasite.'],
      ['Phasmatodea','Stick/leaf silhouette','Walking sticks / leaf insects','Camouflage dominates the whole body plan.']
    ],
    rule:'For anything with “tails,” count them and then check posture: 3 tails + wingless humped = Archaeognatha; 3 tails + wingless flat = Zygentoma; tails + upright wings = Ephemeroptera; 2 tails + flat wings = Plecoptera.',
    check:{q:'Wingless, flattened, carrot-shaped, fast-running insect with three similar tail filaments:',choices:['Zygentoma','Archaeognatha','Ephemeroptera','Dermaptera'],answer:'Zygentoma',explain:'Silverfish (Zygentoma) are flat runners; jumping bristletails (Archaeognatha) are more humped and can jump.'}
  },
  {
    title:'Master the confusing look-alikes',
    kicker:'Chunk 4 • comparison rules',
    intro:'These are the pairs and trios most worth comparing directly. Learn the difference, not two separate definitions.',
    comparisons:[
      ['Mayfly vs stonefly','Ephemeroptera','upright wings; 2-3 long tails; short antennae','Plecoptera','wings flat over back; usually 2 tails; long antennae'],
      ['Bristletail vs silverfish','Archaeognatha','humped; jumps; middle tail especially long','Zygentoma','flat; carrot-shaped; fast runner; 3 similar tails'],
      ['Caddisfly vs moth','Trichoptera','hairy, tented wings; long antennae','Lepidoptera','scaly wings; butterfly/moth body plan'],
      ['Net-winged trio','Neuroptera','delicate lacewing-type net wings','Megaloptera','large/robust; dobsonfly may have huge jaws'],
      ['Snakefly separator','Raphidioptera','long snake-like neck','Neuroptera / Megaloptera','no extremely elongated neck'],
      ['True bug vs beetle','Hemiptera','piercing-sucking beak','Coleoptera','hard elytra; chewing mouthparts']
    ],
    rule:'When two orders look similar, ask for the single contrast feature: UP vs FLAT wings, HUMPED vs FLAT body, HAIR vs SCALES, DELICATE vs HUGE, LONG NECK vs normal neck, BEAK vs ELYTRA.',
    check:{q:'You see a delicate insect with many net-like wing veins and no elongated neck. It is not large or heavy-bodied. Best order?',choices:['Neuroptera','Megaloptera','Raphidioptera','Trichoptera'],answer:'Neuroptera',explain:'Neuroptera are the delicate net-winged insects; Megaloptera are generally more robust, and Raphidioptera have the conspicuous long neck.'}
  },
  {
    title:'The rare-name cleanup',
    kicker:'Chunk 5 • low-frequency orders',
    intro:'These are harder mostly because the names are unfamiliar. Attach each name to one memorable fact or common name.',
    cards:[
      ['Grylloblattodea','Rock / ice crawlers','Wingless + cold habitats','Think glacier/ice.'],
      ['Mantophasmatodea','Heelwalkers / gladiators','Wingless predator; mantis/stick-like','The hybrid-sounding name matches the hybrid-looking body.'],
      ['Zoraptera','Angel insects','Tiny, soft-bodied, termite-like','Tiny under bark/rotting wood.'],
      ['Psocodea','Booklice, barklice, parasitic lice','Lice grouping','Memorize the common names as a package.'],
      ['Megaloptera','Dobsonflies / alderflies / fishflies','Large net-winged; huge jaws possible','MEGA = big.'],
      ['Raphidioptera','Snakeflies','Long neck','Snake-like neck.'],
      ['Mecoptera','Scorpionflies / hangingflies','Long snout; male may curve tail upward','Scorpionfly name is the hook.'],
      ['Strepsiptera','Twisted-wing parasites','Parasites; strange fan-shaped hindwings','The weird order gets the weird wing plan.'],
      ['Embioptera','Webspinners','Silk from front feet','Web = silk.']
    ],
    rule:'For rare orders, common-name recall may be more useful than morphology at first. Say them as pairs: “Grylloblattodea—ice crawler,” “Raphidioptera—snakefly,” “Mecoptera—scorpionfly.”',
    check:{q:'Which order contains snakeflies and is recognized by a long, snake-like neck?',choices:['Raphidioptera','Megaloptera','Mecoptera','Mantophasmatodea'],answer:'Raphidioptera',explain:'Raphidioptera = snakeflies = elongated prothorax/neck.'}
  },
  {
    title:'Put it all together',
    kicker:'Chunk 6 • identification algorithm',
    intro:'Use the same scan every time. This prevents you from staring at a picture and trying to recall all 28 names at once.',
    algorithm:[
      ['1','Wingless?','Check 3 tails, jumping body, flea shape, lice, ice crawler, heelwalker, etc.'],
      ['2','Number of wings?','One functional pair strongly suggests Diptera.'],
      ['3','Wing texture?','Hard = Coleoptera; scales = Lepidoptera; hairs = Trichoptera; fringe = Thysanoptera.'],
      ['4','Wing posture / veins?','Upright = mayfly; flat + tails = stonefly; net-veined = Neuroptera/Megaloptera/Raphidioptera.'],
      ['5','Rear end?','Pincers, 2 tails, 3 tails, or scorpion-like curve can be decisive.'],
      ['6','Legs?','Jumping hind legs, mantis forelegs, or webspinner front feet.'],
      ['7','Head/thorax?','Piercing beak, long snout, huge jaws, or long snake-like neck.'],
      ['8','Only then use habitat','Cold habitat, aquatic nymph/larva, under bark, or parasitic lifestyle can confirm an ID.']
    ],
    rule:'Your goal is not “remember 28 definitions.” Your goal is “notice a clue → shrink the possibilities → distinguish the last 2-3 orders.”',
    check:{q:'A specimen has two long tails and its wings lie flat over its abdomen. What should you answer?',choices:['Plecoptera','Ephemeroptera','Zygentoma','Neuroptera'],answer:'Plecoptera',explain:'Stoneflies (Plecoptera) pair two tails with flat-folded wings.'}
  }
];

const confusionGroups = [
['Ephemeroptera','Plecoptera'],['Archaeognatha','Zygentoma'],['Trichoptera','Lepidoptera'],['Neuroptera','Megaloptera','Raphidioptera'],['Mantodea','Phasmatodea','Mantophasmatodea'],['Hemiptera','Coleoptera'],['Siphonaptera','Psocodea'],['Blattodea','Hymenoptera'],['Diptera','Hymenoptera'],['Thysanoptera','Trichoptera']
];
const byOrder = Object.fromEntries(orders.map(o=>[o.order,o]));
const photoUrls = {
  'Archaeognatha': [
    'images/Archaeognatha_1.jpg',
    'images/Archaeognatha_2.jpg',
    'images/Archaeognatha_3.jpg',
    'images/Archaeognatha_4.jpg',
    'images/Archaeognatha_5.jpg',
    'images/Archaeognatha_6.jpg',
    'images/Archaeognatha_7.jpg'
  ],
  'Odonata': [
    'images/Odonata_1.jpg',
    'images/Odonata_2.jpg',
    'images/Odonata_3.jpg',
    'images/Odonata_4.jpg',
    'images/Odonata_5.jpg',
    'images/Odonata_6.jpg',
    'images/Odonata_7.jpg',
    'images/Odonata_8.jpg',
    'images/Odonata_9.jpg',
    'images/Odonata_10.jpg'
  ],
  'Grylloblattodea': [
    'images/Grylloblattodea_1.jpg',
    'images/Grylloblattodea_2.jpg'
  ],
  'Mantophasmatodea': [
    'images/Mantophasmatodea_1.jpg',
    'images/Mantophasmatodea_2.jpg'
  ],
  'Dermaptera': [
    'images/Dermaptera_1.jpg',
    'images/Dermaptera_2.jpg',
    'images/Dermaptera_3.jpg',
    'images/Dermaptera_4.png',
    'images/Dermaptera_5.jpg',
    'images/Dermaptera_6.jpg',
    'images/Dermaptera_7.jpg',
    'images/Dermaptera_8.jpg'
  ],
  'Mantodea': [
    'images/Mantodea_1.jpg',
    'images/Mantodea_2.jpg',
    'images/Mantodea_3.jpg',
    'images/Mantodea_4.jpg',
    'images/Mantodea_5.jpg',
    'images/Mantodea_6.jpg'
  ],
  'Ephemeroptera': [
    'images/Ephemeroptera_1.jpg',
    'images/Ephemeroptera_2.jpg',
    'images/Ephemeroptera_3.jpg',
    'images/Ephemeroptera_4.jpg',
    'images/Ephemeroptera_5.jpg',
    'images/Ephemeroptera_6.jpg',
    'images/Ephemeroptera_7.jpg',
    'images/Ephemeroptera_8.jpg',
    'images/Ephemeroptera_9.jpg'
  ],
  'Trichoptera': [
    'images/Trichoptera_1.jpg',
    'images/Trichoptera_2.jpg',
    'images/Trichoptera_3.jpg',
    'images/Trichoptera_4.jpg',
    'images/Trichoptera_5.jpg',
    'images/Trichoptera_6.jpg',
    'images/Trichoptera_7.jpg',
    'images/Trichoptera_8.jpg',
    'images/Trichoptera_9.jpg'
  ],
  'Siphonaptera': [
    'images/Siphonaptera_1.jpg',
    'images/Siphonaptera_2.jpg',
    'images/Siphonaptera_3.jpg',
    'images/Siphonaptera_4.jpg'
  ],
  'Blattodea': [
    'images/Blattodea_1.png',
    'images/Blattodea_2.jpg',
    'images/Blattodea_3.jpg',
    'images/Blattodea_4.jpg',
    'images/Blattodea_5.jpg',
    'images/Blattodea_6.jpg'
  ],
  'Plecoptera': [
    'images/Plecoptera_1.jpg',
    'images/Plecoptera_2.jpg',
    'images/Plecoptera_3.jpg',
    'images/Plecoptera_4.png',
    'images/Plecoptera_5.jpg',
    'images/Plecoptera_6.jpg',
    'images/Plecoptera_7.jpg'
  ],
  'Embioptera': [
    'images/Embioptera_1.jpg',
    'images/Embioptera_2.jpg',
    'images/Embioptera_3.jpg',
    'images/Embioptera_4.jpg'
  ],
  'Orthoptera': [
    'images/Orthoptera_1.jpg',
    'images/Orthoptera_2.jpg',
    'images/Orthoptera_3.jpg',
    'images/Orthoptera_4.jpg',
    'images/Orthoptera_5.jpg',
    'images/Orthoptera_6.jpg',
    'images/Orthoptera_7.jpg',
    'images/Orthoptera_8.jpg',
    'images/Orthoptera_9.jpg',
    'images/Orthoptera_10.jpg'
  ],
  'Phasmatodea': [
    'images/Phasmatodea_1.jpg',
    'images/Phasmatodea_2.jpg',
    'images/Phasmatodea_3.jpg',
    'images/Phasmatodea_4.jpg',
    'images/Phasmatodea_5.jpg',
    'images/Phasmatodea_6.jpg',
    'images/Phasmatodea_7.jpg',
    'images/Phasmatodea_8.jpg',
    'images/Phasmatodea_9.jpg'
  ],
  'Psocodea': [
    'images/Psocodea_1.jpg',
    'images/Psocodea_2.jpg',
    'images/Psocodea_3.jpg',
    'images/Psocodea_4.jpg',
    'images/Psocodea_5.jpg',
    'images/Psocodea_6.jpg',
    'images/Psocodea_7.jpg',
    'images/Psocodea_8.jpg',
    'images/Psocodea_9.jpg'
  ],
  'Megaloptera': [
    'images/Megaloptera_1.jpg',
    'images/Megaloptera_2.jpg',
    'images/Megaloptera_3.jpg',
    'images/Megaloptera_4.jpg',
    'images/Megaloptera_5.jpg',
    'images/Megaloptera_6.jpg',
    'images/Megaloptera_7.jpg'
  ],
  'Raphidioptera': [
    'images/Raphidioptera_1.jpg',
    'images/Raphidioptera_2.jpg',
    'images/Raphidioptera_3.jpg',
    'images/Raphidioptera_4.jpg',
    'images/Raphidioptera_5.jpg',
    'images/Raphidioptera_6.jpg',
    'images/Raphidioptera_7.jpg',
    'images/Raphidioptera_8.jpg'
  ],
  'Coleoptera': [
    'images/Coleoptera_1.jpg',
    'images/Coleoptera_2.jpg',
    'images/Coleoptera_3.jpg',
    'images/Coleoptera_4.jpg',
    'images/Coleoptera_5.jpg',
    'images/Coleoptera_6.jpg',
    'images/Coleoptera_7.jpg',
    'images/Coleoptera_8.jpg',
    'images/Coleoptera_9.jpg',
    'images/Coleoptera_10.jpg',
    'images/Coleoptera_11.jpg'
  ],
  'Strepsiptera': [
    'images/Strepsiptera_1.jpg',
    'images/Strepsiptera_2.jpg'
  ],
  'Mecoptera': [
    'images/Mecoptera_1.jpg',
    'images/Mecoptera_2.jpg',
    'images/Mecoptera_3.jpg',
    'images/Mecoptera_4.jpg',
    'images/Mecoptera_5.jpg',
    'images/Mecoptera_6.jpg',
    'images/Mecoptera_7.jpg',
    'images/Mecoptera_8.jpg',
    'images/Mecoptera_9.jpg'
  ],
  'Diptera': [
    'images/Diptera_1.jpg',
    'images/Diptera_2.jpg',
    'images/Diptera_3.jpg',
    'images/Diptera_4.jpg',
    'images/Diptera_5.jpg',
    'images/Diptera_6.jpg',
    'images/Diptera_7.jpg',
    'images/Diptera_8.jpg',
    'images/Diptera_9.jpg',
    'images/Diptera_10.jpg',
    'images/Diptera_11.jpg'
  ],
  'Lepidoptera': [
    'images/Lepidoptera_1.jpg',
    'images/Lepidoptera_2.jpg',
    'images/Lepidoptera_3.jpg',
    'images/Lepidoptera_4.jpg',
    'images/Lepidoptera_5.jpg',
    'images/Lepidoptera_6.jpg',
    'images/Lepidoptera_7.jpg',
    'images/Lepidoptera_8.jpg',
    'images/Lepidoptera_9.jpg',
    'images/Lepidoptera_10.jpg'
  ],
  'Hymenoptera': [
    'images/Hymenoptera_1.jpg',
    'images/Hymenoptera_2.jpg',
    'images/Hymenoptera_3.jpg',
    'images/Hymenoptera_4.jpg',
    'images/Hymenoptera_5.jpg',
    'images/Hymenoptera_6.jpg',
    'images/Hymenoptera_7.jpg',
    'images/Hymenoptera_8.jpg',
    'images/Hymenoptera_9.jpg',
    'images/Hymenoptera_10.jpg',
    'images/Hymenoptera_11.jpg',
    'images/Hymenoptera_12.jpg'
  ],
  'Zoraptera': [
    'images/Zoraptera_1.png',
    'images/Zoraptera_2.jpg',
    'images/Zoraptera_3.jpg'
  ],
  'Thysanoptera': [
    'images/Thysanoptera_1.jpg',
    'images/Thysanoptera_2.jpg',
    'images/Thysanoptera_3.jpg',
    'images/Thysanoptera_4.jpg'
  ],
  'Hemiptera': [
    'images/Hemiptera_1.jpg',
    'images/Hemiptera_2.jpg',
    'images/Hemiptera_3.png',
    'images/Hemiptera_4.jpg',
    'images/Hemiptera_5.jpg',
    'images/Hemiptera_6.jpg',
    'images/Hemiptera_7.jpg',
    'images/Hemiptera_8.jpg',
    'images/Hemiptera_9.jpg'
  ],
  'Neuroptera': [
    'images/Neuroptera_1.jpg',
    'images/Neuroptera_2.jpg'
  ],
  'Zygentoma': [
    'images/Zygentoma_1.jpg',
    'images/Zygentoma_2.jpg',
    'images/Zygentoma_3.jpg'
  ]
};

const challengeBank = [
['Archaeognatha','What order do jumping bristletails belong to?','Jumping bristletails are Archaeognatha.',['Zygentoma','Dermaptera','Grylloblattodea']],
['Archaeognatha','Which order has a distinctly arched or humped body and three tail filaments?','A humped body with three tail filaments is characteristic of Archaeognatha.',['Zygentoma','Ephemeroptera','Plecoptera']],

['Odonata','What order includes dragonflies and damselflies?','Dragonflies and damselflies are Odonata.',['Ephemeroptera','Neuroptera','Plecoptera']],
['Odonata','Which order has aquatic nymphs with large extendable mouthparts used to catch prey?','Dragonfly and damselfly nymphs belong to Odonata.',['Megaloptera','Ephemeroptera','Trichoptera']],

['Grylloblattodea','What order do ice crawlers belong to?','Ice crawlers are Grylloblattodea.',['Mantophasmatodea','Archaeognatha','Zoraptera']],
['Grylloblattodea','Which order is strongly associated with cold alpine habitats and snowfields?','Grylloblattodea are adapted to very cold habitats.',['Orthoptera','Blattodea','Mantodea']],

['Mantophasmatodea','What order do gladiators belong to?','Gladiators are Mantophasmatodea.',['Mantodea','Phasmatodea','Grylloblattodea']],
['Mantophasmatodea','Which order contains wingless predatory insects commonly called heelwalkers?','Heelwalkers are Mantophasmatodea.',['Mantodea','Embioptera','Orthoptera']],

['Dermaptera','What order has forceps at the end of the abdomen?','Forceps-like cerci are characteristic of Dermaptera.',['Orthoptera','Blattodea','Plecoptera']],
['Dermaptera','Which order includes insects commonly recognized by their rear pincers?','Earwigs and their rear pincers identify Dermaptera.',['Mantodea','Hemiptera','Coleoptera']],

['Mantodea','Which order has a triangular, highly mobile head and raptorial front legs?','Those features are characteristic of Mantodea.',['Orthoptera','Phasmatodea','Mantophasmatodea']],
['Mantodea','What order contains mantids?','Mantids belong to Mantodea.',['Mantophasmatodea','Mecoptera','Orthoptera']],

['Ephemeroptera','What order do mayflies belong to?','Mayflies belong to Ephemeroptera.',['Plecoptera','Trichoptera','Odonata']],
['Ephemeroptera','Which order has adults that usually have two or three long tail filaments and very short antennae?','These are typical mayfly features, identifying Ephemeroptera.',['Plecoptera','Zygentoma','Neuroptera']],

['Trichoptera','What order do caddisflies belong to?','Caddisflies belong to Trichoptera.',['Lepidoptera','Plecoptera','Megaloptera']],
['Trichoptera','Which order can be distinguished from moths by having hairy rather than scaly wings?','Hair-covered wings are characteristic of Trichoptera.',['Lepidoptera','Neuroptera','Mecoptera']],

['Siphonaptera','Which order contains laterally flattened, wingless insects adapted for jumping?','Those features identify fleas in Siphonaptera.',['Psocodea','Thysanoptera','Diptera']],
['Siphonaptera','What order contains jumping ectoparasites of birds and mammals?','Fleas are jumping ectoparasites in Siphonaptera.',['Psocodea','Mecoptera','Hemiptera']],

['Blattodea','What order includes both cockroaches and termites?','Cockroaches and termites are classified in Blattodea.',['Orthoptera','Hymenoptera','Dermaptera']],
['Blattodea','Which order includes insects with flattened bodies, long antennae, and a large pronotum covering part of the head?','Those are common cockroach traits, identifying Blattodea.',['Coleoptera','Hemiptera','Orthoptera']],

['Plecoptera','What order do stoneflies belong to?','Stoneflies belong to Plecoptera.',['Ephemeroptera','Trichoptera','Megaloptera']],
['Plecoptera','Which order has aquatic nymphs that usually have two tail filaments?','Stonefly nymphs in Plecoptera usually have two cerci.',['Ephemeroptera','Odonata','Trichoptera']],

['Embioptera','What order includes webspinners?','Webspinners belong to Embioptera.',['Trichoptera','Zoraptera','Psocodea']],
['Embioptera','Which order lives in silk tunnels and produces silk using the front legs?','Webspinners in Embioptera make silk with glands in their front tarsi.',['Trichoptera','Thysanoptera','Zoraptera']],

['Orthoptera','What order do crickets and grasshoppers belong to?','Crickets and grasshoppers belong to Orthoptera.',['Phasmatodea','Mantodea','Dermaptera']],
['Orthoptera','Which order commonly has enlarged hind femora adapted for jumping?','Large jumping hind legs are characteristic of Orthoptera.',['Mantodea','Hemiptera','Blattodea']],

['Phasmatodea','What order do stick insects belong to?','Stick insects belong to Phasmatodea.',['Mantodea','Orthoptera','Mantophasmatodea']],
['Phasmatodea','Which order is known for camouflage that makes insects resemble twigs or leaves?','Twig and leaf mimicry is characteristic of Phasmatodea.',['Mantodea','Orthoptera','Embioptera']],

['Psocodea','What order includes lice?','Parasitic lice are included in Psocodea.',['Siphonaptera','Thysanoptera','Hemiptera']],
['Psocodea','Which order contains booklice and barklice?','Booklice and barklice belong to Psocodea.',['Zoraptera','Embioptera','Thysanoptera']],

['Megaloptera','What order do dobsonflies belong to?','Dobsonflies belong to Megaloptera.',['Neuroptera','Raphidioptera','Trichoptera']],
['Megaloptera','Which order includes large aquatic larvae called hellgrammites?','Hellgrammites are larval dobsonflies in Megaloptera.',['Plecoptera','Odonata','Neuroptera']],

['Raphidioptera','What order do snakeflies belong to?','Snakeflies belong to Raphidioptera.',['Mecoptera','Neuroptera','Megaloptera']],
['Raphidioptera','Which order is recognized by a long prothorax that gives the insect a neck-like appearance?','The long prothorax is characteristic of Raphidioptera.',['Mecoptera','Neuroptera','Mantodea']],

['Coleoptera','What order includes beetles?','Beetles belong to Coleoptera.',['Hemiptera','Orthoptera','Neuroptera']],
['Coleoptera','Which order has hardened forewings that protect the hindwings underneath?','Hardened forewings called elytra identify Coleoptera.',['Hemiptera','Dermaptera','Orthoptera']],

['Strepsiptera','What order contains twisted-wing parasites?','Twisted-wing parasites belong to Strepsiptera.',['Siphonaptera','Mecoptera','Diptera']],
['Strepsiptera','Which order has males with large hindwings but reduced, club-like forewings?','That unusual wing arrangement identifies Strepsiptera.',['Diptera','Hymenoptera','Mecoptera']],

['Mecoptera','What order do scorpionflies belong to?','Scorpionflies belong to Mecoptera.',['Raphidioptera','Neuroptera','Megaloptera']],
['Mecoptera','Which order commonly has an elongated, beak-like head?','The elongated rostrum is characteristic of Mecoptera.',['Diptera','Neuroptera','Raphidioptera']],

['Diptera','What order do true flies belong to?','True flies belong to Diptera.',['Hymenoptera','Lepidoptera','Mecoptera']],
['Diptera','Which order has halteres instead of a second functional pair of wings?','Halteres are characteristic of Diptera.',['Strepsiptera','Hymenoptera','Neuroptera']],

['Lepidoptera','What order contains butterflies and moths?','Butterflies and moths belong to Lepidoptera.',['Trichoptera','Diptera','Neuroptera']],
['Lepidoptera','Which order has adults with wings covered in overlapping scales?','Scaled wings are characteristic of Lepidoptera.',['Trichoptera','Neuroptera','Hymenoptera']],

['Hymenoptera','What order do ants and wasps belong to?','Ants and wasps belong to Hymenoptera.',['Diptera','Coleoptera','Hemiptera']],
['Hymenoptera','Which order includes bees, ants, wasps, and sawflies?','These insects belong to Hymenoptera.',['Diptera','Blattodea','Neuroptera']],

['Zoraptera','What order do angel insects belong to?','Angel insects belong to Zoraptera.',['Embioptera','Psocodea','Mantophasmatodea']],
['Zoraptera','Which order contains tiny insects often found under bark or in rotting wood?','Zorapterans are small insects commonly associated with decaying wood.',['Psocodea','Embioptera','Blattodea']],

['Thysanoptera','What order do thrips belong to?','Thrips belong to Thysanoptera.',['Psocodea','Trichoptera','Hemiptera']],
['Thysanoptera','Which order has tiny insects with narrow, fringed wings?','Fringed wings are characteristic of Thysanoptera.',['Trichoptera','Diptera','Psocodea']],

['Hemiptera','What order includes true bugs, aphids, cicadas, and leafhoppers?','These insects belong to Hemiptera.',['Coleoptera','Orthoptera','Hymenoptera']],
['Hemiptera','Which order is characterized by piercing-sucking mouthparts?','Piercing-sucking mouthparts are characteristic of Hemiptera.',['Coleoptera','Neuroptera','Orthoptera']],

['Neuroptera','What order do lacewings belong to?','Lacewings belong to Neuroptera.',['Megaloptera','Raphidioptera','Trichoptera']],
['Neuroptera','Which order includes insects with two similar pairs of highly net-veined wings?','Net-veined wings are characteristic of Neuroptera.',['Megaloptera','Odonata','Mecoptera']],

['Zygentoma','What order do silverfish belong to?','Silverfish belong to Zygentoma.',['Archaeognatha','Psocodea','Zoraptera']],
['Zygentoma','Which order has flattened, wingless insects with three tail filaments and a carrot-shaped body?','That body shape is characteristic of Zygentoma.',['Archaeognatha','Ephemeroptera','Dermaptera']]

['Archaeognatha','Which order is wingless, humped, has three tail filaments, and can jump?','The humped jumping bristletails are Archaeognatha.',['Zygentoma','Grylloblattodea','Zoraptera']],
['Archaeognatha','Which order has large eyes, a humped body, and a middle tail filament longer than the other two?','Archaeognatha are jumping bristletails; the humped body and long median filament separate them from silverfish.',['Zygentoma','Dermaptera','Plecoptera']],

['Odonata','Which order has a long abdomen, large compound eyes, and two pairs of long transparent wings?','Dragonflies and damselflies are Odonata.',['Neuroptera','Ephemeroptera','Megaloptera']],
['Odonata','What order do dragonflies and damselflies belong to?','Dragonflies and damselflies belong to Odonata.',['Ephemeroptera','Plecoptera','Trichoptera']],

['Grylloblattodea','Which order contains wingless insects that live on snow and ice in cold mountain habitats?','Extreme cold association is the signature clue for Grylloblattodea, the ice crawlers.',['Mantophasmatodea','Zoraptera','Orthoptera']],
['Grylloblattodea','What order do rock crawlers and ice crawlers belong to?','Rock crawlers / ice crawlers are Grylloblattodea.',['Mantophasmatodea','Archaeognatha','Blattodea']],

['Mantophasmatodea','Which order contains wingless predators that resemble a mix between a mantis and a walking stick?','That combination describes Mantophasmatodea, the heelwalkers/gladiators.',['Mantodea','Phasmatodea','Grylloblattodea']],
['Mantophasmatodea','What order are heelwalkers or gladiators in?','Heelwalkers are Mantophasmatodea.',['Grylloblattodea','Mantodea','Embioptera']],

['Dermaptera','Which order has forceps-like cerci at the end of the abdomen?','Rear forceps-like cerci are the classic Dermaptera character.',['Orthoptera','Plecoptera','Blattodea']],
['Dermaptera','What order do earwigs belong to?','Earwigs are Dermaptera.',['Embioptera','Zoraptera','Psocodea']],

['Mantodea','Which order has enlarged, spined forelegs used for catching prey?','Raptorial praying forelegs identify Mantodea.',['Mantophasmatodea','Orthoptera','Phasmatodea']],
['Mantodea','What order do praying mantises belong to?','Mantises are Mantodea.',['Mantophasmatodea','Mecoptera','Neuroptera']],

['Ephemeroptera','Which order has upright triangular wings and two or three long tail filaments?','Upright wings plus long tails identify Ephemeroptera.',['Plecoptera','Zygentoma','Odonata']],
['Ephemeroptera','What order is a mayfly in?','Mayflies are Ephemeroptera and characteristically hold the wings upright.',['Plecoptera','Trichoptera','Neuroptera']],

['Trichoptera','Which order has moth-like adults with hairy wings held tent-like over the body?','Hairy, tented wings distinguish Trichoptera from scaly Lepidoptera.',['Lepidoptera','Plecoptera','Mecoptera']],
['Trichoptera','Which order has aquatic larvae that often build cases from sand or plant material?','Case-building aquatic larvae are a classic caddisfly clue: Trichoptera.',['Lepidoptera','Megaloptera','Ephemeroptera']],

['Siphonaptera','Which order contains wingless parasites that are flattened side-to-side and have large jumping legs?','Laterally compressed jumping ectoparasites are fleas, Siphonaptera.',['Psocodea','Thysanoptera','Zygentoma']],
['Siphonaptera','What order do fleas belong to?','Fleas are retained as Siphonaptera on your list.',['Mecoptera','Psocodea','Diptera']],

['Blattodea','What order do termites belong to?','Termites are included in Blattodea with cockroaches.',['Hymenoptera','Psocodea','Zoraptera']],
['Blattodea','Which order has flattened, oval insects with long antennae and a shield-like pronotum?','Cockroaches are Blattodea.',['Dermaptera','Orthoptera','Hemiptera']],

['Plecoptera','Which order has two tail filaments and wings folded flat over the abdomen?','Two tails plus flat-folded wings is the stonefly pattern: Plecoptera.',['Ephemeroptera','Trichoptera','Neuroptera']],
['Plecoptera','What order do stoneflies belong to?','That is Plecoptera, not Ephemeroptera.',['Ephemeroptera','Megaloptera','Raphidioptera']],

['Embioptera','Which order produces silk from enlarged glands in its front feet?','Silk-producing front tarsi are diagnostic for Embioptera.',['Zoraptera','Psocodea','Trichoptera']],
['Embioptera','What order do webspinners belong to?','Webspinners are Embioptera.',['Trichoptera','Thysanoptera','Neuroptera']],

['Orthoptera','Which order has enlarged hind legs for jumping and often produces sounds by stridulation?','Grasshoppers and crickets are Orthoptera.',['Mantodea','Dermaptera','Phasmatodea']],
['Orthoptera','What order includes grasshoppers, crickets, locusts, and katydids?','These familiar jumping insects are Orthoptera.',['Phasmatodea','Hemiptera','Blattodea']],

['Phasmatodea','Which order contains insects that closely resemble sticks or leaves?','Extreme stick/leaf mimicry identifies Phasmatodea.',['Mantophasmatodea','Mantodea','Orthoptera']],
['Phasmatodea','What order do walking sticks and leaf insects belong to?','Stick and leaf insects are Phasmatodea.',['Mantodea','Mantophasmatodea','Embioptera']],

['Psocodea','Which order includes wingless parasitic lice that cling to hair or feathers?','Parasitic lice are included in Psocodea.',['Siphonaptera','Thysanoptera','Zoraptera']],
['Psocodea','What order includes booklice, barklice, and parasitic lice?','They are grouped in Psocodea.',['Hemiptera','Siphonaptera','Embioptera']],

['Megaloptera','Which order includes dobsonflies, alderflies, and fishflies?','Dobsonflies, alderflies, and fishflies are Megaloptera.',['Neuroptera','Raphidioptera','Trichoptera']],
['Megaloptera','What order does a hellgrammite develop into?','Hellgrammites are larval dobsonflies in Megaloptera.',['Plecoptera','Neuroptera','Odonata']],

['Raphidioptera','Which order has an elongated prothorax that gives the insect a long, neck-like appearance?','The long neck is the giveaway for Raphidioptera.',['Neuroptera','Megaloptera','Mecoptera']],
['Raphidioptera','What order do snakeflies belong to?','Snakeflies are Raphidioptera.',['Mecoptera','Neuroptera','Megaloptera']],

['Coleoptera','Which order has hardened forewings called elytra?','Elytra are the defining visual shortcut for Coleoptera.',['Hemiptera','Dermaptera','Orthoptera']],
['Coleoptera','What order do beetles belong to?','Beetles are Coleoptera.',['Hemiptera','Neuroptera','Hymenoptera']],

['Strepsiptera','Which order has males with small forewings and large fan-shaped hindwings?','Reduced forewings plus large hindwings are characteristic of male Strepsiptera.',['Diptera','Siphonaptera','Hymenoptera']],
['Strepsiptera','Which order contains twisted-wing parasites?','Twisted-wing parasites are Strepsiptera.',['Siphonaptera','Psocodea','Mecoptera']],

['Mecoptera','Which order has a long beak-like rostrum and, in males, a scorpion-like abdominal tip?','That combination is the classic scorpionfly, Mecoptera.',['Raphidioptera','Megaloptera','Diptera']],
['Mecoptera','What order do scorpionflies and hangingflies belong to?','They are Mecoptera.',['Raphidioptera','Siphonaptera','Neuroptera']],

['Diptera','Which order has one pair of functional wings and a pair of halteres?','One wing pair plus halteres identifies Diptera.',['Hymenoptera','Lepidoptera','Strepsiptera']],
['Diptera','What order includes mosquitoes, house flies, gnats, and midges?','True flies and mosquitoes are Diptera.',['Hymenoptera','Mecoptera','Neuroptera']],

['Lepidoptera','Which order has wings covered in scales and a caterpillar larval stage?','Scaly wings and caterpillars indicate Lepidoptera.',['Trichoptera','Neuroptera','Hymenoptera']],
['Lepidoptera','What order do butterflies and moths belong to?','Butterflies and moths are Lepidoptera.',['Trichoptera','Diptera','Mecoptera']],

['Hymenoptera','What order do bees belong to?','Bees belong to Hymenoptera.',['Diptera','Lepidoptera','Hemiptera']],
['Hymenoptera','What order includes ants, bees, wasps, hornets, and sawflies?','Those groups are Hymenoptera.',['Blattodea','Coleoptera','Diptera']],

['Zoraptera','Which order contains tiny, soft-bodied insects that live under bark or in decaying wood and can occur in winged or wingless forms?','That rare combination describes Zoraptera.',['Psocodea','Blattodea','Grylloblattodea']],
['Zoraptera','What order do angel insects belong to?','Angel insects / zorapterans are Zoraptera.',['Embioptera','Mantophasmatodea','Psocodea']],

['Thysanoptera','Which order has very narrow wings edged with long hairs?','Narrow fringed wings identify Thysanoptera.',['Trichoptera','Psocodea','Diptera']],
['Thysanoptera','What order do thrips belong to?','Thrips are Thysanoptera.',['Trichoptera','Hemiptera','Psocodea']],

['Hemiptera','Which order has piercing-sucking mouthparts forming a beak or rostrum?','Piercing-sucking rostrum plus those common names indicates Hemiptera.',['Coleoptera','Hymenoptera','Orthoptera']],
['Hemiptera','What order do stink bugs and assassin bugs belong to?','True bugs such as stink bugs and assassin bugs are Hemiptera.',['Coleoptera','Dermaptera','Neuroptera']],

['Neuroptera','Which order has two pairs of transparent wings with many fine veins?','Delicate net-veined wings are characteristic of Neuroptera.',['Megaloptera','Raphidioptera','Odonata']],
['Neuroptera','What order includes lacewings, antlions, and owlflies?','Those groups make up Neuroptera.',['Megaloptera','Raphidioptera','Mecoptera']],

['Zygentoma','Which order is wingless, flattened, and carrot-shaped with three long tail filaments?','That is the silverfish body plan: Zygentoma.',['Archaeognatha','Plecoptera','Dermaptera']],
['Zygentoma','What order do silverfish and firebrats belong to?','Silverfish are Zygentoma (formerly grouped under Thysanura).',['Archaeognatha','Psocodea','Zoraptera']]
];