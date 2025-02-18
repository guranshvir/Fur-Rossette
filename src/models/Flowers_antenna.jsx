/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 flowers_antenna.glb 
Author: OsianOHM (https://sketchfab.com/OsianOHM)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/spider-lily-lycoris-radiata-1c7b5a307dbd40218adf2c7fcd88d8cd
Title: Spider Lily (Lycoris Radiata)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import scene from "/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/assets/Flower_Antenna/compressed.glb"

export default function Model(props) {
  const { nodes, materials } = useGLTF(scene)
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh geometry={nodes.LycorisRadiata_LycorisRadiataTexture_0.geometry} material={materials.LycorisRadiataTexture} rotation={[-0.39, 0.147, -1.001]} scale={0.357} />
      </group>
    </group>
  )
}

useGLTF.preload(scene)
