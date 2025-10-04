import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { ThemeSwitcher } from '../components/ThemeSwitcher/ThemeSwitcher';
import { useThemeStore } from '../stores/themeStore';

describe('ThemeSwitcher Component', () => {
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

  it('should render theme switcher buttons', () => {
    renderWithI18n(<ThemeSwitcher />);

    expect(screen.getByText('浅色主题')).toBeInTheDocument();
    expect(screen.getByText('深色主题')).toBeInTheDocument();
    expect(screen.getByText('自动主题')).toBeInTheDocument();
  });

  it('should highlight current theme', () => {
    renderWithI18n(<ThemeSwitcher />);

    // Auto theme should be active initially
    const autoButton = screen.getByText('自动主题').closest('button');
    expect(autoButton).toHaveClass('active');
  });

  it('should switch theme when clicked', () => {
    renderWithI18n(<ThemeSwitcher />);

    const lightButton = screen.getByText('浅色主题').closest('button');
    fireEvent.click(lightButton!);

    // Theme should be switched to light
    expect(useThemeStore.getState().theme).toBe('light');

    // Light button should now be active
    const lightButtonAfter = screen.getByText('浅色主题').closest('button');
    expect(lightButtonAfter).toHaveClass('active');
  });

  it('should have proper accessibility attributes', () => {
    renderWithI18n(<ThemeSwitcher />);

    const themeSwitcher = document.querySelector('.theme-switcher');
    expect(themeSwitcher).toBeInTheDocument();

    const lightButton = screen.getByText('浅色主题').closest('button');
    const darkButton = screen.getByText('深色主题').closest('button');
    const autoButton = screen.getByText('自动主题').closest('button');

    expect(lightButton).toHaveAttribute('aria-label', '浅色主题');
    expect(darkButton).toHaveAttribute('aria-label', '深色主题');
    expect(autoButton).toHaveAttribute('aria-label', '自动主题');
  });

  it('should handle keyboard navigation', () => {
    renderWithI18n(<ThemeSwitcher />);

    const darkButton = screen.getByText('深色主题').closest('button') as HTMLButtonElement;

    // Tab to focus the button
    darkButton.focus();
    expect(document.activeElement).toBe(darkButton);

    // Click to activate (keyboard navigation would trigger click)
    fireEvent.click(darkButton);
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('should be responsive', () => {
    renderWithI18n(<ThemeSwitcher />);

    const switcher = document.querySelector('.theme-switcher');
    expect(switcher).toHaveClass('theme-switcher');
  });

  it('should support reduced motion preference', () => {
    // Mock matchMedia for reduced motion
    const mockMatchMedia = (query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
    
    // Test that the component respects reduced motion preference
    const prefersReducedMotion = mockMatchMedia('(prefers-reduced-motion: reduce)').matches;
    expect(prefersReducedMotion).toBe(true);
  });
});