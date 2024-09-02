---
title: 日常笔记 01
shortTitle: 日常笔记 01
isOriginal: true
date: 2024-09-02
order: -1
author: Da Capo
category:
  - 技术#日常笔记
---

## React - 使用自定义 Hook 复用逻辑

---

## Node 找不到模块

一个小型服务器，使用 `mvc` 模式，以下是 `controller.js` 的导出代码：

```js
// controller.js
export const useController = {
	// ......
}
```

而在 `main.js` 中使用 `import` 语句导入 `controller` 模块后，运行时提示找不到模块。

```js
// main.js
import { useController } from '....../controller';
// ......
```

```bash
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '......\controller' imported from ......\main.js
```

已经确认确保导入的路径正确，模块名称也正确。为什么会报错呢？

**错误原因： 上述代码在导入模块时没有携带后缀名。**

### 当模块拥有路径也拥有后缀时

`node` 会直接根据模块路径进行查找，直接引入对应文件。

### 当模块名有路径，但没有后缀名时

- 如果后缀名省略，先找同名 `js` 文件。
- 如果没有找到同名 `js` 文件，则寻找同名文件夹。
- 如果找到同名文件夹，则寻找文件夹中的 `index.js` 。
- 如果文件夹中没有 `index.js` ，则会去文件夹下的 `package,json` 中 `main` 选项定义的入口文件执行。
- 如果指定的入口文件不存在，或者 `package.json` 文件不存在，则报错，没有找到模块。

### 当模块没有路径，也没有后缀时（只有名字）

- `node` 在寻找模块时，会先假设模块是系统模块，并进行查找。
- 如果没有找到，则认为是第三方模块，到 `node_modules` 里去寻找。若当前目录没有 `node_modules` 文件夹，则会到父目录去寻找，直到找到全局的 `node_modules` 目录。
- 在 `node_modules` 里查找是否有同名的 `js` 文件。
- 如果没有，在 `node_moduels` 里寻找是否有同名的文件夹。
- 如果有，在文件夹里寻找 `index.js` 文件，如果没有，则寻找 `package.json` 文件的 `main` 选择指定的入口文件。
- 没有找到该文件或没有 `package.json` ，报错。

---

## 小程序 tab bar 图标过大

可以在导出前将图标缩小一定比例，并使用一个矩形包裹成一个组，如此图标与矩形之间会留出一些间隙。最后以 `webp` 或 `png` 格式导出即可。

---

## Git 各种字母提示的含义

- A： 本地新增的文件（远程仓库还没有）。 `Added`
- C：文件的一个新的拷贝。 `Copied`
- D：在本地删除的文件（在远程仓库还存在）。 `Deleted`
- M：文件的内容或者 `mode` 被修改了。通常指已使用 `add` 添加到暂存区，正在等待提交的文件。 `Modified`
- R： 文件名被修改了。 `Renamed`
- T： 文件的类型被修改了。 `Typed`
- U： 文件尚未被合并（需要完成合并才能提交），即尚未添加到暂存区。 `Unmerged`
- X： 未知状态（也可能是 `git` 的bug）。 `X`

---

## Git 提交时漏掉了文件怎么办

在执行 `git push` 推送到远程仓库之前，可以使用 `git add` 将要补充的文件添加到暂存区，然后使用 `git commit --amend` 命令， `git` 会自动将暂存区的文件补充到上一次提交历史中。

---

## Git 取消上一次提交但保留更改

```bash
git reset --soft HEAD^
```

---

## GIt merge 提示填写 commit 是为什么？

通常情况下，使用 `git commit` 命令需要加上 `-m` 参数，填写 commit 信息，代表本次更改所进行的操作。但有时进行 `git merge` 操作时， `git` 也会提示填写 commit 信息。

引用知乎某答案：

> 分支派生关系导致的，
>
> 举个例子。
>
> 我从 dev 分支创建了一个 yyf 分支，
>
> 然后我在 yyf 分支里 pull 或者 merge dev 分支
>
> 这时候就会出现这个提示。
>
> 因为 yyf 分支是从 dev 分支创建的，然后你现在却要把 dev 分支合并到 yyf 中去。这种操作就比较奇怪，git就会提示你是不是真的要合并，并且希望你写出合并的原因。
>
> 更形象点的例子。
>
> 你从 master 分支创建了 dev 分支，然后当你要把 master 分支合并到 dev 中去时，就会出现提示。

> 注：知乎答案表明，将主分支合并到子分支可能会出现这样的情况，而本人的情况是将子分支合并到主分支时， `git` 提示填写 commit 信息。存疑。

---