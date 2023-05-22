{{target: partial-text-style-rich-inherit}}

`rich` 中如果没有设置 `${name}`，则会取父层级的 `${name}`。例如：

```ts
{
    ${name}: ${value},
    rich: {
        a: {
            // 没有设置 `${name}`，则 `${name}` 为 ${value}
        }
    }
}
```
