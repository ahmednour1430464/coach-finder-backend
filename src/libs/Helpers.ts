import { Application } from "express";

const getRoutesOfLayer = (path: string, layer: any): string[] => {
  if (layer.method) return [layer.method.toUpperCase() + " " + path];

  if (layer.route)
    return getRoutesOfLayer(
      path + split(layer.route.path),
      layer.route.stack[0]
    );

  if (!(layer.name === "router" && layer.handle.stack)) return [];

  let routes: string[] = [];

  layer.handle.stack.forEach(function (stackItem: any) {
    routes = routes.concat(getRoutesOfLayer(path + split(layer.regexp), stackItem));
  });

  return routes;
};
const split = (thing: any): string => {
  if (typeof thing === "string") return thing;
  if (thing.fast_slash) return "";

  var match = thing
                .toString()
                .replace("\\/?", "")
                .replace("(?=\\/|$)", "$")
                .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
  return match ? match[1].replace(/\\(.)/g, "$1") : "<complex:" + thing.toString() + ">";
};
const getRoutes = (app: Application): string[] => {
  let routes: string[] = [];

  app._router.stack.forEach(function (layer: any) {
    routes = routes.concat(getRoutesOfLayer("", layer));
  });

  return routes;
};

export default getRoutes;
