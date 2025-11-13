// // // // // "use client";

// // // // // import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// // // // // import MarkerClusterGroup from "react-leaflet-cluster";
// // // // // import Papa from "papaparse";
// // // // // import { useEffect, useState } from "react";
// // // // // import L from "leaflet";

// // // // // // Define interface for one row in your CSV
// // // // // interface CSVRow {
// // // // //   action?: string;
// // // // //   created_time?: string;
// // // // //   bap_id?: string;
// // // // //   transaction_id?: string;
// // // // //   message_id?: string;
// // // // //   category_id?: string;
// // // // //   category?: string;
// // // // //   start_gps?: string;
// // // // //   start_area_code?: string;
// // // // //   end_gps?: string;
// // // // //   end_area_code?: string;
// // // // // }

// // // // // // Leaflet Marker Icon
// // // // // const icon = new L.Icon({
// // // // //   iconUrl: "/marker-icon.png",
// // // // //   iconSize: [25, 41],
// // // // //   iconAnchor: [12, 41],
// // // // // });

// // // // // export default function MapView() {
// // // // //   const [data, setData] = useState<CSVRow[]>([]);

// // // // //   useEffect(() => {
// // // // //     Papa.parse<CSVRow>("/data.csv", {
// // // // //       download: true,
// // // // //       header: true,
// // // // //       skipEmptyLines: true,
// // // // //       complete: (result) => {
// // // // //         console.log("Loaded rows:", result.data.length);
// // // // //         setData(result.data);
// // // // //       },
// // // // //     });
// // // // //   }, []);

// // // // //   return (
// // // // //     <MapContainer
// // // // //       center={[20.5937, 78.9629]}  // India
// // // // //       zoom={5}
// // // // //       style={{ height: "100vh", width: "100%" }}
// // // // //     >
// // // // //       <TileLayer
// // // // //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // // // //         attribution="© OpenStreetMap contributors"
// // // // //       />

// // // // //       <MarkerClusterGroup>
// // // // //         {data.map((row, index) => {
// // // // //           if (!row.start_gps) return null;

// // // // //           // GPS format example: "28.7041,77.1025"
// // // // //           const [lat, lng] = row.start_gps.split(",").map(Number);

// // // // //           // If invalid numbers → skip
// // // // //           if (isNaN(lat) || isNaN(lng)) return null;

// // // // //           return (
// // // // //             <Marker
// // // // //               key={index}
// // // // //               position={[lat, lng]}
// // // // //               icon={icon}
// // // // //             >
// // // // //               <Popup>
// // // // //                 <b>Action:</b> {row.action} <br />
// // // // //                 <b>Start Area:</b> {row.start_area_code} <br />
// // // // //                 <b>End Area:</b> {row.end_area_code} <br />
// // // // //                 <b>Category:</b> {row.category}
// // // // //               </Popup>
// // // // //             </Marker>
// // // // //           );
// // // // //         })}
// // // // //       </MarkerClusterGroup>
// // // // //     </MapContainer>
// // // // //   );
// // // // // }


// // // // // "use client";

// // // // // import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
// // // // // import { useEffect, useMemo, useState } from "react";   
// // // // // import supercluster from "supercluster";
// // // // // import L from "leaflet";
// // // // // import Papa from "papaparse";

// // // // // interface CSVRow {
// // // // //   start_gps?: string;
// // // // //   start_area_code?: string;
// // // // //   end_area_code?: string;
// // // // //   category?: string;
// // // // // }

// // // // // interface PointFeature {
// // // // //   type: "Feature";
// // // // //   geometry: { type: "Point"; coordinates: [number, number] };
// // // // //   properties: { row: CSVRow };
// // // // // }

// // // // // const icon = new L.Icon({
// // // // //   iconUrl: "/marker-icon.png",
// // // // //   iconSize: [25, 41],
// // // // //   iconAnchor: [12, 41],
// // // // // });

// // // // // // Rerender clusters when map moves
// // // // // function ClusterLayer({ points }: { points: PointFeature[] }) {
// // // // //   const map = useMap();
// // // // //   const [clusters, setClusters] = useState<any[]>([]);

// // // // //   const index = useMemo(() => {
// // // // //     const cluster = new supercluster({
// // // // //       radius: 60,
// // // // //       maxZoom: 17,
// // // // //     });
// // // // //     cluster.load(points);
// // // // //     return cluster;
// // // // //   }, [points]);

// // // // //   useEffect(() => {
// // // // //     const update = () => {
// // // // //       const bounds = map.getBounds();
// // // // //       const zoom = map.getZoom();

// // // // //       const clusterData = index.getClusters(
// // // // //         [
// // // // //           bounds.getWest(),
// // // // //           bounds.getSouth(),
// // // // //           bounds.getEast(),
// // // // //           bounds.getNorth(),
// // // // //         ],
// // // // //         Math.round(zoom)
// // // // //       );
// // // // //       setClusters(clusterData);
// // // // //     };

// // // // //     update();
// // // // //     map.on("moveend", update);

// // // // //     return () => {
// // // // //       map.off("moveend", update);
// // // // //     };
// // // // //   }, [index, map]);

// // // // //   return (
// // // // //     <>
// // // // //       {clusters.map((cluster: any, i: number) => {
// // // // //         const [lng, lat] = cluster.geometry.coordinates;

// // // // //         // CLUSTER
// // // // //         if (cluster.properties.cluster) {
// // // // //           const count = cluster.properties.point_count;

// // // // //           return (
// // // // //             <CircleMarker
// // // // //               key={i}
// // // // //               center={[lat, lng]}
// // // // //               radius={15 + Math.min(count / 50, 25)}
// // // // //               fillOpacity={0.6}
// // // // //               color="red"
// // // // //               eventHandlers={{
// // // // //                 click: () => {
// // // // //                   const expansionZoom = index.getClusterExpansionZoom(
// // // // //                     cluster.properties.cluster_id
// // // // //                   );
// // // // //                   map.setView([lat, lng], expansionZoom);
// // // // //                 },
// // // // //               }}
// // // // //             >
// // // // //               <Popup>{count} locations</Popup>
// // // // //             </CircleMarker>
// // // // //           );
// // // // //         }

// // // // //         // SINGLE POINT
// // // // //         return (
// // // // //           <Marker key={i} position={[lat, lng]} icon={icon}>
// // // // //             <Popup>
// // // // //               <b>Start Area:</b> {cluster.properties.row.start_area_code}
// // // // //               <br />
// // // // //               <b>End Area:</b> {cluster.properties.row.end_area_code}
// // // // //               <br />
// // // // //               <b>Category:</b> {cluster.properties.row.category}
// // // // //             </Popup>
// // // // //           </Marker>
// // // // //         );
// // // // //       })}
// // // // //     </>
// // // // //   );
// // // // // }

// // // // // export default function MapView() {
// // // // //   const [points, setPoints] = useState<PointFeature[]>([]);

// // // // //   useEffect(() => {
// // // // //     Papa.parse<CSVRow>("/data.csv", {
// // // // //       download: true,
// // // // //       header: true,
// // // // //       skipEmptyLines: true,
// // // // //       complete: (result) => {
// // // // //         const pts: PointFeature[] = [];

// // // // //         result.data.forEach((row) => {
// // // // //           if (!row.start_gps) return;

// // // // //           const [lat, lng] = row.start_gps.split(",").map(Number);
// // // // //           if (isNaN(lat) || isNaN(lng)) return;

// // // // //           pts.push({
// // // // //             type: "Feature",
// // // // //             geometry: { type: "Point", coordinates: [lng, lat] }, // GeoJSON = [lng, lat]
// // // // //             properties: { row },
// // // // //           });
// // // // //         });

// // // // //         setPoints(pts);
// // // // //       },
// // // // //     });
// // // // //   }, []);

// // // // //   return (
// // // // //     <MapContainer
// // // // //       center={[20.5937, 78.9629]}
// // // // //       zoom={5}
// // // // //       style={{ height: "100vh", width: "100%" }}
// // // // //     >
// // // // //       <TileLayer
// // // // //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // // // //         attribution="© OpenStreetMap contributors"
// // // // //       />

// // // // //       <ClusterLayer points={points} />
// // // // //     </MapContainer>
// // // // //   );
// // // // // }


// // // // // "use client";

// // // // // import {
// // // // //   MapContainer,
// // // // //   TileLayer,
// // // // //   Marker,
// // // // //   Popup,
// // // // //   CircleMarker,
// // // // //   useMap,
// // // // // } from "react-leaflet";
// // // // // import { useEffect, useMemo, useState } from "react";
// // // // // import supercluster from "supercluster";
// // // // // import L from "leaflet";
// // // // // import Papa from "papaparse";

// // // // // // CSV row interface
// // // // // interface CSVRow {
// // // // //   start_gps?: string;
// // // // //   start_area_code?: string;
// // // // //   end_area_code?: string;
// // // // //   category?: string;
// // // // // }

// // // // // interface PointFeature {
// // // // //   type: "Feature";
// // // // //   geometry: { type: "Point"; coordinates: [number, number] };
// // // // //   properties: { row: CSVRow };
// // // // // }

// // // // // const icon = new L.Icon({
// // // // //   iconUrl: "/marker-icon.png",
// // // // //   iconSize: [25, 41],
// // // // //   iconAnchor: [12, 41],
// // // // // });

// // // // // // Cluster renderer
// // // // // function ClusterLayer({ points }: { points: PointFeature[] }) {
// // // // //   const map = useMap();
// // // // //   const [clusters, setClusters] = useState<any[]>([]);

// // // // //   const index = useMemo(() => {
// // // // //     const cluster = new supercluster({
// // // // //       radius: 60,
// // // // //       maxZoom: 17,
// // // // //     });
// // // // //     cluster.load(points);
// // // // //     return cluster;
// // // // //   }, [points]);

// // // // //   useEffect(() => {
// // // // //     const update = () => {
// // // // //       const bounds = map.getBounds();
// // // // //       const zoom = map.getZoom();

// // // // //       const clusterData = index.getClusters(
// // // // //         [
// // // // //           bounds.getWest(),
// // // // //           bounds.getSouth(),
// // // // //           bounds.getEast(),
// // // // //           bounds.getNorth(),
// // // // //         ],
// // // // //         Math.round(zoom)
// // // // //       );

// // // // //       setClusters(clusterData);
// // // // //     };

// // // // //     update();
// // // // //     map.on("moveend", update);

// // // // //     return () => {
// // // // //       map.off("moveend", update);
// // // // //     };
// // // // //   }, [index, map]);

// // // // //   return (
// // // // //     <>
// // // // //       {clusters.map((cluster: any, i: number) => {
// // // // //         const [lng, lat] = cluster.geometry.coordinates;

// // // // //         // Cluster
// // // // //         if (cluster.properties.cluster) {
// // // // //           const count = cluster.properties.point_count;

// // // // //           return (
// // // // //             <CircleMarker
// // // // //               key={i}
// // // // //               center={[lat, lng]}
// // // // //               radius={15 + Math.min(count / 50, 25)}
// // // // //               fillOpacity={0.6}
// // // // //               color="red"
// // // // //               eventHandlers={{
// // // // //                 click: () => {
// // // // //                   const nextZoom = index.getClusterExpansionZoom(
// // // // //                     cluster.properties.cluster_id
// // // // //                   );
// // // // //                   map.setView([lat, lng], nextZoom);
// // // // //                 },
// // // // //               }}
// // // // //             >
// // // // //               <Popup>{count} locations</Popup>
// // // // //             </CircleMarker>
// // // // //           );
// // // // //         }

// // // // //         // Single point
// // // // //         return (
// // // // //           <Marker key={i} position={[lat, lng]} icon={icon}>
// // // // //             <Popup>
// // // // //               <b>Start Area:</b> {cluster.properties.row.start_area_code}
// // // // //               <br />
// // // // //               <b>End Area:</b> {cluster.properties.row.end_area_code}
// // // // //               <br />
// // // // //               <b>Category:</b> {cluster.properties.row.category}
// // // // //             </Popup>
// // // // //           </Marker>
// // // // //         );
// // // // //       })}
// // // // //     </>
// // // // //   );
// // // // // }

// // // // // export default function MapView() {
// // // // //   const [rawData, setRawData] = useState<PointFeature[]>([]);
// // // // //   const [filteredData, setFilteredData] = useState<PointFeature[]>([]);

// // // // //   // Filter states
// // // // //   const [categoryFilter, setCategoryFilter] = useState("ALL");
// // // // //   const [startAreaFilter, setStartAreaFilter] = useState("ALL");

// // // // //   // Load CSV
// // // // //   useEffect(() => {
// // // // //     Papa.parse<CSVRow>("/data.csv", {
// // // // //       download: true,
// // // // //       header: true,
// // // // //       skipEmptyLines: true,
// // // // //       complete: (result) => {
// // // // //         const pts: PointFeature[] = [];

// // // // //         result.data.forEach((row) => {
// // // // //           if (!row.start_gps) return;

// // // // //           const [lat, lng] = row.start_gps.split(",").map(Number);
// // // // //           if (isNaN(lat) || isNaN(lng)) return;

// // // // //           pts.push({
// // // // //             type: "Feature",
// // // // //             geometry: { type: "Point", coordinates: [lng, lat] },
// // // // //             properties: { row },
// // // // //           });
// // // // //         });

// // // // //         setRawData(pts);
// // // // //         setFilteredData(pts);
// // // // //       },
// // // // //     });
// // // // //   }, []);

// // // // //   // Apply filters
// // // // //   useEffect(() => {
// // // // //     let updated = rawData;

// // // // //     if (categoryFilter !== "ALL") {
// // // // //       updated = updated.filter(
// // // // //         (p) => p.properties.row.category === categoryFilter
// // // // //       );
// // // // //     }

