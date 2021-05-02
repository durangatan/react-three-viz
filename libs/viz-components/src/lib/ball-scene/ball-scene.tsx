import React, { useRef } from 'react';
import * as Three from 'three';
import { useFrame } from '@react-three/fiber';
import SimplexNoise from 'simplex-noise';
import { getArrayReduction } from '../util/array';
import { modulate } from '../util/math';
import { transformMesh } from '../util/three';
import { Theme } from '../themes/themes';

export interface BallSceneProps {
  analyzer?: AnalyserNode;
  theme: Theme;
  changeTheme: () => void;
}

function drawBall(mesh, bassFr, treFr, noise) {
  transformMesh(mesh, (vector) => {
    const offset = mesh.geometry.parameters.radius;
    const amp = 1;
    const time = window.performance.now();
    vector.normalize();
    const rf = 0.00001;
    const noiseyBoy = noise.noise3D(
      vector.x + time * rf * 7,
      vector.y + time * rf * 8,
      vector.z + time * rf * 9
    );
    const distance = offset + bassFr + noiseyBoy * amp * treFr;
    vector.multiplyScalar(distance);
  });
}

function drawWires(mesh, distortionFr, noise) {
  transformMesh(mesh, (vector) => {
    const amp = 2;
    const time = Date.now();
    const distance =
      (noise.noise2D(vector.x + time * 0.0003, vector.y + time * 0.0001) + 0) *
      distortionFr *
      amp;

    vector.z = distance;
  });
}

export function BallScene({ analyzer, theme }) {
  const ball = useRef(null);
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const spot = useRef(null);
  const group = useRef(null);
  const noise = useRef(new SimplexNoise()).current;
  useFrame(({ scene, camera }) => {
    scene.background = new Three.Color(theme.background);
    if (analyzer) {
      const freqDataArray = new Uint8Array(analyzer.frequencyBinCount);
      analyzer.getByteFrequencyData(freqDataArray);
      const { lowerMaxFr, lowerAvgFr, upperAvgFr } = getArrayReduction(
        freqDataArray
      );
      drawWires(plane1.current, modulate(upperAvgFr, 0, 1, 0.5, 4), noise);
      drawWires(plane2.current, modulate(lowerAvgFr, 0, 1, 0.5, 4), noise);
      drawBall(
        ball.current,
        modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8),
        modulate(upperAvgFr, 0, 1, 0, 4),
        noise
      );
      group.current.rotation.y += 0.005;
    }
  });
  return (
    <>
      <ambientLight args={[0xaaaaaa]} />
      <spotLight
        args={[0xffffff]}
        intensity={0.9}
        position={[-10, 40, 20]}
        castShadow
        ref={spot}
      />

      <group ref={group}>
        <mesh ref={ball}>
          <icosahedronBufferGeometry args={[4, 10]} />
          <meshLambertMaterial
            args={[{ color: new Three.Color(theme.primary), wireframe: true }]}
          />
        </mesh>
        <mesh
          ref={plane1}
          position={[0, 30, 0]}
          rotation={[-0.5 * Math.PI, 0, 0]}
        >
          <planeGeometry args={[800, 800, 20, 20]} />
          <meshLambertMaterial
            args={[
              {
                color: new Three.Color(theme.secondary),
                side: Three.DoubleSide,
                wireframe: true,
              },
            ]}
          />
        </mesh>
        <mesh
          ref={plane2}
          position={[0, -30, 0]}
          rotation={[-0.5 * Math.PI, 0, 0]}
        >
          <planeGeometry args={[800, 800, 20, 20]} />
          <meshLambertMaterial
            args={[
              {
                color: new Three.Color(theme.tertiary),
                side: Three.DoubleSide,
                wireframe: true,
              },
            ]}
          />
        </mesh>
      </group>
    </>
  );
}

export default BallScene;
