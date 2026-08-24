#include "repositories/PropertyRepository.h"
#include <algorithm>
#include <cctype>

namespace rental {

namespace {
    std::string toLower(const std::string& str) {
        std::string res = str;
        std::transform(res.begin(), res.end(), res.begin(), [](unsigned char c) {
            return std::tolower(c);
        });
        return res;
    }
}

PropertyRepository::PropertyRepository() {
    initSeedData();
}

std::vector<Property> PropertyRepository::findAll(const std::string& locationFilter, int guestFilter) {
    if (locationFilter.empty() && guestFilter <= 0) {
        return properties_;
    }

    std::vector<Property> filtered;
    std::string locLower = toLower(locationFilter);

    for (const auto& p : properties_) {
        bool matchesLocation = true;
        if (!locationFilter.empty()) {
            std::string pLocLower = toLower(p.location);
            matchesLocation = (pLocLower.find(locLower) != std::string::npos);
        }

        bool matchesGuests = true;
        if (guestFilter > 0) {
            matchesGuests = (p.maxGuests >= guestFilter);
        }

        if (matchesLocation && matchesGuests) {
            filtered.push_back(p);
        }
    }

    return filtered;
}

std::optional<Property> PropertyRepository::findById(const std::string& id) {
    for (const auto& p : properties_) {
        if (p.id == id) {
            return p;
        }
    }
    return std::nullopt;
}

bool PropertyRepository::create(const Property& property) {
    properties_.push_back(property);
    return true;
}

void PropertyRepository::initSeedData() {
    properties_ = {
        {
            "1",
            "00000000-0000-0000-0000-000000000002",
            "Modern Corner House with Garden",
            "Nestled on a prime corner lot in the heart of Greenfield Estates, this modern four-bedroom home offers the perfect blend of comfort and style. The open-plan living area flows seamlessly to a landscaped garden — ideal for morning coffee or evening gatherings. Fully furnished with contemporary pieces, high-speed Wi-Fi, and a fully equipped kitchen, everything you need is already here.",
            "Block 4, Lot 12",
            "Block 4, Greenfield Estates",
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop",
            {
                "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop"
            },
            4.9,
            4,
            3,
            8,
            4500.00,
            {
                "Free Wi-Fi", "Air conditioning", "Fully equipped kitchen", "Smart TV",
                "Washing machine", "Private garden", "Covered parking (2 cars)",
                "CCTV security", "Back-up generator", "BBQ grill"
            },
            {
                "Check-in after 2:00 PM", "Check-out before 12:00 PM",
                "No smoking inside the property", "No parties or events",
                "Pets not allowed", "Quiet hours: 10:00 PM - 7:00 AM"
            },
            "available",
            "2025-01-20T10:00:00Z",
            "2025-01-20T10:00:00Z"
        },
        {
            "2",
            "00000000-0000-0000-0000-000000000002",
            "Cozy Bungalow Near Clubhouse",
            "Wake up just steps away from the Sunrise Village clubhouse, swimming pool, and jogging path. This well-maintained bungalow is designed for easy, relaxed living — bright interiors, cheerful décor, and a covered patio perfect for al fresco breakfasts.",
            "Block 7, Lot 5",
            "Block 7, Sunrise Village",
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop",
            {
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop"
            },
            4.7,
            3,
            2,
            6,
            3200.00,
            {
                "Free Wi-Fi", "Air conditioning", "Fully equipped kitchen", "Smart TV",
                "Washing machine", "Covered patio", "Parking (1 car)",
                "Clubhouse access", "Swimming pool access", "Jogging path access"
            },
            {
                "Check-in after 2:00 PM", "Check-out before 12:00 PM",
                "No smoking inside the property", "No parties or events",
                "Pets allowed (small dogs only)", "Quiet hours: 10:00 PM - 7:00 AM"
            },
            "available",
            "2025-01-22T11:00:00Z",
            "2025-01-22T11:00:00Z"
        },
        {
            "3",
            "00000000-0000-0000-0000-000000000003",
            "Spacious Family Home with Pool",
            "The ultimate family retreat in Palm Ridge — a sprawling five-bedroom residence with a private pool, spacious living and dining areas, and a gourmet kitchen built for big gatherings. Each bedroom has its own en-suite bathroom.",
            "Block 2, Lot 8",
            "Block 2, Palm Ridge Subdivision",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
            {
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&auto=format&fit=crop"
            },
            4.8,
            5,
            4,
            10,
            6800.00,
            {
                "Free Wi-Fi", "Air conditioning (all rooms)", "Private swimming pool",
                "Gourmet kitchen", "Smart TV", "Washing machine & dryer",
                "Covered parking (3 cars)", "BBQ grill"
            },
            {
                "Check-in after 3:00 PM", "Check-out before 12:00 PM",
                "No smoking inside", "Quiet hours: 10:00 PM - 8:00 AM",
                "Maximum 10 guests"
            },
            "available",
            "2025-01-28T14:00:00Z",
            "2025-01-28T14:00:00Z"
        },
        {
            "4",
            "00000000-0000-0000-0000-000000000003",
            "Minimalist Townhouse with Parking",
            "Clean lines and a calm palette define this elegant townhouse in Serene Heights. Three bedrooms across two floors with a private courtyard, dedicated parking, and fast fiber broadband.",
            "Block 11, Lot 3",
            "Block 11, Serene Heights",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
            {
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&auto=format&fit=crop"
            },
            4.6,
            3,
            2,
            5,
            2800.00,
            {
                "Free Wi-Fi (Fiber)", "Air conditioning", "Kitchenette", "Smart TV",
                "Private courtyard", "Dedicated parking (1 car)", "CCTV security"
            },
            {
                "Check-in after 2:00 PM", "Check-out before 11:00 AM",
                "No smoking inside", "Quiet hours: 10:00 PM - 7:00 AM"
            },
            "available",
            "2025-02-01T08:00:00Z",
            "2025-02-01T08:00:00Z"
        },
        {
            "5",
            "00000000-0000-0000-0000-000000000004",
            "Luxury Villa with Lanai & Pool",
            "Expansive indoor-outdoor living anchored by a covered lanai overlooking a private swimming pool and fully enclosed garden. Features four master suites and chef kitchen.",
            "Block 3, Lot 1",
            "Block 3, Lakeview Residences",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
            {
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop"
            },
            5.0,
            4,
            3,
            9,
            5800.00,
            {
                "Free Wi-Fi", "Air conditioning", "Private swimming pool", "Covered lanai",
                "Chef kitchen", "Smart TV", "Parking (2 cars)", "BBQ area"
            },
            {
                "Check-in after 3:00 PM", "Check-out before 12:00 PM",
                "No smoking inside", "Pets allowed with prior notice"
            },
            "available",
            "2025-02-03T10:00:00Z",
            "2025-02-03T10:00:00Z"
        },
        {
            "6",
            "00000000-0000-0000-0000-000000000004",
            "Rustic Contemporary Subdivision Home",
            "Warm timber accents meet sleek modern finishes in this welcoming home in Pine Valley. Open layout with cathedral ceilings, natural stone kitchen counters, and large patio.",
            "Block 8, Lot 9",
            "Block 8, Pine Valley",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
            {
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop"
            },
            4.8,
            3,
            2,
            6,
            3900.00,
            {
                "Free Wi-Fi", "Air conditioning", "Fully equipped kitchen", "Smart TV",
                "Covered porch", "Parking (1 car)", "Garden view"
            },
            {
                "Check-in after 2:00 PM", "Check-out before 12:00 PM",
                "No smoking indoors", "Quiet hours: 10:00 PM - 7:00 AM"
            },
            "available",
            "2025-02-05T09:00:00Z",
            "2025-02-05T09:00:00Z"
        },
        {
            "7",
            "00000000-0000-0000-0000-000000000002",
            "Charming Studio Loft",
            "Perfect for couples, remote workers, or solo travelers. Open-plan living with a queen-sized loft bed, compact kitchen, and floor-to-ceiling windows flooding the space with light.",
            "Block 9, Lot 2",
            "Block 9, The Enclave",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
            {
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop"
            },
            4.5,
            1,
            1,
            2,
            1500.00,
            {
                "Free Wi-Fi", "Air conditioning", "Compact kitchen", "Smart TV",
                "Work desk", "Parking (1 motorcycle/car)"
            },
            {
                "Check-in after 2:00 PM", "Check-out before 12:00 PM",
                "No smoking inside", "No parties"
            },
            "available",
            "2025-02-07T11:00:00Z",
            "2025-02-07T11:00:00Z"
        },
        {
            "8",
            "00000000-0000-0000-0000-000000000004",
            "Executive Single-Family Residence",
            "An executive home in Oakridge Park featuring high ceilings, formal dining room, private office, master bedroom with balcony, and a 2-car garage in a secure gated community.",
            "Block 1, Lot 4",
            "Block 1, Oakridge Park",
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop",
            {
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop"
            },
            4.9,
            4,
            3,
            8,
            5200.00,
            {
                "Free Wi-Fi", "Air conditioning (all rooms)", "Gourmet kitchen",
                "Smart TV", "Home office desk", "Balcony", "2-Car garage",
                "Gated community security"
            },
            {
                "Check-in after 2:00 PM", "Check-out before 12:00 PM",
                "No smoking indoors", "Quiet hours: 10:00 PM - 7:00 AM"
            },
            "available",
            "2025-02-10T10:00:00Z",
            "2025-02-10T10:00:00Z"
        }
    };
}

} // namespace rental
