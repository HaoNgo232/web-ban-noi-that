#!/bin/sh

# Generate env-config.js with runtime environment variables
cat <<EOF > /usr/share/nginx/html/env-config.js
window.__ENV__ = {
  VITE_API_URL: "${VITE_API_URL:-http://localhost:3000}",
  VITE_APP_NAME: "${VITE_APP_NAME:-Noi That Viet}"
};
EOF

echo "🔧 Runtime environment injected:"
echo "   VITE_API_URL: ${VITE_API_URL:-http://localhost:3000}"
echo "   VITE_APP_NAME: ${VITE_APP_NAME:-Noi That Viet}"

# Start the server
exec "$@"
