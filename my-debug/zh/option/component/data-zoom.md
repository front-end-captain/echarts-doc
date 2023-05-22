{{ target: component-data-zoom }}

# dataZoom(Array|Object)

`dataZoom` 组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。


现在支持这几种类型的 `dataZoom` 组件：

+ [内置型数据区域缩放组件（dataZoomInside）](~dataZoom-inside)：内置于坐标系中，使用户可以在坐标系上通过鼠标拖拽、鼠标滚轮、手指滑动（触屏上）来缩放或漫游坐标系。

+ [滑动条型数据区域缩放组件（dataZoomSlider）](~dataZoom-slider)：有单独的滑动条，用户在滑动条上进行缩放或漫游。

+ [框选型数据区域缩放组件（dataZoomSelect）](~toolbox.feature.dataZoom)：提供一个选框进行数据区域缩放。即 [toolbox.feature.dataZoom](~toolbox.feature.dataZoom)，配置项在 `toolbox` 中。

# dataZoom.inside(Object)

**内置型数据区域缩放组件（dataZoomInside）**

（参考[数据区域缩放组件（dataZoom）的介绍](~dataZoom)）

所谓『内置』，即内置在坐标系中。

+ 平移：在坐标系中滑动拖拽进行数据区域平移。
+ 缩放：
    + PC端：鼠标在坐标系范围内滚轮滚动（MAC触控板类同）
    + 移动端：在移动端触屏上，支持两指滑动缩放。

## type(string) = 'inside'

{{ use: partial-component-id(
    prefix = "#"
) }}

## disabled(boolean) = false

<ExampleUIControlBoolean default="true" />

是否停止组件的功能。
