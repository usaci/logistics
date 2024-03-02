
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
                msg: String,
                imgUrl: String,
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
                this.msg = "スクロールできます"
                let icon;

                if(this.$props.isTouchDevice === true ) {
                    // SPの場合
                    this.imgUrl = "icons/finger.png";
                    icon = this.$el.children[0];
                    // SP, PC共通
                    gsap.fromTo(icon, {
                        y: -6,
                    }, {
                        duration: 1,
                        y: 6,
                        repeat: 3,
                    });
                }else {
                    // PCの場合
                    this.imgUrl = "icons/mouse.png";
                    icon = this.$el.children[0];
                    // マウスホイール
                    const wheel = document.createElement('img');
                    wheel.src = "icons/mouse_wheel.png";
                    wheel.classList.add("controlBox__icon");
                    wheel.style.position = "absolute";
                    wheel.style.top = "0";
                    wheel.style.left = "50%";
                    wheel.style.transform = "translate(-50%, 0%)";
                    gsap.to(wheel, {
                        y: 10,
                        duration: .5,
                        repeat: 6,
                    })
                    icon.appendChild(wheel);
                    
                }

                // 1秒後非表示にする
                setTimeout(() => {
                    this.$el.style.opacity = 0;
                    this.$el.style.visibility = "hidden";
                }, 1000),
                setTimeout(() => {
                    icon.remove();
                }, 4000)
                
            }
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
    <div class="scrollHint">
        <div class="scrollHint__icon">
            <img :src="this.imgUrl" :alt="this.msg" class="scrollHint__icon">
        </div>
        <div class="scrollHint__text" v-html="this.msg"></div>
    </div>
</template>
<style>
    .scrollHint {
        width: 200px;
        position: fixed;
        background: #fff;
        border-radius: 0.5rem;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        padding: 1rem;
        opacity: 0;
        transition: .6s;
        pointer-events: none;
        box-shadow: 0px 0px 0px 1000px rgb(0 0 0 / 0.14);
    }

    .scrollHint.isOpen {
        opacity: 1;
        pointer-events: all;
    }
    .scrollHint__text {
        text-align: center;
    }

    .scrollHint__text p {
        text-align: left;
    }

    .scrollHint__personImg {
        margin-bottom: 2rem;
    }

    .scrollHint__icon {
        width: 100%;
        margin: 0 auto 1rem;
        text-align: center;
    }

    .scrollHint__icon img {
        width: 100px;
        height: auto;
    }
    @media screen and (max-width: 768px){

        
    }
</style>
