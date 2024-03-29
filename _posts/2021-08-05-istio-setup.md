---
title: Istio setup
author: Marcelo Carmona
layout: post
lang: en
ref: istio-setup
permalink: istio-setup
path: 2021-08-05-istio-setup.md
tags:
  - Kubernetes
  - Istio
  - Cloud native
  - Devops
---

<img src="/img/posts/istio-kubernetes.jpeg" alt="istio and kubernetes logo">

Istio is an open source service mesh that layers transparently onto existing distributed applications. Istio's powerful features provide a uniform and more efficient way to secure, connect, and monitor services. https://istio.io

# Install Istio (mac os x)
check kubernetes namespaces `kubectl get ns`

<img src="/img/posts/istio-setup-1.png" alt="check kubernetes namespaces">

Install istioctl
```
brew install istioctl
istioctl install
```

<img src="/img/posts/istio-setup-2.png" alt="istioctl install">

With `kubectl get ns` you are going to see the new namespace created by istioctl

<img src="/img/posts/istio-setup-3.png" alt="check kubernetes namespaces after install istioctl">

With `kubectl get pod -n istio-system` you are going to see the new pods created by istio

<img src="/img/posts/istio-setup-4.png" alt="check kubernetes namespaces after install istioctl">

<img src="/img/posts/istio-mesh.png" alt="istio mesh diagram">

Istio is a very feature-rich service mesh that includes the following capabilities.

* Traffic Management: This is the most basic feature of Istio.
* Policy Control: Enables access control systems, telemetry capture, quota management, billing, etc.
* Observability: Implemented in the sidecar proxy.
* Security Authentication: The Citadel component does key and certificate management.

# Run an example in Kubernetes
I'm going to use this example [microservices-demo](https://github.com/GoogleCloudPlatform/microservices-demo.git)

```bash
git clone https://github.com/GoogleCloudPlatform/microservices-demo.git
# or download https://github.com/GoogleCloudPlatform/microservices-demo/blob/master/release/kubernetes-manifests.yaml
cd microservices-demo/release
```

Run the demo manifest `kubectl apply -f kubernetes-manifests.yaml`

<img src="/img/posts/istio-setup-5.png" alt="run the demo manifest">

Run `kubectl get pod` and wait until the status is running

<img src="/img/posts/istio-setup-6.png" alt="wait until the status is running">

<img src="/img/posts/istio-setup-7.png" alt="the demo is running">

To configure the Envoy proxy injection we need to label the default namespace with `istio-injection=enabled`

Let see the current labels with `kubectl get ns default --show-labels`

<img src="/img/posts/istio-setup-8.png" alt="show kubernetes labels">

Run `kubectl label namespace default istio-injection=enabled`

<img src="/img/posts/istio-setup-9.png" alt="show kubernetes labels with istio-injection=enabled">

So now we can shut down all the pods and re-create them to see the proxies been injected

Run `kubectl delete -f kubernetes-manifests.yaml`

<img src="/img/posts/istio-setup-10.png" alt="delete pods">

Run `kubectl get pod`

<img src="/img/posts/istio-setup-11.png" alt="check that we don't have pods">

Run `kubectl apply -f kubernetes-manifests.yaml`

Run `kubectl get pod`

<img src="/img/posts/istio-setup-12.png" alt="check the news pods">

You can see now the proxy inside of any pod with `kubectl describe pod <a-pod-name>`

<img src="/img/posts/istio-setup-13.png" alt="see the istio container inside the pod">

# Install Istio integrations for visualization and monitoring (kiali grafana promeheus and jeager)

We are going to use this [addons](https://github.com/istio/istio/tree/master/samples/addons)

```
git clone https://github.com/istio/istio.git
cd istio
# To quickly deploy all addons:
kubectl apply -f samples/addons
```

<img src="/img/posts/istio-setup-addons-1.png" alt="install istio integrations">

You can see the new pods running with `kubectl get pod -n istio-system`

<img src="/img/posts/istio-setup-addons-2.png" alt="show addons">

To see the services run `kubectl get svc -n istio-system`

<img src="/img/posts/istio-setup-addons-3.png" alt="show services">

port-foward to access to the frontend and kiali

Run `kubectl port-forward svc/kiali -n istio-system 8081:80`

<img src="/img/posts/istio-setup-addons-4.png" alt="port foward frontend">

Run `kubectl port-forward svc/kiali -n istio-system 20001`

<img src="/img/posts/istio-setup-addons-5.png" alt="port foward kiali">

Go to http://localhost:20001/ and you will see the Kiali dashboard

<img src="/img/posts/kiali.png" alt="kiali screen shot">