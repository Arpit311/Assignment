// apiRequestNode.js

import { BaseNode } from './baseNode';

export const APIRequestNode = ({ id, data }) => {
  const fields = [
    { key: 'method', label: 'Method', type: 'select', default: data?.method || 'GET', options: ['GET', 'POST', 'PUT', 'DELETE'] },
    { key: 'endpoint', label: 'Endpoint', type: 'text', default: data?.endpoint || 'https://api.example.com/data' },
    { key: 'body', label: 'Body (JSON)', type: 'text', default: data?.body || '{}'}
  ];

  const handles = [
    { id: `${id}-in`, type: 'target', position: 'left' },
    { id: `${id}-out`, type: 'source', position: 'right' },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="API Request"
      subtitle="Defines an API call"
      fields={fields}
      handles={handles}
    />
  );
};