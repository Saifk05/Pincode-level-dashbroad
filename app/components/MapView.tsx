// // "use client";

// // import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// // import MarkerClusterGroup from "react-leaflet-cluster";
// // import Papa from "papaparse";
// // import { useEffect, useState } from "react";
// // import L from "leaflet";

// // // Define interface for one row in your CSV
// // interface CSVRow {
// //   action?: string;
// //   created_time?: string;
// //   bap_id?: string;
// //   transaction_id?: string;
// //   message_id?: string;
// //   category_id?: string;
// //   category?: string;
// //   start_gps?: string;
// //   start_area_code?: string;
// //   end_gps?: string;
// //   end_area_code?: string;
// // }

// // // Leaflet Marker Icon
// // const icon = new L.Icon({
// //   iconUrl: "/marker-icon.png",
// //   iconSize: [25, 41],
// //   iconAnchor: [12, 41],
// // });

// // export default function MapView() {
// //   const [data, setData] = useState<CSVRow[]>([]);

// //   useEffect(() => {
// //     Papa.parse<CSVRow>("/data.csv", {
// //       download: true,
// //       header: true,
// //       skipEmptyLines: true,
// //       complete: (result) => {
// //         console.log("Loaded rows:", result.data.length);
// //         setData(result.data);
// //       },
// //     });
// //   }, []);

// //   return (
// //     <MapContainer
// //       center={[20.5937, 78.9629]}  // India
// //       zoom={5}
// //       style={{ height: "100vh", width: "100%" }}
// //     >
// //       <TileLayer
// //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //         attribution="© OpenStreetMap contributors"
// //       />

// //       <MarkerClusterGroup>
// //         {data.map((row, index) => {
// //           if (!row.start_gps) return null;

// //           // GPS format example: "28.7041,77.1025"
// //           const [lat, lng] = row.start_gps.split(",").map(Number);

// //           // If invalid numbers → skip
// //           if (isNaN(lat) || isNaN(lng)) return null;

// //           return (
// //             <Marker
// //               key={index}
// //               position={[lat, lng]}
// //               icon={icon}
// //             >
// //               <Popup>
// //                 <b>Action:</b> {row.action} <br />
// //                 <b>Start Area:</b> {row.start_area_code} <br />
// //                 <b>End Area:</b> {row.end_area_code} <br />
// //                 <b>Category:</b> {row.category}
// //               </Popup>
// //             </Marker>
// //           );
// //         })}
// //       </MarkerClusterGroup>
// //     </MapContainer>
// //   );
// // }


// // "use client";

// // import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
// // import { useEffect, useMemo, useState } from "react";   
// // import supercluster from "supercluster";
// // import L from "leaflet";
// // import Papa from "papaparse";

// // interface CSVRow {
// //   start_gps?: string;
// //   start_area_code?: string;
// //   end_area_code?: string;
// //   category?: string;
// // }

// // interface PointFeature {
// //   type: "Feature";
// //   geometry: { type: "Point"; coordinates: [number, number] };
// //   properties: { row: CSVRow };
// // }

// // const icon = new L.Icon({
// //   iconUrl: "/marker-icon.png",
// //   iconSize: [25, 41],
// //   iconAnchor: [12, 41],
// // });

// // // Rerender clusters when map moves
// // function ClusterLayer({ points }: { points: PointFeature[] }) {
// //   const map = useMap();
// //   const [clusters, setClusters] = useState<any[]>([]);

// //   const index = useMemo(() => {
// //     const cluster = new supercluster({
// //       radius: 60,
// //       maxZoom: 17,
// //     });
// //     cluster.load(points);
// //     return cluster;
// //   }, [points]);

// //   useEffect(() => {
// //     const update = () => {
// //       const bounds = map.getBounds();
// //       const zoom = map.getZoom();

