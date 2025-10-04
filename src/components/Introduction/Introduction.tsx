import React from 'react';
import './Introduction.css';

const ThreeDoorsIllustration: React.FC = () => (
  <svg className="illustration-svg" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect x="0" y="0" width="600" height="300" fill="#f8fafc" rx="10"/>

    {/* Door 1 */}
    <g className="door-group">
      <rect x="20" y="50" width="150" height="200" fill="#8B4513" stroke="#654321" strokeWidth="3" rx="5"/>
      <rect x="30" y="60" width="130" height="180" fill="#A0522D" stroke="#654321" strokeWidth="2" rx="3"/>
      <circle cx="150" cy="150" r="8" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
      <text x="95" y="270" fontSize="24" fill="#059669" fontWeight="bold" textAnchor="middle">门 1</text>
      <text x="95" y="40" fontSize="20" fill="#6b7280" fontWeight="bold" textAnchor="middle">门后是什么？</text>
    </g>

    {/* Door 2 */}
    <g className="door-group">
      <rect x="225" y="50" width="150" height="200" fill="#8B4513" stroke="#654321" strokeWidth="3" rx="5"/>
      <rect x="235" y="60" width="130" height="180" fill="#A0522D" stroke="#654321" strokeWidth="2" rx="3"/>
      <circle cx="355" cy="150" r="8" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
      <text x="300" y="270" fontSize="24" fill="#059669" fontWeight="bold" textAnchor="middle">门 2</text>
      <text x="300" y="40" fontSize="20" fill="#6b7280" fontWeight="bold" textAnchor="middle">门后是什么？</text>
    </g>

    {/* Door 3 */}
    <g className="door-group">
      <rect x="430" y="50" width="150" height="200" fill="#8B4513" stroke="#654321" strokeWidth="3" rx="5"/>
      <rect x="440" y="60" width="130" height="180" fill="#A0522D" stroke="#654321" strokeWidth="2" rx="3"/>
      <circle cx="560" cy="150" r="8" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
      <text x="505" y="270" fontSize="24" fill="#059669" fontWeight="bold" textAnchor="middle">门 3</text>
      <text x="505" y="40" fontSize="20" fill="#6b7280" fontWeight="bold" textAnchor="middle">门后是什么？</text>
    </g>

    {/* Question marks above doors */}
    <text x="95" y="30" fontSize="36" fill="#059669" fontWeight="bold" textAnchor="middle">?</text>
    <text x="300" y="30" fontSize="36" fill="#059669" fontWeight="bold" textAnchor="middle">?</text>
    <text x="505" y="30" fontSize="36" fill="#059669" fontWeight="bold" textAnchor="middle">?</text>

    {/* Title */}
    <text x="300" y="20" fontSize="18" fill="#374151" fontWeight="bold" textAnchor="middle">三扇门，只有一扇门后有汽车🚗</text>
  </svg>
);

