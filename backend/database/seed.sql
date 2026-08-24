-- ============================================================
-- Seed data for SubdivisionStay properties
-- ============================================================

INSERT INTO properties (
    id, owner_id, title, description,
    house_number, location, image_url,
    rating, bedrooms, bathrooms, max_guests, price_per_night,
    status
) VALUES
(
    '1',
    '00000000-0000-0000-0000-000000000002',
    'Modern Corner House with Garden',
    'Nestled on a prime corner lot in the heart of Greenfield Estates, this modern four-bedroom home offers the perfect blend of comfort and style. The open-plan living area flows seamlessly to a landscaped garden.',
    'Block 4, Lot 12',
    'Block 4, Greenfield Estates',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
    4.9, 4, 3, 8, 4500.00, 'available'
),
(
    '2',
    '00000000-0000-0000-0000-000000000002',
    'Cozy Bungalow Near Clubhouse',
    'Wake up just steps away from the Sunrise Village clubhouse, swimming pool, and jogging path. This well-maintained bungalow is designed for easy, relaxed living.',
    'Block 7, Lot 5',
    'Block 7, Sunrise Village',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop',
    4.7, 3, 2, 6, 3200.00, 'available'
),
(
    '3',
    '00000000-0000-0000-0000-000000000003',
    'Spacious Family Home with Pool',
    'The ultimate family retreat in Palm Ridge — a sprawling five-bedroom residence with a private pool, spacious living and dining areas, and a gourmet kitchen built for big gatherings.',
    'Block 2, Lot 8',
    'Block 2, Palm Ridge Subdivision',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
    4.8, 5, 4, 10, 6800.00, 'available'
),
(
    '4',
    '00000000-0000-0000-0000-000000000003',
    'Minimalist Townhouse with Parking',
    'Clean lines and a calm palette define this elegant townhouse in Serene Heights. Three bedrooms across two floors with a private courtyard and dedicated parking.',
    'Block 11, Lot 3',
    'Block 11, Serene Heights',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop',
    4.6, 3, 2, 5, 2800.00, 'available'
),
(
    '5',
    '00000000-0000-0000-0000-000000000004',
    'Luxury Villa with Lanai & Pool',
    'Expansive indoor-outdoor living anchored by a covered lanai overlooking a private swimming pool and fully enclosed garden. Features four master suites and chef kitchen.',
    'Block 3, Lot 1',
    'Block 3, Lakeview Residences',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop',
    5.0, 4, 3, 9, 5800.00, 'available'
),
(
    '6',
    '00000000-0000-0000-0000-000000000004',
    'Rustic Contemporary Subdivision Home',
    'Warm timber accents meet sleek modern finishes in this welcoming home in Pine Valley. Open layout with cathedral ceilings, natural stone kitchen counters, and large patio.',
    'Block 8, Lot 9',
    'Block 8, Pine Valley',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
    4.8, 3, 2, 6, 3900.00, 'available'
),
(
    '7',
    '00000000-0000-0000-0000-000000000002',
    'Charming Studio Loft',
    'Perfect for couples, remote workers, or solo travelers. Open-plan living with a queen-sized loft bed, compact kitchen, and floor-to-ceiling windows flooding the space with light.',
    'Block 9, Lot 2',
    'Block 9, The Enclave',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop',
    4.5, 1, 1, 2, 1500.00, 'available'
),
(
    '8',
    '00000000-0000-0000-0000-000000000004',
    'Executive Single-Family Residence',
    'An executive home in Oakridge Park featuring high ceilings, formal dining room, private office, master bedroom with balcony, and a 2-car garage in a secure gated community.',
    'Block 1, Lot 4',
    'Block 1, Oakridge Park',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop',
    4.9, 4, 3, 8, 5200.00, 'available'
);
