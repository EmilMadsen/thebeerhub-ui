# thebeerhub-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Dockerize
```
docker build -t emilmadsen/thebeerhub-ui:tag .
```  

mode arg (env):
```
docker build --build-arg mode='-- --mode development' -t emilmadsen/thebeerhub-ui:tag .
```


