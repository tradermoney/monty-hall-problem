import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ParameterPanel } from './components/ParameterPanel/ParameterPanel';
import AutoSimulation from './components/AutoSimulation/AutoSimulation';
import ManualGame from './components/ManualGame/ManualGame';
import { StatisticsCharts } from './components/StatisticsCharts/StatisticsCharts';
import { DataManager } from './components/DataManager/DataManager';
import { Settings } from './components/Settings/Settings';
import { Introduction } from './components/Introduction/Introduction';
import { GitHubBadge } from './components/GitHubBadge/GitHubBadge';
import { useSimulationStore } from './stores/simulationStore';
import type { SimulationConfig } from './types';
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
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

  const isIntroduction = location.pathname === '/introduction';
  const isDemoPage = location.pathname.startsWith('/demo');

  return (
    <div className="app">
      <GitHubBadge repoUrl="https://github.com/tradermoney/monty-hall-problem" />

      <header className="app-header">
        <h1 className="app-title">蒙提霍尔问题模拟器</h1>

        <nav className="app-nav">
          <div className="main-nav">
            <button
              className={`nav-button main-nav-button ${isIntroduction ? 'active' : ''}`}
              onClick={() => navigate('/introduction')}
            >
              三门问题介绍
            </button>
            <button
              className={`nav-button main-nav-button ${isDemoPage ? 'active' : ''}`}
              onClick={() => navigate('/demo/auto')}
            >
              三门问题演示
            </button>
          </div>

          {isDemoPage && (
            <div className="sub-nav">
              <button
                className={`nav-button ${location.pathname === '/demo/auto' ? 'active' : ''}`}
                onClick={() => navigate('/demo/auto')}
              >
                自动模拟
              </button>
              <button
                className={`nav-button ${location.pathname === '/demo/manual' ? 'active' : ''}`}
                onClick={() => navigate('/demo/manual')}
              >
                手动游戏
              </button>
              <button
                className={`nav-button ${location.pathname === '/demo/settings' ? 'active' : ''}`}
                onClick={() => navigate('/demo/settings')}
              >
                设置
              </button>
            </div>
          )}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/demo/auto" replace />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/demo" element={<Navigate to="/demo/auto" replace />} />
          <Route path="/demo/auto" element={
            <div className="app-layout">
              <aside className="sidebar">
                <section className="parameter-section">
                  <ParameterPanel
                    config={config}
                    onConfigChange={handleConfigChange}
                    disabled={false}
                  />
                </section>
              </aside>

              <div className="main-content">
                <div className="tab-content">
                  <section className="simulation-section">
                    <AutoSimulation />
                  </section>

                  <section className="charts-section">
                    <h2>统计图表</h2>
                    <StatisticsCharts stats={statisticsInfo} />
                  </section>
                </div>
              </div>

              <aside className="data-sidebar">
                <section className="data-section">
                  <h2>数据管理</h2>
                  <DataManager
                    config={config}
                    stats={(() => {
                      const totalRuns = allRecords.length;
                      const wins = allRecords.filter(r => r.win).length;
                      const losses = totalRuns - wins;
                      const winRate = totalRuns > 0 ? wins / totalRuns : 0;
                      const standardError = totalRuns > 0 ? Math.sqrt((winRate * (1 - winRate)) / totalRuns) : 0;
                      const marginOfError = 1.96 * standardError;

                      return {
                        totalRuns,
                        wins,
                        losses,
                        winRate: winRate * 100,
                        standardError: standardError * 100,
                        confidenceInterval: {
                          lower: Math.max(0, (winRate - marginOfError) * 100),
                          upper: Math.min(100, (winRate + marginOfError) * 100)
                        }
                      };
                    })()}
                    rawData={allRecords}
                    onImport={() => {}}
                  />
                </section>
              </aside>
            </div>
          } />
          <Route path="/demo/manual" element={
            <div className="app-layout">
              <aside className="sidebar">
                <section className="parameter-section">
                  <ParameterPanel
                    config={config}
                    onConfigChange={handleConfigChange}
                    disabled={false}
                  />
                </section>
              </aside>

              <div className="main-content">
                <div className="tab-content">
                  <section className="manual-game-section">
                    <ManualGame />
                  </section>
                </div>
              </div>

              <aside className="data-sidebar">
                <section className="data-section">
                  <h2>数据管理</h2>
                  <DataManager
                    config={config}
                    stats={(() => {
                      const totalRuns = allRecords.length;
                      const wins = allRecords.filter(r => r.win).length;
                      const losses = totalRuns - wins;
                      const winRate = totalRuns > 0 ? wins / totalRuns : 0;
                      const standardError = totalRuns > 0 ? Math.sqrt((winRate * (1 - winRate)) / totalRuns) : 0;
                      const marginOfError = 1.96 * standardError;

                      return {
                        totalRuns,
                        wins,
                        losses,
                        winRate: winRate * 100,
                        standardError: standardError * 100,
                        confidenceInterval: {
                          lower: Math.max(0, (winRate - marginOfError) * 100),
                          upper: Math.min(100, (winRate + marginOfError) * 100)
                        }
                      };
                    })()}
                    rawData={allRecords}
                    onImport={() => {}}
                  />
                </section>
              </aside>
            </div>
          } />
          <Route path="/demo/manual" element={
            <div className="app-layout">
              <aside className="sidebar">
                <section className="parameter-section">
                  <ParameterPanel
                    config={config}
                    onConfigChange={handleConfigChange}
                    disabled={false}
                  />
                </section>
              </aside>

              <div className="main-content">
                <div className="tab-content">
                  <section className="manual-game-section">
                    <ManualGame />
                  </section>
                </div>
              </div>

              <aside className="data-sidebar">
                <section className="data-section">
                  <h2>数据管理</h2>
                  <DataManager
                    config={config}
                    stats={(() => {
                      const totalRuns = allRecords.length;
                      const wins = allRecords.filter(r => r.win).length;
                      const losses = totalRuns - wins;
                      const winRate = totalRuns > 0 ? wins / totalRuns : 0;
                      const standardError = totalRuns > 0 ? Math.sqrt((winRate * (1 - winRate)) / totalRuns) : 0;
                      const marginOfError = 1.96 * standardError;

                      return {
                        totalRuns,
                        wins,
                        losses,
                        winRate: winRate * 100,
                        standardError: standardError * 100,
                        confidenceInterval: {
                          lower: Math.max(0, (winRate - marginOfError) * 100),
                          upper: Math.min(100, (winRate + marginOfError) * 100)
                        }
                      };
                    })()}
                    rawData={allRecords}
                    onImport={() => {}}
                  />
                </section>
              </aside>
            </div>
          } />
          <Route path="/demo/manual" element={
            <div className="app-layout">
              <aside className="sidebar">
                <section className="parameter-section">
                  <ParameterPanel
                    config={config}
                    onConfigChange={handleConfigChange}
                    disabled={false}
                  />
                </section>
              </aside>

              <div className="main-content">
                <div className="tab-content">
                  <section className="manual-game-section">
                    <ManualGame />
                  </section>
                </div>
              </div>

              <aside className="data-sidebar">
                <section className="data-section">
                  <h2>数据管理</h2>
                  <DataManager
                    config={config}
                    stats={(() => {
                      const totalRuns = allRecords.length;
                      const wins = allRecords.filter(r => r.win).length;
                      const losses = totalRuns - wins;
                      const winRate = totalRuns > 0 ? wins / totalRuns : 0;
                      const standardError = totalRuns > 0 ? Math.sqrt((winRate * (1 - winRate)) / totalRuns) : 0;
                      const marginOfError = 1.96 * standardError;

                      return {
                        totalRuns,
                        wins,
                        losses,
                        winRate: winRate * 100,
                        standardError: standardError * 100,
                        confidenceInterval: {
                          lower: Math.max(0, (winRate - marginOfError) * 100),
                          upper: Math.min(100, (winRate + marginOfError) * 100)
                        }
                      };
                    })()}
                    rawData={allRecords}
                    onImport={() => {}}
                  />
                </section>
              </aside>
            </div>
          } />
          <Route path="/demo/settings" element={
            <div className="app-layout">
              <aside className="sidebar">
                <section className="parameter-section">
                  <ParameterPanel
                    config={config}
                    onConfigChange={handleConfigChange}
                    disabled={false}
                  />
                </section>
              </aside>

              <div className="main-content">
                <div className="tab-content">
                  <section className="settings-section">
                    <Settings />
                  </section>
                </div>
              </div>

              <aside className="data-sidebar">
                <section className="data-section">
                  <h2>数据管理</h2>
                  <DataManager
                    config={config}
                    stats={(() => {
                      const totalRuns = allRecords.length;
                      const wins = allRecords.filter(r => r.win).length;
                      const losses = totalRuns - wins;
                      const winRate = totalRuns > 0 ? wins / totalRuns : 0;
                      const standardError = totalRuns > 0 ? Math.sqrt((winRate * (1 - winRate)) / totalRuns) : 0;
                      const marginOfError = 1.96 * standardError;

                      return {
                        totalRuns,
                        wins,
                        losses,
                        winRate: winRate * 100,
                        standardError: standardError * 100,
                        confidenceInterval: {
                          lower: Math.max(0, (winRate - marginOfError) * 100),
                          upper: Math.min(100, (winRate + marginOfError) * 100)
                        }
                      };
                    })()}
                    rawData={allRecords}
                    onImport={() => {}}
                  />
                </section>
              </aside>
            </div>
          } />
          <Route path="/demo/manual" element={
            <div className="app-layout">
              <aside className="sidebar">
                <section className="parameter-section">
                  <ParameterPanel
                    config={config}
                    onConfigChange={handleConfigChange}
                    disabled={false}
                  />
                </section>
              </aside>

              <div className="main-content">
                <div className="tab-content">
                  <section className="manual-game-section">
                    <ManualGame />
                  </section>
                </div>
              </div>

              <aside className="data-sidebar">
                <section className="data-section">
                  <h2>数据管理</h2>
                  <DataManager
                    config={config}
                    stats={(() => {
                      const totalRuns = allRecords.length;
                      const wins = allRecords.filter(r => r.win).length;
                      const losses = totalRuns - wins;
                      const winRate = totalRuns > 0 ? wins / totalRuns : 0;
                      const standardError = totalRuns > 0 ? Math.sqrt((winRate * (1 - winRate)) / totalRuns) : 0;
                      const marginOfError = 1.96 * standardError;

                      return {
                        totalRuns,
                        wins,
                        losses,
                        winRate: winRate * 100,
                        standardError: standardError * 100,
                        confidenceInterval: {
                          lower: Math.max(0, (winRate - marginOfError) * 100),
                          upper: Math.min(100, (winRate + marginOfError) * 100)
                        }
                      };
                    })()}
                    rawData={allRecords}
                    onImport={() => {}}
                  />
                </section>
              </aside>
            </div>
          } />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 蒙提霍尔问题模拟器</p>
      </footer>
    </div>
  );
}

export default App;
