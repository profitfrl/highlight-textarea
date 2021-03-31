<template>
    <div class="wrap">
        <highlight-textarea
            placeholder="请输入"
            :text="inputText"
            type="input"
            :highlightKey="highlightKey">
        </highlight-textarea>
        <highlight-textarea
            placeholder="请输入"
            :text="text"
            type="textarea"
            :maxHeight="168"
            :highlightKey="highlightKey">
        </highlight-textarea>
    </div>
</template>

<script>
import HighlightTextarea from 'components/HighlightTextarea';
export default {
    data() {
        return {
            highlightKey: ['组织', '团队'],
            inputText: '团队啊组织啊安达市多挨打的所多',
            text: 'HI，大家好<br />   巴拉巴拉团队布置了啊啊啊啊啊啊多大点事多所多撒大声地所多组织撒大声地所多<br />啊大大啊大大安达市多阿达团队大大大安达市<br />今天天气还不错，空气也很好。组织大家一起出来游玩<br />所得到的多多多是的敖德萨所多敖德萨所大所撒大声地奥术大师大所安达市多安达市多<br />    安达市大大所大啊大大所啊大大所啊大大所啊大大所安达市多安达市多啊大大阿达啊大大安达市多安达市啊大大啊大大<br />在某某团队某某组织的带领下，阿达大多安达市多安达市多安达市安达市多奥术大师多敖德萨所大多所敖德萨所多奥术大师多安达市安达市<br />'
        };
    },
    components: {
        HighlightTextarea
    }
};
</script>

<style lang="less">
.wrap {
    width: 500px;
    margin: 50px auto;
}
.highlight-box {
    margin-top: 10px;
}
</style>