// //       const clusterData = index.getClusters(
// //         [
// //           bounds.getWest(),
// //           bounds.getSouth(),
// //           bounds.getEast(),
// //           bounds.getNorth(),
// //         ],
// //         Math.round(zoom)
// //       );
// //       setClusters(clusterData);
// //     };

// //     update();
// //     map.on("moveend", update);

// //     return () => {
// //       map.off("moveend", update);
// //     };
// //   }, [index, map]);

// //   return (
// //     <>
// //       {clusters.map((cluster: any, i: number) => {
// //         const [lng, lat] = cluster.geometry.coordinates;

// //         // CLUSTER
// //         if (cluster.properties.cluster) {
// //           const count = cluster.properties.point_count;

// //           return (
// //             <CircleMarker
// //               key={i}
// //               center={[lat, lng]}
// //               radius={15 + Math.min(count / 50, 25)}
// //               fillOpacity={0.6}
// //               color="red"
// //               eventHandlers={{
// //                 click: () => {
// //                   const expansionZoom = index.getClusterExpansionZoom(
// //                     cluster.properties.cluster_id
// //                   );
// //                   map.setView([lat, lng], expansionZoom);
// //                 },
// //               }}
// //             >
// //               <Popup>{count} locations</Popup>
// //             </CircleMarker>
// //           );
// //         }

// //         // SINGLE POINT
// //         return (
// //           <Marker key={i} position={[lat, lng]} icon={icon}>
// //             <Popup>
// //               <b>Start Area:</b> {cluster.properties.row.start_area_code}
// //               <br />
// //               <b>End Area:</b> {cluster.properties.row.end_area_code}
// //               <br />
// //               <b>Category:</b> {cluster.properties.row.category}
// //             </Popup>
// //           </Marker>
// //         );
// //       })}
// //     </>
// //   );
// // }

// // export default function MapView() {
// //   const [points, setPoints] = useState<PointFeature[]>([]);

// //   useEffect(() => {
// //     Papa.parse<CSVRow>("/data.csv", {
// //       download: true,
// //       header: true,
// //       skipEmptyLines: true,
// //       complete: (result) => {
// //         const pts: PointFeature[] = [];

// //         result.data.forEach((row) => {
// //           if (!row.start_gps) return;

// //           const [lat, lng] = row.start_gps.split(",").map(Number);
// //           if (isNaN(lat) || isNaN(lng)) return;

// //           pts.push({
// //             type: "Feature",
// //             geometry: { type: "Point", coordinates: [lng, lat] }, // GeoJSON = [lng, lat]
// //             properties: { row },
// //           });
// //         });

// //         setPoints(pts);
// //       },
// //     });
// //   }, []);

// //   return (
// //     <MapContainer
// //       center={[20.5937, 78.9629]}
// //       zoom={5}
// //       style={{ height: "100vh", width: "100%" }}
// //     >
// //       <TileLayer
// //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //         attribution="© OpenStreetMap contributors"
// //       />

// //       <ClusterLayer points={points} />
// //     </MapContainer>
// //   );
// // }


// // "use client";

// // import {
// //   MapContainer,
// //   TileLayer,
// //   Marker,
// //   Popup,
// //   CircleMarker,
// //   useMap,
// // } from "react-leaflet";
// // import { useEffect, useMemo, useState } from "react";
// // import supercluster from "supercluster";
// // import L from "leaflet";
// // import Papa from "papaparse";

// // // CSV row interface
// // interface CSVRow {
// //   start_gps?: string;
// //   start_area_code?: string;
// //   end_area_code?: string;
// //   category?: string;
// // }

// // interface PointFeature {
// //   type: "Feature";
// //   geometry: { type: "Point"; coordinates: [number, number] };
// //   properties: { row: CSVRow };
// // }

// // const icon = new L.Icon({
// //   iconUrl: "/marker-icon.png",
// //   iconSize: [25, 41],
// //   iconAnchor: [12, 41],
// // });

