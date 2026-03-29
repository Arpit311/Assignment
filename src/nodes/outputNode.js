// outputNode.js

import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const fields = [
    { key: 'outputName', label: 'Name', type: 'text', default: id.replace('customOutput-', 'output_') },
    { key: 'outputType', label: 'Type', type: 'select', default: data?.outputType || 'Text', options: ['Text', 'Image'] },
  ];

  const handles = [{ id: `${id}-value`, type: 'target', position: 'left' }];

  return <BaseNode id={id} data={data} title="Output" fields={fields} handles={handles} />;
};
