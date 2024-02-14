<template>
    <article class="mainModal" :class="{ isOpen }">
        <header class="mainModal__header">
            <h2 class="mainModal__ttl">ここにタイトルが入ります。</h2>
        </header>
        <section class="mainModal__main">
            <section class="mainModal__quote">
                <div class="inner">
                    <figure class="mainModal__quote-img">
                        <img src="" alt="住民アイコン">
                    </figure>
                    <div>
                        <p class="mainModal__quote-ttl">住民A</p>
                        <p>ネット通販で食品を注文したんだけれど、いつまで経っても届かないのよね</p>
                    </div>
                </div>
            </section>
            <p>ドライバーの労働時間の減少により、長距離輸送など従来通りの輸送ができなくなることが懸念されています。</p>
            <h2>ここに見出しが入ります。</h2>
            <p>
                時間外労働の上限規制は、一見するとホワイトな改革とも言えますが、どうして諸問題が発生すると言われているのでしょうか。具体的に2024年問題で変わるドライバーの拘束時間の目安を見ていきます。<br>
                実際に1か月の拘束時間を具体例として考えていきましょう。まず、時間外労働の上限である年960時間は、目安として1か月で約80時間となります。しかし今回の法律では、1か月の上限については規定がありません。<br>
                つまり、ある月は100時間の時間外労働があっても、他の月で削減することで、年間960時間を超過しなければ問題ないという仕組みとなっています。<br>
                これを踏まえて実際に、ドライバーの1か月の拘束時間を以下の条件にあてはめてみます。
            </p>
        </section>
        <footer>
            <Button msg="とじる" :btnIsBorder="true" @click="closeModal"/>
        </footer>
    </article>
</template>
<script>
    export default {
        data() {
            return {
                isOpenStatus: false,
                title: String,
                quote: String, 
                mainText: String,
                btnIsBorder: Boolean
            }
        },
        props: {
            isOpen: Boolean
        }, 
        methods: {
            closeModal() {
                this.$emit('onCloseModal', false);
                this.isOpenStatus = !this.isOpenStatus;
            }
        }
    }
</script>

<style>
    .mainModal {
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

    .mainModal.isOpen {
        opacity: 1;
        pointer-events: all;
    }

    .mainModal .mainModal__ttl {
        font-size: 2.4rem;
        font-weight: bold;
        margin-bottom: 2rem;
    }

    .mainModal .mainModal__quote {
        background: #F1F1F1;
        padding: 2rem;
    }

    .mainModal .mainModal__quote .inner {
        display: flex;
    }

    .mainModal .mainModal__main {
        margin-bottom: 3rem;
        max-height: 500px;
        overflow: scroll;;
    }
    .mainModal .mainModal__main * {
        margin-bottom: 2rem;
    }
    .mainModal .mainModal__main h2 {
        font-size: 2.0rem;
        padding: 0rem 1rem;
        background: #F1F1F1;
        padding:  0.4rem 1rem;
        border-left: solid #4466E0 1rem;
        font-weight: bold;
    }
</style>