// // // Cluster renderer
// // function ClusterLayer({ points }: { points: PointFeature[] }) {
// //   const map = useMap();
// //   const [clusters, setClusters] = useState<any[]>([]);

// //   const index = useMemo(() => {
// //     const cluster = new supercluster({
// //       radius: 60,
// //       maxZoom: 17,
// //     });
// //     cluster.load(points);
// //     return cluster;
// //   }, [points]);

// //   useEffect(() => {
// //     const update = () => {
// //       const bounds = map.getBounds();
// //       const zoom = map.getZoom();

// //       const clusterData = index.getClusters(
// //         [
// //           bounds.getWest(),
// //           bounds.getSouth(),
// //           bounds.getEast(),
// //           bounds.getNorth(),
// //         ],
// //         Math.round(zoom)
// //       );

// //       setClusters(clusterData);
// //     };

// //     update();
// //     map.on("moveend", update);

// //     return () => {
// //       map.off("moveend", update);
// //     };
// //   }, [index, map]);

// //   return (
// //     <>
// //       {clusters.map((cluster: any, i: number) => {
// //         const [lng, lat] = cluster.geometry.coordinates;

// //         // Cluster
// //         if (cluster.properties.cluster) {
// //           const count = cluster.properties.point_count;

// //           return (
// //             <CircleMarker
// //               key={i}
// //               center={[lat, lng]}
// //               radius={15 + Math.min(count / 50, 25)}
// //               fillOpacity={0.6}
// //               color="red"
// //               eventHandlers={{
// //                 click: () => {
// //                   const nextZoom = index.getClusterExpansionZoom(
// //                     cluster.properties.cluster_id
// //                   );
// //                   map.setView([lat, lng], nextZoom);
// //                 },
// //               }}
// //             >
// //               <Popup>{count} locations</Popup>
// //             </CircleMarker>
// //           );
// //         }

// //         // Single point
// //         return (
// //           <Marker key={i} position={[lat, lng]} icon={icon}>
// //             <Popup>
// //               <b>Start Area:</b> {cluster.properties.row.start_area_code}
// //               <br />
// //               <b>End Area:</b> {cluster.properties.row.end_area_code}
// //               <br />
// //               <b>Category:</b> {cluster.properties.row.category}
// //             </Popup>
// //           </Marker>
// //         );
// //       })}
// //     </>
// //   );
// // }

// // export default function MapView() {
// //   const [rawData, setRawData] = useState<PointFeature[]>([]);
// //   const [filteredData, setFilteredData] = useState<PointFeature[]>([]);

// //   // Filter states
// //   const [categoryFilter, setCategoryFilter] = useState("ALL");
// //   const [startAreaFilter, setStartAreaFilter] = useState("ALL");

// //   // Load CSV
// //   useEffect(() => {
// //     Papa.parse<CSVRow>("/data.csv", {
// //       download: true,
// //       header: true,
// //       skipEmptyLines: true,
// //       complete: (result) => {
// //         const pts: PointFeature[] = [];

// //         result.data.forEach((row) => {
// //           if (!row.start_gps) return;

// //           const [lat, lng] = row.start_gps.split(",").map(Number);
// //           if (isNaN(lat) || isNaN(lng)) return;

// //           pts.push({
// //             type: "Feature",
// //             geometry: { type: "Point", coordinates: [lng, lat] },
// //             properties: { row },
// //           });
// //         });

// //         setRawData(pts);
// //         setFilteredData(pts);
// //       },
// //     });
// //   }, []);

// //   // Apply filters
// //   useEffect(() => {
// //     let updated = rawData;

// //     if (categoryFilter !== "ALL") {
// //       updated = updated.filter(
// //         (p) => p.properties.row.category === categoryFilter
// //       );
// //     }

// //     if (startAreaFilter !== "ALL") {
// //       updated = updated.filter(
// //         (p) => p.properties.row.start_area_code === startAreaFilter
// //       );
// //     }

