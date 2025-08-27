import React, { useState, useEffect } from 'react';
import { List, ChevronDown, ChevronUp, Hash } from 'lucide-react';

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
  number: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Extract only H2 headings from content
    const headingRegex = /^(#{2})\s+(.+)$/gm;
    const items: TableOfContentsItem[] = [];
    let match;
    let h2Count = 0;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      
      h2Count++;
      items.push({
        id,
        text,
        level,
        number: h2Count
      });
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0
      }
    );

    // Observe all H2 headings in the document
    tocItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between cursor-pointer bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-4 border-b border-gray-100"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-lg">
            <List className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Table of Contents</h3>
            <p className="text-xs text-gray-500">{tocItems.length} sections</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 font-medium">
            {isCollapsed ? 'Expand' : 'Collapse'}
          </span>
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </div>
      
      {/* Content */}
      {!isCollapsed && (
        <nav className="p-4">
          <ul className="space-y-1">
            {tocItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className={`group w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:bg-cyan-50 hover:border-cyan-200 border border-transparent ${
                    activeId === item.id
                      ? 'bg-cyan-50 border-cyan-200 text-cyan-700 font-medium shadow-sm'
                      : 'text-gray-700 hover:text-cyan-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Number Badge */}
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors duration-200 ${
                      activeId === item.id
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-cyan-100 group-hover:text-cyan-700'
                    }`}>
                      {item.number}
                    </div>
                    
                    {/* Text */}
                    <span className="text-sm leading-relaxed flex-1">
                      {item.text}
                    </span>
                    
                    {/* Active Indicator */}
                    {activeId === item.id && (
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
          
          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <Hash className="h-3 w-3" />
              <span>Click any section to jump to it</span>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default TableOfContents;
