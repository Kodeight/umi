/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  tablePreference: 'Counter' | 'Private Room' | 'Window View';
  specialRequests?: string;
  confirmationCode: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  japaneseName: string;
  description: string;
  price?: string | number; // For Michelin-star Omakase, some prices can be custom or course-based
  ingredients?: string[];
  category: 'omakase' | 'signature' | 'essence';
}

export interface Review {
  id: string;
  author: string;
  designation: string;
  quote: string;
  source: string;
}
