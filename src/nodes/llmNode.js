// llmNode.js

import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { id: `${id}-system`, type: 'target', position: 'left', style: { top: '33%' } },
    { id: `${id}-prompt`, type: 'target', position: 'left', style: { top: '66%' } },
    { id: `${id}-response`, type: 'source', position: 'right' },
  ];

  return <BaseNode id={id} data={data} title="LLM" subtitle="Language Model" handles={handles} />;
};
