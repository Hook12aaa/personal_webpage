import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import styles from './SkillsView.module.css';

const NETWORK_DESCRIPTION = {
  title: "Professional Neural Architecture",
  subtitle: "AI-Powered Career DNA Analysis",
  description: `Visualizing the synaptic connections between my core brand identity, 
    professional strengths, and impact communities.`,
  metrics: {
    nodes: 341,
    edges: 1364,
    communities: 16,
    influence_score: 0.92
  }
};

const NETWORK_LAYERS = [
  { 
    name: 'core', 
    title: 'Core Brand Identity',
    nodes: [
      { 
        id: 'leadership', 
        name: 'Leadership & Strategy', 
        value: 0.22, 
        influence: 90,
        connections: ['strategic_leadership', 'change_catalyst', 'communication', 'business_growth', 'adaptive_pro']
      },
      { 
        id: 'innovation', 
        name: 'Innovation & Advocacy', 
        value: 0.20, 
        influence: 85,
        connections: ['tech_innovator', 'creative_solver', 'analytical', 'diversity_advocate', 'lifelong_learner']
      },
      { 
        id: 'strategy', 
        name: 'Strategic Direction', 
        value: 0.19, 
        influence: 82,
        connections: ['strategic_leadership', 'business_growth', 'analytical', 'adaptive_pro', 'communication']
      },
      { 
        id: 'transformation', 
        name: 'Transformation & Growth', 
        value: 0.18, 
        influence: 80,
        connections: ['change_catalyst', 'tech_innovator', 'adaptive_pro', 'creative_solver', 'business_growth']
      },
      { 
        id: 'creativity', 
        name: 'Creative Insights', 
        value: 0.17, 
        influence: 78,
        connections: ['creative_solver', 'communication', 'lifelong_learner', 'tech_innovator', 'diversity_advocate']
      }
    ]
  },
  {
    name: 'strengths',
    title: 'Professional Strengths',
    nodes: [
      { 
        id: 'strategic_leadership', 
        name: 'Strategic Leadership', 
        value: 0.92, 
        impact: 'High',
        connections: ['leadership_com', 'business_dev', 'change_mgmt', 'people_dev']
      },
      { 
        id: 'change_catalyst', 
        name: 'Change Catalyst', 
        value: 0.89, 
        impact: 'High',
        connections: ['change_mgmt', 'people_dev', 'leadership_com', 'business_dev']
      },
      { 
        id: 'business_growth', 
        name: 'Business Growth', 
        value: 0.88, 
        impact: 'High',
        connections: ['business_dev', 'leadership_com', 'change_mgmt', 'people_dev']
      },
      { 
        id: 'tech_innovator', 
        name: 'Tech-Savvy Innovator', 
        value: 0.90, 
        impact: 'High',
        connections: ['neurodiversity', 'business_dev', 'change_mgmt', 'leadership_com']
      },
      { 
        id: 'communication', 
        name: 'Communication & Engagement', 
        value: 0.87, 
        impact: 'High',
        connections: ['people_dev', 'leadership_com', 'business_dev', 'neurodiversity']
      },
      { 
        id: 'lifelong_learner', 
        name: 'Lifelong Learner', 
        value: 0.86, 
        impact: 'High',
        connections: ['neurodiversity', 'people_dev', 'change_mgmt', 'business_dev']
      },
      { 
        id: 'diversity_advocate', 
        name: 'Advocate for Diversity', 
        value: 0.88, 
        impact: 'High',
        connections: ['neurodiversity', 'people_dev', 'leadership_com', 'change_mgmt']
      },
      { 
        id: 'analytical', 
        name: 'Analytical Researcher', 
        value: 0.85, 
        impact: 'High',
        connections: ['business_dev', 'change_mgmt', 'neurodiversity', 'leadership_com']
      },
      { 
        id: 'creative_solver', 
        name: 'Creative Problem Solver', 
        value: 0.87, 
        impact: 'High',
        connections: ['neurodiversity', 'change_mgmt', 'business_dev', 'people_dev']
      },
      { 
        id: 'adaptive_pro', 
        name: 'Adaptive Professional', 
        value: 0.86, 
        impact: 'High',
        connections: ['change_mgmt', 'business_dev', 'neurodiversity', 'people_dev']
      }
    ]
  },
  {
    name: 'communities',
    title: 'Impact Communities',
    nodes: [
      { 
        id: 'leadership_com', 
        name: 'Leadership Excellence', 
        value: 90, 
        members: 90,
        connections: ['strategic_leadership', 'change_catalyst', 'business_growth']
      },
      { 
        id: 'people_dev', 
        name: 'People Development', 
        value: 35, 
        members: 35,
        connections: ['communication', 'diversity_advocate', 'lifelong_learner']
      },
      { 
        id: 'change_mgmt', 
        name: 'Change Management', 
        value: 27, 
        members: 27,
        connections: ['change_catalyst', 'adaptive_pro', 'tech_innovator']
      },
      { 
        id: 'neurodiversity', 
        name: 'Neurodiversity', 
        value: 26, 
        members: 26,
        connections: ['diversity_advocate', 'tech_innovator', 'creative_solver']
      },
      { 
        id: 'business_dev', 
        name: 'Business Development', 
        value: 24, 
        members: 24,
        connections: ['business_growth', 'strategic_leadership', 'analytical']
      }
    ]
  }
];

