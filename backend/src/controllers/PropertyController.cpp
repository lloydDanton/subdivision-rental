#include "controllers/PropertyController.h"
#include <sstream>

namespace rental {

PropertyController::PropertyController(std::shared_ptr<PropertyService> service)
    : service_(std::move(service)) {}

HttpResponse PropertyController::getProperties(const std::string& location, int guests) {
    HttpResponse res;
    if (!service_) {
        res.statusCode = 500;
        res.body = "{\"error\": \"Service unavailable\"}";
        return res;
    }

    auto properties = service_->getAllProperties(location, guests);
    std::ostringstream ss;
    ss << "[\n";
    for (size_t i = 0; i < properties.size(); ++i) {
        ss << properties[i].toJson();
        if (i + 1 < properties.size()) {
            ss << ",\n";
        }
    }
    ss << "\n]";

    res.statusCode = 200;
    res.body = ss.str();
    return res;
}

HttpResponse PropertyController::getPropertyById(const std::string& id) {
    HttpResponse res;
    if (!service_) {
        res.statusCode = 500;
        res.body = "{\"error\": \"Service unavailable\"}";
        return res;
    }

    auto prop = service_->getPropertyById(id);
    if (!prop.has_value()) {
        res.statusCode = 404;
        res.body = "{\"error\": \"Property not found\", \"id\": \"" + id + "\"}";
        return res;
    }

    res.statusCode = 200;
    res.body = prop->toJson();
    return res;
}

HttpResponse PropertyController::getHealth() {
    HttpResponse res;
    res.statusCode = 200;
    res.body = "{\"status\": \"healthy\", \"service\": \"subdivision-rental-api\", \"version\": \"1.0.0\"}";
    return res;
}

} // namespace rental
