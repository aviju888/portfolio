'use client';

import React from 'react';
import { SoftwareHero } from '../components/domain/SoftwareHero';
import { SoftwareProjects } from '../components/domain/SoftwareProjects';
import { SoftwareSkills } from '../components/domain/SoftwareSkills';

export default function SoftwarePage() {
  return (
    <div className="bg-black min-h-screen">
      <SoftwareHero />
      <SoftwareProjects />
      <SoftwareSkills />
    </div>
  );
} 