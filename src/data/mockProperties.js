/**
 * Mock property data for UI development.
 * Replace this file's consumption via propertyService.js when the C++ backend is ready.
 *
 * Each property matches the shape the PropertyCard component expects:
 * { id, title, location, image, rating, bedrooms, bathrooms, maxGuests, pricePerNight }
 */

const mockProperties = [
  {
    id: 1,
    title: "Modern Corner House with Garden",
    location: "Block 4, Greenfield Estates",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop",
    rating: 4.9,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    pricePerNight: 4500,
  },
  {
    id: 2,
    title: "Cozy Bungalow Near Clubhouse",
    location: "Block 7, Sunrise Village",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop",
    rating: 4.7,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricePerNight: 3200,
  },
  {
    id: 3,
    title: "Spacious Family Home with Pool",
    location: "Block 2, Palm Ridge Subdivision",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    rating: 4.8,
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    pricePerNight: 6800,
  },
  {
    id: 4,
    title: "Minimalist Townhouse with Parking",
    location: "Block 11, Serene Heights",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&auto=format&fit=crop",
    rating: 4.6,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    pricePerNight: 2800,
  },
  {
    id: 5,
    title: "Elegant Two-Storey House",
    location: "Block 1, Crestview Homes",
    image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&auto=format&fit=crop",
    rating: 5.0,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    pricePerNight: 5200,
  },
  {
    id: 6,
    title: "Charming Studio Loft",
    location: "Block 9, The Enclave",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    rating: 4.5,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricePerNight: 1500,
  },
  {
    id: 7,
    title: "Corner Lot Villa with Lanai",
    location: "Block 3, Lakeview Residences",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
    rating: 4.8,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 9,
    pricePerNight: 5800,
  },
  {
    id: 8,
    title: "Quiet Garden Cottage",
    location: "Block 6, Verdana Suites",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&auto=format&fit=crop",
    rating: 4.7,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    pricePerNight: 2200,
  },
];

export default mockProperties;
