# 云开发 cms 和微信小程序开发的博客
前端使用的是小程序，后端使用云开发 cms 提供的API，做的小程序，有文章列表、详情、记录、我的页面。

### 技术使用：

#### 云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

#### 拓展插件
- [CloudBase CMS](https://github.com/TencentCloudBase/cloudbase-extension-cms) 是云开发推出的，基于 Node.js 的 Headless 内容管理平台，提供了丰富的内容管理功能，安装简单，易于二次开发，并与云开发的生态体系紧密结合，助力开发者提升开发效率。
- [Towxml](https://github.com/sbfkcel/towxml) 是一个可将HTML、Markdown转为微信小程序WXML(WeiXin Markup Language)的渲染库。用于解决在微信小程序中Markdown、HTML不能直接渲染的问题。

#### 效果图
![效果图](https://687a-hzpc-1258873690.tcb.qcloud.la/cloudbase-cms/upload/2020-11-23/l6slqrsvm5ozdaxgrr4pjsss7ha94zwr-%E6%95%88%E6%9E%9C%E5%9B%BE.png)

### 部署
1、注册小程序账号，开通云开发

2、安装拓展插件，CloudBase CMS

3、导入模型 db.json ，开启 API 访问

4、可以启动调试看看效果

5、上传部署

### 参考文档

- [云开发文档](https://docs.cloudbase.net/)
- [Towxml文档](https://github.com/sbfkcel/towxml/wiki)
- [Omi](https://github.com/Tencent/omi)
- [Parser富文本插件](https://github.com/jin-yufeng/Parser)