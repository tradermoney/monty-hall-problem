import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import type { StatisticsInfo } from '../../types';
import './StatisticsCharts.css';

interface StatisticsChartsProps {
  stats: StatisticsInfo;
}

export const StatisticsCharts: React.FC<StatisticsChartsProps> = ({ stats }) => {
  // 准备图表数据
  const strategyComparisonData = [
    {
      strategy: '从不换门',
      winRate: stats.neverSwitch?.winRate || 0,
      wins: stats.neverSwitch?.wins || 0,
      losses: stats.neverSwitch?.losses || 0
    },
    {
      strategy: '总是换门',
      winRate: stats.alwaysSwitch?.winRate || 0,
      wins: stats.alwaysSwitch?.wins || 0,
      losses: stats.alwaysSwitch?.losses || 0
    },
    {
      strategy: '随机换门',
      winRate: stats.randomSwitch?.winRate || 0,
      wins: stats.randomSwitch?.wins || 0,
      losses: stats.randomSwitch?.losses || 0
    }
  ];

  const winRateData = [
    { name: '从不换门', 胜率: stats.neverSwitch?.winRate || 0 },
    { name: '总是换门', 胜率: stats.alwaysSwitch?.winRate || 0 },
    { name: '随机换门', 胜率: stats.randomSwitch?.winRate || 0 }
  ];

  const totalWins = strategyComparisonData.reduce((sum, item) => sum + item.wins, 0);
  const totalLosses = strategyComparisonData.reduce((sum, item) => sum + item.losses, 0);

  const pieData = [
    { name: '总胜利', value: totalWins, color: '#10b981' },
    { name: '总失败', value: totalLosses, color: '#ef4444' }
  ];

  const CustomTooltip = ({ active, payload, label }: { 
    active?: boolean; 
    payload?: Array<{ color: string; dataKey: string; value: number | string }>; 
    label?: string 
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry: { color: string; dataKey: string; value: number | string }, index: number) => (
            <p key={index} className="tooltip-item" style={{ color: entry.color }}>
              {entry.dataKey}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="statistics-charts">
      <h2>仿真结果统计图表</h2>
      
      <div className="charts-grid">
        {/* 胜率对比柱状图 */}
        <div className="chart-container">
          <h3>策略胜率对比</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={winRateData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="胜率" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
                name="胜率 (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 胜负分布饼图 */}
        <div className="chart-container">
          <h3>总体胜负分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={false}
                outerRadius={80}
                fill="#3b82f6"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 详细统计表格 */}
        <div className="chart-container full-width">
          <h3>详细统计数据</h3>
          <div className="stats-table">
            <table>
              <thead>
                <tr>
                  <th>策略</th>
                  <th>胜利次数</th>
                  <th>失败次数</th>
                  <th>总次数</th>
                  <th>胜率</th>
                  <th>标准误差</th>
                  <th>95%置信区间</th>
                </tr>
              </thead>
              <tbody>
                {strategyComparisonData.map((item, index) => {
                  const strategyStats = index === 0 ? stats.neverSwitch : 
                                      index === 1 ? stats.alwaysSwitch : stats.randomSwitch;
                  return (
                    <tr key={item.strategy}>
                      <td className="strategy-name">{item.strategy}</td>
                      <td className="wins">{item.wins.toLocaleString()}</td>
                      <td className="losses">{item.losses.toLocaleString()}</td>
                      <td className="total">{(item.wins + item.losses).toLocaleString()}</td>
                      <td className="win-rate">{item.winRate.toFixed(2)}%</td>
                      <td className="std-error">{strategyStats?.standardError?.toFixed(4) || 'N/A'}</td>
                      <td className="confidence-interval">
                        {strategyStats?.confidenceInterval ? 
                          `[${strategyStats.confidenceInterval.lower.toFixed(2)}%, ${strategyStats.confidenceInterval.upper.toFixed(2)}%]` : 
                          'N/A'
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 趋势图（暂时注释掉，因为StatisticsInfo中没有allRecords属性） */}
        {/* {stats.allRecords && stats.allRecords.length > 0 && (
          <div className="chart-container full-width">
            <h3>胜率趋势（按批次）</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart 
                data={stats.allRecords}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="batch" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="winRate" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="胜率"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )} */}
      </div>
    </div>
  );
};