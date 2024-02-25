<template>
    <section class="intro">
        <div class="inner">
            <h1 class="mainTitle"><img src="/logo.png" alt="物流と私たち /"></h1>
            <p class="subTitle">物流2024年問題について考える</p>
            <div class="intro__text" :class="{isTextOpen: this.isTextOpen}">
                <p>2024年より、トラック運転手をはじめとした運転業務に従事する労働者に対して、
                    年960時間の労働時間規制が適用されることで、輸送能力の低下が予測されています。</p>
                <p class="strong">では、具体的に何が起きるかみてみましょう</p>
            </div>
            <Button :msg="this.btnTitle" @click="continueContent" />
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                count: 0,
                btnTitle: "はじめる",
                isTextOpen: false
            }
        }, 
        methods: {
            continueContent() {
                if( this.count === 0) {
                    // 説明文を表示し、ボタンの文言も変更する
                    this.btnTitle = "何が起こるか見てみる"
                    this.isTextOpen = !this.isTextOpen;
                    this.count++;

                } else if( this.count === 1 ){
                    // スタート画面を非表示にする
                    this.$emit('onClickStart', true)
                }
            }
        }, 
        props: {
            isHidden: Boolean
        }
    }
</script>
<style>
    .intro {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100svh;
        transform: translate(-50%, 0%);
        top: 0%;
        left: 50%;
        z-index: 1001;
        background: white;
        font-size: 1.6rem;
        text-align: center;
        opacity: 1;
        transition: .8s;
    }

    .intro.isHidden {
        opacity: 0;
        pointer-events: none;
    }

    .intro .inner {
        width: 50%;
    }

    .intro .inner .mainTitle {
        text-align: center;
        margin-bottom: 1rem;
    }

    .intro .inner .mainTitle img {
        width: 100%;
        margin: 0 auto;
    }
    
    .intro .inner .subTitle {
        font-size: 2rem;
        text-align: center;
        margin-bottom: 3rem;
    }

    .intro .inner .intro__text {
        margin-bottom: 3rem;
        opacity: 0;
        height: 100%;
        max-height: 0;
        transition: all 1.2s;
        pointer-events: none;
    }

    .intro .inner .intro__text.isTextOpen {
        opacity: 1;
        max-height: 999px;
    }
    .intro .inner .intro__text p:first-child {
        margin-bottom: 1rem;
    }

    .intro .inner .intro__text .strong {
        font-size: 2rem;
        font-weight: bold;
    }
</style>
