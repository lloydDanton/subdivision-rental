#pragma once

#include "services/PropertyService.h"
#include <memory>
#include <string>
#include <utility>

namespace rental {

struct HttpResponse {
    int statusCode = 200;
    std::string contentType = "application/json";
    std::string body;
};

class PropertyController {
public:
    explicit PropertyController(std::shared_ptr<PropertyService> service);

    HttpResponse getProperties(const std::string& location = "", int guests = 0);
    HttpResponse getPropertyById(const std::string& id);
    HttpResponse getHealth();

private:
    std::shared_ptr<PropertyService> service_;
};

} // namespace rental
