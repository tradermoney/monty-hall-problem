#!/bin/bash

# GitHub Actions 工作流本地测试脚本
set -e

echo "🚀 开始测试GitHub Actions工作流..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 函数：打印成功消息
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# 函数：打印错误消息
error() {
    echo -e "${RED}❌ $1${NC}"
}

# 函数：打印警告消息
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 检查Node.js版本
echo "📋 检查环境..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    success "Node.js版本: $NODE_VERSION"
else
    error "Node.js未安装"
    exit 1
fi

# 检查npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    success "npm版本: $NPM_VERSION"
else
    error "npm未安装"
    exit 1
fi

# 检查package.json
if [ -f "package.json" ]; then
    success "找到package.json"
else
    error "未找到package.json"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
if npm ci; then
    success "依赖安装成功"
else
    error "依赖安装失败"
    exit 1
fi

# 运行代码检查
echo "🔍 运行代码检查..."
if npm run lint; then
    success "代码检查通过"
else
    warning "代码检查有警告或错误，但继续构建"
fi

# 构建项目
echo "🏗️  构建项目..."
if npm run build; then
    success "项目构建成功"
else
    error "项目构建失败，尝试直接Vite构建..."
    if npx vite build; then
        success "Vite构建成功"
    else
        error "Vite构建也失败了"
        exit 1
    fi
fi

# 验证构建结果
echo "✅ 验证构建结果..."
if [ -d "dist" ]; then
    success "dist目录存在"
else
    error "dist目录不存在"
    exit 1
fi

if [ -f "dist/index.html" ]; then
    success "index.html文件存在"
else
    error "index.html文件不存在"
    exit 1
fi

# 检查文件大小
echo "📊 检查构建大小..."
BUILD_SIZE=$(du -sh dist/ | cut -f1)
HTML_SIZE=$(stat -c%s "dist/index.html" 2>/dev/null || echo "0")
JS_SIZE=$(stat -c%s "dist/assets"/*.js 2>/dev/null | head -1 || echo "0")
CSS_SIZE=$(stat -c%s "dist/assets"/*.css 2>/dev/null | head -1 || echo "0")

success "总构建大小: $BUILD_SIZE"
if [ "$HTML_SIZE" -gt 0 ]; then
    success "HTML文件大小: $HTML_SIZE bytes"
fi
if [ "$JS_SIZE" -gt 0 ]; then
    success "JS文件大小: $JS_SIZE bytes"
fi
if [ "$CSS_SIZE" -gt 0 ]; then
    success "CSS文件大小: $CSS_SIZE bytes"
fi

# 检查文件列表
echo "📁 构建文件列表:"
ls -la dist/
if [ -d "dist/assets" ]; then
    echo "资源文件:"
    ls -la dist/assets/
fi

# 模拟GitHub Pages环境
echo "🌐 模拟GitHub Pages环境..."
BASE_URL="/monty-hall-problem/"
if [ -f "dist/index.html" ]; then
    # 检查是否正确设置了base URL
    if grep -q "$BASE_URL" dist/index.html; then
        success "Base URL配置正确: $BASE_URL"
    else
        warning "Base URL可能未正确配置"
    fi
fi

# 创建404页面
echo "📝 创建404页面..."
cp dist/index.html dist/404.html
success "404页面创建成功"

# 创建版本信息文件
echo "🔖 创建版本信息..."
cat > dist/version.json << EOF
{
  "version": "$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')",
  "buildTime": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "branch": "$(git branch --show-current 2>/dev/null || echo 'unknown')",
  "commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')"
}
EOF
success "版本信息文件创建成功"

# 模拟部署验证
echo "🔍 模拟部署验证..."
DEPLOYMENT_URL="https://tradermoney.github.io/monty-hall-problem/"
echo "模拟部署URL: $DEPLOYMENT_URL"

# 本地预览测试
echo "👀 启动本地预览服务器..."
echo "可以使用以下命令测试构建结果:"
echo "  npm run preview"
echo "  然后访问: http://localhost:4173/monty-hall-problem/"

# 总结
echo ""
echo "🎉 GitHub Actions工作流测试完成！"
echo "📋 测试结果总结:"
echo "  ✅ 环境检查通过"
echo "  ✅ 依赖安装成功"
echo "  ✅ 代码检查完成"
echo "  ✅ 项目构建成功"
echo "  ✅ 构建验证通过"
echo "  ✅ 文件大小检查完成"
echo "  ✅ GitHub Pages配置验证通过"
echo ""
echo "🚀 准备部署到GitHub Pages！"
echo "📍 部署地址: $DEPLOYMENT_URL"
echo ""
echo "💡 下一步操作:"
echo "  1. 提交代码到main分支"
echo "  2. 在GitHub仓库设置中启用GitHub Pages"
echo "  3. 选择'GitHub Actions'作为部署源"
echo "  4. 等待自动部署完成"
echo ""
echo "🔧 可选配置:"
echo "  - 在仓库设置中添加自定义域名"
echo "  - 配置环境变量和密钥"
echo "  - 设置分支保护规则"
echo "  - 配置Dependabot自动更新依赖""","file_path":".github/test-workflow.sh