// //     setFilteredData(updated);
// //   }, [categoryFilter, startAreaFilter, rawData]);

// //   // Extract unique values for filter dropdowns
// //   const categories = Array.from(
// //     new Set(rawData.map((p) => p.properties.row.category))
// //   );

// //   const startAreas = Array.from(
// //     new Set(rawData.map((p) => p.properties.row.start_area_code))
// //   );

// //   return (
// //     <>
// //       {/* FILTER PANEL */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           zIndex: 1000,
// //           background: "white",
// //           padding: "10px",
// //           borderRadius: "8px",
// //           margin: "10px",
// //           boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
// //         }}
// //       >
// //         <h4>Filters</h4>

// //         {/* Category Filter */}
// //         <select
// //           value={categoryFilter}
// //           onChange={(e) => setCategoryFilter(e.target.value)}
// //           style={{ width: "180px", marginBottom: "10px" }}
// //         >
// //           <option value="ALL">All Categories</option>
// //           {categories.map((cat, i) => (
// //             <option key={i} value={cat || ""}>
// //               {cat || "Unknown"}
// //             </option>
// //           ))}
// //         </select>

// //         {/* Start Area Filter */}
// //         <select
// //           value={startAreaFilter}
// //           onChange={(e) => setStartAreaFilter(e.target.value)}
// //           style={{ width: "180px" }}
// //         >
// //           <option value="ALL">All Start Area Codes</option>
// //           {startAreas.map((area, i) => (
// //             <option key={i} value={area || ""}>
// //               {area || "Unknown"}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* MAP */}
// //       <MapContainer
// //         center={[20.5937, 78.9629]}
// //         zoom={5}
// //         style={{ height: "100vh", width: "100%" }}
// //       >
// //         <TileLayer
// //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           attribution="© OpenStreetMap contributors"
// //         />

// //         <ClusterLayer points={filteredData} />
// //       </MapContainer>
// //     </>
// //   );
// // }


// // "use client";

// // import {
// //   MapContainer,
// //   TileLayer,
// //   Marker,
// //   Popup,
// //   CircleMarker,
// //   useMap,
// // } from "react-leaflet";
// // import { useEffect, useMemo, useState } from "react";
// // import supercluster from "supercluster";
// // import L from "leaflet";
// // import Papa from "papaparse";

// // // CSV row interface
// // interface CSVRow {
// //   start_gps?: string;
// //   start_area_code?: string; // <-- we will call this PINCODE in UI
// //   end_area_code?: string;
// //   category?: string;
// // }

// // interface PointFeature {
// //   type: "Feature";
// //   geometry: { type: "Point"; coordinates: [number, number] };
// //   properties: { row: CSVRow };
// // }

// // const icon = new L.Icon({
// //   iconUrl: "/marker-icon.png",
// //   iconSize: [25, 41],
// //   iconAnchor: [12, 41],
// // });

// // // Cluster renderer
// // function ClusterLayer({ points }: { points: PointFeature[] }) {
// //   const map = useMap();
// //   const [clusters, setClusters] = useState<any[]>([]);

// //   const index = useMemo(() => {
// //     const cluster = new supercluster({
// //       radius: 60,
// //       maxZoom: 17,
// //     });
// //     cluster.load(points);
// //     return cluster;
// //   }, [points]);

// //   useEffect(() => {
// //     const update = () => {
// //       const bounds = map.getBounds();
// //       const zoom = map.getZoom();

// //       const clusterData = index.getClusters(
// //         [
// //           bounds.getWest(),
// //           bounds.getSouth(),
// //           bounds.getEast(),
// //           bounds.getNorth(),
// //         ],
// //         Math.round(zoom)
// //       );

// //       setClusters(clusterData);
// //     };

// //     update();
// //     map.on("moveend", update);

// //     return () => {
// //       map.off("moveend", update);
// //     };
// //   }, [index, map]);

// //   return (
// //     <>
// //       {clusters.map((cluster: any, i: number) => {
// //         const [lng, lat] = cluster.geometry.coordinates;

