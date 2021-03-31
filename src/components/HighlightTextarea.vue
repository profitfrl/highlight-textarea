<template>
    <div class="highlight-box">
        <template v-if="type === 'textarea'">
            <div v-if="value"
                class="textarea-outer"
                ref="textareaOuter"
                :style="{'height': `${maxHeight}px`}">
                <div ref="outerInner" class="outer-inner"
                    v-html="highlightHtml(value)">
                </div>
            </div>
            <textarea
                ref="textareaBox"
                :style="{'height': `${maxHeight}px`}"
                :placeholder="placeholder"
                @keyup.enter="syncScrollTop"
                v-model.trim="value">
            </textarea>
        </template>
        <template v-if="type === 'input'">
            <div v-if="value"
                class="input-outer"
                v-html="highlightHtml(value)">
            </div>
            <input type="text"
                :placeholder="placeholder"
                v-model.trim="value" />
        </template>
    </div>
</template>

<script>
export default {
    name: 'HighlightTextarea',
    data() {
        return {
            value: ''
        };
    },
    props: {
        placeholder: {
            type: String,
            required: false,
            default: '请输入'
        },
        text: {
            type: String,
            required: false,
            default: ''
        },
        highlightKey: {
            type: Array,
            require: false,
            default: () => []
        },
        type: {
            type: String,
            required: true,
            default: 'textarea'
        },
        maxHeight: {
            type: Number,
            required: false,
            default: 220
        }
    },
    created() {
        this.value = this.text.replace(/(^\s*)|(\s*$)/g, '').replace(/<br \/>|<br\/>|<br>/g, '\n');
    },
    mounted() {
        this.scrollMousewheel();
    },
    methods: {
        highlightHtml(str) {
            if ((!str || !this.highlightKey || this.highlightKey.length === 0) && this.type !== 'textarea') {
                return str;
            }
            let rebuild = str;
            if (this.highlightKey.filter(item => ~str.indexOf(item)).length) {
                let regStr = '';
                let regExp = null;
                this.highlightKey.forEach(list => {
                    regStr = this.escapeString(list);
                    regExp = new RegExp(regStr, 'g');
                    rebuild = rebuild.replace(regExp, `<span>${list}</span>`);
                });
            }
            if (this.type === 'textarea') {
                rebuild = rebuild.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
                // textarea有滚动条时，div底部不能和textarea重合，故加一个<br/>
                const wrap = this.$refs.textareaBox;
                if (wrap && wrap.scrollHeight > this.maxHeight) {
                    rebuild = rebuild + '<br/>';
                }
            }
            return rebuild;
        },
        syncScrollTop() {
            const wrap = this.$refs.textareaBox;
            const outerWrap = this.$refs.textareaOuter;
            const outerInner = this.$refs.outerInner;
            if (wrap.scrollHeight > this.maxHeight && outerInner.scrollHeight !== wrap.scrollHeight) {
                outerInner.style.height = `${wrap.scrollHeight}px`;
            }
            if (wrap.scrollTop !== outerWrap.scrollTop) {
                outerWrap.scrollTop = wrap.scrollTop;
            }
        },
        scrollMousewheel() {
            if (this.type === 'input') {
                return;
            }
            this.$nextTick(() => {
                this.eventHandler('add');
            });
        },
        // 处理字符串中可能对正则有影响的字符
        escapeString(value) {
            const characterss = ['(', ')', '[', ']', '{', '}', '^', '$', '|', '?', '*', '+', '.'];
            let str = value.replace(new RegExp('\\\\', 'g'), '\\\\');
            characterss.forEach(function (characters) {
                let r = new RegExp('\\' + characters, 'g');
                str = str.replace(r, '\\' + characters);
            });
            return str;
        },
        eventHandler(type) {
            const wrap = this.$refs.textareaBox;
            if (wrap) {
                let mousewheelevt = (/Firefox/i.test(navigator.userAgent))
                                    ? 'DOMMouseScroll' : 'mousewheel';
                wrap[`${type}EventListener`](mousewheelevt, this.syncScrollTop);
                wrap[`${type}EventListener`]('scroll', this.syncScrollTop);
            }
        }
    },
    destroyed() {
        this.eventHandler('remove');
    }
};
</script>

<style lang="less">
@width: 500px;
.highlight-box {
    position: relative;
    display: flex;
    font-size: 12px;
    width: @width;
    position: relative;
    color: #333333;
    background: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .textarea-outer,
    .input-outer {
        width: @width;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        border: 1px solid transparent;
        border-top: 0;
        // 鼠标事件失效 ie6-10不支持
        pointer-events: none;
        cursor: text;
        span {
            color: #F27C49;
        }
        &:hover {
            border-color: #4C84FF;
        }
    }
    .textarea-outer {
        overflow-y: auto;
        line-height: 20px;
        word-break: break-word;
        .outer-inner {
            padding: 4px 8px;
            width: 100%;
            box-sizing: border-box;
        }
    }
    textarea {
        width: @width;
        line-height: 20px;
        resize: none;
    }
    .input-outer,
    input {
        width: @width;
        height: 28px;
        line-height: 28px;
    }
    .input-outer {
        bottom: 0;
        padding: 0 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    textarea,
    input {
        // position: relative;
        // z-index: 2;
        // 光标的颜色
        color: #333333; 
        // 文本颜色 
        text-shadow: 0 0 0 rgba(0, 0, 0, 0);
        -webkit-text-fill-color: transparent;
        background: transparent;
        border-radius: 5px;
        border: 1px solid #E0E0E0;
        padding: 4px 8px;
        box-sizing: border-box;
        &::placeholder {
            -webkit-text-fill-color: #999999;
        }
        &:hover {
            border-color: #4C84FF;
        }
        &:focus {
            border-color: #4C84FF;
            box-shadow: 0 0 0 2px #DBE4FF;
            outline: none;
        }
    }
}
</style>
