import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network/standalone';

const MindMapSection = () => {
  const networkRef = useRef(null);
  const containerRef = useRef(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root']));

  const allNodes = [
    { id: 'root', label: 'TẬP ĐOÀN\nKINH TẾ\nNHÀ NƯỚC', level: 0, color: '#d97706', font: { size: 20, color: '#fef3c7' } },
    
    // Level 1
    { id: 'thuc-trang', label: 'Thực trạng', level: 1, color: '#ea580c', parent: 'root' },
    { id: 'hai-mat', label: 'Tính hai mặt', level: 1, color: '#ea580c', parent: 'root' },
    { id: 'giai-phap', label: 'Giải pháp', level: 1, color: '#ea580c', parent: 'root' },
    
    // Level 2 - Thực trạng
    { id: 'evn', label: 'EVN - Điện lực', level: 2, color: '#f59e0b', parent: 'thuc-trang' },
    { id: 'vnpt', label: 'VNPT - Viễn thông', level: 2, color: '#f59e0b', parent: 'thuc-trang' },
    { id: 'pvn', label: 'PVN - Dầu khí', level: 2, color: '#f59e0b', parent: 'thuc-trang' },
    
    // Level 2 - Tính hai mặt
    { id: 'vai-tro', label: 'Vai trò điều tiết', level: 2, color: '#10b981', parent: 'hai-mat' },
    { id: 'nguy-co', label: 'Nguy cơ độc quyền', level: 2, color: '#ef4444', parent: 'hai-mat' },
    
    // Level 3 - Vai trò
    { id: 'on-dinh', label: 'Ổn định vĩ mô', level: 3, color: '#34d399', parent: 'vai-tro' },
    { id: 'an-ninh', label: 'An ninh quốc phòng', level: 3, color: '#34d399', parent: 'vai-tro' },
    { id: 'cong-ich', label: 'Phục vụ công ích', level: 3, color: '#34d399', parent: 'vai-tro' },
    
    // Level 3 - Nguy cơ
    { id: 'kem-hieu-qua', label: 'Kém hiệu quả', level: 3, color: '#f87171', parent: 'nguy-co' },
    { id: 'thieu-canh-tranh', label: 'Thiếu cạnh tranh', level: 3, color: '#f87171', parent: 'nguy-co' },
    
    // Level 2 - Giải pháp
    { id: 'quan-tri', label: 'Quản trị hiện đại', level: 2, color: '#8b5cf6', parent: 'giai-phap' },
    { id: 'minh-bach', label: 'Minh bạch hóa', level: 2, color: '#8b5cf6', parent: 'giai-phap' },
    { id: 'canh-tranh', label: 'Mở cửa cạnh tranh', level: 2, color: '#8b5cf6', parent: 'giai-phap' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Get visible nodes (root + expanded)
    const visibleNodes = allNodes.filter(node => {
      if (node.id === 'root') return true;
      if (!node.parent) return expandedNodes.has(node.id);
      return expandedNodes.has(node.parent);
    });

    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
    const edges = [];
    
    allNodes.forEach(node => {
      if (node.parent && visibleNodeIds.has(node.id) && visibleNodeIds.has(node.parent)) {
        edges.push({ from: node.parent, to: node.id, color: { color: '#d97706' }, width: 2 });
      }
    });

    const nodes = visibleNodes.map(node => ({
      id: node.id,
      label: node.label,
      color: {
        background: node.color,
        border: '#fef3c7',
        highlight: { background: '#fbbf24', border: '#fef3c7' },
        hover: { background: '#fbbf24', border: '#fef3c7' }
      },
      font: node.font || { size: 14, color: '#fef3c7', bold: true },
      shape: 'box',
      margin: 10,
      borderWidth: 2,
      borderWidthSelected: 3,
    }));

    const data = { nodes, edges };
    
    const options = {
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'UD',
          sortMethod: 'directed',
          nodeSpacing: 150,
          levelSeparation: 150,
        }
      },
      physics: {
        enabled: true,
        hierarchicalRepulsion: {
          nodeDistance: 150,
          springLength: 150,
        },
        stabilization: {
          iterations: 200,
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
      },
      nodes: {
        font: {
          multi: true,
          bold: { color: '#fef3c7' }
        }
      }
    };

    const network = new Network(containerRef.current, data, options);
    networkRef.current = network;

    network.on('click', (params) => {
      if (params.nodes.length > 0) {
        const clickedNodeId = params.nodes[0];
        const hasChildren = allNodes.some(n => n.parent === clickedNodeId);
        
        if (hasChildren) {
          setExpandedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(clickedNodeId)) {
              // Collapse: remove this node from expanded
              newSet.delete(clickedNodeId);
              // Also remove all descendants
              const removeDescendants = (nodeId) => {
                allNodes.forEach(n => {
                  if (n.parent === nodeId) {
                    newSet.delete(n.id);
                    removeDescendants(n.id);
                  }
                });
              };
              removeDescendants(clickedNodeId);
            } else {
              // Expand
              newSet.add(clickedNodeId);
            }
            return newSet;
          });
        }
      }
    });

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
      }
    };
  }, [expandedNodes]);

  return (
    <section id="mindmap" className="relative min-h-screen bg-gradient-to-b from-vintage-darker to-vintage-dark py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-vintage-accent mb-4">
          Sơ Đồ Tư Duy Interactive
        </h2>
        <p className="text-lg text-vintage-light/70 max-w-3xl mx-auto">
          Click vào các nút để mở rộng và khám phá chi tiết (Mindmap "nở hoa")
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div 
          ref={containerRef} 
          className="w-full bg-vintage-dark/60 border-2 border-vintage-accent/30 rounded-2xl"
          style={{ height: '700px' }}
        />
        
        <div className="mt-6 text-center text-vintage-light/60 text-sm">
          💡 Mẹo: Click vào các nút màu để mở rộng/thu gọn nhánh con
        </div>
      </div>
    </section>
  );
};

export default MindMapSection;
