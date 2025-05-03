# Playwright Test Runner Infrastructure with ArgoCD & Report Viewer

This repository sets up an automated test execution environment using Playwright and Kubernetes, integrated with ArgoCD for GitOps-style deployment. The environment includes persistent storage for test reports and an NGINX-based report viewer accessible via NodePort.

## Directory Structure
├── README.md
├── app.yaml
└── kubernetes-manifests    
├── manifests
│   ├── job-merge.yaml
│   ├── job-test.yaml
│   ├── kustomization.yaml
│   ├── nginx-config.yaml
│   ├── nginx-report-viewer.yaml
│   ├── pv.yaml
|   └── pvc.yaml
└── patch_jobs
    |   ├── entrypoint-patch.sh
    |   ├── job-merge-patch.yaml
    |   ├── job-test-patch.yaml
    |   └── launch-local-run.sh 

## Key Components

### ArgoCD: 
Manages the Kubernetes manifests and ensures continuous sync and deployment based on Git changes.

### Test Jobs:
- job-test.yaml: Runs Playwright tests using a configurable entrypoint script.
- job-merge.yaml: Merges multiple shard reports into a unified directory.

### Persistent Volume: 
pvc.yaml and pv.yaml define the shared volume where test results are written.

### NGINX Report Viewer: 
nginx-report-viewer.yaml deploys NGINX and exposes the reports.

## Usage
1. Build & Push Image
make build
make push
2. Patch the Jobs with Unique RUN_ID
cd patch_jobs
./launch-local-run.sh
This script generates a unique RUN_ID, injects it into the job manifests, applies local kustomize overlays, and commits + pushes to Git.
3.View Reports
NodePort (Docker Desktop, Minikube)
http://<your-node-ip>:30080

## Notes
All reports are stored in /results/<RUN_ID>/<SHARD_INDEX>/.NGINX autoindexes folders and allows browser navigation. - Playwright tests use sharding via environment variables. 

## Requirements
Kubernetes cluster (Docker Desktop tested)
ArgoCD 
Docker
Make
## Contact
Open an issue or contact maintainers for questions.




http://localhost:30080/
