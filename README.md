# YesAdminUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# npm package problems

## node-sass

If `node-sass` fails to install, wanting to build a platform specific version, and to avoid installing *msbuild tools*, try manually installing the nearest round number version. Check [release downloads](https://github.com/sass/node-sass/releases) for available platform downloads. Eg `npm install node-sass@4.9.0`

# Build UI Docker image

To build the image (substitute the version as necessary):

```
docker build -t nickmorton/yes-admin-ui:1.0.0 .
```

Remember to publish latest *yes-admin-common* package to *npm*

And to run:

```
docker run -p 80:80 nickmorton/yes-admin-ui:1.0.0
```

# Services

Use `docker-compose up` to start the service containers.

## Mongo

See documation for the *Mongo* image [here](https://docs.docker.com/samples/library/mongo/)

To run only the `mongo` service using the container as configured in `docker-compose.yml` use:

```
docker-compose start mongo
```

If that fails due to no mongo container, create it using

```
docker-compose up --no-start mongo
```

If you get a `Error starting userland proxy: mkdir /port/tcp:0.0.0.0:80:tcp:172.18.0.4:80: input/output error`, restart Docker itself

Use `docker ps` to check for the *Docker* container and get it's __name__. If run via `docker-compose` it will be named `yes-admin-mongo`.

To backup the database to the current folder, use:

***Bash***
```
docker exec yes-admin-mongo sh -c "exec mongodump -d yes-admin --archive" > $(pwd)/yes-admin.archive
```

***Windows***
```
docker exec yes-admin-mongo sh -c "exec mongodump -d yes-admin --archive" > %cd%/yes-admin.archive
```

Use `docker exec -it <container name> bash` to run a *Linux* `shell` in the container.

Use `docker exec -it <container name> mongo` to run a *Docker* `shell` in the container.

Prefix `docker exec -it` commands with `winpty` if input device is not a `TTY`