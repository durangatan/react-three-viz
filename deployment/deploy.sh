set -euo pipefail
cd infrastructure
terraform apply 
aws s3 sync ../dist/apps/viz-spa s3://www.react-three-viz.com