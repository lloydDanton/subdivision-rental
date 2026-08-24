# SubdivisionStay — C++ REST API Backend

This is the C++ REST API backend service for the **Subdivision House Rental & Booking System**, built using modern C++17 and the [Crow](https://github.com/CrowCpp/Crow) framework.

---

## 1. Architecture

The backend implements a clean layered architecture:

```text
HTTP Request (GET /api/properties)
       │
       ▼
Routes (PropertyRoutes.h / .cpp)
       │
       ▼
Controllers (PropertyController.h / .cpp)
       │
       ▼
Services (PropertyService.h / .cpp)
       │
       ▼
Repositories (PropertyRepository.h / .cpp)
       │
       ▼
Database (Database.h / .cpp -> Supabase PostgreSQL / Local Store)
```

---

## 2. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/properties` | List all available properties (supports `?location=...&guests=...`) |
| `GET` | `/api/properties/:id` | Get details for a single property by ID |
| `OPTIONS` | `/api/*` | Global CORS preflight handler |

---

## 3. Configuration & Environment Variables

| Variable | Default | Description |
|---|---|---|
| `BACKEND_PORT` | `8080` | Port for the C++ REST API server |
| `SUPABASE_URL` | Optional | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Service role secret key |
| `SUPABASE_DB_HOST` | Optional | PostgreSQL host for direct connections |

---

## 4. Building and Running

### Prerequisites
- CMake ≥ 3.15
- C++17 compatible compiler (GCC, Clang, or MSVC)

### Build Instructions

```bash
cd backend
mkdir build && cd build
cmake ..
cmake --build . --config Release
```

### Run Server

```bash
# Run executable
./rental_api
```

Server will start on `http://localhost:8080` with CORS support enabled for the React development server.
