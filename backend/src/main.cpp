#include <iostream>
#include <cstdlib>
#include <memory>
#include "database/Database.h"
#include "repositories/PropertyRepository.h"
#include "services/PropertyService.h"
#include "controllers/PropertyController.h"
#include "routes/PropertyRoutes.h"

#ifdef HAVE_CROW
#include "crow.h"
#endif

int main(int argc, char* argv[]) {
    std::cout << "=====================================================" << std::endl;
    std::cout << "  Subdivision House Rental & Booking System - API   " << std::endl;
    std::cout << "  Phase 4: React <-> C++ REST API Integration       " << std::endl;
    std::cout << "=====================================================" << std::endl;

    // Load configuration from environment
    rental::DatabaseConfig dbConfig;
    const char* envPort = std::getenv("BACKEND_PORT");
    int port = envPort ? std::atoi(envPort) : 8080;

    const char* envSupabaseUrl = std::getenv("SUPABASE_URL");
    if (envSupabaseUrl) dbConfig.supabaseUrl = envSupabaseUrl;

    const char* envSupabaseKey = std::getenv("SUPABASE_SERVICE_ROLE_KEY");
    if (envSupabaseKey) dbConfig.supabaseServiceRoleKey = envSupabaseKey;

    const char* envDbHost = std::getenv("SUPABASE_DB_HOST");
    if (envDbHost) dbConfig.host = envDbHost;

    // 1. Initialize Database
    auto& db = rental::Database::getInstance();
    db.initialize(dbConfig);

    // 2. Layered Architecture: Repositories -> Services -> Controllers -> Routes
    auto repository = std::make_shared<rental::PropertyRepository>();
    auto service = std::make_shared<rental::PropertyService>(repository);
    auto controller = std::make_shared<rental::PropertyController>(service);
    auto routes = std::make_unique<rental::PropertyRoutes>(controller);

#ifdef HAVE_CROW
    crow::SimpleApp app;
    routes->registerRoutes(app);

    std::cout << "[Server] C++ REST API listening on http://0.0.0.0:" << port << std::endl;
    std::cout << "[Server] CORS enabled for React frontend development." << std::endl;
    app.port(port).multithreaded().run();
#else
    std::cout << "[Server] Running in standalone CLI test mode." << std::endl;
    std::cout << "[Server] Testing GET /api/properties endpoint:" << std::endl;
    auto res = controller->getProperties();
    std::cout << "Status: " << res.statusCode << "\nBody:\n" << res.body << std::endl;
#endif

    return 0;
}
