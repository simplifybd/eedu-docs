#!/bin/sh
set -e

echo "Starting eEdu.bd Docs..."
echo "NODE_ENV=${NODE_ENV}"
echo "PORT=${PORT}"
echo "HOSTNAME=${HOSTNAME}"
echo "NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-https://docs.eedu.bd}"

exec node server.js