function createNetworkNodes(width, height, margin) {
  const nodes = [];
  const infoSectionWidth = 500;
  const usableWidth = width - infoSectionWidth;
  const startX = infoSectionWidth + 100;
  const layerWidth = usableWidth * 0.75; // Increased from 0.65 to 0.75 for more space
  
  // Adjusted layer positions with more spacing
  const layerPositions = {
    core: startX + (layerWidth * 0.15),      // Moved left side further left
    strengths: startX + (layerWidth * 0.5),   // Center stays centered
    communities: startX + (layerWidth * 0.85)  // Moved right side further right
  };

  // Calculate base dimensions
  const totalHeight = height - margin.top - margin.bottom;
  const startY = height * 0.2; // Fixed starting point
  
  NETWORK_LAYERS.forEach(layer => {
    const xPos = layerPositions[layer.name];
    const nodeData = layer.nodes;
    
    // Calculate vertical gap based on layer type
    let verticalGap;
    if (layer.name === 'communities') {
      verticalGap = totalHeight / 8;  // More space for communities
    } else if (layer.name === 'strengths') {
      verticalGap = totalHeight / 12; // Tighter spacing for strengths
    } else {
      verticalGap = totalHeight / 7;  // Standard spacing for core
    }
    
    nodeData.forEach((data, i) => {
      nodes.push({
        ...data,
        x: xPos,
        y: startY + (i * verticalGap),
        layer: layer.name,
        size: getNodeSize(layer.name, data.value)
      });
    });
  });

  return { nodes, layerPositions };
}

function createNetworkLinks(nodes) {
  const links = [];
  
  // Create meaningful connections based on the data structure
  nodes.forEach(source => {
    if (source.connections) {
      source.connections.forEach(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (target) {
          links.push({
            source,
            target,
            weight: calculateConnectionWeight(source, target)
          });
        }
      });
    }
  });

  return links;
}

function determineConnectionType(sourceLayer, targetLayer) {
  if (sourceLayer === targetLayer) return 'intraCommunity';
  if ((sourceLayer === 'core' && targetLayer === 'strengths') ||
      (sourceLayer === 'strengths' && targetLayer === 'communities')) {
    return 'interCommunity';
  }
  return 'synaptic';
}

function getNodeSize(layer, value) {
  const sizes = {
    core: 14,
    strengths: 11,
    communities: 12
  };
  return sizes[layer] * (value ? Math.sqrt(value) : 1);
}

function calculateConnectionWeight(source, target) {
  // Weights from career mapping data
  const weights = {
    leadership: {
      strategic_leadership: 0.95,
      communication: 0.90,
      change_catalyst: 0.88,
      business_growth: 0.85
    },
    innovation: {
      tech_innovator: 0.92,
      creative_solver: 0.89,
      diversity_advocate: 0.87,
      analytical: 0.86
    },
    strategy: {
      strategic_leadership: 0.91,
      business_growth: 0.89,
      analytical: 0.88,
      communication: 0.86
    },
    transformation: {
      change_catalyst: 0.90,
      tech_innovator: 0.88,
      adaptive_pro: 0.87,
      business_growth: 0.85
    },
    creativity: {
      creative_solver: 0.89,
      communication: 0.87,
      lifelong_learner: 0.86,
      tech_innovator: 0.85
    }
  };

  return weights[source.id]?.[target.id] || 0.8;
}


