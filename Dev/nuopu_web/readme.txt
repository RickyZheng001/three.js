大致流程：
1. 模型配置文件在 config 文件夹下
2. UI根据 config/config.json 自动生成界面
3. 点击更新模型，会把 config.json 提交给服务器
4. 服务器生成模型后会把模型的信息json发送给客户端
5. 客户端根据json中的url分别下载模型

对config要求，每个刀具提供一个config动态生成ui
对exe要求，命令行参数   C:\\UG 8.0\\***.ext C:\\config.json [name] 根据name生成 name_xx1.stl name_xx2.stl name_xx3.stl name_xx.pdf
