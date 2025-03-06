'use client';

import React from 'react';
import { CreativeHero } from '../components/domain/CreativeHero';
import { CreativeProjects } from '../components/domain/CreativeProjects';
import { CreativeSkills } from '../components/domain/CreativeSkills';

export default function CreativePage() {
  return (
    <div className="bg-black min-h-screen">
      <CreativeHero />
      <CreativeProjects />
      <CreativeSkills />
    </div>
  );
} 