#!/bin/bash
set -e

RUN_ID="run-$(date +%s)"
echo "Injecting RUN_ID: $RUN_ID"

sed "s/__RUN_ID__/${RUN_ID}/g" job-merge-patch.yaml > ../manifests/job-merge.yaml
sed "s/__RUN_ID__/${RUN_ID}/g" job-test-patch.yaml > ../manifests/job-test.yaml
sed "s/__RUN_ID__/${RUN_ID}/g" entrypoint-configmap-patch.yaml > ../manifests/entrypoint-configmap.yaml