// // // // //     if (startAreaFilter !== "ALL") {
// // // // //       updated = updated.filter(
// // // // //         (p) => p.properties.row.start_area_code === startAreaFilter
// // // // //       );
// // // // //     }

// // // // //     setFilteredData(updated);
// // // // //   }, [categoryFilter, startAreaFilter, rawData]);

// // // // //   // Extract unique values for filter dropdowns
// // // // //   const categories = Array.from(
// // // // //     new Set(rawData.map((p) => p.properties.row.category))
// // // // //   );

// // // // //   const startAreas = Array.from(
// // // // //     new Set(rawData.map((p) => p.properties.row.start_area_code))
// // // // //   );

// // // // //   return (
// // // // //     <>
// // // // //       {/* FILTER PANEL */}
// // // // //       <div
// // // // //         style={{
// // // // //           position: "absolute",
// // // // //           zIndex: 1000,
// // // // //           background: "white",
// // // // //           padding: "10px",
// // // // //           borderRadius: "8px",
// // // // //           margin: "10px",
// // // // //           boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
// // // // //         }}
// // // // //       >
// // // // //         <h4>Filters</h4>

// // // // //         {/* Category Filter */}
// // // // //         <select
// // // // //           value={categoryFilter}
// // // // //           onChange={(e) => setCategoryFilter(e.target.value)}
// // // // //           style={{ width: "180px", marginBottom: "10px" }}
// // // // //         >
// // // // //           <option value="ALL">All Categories</option>
// // // // //           {categories.map((cat, i) => (
// // // // //             <option key={i} value={cat || ""}>
// // // // //               {cat || "Unknown"}
// // // // //             </option>
// // // // //           ))}
// // // // //         </select>

// // // // //         {/* Start Area Filter */}
// // // // //         <select
// // // // //           value={startAreaFilter}
// // // // //           onChange={(e) => setStartAreaFilter(e.target.value)}
// // // // //           style={{ width: "180px" }}
// // // // //         >
// // // // //           <option value="ALL">All Start Area Codes</option>
// // // // //           {startAreas.map((area, i) => (
// // // // //             <option key={i} value={area || ""}>
// // // // //               {area || "Unknown"}
// // // // //             </option>
// // // // //           ))}
// // // // //         </select>
// // // // //       </div>

// // // // //       {/* MAP */}
// // // // //       <MapContainer
// // // // //         center={[20.5937, 78.9629]}
// // // // //         zoom={5}
// // // // //         style={{ height: "100vh", width: "100%" }}
// // // // //       >
// // // // //         <TileLayer
// // // // //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // // // //           attribution="© OpenStreetMap contributors"
// // // // //         />

// // // // //         <ClusterLayer points={filteredData} />
// // // // //       </MapContainer>
// // // // //     </>
// // // // //   );
// // // // // }


// // // // // "use client";

// // // // // import {
// // // // //   MapContainer,
// // // // //   TileLayer,
// // // // //   Marker,
// // // // //   Popup,
// // // // //   CircleMarker,
// // // // //   useMap,
// // // // // } from "react-leaflet";
// // // // // import { useEffect, useMemo, useState } from "react";
// // // // // import supercluster from "supercluster";
// // // // // import L from "leaflet";
// // // // // import Papa from "papaparse";

// // // // // // CSV row interface
// // // // // interface CSVRow {
// // // // //   start_gps?: string;
// // // // //   start_area_code?: string; // <-- we will call this PINCODE in UI
// // // // //   end_area_code?: string;
// // // // //   category?: string;
// // // // // }

// // // // // interface PointFeature {
// // // // //   type: "Feature";
// // // // //   geometry: { type: "Point"; coordinates: [number, number] };
// // // // //   properties: { row: CSVRow };
// // // // // }

// // // // // const icon = new L.Icon({
// // // // //   iconUrl: "/marker-icon.png",
// // // // //   iconSize: [25, 41],
// // // // //   iconAnchor: [12, 41],
// // // // // });

// // // // // // Cluster renderer
// // // // // function ClusterLayer({ points }: { points: PointFeature[] }) {
// // // // //   const map = useMap();
// // // // //   const [clusters, setClusters] = useState<any[]>([]);

// // // // //   const index = useMemo(() => {
// // // // //     const cluster = new supercluster({
// // // // //       radius: 60,
// // // // //       maxZoom: 17,
// // // // //     });
// // // // //     cluster.load(points);
// // // // //     return cluster;
// // // // //   }, [points]);

// // // // //   useEffect(() => {
// // // // //     const update = () => {
// // // // //       const bounds = map.getBounds();
// // // // //       const zoom = map.getZoom();

// // // // //       const clusterData = index.getClusters(
// // // // //         [
// // // // //           bounds.getWest(),
// // // // //           bounds.getSouth(),
// // // // //           bounds.getEast(),
// // // // //           bounds.getNorth(),
// // // // //         ],
// // // // //         Math.round(zoom)
// // // // //       );

// // // // //       setClusters(clusterData);
// // // // //     };

// // // // //     update();
// // // // //     map.on("moveend", update);

// // // // //     return () => {
// // // // //       map.off("moveend", update);
// // // // //     };
// // // // //   }, [index, map]);

// // // // //   return (
// // // // //     <>
// // // // //       {clusters.map((cluster: any, i: number) => {
// // // // //         const [lng, lat] = cluster.geometry.coordinates;

// // // // //         // Cluster
// // // // //         if (cluster.properties.cluster) {
// // // // //           const count = cluster.properties.point_count;

// // // // //           return (
// // // // //             <CircleMarker
// // // // //               key={i}
// // // // //               center={[lat, lng]}
// // // // //               radius={15 + Math.min(count / 50, 25)}
// // // // //               fillOpacity={0.6}
// // // // //               color="red"
// // // // //               eventHandlers={{
// // // // //                 click: () => {
// // // // //                   const nextZoom = index.getClusterExpansionZoom(
// // // // //                     cluster.properties.cluster_id
// // // // //                   );
// // // // //                   map.setView([lat, lng], nextZoom);
// // // // //                 },
// // // // //               }}
// // // // //             >
// // // // //               <Popup>{count} locations</Popup>
// // // // //             </CircleMarker>
// // // // //           );
// // // // //         }

// // // // //         // Single point
// // // // //         return (
// // // // //           <Marker key={i} position={[lat, lng]} icon={icon}>
// // // // //             <Popup>
// // // // //               <b>Pincode:</b> {cluster.properties.row.start_area_code}
// // // // //               <br />
// // // // //               <b>End Area:</b> {cluster.properties.row.end_area_code}
// // // // //               <br />
// // // // //               <b>Category:</b> {cluster.properties.row.category}
// // // // //             </Popup>
// // // // //           </Marker>
// // // // //         );
// // // // //       })}
// // // // //     </>
// // // // //   );
// // // // // }

// // // // // export default function MapView() {
// // // // //   const [rawData, setRawData] = useState<PointFeature[]>([]);
// // // // //   const [filteredData, setFilteredData] = useState<PointFeature[]>([]);

// // // // //   // Filter states
// // // // //   const [categoryFilter, setCategoryFilter] = useState("ALL");
// // // // //   const [pincodeFilter, setPincodeFilter] = useState("ALL");

// // // // //   // Load CSV
// // // // //   useEffect(() => {
// // // // //     Papa.parse<CSVRow>("/data.csv", {
// // // // //       download: true,
// // // // //       header: true,
// // // // //       skipEmptyLines: true,
// // // // //       complete: (result) => {
// // // // //         const pts: PointFeature[] = [];

// // // // //         result.data.forEach((row) => {
// // // // //           if (!row.start_gps) return;

// // // // //           const [lat, lng] = row.start_gps.split(",").map(Number);
// // // // //           if (isNaN(lat) || isNaN(lng)) return;

// // // // //           pts.push({
// // // // //             type: "Feature",
// // // // //             geometry: { type: "Point", coordinates: [lng, lat] },
// // // // //             properties: { row },
// // // // //           });
// // // // //         });

// // // // //         setRawData(pts);
// // // // //         setFilteredData(pts);
// // // // //       },
// // // // //     });
// // // // //   }, []);

// // // // //   // Apply filters
// // // // //   useEffect(() => {
// // // // //     let updated = rawData;

// // // // //     if (categoryFilter !== "ALL") {
// // // // //       updated = updated.filter(
// // // // //         (p) => p.properties.row.category === categoryFilter
// // // // //       );
// // // // //     }

// // // // //     if (pincodeFilter !== "ALL") {
// // // // //       updated = updated.filter(
// // // // //         (p) => p.properties.row.start_area_code === pincodeFilter
// // // // //       );
// // // // //     }

// // // // //     setFilteredData(updated);
// // // // //   }, [categoryFilter, pincodeFilter, rawData]);

// // // // //   // Extract unique dropdown values
// // // // //   const categories = Array.from(
// // // // //     new Set(rawData.map((p) => p.properties.row.category))
// // // // //   );

// // // // //   const pincodes = Array.from(
// // // // //     new Set(rawData.map((p) => p.properties.row.start_area_code))
// // // // //   );

// // // // //   return (
// // // // //     <>
// // // // //       {/* FILTER PANEL */}
// // // // //       <div
// // // // //         style={{
// // // // //           position: "absolute",
// // // // //           zIndex: 1000,
// // // // //           background: "white",
// // // // //           padding: "10px",
// // // // //           borderRadius: "8px",
// // // // //           margin: "10px",
// // // // //           boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
// // // // //         }}
// // // // //       >
// // // // //         <h4>Filters</h4>

// // // // //         {/* Category Filter */}
// // // // //         <select
// // // // //           value={categoryFilter}
// // // // //           onChange={(e) => setCategoryFilter(e.target.value)}
// // // // //           style={{ width: "180px", marginBottom: "10px" }}
// // // // //         >
// // // // //           <option value="ALL">All Categories</option>
// // // // //           {categories.map((cat, i) => (
// // // // //             <option key={i} value={cat || ""}>
// // // // //               {cat || "Unknown"}
// // // // //             </option>
// // // // //           ))}
// // // // //         </select>

// // // // //         {/* PINCODE Filter */}
// // // // //         <select
// // // // //           value={pincodeFilter}
// // // // //           onChange={(e) => setPincodeFilter(e.target.value)}
// // // // //           style={{ width: "180px" }}
// // // // //         >
// // // // //           <option value="ALL">All Pincodes</option>
// // // // //           {pincodes.map((p, i) => (
// // // // //             <option key={i} value={p || ""}>
// // // // //               {p || "Unknown"}
// // // // //             </option>
// // // // //           ))}
// // // // //         </select>
// // // // //       </div>

// // // // //       {/* MAP */}
// // // // //       <MapContainer
// // // // //         center={[20.5937, 78.9629]}
// // // // //         zoom={5}
// // // // //         style={{ height: "100vh", width: "100%" }}
// // // // //       >
// // // // //         <TileLayer
// // // // //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // // // //           attribution="© OpenStreetMap contributors"
// // // // //         />

// // // // //         <ClusterLayer points={filteredData} />
// // // // //       </MapContainer>
// // // // //     </>
// // // // //   );
// // // // // }


// // // // "use client";

// // // // import {
// // // //   MapContainer,
// // // //   TileLayer,
// // // //   Marker,
// // // //   Popup,
// // // //   CircleMarker,
// // // //   Tooltip,
// // // //   useMap,
// // // // } from "react-leaflet";
// // // // import { useEffect, useMemo, useState } from "react";
// // // // import supercluster from "supercluster";
// // // // import L from "leaflet";
// // // // import Papa from "papaparse";

// // // // // CSV row interface
// // // // interface CSVRow {
// // // //   start_gps?: string;
// // // //   start_area_code?: string; // PINCODE
// // // //   end_area_code?: string;
// // // //   category?: string;
// // // // }

// // // // interface PointFeature {
// // // //   type: "Feature";
// // // //   geometry: { type: "Point"; coordinates: [number, number] };
// // // //   properties: { row: CSVRow };
// // // // }

// // // // const icon = new L.Icon({
// // // //   iconUrl: "/marker-icon.png",
// // // //   iconSize: [25, 41],
// // // //   iconAnchor: [12, 41],
// // // // });

// // // // // Cluster renderer
// // // // function ClusterLayer({ points }: { points: PointFeature[] }) {
// // // //   const map = useMap();
// // // //   const [clusters, setClusters] = useState<any[]>([]);

// // // //   const index = useMemo(() => {
// // // //     const cluster = new supercluster({
// // // //       radius: 60,
// // // //       maxZoom: 17,
// // // //     });
// // // //     cluster.load(points);
// // // //     return cluster;
// // // //   }, [points]);

// // // //   useEffect(() => {
// // // //     const update = () => {
// // // //       const bounds = map.getBounds();
// // // //       const zoom = map.getZoom();

// // // //       const clusterData = index.getClusters(
// // // //         [
// // // //           bounds.getWest(),
// // // //           bounds.getSouth(),
// // // //           bounds.getEast(),
// // // //           bounds.getNorth(),
// // // //         ],
// // // //         Math.round(zoom)
// // // //       );

// // // //       setClusters(clusterData);
// // // //     };

// // // //     update();
// // // //     map.on("moveend", update);

// // // //     return () => {
// // // //       map.off("moveend", update);
// // // //     };
// // // //   }, [index, map]);

// // // //   return (
// // // //     <>
// // // //       {clusters.map((cluster: any, i: number) => {
// // // //         const [lng, lat] = cluster.geometry.coordinates;

// // // //         // Cluster
// // // //         if (cluster.properties.cluster) {
// // // //           const count = cluster.properties.point_count;

