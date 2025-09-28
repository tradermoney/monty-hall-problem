import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { LanguageSwitcher } from '../components/LanguageSwitcher/LanguageSwitcher';

describe('LanguageSwitcher Component', () => {
  const renderWithI18n = (component: React.ReactElement) => {
    return render(
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    );
  };

  beforeEach(() => {
    // Reset language to default (Chinese)
    i18n.changeLanguage('zh');
  });

  it('should render language switcher buttons', () => {
    renderWithI18n(<LanguageSwitcher />);
    
    expect(screen.getByText('中文')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('should highlight current language', () => {
    renderWithI18n(<LanguageSwitcher />);
    
    const chineseButton = screen.getByText('中文');
    const englishButton = screen.getByText('EN');
    
    // Chinese should be active initially
    expect(chineseButton).toHaveClass('active');
    expect(englishButton).not.toHaveClass('active');
  });

  it('should switch language when clicked', () => {
    renderWithI18n(<LanguageSwitcher />);
    
    const englishButton = screen.getByText('EN');
    fireEvent.click(englishButton);
    
    // Language should be switched to English
    expect(i18n.language).toBe('en');
    
    // English button should now be active
    const englishButtonAfter = screen.getByText('EN');
    const chineseButtonAfter = screen.getByText('中文');
    
    expect(englishButtonAfter).toHaveClass('active');
    expect(chineseButtonAfter).not.toHaveClass('active');
  });

  it('should have proper accessibility attributes', () => {
    renderWithI18n(<LanguageSwitcher />);
    
    const languageSwitcher = screen.getByRole('group');
    expect(languageSwitcher).toHaveAttribute('aria-label', 'Language Switcher');
    
    const chineseButton = screen.getByText('中文');
    const englishButton = screen.getByText('EN');
    
    expect(chineseButton).toHaveAttribute('aria-label', 'Switch to Chinese');
    expect(englishButton).toHaveAttribute('aria-label', 'Switch to English');
  });

  it('should handle keyboard navigation', () => {
    renderWithI18n(<LanguageSwitcher />);
    
    const englishButton = screen.getByText('EN');
    
    // Tab to focus the button
    englishButton.focus();
    expect(document.activeElement).toBe(englishButton);
    
    // Press Enter to activate
    fireEvent.keyDown(englishButton, { key: 'Enter' });
    expect(i18n.language).toBe('en');
  });

  it('should be responsive', () => {
    renderWithI18n(<LanguageSwitcher />);
    
    const switcher = screen.getByRole('group');
    expect(switcher).toHaveClass('language-switcher');
  });
});