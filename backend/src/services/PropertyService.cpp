#include "services/PropertyService.h"

namespace rental {

PropertyService::PropertyService(std::shared_ptr<PropertyRepository> repository)
    : repository_(std::move(repository)) {}

std::vector<Property> PropertyService::getAllProperties(const std::string& location, int guests) {
    if (!repository_) return {};
    return repository_->findAll(location, guests);
}

std::optional<Property> PropertyService::getPropertyById(const std::string& id) {
    if (!repository_ || id.empty()) return std::nullopt;
    return repository_->findById(id);
}

bool PropertyService::addProperty(const Property& property) {
    if (!repository_ || property.title.empty() || property.pricePerNight < 0) {
        return false;
    }
    return repository_->create(property);
}

} // namespace rental
