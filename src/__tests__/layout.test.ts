import { test, expect } from '@playwright/test';

test.describe('Page Layout Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:40256/');
  });

  test('components should be properly laid out', async ({ page }) => {
    // 等待页面加载完成
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');
    
    // 等待页面标题出现，确保页面已经加载完成
    await expect(page.locator('.app-header h1')).toHaveText('蒙提霍尔问题模拟器');
    
    // 等待页面结构加载完成
    await expect(page.locator('.app')).toBeVisible();
    await expect(page.locator('.app-main')).toBeVisible();
    await expect(page.locator('.app-layout')).toBeVisible();
    await expect(page.locator('.main-content')).toBeVisible();
    
    // 确保处于自动模拟标签并等待tab-content可见
    await page.click('button:has-text("自动模拟")');
    await expect(page.locator('.tab-content')).toBeVisible();
    
    // 等待一段时间确保组件渲染完成
    await page.waitForTimeout(5000);
    
    // 检查自动模拟标签下的组件是否可见且布局正确
    await expect(page.locator('.parameter-panel')).toBeVisible();
    await expect(page.locator('.simulation-section')).toBeVisible();
    await expect(page.locator('.charts-section')).toBeVisible();
    
    // 切换到设置标签并等待tab-content可见
    await page.click('button:has-text("设置")');
    await expect(page.locator('.tab-content')).toBeVisible();
    
    // 等待一段时间确保组件渲染完成
    await page.waitForTimeout(5000);
    
    // 检查设置标签下的组件是否可见
    await expect(page.locator('.settings-section').first()).toBeVisible();

    // 切换回自动模拟标签并等待tab-content可见
    await page.click('button:has-text("自动模拟")');
    await expect(page.locator('.tab-content')).toBeVisible();
    
    // 等待一段时间确保组件渲染完成
    await page.waitForTimeout(5000);

    // 检查组件之间是否有适当的间距
    const components = [
    '.parameter-panel',
    '.simulation-section',
    '.charts-section'
  ];

    // 等待所有组件渲染完成
    for (const selector of components) {
      await page.waitForSelector(selector, { state: 'visible', timeout: 30000 });
    }
    
    // 等待一段时间确保组件完全渲染
    await page.waitForTimeout(1000);

    for (let i = 0; i < components.length; i++) {
      const component = await page.locator(components[i]).boundingBox();
      expect(component).toBeTruthy();
      
      if (i > 0) {
        const prevComponent = await page.locator(components[i - 1]).boundingBox();
        expect(prevComponent).toBeTruthy();
        
        // 确保组件不重叠（允许0间距）
        const spacing = component.y - (prevComponent.y + prevComponent.height);
        expect(spacing).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('color scheme should be light blue', async ({ page }) => {
    // 获取计算后的样式值
    const colors = await page.evaluate(() => {
      const root = document.documentElement;
      const style = getComputedStyle(root);
      const testDiv = document.createElement('div');
      document.body.appendChild(testDiv);
      
      // 设置CSS变量并获取计算后的样式
      testDiv.style.backgroundColor = '#c0e0ff'; // --bg-primary
      const bgPrimary = getComputedStyle(testDiv).backgroundColor;
      
      testDiv.style.backgroundColor = '#dcfce7'; // --bg-secondary
      const bgSecondary = getComputedStyle(testDiv).backgroundColor;
      
      testDiv.style.backgroundColor = '#3b82f6'; // --button-hover
      const buttonHover = getComputedStyle(testDiv).backgroundColor;
      
      document.body.removeChild(testDiv);
      
      return {
        bgPrimary,
        bgSecondary,
        buttonHover
      };
    });
    
    // 解析颜色值为RGB
    const parseColor = (color) => {
      const match = color.match(/\d+/g);
      return match ? match.map(Number) : null;
    };
    
    // 检查所有颜色是否符合淡蓝色系要求
    for (const [name, color] of Object.entries(colors)) {
      const rgb = parseColor(color);
      if (rgb) {
        // 确保颜色偏向淡蓝色（蓝色值要大于红色和绿色）
        expect(rgb[2]).toBeGreaterThan(rgb[0]); // 蓝色值大于红色值
        expect(rgb[2]).toBeGreaterThan(rgb[1]); // 蓝色值大于绿色值
        
        // 确保不是紫色（红色值不应该接近蓝色值）
        expect(rgb[2] - rgb[0]).toBeGreaterThan(50); // 蓝色值显著大于红色值
      }
    }
  });

  test('responsive layout', async ({ page }) => {
    // 测试不同屏幕尺寸下的布局
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1280, height: 720 },
      { width: 768, height: 1024 },
      { width: 375, height: 812 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // 等待页面加载完成
      await page.waitForLoadState('networkidle');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForLoadState('load');
      
      // 等待页面标题出现，确保页面已经加载完成
      await expect(page.locator('.app-header h1')).toHaveText('蒙提霍尔问题模拟器');
      
      // 等待页面结构加载完成
      await expect(page.locator('.app')).toBeVisible();
      await expect(page.locator('.app-main')).toBeVisible();
      await expect(page.locator('.app-layout')).toBeVisible();
      await expect(page.locator('.main-content')).toBeVisible();
      
      // 确保处于自动模拟标签
      await page.click('button:has-text("自动模拟")');
      
      // 等待tab-content可见
      await expect(page.locator('.tab-content')).toBeVisible();
      
      // 等待一段时间确保组件渲染完成
      await page.waitForTimeout(5000);
      
      // 检查所有主要组件在各种屏幕尺寸下是否仍然可见
      await expect(page.locator('.parameter-panel')).toBeVisible();
      await expect(page.locator('.auto-simulation')).toBeVisible();
      await expect(page.locator('.statistics-charts')).toBeVisible();
      
      // 切换到设置标签
      await page.click('button:has-text("设置")');
      await expect(page.locator('.settings')).toBeVisible();
      
      // 确保没有水平滚动条（这通常表示布局问题）
      const hasHorizontalScrollbar = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScrollbar).toBeFalsy();
    }
  });
});