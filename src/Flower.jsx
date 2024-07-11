import * as THREE from 'three';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

const adjustMeshPivot = (mesh) => {
  if (mesh) {
    const box = new THREE.Box3().setFromObject(mesh);
    const center = box.getCenter(new THREE.Vector3());
    mesh.geometry.translate(-center.x, -center.y, -center.z);
  }
};

const fadeIn = (audio, duration) => {
  let volume = 0;
  audio.volume = volume;
  const interval = 200; // in ms
  const step = interval / (duration * 1000); // calculate step size

  const fade = setInterval(() => {
    if (volume < 1) {
      volume += step;
      if (volume > 1) volume = 1;
      audio.volume = volume;
    } else {
      clearInterval(fade);
    }
  }, interval);
};

const Flower = ({ model: Model, sound, song, position, sparkleColor, setSongName, currentAudio, setCurrentAudio }) => {
  const ref = useRef();
  const audioRef = useRef(new Audio(sound));
  const [isHovered, setIsHovered] = useState(false);

  useLayoutEffect(() => {
    if (ref.current) {
      adjustMeshPivot(ref.current);
    }
  }, []);

  useFrame(() => {
    if (ref.current && (isHovered || currentAudio === audioRef.current)) {
      ref.current.rotation.y += 0.025;
    }
  });

  const handleInteraction = () => {
    if (currentAudio && currentAudio !== audioRef.current) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setIsHovered(true);
    audioRef.current.volume = 0;
    audioRef.current.play();
    fadeIn(audioRef.current, 1);
    setSongName(song);
    setCurrentAudio(audioRef.current);
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setSongName('');
    setCurrentAudio(null);
  };

  return (
    <group position={position}>
      <mesh ref={ref} onPointerOver={handleInteraction} onPointerOut={handlePointerOut} onClick={handleInteraction} onTouchStart={handleInteraction}>
        <ambientLight />
        <Model />
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"black"} transparent opacity={0} wireframe/>
        </mesh>
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <Sparkles color={sparkleColor} count={50} scale={0.1 * 2} size={1.3} speed={0.1} />
      </mesh>
    </group>
  );
};

export default Flower;
