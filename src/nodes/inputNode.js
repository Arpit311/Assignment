// inputNode.js

import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const fields = [
    { key: 'inputName', label: 'Name', type: 'text', default: id.replace('customInput-', 'input_') },
    { key: 'inputType', label: 'Type', type: 'select', default: data?.inputType || 'Text', options: ['Text', 'File'] },
  ];

  const handles = [{ id: `${id}-value`, type: 'source', position: 'right' }];

  return <BaseNode id={id} data={data} title="Input" fields={fields} handles={handles} />;
};
