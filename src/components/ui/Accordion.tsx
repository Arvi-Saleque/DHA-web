import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
}

interface AccordionProps {
  children: React.ReactElement<AccordionItemProps>[];
  allowMultiple?: boolean;
  className?: string;
}

export function AccordionItem({ 
  title, 
  children, 
  defaultOpen = false, 
  disabled = false 
}: AccordionItemProps) {
  // This component is used as a child of Accordion, props are handled by parent
  return null;
}

export default function Accordion({ 
  children, 
  allowMultiple = false, 
  className = '' 
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(
      children
        .map((child, index) => child.props.defaultOpen ? index : null)
        .filter(index => index !== null) as number[]
    )
  );

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      
      return newSet;
    });
  };

  return (
    <div className={`divide-y divide-gray-200 ${className}`}>
      {children.map((child, index) => {
        const isOpen = openItems.has(index);
        const { title, children: content, disabled } = child.props;

        return (
          <div key={index} className="border border-gray-200 rounded-lg mb-2 last:mb-0">
            <button
              className={`
                w-full px-4 py-3 text-left flex items-center justify-between
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset
                transition-colors duration-200 rounded-t-lg
                ${isOpen ? 'rounded-b-none' : 'rounded-lg'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => !disabled && toggleItem(index)}
              disabled={disabled}
            >
              <span className="text-sm font-medium text-gray-900">{title}</span>
              <svg
                className={`
                  w-5 h-5 text-gray-500 transform transition-transform duration-200
                  ${isOpen ? 'rotate-180' : ''}
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              className={`
                overflow-hidden transition-all duration-200 ease-in-out
                ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="px-4 pb-3 text-sm text-gray-700 border-t border-gray-200">
                {content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Predefined FAQ Accordion
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion className={className}>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.question}>
          <div className="prose prose-sm max-w-none">
            {item.answer}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}