// //         // Cluster
// //         if (cluster.properties.cluster) {
// //           const count = cluster.properties.point_count;

// //           return (
// //             <CircleMarker
// //               key={i}
// //               center={[lat, lng]}
// //               radius={15 + Math.min(count / 50, 25)}
// //               fillOpacity={0.6}
// //               color="red"
// //               eventHandlers={{
// //                 click: () => {
// //                   const nextZoom = index.getClusterExpansionZoom(
// //                     cluster.properties.cluster_id
// //                   );
// //                   map.setView([lat, lng], nextZoom);
// //                 },
// //               }}
// //             >
// //               <Popup>{count} locations</Popup>
// //             </CircleMarker>
// //           );
// //         }

// //         // Single point
// //         return (
// //           <Marker key={i} position={[lat, lng]} icon={icon}>
// //             <Popup>
// //               <b>Pincode:</b> {cluster.properties.row.start_area_code}
// //               <br />
// //               <b>End Area:</b> {cluster.properties.row.end_area_code}
// //               <br />
// //               <b>Category:</b> {cluster.properties.row.category}
// //             </Popup>
// //           </Marker>
// //         );
// //       })}
// //     </>
// //   );
// // }

// // export default function MapView() {
// //   const [rawData, setRawData] = useState<PointFeature[]>([]);
// //   const [filteredData, setFilteredData] = useState<PointFeature[]>([]);

// //   // Filter states
// //   const [categoryFilter, setCategoryFilter] = useState("ALL");
// //   const [pincodeFilter, setPincodeFilter] = useState("ALL");

// //   // Load CSV
// //   useEffect(() => {
// //     Papa.parse<CSVRow>("/data.csv", {
// //       download: true,
// //       header: true,
// //       skipEmptyLines: true,
// //       complete: (result) => {
// //         const pts: PointFeature[] = [];

// //         result.data.forEach((row) => {
// //           if (!row.start_gps) return;

// //           const [lat, lng] = row.start_gps.split(",").map(Number);
// //           if (isNaN(lat) || isNaN(lng)) return;

// //           pts.push({
// //             type: "Feature",
// //             geometry: { type: "Point", coordinates: [lng, lat] },
// //             properties: { row },
// //           });
// //         });

// //         setRawData(pts);
// //         setFilteredData(pts);
// //       },
// //     });
// //   }, []);

// //   // Apply filters
// //   useEffect(() => {
// //     let updated = rawData;

// //     if (categoryFilter !== "ALL") {
// //       updated = updated.filter(
// //         (p) => p.properties.row.category === categoryFilter
// //       );
// //     }

// //     if (pincodeFilter !== "ALL") {
// //       updated = updated.filter(
// //         (p) => p.properties.row.start_area_code === pincodeFilter
// //       );
// //     }

// //     setFilteredData(updated);
// //   }, [categoryFilter, pincodeFilter, rawData]);

// //   // Extract unique dropdown values
// //   const categories = Array.from(
// //     new Set(rawData.map((p) => p.properties.row.category))
// //   );

// //   const pincodes = Array.from(
// //     new Set(rawData.map((p) => p.properties.row.start_area_code))
// //   );

// //   return (
// //     <>
// //       {/* FILTER PANEL */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           zIndex: 1000,
// //           background: "white",
// //           padding: "10px",
// //           borderRadius: "8px",
// //           margin: "10px",
// //           boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
// //         }}
// //       >
// //         <h4>Filters</h4>

// //         {/* Category Filter */}
// //         <select
// //           value={categoryFilter}
// //           onChange={(e) => setCategoryFilter(e.target.value)}
// //           style={{ width: "180px", marginBottom: "10px" }}
// //         >
// //           <option value="ALL">All Categories</option>
// //           {categories.map((cat, i) => (
// //             <option key={i} value={cat || ""}>
// //               {cat || "Unknown"}
// //             </option>
// //           ))}
// //         </select>

