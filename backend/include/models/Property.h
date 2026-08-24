#pragma once

#include <string>
#include <vector>
#include <sstream>
#include <iomanip>

namespace rental {

/**
 * Property domain model representing a subdivision rental property listing.
 */
struct Property {
    std::string id;
    std::string ownerId;
    std::string title;
    std::string description;
    std::string houseNumber;
    std::string location;
    std::string imageUrl;
    std::vector<std::string> images;
    double rating = 0.0;
    int bedrooms = 1;
    int bathrooms = 1;
    int maxGuests = 1;
    double pricePerNight = 0.0;
    std::vector<std::string> amenities;
    std::vector<std::string> houseRules;
    std::string status = "available";
    std::string createdAt;
    std::string updatedAt;

    /**
     * Converts Property instance to a clean JSON string representation.
     */
    std::string toJson() const {
        std::ostringstream ss;
        ss << "{\n";
        ss << "  \"id\": \"" << escapeJson(id) << "\",\n";
        ss << "  \"owner_id\": \"" << escapeJson(ownerId) << "\",\n";
        ss << "  \"title\": \"" << escapeJson(title) << "\",\n";
        ss << "  \"description\": \"" << escapeJson(description) << "\",\n";
        ss << "  \"house_number\": \"" << escapeJson(houseNumber) << "\",\n";
        ss << "  \"location\": \"" << escapeJson(location) << "\",\n";
        ss << "  \"image_url\": \"" << escapeJson(imageUrl) << "\",\n";

        // images array
        ss << "  \"images\": [";
        for (size_t i = 0; i < images.size(); ++i) {
            ss << "\"" << escapeJson(images[i]) << "\"";
            if (i + 1 < images.size()) ss << ", ";
        }
        ss << "],\n";

        ss << std::fixed << std::setprecision(1);
        ss << "  \"rating\": " << rating << ",\n";
        ss << "  \"bedrooms\": " << bedrooms << ",\n";
        ss << "  \"bathrooms\": " << bathrooms << ",\n";
        ss << "  \"max_guests\": " << maxGuests << ",\n";
        ss << std::fixed << std::setprecision(2);
        ss << "  \"price_per_night\": " << pricePerNight << ",\n";

        // amenities array
        ss << "  \"amenities\": [";
        for (size_t i = 0; i < amenities.size(); ++i) {
            ss << "\"" << escapeJson(amenities[i]) << "\"";
            if (i + 1 < amenities.size()) ss << ", ";
        }
        ss << "],\n";

        // house_rules array
        ss << "  \"house_rules\": [";
        for (size_t i = 0; i < houseRules.size(); ++i) {
            ss << "\"" << escapeJson(houseRules[i]) << "\"";
            if (i + 1 < houseRules.size()) ss << ", ";
        }
        ss << "],\n";

        ss << "  \"status\": \"" << escapeJson(status) << "\",\n";
        ss << "  \"created_at\": \"" << escapeJson(createdAt) << "\",\n";
        ss << "  \"updated_at\": \"" << escapeJson(updatedAt) << "\"\n";
        ss << "}";
        return ss.str();
    }

private:
    static std::string escapeJson(const std::string& input) {
        std::ostringstream ss;
        for (char c : input) {
            switch (c) {
                case '"': ss << "\\\""; break;
                case '\\': ss << "\\\\"; break;
                case '\b': ss << "\\b"; break;
                case '\f': ss << "\\f"; break;
                case '\n': ss << "\\n"; break;
                case '\r': ss << "\\r"; break;
                case '\t': ss << "\\t"; break;
                default:
                    if (static_cast<unsigned char>(c) < 0x20) {
                        ss << "\\u" << std::hex << std::setw(4) << std::setfill('0') << static_cast<int>(c);
                    } else {
                        ss << c;
                    }
            }
        }
        return ss.str();
    }
};

} // namespace rental
