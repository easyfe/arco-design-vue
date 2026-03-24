# @easyfe/arco-design-vue 开发维护指南

> 本项目 fork 自 [arco-design/arco-design-vue](https://github.com/arco-design/arco-design-vue)（已停止维护），由 `@easyfe` 组织继续维护。
> npm 包名：`@easyfe/arco-design-vue`

---

## 一、项目结构

```
arco-design-vue/
├── packages/
│   ├── web-vue/                  # 核心组件库（发布为 @easyfe/arco-design-vue）
│   ├── arco-vue-scripts/         # 构建工具链（build、init、dtsgen、dev:site 等）
│   ├── arco-vue-docs/            # 文档站
│   ├── arco-vue-docs-navbar/     # 文档站导航栏
│   ├── arco-vue-storybook/       # Storybook
│   ├── arco-changelog/           # Changelog 生成工具
│   └── vite-plugin-arco-vue-docs/# Vite 文档插件
├── .github/workflows/
│   └── publish.yml               # 自动发布 workflow
└── docs/
    └── DEVELOPMENT.md            # 本文档
```

### 包名映射关系

| 原始包名 | 新包名 | 说明 |
|---------|--------|------|
| `@arco-design/web-vue` | `@easyfe/arco-design-vue` | 核心组件库 |
| `@arco-design/arco-vue-scripts` | 未改名 | 内部构建工具，不发布 |
| `@arco-design/arco-vue-docs` | 未改名 | 文档站，不发布 |

### 包名别名处理

由于项目内部（文档站、Storybook 等）大量代码引用了旧包名 `@arco-design/web-vue`，全局替换成本太高，因此采用别名方式兼容：

- **pnpm 依赖别名**：`arco-vue-docs/package.json` 中使用 `"@arco-design/web-vue": "workspace:@easyfe/arco-design-vue@*"` 将旧包名映射到新包
- **Vite resolve alias**：`arco-vue-scripts/src/configs/vite.site.dev.ts` 和 `vite.site.prod.ts` 中配置了 `@arco-design/web-vue` → `../web-vue/components` 的别名
- **TypeScript paths**：`arco-vue-docs/tsconfig.json` 中配置了 `@arco-design/web-vue` 和 `@arco-design/web-vue/es/icon` 的路径映射，使 ESLint 的 `import/no-unresolved` 规则能正确解析

---

## 二、环境准备

### 前置要求

- Node.js >= 18
- pnpm 9.5.0（`package.json` 中 `packageManager` 字段已锁定）

### 首次初始化

```bash
# 1. 安装依赖
pnpm install

# 2. 初始化（构建工具链 → 重新安装 → 初始化组件库）
pnpm run init
```

`pnpm run init` 做了三件事：
1. 构建 `arco-changelog`、`vite-plugin-arco-vue-docs`、`arco-vue-scripts` 三个工具包
2. 重新 `pnpm install` 以链接工具包的 bin 命令
3. 执行 `@easyfe/arco-design-vue` 的 `init` 脚本（生成图标组件、组件入口文件等）

---

## 三、本地开发调试

### 方式一：文档站开发模式（推荐）

```bash
pnpm run start
```

启动文档站（Vite dev server），默认端口 `2233`，包含所有组件的 demo 页面，修改组件源码后自动热更新。

### 方式二：构建组件库

```bash
pnpm run build:component
```

完整构建组件库，产出 `es/`、`lib/`、`dist/` 目录。

### 方式三：Storybook

```bash
pnpm run storybook
```

### 其他常用命令

| 命令 | 说明 |
|------|------|
| `pnpm run test` | 运行组件单元测试（Jest） |
| `pnpm run docgen` | 生成组件 API 文档 |
| `pnpm run build:site` | 构建文档站静态资源 |
| `pnpm run clean` | 清理所有包的 `dist/` 和 `node_modules/` |

---

## 四、已修复的问题

### 4.1 Transfer 组件：搜索模式下"全选"选中未搜索项

**文件**：`packages/web-vue/components/transfer/transfer-view.vue`

**问题**：在 Transfer 组件中输入搜索关键词后，点击"全选"会选中所有项目（包括被搜索过滤掉的不可见项），而不是只选中当前搜索结果。

**修复方案**：
- 新增 `filteredValidValues` 计算属性，基于搜索过滤后的数据计算有效（非禁用）项
- 新增 `filteredSelectedCount` 计算属性，统计过滤结果中已选中的数量
- `checked` 和 `indeterminate` 状态基于过滤后的数据计算
- `handleSelectAllChange` 只操作过滤后的有效项，保留其他已选中项不受影响

### 4.2 类型提示丢失（TS2742 / TS4023）

**文件**：
- `packages/arco-vue-scripts/src/scripts/dtsgen/index.ts`
- `packages/web-vue/tsconfig.json`
- `packages/web-vue/components/image/preview-toolbar.vue`

**问题**：pnpm 迁移后，`.d.ts` 文件生成时出现 `TS2742`（类型推断引用了 `.pnpm` 下的非可移植路径）和 `TS4023`（导出了未命名的类型），导致构建后的包缺少类型提示。`dtsgen` 脚本中的空 `catch {}` 还会静默吞掉错误。

**修复方案**：
1. `dtsgen/index.ts`：`catch {}` 改为 `catch (e) { console.error(...) }`，暴露错误
2. `dtsgen/index.ts`：`ts-morph` 的 `compilerOptions` 中添加 `preserveSymlinks: true`
3. `web-vue/tsconfig.json`：添加 `"preserveSymlinks": true`
4. `preview-toolbar.vue`：将 `interface ActionType` 改为 `export interface ActionType`

### 4.3 DatePicker disabledDate 逻辑（上游修复，保留）

**提交**：`46301476`

上游修复了一个 bug：在 `month/quarter/year` 模式下，`disabledDate` 原来只对单元格代表的第一天调用一次，导致整个月/季/年的禁用判断不准确。修复后改为遍历范围内所有天，只有全部天都被禁用才禁用该单元格。

此修改是合理的 bug 修复，已保留。注意事项：
- `disabledDate` 回调函数不应包含网络请求或重计算逻辑
- year 模式下会遍历 365 天调用 `disabledDate`

### 4.4 Modal.confirm onBeforeOk 异常处理（上游已回滚）

**提交**：`04fd194b`（引入问题） → `110554f0`（回滚修复）

上游曾在 `onBeforeOk` 的 catch 块中添加 `throw error`，导致 Promise 永远无法 resolve，按钮一直处于 loading 状态。该问题已被后续提交回滚，当前代码无此问题。

---

## 五、发布流程

### 自动发布（推荐）

通过 Git tag 触发 GitHub Actions 自动构建并发布到 npm。

```bash
# 1. 确保代码已提交并推送到 main
git add . && git commit -m "fix: ..." && git push

# 2. 打 tag 并推送
git tag v2.58.1
git push origin v2.58.1
```

GitHub Actions（`.github/workflows/publish.yml`）会自动：
1. 安装依赖并构建工具链
2. 初始化并构建组件库
3. 从 tag 名提取版本号写入 `package.json`
4. 使用 `pnpm publish` 发布到 npm

### 前置配置

在 GitHub 仓库的 **Settings → Secrets and variables → Actions** 中添加：

| Secret 名称 | 说明 |
|-------------|------|
| `EASYFE_NPM_TOKEN` | npm access token，需要有 `@easyfe` 组织的发布权限 |

### 文档站部署（GitHub Pages）

文档站会在以下情况自动部署到 GitHub Pages：
- 推送到 `main` 分支
- 推送 `v*` 标签
- 手动触发（workflow_dispatch）

部署后访问地址：`https://easyfe.github.io/arco-design-vue/`

GitHub Actions（`.github/workflows/deploy-docs.yml`）会自动：
1. 安装依赖并构建工具链
2. 初始化组件库（生成图标、入口文件）
3. 构建文档站（`pnpm run build:site`），通过 `AssetsPublicPath` 环境变量设置 base 为 `/arco-design-vue/`
4. 使用 `peaceiris/actions-gh-pages@v3` 将产物推送到 `gh-pages` 分支

**首次启用需要**：在 GitHub 仓库 **Settings → Pages** 中将 Source 设置为 `Deploy from a branch`，分支选择 `gh-pages`，目录选择 `/ (root)`。

### 手动发布

```bash
# 构建
pnpm run init
pnpm run build:component

# 修改版本号
cd packages/web-vue
node -e "const pkg=require('./package.json');pkg.version='2.58.1';require('fs').writeFileSync('package.json',JSON.stringify(pkg,null,2)+'\n')"

# 发布
pnpm publish --access public --no-git-checks
```

> **注意**：必须使用 `pnpm publish` 而非 `npm publish`，因为 `package.json` 中的 `workspace:*` 依赖只有 pnpm 能在发布时自动替换为实际版本号。

---

## 六、修改组件的工作流

### 修改现有组件

1. 启动文档站：`pnpm run start`
2. 在浏览器中找到对应组件的 demo 页面
3. 修改 `packages/web-vue/components/<组件名>/` 下的源码
4. Vite HMR 自动刷新，实时查看效果
5. 运行测试：`pnpm run test`

### 组件源码目录结构

```
packages/web-vue/components/<组件名>/
├── <组件名>.vue          # 主组件
├── index.ts              # 导出入口
├── style/                # 样式（Less）
├── __test__/             # 单元测试
├── __demo__/             # 文档站 demo
├── README.zh-CN.md       # 中文 API 文档
└── README.en-US.md       # 英文 API 文档
```

### 修改构建工具链

如果需要修改 `arco-vue-scripts`（如 Vite 配置、dtsgen 逻辑等）：

```bash
# 1. 修改 packages/arco-vue-scripts/src/ 下的源码
# 2. 重新构建工具链
pnpm -F @arco-design/arco-vue-scripts run build
# 3. 重启 dev server 或重新构建组件库
```

---

## 七、注意事项

### 包名兼容

- 项目内部代码（文档站、storybook、工具脚本）中仍大量使用 `@arco-design/web-vue`，这是通过别名机制兼容的，**不要**尝试全局替换
- 只有 `packages/web-vue/package.json` 中的 `name` 字段是实际发布的包名 `@easyfe/arco-design-vue`
- 根 `package.json` 中的 pnpm filter 使用 `@easyfe/arco-design-vue`

### 构建工具链是编译后使用的

`arco-vue-scripts` 的源码在 `src/` 下（TypeScript），实际运行的是 `lib/` 下编译后的 JS。修改源码后必须执行 `pnpm -F @arco-design/arco-vue-scripts run build` 才能生效。

### dtsgen 错误排查

如果构建后发现类型提示有问题，可以单独运行 dtsgen 查看错误：

```bash
cd packages/web-vue
npx arco-vue-scripts dtsgen
```

错误会输出到控制台（之前的空 catch 已修复为带日志输出）。

### pnpm 版本锁定

项目使用 `pnpm@9.5.0`，通过 `package.json` 的 `packageManager` 字段锁定。使用其他版本可能导致 lockfile 不兼容。

---

## 八、关键文件索引

| 文件 | 说明 |
|------|------|
| `package.json` | 根 monorepo 配置，定义全局脚本 |
| `packages/web-vue/package.json` | 组件库配置，包名 `@easyfe/arco-design-vue` |
| `packages/web-vue/components/` | 所有组件源码 |
| `packages/web-vue/tsconfig.json` | 组件库 TS 配置（含 `preserveSymlinks`） |
| `packages/arco-vue-scripts/src/configs/vite.site.dev.ts` | 文档站 Vite dev 配置（含别名） |
| `packages/arco-vue-scripts/src/configs/vite.site.prod.ts` | 文档站 Vite prod 配置（含别名） |
| `packages/arco-vue-scripts/src/scripts/dtsgen/index.ts` | .d.ts 生成脚本 |
| `packages/arco-vue-docs/package.json` | 文档站依赖（含 pnpm 别名） |
| `packages/arco-vue-docs/tsconfig.json` | 文档站 TS 配置（含路径映射） |
| `.github/workflows/publish.yml` | npm 自动发布 workflow |
| `.github/workflows/deploy-docs.yml` | 文档站 GitHub Pages 部署 workflow |
