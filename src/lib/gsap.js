'use client';

// Single place to register GSAP plugins (all free since GSAP 3.13).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);
  gsap.config({ nullTargetWarn: false });
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, useGSAP };
