# KFL Migrate Tools 使用说明

## 简介

KFL Migrate Tools 是一个轻量级的 Java 数据库迁移工具，支持基于 Java 代码的迁移脚本管理，自动执行数据库建表、更新、数据初始化等操作。
设计为工具 Jar 形式，方便集成到 Spring Boot 项目，支持通过注解和配置轻松控制迁移行为。

---

## 快速开始

### 1. 添加依赖

```xml
<dependency>
  <groupId>com.kfl</groupId>
  <artifactId>kfl-migrate-tools</artifactId>
  <version>1.0.1</version>
</dependency>
```

### 2. 在 `application.yml` 中添加配置

```yaml
kfl:
  migrate:
    enabled: true             # 是否启用迁移工具，默认true
    auto-migrate: true        # 启动时是否执行 migrate 操作
    auto-seed: true           # 启动时是否执行初始化数据（seed）
    auto-refresh: false       # 是否先清空再重新 migrate + seed（开发环境可用）
    auto-rollback: false      # 是否启动时执行 rollback（危险操作，慎用）
    base-package: com.kfl.migrate.migrations  # 迁移脚本所在包名
```

---

### 3. 启用注解 `@EnableMigrator`

在 Spring Boot 启动类上添加注解，开启自动迁移：

```java
@EnableMigrator(
    migrate = true,
    seed = true,
    refresh = false,
    basePackage = "com.kfl.migrate.migrations"
)
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

该注解会自动根据配置或注解参数在应用启动时执行迁移和数据初始化。

---

### 4. 迁移脚本编写

迁移脚本类需放在配置的 `base-package` 下，示例：

```java
public class CreateUsersTable implements Migration {
    @Override
    public void up(Connection conn) throws Exception {
        Schema.create("users", table -> {
            table.id("id");
            table.string("username", 50).notNull().unique();
            table.string("password", 100).notNull();
            table.timestamps();
        }).apply(conn);
    }

    @Override
    public void down(Connection conn) throws Exception {
        Schema.dropIfExists("users").apply(conn);
    }
}
```

支持常用字段类型及约束，如 `id()`, `string()`, `integer()`, `text()`, `enumeration()`, `timestamps()`, `unique()`, `defaultValue()` 等。

---

### 5. 迁移控制 API

你也可以在代码中手动控制迁移：

```java
@Autowired
private DataSource dataSource;

public void migrateDatabase() throws SQLException {
    try (Connection conn = dataSource.getConnection()) {
        Migrator migrator = new Migrator().autoRegister("com.kfl.migrate.migrations");
        migrator.migrate(conn);
        migrator.seed(conn);
    }
}
```

---

## 常见问题

* **数据库连接异常**
  请确认数据库驱动依赖已加入项目，例如 MySQL 需要添加：

  ```xml
  <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.x</version>
  </dependency>
  ```

* **迁移失败提示表已存在**
  说明迁移记录未正确管理，建议开启自动刷新 `auto-refresh: true` 或手动回滚迁移。

* **如何避免重复执行迁移**
  工具内部通过迁移状态表（`migrations`）管理，已执行的迁移不会重复执行。

---

## 进阶配置

你可以通过在 `application.yml` 中配置控制：

| 配置项                         | 说明                               | 默认值                          |
| --------------------------- | -------------------------------- | ---------------------------- |
| `kfl.migrate.enabled`       | 是否启用迁移工具                        | `true`                       |
| `kfl.migrate.auto-migrate`  | 启动时是否自动执行 migrate                | `true`                       |
| `kfl.migrate.auto-seed`     | 启动时是否自动执行 seed 初始化数据             | `false`                      |
| `kfl.migrate.auto-refresh`  | 启动时是否先清空表再重新 migrate + seed（开发用） | `false`                      |
| `kfl.migrate.auto-rollback` | 启动时是否自动执行 rollback（危险操作）         | `false`                      |
| `kfl.migrate.base-package`  | 迁移脚本扫描包                          | `com.kfl.migrate.migrations` |

---

## 贡献 & 联系

欢迎提交 issue 或 PR！
联系邮箱：[firstsnow1119@163.com](firstsnow1119@163.com)
