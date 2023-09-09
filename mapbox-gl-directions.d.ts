declare module '@mapbox/mapbox-gl-directions' {
  class MapboxDirections {
    constructor(options: { accessToken: any });

    onAdd(map: any): void;
    onRemove(map: any): void;
  }

  export default MapboxDirections;
}
