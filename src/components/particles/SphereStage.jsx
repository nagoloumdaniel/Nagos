import React, { useMemo } from 'react';
import ParticleSphere from './ParticleSphere';
import sphereSource from './ParticleSphere.jsx?raw';
import { EditorWindow } from '../ide/Ide';
import './SphereStage.css';

/* Le code de la sphère défile tout seul (lent, infini) dans un éditeur placé derrière ;
   la sphère reste par-dessus, toujours interactive. L'éditeur n'est pas scrollable à la main. */
const SphereStage = () => {
  const files = useMemo(() => ({
    'ParticleSphere.jsx': { lang: 'js', lines: sphereSource.split(/\r?\n/) },
  }), []);

  return (
    <div className="sphere-stage">
      <EditorWindow files={files} label="Code de la sphère" autoScroll />
      <div className="sphere-stage__sphere">
        <ParticleSphere />
      </div>
    </div>
  );
};

export default SphereStage;
