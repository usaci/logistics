
<script>
/* ------------------------------------------------------------

仕様：3秒程度で画面が切り替わる
スマートフォンとPCで説明を切り替える
スマートフォンかPCかの判定は、・・・で行う

------------------------------------------------------------ */
    export default {
        data() {
            return {
                title: String,
                msg: String,
                img: String,
                scene: Number,
            }
        },
        props: {
            isOpen: Boolean,
        },
        methods: {
            switchMsg() {
                // 最初の説明
                this.$el.style.opacity = 1;
                this.$el.style.visibility = "visible";
                this.title = "操作説明";
                this.msg = "マウスをドラッグすると、街を動かすことができます。";
                this.img = "";

                // 3秒後非表示にする
                setTimeout(() => {
                    this.$el.style.opacity = 0;
                    this.$el.style.visibility = "hidden";
                }, 3000)

                // 4秒後に次の説明を表示する
                setTimeout(() => {
                    this.$el.style.opacity = 1;
                    this.$el.style.visibility = "visible";
                    this.title = "操作説明";
                    this.msg = "アイコンをクリックすると、住民の話を聞くことができます。";
                    this.img = "";
                }, 4000);

                // 7秒後再び非表示にする
                setTimeout(() => {
                    this.$el.style.opacity = 0;
                    this.$el.style.visibility = "hidden";
                    this.$emit('onCloseControlMsgBox');
                }, 7000)
                
            }
        }, 
        mounted() {
            this.scene = 1;
        }, 
        watch: {
            isOpen(val) {
                val===true ? this.switchMsg(): "";
            }
        }
    }
</script>
<template>
    <div class="msgBox">
        <h2 class="msgBox__title">{{ title }}</h2>
        <div class="msgBox__text" v-html="this.msg"></div>
    </div>
</template>
<style>
    .msgBox {
        width: 30%;
        max-width: 500px;
        position: absolute;
        background: #fff;
        border-radius: 0.5rem;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        padding: 5rem 4rem;
        opacity: 0;
        transition: .4s;
        pointer-events: none;
    }

    .msgBox.isOpen {
        opacity: 1;
        pointer-events: all;
    }

    .msgBox__title {
        font-size: 2.6rem;
        font-weight: bold;
        margin-bottom: 2rem;
        text-align: center;
    }

    .msgBox__text {
        margin-bottom: 2rem;
        text-align: center;
    }

    .msgBox__text p {
        text-align: left;
    }

    .msgBox__personImg {
        margin-bottom: 2rem;
    }

    @media screen and (max-width: 768px){

        .msgBox {
            width: 95%;
        }
        
    }
</style>
