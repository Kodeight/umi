/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Review } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Omakase Course "KIWAMI"',
    japaneseName: '極み・おまかせ',
    description: 'A 20-course sensory journey curated daily by the Executive Chef. Features rare seasonal seafood flown in from Toyosu Market, premium aged sushimeshi, and masterfully paired sake flights.',
    price: '$350 per guest',
    ingredients: ['Bluefin O-Toro', 'Hokkaido Sea Urchin', 'Smoked Shima-Aji', 'A5 Miyazaki Wagyu'],
    category: 'omakase',
  },
  {
    id: 'm2',
    name: 'Charcoal Roasted A5 Wagyu',
    japaneseName: 'A5宮崎和牛炭火焼',
    description: 'Premium A5 grade Miyazaki Wagyu beef lightly seared over authentic binchotan charcoal, glazed with 25-year aged sweet soy tare and served with fresh grated fresh wasabi.',
    price: '$95',
    ingredients: ['Miyazaki Beef', 'Binchotan Ash', 'Fresh Wasabi Root', 'Black Truffle Shavings'],
    category: 'signature',
  },
  {
    id: 'm3',
    name: 'Wild Bluefin Caviar Nigiri',
    japaneseName: '大トロとキャビアの握り',
    description: 'Slightly torched fatty tuna belly (O-Toro) topped with premium imperial Oscietra caviar and a delicate brush of house nikiri soy sauce on warm, hand-shaped red vinegar rice.',
    price: '$45 per piece',
    ingredients: ['Aged O-Toro', 'Oscietra Caviar', 'Akazu Red Rice', 'Nikiri Glaze'],
    category: 'signature',
  },
  {
    id: 'm4',
    name: 'Uji Matcha Ceremony & Wagashi',
    japaneseName: '宇治抹茶・和菓子',
    description: 'An elegant finale featuring hand-whisked ceremonial grade Matcha sourced directly from organic tea farms in Uji, Kyoto, paired with a custom-crafted seasonal Wagashi confectionery.',
    price: '$30',
    ingredients: ['Ceremonial Matcha', 'Seasonal Sweet Bean Paste', 'Gold Leaf Accents'],
    category: 'essence',
  }
];

export const CRITIC_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'The Michelin Guide',
    designation: 'Three Michelin Stars',
    quote: 'UMI delivers an ethereal counter experience where time dissolves. Each piece of nigiri is a masterwork of temperature, texture, and ancient red-vinegar balance.',
    source: 'Michelin Guide Tokyo'
  },
  {
    id: 'r2',
    author: 'Chef Jacques Verron',
    designation: 'World Culinary Academy',
    quote: 'To sit at UMI’s black marble counter is to witness culinary theater at its most sacred. The chef’s precise knife work and quiet confidence are pure poetry.',
    source: 'The New York Times'
  },
  {
    id: 'r3',
    author: 'Hiroshi Tanaka',
    designation: 'Lead Gastronomy Critic',
    quote: 'A breathtaking marriage of traditional Edomae philosophy and modern presentation. UMI elevates seasonal dining into an emotional artistic journey.',
    source: 'Tokyo Food Review'
  }
];
