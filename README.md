# VidiCore Admin Tool

See [Knowledge Base](https://support.vidispine.com/space/CKB/2249949244/VidiCore+Admin+Tool) for more information on the initial setup.

The VidiCore Admin Tool showcases Vidispine API features within a simple user interface. The application runs in a web browser and communicates directly with the API without the need for any middleware. It works out of the box with any VidiCore API server without the need for any configuration except CORS if you run the application remotely.

The application runs in a single webpage which means that a bundle of static files need to be downloaded once, then the browser will dynamically rendered pages based on the JSON data returned from the Vidispine API. The bundle can be hosted by any webserver, including an S3 bucket. This means updates to the application can be simply rolled out by updating the bundle and reloading the browser.

The intention of the application is to demonstrate all API endpoints with a consistent user experience. This includes viewing lists or entities, forms that allow entry of any possible value within the schema, and actions to create/update/remove entities.

An icon in the toolbar displays the data returned from the VidiCore API which has been used to render the UI. For further detail, the API requests can be monitored via the browser's inspector tools. This demonstrates to developers the correct syntax to use when integrating VidiCore API into their own products.

# Get Started

## Source

- Install `nodejs`.

- Clone this project and change into the project folder.

- Install dependencies.

```
npm install
```

- Start the [vite dev server](https://vitejs.dev/guide/cli.html#dev-server)

```
npm run start
```

- (Optionally) Set the `VITE_VIDISPINE_URL` to configure the [proxy](https://vitejs.dev/config/server-options.html#server-proxy) to avoid configuring CORS.

_MacOS, Linux_

```bash
VITE_VIDISPINE_URL='https://example.myvidispine.com' npm run start
```

_Windows_

```cmd
set VITE_VIDISPINE_URL='https://example.myvidispine.com'& npm run start
```

- Open http://localhost:3000/ in a browser.

### VSCode

- Use the _Run and Debug_ console to launch the dev server and set the VidiCore URL. See [launch.json](.vscode/launch.json).

### Build

- Compile the application locally.

```
npm run build
```

- Build the docker image with the `latest` tag.
  Note that only files/folders specified with `!` prefix in the docker compose run -e DEBUG=1 web python console.py will be included.

```
npm run docker:build
```

## Docker

Docker Containers can be downloaded from Dockerhub https://hub.docker.com/r/vidispine/admin-tool/tags

### Run

- Pull the latest image

```
docker image pull vidispine/admin-tool:latest
```

- Start the container with the latest image.
  - Try changing the port from `-p 80:80` to `-p 8088:80` if running on Windows.

```
docker run \
  --name vidispine-admin-tool \
  --detach \
  --tty \
  --interactive \
  --rm \
  -e VIDISPINE_URL='http://my-vidispine-server:8080' \
  -p 80:80 \
  'vidispine/admin-tool:latest'
```

- Alternatively, start the container without specifying a VidiCore server.

```
docker run \
  --name vidispine-admin-tool \
  --detach \
  --tty \
  --interactive \
  --rm \
  -e CONTAINER_PROXY='true' \
  -p 80:80 \
  'vidispine/admin-tool:latest'
```

- Alternatively, use `docker compose` with the linked [`docker-compose.yaml`](./docker-compose.yaml).

```
docker compose up -d \
  --detach \
  -e VIDISPINE_URL='http://my-vidispine-server:8080' \
  -e ADMINTOOL_PORT=80 \
  admintool
```

#### Run Environment Variables

- **VIDISPINE_URL**: The URL (including http/s and port) to access the Vidispine API.
  - Do not include a trailing `/` on the URL as it will break the Nginx proxy.
  - If running in Compose/Kubernetes, this should be the service name.
  - If running on localhost either use `host.docker.internal`, the IP address of the host on the docker network, or use `--net=host`.
- **NGINX_RESOLVER**: Nginx will proxy requests to an upstream VidiCore server, this will require a DNS address for the [resolver](https://nginx.org/en/docs/http/ngx_http_core_module.html#resolver) if using a hostname.
  - Set this to `127.0.0.11` if using within Docker Compose.
  - Set this to `169.254.169.253` if using in AWS ECS (or your [Route 53 Resolver](https://docs.aws.amazon.com/vpc/latest/userguide/AmazonDNS-concepts.html#AmazonDNS)).
- **CONTAINER_PROXY**: Sets the `X-Proxy-URL` header on frontend requests and proxy via Nginx.

#### Ports

- **80**: Web service
