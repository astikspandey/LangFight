#!/bin/bash

# LangFight Data Sync Script
# This script uploads your encrypted EMDATA.txt to a remote server

# Default server URL (change this or pass as first argument)
SERVER_URL="${1:-https://example.com/api/save}"

# Check if EMDATA.txt exists in browser's exported location
EMDATA_FILE="EMDATA.txt"

if [ ! -f "$EMDATA_FILE" ]; then
    echo "Error: EMDATA.txt not found in current directory"
    echo ""
    echo "To export your data:"
    echo "1. Open the game"
    echo "2. Click '💾 Data' button"
    echo "3. Click '📥 Export EMDATA.txt'"
    echo "4. Move the downloaded file to this directory"
    exit 1
fi

# Read the encrypted data
ENCRYPTED_DATA=$(cat "$EMDATA_FILE")

# Create JSON payload
PAYLOAD=$(cat <<EOF
{
  "data": "$ENCRYPTED_DATA"
}
EOF
)

# Upload to server
echo "Uploading encrypted data to: $SERVER_URL"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$SERVER_URL" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

# Extract HTTP status code
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ Success! Data synced successfully"
    echo "Response: $BODY"
else
    echo "✗ Failed to sync data (HTTP $HTTP_CODE)"
    echo "Response: $BODY"
    exit 1
fi
