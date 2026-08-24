#include "routes/PropertyRoutes.h"
#include <iostream>

namespace rental {

PropertyRoutes::PropertyRoutes(std::shared_ptr<PropertyController> controller)
    : controller_(std::move(controller)) {}

#ifdef HAVE_CROW
void PropertyRoutes::registerRoutes(crow::SimpleApp& app) {
    if (!controller_) return;

    auto setCorsHeaders = [](crow::response& res) {
        res.add_header("Access-Control-Allow-Origin", "*");
        res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        res.add_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    };

    // Global OPTIONS preflight
    CROW_ROUTE(app, "/api/<path>")
        .methods(crow::HTTPMethod::OPTIONS)
    ([setCorsHeaders](const crow::request&, crow::response& res, std::string) {
        setCorsHeaders(res);
        res.code = 204;
        res.end();
    });

    // Health check
    CROW_ROUTE(app, "/api/health")
        .methods(crow::HTTPMethod::GET)
    ([this, setCorsHeaders]() {
        crow::response res;
        setCorsHeaders(res);
        auto httpRes = controller_->getHealth();
        res.code = httpRes.statusCode;
        res.set_header("Content-Type", httpRes.contentType);
        res.body = httpRes.body;
        return res;
    });

    // Get all properties
    CROW_ROUTE(app, "/api/properties")
        .methods(crow::HTTPMethod::GET)
    ([this, setCorsHeaders](const crow::request& req) {
        crow::response res;
        setCorsHeaders(res);

        std::string location = req.url_params.get("location") ? req.url_params.get("location") : "";
        int guests = 0;
        if (req.url_params.get("guests")) {
            try {
                guests = std::stoi(req.url_params.get("guests"));
            } catch (...) {
                guests = 0;
            }
        }

        auto httpRes = controller_->getProperties(location, guests);
        res.code = httpRes.statusCode;
        res.set_header("Content-Type", httpRes.contentType);
        res.body = httpRes.body;
        return res;
    });

    // Get property by ID
    CROW_ROUTE(app, "/api/properties/<string>")
        .methods(crow::HTTPMethod::GET)
    ([this, setCorsHeaders](std::string id) {
        crow::response res;
        setCorsHeaders(res);

        auto httpRes = controller_->getPropertyById(id);
        res.code = httpRes.statusCode;
        res.set_header("Content-Type", httpRes.contentType);
        res.body = httpRes.body;
        return res;
    });

    std::cout << "[Routes] Registered /api/health, /api/properties, /api/properties/<id>" << std::endl;
}
#endif

} // namespace rental