// // // //           return (
// // // //             <CircleMarker
// // // //               key={i}
// // // //               center={[lat, lng]}
// // // //               radius={15 + Math.min(count / 50, 25)}
// // // //               fillOpacity={0.6}
// // // //               color="red"
// // // //               eventHandlers={{
// // // //                 click: () => {
// // // //                   const nextZoom = index.getClusterExpansionZoom(
// // // //                     cluster.properties.cluster_id
// // // //                   );
// // // //                   map.setView([lat, lng], nextZoom);
// // // //                 },
// // // //               }}
// // // //             >
// // // //               {/* 🔵 Tooltip added */}
// // // //               <Tooltip permanent direction="center">
// // // //                 {count} locations
// // // //               </Tooltip>

// // // //               <Popup>{count} locations</Popup>
// // // //             </CircleMarker>
// // // //           );
// // // //         }

// // // //         // Single point
// // // //         return (
// // // //           <Marker key={i} position={[lat, lng]} icon={icon}>
// // // //             {/* 🟢 Tooltip added */}
// // // //             <Tooltip direction="top">
// // // //               Pincode: {cluster.properties.row.start_area_code}
// // // //             </Tooltip>

// // // //             <Popup>
// // // //               <b>Pincode:</b> {cluster.properties.row.start_area_code}
// // // //               <br />
// // // //               <b>End Area:</b> {cluster.properties.row.end_area_code}
// // // //               <br />
// // // //               <b>Category:</b> {cluster.properties.row.category}
// // // //             </Popup>
// // // //           </Marker>
// // // //         );
// // // //       })}
// // // //     </>
// // // //   );
// // // // }

// // // // export default function MapView() {
// // // //   const [rawData, setRawData] = useState<PointFeature[]>([]);
// // // //   const [filteredData, setFilteredData] = useState<PointFeature[]>([]);

// // // //   // Filter states
// // // //   const [categoryFilter, setCategoryFilter] = useState("ALL");
// // // //   const [pincodeFilter, setPincodeFilter] = useState("ALL");

// // // //   // Load CSV
// // // //   useEffect(() => {
// // // //     Papa.parse<CSVRow>("/data.csv", {
// // // //       download: true,
// // // //       header: true,
// // // //       skipEmptyLines: true,
// // // //       complete: (result) => {
// // // //         const pts: PointFeature[] = [];

// // // //         result.data.forEach((row) => {
// // // //           if (!row.start_gps) return;

// // // //           const [lat, lng] = row.start_gps.split(",").map(Number);
// // // //           if (isNaN(lat) || isNaN(lng)) return;

// // // //           pts.push({
// // // //             type: "Feature",
// // // //             geometry: { type: "Point", coordinates: [lng, lat] },
// // // //             properties: { row },
// // // //           });
// // // //         });

// // // //         setRawData(pts);
// // // //         setFilteredData(pts);
// // // //       },
// // // //     });
// // // //   }, []);

// // // //   // Apply filters
// // // //   useEffect(() => {
// // // //     let updated = rawData;

// // // //     if (categoryFilter !== "ALL") {
// // // //       updated = updated.filter(
// // // //         (p) => p.properties.row.category === categoryFilter
// // // //       );
// // // //     }

// // // //     if (pincodeFilter !== "ALL") {
// // // //       updated = updated.filter(
// // // //         (p) => p.properties.row.start_area_code === pincodeFilter
// // // //       );
// // // //     }

// // // //     setFilteredData(updated);
// // // //   }, [categoryFilter, pincodeFilter, rawData]);

// // // //   // Extract dropdown values
// // // //   const categories = Array.from(
// // // //     new Set(rawData.map((p) => p.properties.row.category))
// // // //   );

// // // //   const pincodes = Array.from(
// // // //     new Set(rawData.map((p) => p.properties.row.start_area_code))
// // // //   );

// // // //   return (
// // // //     <>
// // // //       {/* FILTER PANEL */}
// // // //       <div
// // // //         style={{
// // // //           position: "absolute",
// // // //           zIndex: 1000,
// // // //           background: "white",
// // // //           padding: "10px",
// // // //           borderRadius: "8px",
// // // //           margin: "10px",
// // // //           boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
// // // //         }}
// // // //       >
// // // //         <h4>Filters</h4>

// // // //         <select
// // // //           value={categoryFilter}
// // // //           onChange={(e) => setCategoryFilter(e.target.value)}
// // // //           style={{ width: "180px", marginBottom: "10px" }}
// // // //         >
// // // //           <option value="ALL">All Categories</option>
// // // //           {categories.map((cat, i) => (
// // // //             <option key={i} value={cat || ""}>
// // // //               {cat || "Unknown"}
// // // //             </option>
// // // //           ))}
// // // //         </select>

// // // //         <select
// // // //           value={pincodeFilter}
// // // //           onChange={(e) => setPincodeFilter(e.target.value)}
// // // //           style={{ width: "180px" }}
// // // //         >
// // // //           <option value="ALL">All Pincodes</option>
// // // //           {pincodes.map((p, i) => (
// // // //             <option key={i} value={p || ""}>
// // // //               {p || "Unknown"}
// // // //             </option>
// // // //           ))}
// // // //         </select>
// // // //       </div>

// // // //       {/* MAP */}
// // // //       <MapContainer
// // // //         center={[20.5937, 78.9629]}
// // // //         zoom={5}
// // // //         style={{ height: "100vh", width: "100%" }}
// // // //       >
// // // //         <TileLayer
// // // //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // // //           attribution="© OpenStreetMap contributors"
// // // //         />

// // // //         <ClusterLayer points={filteredData} />
// // // //       </MapContainer>
// // // //     </>
// // // //   );
// // // // }


// // // // "use client";

// // // // import {
// // // //   MapContainer,
// // // //   TileLayer,
// // // //   Marker,
// // // //   Popup,
// // // //   CircleMarker,
// // // //   Tooltip,
// // // //   useMap,
// // // // } from "react-leaflet";
// // // // import { useEffect, useMemo, useState } from "react";
// // // // import supercluster from "supercluster";
// // // // import L from "leaflet";
// // // // import Papa from "papaparse";

// // // // // CSV row interface
// // // // interface CSVRow {
// // // //   start_gps?: string;
// // // //   start_area_code?: string; // PINCODE
// // // //   end_area_code?: string;
// // // //   category?: string;
// // // // }

// // // // interface PointFeature {
// // // //   type: "Feature";
// // // //   geometry: { type: "Point"; coordinates: [number, number] };
// // // //   properties: { row: CSVRow };
// // // // }

// // // // const icon = new L.Icon({
// // // //   iconUrl: "/marker-icon.png",
// // // //   iconSize: [25, 41],
// // // //   iconAnchor: [12, 41],
// // // // });

// // // // // Cluster renderer
// // // // function ClusterLayer({ points }: { points: PointFeature[] }) {
// // // //   const map = useMap();
// // // //   const [clusters, setClusters] = useState<any[]>([]);

// // // //   const index = useMemo(() => {
// // // //     const cluster = new supercluster({
// // // //       radius: 60,
// // // //       maxZoom: 17,
// // // //     });
// // // //     cluster.load(points);
// // // //     return cluster;
// // // //   }, [points]);

// // // //   useEffect(() => {
// // // //     const update = () => {
// // // //       const bounds = map.getBounds();
// // // //       const zoom = map.getZoom();

// // // //       const clusterData = index.getClusters(
// // // //         [
// // // //           bounds.getWest(),
// // // //           bounds.getSouth(),
// // // //           bounds.getEast(),
// // // //           bounds.getNorth(),
// // // //         ],
// // // //         Math.round(zoom)
// // // //       );

// // // //       setClusters(clusterData);
// // // //     };

// // // //     update();
// // // //     map.on("moveend", update);

// // // //     return () => {
// // // //       map.off("moveend", update);
// // // //     };
// // // //   }, [index, map]);

// // // //   return (
// // // //     <>
// // // //       {clusters.map((cluster: any, i: number) => {
// // // //         const [lng, lat] = cluster.geometry.coordinates;

// // // //         // Cluster
// // // //         if (cluster.properties.cluster) {
// // // //           const count = cluster.properties.point_count;

// // // //           return (
// // // //             <CircleMarker
// // // //               key={i}
// // // //               center={[lat, lng]}
// // // //               radius={15 + Math.min(count / 50, 25)}
// // // //               fillOpacity={0.6}
// // // //               color="red"
// // // //               eventHandlers={{
// // // //                 click: () => {
// // // //                   const nextZoom = index.getClusterExpansionZoom(
// // // //                     cluster.properties.cluster_id
// // // //                   );
// // // //                   map.setView([lat, lng], nextZoom);
// // // //                 },
// // // //               }}
// // // //             >
// // // //               {/* Tooltip only on hover */}
// // // //               <Tooltip direction="top">
// // // //                 {count} locations
// // // //               </Tooltip>

// // // //               <Popup>{count} locations</Popup>
// // // //             </CircleMarker>
// // // //           );
// // // //         }

// // // //         // Single point
// // // //         return (
// // // //           <Marker key={i} position={[lat, lng]} icon={icon}>
// // // //             {/* Tooltip only on hover */}
// // // //             <Tooltip direction="top">
// // // //               Pincode: {cluster.properties.row.start_area_code}
// // // //             </Tooltip>

// // // //             <Popup>
// // // //               <b>Pincode:</b> {cluster.properties.row.start_area_code}
// // // //               <br />
// // // //               <b>End Area:</b> {cluster.properties.row.end_area_code}
// // // //               <br />
// // // //               <b>Category:</b> {cluster.properties.row.category}
// // // //             </Popup>
// // // //           </Marker>
// // // //         );
// // // //       })}
// // // //     </>
// // // //   );
// // // // }

// // // // export default function MapView() {
// // // //   const [rawData, setRawData] = useState<PointFeature[]>([]);
// // // //   const [filteredData, setFilteredData] = useState<PointFeature[]>([]);

// // // //   // Filter states
// // // //   const [categoryFilter, setCategoryFilter] = useState("ALL");
// // // //   const [pincodeFilter, setPincodeFilter] = useState("ALL");

// // // //   // Load CSV
// // // //   useEffect(() => {
// // // //     Papa.parse<CSVRow>("/data.csv", {
// // // //       download: true,
// // // //       header: true,
// // // //       skipEmptyLines: true,
// // // //       complete: (result) => {
// // // //         const pts: PointFeature[] = [];

// // // //         result.data.forEach((row) => {
// // // //           if (!row.start_gps) return;

// // // //           const [lat, lng] = row.start_gps.split(",").map(Number);
// // // //           if (isNaN(lat) || isNaN(lng)) return;

// // // //           pts.push({
// // // //             type: "Feature",
// // // //             geometry: { type: "Point", coordinates: [lng, lat] },
// // // //             properties: { row },
// // // //           });
// // // //         });

// // // //         setRawData(pts);
// // // //         setFilteredData(pts);
// // // //       },
// // // //     });
// // // //   }, []);

// // // //   // Apply filters
// // // //   useEffect(() => {
// // // //     let updated = rawData;

// // // //     if (categoryFilter !== "ALL") {
// // // //       updated = updated.filter(
// // // //         (p) => p.properties.row.category === categoryFilter
// // // //       );
// // // //     }

// // // //     if (pincodeFilter !== "ALL") {
// // // //       updated = updated.filter(
// // // //         (p) => p.properties.row.start_area_code === pincodeFilter
// // // //       );
// // // //     }

// // // //     setFilteredData(updated);
// // // //   }, [categoryFilter, pincodeFilter, rawData]);

// // // //   // Extract dropdown values
// // // //   const categories = Array.from(
// // // //     new Set(rawData.map((p) => p.properties.row.category))
// // // //   );

// // // //   const pincodes = Array.from(
// // // //     new Set(rawData.map((p) => p.properties.row.start_area_code))
// // // //   );

// // // //   return (
// // // //     <>
// // // //       {/* FILTER PANEL */}
// // // //       <div
// // // //         style={{
// // // //           position: "absolute",
// // // //           zIndex: 1000,
// // // //           background: "white",
// // // //           padding: "10px",
// // // //           borderRadius: "8px",
// // // //           margin: "10px",
// // // //           boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
// // // //         }}
// // // //       >
// // // //         <h4>Filters</h4>

// // // //         <select
// // // //           value={categoryFilter}
// // // //           onChange={(e) => setCategoryFilter(e.target.value)}
// // // //           style={{ width: "180px", marginBottom: "10px" }}
// // // //         >
// // // //           <option value="ALL">All Categories</option>
// // // //           {categories.map((cat, i) => (
// // // //             <option key={i} value={cat || ""}>
// // // //               {cat || "Unknown"}
// // // //             </option>
// // // //           ))}
// // // //         </select>

// // // //         <select
// // // //           value={pincodeFilter}
// // // //           onChange={(e) => setPincodeFilter(e.target.value)}
// // // //           style={{ width: "180px" }}
// // // //         >
// // // //           <option value="ALL">All Pincodes</option>
// // // //           {pincodes.map((p, i) => (
// // // //             <option key={i} value={p || ""}>
// // // //               {p || "Unknown"}
// // // //             </option>
// // // //           ))}
// // // //         </select>
// // // //       </div>

// // // //       {/* MAP */}
// // // //       <MapContainer
// // // //         center={[20.5937, 78.9629]}
// // // //         zoom={5}
// // // //         style={{ height: "100vh", width: "100%" }}
// // // //       >
// // // //         <TileLayer
// // // //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // // //           attribution="© OpenStreetMap contributors"
// // // //         />

// // // //         <ClusterLayer points={filteredData} />
// // // //       </MapContainer>
// // // //     </>
// // // //   );
// // // // }


// // // // "use client";

// // // // import {
// // // //   MapContainer,
// // // //   TileLayer,
// // // //   Polygon,
// // // //   Marker,
// // // //   Tooltip,
// // // //   Popup,
// // // //   useMap,
// // // // } from "react-leaflet";
// // // // import { useState, useEffect, useMemo } from "react";
// // // // import Papa from "papaparse";
// // // // import * as h3 from "h3-js";
// // // // import L from "leaflet";
// // // // import supercluster from "supercluster";

