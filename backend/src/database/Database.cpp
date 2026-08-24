#include "database/Database.h"
#include <iostream>

namespace rental {

Database& Database::getInstance() {
    static Database instance;
    return instance;
}

bool Database::initialize(const DatabaseConfig& config) {
    config_ = config;
    std::cout << "[Database] Initializing connection to Supabase / Database..." << std::endl;

    if (!config_.supabaseUrl.empty()) {
        std::cout << "[Database] Configured Supabase URL: " << config_.supabaseUrl << std::endl;
        connected_ = true;
    } else if (!config_.host.empty() && !config_.user.empty()) {
        std::cout << "[Database] Configured PostgreSQL Host: " << config_.host << ":" << config_.port << std::endl;
        connected_ = true;
    } else {
        std::cout << "[Database] No remote DB credentials provided. Using seeded local repository mode." << std::endl;
        connected_ = true;
    }

    return connected_;
}

bool Database::isConnected() const {
    return connected_;
}

void Database::close() {
    connected_ = false;
    std::cout << "[Database] Connection closed." << std::endl;
}

} // namespace rental
