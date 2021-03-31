[demo链接](https://profitfrl.github.io/highlight-textarea/dist/index.html)
## 基本功能描述
> 通过`input`、`textarea`实现可高亮的输入框，主要用来处理文本域、文本框关键词高亮显示

## 实现思路
> div跟textarea、input重叠样式和位置保持完全一致，同时textarea文字跟背景透明，textarea负责输入，div负责高亮显示

## Usage
``` javascript
<highlight-textarea
    placeholder="请输入"
    type="input"
    :text="inputText"
    :highlightKey="highlightKey">
</highlight-textarea>
```
## props

|   名称   |      类型     | 默认值 |  是否必传 |  描述  |
|-------------|:--------------|:-------|:-------|:-------|
| placeholder |  String       | 请输入     |   否    | value为空时的提示信息 |
| type        |  String       | 'textarea'|   是    | 类型  textarea / input|
| text        |  String       | ''     |   否    | 文本信息 |
| highlightKey|  Array        | []     |   否    | 高亮的关键词 ['团队', '组织']|
| maxHeight   |  Number       | 220     |   否    | 文本域的高度|

## Methods
|   名称   |  描述  |
|----------|:-------|
| syncScrollTop | 同步textarea与div的高度和scrollTop的值 |
| scrollMousewheel | 文本域出现滚动条时，滚轮级滚动事件处理 |
| highlightHtml | 文本高亮处理 |
| escapeString | 处理字符串中可能对正则有影响的字符 |

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