// // // // // CSV interface
// // // // interface CSVRow {
// // // //   start_gps?: string;
// // // //   start_area_code?: string;
// // // // }

// // // // interface PointFeature {
// // // //   type: "Feature";
// // // //   geometry: { type: "Point"; coordinates: [number, number] };
// // // //   properties: { row: CSVRow };
// // // // }

// // // // // Marker icon
// // // // const icon = new L.Icon({
// // // //   iconUrl: "/marker-icon.png",
// // // //   iconSize: [25, 41],
// // // //   iconAnchor: [12, 41],
// // // // });

// // // // // Color rules
// // // // function getColor(count: number) {
// // // //   if (count > 2000) return "#0000FF";
// // // //   if (count > 1000) return "#FF00FF";
// // // //   if (count > 500) return "#FFFF00";
// // // //   if (count > 100) return "#00FF00";
// // // //   if (count > 50) return "#FFA500";
// // // //   return "#FF0000";
// // // // }

// // // // // Cluster Layer
// // // // function ClusterLayer({ points }: { points: PointFeature[] }) {
// // // //   const map = useMap();
// // // //   const [clusters, setClusters] = useState<any[]>([]);

// // // //   const index = useMemo(() => {
// // // //     const sc = new supercluster({
// // // //       radius: 60,
// // // //       maxZoom: 13,
// // // //     });
// // // //     sc.load(points);
// // // //     return sc;
// // // //   }, [points]);


// // // //   useEffect(() => {
// // // //   const update = () => {
// // // //     const bounds = map.getBounds();
// // // //     const zoom = map.getZoom();
// // // //     const c = index.getClusters(
// // // //       [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
// // // //       zoom
// // // //     );
// // // //     setClusters(c);
// // // //   };

// // // //   update();
// // // //   map.on("moveend", update);

// // // //   return () => {
// // // //     map.off("moveend", update);  // now cleanup returns void
// // // //   };
// // // // }, [index, map]);

// // // //   return (
// // // //     <>
// // // //       {clusters.map((c: any, i: number) => {
// // // //         const [lng, lat] = c.geometry.coordinates;

// // // //         if (c.properties.cluster) {
// // // //           return (
// // // //             <Marker key={i} position={[lat, lng]} icon={icon}>
// // // //               <Popup>{c.properties.point_count} points</Popup>
// // // //             </Marker>
// // // //           );
// // // //         }
// // // //         return null;
// // // //       })}
// // // //     </>
// // // //   );
// // // // }

// // // // // MAIN COMPONENT
// // // // export default function MapView() {
// // // //   const [rawPoints, setRawPoints] = useState<PointFeature[]>([]);
// // // //   const [hexagons, setHexagons] = useState<any[]>([]);

// // // //   useEffect(() => {
// // // //     Papa.parse<CSVRow>("/data.csv", {
// // // //       download: true,
// // // //       header: true,
// // // //       skipEmptyLines: true,
// // // //       complete: (res) => {
// // // //         const pts: PointFeature[] = [];

// // // //         res.data.forEach((row) => {
// // // //           if (!row.start_gps) return;

// // // //           const [lat, lng] = row.start_gps.split(",").map(Number);
// // // //           if (isNaN(lat) || isNaN(lng)) return;

// // // //           pts.push({
// // // //             type: "Feature",
// // // //             geometry: { type: "Point", coordinates: [lng, lat] },
// // // //             properties: { row },
// // // //           });
// // // //         });

// // // //         setRawPoints(pts);

// // // //         // Group by pincode
// // // //         const groups: any = {};
// // // //         pts.forEach((p) => {
// // // //           const pin = p.properties.row.start_area_code;
// // // //           if (!groups[pin]) groups[pin] = [];
// // // //           groups[pin].push(p);
// // // //         });

// // // //         // Convert pincode group → H3 polygon
// // // //         const hexes: any[] = [];

// // // //         Object.keys(groups).forEach((pincode) => {
// // // //           const list = groups[pincode];

// // // //           const latAvg =
// // // //             list.reduce(
// // // //               (sum: number, p: PointFeature) => sum + p.geometry.coordinates[1],
// // // //               0
// // // //             ) / list.length;

// // // //           const lngAvg =
// // // //             list.reduce(
// // // //               (sum: number, p: PointFeature) => sum + p.geometry.coordinates[0],
// // // //               0
// // // //             ) / list.length;

// // // //           // LOWER RESOLUTION = BIGGER polygons
// // // //           const h3Index = h3.latLngToCell(latAvg, lngAvg, 5);

// // // //           const boundary = h3.cellToBoundary(h3Index).map((c) => [
// // // //             c[0], // lat
// // // //             c[1], // lng
// // // //           ]);

// // // //           hexes.push({
// // // //             pincode,
// // // //             count: list.length,
// // // //             coords: boundary,
// // // //           });
// // // //         });

// // // //         setHexagons(hexes);
// // // //       },
// // // //     });
// // // //   }, []);

// // // //   return (
// // // //     <MapContainer
// // // //       center={[22.5, 78.9]}
// // // //       zoom={5}
// // // //       style={{ height: "100vh", width: "100%" }}
// // // //     >
// // // //       <TileLayer
// // // //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // // //         attribution="© OpenStreetMap contributors"
// // // //       />

// // // //       {/* POLYGONS */}
// // // //       {hexagons.map((h, i) => (
// // // //         <Polygon
// // // //           key={i}
// // // //           positions={h.coords}
// // // //           pathOptions={{
// // // //             color: getColor(h.count),
// // // //             fillColor: getColor(h.count),
// // // //             fillOpacity: 0.45,
// // // //             weight: 2,
// // // //           }}
// // // //         >
// // // //           <Tooltip>
// // // //             Pincode {h.pincode} — Count: {h.count}
// // // //           </Tooltip>
// // // //         </Polygon>
// // // //       ))}

// // // //       <ClusterLayer points={rawPoints} />
// // // //     </MapContainer>
// // // //   );
// // // // }


// // // // "use client";

// // // // import {
// // // //   MapContainer,
// // // //   TileLayer,
// // // //   Polygon,
// // // //   Marker,
// // // //   Tooltip,
// // // //   Popup,
// // // //   useMap,
// // // // } from "react-leaflet";
// // // // import { useState, useEffect, useMemo } from "react";
// // // // import Papa from "papaparse";
// // // // import * as h3 from "h3-js";
// // // // import L from "leaflet";
// // // // import supercluster from "supercluster";

// // // // // CSV interface
// // // // interface CSVRow {
// // // //   start_gps?: string;
// // // //   start_area_code?: string;
// // // // }

// // // // interface PointFeature {
// // // //   type: "Feature";
// // // //   geometry: { type: "Point"; coordinates: [number, number] };
// // // //   properties: { row: CSVRow };
// // // // }

// // // // // Marker icon
// // // // const icon = new L.Icon({
// // // //   iconUrl: "/marker-icon.png",
// // // //   iconSize: [25, 41],
// // // //   iconAnchor: [12, 41],
// // // // });

// // // // // Color rules
// // // // function getColor(count: number) {
// // // //   if (count > 2000) return "#0000FF";
// // // //   if (count > 1000) return "#FF00FF";
// // // //   if (count > 500) return "#FFFF00";
// // // //   if (count > 100) return "#00FF00";
// // // //   if (count > 50) return "#FFA500";
// // // //   return "#FF0000";
// // // // }

// // // // // Cluster Layer
// // // // function ClusterLayer({ points }: { points: PointFeature[] }) {
// // // //   const map = useMap();
// // // //   const [clusters, setClusters] = useState<any[]>([]);

// // // //   const index = useMemo(() => {
// // // //     const sc = new supercluster({
// // // //       radius: 60,
// // // //       maxZoom: 13,
// // // //     });
// // // //     sc.load(points);
// // // //     return sc;
// // // //   }, [points]);

// // // //   useEffect(() => {
// // // //     const update = () => {
// // // //       const bounds = map.getBounds();
// // // //       const zoom = map.getZoom();
// // // //       const c = index.getClusters(
// // // //         [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
// // // //         zoom
// // // //       );
// // // //       setClusters(c);
// // // //     };

// // // //     update();
// // // //     map.on("moveend", update);

// // // //     return () => {
// // // //       map.off("moveend", update);
// // // //     };
// // // //   }, [index, map]);

// // // //   return (
// // // //     <>
// // // //       {clusters.map((c: any, i: number) => {
// // // //         const [lng, lat] = c.geometry.coordinates;

// // // //         if (c.properties.cluster) {
// // // //           return (
// // // //             <Marker key={i} position={[lat, lng]} icon={icon}>
// // // //               <Popup>{c.properties.point_count} points</Popup>
// // // //             </Marker>
// // // //           );
// // // //         }
// // // //         return null;
// // // //       })}
// // // //     </>
// // // //   );
// // // // }

// // // // // MAIN COMPONENT
// // // // export default function MapView() {
// // // //   const [rawPoints, setRawPoints] = useState<PointFeature[]>([]);
// // // //   const [hexagons, setHexagons] = useState<any[]>([]);

// // // //   useEffect(() => {
// // // //     Papa.parse<CSVRow>("/data.csv", {
// // // //       download: true,
// // // //       header: true,
// // // //       skipEmptyLines: true,
// // // //       complete: (res) => {
// // // //         const pts: PointFeature[] = [];

// // // //         res.data.forEach((row) => {
// // // //           if (!row.start_gps) return;

// // // //           const [lat, lng] = row.start_gps.split(",").map(Number);
// // // //           if (isNaN(lat) || isNaN(lng)) return;

// // // //           pts.push({
// // // //             type: "Feature",
// // // //             geometry: { type: "Point", coordinates: [lng, lat] },
// // // //             properties: { row },
// // // //           });
// // // //         });

// // // //         setRawPoints(pts);

// // // //         // Group by pincode
// // // //         const groups: Record<string, PointFeature[]> = {};

// // // //         pts.forEach((p) => {
// // // //           const pin = p.properties.row.start_area_code ?? "UNKNOWN"; // FIXED
// // // //           if (!groups[pin]) groups[pin] = [];
// // // //           groups[pin].push(p);
// // // //         });

// // // //         // Convert pincode group → H3 polygon
// // // //         const hexes: any[] = [];

// // // //         Object.keys(groups).forEach((pincode) => {
// // // //           const list = groups[pincode];

// // // //           const latAvg =
// // // //             list.reduce(
// // // //               (sum: number, p: PointFeature) => sum + p.geometry.coordinates[1],
// // // //               0
// // // //             ) / list.length;

// // // //           const lngAvg =
// // // //             list.reduce(
// // // //               (sum: number, p: PointFeature) => sum + p.geometry.coordinates[0],
// // // //               0
// // // //             ) / list.length;

// // // //           // LOWER RESOLUTION → BIGGER polygon
// // // //           const h3Index = h3.latLngToCell(latAvg, lngAvg, 5);

// // // //           const boundary = h3.cellToBoundary(h3Index).map((c) => [
// // // //             c[0], // lat
// // // //             c[1], // lng
// // // //           ]);

// // // //           hexes.push({
// // // //             pincode,
// // // //             count: list.length,
// // // //             coords: boundary,
// // // //           });
// // // //         });

// // // //         setHexagons(hexes);
// // // //       },
// // // //     });
// // // //   }, []);

// // // //   return (
// // // //     <MapContainer
// // // //       center={[22.5, 78.9]}
// // // //       zoom={5}
// // // //       style={{ height: "100vh", width: "100%" }}
// // // //     >
// // // //       <TileLayer
// // // //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // // //         attribution="© OpenStreetMap contributors"
// // // //       />

// // // //       {/* POLYGONS */}
// // // //       {hexagons.map((h, i) => (
// // // //         <Polygon
// // // //           key={i}
// // // //           positions={h.coords}
// // // //           pathOptions={{
// // // //             color: getColor(h.count),
// // // //             fillColor: getColor(h.count),
// // // //             fillOpacity: 0.45,
// // // //             weight: 2,
// // // //           }}
// // // //         >
// // // //           <Tooltip>
// // // //             Pincode {h.pincode} — Count: {h.count}
// // // //           </Tooltip>
// // // //         </Polygon>
// // // //       ))}

// // // //       <ClusterLayer points={rawPoints} />
// // // //     </MapContainer>
// // // //   );
// // // // }



// // // // FULL UPDATED CODE WITH POINT VISUALIZATION
// // // "use client";

// // // import {
// // //   MapContainer,
// // //   TileLayer,
// // //   Polygon,
// // //   Marker,
// // //   Tooltip,
// // //   Popup,
// // //   useMap,
// // // } from "react-leaflet";
// // // import { useState, useEffect, useMemo } from "react";
// // // import Papa from "papaparse";
// // // import * as h3 from "h3-js";
// // // import L from "leaflet";
// // // import supercluster from "supercluster";

// // // // CSV interface
// // // interface CSVRow {
// // //   start_gps?: string;
// // //   start_area_code?: string;
// // //   category?: string;
// // // }

// // // interface PointFeature {
// // //   type: "Feature";
// // //   geometry: { type: "Point"; coordinates: [number, number] };
// // //   properties: { row: CSVRow };
// // // }

// // // // Marker icon
// // // const icon = new L.Icon({
// // //   iconUrl: "/marker-icon.png",
// // //   iconSize: [25, 41],
// // //   iconAnchor: [12, 41],
// // // });

// // // // Color rules
// // // function getColor(count: number) {
// // //   if (count > 2000) return "#0000FF";
// // //   if (count > 1000) return "#FF00FF";
// // //   if (count > 500) return "#FFFF00";
// // //   if (count > 100) return "#00FF00";
// // //   if (count > 50) return "#FFA500";
// // //   return "#FF0000";
// // // }

