{{ target: option }}

{{ use: component-title() }}
{{ use: component-data-zoom() }}

# darkMode(boolean)

是否是暗黑模式，默认会根据背景色 [backgroundColor](~backgroundColor) 的亮度自动设置。
如果是设置了容器的背景色而无法判断到，就可以使用该配置手动指定，echarts 会根据是否是暗黑模式调整文本等的颜色。

该配置通常会被用于主题中。
