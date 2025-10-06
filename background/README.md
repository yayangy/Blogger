# Star Blogger 留言板后端

这是Star Blogger项目的后端部分，使用Spring Boot开发，提供留言板功能的API接口。

## 项目结构

```
background/
├── pom.xml                 # Maven项目配置文件
├── src/main/java/com/starblogger/ # Java源代码目录
│   ├── BackgroundApplication.java # Spring Boot主应用程序类
│   ├── controller/         # 控制器层，处理HTTP请求
│   ├── service/            # 服务层，实现业务逻辑
│   ├── repository/         # 数据访问层，操作数据库
│   └── entity/             # 实体类，映射数据库表
├── src/main/resources/     # 资源文件目录
│   └── application.properties # 应用程序配置文件
├── target/                 # 编译输出目录
└── .gitignore              # Git忽略文件配置
```

## 技术栈

- Java 17
- Spring Boot 3.2.4
- Spring Data JPA
- MySQL
- Lombok

## 数据库配置

数据库连接信息已配置在 `src/main/resources/application.properties` 文件中：

```properties
# 数据库配置
spring.datasource.url=jdbc:mysql://localhost:3306/mydb?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false
spring.datasource.username=root
spring.datasource.password=123123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA配置
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

## API接口

### 留言板接口

- **获取所有留言**
  - 请求方式：GET
  - URL：`http://localhost:8080/api/messages`
  - 返回：留言列表（JSON格式）

- **添加新留言**
  - 请求方式：POST
  - URL：`http://localhost:8080/api/messages`
  - 请求体：
    ```json
    {
      "username": "用户名",
      "content": "留言内容"
    }
    ```
  - 返回：创建成功的留言（JSON格式）

- **获取单条留言**
  - 请求方式：GET
  - URL：`http://localhost:8080/api/messages/{id}`
  - 返回：指定ID的留言（JSON格式）

- **删除留言**
  - 请求方式：DELETE
  - URL：`http://localhost:8080/api/messages/{id}`
  - 返回：无内容

## 运行项目

### 前提条件

- 已安装JDK 17或更高版本
- 已安装Maven
- 已安装MySQL，并创建了名为`mydb`的数据库

### 步骤

1. 确保MySQL服务已启动，并且已创建了名为`mydb`的数据库
2. 在项目根目录下运行以下命令编译和运行项目：
   
   ```bash
   mvn spring-boot:run
   ```
   
   或者先编译，再运行：
   
   ```bash
   mvn clean package
   java -jar target/background-1.0.0.jar
   ```

3. 项目启动后，可以通过浏览器或API测试工具（如Postman）访问上述API接口

## 注意事项

1. 项目启动时，Spring Data JPA会根据实体类自动在数据库中创建相应的表
2. 开发环境下，可以使用Spring Boot DevTools实现热部署，提高开发效率
3. 项目已配置CORS，允许前端跨域访问后端API

## 开发说明

- 实体类使用了Lombok注解简化代码，需要在IDE中安装Lombok插件
- 所有代码遵循Spring Boot最佳实践
- 可以根据实际需求扩展功能或修改配置