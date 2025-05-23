# Java 数据迁移工具 — 使用说明

## 简介

这是一个类似 Laravel 框架中的数据库迁移工具，用于通过 Java 代码管理数据库表结构变更和数据初始化。支持：

* 创建、删除表
* 定义字段（包括 `id`, `string`, `integer`, `text`, `timestamp`，枚举等）
* 设置字段约束（`not null`, `unique`, `default`，包括 `CURRENT_TIMESTAMP`）
* 添加主键、外键
* 数据种子（Seed）支持批量插入数据
* 支持自动扫描所有 Migration 类并顺序执行
* 命令模拟：`migrate`, `migrate:refresh`, `migrate:refresh --seed`

---

## 快速开始

### 1. 引入依赖

确保你的项目中已添加 MySQL 驱动：

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.28</version>
</dependency>
```

### 2. 创建 Migration 类

实现 `Migration` 接口，定义 `up`, `down` 和可选的 `seed` 方法：

```java
public class CreateUsersTable implements Migration {
    public String getName() {
        return "20240516_create_users_table";
    }

    public void up(Connection conn) throws Exception {
        Schema.create("users", table -> {
            table.id("id");
            table.string("username", 50).notNull().unique();
            table.string("password", 255).notNull();
            table.enumeration("type", List.of("ADMIN", "USER", "WORKER")).defaultValue("USER");
            table.timestamp("created_at").defaultCurrentTimestamp();
            table.timestamp("updated_at").defaultCurrentTimestamp();
        }).apply(conn);
    }

    public void down(Connection conn) throws Exception {
        Schema.dropIfExists("users").apply(conn);
    }

    public void seed(Connection conn) throws SQLException {
        DBSeeder.seed("users", conn)
                .rows(
                    Map.of("username", "admin", "password", "admin123", "type", "ADMIN"),
                    Map.of("username", "user1", "password", "user123", "type", "USER")
                ).execute();
    }
}
```

### 3. 运行迁移

示例代码，自动扫描并执行所有 Migration：

```java
try (Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword)) {
    Migrator migrator = new Migrator()
        .autoRegister("com.yourproject.migrations"); // 指定你的迁移包路径

    // 执行迁移
    migrator.migrate(conn);

    // 回滚所有迁移
    // migrator.rollback(conn);

    // 迁移刷新（回滚再执行）
    // migrator.refresh(conn);

    // 迁移刷新并执行种子
    // migrator.refreshAndSeed(conn);
}
```

---

## 主要接口说明

### `Migration`

* `void up(Connection conn)` 创建或修改表结构
* `void down(Connection conn)` 回滚操作，通常是删除表
* `void seed(Connection conn)` （可选）插入初始数据

### `Schema`

用于构建数据库表和字段：

* `Schema.create(String tableName, TableBuilderCallback callback)`
* `Schema.dropIfExists(String tableName)`
* 字段类型方法示例：

  * `table.id(String name)` — 自增主键
  * `table.string(String name, int length)` — VARCHAR
  * `table.text(String name)` — TEXT
  * `table.integer(String name)`
  * `table.enumeration(String name, List<String> values)`
  * `table.timestamp(String name)`
* 字段链式方法：

  * `.notNull()`
  * `.unique()`
  * `.defaultValue(Object val)` 支持数字、字符串、`CURRENT_TIMESTAMP`
  * `.defaultCurrentTimestamp()` 简写

### `DBSeeder`

简化批量插入数据：

```java
DBSeeder.seed("users", conn)
    .rows(
        Map.of("username", "admin", "password", "admin123", "type", "ADMIN"),
        Map.of("username", "user1", "password", "user123", "type", "USER")
    )
    .execute();
```

---

## 命令模拟说明

* `migrate`: 执行所有 Migration 的 `up` 方法
* `rollback`: 执行所有 Migration 的 `down` 方法
* `refresh`: 先执行 `rollback`，再执行 `migrate`
* `refreshAndSeed`: `refresh` 后执行所有 Migration 的 `seed` 方法

---

## 目录结构建议

```
src/
└── main/
    └── java/
        └── com/
            └── yourproject/
                ├── migrations/
                │   ├── CreateUsersTable.java
                │   ├── CreateCategoriesTable.java
                │   └── SeedInitialData.java
                ├── migrator/
                │   ├── Migration.java
                │   ├── Migrator.java
                │   ├── Schema.java
                │   └── DBSeeder.java
                └── Main.java
```

---

## FAQ

**问：如何避免重复插入种子数据？**
答：你可以在 `seed` 中先查询是否已存在数据，或者设计唯一索引来避免。

**问：支持其他数据库吗？**
答：目前以 MySQL 为主，其他数据库需要调整 SQL 生成规则。