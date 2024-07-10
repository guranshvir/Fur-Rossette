import './App.css';
import * as THREE from 'three';
import React, { useState, useRef, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, PerspectiveCamera } from '@react-three/drei';

import Rosenew from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/models/Piano_rose_new.jsx';
import Glowing_Flower from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/models/Chinese_rose.jsx';
import Dry_flower from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/models/Dry_flower.jsx';
import PurpleGermaniumflOWER from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/models/PurpleGermaniumflOWER.jsx';
import Margarita_flower from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/models/Margarita_flower.jsx';
import Flowers_antenna from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/models/Flowers_antenna.jsx';
import Dry_flower_New_imp from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/models/Dry_flower_new.jsx';

import roseSound from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/assets/Sounds/Rose.MP3';
import bouquetSound from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/assets/Sounds/Bouquet.MP3';
import antennaSound from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/assets/Sounds/Antenna.MP3';
import chinaRoseSound from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/assets/Sounds/China_Rose.MP3';
import germaniumSound from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/assets/Sounds/Germanium.MP3';
import margaritaSound from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/assets/Sounds/Margarita.MP3';
import topLeftFlowerSound from '/Users/guranshvir/Documents/Rose-3D-Project/rose_vite_3d/react-3d-model/src/assets/Sounds/Top-LeftFlower.MP3';

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

const Rose = ({ position, setSongName }) => {
  const ref = useRef(); // Reference to the entire mesh
  const audioRef = useRef(new Audio(roseSound)); // Reference to the audio
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  // Adjusts the pivot of the mesh to its center once it's mounted
  useLayoutEffect(() => {
    if (ref.current) {
      adjustMeshPivot(ref.current);
    }
  }, []);

  // Rotates the mesh if it is hovered
  useFrame(() => {
    if (ref.current && isHovered) {
      ref.current.rotation.y += 0.035;
    }
  });

  // Event handler for pointer over event
  const handlePointerOver = () => {
    setIsHovered(true);
    audioRef.current.volume = 0;
    audioRef.current.play();
    fadeIn(audioRef.current, 1); // 1 second fade-in
    setSongName('Can I call you Rose? By Thee Sacred Souls');
  };

  // Event handler for pointer out event
  const handlePointerOut = () => {
    setIsHovered(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset audio to the beginning
    setSongName('');
  };

  return (
    <group position={position}>
      <mesh ref={ref} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <Rosenew />
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.3, 0.9, 0.3]} />
          <meshStandardMaterial color={"white"} transparent opacity={0} />
        </mesh>
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <Sparkles color={"rgb(120, 50, 29)"} count={50} scale={0.1 * 2} size={1.3} speed={0.1} />
      </mesh>
    </group>
  );
};

