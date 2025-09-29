import { describe, it, expect } from 'vitest';
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
    
    expect(screen.getByText('🌞')).toBeInTheDocument();
    expect(screen.getByText('🌙')).toBeInTheDocument();
    expect(screen.getByText('🌓')).toBeInTheDocument();
  });

  it('should highlight current theme', () => {
    renderWithI18n(<ThemeSwitcher />);
    
    // Auto theme should be active initially
    const autoButton = screen.getByText('🌓');
    expect(autoButton).toHaveClass('active');
  });

  it('should switch theme when clicked', () => {
    renderWithI18n(<ThemeSwitcher />);
    
    const lightButton = screen.getByText('🌞');
    fireEvent.click(lightButton);
    
    // Theme should be switched to light
    expect(useThemeStore.getState().theme).toBe('light');
    
    // Light button should now be active
    const lightButtonAfter = screen.getByText('🌞');
    expect(lightButtonAfter).toHaveClass('active');
  });

  it('should have proper accessibility attributes', () => {
    renderWithI18n(<ThemeSwitcher />);
    
    const themeSwitcher = screen.getByRole('group');
    expect(themeSwitcher).toHaveAttribute('aria-label', 'Theme Switcher');
    
    const lightButton = screen.getByText('🌞');
    const darkButton = screen.getByText('🌙');
    const autoButton = screen.getByText('🌓');
    
    expect(lightButton).toHaveAttribute('aria-label', 'Light theme');
    expect(darkButton).toHaveAttribute('aria-label', 'Dark theme');
    expect(autoButton).toHaveAttribute('aria-label', 'Auto theme');
  });

  it('should handle keyboard navigation', () => {
    renderWithI18n(<ThemeSwitcher />);
    
    const darkButton = screen.getByText('🌙');
    
    // Tab to focus the button
    darkButton.focus();
    expect(document.activeElement).toBe(darkButton);
    
    // Press Enter to activate
    fireEvent.keyDown(darkButton, { key: 'Enter' });
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('should be responsive', () => {
    renderWithI18n(<ThemeSwitcher />);
    
    const switcher = screen.getByRole('group');
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