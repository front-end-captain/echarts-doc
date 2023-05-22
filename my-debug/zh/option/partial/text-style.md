{{target: partial-text-style}}

{{ use: partial-text-style-base-item(
    prefix = ${prefix},
    name = ${name},
    defaultColor = ${defaultColor},
    defaultPadding = ${defaultPadding},
    defaultFontSize = ${defaultFontSize},
    defaultFontWeight = ${defaultFontWeight},
    defaultLineHeight = ${defaultLineHeight},
    defaultAlign = ${defaultAlign},
    defaultVerticalAlign = ${defaultVerticalAlign},
    noAlign = ${noAlign},
    noVerticalAlign = ${noVerticalAlign},
    noBox = ${noBox},
    enableAutoColor = ${enableAutoColor}
) }}

#${prefix} width(number)

文本显示宽度。

#${prefix} height(number)

文本显示高度。

#${prefix} overflow(string) = 'none'

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

#${prefix} ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

{{ if: !${noRich} }}
#${prefix} rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```ts
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


##${prefix} <style_name>(Object)

{{ use: partial-text-style-base-item(
    prefix = ${prefix} + '##',
    enableAutoColor = ${enableAutoColor}
) }}
{{ /if }}

