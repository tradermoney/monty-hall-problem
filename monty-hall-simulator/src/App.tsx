import React, { useState } from 'react';
import { ParameterPanel } from './components/ParameterPanel/ParameterPanel';
import AutoSimulation from './components/AutoSimulation/AutoSimulation';
import ManualGame from './components/ManualGame/ManualGame';
import { StatisticsCharts } from './components/StatisticsCharts/StatisticsCharts';
import { DataManager } from './components/DataManager/DataManager';
import { Settings } from './components/Settings/Settings';
import { useSimulationStore } from './stores/simulationStore';
import type { SimulationConfig } from './types';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'auto' | 'manual' | 'settings'>('auto');
  const {
    config,
    allRecords,
    statsByStrategy,
    setConfig
  } = useSimulationStore();

  const handleConfigChange = (newConfig: SimulationConfig) => {
    setConfig(newConfig);
  };

  // 准备统计数据
  const statisticsInfo = {
    totalRuns: allRecords.length,
    totalWins: allRecords.filter(r => r.win).length,
    totalLosses: allRecords.filter(r => !r.win).length,
    winRate: allRecords.length > 0 ? (allRecords.filter(r => r.win).length / allRecords.length) * 100 : 0,
    alwaysSwitch: statsByStrategy.alwaysSwitch,
    neverSwitch: statsByStrategy.neverSwitch,
    randomSwitch: statsByStrategy.randomSwitch
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>蒙提霍尔问题模拟器</h1>
        <p>探索经典的概率问题：换门还是不换门？</p>
        
        <nav className="app-nav">
          <button 
            className={`nav-button ${activeTab === 'auto' ? 'active' : ''}`}
            onClick={() => setActiveTab('auto')}
          >
            自动模拟
          </button>
          <button 
            className={`nav-button ${activeTab === 'manual' ? 'active' : ''}`}
            onClick={() => setActiveTab('manual')}
          >
            手动游戏
          </button>
          <button 
            className={`nav-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            设置
          </button>
        </nav>
      </header>

      <main className="app-main">
        <div className="app-layout">
          {/* 左侧参数面板 */}
          <aside className="sidebar">
            <section className="parameter-section">
              <ParameterPanel
                config={config}
                onConfigChange={handleConfigChange}
                disabled={false}
              />
            </section>
          </aside>

          {/* 主要内容区域 */}
          <div className="main-content">
            {activeTab === 'auto' && (
              <div className="tab-content">
                <section className="simulation-section">
                  <AutoSimulation />
                </section>
                
                <section className="charts-section">
                  <h2>统计图表</h2>
                  <StatisticsCharts stats={statisticsInfo} />
                </section>
              </div>
            )}

            {activeTab === 'manual' && (
              <div className="tab-content">
                <section className="manual-game-section">
                  <ManualGame />
                </section>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="tab-content">
                <section className="settings-section">
                  <Settings />
                </section>
              </div>
            )}
          </div>

          {/* 右侧数据管理 */}
          <aside className="data-sidebar">
            <section className="data-section">
              <h2>数据管理</h2>
              <DataManager
                config={config}
                stats={{
                  totalRuns: allRecords.length,
                  wins: allRecords.filter(r => r.win).length,
                  losses: allRecords.filter(r => !r.win).length,
                  winRate: allRecords.length > 0 ? (allRecords.filter(r => r.win).length / allRecords.length) * 100 : 0,
                  standardError: 0,
                  confidenceInterval: { lower: 0, upper: 0 }
                }}
                rawData={allRecords}
                onImport={() => {}}
              />
            </section>
          </aside>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 蒙提霍尔问题模拟器</p>
      </footer>
    </div>
  );
}

export default App;
