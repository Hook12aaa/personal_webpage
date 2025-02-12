'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function Background() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('position', 'fixed')
      .style('top', 0)
      .style('left', 0)
      .style('z-index', -1)
      .style('filter', 'blur(0.5px)');


    const defs = svg.append('defs');
    const gradient = defs.append('radialGradient')
      .attr('id', 'particleGradient');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'rgba(255, 255, 255, 0.2)');
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'rgba(255, 255, 255, 0)');


    const numParticles = 40;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1
    }));

 
    const particleGroups = svg.selectAll('g')
      .data(particles)
      .join('g')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    particleGroups.append('circle')
      .attr('r', d => d.size)
      .attr('fill', 'url(#particleGradient)')
      .attr('opacity', d => d.opacity);


    function updateConnections() {
      svg.selectAll('.connection').remove();
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            svg.append('line')
              .attr('class', 'connection')
              .attr('x1', p1.x)
              .attr('y1', p1.y)
              .attr('x2', p2.x)
              .attr('y2', p2.y)
              .attr('stroke', 'rgba(255, 255, 255, 0.05)')
              .attr('stroke-width', 0.5);
          }
        });
      });
    }


    function animate() {
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;


        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        particleGroups
          .attr('transform', d => `translate(${d.x},${d.y})`);
      });

      updateConnections();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      svg.remove();
    };
  }, []);

  return <div ref={containerRef} className="background" />;
}
