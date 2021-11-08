# VidiCore Admin Tool

See [Knowledge Base](https://support.vidispine.com/space/CKB/2249949244/VidiCore+Admin+Tool) for more information on the initial setup.

The VidiCore Admin Tool showcases Vidispine API features within a simple user interface.  The application runs in a web browser and communicates directly with the API without the need for any middleware.  It works out of the box with any VidiCore API server without the need for any configuration except CORS if you run the application remotely.

The application runs in a single webpage which means that a bundle of static files need to be downloaded once, then the browser will dynamically rendered pages based on the JSON data returned from the Vidispine API.  The bundle can be hosted by any webserver, including an S3 bucket.  This means updates to the application can be simply rolled out by updating the bundle and reloading the browser.

The intention of the application is to demonstrate all API endpoints with a consistent user experience. This includes viewing lists or entities, forms that allow entry of any possible value within the schema, and actions to create/update/remove entities.

An icon in the toolbar displays the data returned from the VidiCore API which has been used to render the UI.  For further detail, the API requests can be monitored via the browser's inspector tools.  This demonstrates to developers the correct syntax to use when integrating VidiCore API into their own products.


# Get Started

## Source

* Install `nodejs` and `yarn`.

* Clone this project and change into the project folder.

* Install dependencies.
```
yarn install
```

* Start with `VIDISPINE_URL` (default: `http://localhost:8080`)
```
VIDISPINE_URL='https://example.myvidispine.com' yarn start
```

* Open http://localhost:3000/ in a browser.

### Build

* Compile the application locally.
```
yarn build
```

* Build the docker image with the `latest` tag.
Note that only files/folders specified with `!` prefix in the `.dockerignore` will be included.
```
yarn run build-container
```
## Docker

Docker Containers can be downloaded from Dockerhub https://hub.docker.com/repository/docker/vidispine/admin-tool

### Run

* Start the container with the latest image.
```
docker run \
  --name vidijs \
  --detach \
  --tty \
  --interactive \
  --rm \
  -e VIDISPINE_URL='http://my-vidispine-server:8080' \
  -p 80:80 \
  'vidijs/vidijs:latest'
```

#### Run Environment Variables

* **VIDISPINE_URL**: The URL (including http/s and port) to access the Vidispine API.
  - Do not include a trailing `/` on the URL as it will break the Nginx proxy.
  - If running in Compose/Kubernetes, this should be the service name.
  - If running on localhost either use `docker.for.mac.localhost`, `docker.for.win.localhost`, the IP address of the host on the docker network, or use `--net=host`.

#### Ports

* **80**: Web service