// // // // Cluster Layer
// // // function ClusterLayer({ points }: { points: PointFeature[] }) {
// // //   const map = useMap();
// // //   const [clusters, setClusters] = useState<any[]>([]);

// // //   const index = useMemo(() => {
// // //     const sc = new supercluster({ radius: 60, maxZoom: 13 });
// // //     sc.load(points);
// // //     return sc;
// // //   }, [points]);

// // //   useEffect(() => {
// // //     const update = () => {
// // //       const bounds = map.getBounds();
// // //       const zoom = map.getZoom();
// // //       const c = index.getClusters([
// // //         bounds.getWest(),
// // //         bounds.getSouth(),
// // //         bounds.getEast(),
// // //         bounds.getNorth(),
// // //       ], zoom);
// // //       setClusters(c);
// // //     };

// // //     update();
// // //     map.on("moveend", update);

// // //     return () => {
// // //       map.off("moveend", update);
// // //     };
// // //   }, [index, map]);

// // //   return (
// // //     <>
// // //       {clusters.map((c: any, i: number) => {
// // //         const [lng, lat] = c.geometry.coordinates;

// // //         if (c.properties.cluster) {
// // //           return (
// // //             <Marker key={i} position={[lat, lng]} icon={icon}>
// // //               <Popup>{c.properties.point_count} points</Popup>
// // //             </Marker>
// // //           );
// // //         }

// // //         return (
// // //           <Marker key={i} position={[lat, lng]} icon={icon}>
// // //             <Popup>
// // //               Lat: {lat}, Lng: {lng}
// // //               <br />
// // //               Pincode: {c.properties.row.start_area_code}
// // //               <br />
// // //               Category: {c.properties.row.category}
// // //             </Popup>
// // //           </Marker>
// // //         );
// // //       })}
// // //     </>
// // //   );
// // // }

// // // // MAIN COMPONENT
// // // export default function MapView() {
// // //   const [rawPoints, setRawPoints] = useState<PointFeature[]>([]);
// // //   const [hexagons, setHexagons] = useState<any[]>([]);
// // //   const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
// // //   const [selectedPincode, setSelectedPincode] = useState<string>("ALL");
// // //   const [pincodes, setPincodes] = useState<string[]>([]);
// // //   const [categories, setCategories] = useState<string[]>([]);

// // //   useEffect(() => {
// // //     Papa.parse<CSVRow>("/data.csv", {
// // //       download: true,
// // //       header: true,
// // //       skipEmptyLines: true,
// // //       complete: (res) => {
// // //         const pts: PointFeature[] = [];
// // //         const pincodeSet = new Set<string>();
// // //         const categorySet = new Set<string>();

// // //         res.data.forEach((row) => {
// // //           if (!row.start_gps) return;

// // //           const [lat, lng] = row.start_gps.split(",").map(Number);
// // //           if (isNaN(lat) || isNaN(lng)) return;

// // //           pincodeSet.add(row.start_area_code || "UNKNOWN");
// // //           if (row.category) categorySet.add(row.category);

// // //           pts.push({
// // //             type: "Feature",
// // //             geometry: { type: "Point", coordinates: [lng, lat] },
// // //             properties: { row },
// // //           });
// // //         });

// // //         setRawPoints(pts);
// // //         setPincodes(["ALL", ...Array.from(pincodeSet)]);
// // //         setCategories(["ALL", ...Array.from(categorySet)]);
// // //       },
// // //     });
// // //   }, []);

// // //   // Filter points
// // //   const filteredPoints = useMemo(() => {
// // //     return rawPoints.filter((p) => {
// // //       const pinMatch = selectedPincode === "ALL" || p.properties.row.start_area_code === selectedPincode;
// // //       const catMatch = selectedCategory === "ALL" || p.properties.row.category === selectedCategory;
// // //       return pinMatch && catMatch;
// // //     });
// // //   }, [rawPoints, selectedCategory, selectedPincode]);

// // //   // Group into H3 hexes
// // //   useEffect(() => {
// // //     const groups: Record<string, PointFeature[]> = {};

// // //     filteredPoints.forEach((p) => {
// // //       const pin = p.properties.row.start_area_code ?? "UNKNOWN";
// // //       if (!groups[pin]) groups[pin] = [];
// // //       groups[pin].push(p);
// // //     });

// // //     const hexes: any[] = [];

// // //     Object.keys(groups).forEach((pincode) => {
// // //       const list = groups[pincode];
// // //       if (list.length === 0) return;

// // //       const latAvg =
// // //         list.reduce((s, p) => s + p.geometry.coordinates[1], 0) / list.length;
// // //       const lngAvg =
// // //         list.reduce((s, p) => s + p.geometry.coordinates[0], 0) / list.length;

// // //       const h3Index = h3.latLngToCell(latAvg, lngAvg, 5);
// // //       const boundary = h3.cellToBoundary(h3Index).map((c) => [c[0], c[1]]);

// // //       hexes.push({ pincode, count: list.length, coords: boundary });
// // //     });

// // //     setHexagons(hexes);
// // //   }, [filteredPoints]);

// // //   return (
// // //     <div>
// // //       <div className="p-3 bg-white shadow z-50 absolute top-2 left-2 rounded">
// // //         <label>Pincode: </label>
// // //         <select
// // //           value={selectedPincode}
// // //           onChange={(e) => setSelectedPincode(e.target.value)}
// // //           className="border p-1 ml-2"
// // //         >
// // //           {pincodes.map((p) => (
// // //             <option key={p} value={p}>{p}</option>
// // //           ))}
// // //         </select>

// // //         <br />

// // //         <label>Category: </label>
// // //         <select
// // //           value={selectedCategory}
// // //           onChange={(e) => setSelectedCategory(e.target.value)}
// // //           className="border p-1 ml-2 mt-2"
// // //         >
// // //           {categories.map((c) => (
// // //             <option key={c} value={c}>{c}</option>
// // //           ))}
// // //         </select>
// // //       </div>

// // //       <MapContainer center={[22.5, 78.9]} zoom={5} style={{ height: "100vh", width: "100%" }}>
// // //         <TileLayer
// // //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // //           attribution="© OpenStreetMap contributors"
// // //         />

// // //         {hexagons.map((h, i) => (
// // //           <Polygon
// // //             key={i}
// // //             positions={h.coords}
// // //             pathOptions={{
// // //               color: getColor(h.count),
// // //               fillColor: getColor(h.count),
// // //               fillOpacity: 0.45,
// // //               weight: 2,
// // //             }}
// // //           >
// // //             <Tooltip>Pincode {h.pincode} — Count: {h.count}</Tooltip>
// // //           </Polygon>
// // //         ))}

// // //         <ClusterLayer points={filteredPoints} />
// // //       </MapContainer>
// // //     </div>
// // //   );
// // // }


// // // "use client";

// // // import {
// // //   MapContainer,
// // //   TileLayer,
// // //   Polygon,
// // //   Marker,
// // //   Tooltip,
// // //   Popup,
// // //   useMap,
// // // } from "react-leaflet";
// // // import { useState, useEffect, useMemo } from "react";
// // // import Papa from "papaparse";
// // // import * as h3 from "h3-js";
// // // import L from "leaflet";
// // // import supercluster from "supercluster";

// // // // CSV interface
// // // interface CSVRow {
// // //   start_gps?: string;
// // //   start_area_code?: string;
// // //   category?: string;
// // // }

// // // interface PointFeature {
// // //   type: "Feature";
// // //   geometry: { type: "Point"; coordinates: [number, number] };
// // //   properties: { row: CSVRow };
// // // }

// // // // Marker icon
// // // const icon = new L.Icon({
// // //   iconUrl: "/marker-icon.png",
// // //   iconSize: [25, 41],
// // //   iconAnchor: [12, 41],
// // // });

// // // // Color rules
// // // function getColor(count: number) {
// // //   if (count > 2000) return "#0000FF";
// // //   if (count > 1000) return "#FF00FF";
// // //   if (count > 500) return "#FFFF00";
// // //   if (count > 100) return "#00FF00";
// // //   if (count > 50) return "#FFA500";
// // //   return "#FF0000";
// // // }

// // // // Cluster Layer
// // // function ClusterLayer({ points }: { points: PointFeature[] }) {
// // //   const map = useMap();
// // //   const [clusters, setClusters] = useState<any[]>([]);

// // //   const index = useMemo(() => {
// // //     const sc = new supercluster({ radius: 60, maxZoom: 13 });
// // //     sc.load(points);
// // //     return sc;
// // //   }, [points]);

// // //   useEffect(() => {
// // //     const update = () => {
// // //       const bounds = map.getBounds();
// // //       const zoom = map.getZoom();
// // //       const c = index.getClusters([
// // //         bounds.getWest(),
// // //         bounds.getSouth(),
// // //         bounds.getEast(),
// // //         bounds.getNorth(),
// // //       ], zoom);
// // //       setClusters(c);
// // //     };

// // //     update();
// // //     map.on("moveend", update);

// // //     return () => {
// // //       map.off("moveend", update);
// // //     };
// // //   }, [index, map]);

// // //   return (
// // //     <>
// // //       {clusters.map((c: any, i: number) => {
// // //         const [lng, lat] = c.geometry.coordinates;

// // //         if (c.properties.cluster) {
// // //           return (
// // //             <Marker key={i} position={[lat, lng]} icon={icon}>
// // //               <Popup>{c.properties.point_count} points</Popup>
// // //             </Marker>
// // //           );
// // //         }

// // //         return (
// // //           <Marker key={i} position={[lat, lng]} icon={icon}>
// // //             <Popup>
// // //               Lat: {lat}, Lng: {lng}
// // //               <br />
// // //               Pincode: {c.properties.row.start_area_code}
// // //               <br />
// // //               Category: {c.properties.row.category}
// // //             </Popup>
// // //           </Marker>
// // //         );
// // //       })}
// // //     </>
// // //   );}

// // // export default function MapView() {
// // //   const [rawPoints, setRawPoints] = useState<PointFeature[]>([]);
// // //   const [hexagons, setHexagons] = useState<any[]>([]);
// // //   const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
// // //   const [selectedPincode, setSelectedPincode] = useState<string>("ALL");
// // //   const [pincodes, setPincodes] = useState<string[]>([]);
// // //   const [categories, setCategories] = useState<string[]>([]);

// // //   useEffect(() => {
// // //     Papa.parse<CSVRow>("/data.csv", {
// // //       download: true,
// // //       header: true,
// // //       skipEmptyLines: true,
// // //       complete: (res) => {
// // //         const pts: PointFeature[] = [];
// // //         const pincodeSet = new Set<string>();
// // //         const categorySet = new Set<string>();

// // //         res.data.forEach((row) => {
// // //           if (!row.start_gps) return;

// // //           const [lat, lng] = row.start_gps.split(",").map(Number);
// // //           if (isNaN(lat) || isNaN(lng)) return;

// // //           pincodeSet.add(row.start_area_code || "UNKNOWN");
// // //           if (row.category) categorySet.add(row.category);

// // //           pts.push({
// // //             type: "Feature",
// // //             geometry: { type: "Point", coordinates: [lng, lat] },
// // //             properties: { row },
// // //           });
// // //         });

// // //         setRawPoints(pts);
// // //         setPincodes(["ALL", ...Array.from(pincodeSet)]);
// // //         setCategories(["ALL", ...Array.from(categorySet)]);
// // //       },
// // //     });
// // //   }, []);

// // //   const filteredPoints = useMemo(() => {
// // //     return rawPoints.filter((p) => {
// // //       const pm = selectedPincode === "ALL" || p.properties.row.start_area_code === selectedPincode;
// // //       const cm = selectedCategory === "ALL" || p.properties.row.category === selectedCategory;
// // //       return pm && cm;
// // //     });
// // //   }, [rawPoints, selectedCategory, selectedPincode]);

// // //   useEffect(() => {
// // //     const groups: Record<string, PointFeature[]> = {};
// // //     filteredPoints.forEach((p) => {
// // //       const pin = p.properties.row.start_area_code ?? "UNKNOWN";
// // //       if (!groups[pin]) groups[pin] = [];
// // //       groups[pin].push(p);
// // //     });

// // //     const hexes: any[] = [];
// // //     Object.keys(groups).forEach((pincode) => {
// // //       const list = groups[pincode];
// // //       if (list.length === 0) return;

// // //       const latAvg = list.reduce((s, p) => s + p.geometry.coordinates[1], 0) / list.length;
// // //       const lngAvg = list.reduce((s, p) => s + p.geometry.coordinates[0], 0) / list.length;

// // //       const h3Index = h3.latLngToCell(latAvg, lngAvg, 5);
// // //       const boundary = h3.cellToBoundary(h3Index).map((c) => [c[0], c[1]]);

// // //       hexes.push({ pincode, count: list.length, coords: boundary });
// // //     });

// // //     setHexagons(hexes);
// // //   }, [filteredPoints]);

// // //   return (
// // //     <div>
// // //       <div className="p-3 bg-white shadow z-50 absolute top-2 left-2 rounded">
// // //         <label>Pincode: </label>
// // //         <select value={selectedPincode} onChange={(e) => setSelectedPincode(e.target.value)} className="border p-1 ml-2">
// // //           {pincodes.map((p) => <option key={p} value={p}>{p}</option>)}
// // //         </select>

// // //         <br />
// // //         <label>Category: </label>
// // //         <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border p-1 ml-2 mt-2">
// // //           {categories.map((c) => <option key={c} value={c}>{c}</option>)}
// // //         </select>
// // //       </div>

// // //       <MapContainer center={[22.5, 78.9]} zoom={5} style={{ height: "100vh", width: "100%" }}>
// // //         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />

