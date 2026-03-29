// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '100px', 
          height: '60px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: '#F59E0B',
          justifyContent: 'center', 
          flexDirection: 'column',
          border: '2px solid #D97706',
          transition: 'all 150ms ease-in-out',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          fontWeight: '600',
        }} 
        draggable
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#D97706';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#F59E0B';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        }}
      >
          <span style={{ color: '#FFFFFF', fontSize: '14px' }}>{label}</span>
      </div>
    );
  };
  