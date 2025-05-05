#!/bin/bash
set -e

cd /app

echo "[Entry Point] Started ..."

npx playwright test 

echo "[Entry Point] Completed ..."

sleep 120
