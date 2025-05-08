# aily-blockly-examples
示例程序合集

## aily blockly示例程序集编写规范

### 程序集结构
一个程序集中包含多个示例程序  
```
subject_name               // 程序集目录
 |- subject.png            // 封面图片
 |- package.json           // npm包管理文件
 |- example1               // 示例程序1文件夹
    |- package.json
    |- project.abi
 |- example2               // 示例程序2文件夹
    |- package.json
    |- project.abi
 |- example3               // 示例程序3文件夹
    |- package.json
    |- project.abi
```

### 索引文件
索引文件结构
```json
[
    {
        "name":"@aily-project/example-arduino-book",  // 程序集package.json中的name
        "nickname": "Arduino开发入门",                 // 程序集package.json中的nickname，如果没有则使用name
        "description": "针对Arduino初学者的基础教程，包含Arduino IDE安装配置、基本电路连接、常用组件介绍（LED、按钮、传感器等）、基础编程语法、简单项目实践。适合零基础学习者快速掌握Arduino开发环境和基本技能。",  // 程序集package.json中的description
        "author":"奈何col",                                    // 程序集package.json中的author
        "url":"https://arduino.me/s/arduino-getting-started", // 程序集package.json中的url
        "img":"subject.png",                                  // 程序集package.json中的img
        "examples":[
            {
                "nickname": "LED闪烁（Blink）", // 项目package.json中的nickname，如果没有则使用name
                "description": "学习如何控制一个LED灯的开关，这是Arduino的第一个入门项目。", // 项目package.json中的description
                "path": "blink",  // 项目路径,
                "url":"https://arduino.me/s/arduino-getting-started?aid=318", // 项目package.json中的url
            },
            {
                "nickname": "按钮控制LED",
                "description": "使用按钮控制LED的开关状态，学习数字输入的基础操作。",
                "path":"led_button"
            },
            {
                "nickname": "PWM调光（AnalogWrite）",
                "description": "通过脉宽调制（PWM）技术调节LED的亮度，理解模拟输出的概念。",
                "path":"led_fade"
            },
            {
                "nickname": "读取模拟输入（AnalogRead）",
                "description": "从光敏电阻或电位器等模拟传感器读取数据，学习模拟输入读取。",
                "path":""
            },
            {
                "nickname": "温度传感器读取",
                "description": "使用温度传感器（如LM35或DHT11）读取环境温度数据。",
                 "path":""
            },
            // 更多示例
        ]
    },
    {
        "name": "Arduino创意项目",
        "description": "展示各种有趣且实用的Arduino创意项目，包括智能家居小装置、互动艺术装置、音乐与灯光控制、可穿戴设备等。每个项目提供详细的材料清单、电路图、代码和组装步骤，激发学习者创造力。",
        "author":"奈何col",
        "examples":[]
    },
    {
        "name": "Arduino机器人开发",
        "description": "专注于使用Arduino进行机器人设计与开发，涵盖电机控制、舵机应用、传感器集成、运动规划、简易AI算法实现等内容。包含多个渐进式机器人项目，如循线小车、避障机器人、机械臂等。",
        "author":"奈何col",
        "examples":[]
    },
    {
        "name": "Arduino物联网开发",
        "description": "探索Arduino在物联网领域的应用，内容包括WiFi/蓝牙模块使用、云平台连接、远程数据监控、手机App交互、MQTT协议应用等。通过实际项目讲解如何将Arduino设备接入互联网并实现智能控制与数据分析。",
        "author":"奈何col",
        "examples":[]
    }
    // 更多程序集
]
```

## 生成索引文件
运行以下命令即可生成索引文件
```
node genjson.js
```