import './App.css';
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

import Rosenew from './models/Piano_rose_new.jsx';
import Glowing_Flower from './models/Chinese_rose.jsx';
import Dry_flower from './models/Dry_flower.jsx';
import PurpleGermaniumflOWER from './models/PurpleGermaniumflOWER.jsx';
import Margarita_flower from './models/Margarita_flower.jsx';
import Flowers_antenna from './models/Flowers_antenna.jsx';
import Dry_flower_New_imp from './models/Dry_flower_new.jsx';

import roseSound from './assets/Sounds/Rose.MP3';
import bouquetSound from './assets/Sounds/Bouquet.MP3';
import antennaSound from './assets/Sounds/Antenna.MP3';
import chinaRoseSound from './assets/Sounds/China_Rose.MP3';
import germaniumSound from './assets/Sounds/Germanium.MP3';
import margaritaSound from './assets/Sounds/Margarita.MP3';
import topLeftFlowerSound from './assets/Sounds/Top-LeftFlower.MP3';


import Flower from './Flower.jsx';

function App() {
  const [songName, setSongName] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);

  const flowers = [
    { model: Rosenew, sound: roseSound, song: 'Can I call you Rose? By Thee Sacred Souls', position: [0, 0, 0], sparkleColor: "rgb(120, 50, 29)" },
    { model: Margarita_flower, sound: margaritaSound, song: "Dancin\' by Aaron Smith", position: [1, 0.8, 0], sparkleColor: "rgb(255,209,255)" },
    { model: Glowing_Flower, sound: chinaRoseSound, song: 'Talking to the Moon by Bruno Mars', position: [-1, -1.11, 0], sparkleColor: "rgb(170,1,30)" },
    { model: Dry_flower, sound: topLeftFlowerSound, song: "Can\'t Help Falling in Love By Elvis Presley", position: [-1, 0.76, 0], sparkleColor: "rgb(255,209,255)" },
    { model: PurpleGermaniumflOWER, sound: germaniumSound, song: 'From The Start By Laufey', position: [1, -0.82, 0], sparkleColor: "rgb(130,81,215)" },
    { model: Flowers_antenna, sound: antennaSound, song: 'Amend By J^p^n', position: [1.8, 0, 0], sparkleColor: "rgb(253,104,87)" },
    { model: Dry_flower_New_imp, sound: bouquetSound, song: 'Pink + White by Frank Ocean', position: [-1.8, 0, 0], sparkleColor: "rgb(222,84,59)" },
  ];

  return (
    <>
      <Canvas onCreated={(state) => state.gl.setClearColor(0x000000, 1)}>
        <fog attach="fog" color="white" near={0.1} far={15} />
        <PerspectiveCamera makeDefault position={[0, 0, 1.9]} fov={75} />
        <ambientLight />
        <Suspense fallback={null}>
          {flowers.map((flower, index) => (
            <Flower
              key={index}
              model={flower.model}
              sound={flower.sound}
              song={flower.song}
              position={flower.position}
              sparkleColor={flower.sparkleColor}
              setSongName={setSongName}
              currentAudio={currentAudio}
              setCurrentAudio={setCurrentAudio}
            />
          ))}
        </Suspense>
      </Canvas>
      {songName && <div className="song-name-container">{songName}</div>}
    </>
  );
}

export default App;