export default function SkillsView() {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);


    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'synapticGradient')
      .attr('gradientUnits', 'userSpaceOnUse');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#E64298')
      .attr('stop-opacity', 0.5);
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#3154DF')
      .attr('stop-opacity', 0.5);

    const { nodes, layerPositions } = createNetworkNodes(width, height, margin);
    const links = createNetworkLinks(nodes);


    const connections = svg.append('g')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('class', styles.neuralLink)
      .attr('d', d => {
        const sourceX = d.source.x;
        const sourceY = d.source.y;
        const targetX = d.target.x;
        const targetY = d.target.y;
        return `M${sourceX},${sourceY} C${(sourceX + targetX) / 2},${sourceY} ${(sourceX + targetX) / 2},${targetY} ${targetX},${targetY}`;
      });

    // Draw nodes
    const nodeGroups = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', d => `${styles.neuralNode} ${styles[d.layer]}`)
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Add node circles
    nodeGroups.append('circle')
      .attr('r', d => d.size)
      .attr('class', d => styles[d.layer])
      .on('mouseover', handleNodeHover)
      .on('mouseout', handleNodeOut)
      .on('click', handleNodeClick);

    // Add node labels
    nodeGroups.append('text')
      .text(d => d.name)
      .attr('class', styles.nodeLabel)
      .attr('dy', d => d.size + 16);

    // Add layer titles
    svg.selectAll('.layerTitle')
      .data(NETWORK_LAYERS)
      .join('text')
      .attr('class', styles.layerTitle)
      .attr('x', d => layerPositions[d.name])
      .attr('y', margin.top)
      .text(d => d.title)
      .attr('text-anchor', 'middle');

    // Event handlers
    function handleNodeHover(event, d) {
      const relatedLinks = links.filter(l => 
        l.source.id === d.id || l.target.id === d.id
      );

      connections
        .transition()
        .duration(200)
        .style('opacity', l => 
          relatedLinks.includes(l) ? 0.8 : 0.1
        );

      setActiveNode(d);
    }

    function handleNodeOut() {
      connections
        .transition()
        .duration(200)
        .style('opacity', 0.4);

      setActiveNode(null);
    }

    function handleNodeClick(event, d) {
      setActiveNode(d);
    }

  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoSection}>
        <h2 className={styles.title}>{NETWORK_DESCRIPTION.title}</h2>
        <h3 className={styles.subtitle}>{NETWORK_DESCRIPTION.subtitle}</h3>
        <p className={styles.description}>{NETWORK_DESCRIPTION.description}</p>
        <div className={styles.metrics}>
          <div>Nodes: {NETWORK_DESCRIPTION.metrics.nodes}</div>
          <div>Edges: {NETWORK_DESCRIPTION.metrics.edges}</div>
          <div>Communities: {NETWORK_DESCRIPTION.metrics.communities}</div>
          <div>Influence: {(NETWORK_DESCRIPTION.metrics.influence_score * 100).toFixed(1)}%</div>
        </div>
        {activeNode && (
          <motion.div 
            className={styles.selectedInfo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h3>{activeNode.name}</h3>
            <p>
              <span>Layer</span>
              <span>{activeNode.layer}</span>
            </p>
            {activeNode.influence && (
              <p>
                <span>Influence</span>
                <span>{activeNode.influence}</span>
              </p>
            )}
            {activeNode.impact && (
              <p>
                <span>Impact</span>
                <span>{activeNode.impact}</span>
              </p>
            )}
            {activeNode.members && (
              <p>
                <span>Members</span>
                <span>{activeNode.members}</span>
              </p>
            )}
          </motion.div>
        )}
      </div>
      <svg ref={svgRef} />
      <div ref={tooltipRef} className={styles.tooltip} />
    </div>
  );
}