// //         {/* PINCODE Filter */}
// //         <select
// //           value={pincodeFilter}
// //           onChange={(e) => setPincodeFilter(e.target.value)}
// //           style={{ width: "180px" }}
// //         >
// //           <option value="ALL">All Pincodes</option>
// //           {pincodes.map((p, i) => (
// //             <option key={i} value={p || ""}>
// //               {p || "Unknown"}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* MAP */}
// //       <MapContainer
// //         center={[20.5937, 78.9629]}
// //         zoom={5}
// //         style={{ height: "100vh", width: "100%" }}
// //       >
// //         <TileLayer
// //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           attribution="© OpenStreetMap contributors"
// //         />

// //         <ClusterLayer points={filteredData} />
// //       </MapContainer>
// //     </>
// //   );
// // }


// "use client";

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   CircleMarker,
//   Tooltip,
//   useMap,
// } from "react-leaflet";
// import { useEffect, useMemo, useState } from "react";
// import supercluster from "supercluster";
// import L from "leaflet";
// import Papa from "papaparse";

// // CSV row interface
// interface CSVRow {
//   start_gps?: string;
//   start_area_code?: string; // PINCODE
//   end_area_code?: string;
//   category?: string;
// }

// interface PointFeature {
//   type: "Feature";
//   geometry: { type: "Point"; coordinates: [number, number] };
//   properties: { row: CSVRow };
// }

// const icon = new L.Icon({
//   iconUrl: "/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// // Cluster renderer
// function ClusterLayer({ points }: { points: PointFeature[] }) {
//   const map = useMap();
//   const [clusters, setClusters] = useState<any[]>([]);

//   const index = useMemo(() => {
//     const cluster = new supercluster({
//       radius: 60,
//       maxZoom: 17,
//     });
//     cluster.load(points);
//     return cluster;
//   }, [points]);

//   useEffect(() => {
//     const update = () => {
//       const bounds = map.getBounds();
//       const zoom = map.getZoom();

//       const clusterData = index.getClusters(
//         [
//           bounds.getWest(),
//           bounds.getSouth(),
//           bounds.getEast(),
//           bounds.getNorth(),
//         ],
//         Math.round(zoom)
//       );

//       setClusters(clusterData);
//     };

//     update();
//     map.on("moveend", update);

//     return () => {
//       map.off("moveend", update);
//     };
//   }, [index, map]);

//   return (
//     <>
//       {clusters.map((cluster: any, i: number) => {
//         const [lng, lat] = cluster.geometry.coordinates;

//         // Cluster
//         if (cluster.properties.cluster) {
//           const count = cluster.properties.point_count;

//           return (
//             <CircleMarker
//               key={i}
//               center={[lat, lng]}
//               radius={15 + Math.min(count / 50, 25)}
//               fillOpacity={0.6}
//               color="red"
//               eventHandlers={{
//                 click: () => {
//                   const nextZoom = index.getClusterExpansionZoom(
//                     cluster.properties.cluster_id
//                   );
//                   map.setView([lat, lng], nextZoom);
//                 },
//               }}
//             >
//               {/* 🔵 Tooltip added */}
//               <Tooltip permanent direction="center">
//                 {count} locations
//               </Tooltip>

//               <Popup>{count} locations</Popup>
//             </CircleMarker>
//           );
//         }

//         // Single point
//         return (
//           <Marker key={i} position={[lat, lng]} icon={icon}>
//             {/* 🟢 Tooltip added */}
//             <Tooltip direction="top">
//               Pincode: {cluster.properties.row.start_area_code}
//             </Tooltip>

//             <Popup>
//               <b>Pincode:</b> {cluster.properties.row.start_area_code}
//               <br />
//               <b>End Area:</b> {cluster.properties.row.end_area_code}
//               <br />
//               <b>Category:</b> {cluster.properties.row.category}
//             </Popup>
//           </Marker>
//         );
//       })}
//     </>
//   );
// }

