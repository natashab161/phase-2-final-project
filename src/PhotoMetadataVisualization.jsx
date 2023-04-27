// import React, { useEffect, useState } from 'react';
// import { app } from './Firebase';
// import 'firebase/database';

// const PhotoMetadataVisualization = () => {
// const [metadata, setMetadata] = useState([]);

//   useEffect(() => {
//     const database = app.database();
//     const metadataRef = database.ref('photo_metadata');
//     metadataRef.on('value', (snapshot) => {
//       const data = snapshot.val();
//       const metadata = [];

//       for (const key in data) {
//         const photoMetadata = data[key];
//         const imageUrl = photoMetadata.imageUrl;
//         const objects = photoMetadata.objects || [];
//         const labels = photoMetadata.labels || [];
//         const faces = photoMetadata.faces || [];

//         for (const object of objects) {
//           metadata.push({
//             imageUrl,
//             type: 'object',
//             description: object.name,
//             score: object.score,
//           });
//         }

//         for (const label of labels) {
//           metadata.push({
//             imageUrl,
//             type: 'label',
//             description: label,
//             score: null,
//           });
//         }

//         for (let i = 0; i < faces; i++) {
//           metadata.push({
//             imageUrl,
//             type: 'face',
//             description: `face_${i + 1}`,
//             score: null,
//           });
//         }
//       }

//       setMetadata(metadata);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Photo Metadata Visualization</h1>
//       {metadata.map((item, index) => (
//         <div key={index}>
//           <img src={item.imageUrl} alt="" />
//           <p>Type: {item.type}</p>
//           <p>Description: {item.description}</p>
//           <p>Score: {item.score}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PhotoMetadataVisualization;