// // //         {hexagons.map((h, i) => (
// // //           <Polygon
// // //             key={i}
// // //             positions={h.coords}
// // //             pathOptions={{
// // //               color: getColor(h.count),
// // //               fillColor: getColor(h.count),
// // //               fillOpacity: 0.12, // ultra transparent
// // //               weight: 1.2,
// // //               opacity: 0.7,
// // //             }}
// // //           >
// // //             <Tooltip>Pincode {h.pincode} — Count: {h.count}</Tooltip>
// // //           </Polygon>
// // //         ))}

// // //         <ClusterLayer points={filteredPoints} />
// // //       </MapContainer>
// // //     </div>
// // //   );
// // // }



// // // "use client";

// // // import {
// // //   MapContainer,
// // //   TileLayer,
// // //   Polygon,
// // //   Marker,
// // //   Tooltip,
// // //   Popup,
// // //   useMap,
// // // } from "react-leaflet";
// // // import { useState, useEffect, useMemo } from "react";
// // // import Papa from "papaparse";
// // // import * as h3 from "h3-js";
// // // import L from "leaflet";
// // // import supercluster from "supercluster";

// // // // CSV interface
// // // interface CSVRow {
// // //   start_gps?: string;
// // //   start_area_code?: string;
// // //   category?: string;
// // // }

// // // interface PointFeature {
// // //   type: "Feature";
// // //   geometry: { type: "Point"; coordinates: [number, number] };
// // //   properties: { row: CSVRow };
// // // }

// // // // Marker icon
// // // const icon = new L.Icon({
// // //   iconUrl: "/marker-icon.png",
// // //   iconSize: [25, 41],
// // //   iconAnchor: [12, 41],
// // // });

// // // // Color rules
// // // function getColor(count: number) {
// // //   if (count > 2000) return "#0000FF";
// // //   if (count > 1000) return "#FF00FF";
// // //   if (count > 500) return "#FFFF00";
// // //   if (count > 100) return "#00FF00";
// // //   if (count > 50) return "#FFA500";
// // //   return "#FF0000";
// // // }

// // // // Zoom to selected pincode
// // // function ZoomToPincode({ selectedPincode, rawPoints }: any) {
// // //   const map = useMap();

// // //   useEffect(() => {
// // //     if (!selectedPincode || selectedPincode === "ALL") return;

// // //     const pts = rawPoints.filter(
// // //       (p: any) => p.properties.row.start_area_code === selectedPincode
// // //     );

// // //     if (pts.length === 0) return;

// // //     const latAvg =
// // //       pts.reduce((sum: number, p: any) => sum + p.geometry.coordinates[1], 0) /
// // //       pts.length;
// // //     const lngAvg =
// // //       pts.reduce((sum: number, p: any) => sum + p.geometry.coordinates[0], 0) /
// // //       pts.length;

// // //     map.flyTo([latAvg, lngAvg], 12, { duration: 1.2 });
// // //   }, [selectedPincode, rawPoints]);

// // //   return null;
// // // }

// // // // Cluster Layer
// // // function ClusterLayer({ points }: { points: PointFeature[] }) {
// // //   const map = useMap();
// // //   const [clusters, setClusters] = useState<any[]>([]);

// // //   const index = useMemo(() => {
// // //     const sc = new supercluster({ radius: 60, maxZoom: 13 });
// // //     sc.load(points);
// // //     return sc;
// // //   }, [points]);

// // //   useEffect(() => {
// // //     const update = () => {
// // //       const bounds = map.getBounds();
// // //       const zoom = map.getZoom();
// // //       const c = index.getClusters(
// // //         [
// // //           bounds.getWest(),
// // //           bounds.getSouth(),
// // //           bounds.getEast(),
// // //           bounds.getNorth(),
// // //         ],
// // //         zoom
// // //       );
// // //       setClusters(c);
// // //     };

// // //     update();
// // //     map.on("moveend", update);

// // //     return () => {
// // //       map.off("moveend", update);
// // //     };
// // //   }, [index, map]);

// // //   return (
// // //     <>
// // //       {clusters.map((c: any, i: number) => {
// // //         const [lng, lat] = c.geometry.coordinates;

// // //         if (c.properties.cluster) {
// // //           return (
// // //             <Marker key={i} position={[lat, lng]} icon={icon}>
// // //               <Popup>{c.properties.point_count} points</Popup>
// // //             </Marker>
// // //           );
// // //         }

// // //         return (
// // //           <Marker key={i} position={[lat, lng]} icon={icon}>
// // //             <Popup>
// // //               Lat: {lat}, Lng: {lng}
// // //               <br />
// // //               Pincode: {c.properties.row.start_area_code}
// // //               <br />
// // //               Category: {c.properties.row.category}
// // //             </Popup>
// // //           </Marker>
// // //         );
// // //       })}
// // //     </>
// // //   );
// // // }

// // // export default function MapView() {
// // //   const [rawPoints, setRawPoints] = useState<PointFeature[]>([]);
// // //   const [hexagons, setHexagons] = useState<any[]>([]);
// // //   const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
// // //   const [selectedPincode, setSelectedPincode] = useState<string>("ALL");
// // //   const [pincodes, setPincodes] = useState<string[]>([]);
// // //   const [categories, setCategories] = useState<string[]>([]);

// // //   // Load CSV
// // //   useEffect(() => {
// // //     Papa.parse<CSVRow>("/data.csv", {
// // //       download: true,
// // //       header: true,
// // //       skipEmptyLines: true,
// // //       complete: (res) => {
// // //         const pts: PointFeature[] = [];
// // //         const pincodeSet = new Set<string>();
// // //         const categorySet = new Set<string>();

// // //         res.data.forEach((row) => {
// // //           if (!row.start_gps) return;

// // //           const [lat, lng] = row.start_gps.split(",").map(Number);
// // //           if (isNaN(lat) || isNaN(lng)) return;

// // //           pincodeSet.add(row.start_area_code || "UNKNOWN");
// // //           if (row.category) categorySet.add(row.category);

// // //           pts.push({
// // //             type: "Feature",
// // //             geometry: { type: "Point", coordinates: [lng, lat] },
// // //             properties: { row },
// // //           });
// // //         });

// // //         setRawPoints(pts);
// // //         setPincodes(["ALL", ...Array.from(pincodeSet)]);
// // //         setCategories(["ALL", ...Array.from(categorySet)]);
// // //       },
// // //     });
// // //   }, []);

// // //   // Filter
// // //   const filteredPoints = useMemo(() => {
// // //     return rawPoints.filter((p) => {
// // //       const pm =
// // //         selectedPincode === "ALL" ||
// // //         p.properties.row.start_area_code === selectedPincode;

// // //       const cm =
// // //         selectedCategory === "ALL" ||
// // //         p.properties.row.category === selectedCategory;

// // //       return pm && cm;
// // //     });
// // //   }, [rawPoints, selectedCategory, selectedPincode]);

// // //   // Hexagons
// // //   useEffect(() => {
// // //     const groups: Record<string, PointFeature[]> = {};
// // //     filteredPoints.forEach((p) => {
// // //       const pin = p.properties.row.start_area_code ?? "UNKNOWN";
// // //       if (!groups[pin]) groups[pin] = [];
// // //       groups[pin].push(p);
// // //     });

// // //     const hexes: any[] = [];
// // //     Object.keys(groups).forEach((pincode) => {
// // //       const list = groups[pincode];
// // //       if (list.length === 0) return;

// // //       const latAvg =
// // //         list.reduce((s, p) => s + p.geometry.coordinates[1], 0) / list.length;
// // //       const lngAvg =
// // //         list.reduce((s, p) => s + p.geometry.coordinates[0], 0) / list.length;

// // //       const h3Index = h3.latLngToCell(latAvg, lngAvg, 5);
// // //       const boundary = h3.cellToBoundary(h3Index).map((c) => [c[0], c[1]]);

// // //       hexes.push({ pincode, count: list.length, coords: boundary });
// // //     });

// // //     setHexagons(hexes);
// // //   }, [filteredPoints]);

// // //   return (
// // //     <div>
// // //       <div className="p-3 bg-white shadow z-50 absolute top-2 left-2 rounded">
// // //         <label>Pincode: </label>
// // //         <select
// // //           value={selectedPincode}
// // //           onChange={(e) => setSelectedPincode(e.target.value)}
// // //           className="border p-1 ml-2"
// // //         >
// // //           {pincodes.map((p) => (
// // //             <option key={p} value={p}>
// // //               {p}
// // //             </option>
// // //           ))}
// // //         </select>

// // //         <br />
// // //         <label>Category: </label>
// // //         <select
// // //           value={selectedCategory}
// // //           onChange={(e) => setSelectedCategory(e.target.value)}
// // //           className="border p-1 ml-2 mt-2"
// // //         >
// // //           {categories.map((c) => (
// // //             <option key={c} value={c}>
// // //               {c}
// // //             </option>
// // //           ))}
// // //         </select>
// // //       </div>

// // //       <MapContainer
// // //         center={[22.5, 78.9]}
// // //         zoom={5}
// // //         style={{ height: "100vh", width: "100%" }}
// // //       >
// // //         <ZoomToPincode
// // //           selectedPincode={selectedPincode}
// // //           rawPoints={rawPoints}
// // //         />

// // //         <TileLayer
// // //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // //           attribution="© OpenStreetMap contributors"
// // //         />

// // //         {hexagons.map((h, i) => (
// // //           <Polygon
// // //             key={i}
// // //             positions={h.coords}
// // //             pathOptions={{
// // //               color: getColor(h.count),
// // //               fillColor: getColor(h.count),
// // //               fillOpacity: 0.12,
// // //               weight: 1.2,
// // //               opacity: 0.7,
// // //             }}
// // //           >
// // //             <Tooltip>
// // //               Pincode {h.pincode} — Count: {h.count}
// // //             </Tooltip>
// // //           </Polygon>
// // //         ))}

// // //         <ClusterLayer points={filteredPoints} />
// // //       </MapContainer>
// // //     </div>
// // //   );
// // // } final 


// // "use client";

// // import {
// //   MapContainer,
// //   TileLayer,
// //   Polygon,
// //   Marker,
// //   Tooltip,
// //   Popup,
// //   useMap,
// // } from "react-leaflet";
// // import { useState, useEffect, useMemo, useRef } from "react";
// // import Papa from "papaparse";
// // import * as h3 from "h3-js";
// // import L from "leaflet";
// // import supercluster from "supercluster";

// // interface CSVRow {
// //   start_gps?: string;
// //   start_area_code?: string;
// //   category?: string;
// // }

// // interface PointFeature {
// //   type: "Feature";
// //   geometry: { type: "Point"; coordinates: [number, number] };
// //   properties: { row: CSVRow };
// // }

// // interface Hexagon {
// //   pincode: string;
// //   count: number;
// //   coords: [number, number][];
// // }

// // const icon = new L.Icon({
// //   iconUrl: "/marker-icon.png",
// //   iconSize: [25, 41],
// //   iconAnchor: [12, 41],
// // });

// // function getColor(count: number) {
// //   if (count > 2000) return "#0000FF";
// //   if (count > 1000) return "#FF00FF";
// //   if (count > 500) return "#FFFF00";
// //   if (count > 100) return "#00FF00";
// //   if (count > 50) return "#FFA500";
// //   return "#FF0000";
// // }

// // /* ---------- CLUSTERS ---------- */
// // function ClusterLayer({ points }: { points: PointFeature[] }) {
// //   const map = useMap();
// //   const [clusters, setClusters] = useState<any[]>([]);

// //   const index = useMemo(() => {
// //     const sc = new supercluster({ radius: 60, maxZoom: 13 });
// //     sc.load(points);
// //     return sc;
// //   }, [points]);

// // //   useEffect(() => {
// // //     const update = () => {
// // //       const b = map.getBounds();
// // //       const zoom = map.getZoom();
// // //       const c = index.getClusters(
// // //         [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()],
// // //         zoom
// // //       );
// // //       setClusters(c);
// // //     };

// // //     update();
// // //     map.on("moveend", update);
// // //     return () => map.off("moveend", update);
// // //   }, [index, map]);

// // useEffect(() => {
// //   const update = () => {
// //     const b = map.getBounds();
// //     const zoom = map.getZoom();
// //     const c = index.getClusters(
// //       [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()],
// //       zoom
// //     );
// //     setClusters(c);
// //   };

// //   update();
// //   map.on("moveend", update);

// //   return () => {
// //     map.off("moveend", update); // IMPORTANT: must not return L.Map
// //   };
// // }, [index, map]);


// //   return (
// //     <>
// //       {clusters.map((c: any, i: number) => {
// //         const [lng, lat] = c.geometry.coordinates;

// //         if (c.properties.cluster) {
// //           return (
// //             <Marker key={i} position={[lat, lng]} icon={icon}>
// //               <Popup>{c.properties.point_count} points</Popup>
// //             </Marker>
// //           );
// //         }

// //         return (
// //           <Marker key={i} position={[lat, lng]} icon={icon}>
// //             <Popup>
// //               Lat: {lat}, Lng: {lng}
// //               <br />
// //               Pincode: {c.properties.row.start_area_code}
// //               <br />
// //               Category: {c.properties.row.category}
// //             </Popup>
// //           </Marker>
// //         );
// //       })}
// //     </>
// //   );
// // }

// // /* ---------- MAIN ---------- */
// // export default function MapView() {
// //   const [rawPoints, setRawPoints] = useState<PointFeature[]>([]);
// //   const [hexagons, setHexagons] = useState<Hexagon[]>([]);
// //   const [selectedCategory, setSelectedCategory] = useState("ALL");
// //   const [selectedPincode, setSelectedPincode] = useState("ALL");
// //   const [pincodes, setPincodes] = useState<string[]>([]);
// //   const [categories, setCategories] = useState<string[]>([]);

// //   const mapRef = useRef<L.Map | null>(null);