// export default function MapView() {
//   const [rawData, setRawData] = useState<PointFeature[]>([]);
//   const [filteredData, setFilteredData] = useState<PointFeature[]>([]);

//   // Filter states
//   const [categoryFilter, setCategoryFilter] = useState("ALL");
//   const [pincodeFilter, setPincodeFilter] = useState("ALL");

//   // Load CSV
//   useEffect(() => {
//     Papa.parse<CSVRow>("/data.csv", {
//       download: true,
//       header: true,
//       skipEmptyLines: true,
//       complete: (result) => {
//         const pts: PointFeature[] = [];

//         result.data.forEach((row) => {
//           if (!row.start_gps) return;

//           const [lat, lng] = row.start_gps.split(",").map(Number);
//           if (isNaN(lat) || isNaN(lng)) return;

//           pts.push({
//             type: "Feature",
//             geometry: { type: "Point", coordinates: [lng, lat] },
//             properties: { row },
//           });
//         });

//         setRawData(pts);
//         setFilteredData(pts);
//       },
//     });
//   }, []);

//   // Apply filters
//   useEffect(() => {
//     let updated = rawData;

//     if (categoryFilter !== "ALL") {
//       updated = updated.filter(
//         (p) => p.properties.row.category === categoryFilter
//       );
//     }

//     if (pincodeFilter !== "ALL") {
//       updated = updated.filter(
//         (p) => p.properties.row.start_area_code === pincodeFilter
//       );
//     }

//     setFilteredData(updated);
//   }, [categoryFilter, pincodeFilter, rawData]);

//   // Extract dropdown values
//   const categories = Array.from(
//     new Set(rawData.map((p) => p.properties.row.category))
//   );

//   const pincodes = Array.from(
//     new Set(rawData.map((p) => p.properties.row.start_area_code))
//   );

//   return (
//     <>
//       {/* FILTER PANEL */}
//       <div
//         style={{
//           position: "absolute",
//           zIndex: 1000,
//           background: "white",
//           padding: "10px",
//           borderRadius: "8px",
//           margin: "10px",
//           boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
//         }}
//       >
//         <h4>Filters</h4>

//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           style={{ width: "180px", marginBottom: "10px" }}
//         >
//           <option value="ALL">All Categories</option>
//           {categories.map((cat, i) => (
//             <option key={i} value={cat || ""}>
//               {cat || "Unknown"}
//             </option>
//           ))}
//         </select>

//         <select
//           value={pincodeFilter}
//           onChange={(e) => setPincodeFilter(e.target.value)}
//           style={{ width: "180px" }}
//         >
//           <option value="ALL">All Pincodes</option>
//           {pincodes.map((p, i) => (
//             <option key={i} value={p || ""}>
//               {p || "Unknown"}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* MAP */}
//       <MapContainer
//         center={[20.5937, 78.9629]}
//         zoom={5}
//         style={{ height: "100vh", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="© OpenStreetMap contributors"
//         />

//         <ClusterLayer points={filteredData} />
//       </MapContainer>
//     </>
//   );
// }


"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import supercluster from "supercluster";
import L from "leaflet";
import Papa from "papaparse";

// CSV row interface
interface CSVRow {
  start_gps?: string;
  start_area_code?: string; // PINCODE
  end_area_code?: string;
  category?: string;
}

interface PointFeature {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: { row: CSVRow };
}

