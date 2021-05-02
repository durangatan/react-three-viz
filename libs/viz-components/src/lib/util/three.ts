import * as Three from 'three';
export function transformMesh(mesh, transform) {
  const positions = mesh.geometry.attributes.position.array;
  for (let i = 0, l = positions.length; i < l; i += 3) {
    const vector = new Three.Vector3(
      positions[i],
      positions[i + 1],
      positions[i + 2]
    );
    transform(vector);
    positions[i] = vector.x;
    positions[i + 1] = vector.y;
    positions[i + 2] = vector.z;
  }
  mesh.geometry.attributes.normal.needsUpdate = true;
  mesh.geometry.attributes.position.needsUpdate = true;
}
