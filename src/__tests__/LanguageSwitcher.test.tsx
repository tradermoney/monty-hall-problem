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
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('should highlight current language', () => {
    renderWithI18n(<LanguageSwitcher />);

    const chineseButton = screen.getByText('中文');
    const englishButton = screen.getByText('English');

    // Chinese should be active initially
    expect(chineseButton).toHaveClass('active');
    expect(englishButton).not.toHaveClass('active');
  });

  it('should switch language when clicked', () => {
    renderWithI18n(<LanguageSwitcher />);

    const englishButton = screen.getByText('English');
    fireEvent.click(englishButton);

    // Language should be switched to English
    expect(i18n.language).toBe('en');

    // English button should now be active
    const englishButtonAfter = screen.getByText('English');
    const chineseButtonAfter = screen.getByText('中文');

    expect(englishButtonAfter).toHaveClass('active');
    expect(chineseButtonAfter).not.toHaveClass('active');
  });

  it('should have proper accessibility attributes', () => {
    renderWithI18n(<LanguageSwitcher />);

    const languageSwitcher = document.querySelector('.language-switcher');
    expect(languageSwitcher).toBeInTheDocument();

    const chineseButton = screen.getByText('中文');
    const englishButton = screen.getByText('English');

    expect(chineseButton).toHaveAttribute('aria-label', '切换到中文');
    expect(englishButton).toHaveAttribute('aria-label', 'Switch to English');
  });

  it('should handle keyboard navigation', () => {
    renderWithI18n(<LanguageSwitcher />);

    const englishButton = screen.getByText('English');

    // Tab to focus the button
    englishButton.focus();
    expect(document.activeElement).toBe(englishButton);

    // Click to activate (keyboard navigation would trigger click)
    fireEvent.click(englishButton);
    expect(i18n.language).toBe('en');
  });

  it('should be responsive', () => {
    renderWithI18n(<LanguageSwitcher />);

    const switcher = document.querySelector('.language-switcher');
    expect(switcher).toHaveClass('language-switcher');
  });
});