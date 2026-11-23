# Security baseline

- Environment values are parsed and validated at startup; invalid configuration prevents boot.
- `x-powered-by` is disabled and Helmet applies security headers.
- CORS uses an explicit origin allowlist; do not use wildcard origins with credentials.
- JSON and URL-encoded bodies are capped at 1 MiB.
- A global rate limiter is enabled; sensitive routes must receive stricter route-specific limits later.
- Pino redacts common credential-bearing fields and headers.
- Errors return stable codes and do not expose stack traces or internal exception messages.
- Secrets must never be committed. Production secrets belong in the deployment secret manager.

This is a baseline, not a claim of complete OWASP compliance. Each feature phase must add threat-specific controls and tests.
