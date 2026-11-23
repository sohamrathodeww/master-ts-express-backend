# Architecture

The application uses a feature-based modular architecture with internal layers: routes, controllers, validators, services, repositories, interfaces and tests. Controllers own HTTP concerns; services own business rules; repositories isolate persistence. Cross-cutting concerns live in `config`, `middlewares`, `infrastructure` and `shared`.

`main` is database-independent. Database adapters, drivers, models and migrations are introduced only on their dedicated feature branches. Do not merge multiple database variants into `main`.

## Request lifecycle

Request ID -> structured HTTP logging -> security headers -> CORS -> bounded body parsing -> rate limit -> versioned router -> not-found handler -> centralized error handler.
