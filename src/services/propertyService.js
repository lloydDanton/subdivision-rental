/**
 * propertyService.js — Data access service layer
 *
 * All components source their property data through this service.
 * Connects the React UI to the C++ REST API backend (Crow / Supabase).
 * Normalizes backend snake_case models to UI camelCase props so components
 * remain completely decoupled from backend naming conventions.
 */

import mockProperties from '../data/mockProperties.js';

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || '';

/**
 * Normalizes a raw property object from the backend/database
 * to the camelCase structure expected by React UI components.
 *
 * @param {Object} raw Raw property object
 * @returns {Object} Normalized property object
 */
export function normalizeProperty(raw) {
  if (!raw) return null;

  // Safely handle images array
  let images = [];
  if (Array.isArray(raw.images)) {
    images = raw.images;
  } else if (typeof raw.images === 'string') {
    try {
      images = JSON.parse(raw.images);
    } catch {
      images = [raw.images];
    }
  }

  const image = raw.image || raw.image_url || (images.length > 0 ? images[0] : '');
  if (images.length === 0 && image) {
    images = [image];
  }

  // Safely handle amenities array
  let amenities = [];
  if (Array.isArray(raw.amenities)) {
    amenities = raw.amenities;
  } else if (typeof raw.amenities === 'string') {
    try {
      amenities = JSON.parse(raw.amenities);
    } catch {
      amenities = raw.amenities.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }

  // Safely handle house rules array
  const rawRules = raw.houseRules ?? raw.house_rules;
  let houseRules = [];
  if (Array.isArray(rawRules)) {
    houseRules = rawRules;
  } else if (typeof rawRules === 'string') {
    try {
      houseRules = JSON.parse(rawRules);
    } catch {
      houseRules = rawRules.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }

  return {
    id: isNaN(Number(raw.id)) ? raw.id : Number(raw.id),
    rawId: String(raw.id),
    title: raw.title || '',
    description: raw.description || '',
    houseNumber: raw.house_number || raw.houseNumber || '',
    location: raw.location || '',
    image,
    images,
    rating: Number(raw.rating) || 0.0,
    bedrooms: Number(raw.bedrooms) || 1,
    bathrooms: Number(raw.bathrooms) || 1,
    maxGuests: Number(raw.max_guests ?? raw.maxGuests ?? 1),
    pricePerNight: Number(raw.price_per_night ?? raw.pricePerNight ?? 0),
    amenities,
    houseRules,
    status: raw.status || 'available',
  };
}

/**
 * Returns all available properties from the C++ REST API.
 * Falls back to seeded mock data if the API backend is unreachable.
 *
 * @returns {Promise<Array>} Array of normalized property objects
 */
export async function getAllProperties() {
  const endpoint = `${API_BASE_URL}/api/properties`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data.map(normalizeProperty) : [];
  } catch (err) {
    console.warn(`[propertyService] Could not reach API at ${endpoint} (${err.message}). Falling back to local data.`);
    await delay(300);
    return mockProperties.map(normalizeProperty);
  }
}

/**
 * Returns a single property by ID from the C++ REST API.
 *
 * @param {number|string} id Property ID (numeric or UUID)
 * @returns {Promise<Object|null>} Normalized property object or null if not found
 */
export async function getPropertyById(id) {
  if (!id) return null;

  const endpoint = `${API_BASE_URL}/api/properties/${encodeURIComponent(id)}`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    const data = await res.json();
    return normalizeProperty(data);
  } catch (err) {
    console.warn(`[propertyService] Could not reach API at ${endpoint} (${err.message}). Falling back to local data.`);
    await delay(200);
    const found = mockProperties.find((p) => String(p.id) === String(id));
    return found ? normalizeProperty(found) : null;
  }
}

/**
 * Returns properties filtered by search parameters.
 *
 * @param {{ location?: string, checkIn?: string, checkOut?: string, guests?: number }} params
 * @returns {Promise<Array>} Filtered array of normalized property objects
 */
export async function searchProperties({ location = '', guests = 0 } = {}) {
  const query = new URLSearchParams();
  if (location) query.set('location', location);
  if (guests > 0) query.set('guests', guests);

  const endpoint = `${API_BASE_URL}/api/properties${query.toString() ? `?${query.toString()}` : ''}`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data.map(normalizeProperty) : [];
  } catch (err) {
    console.warn(`[propertyService] Search API error (${err.message}). Falling back to local search.`);
    await delay(300);
    return mockProperties
      .filter((p) => {
        const matchesLocation = location
          ? p.location.toLowerCase().includes(location.toLowerCase())
          : true;
        const matchesGuests = guests > 0 ? p.maxGuests >= guests : true;
        return matchesLocation && matchesGuests;
      })
      .map(normalizeProperty);
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
