#pragma once

#include "models/Property.h"
#include <vector>
#include <optional>
#include <string>
#include <memory>

namespace rental {

class PropertyRepository {
public:
    PropertyRepository();

    std::vector<Property> findAll(const std::string& locationFilter = "", int guestFilter = 0);
    std::optional<Property> findById(const std::string& id);
    bool create(const Property& property);

private:
    void initSeedData();
    std::vector<Property> properties_;
};

} // namespace rental
