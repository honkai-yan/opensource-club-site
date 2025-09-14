---
title: PlatformIO 配置使用 Clangd，替换 C/C++ Extension
shortTitle: PlatformIO 配置使用 Clangd

isOriginal: true
date: 2025-08-30
author: Da Capo

category:
  - 技术笔记
tag:
  - Git
  - 嵌入式
  - C/C++
  - PlatformIO
---

PlatformIO 是**一个开源的物联网（IoT）和嵌入式开发生态系统**，提供了一个统一的、跨平台的开发环境和工具链，支持多种硬件平台、开发框架和集成开发环境（IDE），如 VS Code,，并集成了强大的库管理器、构建系统和调试功能。

然而使用 VSCode + PlatformIO 进行开发时，PlatformIO 默认只使用 C/C++ Extension 来提供代码补全、跳转、语义分析等能力，但 C/C++ Extension 仅适合中小型项目（低情商：其实就是一坨 💩），跳转和分析能力也不如 Clangd。因此本文记录了让 PlatformIO 使用开源社区的 Clangd 来替代 C/C++ Extension 的方法。

## 插件安装

首先打开 VSCode ，在扩展商城里搜索并安装 PlatformIO ，PlatformIO 会自动下载和配置需要的环境。

如果遇到网络问题，可以开启猫猫的增强模式（ TUN 模式）。如果你的猫猫不支持增强模式，则需要手动配置 http_proxy 和 https_proxy ，并确保 VSCode 插件使用与 VSCode 相同的代理。参考：[Visual Studio Code 中设置代理服务器的方法](https://www.aahgo.com/post/328.html)。

接下来在扩展商城里安装 Clangd 插件，无需额外配置。

## 禁用 C/C++ Extension，只使用 Clangd

这里的禁用不是指完全禁用 C/C++ Extension 插件，因为 PlatformIO 依赖这个插件才能工作，如果它被禁用，则 PlatformIO 也会被禁用（很抽象）。

所以我们选择在 C/C++ Extension 设置里将 intelliSense 关掉：在 VScode 设置里搜索 “c/c++ intelli sense engine” ，找到 “**C_Cpp: Intelli Sense Engine**” 设置，将其设置为 “disabled”。这样一来，这个插件就失去代码补全、跳转和语义分析的功能了。

接下来随便打开一个 PlatformIO 项目，在 platform.ini 文件里添加如下编译选项：

```
build_flags =
  -Iinclude
  -Ilib
  -Isrc
```

添加好编译选项后，重新构建一次项目，然后在终端运行命令：`pio run -t compiledb` 生成编译数据库（ compile_commands.json 文件）。

然后在 .vscode 目录下创建 settings.json 文件，设置 Clangd 搜索编译数据库的路径和使用的编译链：

```json
{
  "clangd.arguments": [
    "--compile-commands-dir=${你的compile_commands.json文件路径}",
    "--query-driver=${你的编译器路径，可以在compile_commands.json中找到}"
  ]
}
```

配置好后，使用快捷键 Ctrl + Shift + P 打开命令面板，输入 clangd ，选择 “Restart Language Server” 重启 Clangd 插件，就能享受更快更强的代码提示和跳转了。

## 注意事项

- Clangd 可能会报诸如 ”Unknown Argument: ‘xxxxxx’“ 的错误，这是因为嵌入式开发中使用的编译链以 gcc 居多，PlatformIO 添加的编译参数通常是 gcc 扩展参数， clangd 对它们的支持不一定完善。此时需要在项目根目录创建一个 .clangd 文件，配置 Clangd 忽略对应的参数：

```yaml
CompileFlags:
  Remove:
    - 参数名(前面带-号)
    - -fstrict-volatile-bitfields # 示例
```

- 只要安装了 PlatformIO 插件，`pio` 命令就会被安装在电脑上，如果找不到 `pio` 命令，需要将 PlatformIO 环境添加到环境变量中。
- 每添加一个新的源文件（ .c 、.cpp 等），都需要重新运行 `pio run -t compiledb` ，确保编译数据库是最新的（除非新文件只引用已有的头文件）。如果嫌麻烦可以写成 shell 脚本，或者用 npm 简化命令：

```json
{
  "name": "my-platformio-project",
  "version": "1.0.0",
  "scripts": {
    "cdb": "pio run -t compiledb"
  }
}
```

- Q：为什么愿意折腾 Clangd，而不是想办法优化 C/C++ Extension ？
  A：因为 C/C++ Extension 真的太 shit 了……
