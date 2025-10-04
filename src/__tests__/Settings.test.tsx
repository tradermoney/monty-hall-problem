import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { Settings } from '../components/Settings/Settings';
import { useThemeStore } from '../stores/themeStore';

describe('Settings Component', () => {
  const renderWithI18n = (component: React.ReactElement) => {
    return render(
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    );
  };

  beforeEach(() => {
    // Reset theme to default
    useThemeStore.setState({ theme: 'auto' });
  });

  it('should render settings component', () => {
    renderWithI18n(<Settings />);
    
    expect(screen.getByText('设置')).toBeInTheDocument();
    expect(screen.getByText('主题设置')).toBeInTheDocument();
    expect(screen.getByText('语言')).toBeInTheDocument();
    expect(screen.getByText('无障碍')).toBeInTheDocument();
  });

  it('should render theme switcher', () => {
    renderWithI18n(<Settings />);

    expect(screen.getByText('☀️')).toBeInTheDocument();
    expect(screen.getByText('🌙')).toBeInTheDocument();
    expect(screen.getByText('🔄')).toBeInTheDocument();
  });

  it('should render language switcher', () => {
    renderWithI18n(<Settings />);
    
    expect(screen.getByText('中文')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('should display accessibility information', () => {
    renderWithI18n(<Settings />);
    
    expect(screen.getByText('键盘快捷键')).toBeInTheDocument();
    expect(screen.getByText('下一个元素')).toBeInTheDocument();
    expect(screen.getByText('激活')).toBeInTheDocument();
  });

  it('should display screen reader support information', () => {
    renderWithI18n(<Settings />);
    
    expect(screen.getByText('屏幕阅读器兼容')).toBeInTheDocument();
  });

  it('should display high contrast mode information', () => {
    renderWithI18n(<Settings />);
    
    expect(screen.getByText('高对比度模式')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    renderWithI18n(<Settings />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should be responsive', () => {
    renderWithI18n(<Settings />);

    const settings = screen.getByRole('main');
    expect(settings).toHaveClass('settings');
  });

  it('should handle theme switching within settings', () => {
    renderWithI18n(<Settings />);
    
    const lightButton = screen.getByText('☀️');
    fireEvent.click(lightButton);
    
    expect(useThemeStore.getState().theme).toBe('light');
  });

  it('should handle language switching within settings', () => {
    renderWithI18n(<Settings />);
    
    const englishButton = screen.getByText('English');
    fireEvent.click(englishButton);
    
    expect(i18n.language).toBe('en');
  });

  it('should display all theme options with proper labels', () => {
    renderWithI18n(<Settings />);
    
    const lightButton = screen.getByLabelText('Light Theme');
    const darkButton = screen.getByLabelText('Dark Theme');
    const autoButton = screen.getByLabelText('Auto Theme');
    
    expect(lightButton).toBeInTheDocument();
    expect(darkButton).toBeInTheDocument();
    expect(autoButton).toBeInTheDocument();
  });

  it('should display all language options with proper labels', () => {
    renderWithI18n(<Settings />);
    
    const chineseButton = screen.getByLabelText('切换到中文');
    const englishButton = screen.getByLabelText('Switch to English');
    
    expect(chineseButton).toBeInTheDocument();
    expect(englishButton).toBeInTheDocument();
  });
});