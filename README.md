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

### Implantando a aplicação

1. Crie um arquivo de deployment:

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: express-k8s
    spec:
      replicas: 2
      selector:
         matchLabels:
            app: express-k8s
      template:
         metadata:
            labels:
              app: express-k8s
         spec:
            containers:
            - name: express-k8s
              image: express-k8s:latest
              ports:
              - containerPort: 3000
    ```

2. Aplique o deployment no cluster:

    ```sh
    kubectl apply -f deployment.yaml
    ```

3. Exponha a aplicação com um serviço:

    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: express-k8s-service
    spec:
      selector:
         app: express-k8s
      ports:
         - protocol: TCP
            port: 80
            targetPort: 3000
      type: LoadBalancer
    ```

4. Aplique o serviço no cluster:

    ```sh
    kubectl apply -f service.yaml
    ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.