#pragma once

#include <string>
#include <vector>
#include <memory>
#include <functional>
#include <map>
#include <iostream>

namespace rental {

struct DatabaseConfig {
    std::string host = "localhost";
    int port = 5432;
    std::string dbname = "postgres";
    std::string user = "postgres";
    std::string password = "";
    std::string supabaseUrl = "";
    std::string supabaseAnonKey = "";
    std::string supabaseServiceRoleKey = "";
    bool useMockFallback = true;
};

class Database {
public:
    static Database& getInstance();

    bool initialize(const DatabaseConfig& config);
    bool isConnected() const;
    void close();

    const DatabaseConfig& getConfig() const { return config_; }

private:
    Database() = default;
    ~Database() = default;
    Database(const Database&) = delete;
    Database& operator=(const Database&) = delete;

    DatabaseConfig config_;
    bool connected_ = false;
};

} // namespace rental