// //   /* ---------- UPLOAD CSV ---------- */
// //   const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     Papa.parse<CSVRow>(file, {
// //       header: true,
// //       skipEmptyLines: true,
// //       complete: (res) => {
// //         const pts: PointFeature[] = [];
// //         const pinSet = new Set<string>();
// //         const catSet = new Set<string>();

// //         res.data.forEach((row) => {
// //           if (!row.start_gps) return;

// //           const [lat, lng] = row.start_gps.split(",").map(Number);
// //           if (isNaN(lat) || isNaN(lng)) return;

// //           pinSet.add(row.start_area_code || "UNKNOWN");
// //           if (row.category) catSet.add(row.category);

// //           pts.push({
// //             type: "Feature",
// //             geometry: { type: "Point", coordinates: [lng, lat] },
// //             properties: { row },
// //           });
// //         });

// //         setRawPoints(pts);
// //         setPincodes(["ALL", ...Array.from(pinSet)]);
// //         setCategories(["ALL", ...Array.from(catSet)]);
// //       },
// //     });
// //   };

// //   /* ---------- FILTER ---------- */
// //   const filteredPoints = useMemo(() => {
// //     return rawPoints.filter((p) => {
// //       const pin = selectedPincode === "ALL" || p.properties.row.start_area_code === selectedPincode;
// //       const cat = selectedCategory === "ALL" || p.properties.row.category === selectedCategory;
// //       return pin && cat;
// //     });
// //   }, [rawPoints, selectedPincode, selectedCategory]);

// //   /* ---------- HEXAGONS ---------- */
// //   useEffect(() => {
// //     const groups: Record<string, PointFeature[]> = {};

// //     filteredPoints.forEach((p) => {
// //       const pin = p.properties.row.start_area_code || "UNKNOWN";
// //       if (!groups[pin]) groups[pin] = [];
// //       groups[pin].push(p);
// //     });

// //     const hexes: Hexagon[] = [];

// //     Object.keys(groups).forEach((pin) => {
// //       const list = groups[pin];
// //       if (!list.length) return;

// //       const latAvg = list.reduce((s, p) => s + p.geometry.coordinates[1], 0) / list.length;
// //       const lngAvg = list.reduce((s, p) => s + p.geometry.coordinates[0], 0) / list.length;

// //       const h3Index = h3.latLngToCell(latAvg, lngAvg, 7);

// //       const boundary: [number, number][] = h3
// //         .cellToBoundary(h3Index)
// //         .map(([lat, lng]) => [lat, lng] as [number, number]);

// //       hexes.push({ pincode: pin, count: list.length, coords: boundary });
// //     });

// //     setHexagons(hexes);
// //   }, [filteredPoints]);

// //   /* ---------- AUTO ZOOM ---------- */
// //   useEffect(() => {
// //     if (!mapRef.current || selectedPincode === "ALL") return;

// //     const pts = rawPoints.filter(
// //       (p) => p.properties.row.start_area_code === selectedPincode
// //     );
// //     if (!pts.length) return;

// //     const latLngs: [number, number][] = pts.map((p) =>
// //       [p.geometry.coordinates[1], p.geometry.coordinates[0]] as [number, number]
// //     );

// //     const bounds = L.latLngBounds(latLngs);
// //     mapRef.current.fitBounds(bounds, { padding: [40, 40] });
// //   }, [selectedPincode, rawPoints]);

// //   /* ---------- UI ---------- */
// //   return (
// //     <div>
// //       <input type="file" accept=".csv" onChange={handleCSVUpload} className="p-2 border mb-3" />

// //       <div className="p-3 bg-white shadow absolute top-2 left-2 rounded z-50">
// //         <label>Pincode: </label>
// //         <select value={selectedPincode} onChange={(e) => setSelectedPincode(e.target.value)}>
// //           {pincodes.map((p) => <option key={p}>{p}</option>)}
// //         </select>
// //         <br />
// //         <label>Category: </label>
// //         <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
// //           {categories.map((c) => <option key={c}>{c}</option>)}
// //         </select>
// //       </div>

// //       <MapContainer
// //         center={[22.5, 78.9]}
// //         zoom={5}
// //         style={{ height: "100vh", width: "100%" }}
// //         ref={mapRef}
// //       >
// //         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

// //         {hexagons.map((h, i) => (
// //           <Polygon
// //             key={i}
// //             positions={h.coords}
// //             pathOptions={{
// //               fillColor: getColor(h.count),
// //               color: getColor(h.count),
// //               fillOpacity: 0.15,
// //               weight: 1.2,
// //             }}
// //           >
// //             <Tooltip>Pincode {h.pincode} — Count {h.count}</Tooltip>
// //           </Polygon>
// //         ))}

// //         <ClusterLayer points={filteredPoints} />
// //       </MapContainer>
// //     </div>
// //   );
// // }



// "use client";

// import {
//   MapContainer,
//   TileLayer,
//   Polygon,
//   Marker,
//   Tooltip,
//   Popup,
//   useMap,
// } from "react-leaflet";
// import { useState, useEffect, useMemo } from "react";
// import Papa from "papaparse";
// import * as h3 from "h3-js";
// import L from "leaflet";
// import supercluster from "supercluster";

// /* ---------------- INTERFACES ---------------- */

// interface CSVRow {
//   start_gps?: string;
//   start_area_code?: string;
//   category?: string;
// }

// interface PointFeature {
//   type: "Feature";
//   geometry: { type: "Point"; coordinates: [number, number] }; // [lng, lat]
//   properties: { row: CSVRow };
// }

// interface Hexagon {
//   pincode: string;
//   count: number;
//   coords: [number, number][]; // lat, lng
// }

// /* ---------------- MARKER ICON ---------------- */

// const icon = new L.Icon({
//   iconUrl: "/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// /* ---------------- COLOR SCALE ---------------- */

// function getColor(count: number) {
//   if (count > 2000) return "#0000FF";
//   if (count > 1000) return "#FF00FF";
//   if (count > 500) return "#FFFF00";
//   if (count > 100) return "#00FF00";
//   if (count > 50) return "#FFA500";
//   return "#FF0000";
// }

// /* ---------------- MAP REF SETTER (FIX FOR ERRORS) ---------------- */

// function MapRefSetter({ setMap }: { setMap: (map: L.Map) => void }) {
//   const map = useMap();

//   useEffect(() => {
//     setMap(map); // CORRECT — no TypeScript error
//   }, [map]);

//   return null;
// }

// /* ---------------- CLUSTER LAYER ---------------- */

// function ClusterLayer({ points }: { points: PointFeature[] }) {
//   const map = useMap();
//   const [clusters, setClusters] = useState<any[]>([]);

//   const index = useMemo(() => {
//     const sc = new supercluster({ radius: 60, maxZoom: 13 });
//     sc.load(points);
//     return sc;
//   }, [points]);

//   useEffect(() => {
//     const update = () => {
//       const b = map.getBounds();
//       const zoom = map.getZoom();

//       const c = index.getClusters(
//         [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()],
//         zoom
//       );

//       setClusters(c);
//     };

//     update();
//     map.on("moveend", update);
//     return () => map.off("moveend", update);
//   }, [index, map]);

//   return (
//     <>
//       {clusters.map((c: any, i: number) => {
//         const [lng, lat] = c.geometry.coordinates;

//         if (c.properties.cluster) {
//           return (
//             <Marker key={i} position={[lat, lng]} icon={icon}>
//               <Popup>{c.properties.point_count} points</Popup>
//             </Marker>
//           );
//         }

//         return (
//           <Marker key={i} position={[lat, lng]} icon={icon}>
//             <Popup>
//               Lat: {lat}, Lng: {lng} <br />
//               Pincode: {c.properties.row.start_area_code} <br />
//               Category: {c.properties.row.category}
//             </Popup>
//           </Marker>
//         );
//       })}
//     </>
//   );
// }

// /* ---------------- MAIN COMPONENT ---------------- */

// export default function MapView() {
//   const [rawPoints, setRawPoints] = useState<PointFeature[]>([]);
//   const [hexagons, setHexagons] = useState<Hexagon[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("ALL");
//   const [selectedPincode, setSelectedPincode] = useState("ALL");
//   const [pincodes, setPincodes] = useState<string[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [mapRef, setMapRef] = useState<L.Map | null>(null);

//   /* ------------ CSV UPLOAD ------------ */

//   const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     Papa.parse<CSVRow>(file, {
//       header: true,
//       skipEmptyLines: true,
//       complete: (res) => {
//         const pts: PointFeature[] = [];
//         const pinSet = new Set<string>();
//         const catSet = new Set<string>();

//         res.data.forEach((row) => {
//           if (!row.start_gps) return;

//           const [lat, lng] = row.start_gps.split(",").map(Number);
//           if (isNaN(lat) || isNaN(lng)) return;

//           pinSet.add(row.start_area_code || "UNKNOWN");
//           if (row.category) catSet.add(row.category);

//           pts.push({
//             type: "Feature",
//             geometry: { type: "Point", coordinates: [lng, lat] },
//             properties: { row },
//           });
//         });

//         setRawPoints(pts);
//         setPincodes(["ALL", ...Array.from(pinSet)]);
//         setCategories(["ALL", ...Array.from(catSet)]);
//       },
//     });
//   };

//   /* ------------ FILTER POINTS ------------ */

//   const filteredPoints = useMemo(() => {
//     return rawPoints.filter((p) => {
//       const matchPin =
//         selectedPincode === "ALL" ||
//         p.properties.row.start_area_code === selectedPincode;

//       const matchCat =
//         selectedCategory === "ALL" ||
//         p.properties.row.category === selectedCategory;

//       return matchPin && matchCat;
//     });
//   }, [rawPoints, selectedPincode, selectedCategory]);

//   /* ------------ BUILD HEXAGONS ------------ */

//   useEffect(() => {
//     const groups: Record<string, PointFeature[]> = {};

//     filteredPoints.forEach((p) => {
//       const pin = p.properties.row.start_area_code || "UNKNOWN";
//       if (!groups[pin]) groups[pin] = [];
//       groups[pin].push(p);
//     });

//     const hexes: Hexagon[] = [];

//     Object.keys(groups).forEach((pin) => {
//       const list = groups[pin];
//       if (list.length === 0) return;

//       const latAvg =
//         list.reduce((s, p) => s + p.geometry.coordinates[1], 0) / list.length;

//       const lngAvg =
//         list.reduce((s, p) => s + p.geometry.coordinates[0], 0) / list.length;

//       const h3Index = h3.latLngToCell(latAvg, lngAvg, 7);

//       const boundary: [number, number][] = h3
//         .cellToBoundary(h3Index)
//         .map(([lat, lng]) => [lat, lng]);

//       hexes.push({ pincode: pin, count: list.length, coords: boundary });
//     });

//     setHexagons(hexes);
//   }, [filteredPoints]);

//   /* ------------ AUTO-ZOOM ON PINCODE ------------ */

//   useEffect(() => {
//     if (!mapRef || selectedPincode === "ALL") return;

//     const pts = rawPoints.filter(
//       (p) => p.properties.row.start_area_code === selectedPincode
//     );

//     if (pts.length === 0) return;

//     const bounds = L.latLngBounds(
//       pts.map((p) => [p.geometry.coordinates[1], p.geometry.coordinates[0]])
//     );

//     mapRef.fitBounds(bounds, { padding: [50, 50] });
//   }, [selectedPincode, mapRef, rawPoints]);

//   /* ---------------- RENDER ---------------- */

//   return (
//     <div>
//       <div className="p-3 bg-white shadow absolute top-2 left-2 z-50 rounded">
//         <input type="file" accept=".csv" onChange={handleCSVUpload} />

//         <br />
//         <label>Pincode: </label>
//         <select
//           value={selectedPincode}
//           onChange={(e) => setSelectedPincode(e.target.value)}
//         >
//           {pincodes.map((p) => (
//             <option key={p}>{p}</option>
//           ))}
//         </select>

