# Contoso project name generator (frontend)
This repository has a dev container configuration. If you launch this repository in a GitHub Codespace, you should have all the tools and runtimes you need to work on this project. The configuration files for the dev container are contained in the `.devcontainer` directory.

## Build and run locally
```
npm install
npm run build
npm start
```

then open <http://localhost:3000> in your browser.

## Build and run the container image
Replace the container registry details below with something you have access to like a Docker Hub registry, GitHub Container Registry, or Azure Container Registry.
```
docker build -t ghcr.io/sabbour/contoso-names-frontend:latest .

docker run -p 3000:80 ghcr.io/sabbour/contoso-names-frontend:latest
```

the open <http://localhost:3000> in your browser.

## Push the container image to a registry
```
docker push ghcr.io/sabbour/contoso-names-frontend:latest
```

## Deploy the Kubernetes manifests
```
# Create the namespace if it doesn't exist
kubectl create namespace contoso-names

# Apply the manifests
kubectl apply -f ./manifests --namespace=contoso-names
```

## Retrieve the Kubernetes service IP
```
# Get the frontend service IP
kubectl get service contoso-names-frontend --namespace=contoso-names -o jsonpath="{.status.loadBalancer.ingress[0].ip}"
```

## Open a browser to view the frontend
Now that you have the service's public IP address, navigate to <http://[contoso-frontend IP address]> in your browser.