# Playwright Test Runner with ArgoCD & Report Viewer on Kubernetes 
This repository sets up an automated test execution environment using Playwright and Kubernetes, integrated with ArgoCD for GitOps-style deployment. The environment includes persistent storage for test reports and an NGINX-based report viewer accessible via NodePort.

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
### Build & Push Image
make build

make push

### Patch the Jobs with Unique RUN_ID
cd patch_jobs

./launch-local-run.sh

This script generates a unique RUN_ID, injects it into the job manifests, applies local kustomize overlays, and commits + pushes to Git.

### View Reports
NodePort (Docker Desktop, Minikube)

http://<your-node-ip>:30080

## Notes
All reports are stored in /results/<RUN_ID>/<SHARD_INDEX>/.NGINX autoindexes folders and allows browser navigation.- Playwright tests use sharding via environment variables.

## Requirements
Kubernetes cluster (Docker Desktop tested)

ArgoCD

Docker

Make

## Contact
Open an issue or contact maintainers for questions.

### issue with portforwarding 
kubectl port-forward svc/argocd-server -n argocd

http://localhost:30080/

## Temporary Workaround Use NodePort: 

Expose ArgoCD via NodePort:

kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort"}}'
Get the assigned port:

kubectl get svc -n argocd

Access it at https://localhost:<NodePort>.