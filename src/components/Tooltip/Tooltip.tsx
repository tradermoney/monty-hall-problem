import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      adjustPosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const adjustPosition = () => {
    if (!tooltipRef.current || !triggerRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newPosition = position;

    // 检查是否需要调整位置
    if (position === 'top' && triggerRect.top < tooltipRect.height + 10) {
      newPosition = 'bottom';
    } else if (position === 'bottom' && viewportHeight - triggerRect.bottom < tooltipRect.height + 10) {
      newPosition = 'top';
    } else if (position === 'left' && triggerRect.left < tooltipRect.width + 10) {
      newPosition = 'right';
    } else if (position === 'right' && viewportWidth - triggerRect.right < tooltipRect.width + 10) {
      newPosition = 'left';
    }

    setTooltipPosition(newPosition);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      ref={triggerRef}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`tooltip tooltip-${tooltipPosition}`}
          role="tooltip"
        >
          {content}
          <div className="tooltip-arrow" />
        </div>
      )}
    </div>
  );
};

interface FieldTooltipProps {
  content: string;
}

export const FieldTooltip: React.FC<FieldTooltipProps> = ({ content }) => {
  return (
    <Tooltip content={content} position="right">
      <span className="field-tooltip-icon" aria-label="帮助信息">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 11.5V11.5C8 11.2239 8.22386 11 8.5 11H8.5C8.77614 11 9 11.2239 9 11.5V11.5C9 11.7761 8.77614 12 8.5 12H8.5C8.22386 12 8 11.7761 8 11.5Z"
            fill="currentColor"
          />
          <path
            d="M8 4.5C6.89543 4.5 6 5.39543 6 6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M8 6.5V9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </Tooltip>
  );
};