const GameStepsIllustration: React.FC = () => (
  <div className="game-steps-visual">
    {/* Step 1: Initial choice */}
    <div className="step-visual">
      <h4>第1步：选择一扇门</h4>
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="40" width="100" height="120" fill="#10b981" stroke="#059669" strokeWidth="3" rx="5" opacity="0.8"/>
        <text x="70" y="180" fontSize="18" fill="#059669" fontWeight="bold" textAnchor="middle">你选了这扇</text>

        <rect x="150" y="40" width="100" height="120" fill="#8B4513" stroke="#654321" strokeWidth="2" rx="5"/>
        <rect x="280" y="40" width="100" height="120" fill="#8B4513" stroke="#654321" strokeWidth="2" rx="5"/>
      </svg>
    </div>

    {/* Step 2: Host opens a door */}
    <div className="step-visual">
      <h4>第2步：主持人打开一扇有山羊的门</h4>
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="40" width="100" height="120" fill="#10b981" stroke="#059669" strokeWidth="3" rx="5" opacity="0.8"/>

        <g>
          <rect x="150" y="40" width="100" height="120" fill="#fff" stroke="#654321" strokeWidth="2" rx="5"/>
          <text x="200" y="110" fontSize="48" textAnchor="middle">🐐</text>
          <text x="200" y="180" fontSize="16" fill="#dc2626" fontWeight="bold" textAnchor="middle">山羊</text>
        </g>

        <rect x="280" y="40" width="100" height="120" fill="#8B4513" stroke="#654321" strokeWidth="2" rx="5"/>
      </svg>
    </div>

    {/* Step 3: Decision */}
    <div className="step-visual">
      <h4>第3步：换还是不换？</h4>
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="40" width="100" height="120" fill="#10b981" stroke="#059669" strokeWidth="3" rx="5" opacity="0.5"/>
        <text x="70" y="180" fontSize="16" fill="#059669" fontWeight="bold" textAnchor="middle">原来的选择</text>

        <g>
          <rect x="150" y="40" width="100" height="120" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="5" opacity="0.5"/>
          <text x="200" y="110" fontSize="48" textAnchor="middle" opacity="0.3">🐐</text>
          <line x1="180" y1="70" x2="220" y2="130" stroke="#dc2626" strokeWidth="4"/>
          <line x1="220" y1="70" x2="180" y2="130" stroke="#dc2626" strokeWidth="4"/>
        </g>

        <rect x="280" y="40" width="100" height="120" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" rx="5" opacity="0.8"/>
        <text x="330" y="180" fontSize="16" fill="#f59e0b" fontWeight="bold" textAnchor="middle">换到这扇？</text>

        {/* Arrow */}
        <path d="M 120 100 Q 200 100 275 100" stroke="#059669" strokeWidth="3" fill="none" strokeDasharray="5,5"/>
        <polygon points="275,100 260,95 260,105" fill="#059669"/>
        <text x="200" y="90" fontSize="18" fill="#059669" fontWeight="bold" textAnchor="middle">换门</text>
      </svg>
    </div>
  </div>
);

const ProbabilityPieChart: React.FC = () => {
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  // 计算饼图路径
  const describeArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", centerX, centerY,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="probability-pie-charts">
      <h3>🥧 概率分布饼图</h3>
      <div className="pie-charts-container">
        <div className="pie-chart-wrapper">
          <h4>第一次选择</h4>
          <svg viewBox="0 0 200 200" className="pie-chart">
            {/* 汽车 - 1/3 */}
            <path
              d={describeArc(0, 120)}
              fill="#10b981"
              stroke="#fff"
              strokeWidth="2"
            />
            {/* 山羊A - 1/3 */}
            <path
              d={describeArc(120, 240)}
              fill="#f59e0b"
              stroke="#fff"
              strokeWidth="2"
            />
            {/* 山羊B - 1/3 */}
            <path
              d={describeArc(240, 360)}
              fill="#f59e0b"
              stroke="#fff"
              strokeWidth="2"
            />
            <text x="100" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">🚗</text>
            <text x="100" y="105" textAnchor="middle" fontSize="10" fill="#fff">33.3%</text>
          </svg>
          <div className="pie-legend">
            <div className="legend-item">
              <span className="legend-color" style={{backgroundColor: '#10b981'}}></span>
              <span>汽车 (33.3%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{backgroundColor: '#f59e0b'}}></span>
              <span>山羊 (66.7%)</span>
            </div>
          </div>
        </div>

        <div className="pie-chart-wrapper">
          <h4>换门策略结果</h4>
          <svg viewBox="0 0 200 200" className="pie-chart">
            {/* 获胜 - 2/3 */}
            <path
              d={describeArc(0, 240)}
              fill="#10b981"
              stroke="#fff"
              strokeWidth="2"
            />
            {/* 失败 - 1/3 */}
            <path
              d={describeArc(240, 360)}
              fill="#dc2626"
              stroke="#fff"
              strokeWidth="2"
            />
            <text x="100" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">🏆</text>
            <text x="100" y="105" textAnchor="middle" fontSize="10" fill="#fff">66.7%</text>
          </svg>
          <div className="pie-legend">
            <div className="legend-item">
              <span className="legend-color" style={{backgroundColor: '#10b981'}}></span>
              <span>获胜 (66.7%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{backgroundColor: '#dc2626'}}></span>
              <span>失败 (33.3%)</span>
            </div>
          </div>
        </div>
      </div>
      <p className="pie-chart-note">
        💡 <strong>图解：</strong>换门策略将原本分散在山羊上的66.7%概率转化为获胜概率！
      </p>
    </div>
  );
};