const GlowingFlower = ({ position, setSongName }) => {
  const ref = useRef(); // Reference to the entire mesh
  const audioRef = useRef(new Audio(chinaRoseSound)); // Reference to the audio
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  // Adjusts the pivot of the mesh to its center once it's mounted
  useLayoutEffect(() => {
    if (ref.current) {
      adjustMeshPivot(ref.current);
    }
  }, []);

  // Rotates the mesh if it is hovered
  useFrame(() => {
    if (ref.current && isHovered) {
      ref.current.rotation.y += 0.035;
    }
  });

  // Event handler for pointer over event
  const handlePointerOver = () => {
    setIsHovered(true);
    audioRef.current.volume = 0;
    audioRef.current.play();
    fadeIn(audioRef.current, 1); // 1 second fade-in
    setSongName('Talking to the Moon by Bruno Mars');
  };

  // Event handler for pointer out event
  const handlePointerOut = () => {
    setIsHovered(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset audio to the beginning
    setSongName('');
  };

  return (
    <group position={position}>
      <mesh ref={ref} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <ambientLight />
        <Glowing_Flower />
        <mesh position={[0, 0.24, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={"black"} transparent opacity={0} />
        </mesh>
      </mesh>
      <mesh  position={[0, 0.24, 0]}>
        <Sparkles color={"rgb(170,1,30)"} count={50} scale={0.1 * 2} size={1} speed={0.1} />
      </mesh>
    </group>
  );
};

const DryFlower = ({ position, setSongName }) => {
  const ref = useRef(); // Reference to the entire mesh
  const audioRef = useRef(new Audio(topLeftFlowerSound)); // Reference to the audio
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  // Adjusts the pivot of the mesh to its center once it's mounted
  useLayoutEffect(() => {
    if (ref.current) {
      adjustMeshPivot(ref.current);
    }
  }, []);

  // Rotates the mesh if it is hovered
  useFrame(() => {
    if (ref.current && isHovered) {
      ref.current.rotation.y += 0.03;
    }
  });

  // Event handler for pointer over event
  const handlePointerOver = () => {
    setIsHovered(true);
    audioRef.current.volume = 0;
    audioRef.current.play();
    fadeIn(audioRef.current, 1); // 1 second fade-in
    setSongName('Can\'t Help Falling in Love By Elvis Presley');
  };

  // Event handler for pointer out event
  const handlePointerOut = () => {
    setIsHovered(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset audio to the beginning
    setSongName('');
  };

  return (
    <group position={position}>
      <mesh ref={ref} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <ambientLight />
        <Dry_flower />
        <mesh position={[0, 0.24, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={"black"} transparent opacity={0} />
        </mesh>
      </mesh>
      <mesh  position={[0, 0.24, 0]}>
        <Sparkles color={"rgb(255,209,255)"} count={50} scale={0.1 * 2} size={1} speed={0.1} />
      </mesh>
    </group>
  );
};

const GermaniumFlower = ({ position, setSongName }) => {
  const ref = useRef(); // Reference to the entire mesh
  const audioRef = useRef(new Audio(germaniumSound)); // Reference to the audio
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  // Adjusts the pivot of the mesh to its center once it's mounted
  useLayoutEffect(() => {
    if (ref.current) {
      adjustMeshPivot(ref.current);
    }
  }, []);

  // Rotates the mesh if it is hovered
  useFrame(() => {
    if (ref.current && isHovered) {
      ref.current.rotation.y += 0.03;
    }
  });

  // Event handler for pointer over event
  const handlePointerOver = () => {
    setIsHovered(true);
    audioRef.current.volume = 0;
    audioRef.current.play();
    fadeIn(audioRef.current, 1); // 1 second fade-in
    setSongName('From The Start By Laufey');
  };

  // Event handler for pointer out event
  const handlePointerOut = () => {
    setIsHovered(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset audio to the beginning
    setSongName('');
  };

  return (
    <group position={position}>
      <mesh ref={ref} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <ambientLight />
        <PurpleGermaniumflOWER />
        <mesh position={[0, 0.24, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={"white"} transparent opacity={0} />
        </mesh>
      </mesh>
      <mesh  position={[0, 0.24, 0]}>
        <Sparkles color={"rgb(130,81,215)"} count={50} scale={0.1 * 2} size={1.3} speed={0.1} />
      </mesh>
    </group>
  );
};

const MargaritaFlower = ({ position, setSongName }) => {
  const ref = useRef(); // Reference to the entire mesh
  const audioRef = useRef(new Audio(margaritaSound)); // Reference to the audio
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  // Adjusts the pivot of the mesh to its center once it's mounted
  useLayoutEffect(() => {
    if (ref.current) {
      adjustMeshPivot(ref.current);
    }
  }, []);

  // Rotates the mesh if it is hovered
  useFrame(() => {
    if (ref.current && isHovered) {
      ref.current.rotation.y += 0.03;
    }
  });

  // Event handler for pointer over event
  const handlePointerOver = () => {
    setIsHovered(true);
    audioRef.current.volume = 0;
    audioRef.current.play();
    fadeIn(audioRef.current, 1); // 1 second fade-in
    setSongName('Dancin\' by Aaron Smith');
  };

  // Event handler for pointer out event
  const handlePointerOut = () => {
    setIsHovered(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset audio to the beginning
    setSongName('');
  };

  return (
    <group position={position}>
      <mesh ref={ref} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <ambientLight />
        <Margarita_flower />
        <mesh position={[0, 0.24, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={"black"} transparent opacity={0} />
        </mesh>
      </mesh>
      <mesh  position={[0, 0.24, 0]}>
        <Sparkles color={"rgb(255,209,255)"} count={50} scale={0.1 * 2} size={1.3} speed={0.1} />
      </mesh>
    </group>
  );
};

const FlowerAntenna = ({ position, setSongName }) => {
  const ref = useRef(); // Reference to the entire mesh
  const audioRef = useRef(new Audio(antennaSound)); // Reference to the audio
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  // Adjusts the pivot of the mesh to its center once it's mounted
  useLayoutEffect(() => {
    if (ref.current) {
      adjustMeshPivot(ref.current);
    }
  }, []);

  // Rotates the mesh if it is hovered
  useFrame(() => {
    if (ref.current && isHovered) {
      ref.current.rotation.y += 0.03;
    }
  });

  // Event handler for pointer over event
  const handlePointerOver = () => {
    setIsHovered(true);
    audioRef.current.volume = 0;
    audioRef.current.play();
    fadeIn(audioRef.current, 1); // 1 second fade-in
    setSongName('Amend By J^p^n');
  };

  // Event handler for pointer out event
  const handlePointerOut = () => {
    setIsHovered(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset audio to the beginning
    setSongName('');
  };

  return (
    <group position={position}>
      <mesh ref={ref} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <Flowers_antenna />
        <mesh position={[0, 0.24, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={"white"} transparent opacity={0} />
        </mesh>
      </mesh>
      <mesh  position={[0, 0.24, 0]}>
        <Sparkles color={"rgb(253,104,87)"} count={50} scale={0.1 * 2} size={1.3} speed={0.1} />
      </mesh>
    </group>
  );
};

const Dry_flower_New = ({ position, setSongName }) => {
  const ref = useRef(); // Reference to the entire mesh
  const audioRef = useRef(new Audio(bouquetSound)); // Reference to the audio
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  // Adjusts the pivot of the mesh to its center once it's mounted
  useLayoutEffect(() => {
    if (ref.current) {
      adjustMeshPivot(ref.current);
    }
  }, []);

  // Rotates the mesh if it is hovered
  useFrame(() => {
    if (ref.current && isHovered) {
      ref.current.rotation.y += 0.03;
    }
  });

  // Event handler for pointer over event
  const handlePointerOver = () => {
    setIsHovered(true);
    audioRef.current.volume = 0;
    audioRef.current.play();
    fadeIn(audioRef.current, 1); // 1 second fade-in
    setSongName('Pink + White by Frank Ocean');
  };

  // Event handler for pointer out event
  const handlePointerOut = () => {
    setIsHovered(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset audio to the beginning
    setSongName('');
  };

  return (
    <group position={position}>
      <mesh ref={ref} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <ambientLight />
        <Dry_flower_New_imp />
        <mesh position={[0, 0.24, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={"black"} transparent opacity={0} />
        </mesh>
      </mesh>
      <mesh  position={[0, 0.24, 0]}>
        <Sparkles color={"rgb(222,84,59)"} count={50} scale={0.1 * 2} size={1} speed={0.1} />
      </mesh>
    </group>
  );
};

function App() {
  const [songName, setSongName] = useState('');

  return (
    <>
      <Canvas
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 1); // Background color
        }}
      >
        <fog attach="fog" color="white" near={0.1} far={15} />
        <PerspectiveCamera makeDefault position={[0, 0, 1.9]} fov={75} />
        <ambientLight />
        <Suspense fallback={null}>
          <Rose position={[0, 0, 0]} setSongName={setSongName} />
          <MargaritaFlower position={[1, 0.8, 0]} setSongName={setSongName} />
          <GlowingFlower position={[-1, -1.11, 0]} setSongName={setSongName} />
          <DryFlower position={[-1, 0.76, 0]} setSongName={setSongName} />
          <GermaniumFlower position={[1, -0.82, 0]} setSongName={setSongName} />
          <FlowerAntenna position={[1.8, 0, 0]} setSongName={setSongName} />
          <Dry_flower_New position={[-1.8, 0, 0]} setSongName={setSongName} />
        </Suspense>
      </Canvas>
      {songName && <div className="song-name-container">{songName}</div>}
    </>
  );
}

export default App;
