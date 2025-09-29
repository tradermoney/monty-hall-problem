import { useEffect } from 'react';

/**
 * 无障碍工具类
 */
export class AccessibilityUtils {
  /**
   * 聚焦到指定元素
   */
  static focus(element: HTMLElement | null, options?: FocusOptions) {
    if (element) {
      element.focus(options);
    }
  }

  /**
   * 聚焦到第一个可交互元素
   */
  static focusFirstInteractive(container: HTMLElement) {
    const interactiveElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (interactiveElements.length > 0) {
      (interactiveElements[0] as HTMLElement).focus();
    }
  }

  /**
   * 设置ARIA属性
   */
  static setAriaAttributes(element: HTMLElement, attributes: Record<string, string>) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  /**
   * 创建屏幕阅读器友好的消息
   */
  static announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    // 清理
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * 管理焦点陷阱（用于模态框等）
   */
  static trapFocus(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    // 返回清理函数
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }

  /**
   * 检查颜色对比度
   */
  static checkContrastRatio(foreground: string, background: string): number {
    const getLuminance = (color: string): number => {
      const rgb = this.hexToRgb(color);
      if (!rgb) return 0;
      
      const [r, g, b] = rgb.map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    
    const foregroundLuminance = getLuminance(foreground);
    const backgroundLuminance = getLuminance(background);
    
    const lighter = Math.max(foregroundLuminance, backgroundLuminance);
    const darker = Math.min(foregroundLuminance, backgroundLuminance);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * 十六进制颜色转RGB
   */
  private static hexToRgb(hex: string): [number, number, number] | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  /**
   * 键盘导航支持
   */
  static handleKeyboardNavigation(
    event: KeyboardEvent,
    options: {
      onEnter?: () => void;
      onEscape?: () => void;
      onArrowUp?: () => void;
      onArrowDown?: () => void;
      onArrowLeft?: () => void;
      onArrowRight?: () => void;
    }
  ) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        options.onEnter?.();
        break;
      case 'Escape':
        options.onEscape?.();
        break;
      case 'ArrowUp':
        event.preventDefault();
        options.onArrowUp?.();
        break;
      case 'ArrowDown':
        event.preventDefault();
        options.onArrowDown?.();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        options.onArrowLeft?.();
        break;
      case 'ArrowRight':
        event.preventDefault();
        options.onArrowRight?.();
        break;
    }
  }
}

/**
 * 无障碍Hook
 */
export const useAccessibility = () => {
  useEffect(() => {
    // 确保页面有适当的语言属性
    document.documentElement.setAttribute('lang', navigator.language || 'zh-CN');
    
    // 添加跳过导航链接
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = '跳过导航，直接进入主内容';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 9999;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    return () => {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink);
      }
    };
  }, []);
  
  return {
    announce: AccessibilityUtils.announceToScreenReader,
    focus: AccessibilityUtils.focus,
    focusFirstInteractive: AccessibilityUtils.focusFirstInteractive,
    trapFocus: AccessibilityUtils.trapFocus,
    handleKeyboard: AccessibilityUtils.handleKeyboardNavigation
  };
};