const ProbabilityComparisonChart: React.FC = () => (
  <div className="probability-comparison">
    <h3>🎯 换门 vs 不换门：胜率对比</h3>
    <div className="comparison-container">
      <div className="strategy-comparison">
        <div className="strategy-card no-switch">
          <div className="strategy-header">
            <span className="strategy-icon">🚫</span>
            <h4>不换门策略</h4>
          </div>
          <div className="probability-bar">
            <div className="bar-fill" style={{width: '33.3%'}}></div>
            <span className="bar-label">33.3%</span>
          </div>
          <p className="strategy-desc">只能赢在你第一次就选对的情况</p>
          <div className="win-scenario">
            <strong>获胜条件：</strong>
            <br />第一次就选中有汽车的门（1/3概率）
          </div>
        </div>

        <div className="versus-divider">
          <span className="vs-text">VS</span>
        </div>

        <div className="strategy-card switch">
          <div className="strategy-header">
            <span className="strategy-icon">🔄</span>
            <h4>换门策略</h4>
          </div>
          <div className="probability-bar">
            <div className="bar-fill" style={{width: '66.7%'}}></div>
            <span className="bar-label">66.7%</span>
          </div>
          <p className="strategy-desc">换门让你赢面翻倍！</p>
          <div className="win-scenario">
            <strong>获胜条件：</strong>
            <br />第一次选中山羊门（2/3概率）
            <br />换门后必然得到汽车
          </div>
        </div>
      </div>

      <div className="key-insight">
        <div className="insight-highlight">
          <span className="insight-icon">💡</span>
          <div className="insight-text">
            <strong>关键洞察：</strong> 因为你第一次选错的概率是2/3（选中山羊），
            而主持人会帮你排除另一只山羊，所以换门后获胜的概率就是2/3！
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProbabilityTreeDiagram: React.FC = () => (
  <svg className="probability-tree" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
    {/* Title */}
    <text x="400" y="30" fontSize="24" fontWeight="bold" fill="#059669" textAnchor="middle">概率树状图</text>

    {/* Root */}
    <circle cx="400" cy="80" r="30" fill="#10b981" stroke="#059669" strokeWidth="3"/>
    <text x="400" y="88" fontSize="16" fill="white" fontWeight="bold" textAnchor="middle">开始</text>

    {/* First level - Initial choices */}
    <g id="choice1">
      <line x1="400" y1="110" x2="200" y2="180" stroke="#059669" strokeWidth="2"/>
      <circle cx="200" cy="200" r="25" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
      <text x="200" y="208" fontSize="14" fontWeight="bold" textAnchor="middle">🚗</text>
      <text x="200" y="240" fontSize="14" fill="#059669" fontWeight="bold" textAnchor="middle">选中汽车</text>
      <text x="300" y="150" fontSize="16" fill="#059669" fontWeight="bold">1/3</text>
    </g>

    <g id="choice2">
      <line x1="400" y1="110" x2="400" y2="180" stroke="#059669" strokeWidth="2"/>
      <circle cx="400" cy="200" r="25" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
      <text x="400" y="208" fontSize="14" fontWeight="bold" textAnchor="middle">🐐</text>
      <text x="400" y="240" fontSize="14" fill="#059669" fontWeight="bold" textAnchor="middle">选中山羊A</text>
      <text x="400" y="150" fontSize="16" fill="#059669" fontWeight="bold" textAnchor="middle">1/3</text>
    </g>

    <g id="choice3">
      <line x1="400" y1="110" x2="600" y2="180" stroke="#059669" strokeWidth="2"/>
      <circle cx="600" cy="200" r="25" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
      <text x="600" y="208" fontSize="14" fontWeight="bold" textAnchor="middle">🐐</text>
      <text x="600" y="240" fontSize="14" fill="#059669" fontWeight="bold" textAnchor="middle">选中山羊B</text>
      <text x="500" y="150" fontSize="16" fill="#059669" fontWeight="bold" textAnchor="middle">1/3</text>
    </g>

    {/* Second level - Switch or stay */}
    {/* From car */}
    <line x1="200" y1="225" x2="120" y2="320" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5"/>
    <circle cx="100" cy="340" r="20" fill="#dc2626" opacity="0.8"/>
    <text x="100" y="348" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">🐐</text>
    <text x="100" y="370" fontSize="12" fill="#dc2626" fontWeight="bold" textAnchor="middle">换门→输</text>
    <text x="145" y="280" fontSize="14" fill="#dc2626" fontWeight="bold">换</text>

    <line x1="200" y1="225" x2="280" y2="320" stroke="#10b981" strokeWidth="2"/>
    <circle cx="300" cy="340" r="20" fill="#10b981" opacity="0.8"/>
    <text x="300" y="348" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">🚗</text>
    <text x="300" y="370" fontSize="12" fill="#10b981" fontWeight="bold" textAnchor="middle">不换→赢</text>
    <text x="245" y="280" fontSize="14" fill="#10b981" fontWeight="bold">不换</text>

    {/* From goat A */}
    <line x1="400" y1="225" x2="380" y2="320" stroke="#10b981" strokeWidth="2"/>
    <circle cx="370" cy="340" r="20" fill="#10b981" opacity="0.8"/>
    <text x="370" y="348" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">🚗</text>
    <text x="370" y="370" fontSize="12" fill="#10b981" fontWeight="bold" textAnchor="middle">换门→赢</text>
    <text x="375" y="280" fontSize="14" fill="#10b981" fontWeight="bold">换</text>

    <line x1="400" y1="225" x2="420" y2="320" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5"/>
    <circle cx="430" cy="340" r="20" fill="#dc2626" opacity="0.8"/>
    <text x="430" y="348" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">🐐</text>
    <text x="430" y="370" fontSize="12" fill="#dc2626" fontWeight="bold" textAnchor="middle">不换→输</text>
    <text x="425" y="280" fontSize="14" fill="#dc2626" fontWeight="bold">不换</text>

    {/* From goat B */}
    <line x1="600" y1="225" x2="520" y2="320" stroke="#10b981" strokeWidth="2"/>
    <circle cx="500" cy="340" r="20" fill="#10b981" opacity="0.8"/>
    <text x="500" y="348" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">🚗</text>
    <text x="500" y="370" fontSize="12" fill="#10b981" fontWeight="bold" textAnchor="middle">换门→赢</text>
    <text x="545" y="280" fontSize="14" fill="#10b981" fontWeight="bold">换</text>

    <line x1="600" y1="225" x2="680" y2="320" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5"/>
    <circle cx="700" cy="340" r="20" fill="#dc2626" opacity="0.8"/>
    <text x="700" y="348" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">🐐</text>
    <text x="700" y="370" fontSize="12" fill="#dc2626" fontWeight="bold" textAnchor="middle">不换→输</text>
    <text x="655" y="280" fontSize="14" fill="#dc2626" fontWeight="bold">不换</text>

    {/* Summary */}
    <rect x="50" y="420" width="700" height="140" fill="#f0fdf4" stroke="#059669" strokeWidth="2" rx="8"/>
    <text x="400" y="450" fontSize="20" fontWeight="bold" fill="#059669" textAnchor="middle">结论</text>

    <text x="400" y="485" fontSize="18" fill="#047857" textAnchor="middle">
      换门策略：3种情况中有2种获胜 → 概率 = 2/3 = 66.7% ✓
    </text>

    <text x="400" y="520" fontSize="18" fill="#dc2626" textAnchor="middle">
      不换策略：3种情况中有1种获胜 → 概率 = 1/3 = 33.3% ✗
    </text>

    <text x="400" y="550" fontSize="16" fill="#059669" fontWeight="bold" textAnchor="middle">
      换门使获胜概率翻倍！
    </text>
  </svg>
);

export const Introduction: React.FC = () => {
  return (
    <div className="introduction">
      <div className="introduction-container">
        <section className="intro-hero">
          <h1>蒙提霍尔问题</h1>
          <p className="intro-subtitle">一个违反直觉的概率问题</p>
        </section>

        <section className="intro-section">
          <h2>问题背景</h2>
          <p>
            蒙提霍尔问题（Monty Hall Problem）源自美国电视游戏节目《Let's Make a Deal》，
            由该节目主持人蒙提·霍尔（Monty Hall）的名字命名。这是一个著名的概率谜题，
            因其违反直觉的答案而广为人知。
          </p>
        </section>

        <section className="intro-section">
          <h2>问题描述</h2>

          <ThreeDoorsIllustration />

          <div className="problem-description">
            <p>想象你正在参加一个电视游戏节目：</p>
            <ol>
              <li>🚪 面前有<strong>三扇门</strong>，其中一扇门后面是<strong>汽车</strong>（大奖🚗），另外两扇门后面是<strong>山羊</strong>（🐐）。</li>
              <li>👆 你先<strong>选择一扇门</strong>（但不打开它）。</li>
              <li>👨‍💼 主持人<strong>知道每扇门后面是什么</strong>，他会打开剩余两扇门中的一扇，<strong>露出一只山羊</strong>。</li>
              <li>🤔 主持人问你：要不要<strong>换到另一扇未打开的门</strong>？</li>
            </ol>
            <p className="problem-question">
              <strong>❓ 核心问题：换门会增加获胜的概率吗？</strong>
            </p>
          </div>

          <GameStepsIllustration />
        </section>

        <section className="intro-section">
          <h2>💭 你的第一感觉是什么？</h2>
          <div className="intuition-box">
            <p className="intuition-text">
              🤔 大多数人的第一反应：<em>"换不换都一样吧？反正剩下两扇门，50%对50%嘛！"</em>
            </p>
          </div>
          <p className="answer-highlight">
            <strong>🎯 真相揭晓：换门会让你的获胜概率从 33% 跳到 67%！</strong>
          </p>
        </section>

        <section className="intro-section">
          <ProbabilityComparisonChart />
        </section>

        <section className="intro-section">
          <ProbabilityPieChart />
        </section>

        <section className="intro-section">
          <h2>📊 为什么换门更好？让数据说话</h2>

          <ProbabilityTreeDiagram />

          <div className="probability-analysis">
            <h3>🔴 如果你坚持不换门</h3>
            <p className="strategy-explanation">
              你能赢的唯一可能，就是<strong>一开始就选对了汽车</strong>。
              <br />
              但三扇门里选一扇，选对的概率只有 <strong>1/3 ≈ 33.3%</strong> 😢
            </p>

            <h3>🟢 如果你选择换门</h3>
            <p className="strategy-explanation">让我们看看所有可能的情况：</p>
            <div className="scenarios-grid">
              <div className="scenario-card scenario-lose">
                <div className="scenario-header">情况①：你一开始就选中了🚗</div>
                <div className="scenario-body">
                  <p>概率：1/3</p>
                  <p>→ 主持人打开一扇有🐐的门</p>
                  <p>→ 你换门后得到🐐</p>
                  <p className="scenario-result lose">❌ 输了</p>
                </div>
              </div>

              <div className="scenario-card scenario-win">
                <div className="scenario-header">情况②：你一开始选中了🐐</div>
                <div className="scenario-body">
                  <p>概率：1/3</p>
                  <p>→ 主持人打开另一扇有🐐的门</p>
                  <p>→ 你换门后得到🚗</p>
                  <p className="scenario-result win">✅ 赢了！</p>
                </div>
              </div>

              <div className="scenario-card scenario-win">
                <div className="scenario-header">情况③：你一开始选中了另一只🐐</div>
                <div className="scenario-body">
                  <p>概率：1/3</p>
                  <p>→ 主持人打开第一只🐐的门</p>
                  <p>→ 你换门后得到🚗</p>
                  <p className="scenario-result win">✅ 赢了！</p>
                </div>
              </div>
            </div>

            <p className="conclusion">
              <strong>统计一下：</strong>三种情况里，换门有<strong>两次能赢</strong>，只有<strong>一次会输</strong>。
              <br />
              所以换门的获胜率是 <strong>2/3 ≈ 66.7%</strong> 🎉
            </p>
          </div>
        </section>

        <section className="intro-section">
          <h2>💡 三个关键点帮你理解</h2>
          <div className="key-insights">
            <div className="insight-card">
              <h3>🔑 主持人不是随便开门的</h3>
              <p>
                主持人<strong>知道</strong>每扇门后面是什么，他<strong>总是</strong>打开一扇有山羊的门。
                这不是随机的，这是有信息的！正是这个信息改变了游戏。
              </p>
            </div>
            <div className="insight-card">
              <h3>🎯 你最初选错的概率其实很高</h3>
              <p>
                三扇门里只有一辆车，所以你一开始选错（选到山羊）的概率是<strong>2/3</strong>。
                主持人开门后，就等于帮你<strong>排除</strong>了一个错误答案，剩下那扇门藏着好东西的概率自然就高了！
              </p>
            </div>
            <div className="insight-card">
              <h3>📊 眼见为实：做个实验吧</h3>
              <p>
                如果还是不敢相信，最好的办法就是<strong>亲自试试</strong>！
                玩100次、1000次，你会发现换门的胜率真的接近67%。数据不会骗人！
              </p>
            </div>
          </div>
        </section>

        <section className="intro-section">
          <h2>📜 有趣的历史故事</h2>
          <div className="history-story">
            <p>
              <strong>1990年</strong>，有位叫<strong>玛丽莲·沃斯·莎凡特</strong>（Marilyn vos Savant）的女士在杂志专栏里回答了这个问题。
              她说："应该换门，概率会从1/3提高到2/3。"
            </p>
            <p className="story-conflict">
              结果呢？她收到了<strong>上万封读者来信</strong>，其中很多是数学教授和博士，都说她错了！ 😮
            </p>
            <p>
              但后来通过<strong>大量计算机模拟</strong>和严格的数学证明，大家发现：<strong>玛丽莲是对的</strong>！
              那些质疑她的专家们都被打脸了。
            </p>
            <p className="story-lesson">
              这个故事告诉我们：<strong>人类的直觉在概率问题上经常会出错</strong>，即使是数学专家也不例外！
              这就是为什么蒙提霍尔问题成为了概率论教学中的经典案例。
            </p>
          </div>
        </section>

        <section className="intro-section cta-section">
          <h2>🎮 来，亲自验证一下吧！</h2>
          <p className="cta-intro">
            光看理论可能还是半信半疑？没关系，眼见为实！
          </p>
          <div className="cta-features">
            <div className="cta-feature">
              <span className="feature-icon">🎲</span>
              <p><strong>手动模式：</strong>一局一局地玩，亲身体验换门和不换门的区别</p>
            </div>
            <div className="cta-feature">
              <span className="feature-icon">⚡</span>
              <p><strong>自动模拟：</strong>让电脑帮你玩10000次，直接看统计数据</p>
            </div>
            <div className="cta-feature">
              <span className="feature-icon">📈</span>
              <p><strong>实时图表：</strong>胜率变化一目了然，看着数字逼近67%</p>
            </div>
          </div>
          <p className="cta-text">
            点击顶部导航栏的<strong>"三门问题演示"</strong>，用数据证明数学的魅力！ 🚀
          </p>
        </section>
      </div>
    </div>
  );
};
