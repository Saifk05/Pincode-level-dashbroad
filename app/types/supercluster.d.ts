declare module "supercluster" {
  interface SuperclusterOptions {
    minZoom?: number;
    maxZoom?: number;
    radius?: number;
  }

  interface ClusterFeature {
    type: "Feature";
    geometry: { type: "Point"; coordinates: [number, number] };
    properties: {
      cluster: true;
      cluster_id: number;
      point_count: number;
      point_count_abbreviated: number;
    };
  }

  interface PointFeature {
    type: "Feature";
    properties: any;
    geometry: { type: "Point"; coordinates: [number, number] };
  }

  class Supercluster {
    constructor(options?: SuperclusterOptions);
    load(points: PointFeature[]): void;
    getClusters(bbox: number[], zoom: number): Array<PointFeature | ClusterFeature>;
    getClusterExpansionZoom(clusterId: number): number;
  }

  export default Supercluster;
}
