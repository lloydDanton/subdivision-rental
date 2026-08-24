cmake_minimum_required(VERSION 3.15)
project(SubdivisionRentalAPI VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Include directories
include_directories(
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Source files
set(SOURCES
    src/main.cpp
    src/database/Database.cpp
    src/repositories/PropertyRepository.cpp
    src/services/PropertyService.cpp
    src/controllers/PropertyController.cpp
    src/routes/PropertyRoutes.cpp
)

# Optional Crow dependency via FetchContent
include(FetchContent)

option(ENABLE_CROW "Enable Crow HTTP framework" ON)

if(ENABLE_CROW)
    FetchContent_Declare(
        crow
        GIT_REPOSITORY https://github.com/CrowCpp/Crow.git
        GIT_TAG master
    )
    FetchContent_MakeAvailable(crow)
    add_compile_definitions(HAVE_CROW)
endif()

add_executable(rental_api ${SOURCES})

if(ENABLE_CROW AND TARGET Crow::Crow)
    target_link_libraries(rental_api PRIVATE Crow::Crow)
endif()

if(WIN32)
    target_link_libraries(rental_api PRIVATE ws2_32 wsock32)
endif()
