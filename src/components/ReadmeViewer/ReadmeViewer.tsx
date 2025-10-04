import React, { useState, useEffect } from 'react';
import { ReadmeLanguageSwitcher } from '../ReadmeLanguageSwitcher/ReadmeLanguageSwitcher';
import './ReadmeViewer.css';

interface ReadmeContent {
  en: string;
  'zh-CN': string;
}

export const ReadmeViewer: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'zh-CN'>('en');
  const [readmeContent, setReadmeContent] = useState<ReadmeContent>({ en: '', 'zh-CN': '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReadmeContent();
  }, []);

  const loadReadmeContent = async () => {
    try {
      // 获取base路径
      const base = import.meta.env.BASE_URL || '/';

      // 加载英文README
      const enResponse = await fetch(`${base}README.md`);
      const enContent = await enResponse.text();

      // 加载中文README
      const zhResponse = await fetch(`${base}README.zh-CN.md`);
      const zhContent = await zhResponse.text();

      setReadmeContent({
        en: enContent,
        'zh-CN': zhContent
      });
    } catch (error) {
      console.error('Failed to load README content:', error);
      // 如果加载失败，使用备用内容
      setReadmeContent({
        en: getDefaultEnglishContent(),
        'zh-CN': getDefaultChineseContent()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang: 'en' | 'zh-CN') => {
    setCurrentLang(lang);
  };

  const renderMarkdown = (content: string) => {
    // 简单的markdown渲染，处理标题、链接、代码块等
    return content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/gim, '<br />');
  };

  if (loading) {
    return (
      <div className="readme-viewer">
        <div className="readme-loading">
          <div className="loading-spinner"></div>
          <p>加载 README 中... </p>
        </div>
      </div>
    );
  }

  const currentContent = readmeContent[currentLang];

  return (
    <div className="readme-viewer">
      <div className="readme-header">
        <h1>项目文档</h1>
        <p className="readme-subtitle">查看项目的详细说明和使用指南</p>
      </div>

      <ReadmeLanguageSwitcher
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      <div className="readme-content">
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(currentContent) }}
        />
      </div>

      <div className="readme-footer">
        <p>💡 提示：您可以在页面顶部切换语言版本</p>
        <p>🔗 项目地址：<a href="https://github.com/tradermoney/monty-hall-problem" target="_blank" rel="noopener noreferrer">
          https://github.com/tradermoney/monty-hall-problem
        </a></p>
      </div>
    </div>
  );
};

// 默认英文内容
const getDefaultEnglishContent = () => `# Monty Hall Problem Simulator

**English** | [简体中文](./README.zh-CN.md)

\u003e 🎯 **Live Demo**: [https://tradermoney.github.io/monty-hall-problem/](https://tradermoney.github.io/monty-hall-problem/)

An interactive Monty Hall problem simulator...`;

// 默认中文内容
const getDefaultChineseContent = () => `# 蒙提霍尔问题模拟器

**简体中文** | [English](./README.md)

\u003e 🎯 **在线演示**: [https://tradermoney.github.io/monty-hall-problem/](https://tradermoney.github.io/monty-hall-problem/)

一个交互式的蒙提霍尔问题模拟器...`;