const icon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Cluster renderer
function ClusterLayer({ points }: { points: PointFeature[] }) {
  const map = useMap();
  const [clusters, setClusters] = useState<any[]>([]);

  const index = useMemo(() => {
    const cluster = new supercluster({
      radius: 60,
      maxZoom: 17,
    });
    cluster.load(points);
    return cluster;
  }, [points]);

  useEffect(() => {
    const update = () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();

      const clusterData = index.getClusters(
        [
          bounds.getWest(),
          bounds.getSouth(),
          bounds.getEast(),
          bounds.getNorth(),
        ],
        Math.round(zoom)
      );

      setClusters(clusterData);
    };

    update();
    map.on("moveend", update);

    return () => {
      map.off("moveend", update);
    };
  }, [index, map]);

  return (
    <>
      {clusters.map((cluster: any, i: number) => {
        const [lng, lat] = cluster.geometry.coordinates;

        // Cluster
        if (cluster.properties.cluster) {
          const count = cluster.properties.point_count;

          return (
            <CircleMarker
              key={i}
              center={[lat, lng]}
              radius={15 + Math.min(count / 50, 25)}
              fillOpacity={0.6}
              color="red"
              eventHandlers={{
                click: () => {
                  const nextZoom = index.getClusterExpansionZoom(
                    cluster.properties.cluster_id
                  );
                  map.setView([lat, lng], nextZoom);
                },
              }}
            >
              {/* Tooltip only on hover */}
              <Tooltip direction="top">
                {count} locations
              </Tooltip>

              <Popup>{count} locations</Popup>
            </CircleMarker>
          );
        }

        // Single point
        return (
          <Marker key={i} position={[lat, lng]} icon={icon}>
            {/* Tooltip only on hover */}
            <Tooltip direction="top">
              Pincode: {cluster.properties.row.start_area_code}
            </Tooltip>

            <Popup>
              <b>Pincode:</b> {cluster.properties.row.start_area_code}
              <br />
              <b>End Area:</b> {cluster.properties.row.end_area_code}
              <br />
              <b>Category:</b> {cluster.properties.row.category}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default function MapView() {
  const [rawData, setRawData] = useState<PointFeature[]>([]);
  const [filteredData, setFilteredData] = useState<PointFeature[]>([]);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [pincodeFilter, setPincodeFilter] = useState("ALL");

  // Load CSV
  useEffect(() => {
    Papa.parse<CSVRow>("/data.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const pts: PointFeature[] = [];

        result.data.forEach((row) => {
          if (!row.start_gps) return;

          const [lat, lng] = row.start_gps.split(",").map(Number);
          if (isNaN(lat) || isNaN(lng)) return;

          pts.push({
            type: "Feature",
            geometry: { type: "Point", coordinates: [lng, lat] },
            properties: { row },
          });
        });

        setRawData(pts);
        setFilteredData(pts);
      },
    });
  }, []);

  // Apply filters
  useEffect(() => {
    let updated = rawData;

    if (categoryFilter !== "ALL") {
      updated = updated.filter(
        (p) => p.properties.row.category === categoryFilter
      );
    }

    if (pincodeFilter !== "ALL") {
      updated = updated.filter(
        (p) => p.properties.row.start_area_code === pincodeFilter
      );
    }

    setFilteredData(updated);
  }, [categoryFilter, pincodeFilter, rawData]);

  // Extract dropdown values
  const categories = Array.from(
    new Set(rawData.map((p) => p.properties.row.category))
  );

  const pincodes = Array.from(
    new Set(rawData.map((p) => p.properties.row.start_area_code))
  );

  return (
    <>
      {/* FILTER PANEL */}
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          margin: "10px",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h4>Filters</h4>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ width: "180px", marginBottom: "10px" }}
        >
          <option value="ALL">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat || ""}>
              {cat || "Unknown"}
            </option>
          ))}
        </select>

        <select
          value={pincodeFilter}
          onChange={(e) => setPincodeFilter(e.target.value)}
          style={{ width: "180px" }}
        >
          <option value="ALL">All Pincodes</option>
          {pincodes.map((p, i) => (
            <option key={i} value={p || ""}>
              {p || "Unknown"}
            </option>
          ))}
        </select>
      </div>

      {/* MAP */}
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <ClusterLayer points={filteredData} />
      </MapContainer>
    </>
  );
}
