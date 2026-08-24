#pragma once

#include "repositories/PropertyRepository.h"
#include "models/Property.h"
#include <vector>
#include <optional>
#include <string>
#include <memory>

namespace rental {

class PropertyService {
public:
    explicit PropertyService(std::shared_ptr<PropertyRepository> repository);

    std::vector<Property> getAllProperties(const std::string& location = "", int guests = 0);
    std::optional<Property> getPropertyById(const std::string& id);
    bool addProperty(const Property& property);

private:
    std::shared_ptr<PropertyRepository> repository_;
};

} // namespace rental
