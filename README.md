# express-k8s

Este projeto é uma aplicação Node.js utilizando o framework Express, preparada para ser executada em um cluster Kubernetes.

## Pré-requisitos

- Node.js instalado
- Docker instalado
- Kubernetes configurado
- Kind instalado

## Instalação

1. Clone o repositório:

  ```sh
  git clone https://github.com/seu-usuario/express-k8s.git
  cd express-k8s
  ```

2. Instale as dependências:

  ```sh
  npm install
  ```

## Executando a aplicação localmente

Para executar a aplicação localmente, utilize o comando:

```sh
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

## Docker

Para criar uma imagem Docker da aplicação, utilize o comando:

```sh
docker build -t express-k8s .
```

Para executar a aplicação em um container Docker, utilize o comando:

```sh
docker run -p 3000:3000 express-k8s
```

## Kubernetes

Para implantar a aplicação em um cluster Kubernetes, siga os passos abaixo:

### Criando um cluster Kind

1. Crie um arquivo de configuração do cluster Kind:

    ```yaml
    kind: Cluster
    apiVersion: kind.x-k8s.io/v1alpha4
    nodes:
    - role: control-plane
    ```

2. Crie o cluster Kind:

    ```sh
    kind create cluster --config kind-config.yaml
    ```

### Implantando a aplicação e o serviço

1. Crie um arquivo de manifest:

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: express-k8s-app
      labels:
        app: express-k8s-app
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: express-k8s-app
      template:
        metadata:
          labels:
            app: express-k8s-app
        spec:
          containers:
            - name: express-k8s-app
              image: linikerdev/express-k8s-app
              ports:
                - containerPort: 3000
                  name: http
              resources:
                limits:
                  memory: "512Mi"
                  cpu: "500m"
                requests:
                  memory: "256Mi"
                  cpu: "250m"

    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: express-svc
      labels:
        app: express-k8s-app
    spec:
      selector:
        app: express-k8s-app
      ports:
        - protocol: TCP
          name: http
          port: 3000
          targetPort: http
          nodePort: 30000
      type: NodePort
    ```

2. Aplique o deployment no cluster:

    ```sh
    kubectl apply -f manifest.api.yaml
    ```
### Adicionando o MongoDB ao cluster

    1. Crie um arquivo de manifest para o MongoDB:

      ```yaml
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: mongo
        labels:
        app: mongo
      spec:
        replicas: 1
        selector:
        matchLabels:
          app: mongo
        template:
        metadata:
          labels:
          app: mongo
        spec:
          containers:
          - name: mongo
            image: mongo:4.4.6
            ports:
            - containerPort: 27017
              name: mongo
            resources:
            limits:
              memory: "512Mi"
              cpu: "500m"
            requests:
              memory: "256Mi"
              cpu: "250m"
            volumeMounts:
            - name: mongo-storage
              mountPath: /data/db
          volumes:
          - name: mongo-storage
            emptyDir: {}

      ---
      apiVersion: v1
      kind: Service
      metadata:
        name: mongo
        labels:
        app: mongo
      spec:
        selector:
        app: mongo
        ports:
        - protocol: TCP
          name: mongo
          port: 27017
          targetPort: 27017
      ```

    2. Aplique o deployment do MongoDB no cluster:

      ```sh
      kubectl apply -f manifest.mongo.yaml
      ```
## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.