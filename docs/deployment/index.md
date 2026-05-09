Deployment Guide
================

This guide covers deploying VQE H₂ in various environments.

Local Development
-----------------

Using Docker:

.. code-block:: bash

   docker build -t vqe-h2 .
   docker run -p 8888:8888 vqe-h2

Using Docker Compose:

.. code-block:: bash

   docker-compose up

Cloud Deployment
----------------

### AWS (ECS)

1. Build and push Docker image to ECR
2. Create ECS task definition
3. Run task on Fargate

### Google Cloud (Cloud Run)

.. code-block:: bash

   gcloud run deploy vqe-h2 --docker-image gcr.io/project/vqe-h2

### Azure (Container Instances)

.. code-block:: bash

   az container create --resource-group mygroup \
       --name vqe-h2 --dns-name-label vqe-h2 \
       --image myacr.azurecr.io/vqe-h2:latest

Kubernetes
----------

Deploy to Kubernetes:

.. code-block:: bash

   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml

Environment Variables
--------------------

- ``IBM_TOKEN``: IBM Quantum API token
- ``LOG_LEVEL``: Logging level (DEBUG, INFO, WARNING)
- ``MAX_ITER``: Maximum VQE iterations

Security Considerations
-----------------------

1. Store credentials in secrets manager
2. Use HTTPS for all connections
3. Keep dependencies updated
4. Run security scans regularly