//         <br />
//         <label>Category: </label>
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((c) => (
//             <option key={c}>{c}</option>
//           ))}
//         </select>
//       </div>

//       <MapContainer
//         center={[22.5, 78.9]}
//         zoom={5}
//         style={{ height: "100vh", width: "100%" }}
//       >
//         <MapRefSetter setMap={setMapRef} />

//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="© OpenStreetMap contributors"
//         />

//         {hexagons.map((h, i) => (
//           <Polygon
//             key={i}
//             positions={h.coords as L.LatLngExpression[]}
//             pathOptions={{
//               color: getColor(h.count),
//               fillColor: getColor(h.count),
//               fillOpacity: 0.15,
//               weight: 1.2,
//             }}
//           >
//             <Tooltip>
//               {h.pincode} — {h.count} points
//             </Tooltip>
//           </Polygon>
//         ))}

//         <ClusterLayer points={filteredPoints} />
//       </MapContainer>
//     </div>
//   );
// }


// "use client";

// import {
//   MapContainer,
//   TileLayer,
//   Polygon,
//   Marker,
//   Tooltip,
//   Popup,
//   useMap,
// } from "react-leaflet";
// import { useState, useEffect, useMemo } from "react";
// import Papa from "papaparse";
// import * as h3 from "h3-js";
// import L from "leaflet";
// import supercluster from "supercluster";

// /* ---------------- INTERFACES ---------------- */

// interface CSVRow {
//   start_gps?: string;
//   start_area_code?: string;
//   category?: string;
// }

// interface PointFeature {
//   type: "Feature";
//   geometry: { type: "Point"; coordinates: [number, number] }; // [lng, lat]
//   properties: { row: CSVRow };
// }

// interface Hexagon {
//   pincode: string;
//   count: number;
//   coords: [number, number][]; // always tuple
// }

// /* ---------------- MARKER ICON ---------------- */

// const icon = new L.Icon({
//   iconUrl: "/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// /* ---------------- COLOR SCALE ---------------- */

// function getColor(count: number) {
//   if (count > 2000) return "#0000FF";
//   if (count > 1000) return "#FF00FF";
//   if (count > 500) return "#FFFF00";
//   if (count > 100) return "#00FF00";
//   if (count > 50) return "#FFA500";
//   return "#FF0000";
// }

// /* ---------------- MAP REF SETTER ---------------- */

// function MapRefSetter({ setMap }: { setMap: (map: L.Map) => void }) {
//   const map = useMap();
//   useEffect(() => {
//     setMap(map);
//   }, [map]);
//   return null;
// }

// /* ---------------- CLUSTER LAYER ---------------- */

// function ClusterLayer({ points }: { points: PointFeature[] }) {
//   const map = useMap();
//   const [clusters, setClusters] = useState<any[]>([]);

//   const index = useMemo(() => {
//     const sc = new supercluster({
//       radius: 60,
//       maxZoom: 13,
//     });
//     sc.load(points);
//     return sc;
//   }, [points]);

//   useEffect(() => {
//     const update = () => {
//       const b = map.getBounds();
//       const zoom = map.getZoom();
//       const c = index.getClusters(
//         [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()],
//         zoom
//       );
//       setClusters(c);
//     };

//     update();
//     map.on("moveend", update);

//     return () => {
//       map.off("moveend", update);
//     };
//   }, [index, map]);

//   return (
//     <>
//       {clusters.map((c: any, i: number) => {
//         const [lng, lat] = c.geometry.coordinates;

//         if (c.properties.cluster) {
//           return (
//             <Marker key={i} position={[lat, lng]} icon={icon}>
//               <Popup>{c.properties.point_count} points</Popup>
//             </Marker>
//           );
//         }

//         return (
//           <Marker key={i} position={[lat, lng]} icon={icon}>
//             <Popup>
//               Lat: {lat}, Lng: {lng}
//               <br />
//               Pincode: {c.properties.row.start_area_code}
//               <br />
//               Category: {c.properties.row.category}
//             </Popup>
//           </Marker>
//         );
//       })}
//     </>
//   );
// }

// /* ---------------- MAIN COMPONENT ---------------- */

// export default function MapView() {
//   const [rawPoints, setRawPoints] = useState<PointFeature[]>([]);
//   const [hexagons, setHexagons] = useState<Hexagon[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("ALL");
//   const [selectedPincode, setSelectedPincode] = useState("ALL");
//   const [pincodes, setPincodes] = useState<string[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [mapRef, setMapRef] = useState<L.Map | null>(null);

//   /* ------------ CSV UPLOAD ------------ */

//   const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     Papa.parse<CSVRow>(file, {
//       header: true,
//       skipEmptyLines: true,
//       complete: (res) => {
//         const pts: PointFeature[] = [];
//         const pinSet = new Set<string>();
//         const catSet = new Set<string>();

//         res.data.forEach((row) => {
//           if (!row.start_gps) return;

//           const [lat, lng] = row.start_gps.split(",").map(Number);
//           if (isNaN(lat) || isNaN(lng)) return;

//           pinSet.add(row.start_area_code || "UNKNOWN");
//           if (row.category) catSet.add(row.category);

//           pts.push({
//             type: "Feature",
//             geometry: { type: "Point", coordinates: [lng, lat] },
//             properties: { row },
//           });
//         });

//         setRawPoints(pts);
//         setPincodes(["ALL", ...Array.from(pinSet)]);
//         setCategories(["ALL", ...Array.from(catSet)]);
//       },
//     });
//   };

//   /* ------------ FILTER POINTS ------------ */

//   const filteredPoints = useMemo(() => {
//     return rawPoints.filter((p) => {
//       const matchPin =
//         selectedPincode === "ALL" ||
//         p.properties.row.start_area_code === selectedPincode;

//       const matchCat =
//         selectedCategory === "ALL" ||
//         p.properties.row.category === selectedCategory;

//       return matchPin && matchCat;
//     });
//   }, [rawPoints, selectedPincode, selectedCategory]);

//   /* ------------ BUILD HEXAGONS ------------ */

//   useEffect(() => {
//     const groups: Record<string, PointFeature[]> = {};

//     filteredPoints.forEach((p) => {
//       const pin = p.properties.row.start_area_code || "UNKNOWN";
//       if (!groups[pin]) groups[pin] = [];
//       groups[pin].push(p);
//     });

//     const hexes: Hexagon[] = [];

//     Object.keys(groups).forEach((pin) => {
//       const list = groups[pin];
//       if (list.length === 0) return;

//       const latAvg =
//         list.reduce((s, p) => s + p.geometry.coordinates[1], 0) /
//         list.length;

//       const lngAvg =
//         list.reduce((s, p) => s + p.geometry.coordinates[0], 0) /
//         list.length;

//       const h3Index = h3.latLngToCell(latAvg, lngAvg, 7);

//       const boundary: [number, number][] = h3
//         .cellToBoundary(h3Index)
//         .map(([lat, lng]: [number, number]) => [lat, lng]);

//       hexes.push({ pincode: pin, count: list.length, coords: boundary });
//     });

//     setHexagons(hexes);
//   }, [filteredPoints]);

//   /* ------------ AUTO-ZOOM ------------ */

//   useEffect(() => {
//     if (!mapRef || selectedPincode === "ALL") return;

//     const pts = rawPoints.filter(
//       (p) => p.properties.row.start_area_code === selectedPincode
//     );
//     if (pts.length === 0) return;

//     const bounds = L.latLngBounds(
//       pts.map((p) => [p.geometry.coordinates[1], p.geometry.coordinates[0]])
//     );

//     mapRef.fitBounds(bounds, { padding: [50, 50] });
//   }, [selectedPincode, mapRef, rawPoints]);

//   /* ------------ RENDER ------------ */

//   return (
//     <div>
//       <div className="p-3 bg-white shadow absolute top-2 left-2 z-50 rounded">
//         <input type="file" accept=".csv" onChange={handleCSVUpload} />

//         <br />
//         <label>Pincode: </label>
//         <select
//           value={selectedPincode}
//           onChange={(e) => setSelectedPincode(e.target.value)}
//         >
//           {pincodes.map((p) => (
//             <option key={p}>{p}</option>
//           ))}
//         </select>

//         <br />
//         <label>Category: </label>
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((c) => (
//             <option key={c}>{c}</option>
//           ))}
//         </select>
//       </div>

//       <MapContainer
//         center={[22.5, 78.9]}
//         zoom={5}
//         style={{ height: "100vh", width: "100%" }}
//       >
//         <MapRefSetter setMap={setMapRef} />

//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="© OpenStreetMap contributors"
//         />

//         {hexagons.map((h, i) => (
//           <Polygon
//             key={i}
//             positions={h.coords as L.LatLngExpression[]}
//             pathOptions={{
//               color: getColor(h.count),
//               fillColor: getColor(h.count),
//               fillOpacity: 0.15,
//               weight: 1.2,
//             }}
//           >
//             <Tooltip>
//               {h.pincode} — {h.count} points
//             </Tooltip>
//           </Polygon>
//         ))}

//         <ClusterLayer points={filteredPoints} />
//       </MapContainer>
//     </div>
//   );
// }


"use client";

import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";
import { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import * as h3 from "h3-js";
import L from "leaflet";
import supercluster from "supercluster";

// 👉 Import the styling
import "./MapControls.css";

/* ---------------- INTERFACES ---------------- */

interface CSVRow {
  start_gps?: string;
  start_area_code?: string;
  category?: string;
}

interface PointFeature {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] }; // [lng, lat]
  properties: { row: CSVRow };
}

interface Hexagon {
  pincode: string;
  count: number;
  coords: [number, number][]; // lat,lng pairs
}

/* ---------------- MARKER ICON ---------------- */

const icon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

/* ---------------- COLOR SCALE ---------------- */

function getColor(count: number) {
  if (count > 2000) return "#0000FF";
  if (count > 1000) return "#FF00FF";
  if (count > 500) return "#FFFF00";
  if (count > 100) return "#00FF00";
  if (count > 50) return "#FFA500";
  return "#FF0000";
}

/* ---------------- MAP REF SETTER ---------------- */

function MapRefSetter({ setMap }: { setMap: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    setMap(map);
  }, [map]);
  return null;
}

/* ---------------- CLUSTER LAYER ---------------- */

function ClusterLayer({ points }: { points: PointFeature[] }) {
  const map = useMap();
  const [clusters, setClusters] = useState<any[]>([]);

  const index = useMemo(() => {
    const sc = new supercluster({ radius: 60, maxZoom: 13 });
    sc.load(points);
    return sc;
  }, [points]);

useEffect(() => {
  if (!map) return; // IMPORTANT: prevent TS errors when map is null

  const update = () => {
    const bounds = map.getBounds();
    const zoom = map.getZoom();

    const clusters = index.getClusters(
      [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
      zoom
    );

    setClusters(clusters);
  };

  update(); // run once on mount
  map.on("moveend", update);

  return () => {
    map.off("moveend", update);
  };
}, [index, map]);

  return (
    <>
      {clusters.map((c: any, i: number) => {
        const [lng, lat] = c.geometry.coordinates;

        if (c.properties.cluster) {
          return (
            <Marker key={i} position={[lat, lng]} icon={icon}>
              <Popup>{c.properties.point_count} points</Popup>
            </Marker>
          );
        }

        return (
          <Marker key={i} position={[lat, lng]} icon={icon}>
            <Popup>
              Lat: {lat} / Lng: {lng} <br />
              Pincode: {c.properties.row.start_area_code} <br />
              Category: {c.properties.row.category}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function MapView() {
  const [rawPoints, setRawPoints] = useState<PointFeature[]>([]);
  const [hexagons, setHexagons] = useState<Hexagon[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedPincode, setSelectedPincode] = useState("ALL");

  const [pincodes, setPincodes] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [mapRef, setMapRef] = useState<L.Map | null>(null);

  /* ------------ CSV UPLOAD ------------ */

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const pts: PointFeature[] = [];
        const pins = new Set<string>();
        const cats = new Set<string>();

        res.data.forEach((row) => {
          if (!row.start_gps) return;

          const [lat, lng] = row.start_gps.split(",").map(Number);
          if (isNaN(lat) || isNaN(lng)) return;

          pins.add(row.start_area_code || "UNKNOWN");
          if (row.category) cats.add(row.category);

          pts.push({
            type: "Feature",
            geometry: { type: "Point", coordinates: [lng, lat] },
            properties: { row },
          });
        });

        setRawPoints(pts);
        setPincodes(["ALL", ...Array.from(pins)]);
        setCategories(["ALL", ...Array.from(cats)]);
      },
    });
  };

  /* ------------ FILTER POINTS ------------ */

  const filteredPoints = useMemo(() => {
    return rawPoints.filter((p) => {
      const pinOK =
        selectedPincode === "ALL" ||
        p.properties.row.start_area_code === selectedPincode;

      const catOK =
        selectedCategory === "ALL" ||
        p.properties.row.category === selectedCategory;

      return pinOK && catOK;
    });
  }, [rawPoints, selectedPincode, selectedCategory]);

  /* ------------ BUILD HEXAGONS ------------ */

  useEffect(() => {
    const groups: Record<string, PointFeature[]> = {};

    filteredPoints.forEach((p) => {
      const pin = p.properties.row.start_area_code || "UNKNOWN";
      if (!groups[pin]) groups[pin] = [];
      groups[pin].push(p);
    });

    const hex: Hexagon[] = [];

    Object.keys(groups).forEach((pin) => {
      const list = groups[pin];
      if (list.length === 0) return;

      const latAvg =
        list.reduce((s, p) => s + p.geometry.coordinates[1], 0) /
        list.length;

      const lngAvg =
        list.reduce((s, p) => s + p.geometry.coordinates[0], 0) /
        list.length;

      const cell = h3.latLngToCell(latAvg, lngAvg, 7);

      const boundary = h3
        .cellToBoundary(cell)
        .map(([lat, lng]) => [lat, lng] as [number, number]);

      hex.push({ pincode: pin, count: list.length, coords: boundary });
    });

    setHexagons(hex);
  }, [filteredPoints]);

  /* ------------ AUTO-ZOOM ------------ */

  useEffect(() => {
    if (!mapRef || selectedPincode === "ALL") return;

    const pts = rawPoints.filter(
      (p) => p.properties.row.start_area_code === selectedPincode
    );
    if (pts.length === 0) return;

    const bounds = L.latLngBounds(
      pts.map((p) => [p.geometry.coordinates[1], p.geometry.coordinates[0]])
    );

    mapRef.fitBounds(bounds, { padding: [50, 50] });
  }, [selectedPincode, mapRef, rawPoints]);

  /* ------------ RENDER UI ------------ */

  return (
    <div>
      {/* ========== STYLED CONTROL PANEL ========== */}
      <div className="control-panel">
        <label>Upload CSV</label>
        <input type="file" accept=".csv" onChange={handleCSVUpload} />

        <label>Pincode</label>
        <select
          value={selectedPincode}
          onChange={(e) => setSelectedPincode(e.target.value)}
        >
          {pincodes.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* ========== MAP ========== */}
      <MapContainer
        center={[22.5, 78.9]}
        zoom={5}
        style={{ height: "100vh", width: "100%" }}
      >
        <MapRefSetter setMap={setMapRef} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {hexagons.map((h, i) => (
          <Polygon
            key={i}
            positions={h.coords as any}
            pathOptions={{
              color: getColor(h.count),
              fillColor: getColor(h.count),
              fillOpacity: 0.15,
              weight: 1.2,
            }}
          >
            <Tooltip>
              {h.pincode} — {h.count} points
            </Tooltip>
          </Polygon>
        ))}

        <ClusterLayer points={filteredPoints} />
      </MapContainer>
    </div>
  );
}
