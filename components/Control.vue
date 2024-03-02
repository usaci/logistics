
<script>
/* ------------------------------------------------------------

仕様：3秒程度で画面が切り替わる
スマートフォンとPCで説明を切り替える
スマートフォンかPCかの判定は、・・・で行う

------------------------------------------------------------ */
    import { gsap } from "gsap";
    export default {
        data() {
            return {
                title: String,
                msg: String,
                imgUrl: String,
                scene: Number,
            }
        },
        props: {
            isOpen: Boolean,
            isTouchDevice: Boolean,
        },
        methods: {
            switchMsg() {
                // 最初の説明
                // spの場合
                this.$el.style.opacity = 1;
                this.$el.style.visibility = "visible";
                this.title = "操作説明";
                let icon;

                if(this.$props.isTouchDevice === true ) {
                    // SPの場合
                    this.msg = "画面をスワイプすると、街を動かすことができます。";
                    this.imgUrl = "icons/finger.png";
                    icon = this.$el.children[1];
                }else {
                    // PCの場合
                    this.msg = "左ボタンをクリックしながらマウスを動かすと、街を動かすことができます。";
                    this.imgUrl = "icons/mouse.png";
                    icon = this.$el.children[1];
                    const clicked = document.createElement('img');
                    clicked.src = "icons/mouse_clicked.png";
                    clicked.classList.add("controlBox__icon");
                    clicked.style.position = "absolute";
                    clicked.style.top = "0";
                    clicked.style.left = "calc(50% - 6px)";
                    clicked.style.transform = "translate(-50%, 0%)";
                    gsap.to(clicked, {
                        opacity: 0.2,
                        duration: 1,
                        repeat: 6,
                    })
                    icon.appendChild(clicked);
                }

                // SP, PC共通
                gsap.fromTo(icon, {
                    x: -10,
                }, {
                    duration: 1,
                    x: 10,
                    repeat: 3,
                });

                // 3秒後非表示にする
                setTimeout(() => {
                    this.$el.style.opacity = 0;
                    this.$el.style.visibility = "hidden";
                    icon.removeChild(icon.children[1]);
                }, 3000)

                // 4秒後に次の説明を表示する
                setTimeout(() => {
                    this.$el.style.opacity = 1;
                    this.$el.style.visibility = "visible";
                    if(this.$props.isTouchDevice === true ) {
                        // SPの場合
                        this.msg = "画面をピンチイン、ピンチアウトすると、街を拡大・縮小できます。";
                        this.imgUrl = "icons/finger_pinch.png";
                        icon = this.$el.children[1];
                    }else {
                        // PCの場合
                        this.msg = "マウスホイールを上下すると、街を拡大・縮小できます。";
                        this.imgUrl = "icons/mouse.png";
                        icon = this.$el.children[1];
                        // 新しいアイコンを追加する
                        const wheel = document.createElement('img');
                        wheel.src = "icons/mouse_wheel.png";
                        wheel.classList.add("controlBox__icon");
                        wheel.style.position = "absolute";
                        wheel.style.top = "0";
                        wheel.style.left = "calc(50% - 6px)";
                        wheel.style.transform = "translate(-50%, 0%)";
                        gsap.to(wheel, {
                            y: 10,
                            duration: .5,
                            repeat: 6,
                        })
                        icon.appendChild(wheel);
                    }
                }, 4000);

                // 7秒後再び非表示にする
                setTimeout(() => {
                    this.$el.style.opacity = 0;
                    this.$el.style.visibility = "hidden";
                    this.$emit('onCloseControlMsgBox', false);
                    // 一旦DOMに追加したデータを削除する
                    if(this.$props.isTouchDevice === false) {
                        icon.removeChild(icon.children[1]);
                    }
                }, 7000)
                
            }
        }, 
        mounted() {
            this.scene = 1;
        }, 
        watch: {
            isOpen(val) {
                if(val === true) {
                    this.switchMsg();
                }
            }
        }
    }
</script>
<template>
    <div class="controlBox">
        <h2 class="controlBox__title">{{ title }}</h2>
        <div class="controlBox__icon">
            <img :src="this.imgUrl" :alt="this.msg" :class="this.scene" class="controlBox__icon">
        </div>
        <div class="controlBox__text" v-html="this.msg"></div>
    </div>
</template>
<style>
    .controlBox {
        width: 300px;
        position: absolute;
        background: #fff;
        border-radius: 0.5rem;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        padding: 2rem;
        opacity: 0;
        transition: .4s;
        pointer-events: none;
        box-shadow: 0px 0px 0px 1000px rgb(0 0 0 / 0.14);
    }

    .controlBox.isOpen {
        opacity: 1;
        pointer-events: all;
    }

    .controlBox__title {
        font-size: 2.6rem;
        font-weight: bold;
        margin-bottom: 2rem;
        text-align: center;
    }

    .controlBox__text {
        margin-bottom: 2rem;
        text-align: center;
    }

    .controlBox__text p {
        text-align: left;
    }

    .controlBox__personImg {
        margin-bottom: 2rem;
    }

    .controlBox__icon {
        width: 100%;
        margin: 0 auto 1rem;
        transform: translateX(-7px);
        text-align: center;
    }

    .controlBox__icon img {
        width: 75px;
        height: auto;
    }

</style>
