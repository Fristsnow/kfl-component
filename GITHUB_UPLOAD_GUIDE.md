<!--
 * @Author: FirstsnowLucky firstsnow1119@163.com
 * @Date: 2025-05-13 11:31:40
 * @LastEditors: FirstsnowLucky firstsnow1119@163.com
 * @LastEditTime: 2025-05-13 11:31:44
 * @FilePath: \kfl-component\GITHUB_UPLOAD_GUIDE.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 将KFL-UI组件库上传到GitHub的步骤

由于在自动化工具中执行Git命令遇到了超时问题，以下是手动将项目上传到GitHub的详细步骤：

## 1. 初始化Git仓库

在项目根目录下打开命令行终端，执行以下命令：

```bash
git init
```

## 2. 添加所有文件到暂存区

```bash
git add .
```

## 3. 提交更改

```bash
git commit -m "初始化KFL-UI组件库"
```

## 4. 在GitHub上创建新仓库

1. 登录GitHub账号
2. 点击右上角的"+"图标，选择"New repository"
3. 填写仓库名称，如"kfl-ui"
4. 添加描述："基于Vue 3的轻量级UI组件库"
5. 选择仓库可见性（公开或私有）
6. 不要勾选"Initialize this repository with a README"
7. 点击"Create repository"

## 5. 关联远程仓库

在GitHub创建仓库后，会显示仓库URL。使用以下命令关联本地仓库与远程仓库（替换YOUR_USERNAME为你的GitHub用户名）：

```bash
git remote add origin https://github.com/YOUR_USERNAME/kfl-ui.git
```

## 6. 推送代码到GitHub

```bash
git push -u origin main
# 如果你的默认分支是master，则使用：
# git push -u origin master
```

## 注意事项

- 确保已经安装了Git并配置了GitHub账号
- 如果是首次使用GitHub，可能需要配置SSH密钥或使用个人访问令牌
- 项目已经包含了适当的.gitignore文件，确保不会上传不必要的文件
- README.md文件已经包含了项目的基本信息，有助于其他开发者了解项目

## 提升终端权限

如果在执行Git命令时遇到权限问题，可能需要提升终端权限：

### Windows系统

1. 右键点击命令提示符(CMD)或PowerShell图标
2. 选择"以管理员身份运行"
3. 在弹出的UAC(用户账户控制)对话框中点击"是"
4. 在提升权限的终端中执行Git命令

### Mac或Linux系统

1. 使用sudo命令提升权限：

```bash
sudo git push -u origin main
```

2. 系统会要求输入管理员密码
3. 输入密码后命令将以管理员权限执行

### 检查Git安装和配置

如果仍然遇到问题，请检查：

```bash
# 检查Git是否正确安装
git --version

# 检查Git配置
git config --list
```

## 后续维护

成功上传后，可以通过以下命令更新仓库：

```bash
# 拉取最新代码
git pull

# 提交新的更改
git add .
git commit -m "更新说明"
git push
```