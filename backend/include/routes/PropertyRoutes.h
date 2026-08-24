#pragma once

#include "controllers/PropertyController.h"
#include <memory>

#ifdef HAVE_CROW
#include "crow.h"
#endif

namespace rental {

class PropertyRoutes {
public:
    explicit PropertyRoutes(std::shared_ptr<PropertyController> controller);

#ifdef HAVE_CROW
    void registerRoutes(crow::SimpleApp& app);
#endif

    std::shared_ptr<PropertyController> getController() const { return controller_; }

private:
    std::shared_ptr<PropertyController> controller_;
};

} // namespace rental
