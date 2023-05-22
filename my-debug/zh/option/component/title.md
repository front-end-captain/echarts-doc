{{ target: component-title }}

# title(Object)

标题组件，包含主标题和副标题。

在 ECharts 2.x 中单个 ECharts 实例最多只能拥有一个标题组件。但是在 ECharts 3 中可以存在任意多个标题
组件，这在需要标题进行排版，或者单个实例中的多个图表都需要标题时会比较有用。

**例如下面不同缓动函数效果的示例，每一个缓动效果图都带有一个标题组件：**
~[700x400](${galleryViewPath}line-easing&edit=1&reset=1)

<ExampleBaseOption name="title-only" title="只有标题的实例" title-en="Title">
const option = {
    title: {
        text: 'Main Title',
        subtext: 'Sub Title',
        left: 'center',
        top: 'center',
        textStyle: {
            fontSize: 30
        },
        subtextStyle: {
            fontSize: 20
        }
    }
}
</ExampleBaseOption>



{{ use: partial-component-id(
    prefix = "#"
) }}

## show(boolean) = true

是否显示标题组件。

## text(string) = ''

主标题文本，支持使用 `\n` 换行。

## link(string) = ''

主标题文本超链接。

## target(string) = 'blank'

指定窗口打开主标题超链接。

**可选：**

- `'self'` 当前窗口打开

- `'blank'` 新窗口打开

{{ use: partial-z-zlevel(
    prefix = "#",
    defaultZLevel = 10,
    defaultZ = 10
) }}

## textStyle(Object)

{{ use: partial-text-style(
    prefix = "##",
    name = "主标题",
    defaultFontSize = 18,
    defaultFontWeight = "'bolder'",
    defaultColor = "'#333'",
    noAlign = true,
    noVerticalAlign = true,
    noBox = true
) }}