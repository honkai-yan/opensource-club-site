---
title: Nestjs 跨平台环境变量设置
shortTitle: Nestjs 跨平台环境变量设置

isOriginal: true
date: 2025-06-22
author: Da Capo

category:
  - 技术笔记
tag:
  - Git
  - Node
  - Typescript
  - Nestjs
---

## 通过环境变量控制开发模式

使用 Nestjs 开发后端时，需要通过环境变量来控制项目的开发模式（development、production…），从而控制项目加载的环境变量文件。

Nestjs 底层使用 `dotenv` 来管理环境变量，而我们通过在根模块中添加配置来完成环境变量文件的自动加载。

为了实现上述需求，我们在 package.json 的启动命令中添加环境变量 `NODE_ENV=development` ，并在 `AppModule` 中读取。

```json
// package.json
"scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    // 设置初始状态为 development
    "start:dev": "NODE_ENV=development nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
```

在启动脚本中初始化：

```ts
// main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import cookieParser from "cookie-parser";

// 读取 package.json 里定义的环境变量，默认为 production
process.env.NODE_ENV = process.env.NODE_ENV || "production";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

在 `AppModule` 里添加配置：

```jsx
// app.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      // 根据 package.json 里的配置来动态读取环境变量文件，默认读取 .env 文件
      // 示例： if process.env.NODE_ENV === development then, 读取 .env.development 文件
      envFilePath: [`.env.${process.env.NODE_ENV}`, ".env"],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## 跨平台设置环境变量

如果在 Windows 平台开发，则 `package.json` 里设置 `NODE_ENV` 变量的语法会报错，可以通过 `cross-env` 库来进行兼容：

```bash
pnpm install cross-env --save
```

此时的 `package.json` ：

```json
"scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    // 在环境变量前添加 cross-env 即可
    "start:dev": "cross-env NODE_ENV=development nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
```
