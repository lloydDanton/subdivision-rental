/**
 * propertyService.js — Data access abstraction layer
 *
 * All components source their property data through this service.
 * When the C++ backend is ready, replace the mock imports below with
 * real fetch() / axios calls to your API endpoints. No component files
 * need to change — only this file.
 *
 * Future API swap example:
 *   export async function getAllProperties() {
 *     const res = await fetch('/api/properties');
 *     if (!res.ok) throw new Error('Failed to fetch properties');
 *     return res.json();
 *   }
 */

import mockProperties from '../data/mockProperties';

/**
 * Returns all available properties.
 * @returns {Promise<Array>} Array of property objects
 */
export async function getAllProperties() {
  // Simulate a short network delay so the UI can show loading states
  // even while running on mock data. Remove when wired to a real API.
  await delay(400);
  return [...mockProperties];
}

/**
 * Returns a single property by ID.
 * @param {number|string} id
 * @returns {Promise<Object|null>} Property object or null if not found
 */
export async function getPropertyById(id) {
  await delay(300);
  const property = mockProperties.find((p) => p.id === Number(id));
  return property ?? null;
}

/**
 * Returns properties filtered by search parameters.
 * @param {{ location?: string, checkIn?: string, checkOut?: string, guests?: number }} params
 * @returns {Promise<Array>} Filtered array of property objects
 */
export async function searchProperties({ location = '', guests = 0 } = {}) {
  await delay(400);

  return mockProperties.filter((p) => {
    const matchesLocation = location
      ? p.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchesGuests = guests > 0 ? p.maxGuests >= guests : true;
    return matchesLocation && matchesGuests;
  });
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
