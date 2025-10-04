import React from 'react';
import './Introduction.css';

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
          <div className="problem-description">
            <p>游戏规则如下：</p>
            <ol>
              <li>有三扇门，其中一扇门后面是汽车（大奖），另外两扇门后面是山羊。</li>
              <li>参赛者首先选择一扇门（但不打开）。</li>
              <li>主持人知道每扇门后面是什么，他会打开剩余两扇门中的一扇门，展示一只山羊。</li>
              <li>主持人问参赛者：是否要改变最初的选择，换到另一扇未打开的门？</li>
            </ol>
            <p className="problem-question">
              <strong>问题：换门会增加获胜的概率吗？</strong>
            </p>
          </div>
        </section>

        <section className="intro-section">
          <h2>直觉与答案</h2>
          <p>
            大多数人的直觉认为换不换门都一样，因为剩下两扇门，获胜概率应该各是50%。
          </p>
          <p className="answer-highlight">
            <strong>但正确答案是：换门会使获胜概率从1/3提高到2/3！</strong>
          </p>
        </section>

        <section className="intro-section">
          <h2>概率分析</h2>
          <div className="probability-analysis">
            <h3>不换门的情况</h3>
            <p>
              如果坚持最初的选择，获胜的概率就是一开始选中汽车的概率，即 <strong>1/3</strong>。
            </p>

            <h3>换门的情况</h3>
            <p>让我们分析三种可能的初始选择：</p>
            <ul>
              <li>
                <strong>情况1：</strong>最初选中汽车（概率1/3）
                <br />
                → 主持人打开一扇有山羊的门
                <br />
                → 换门后得到山羊（输）
              </li>
              <li>
                <strong>情况2：</strong>最初选中山羊A（概率1/3）
                <br />
                → 主持人打开有山羊B的门
                <br />
                → 换门后得到汽车（赢）
              </li>
              <li>
                <strong>情况3：</strong>最初选中山羊B（概率1/3）
                <br />
                → 主持人打开有山羊A的门
                <br />
                → 换门后得到汽车（赢）
              </li>
            </ul>
            <p className="conclusion">
              因此，换门的获胜概率是 <strong>2/3</strong>，而不换门只有 <strong>1/3</strong>。
            </p>
          </div>
        </section>

        <section className="intro-section">
          <h2>关键洞察</h2>
          <div className="key-insights">
            <div className="insight-card">
              <h3>🔑 主持人的知识很重要</h3>
              <p>
                主持人知道门后的内容，他总是会打开一扇有山羊的门。这个信息改变了概率分布。
              </p>
            </div>
            <div className="insight-card">
              <h3>🎯 初始选择的影响</h3>
              <p>
                你最初选错的概率是2/3，而主持人的行为会告诉你另一扇错误的门是哪扇。
                因此换到第三扇门有2/3的概率是对的。
              </p>
            </div>
            <div className="insight-card">
              <h3>📊 验证方法</h3>
              <p>
                最好的理解方式是进行大量模拟实验。通过统计学验证，换门策略的获胜率会趋近于66.67%。
              </p>
            </div>
          </div>
        </section>

        <section className="intro-section">
          <h2>历史与影响</h2>
          <p>
            1990年，玛丽莲·沃斯·莎凡特（Marilyn vos Savant）在其专栏中正确回答了这个问题，
            但遭到了包括数学教授在内的大量读者质疑。后来通过计算机模拟和数学证明，
            证实了她的答案是正确的。
          </p>
          <p>
            这个问题展示了人类直觉在处理概率问题时的局限性，成为概率论教学中的经典案例。
          </p>
        </section>

        <section className="intro-section cta-section">
          <h2>亲自验证</h2>
          <p>
            理论说得再多，不如亲自验证。我们提供了一个交互式模拟器，
            让你可以进行成千上万次模拟实验，验证换门策略确实能提高获胜概率。
          </p>
          <p className="cta-text">
            点击顶部导航栏的"三门问题演示"开始体验吧！
          </p>
        </section>
      </div>
    </div>
  );
};
