<script>
    export default {
        data() {
            return {
                isOpenStatus: false,
                btnIsBorder: Boolean,
                openedCount: 0,
                scrollHintIsOpen: false,
            }
        },
        props: {
            id: String,
            isOpen: Boolean,
            title: String,
            person: String,
            mainText: String,
            quote: String,
            imgLink: String,
            isTouchDevice: Boolean,
        }, 
        methods: {
            closeModal() {
                this.$emit('onCloseModal', false);
                this.isOpenStatus = !this.isOpenStatus;
                // スクロール位置をリセット
                setTimeout(() => {
                    this.$el.scrollTop = 0;
                }, 400);
            }, 
            openScrollHint() {
                this.scrollHintIsOpen = true;
            },
            closeScrollHint() {
                this.scrollHintIsOpen = false;
            }

        }, 
        watch: {
            isOpen(val) {
                if(val === true) {
                    this.openedCount++;
                }
            },
            openedCount(val) {
                if(val === 1) {
                    this.openScrollHint();
                }
            }
        }
    }
</script>
<template>
    <article class="mainModal" :class="{ isOpen }">
        <div class="inner">
            <header class="mainModal__header">
                <h2 class="mainModal__ttl" :class="this.$props.id === 'thinkingModal' ? 'solution' : 'problem'">{{ title }}</h2>
            </header>
            <section class="mainModal__main">
                <section class="mainModal__quote" v-if="this.person">
                    <div class="inner">
                        <figure class="mainModal__quote-img">
                            <img :src="this.imgLink" :alt="this.person">
                        </figure>
                        <div class="mainModal__quote-text">
                            <p class="mainModal__quote-ttl">{{ person }}</p>
                            <p v-html="quote"></p>
                        </div>
                    </div>
                </section>
                <section class="mainModal__mainText">
                    <div v-html="mainText"></div>
                </section>
            </section>
            <footer>
                <Button msg="とじる" :btnIsBorder="true" @click="closeModal"/>
            </footer>
            <ScrollHint :isOpen="scrollHintIsOpen" :isTouchDevice="this.$props.isTouchDevice"/>
        </div>
    </article>
</template>

<style>
    .mainModal {
        max-width: 700px;
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
        height: fit-content; 
        max-height: 100%;
        overflow: scroll;
        box-shadow: 0px 0px 0px 1000px rgb(0 0 0 / 0.14);
        z-index: 101;
    }

    .mainModal > .inner {
        height: max-content;
    }

    .mainModal.isOpen {
        opacity: 1;
        pointer-events: all;
    }

    .mainModal .mainModal__ttl {
        font-size: 2.7rem;
        font-weight: bold;
        margin-bottom: 3rem;
    }

    .mainModal .mainModal__ttl:before {
        content: "";
        display: inline-block;
        width: 1.4em;
        height: 1.4em;
        margin: -0.2em 0;
    }

    .mainModal .mainModal__ttl.problem:before {
        background: url("/icons/alert.png") no-repeat;
        background-size: contain;
    }

    .mainModal .mainModal__ttl.solution:before {
        background: url("/icons/checked.png") no-repeat;
        background-size: contain;
    }
    .mainModal .mainModal__quote .inner {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .mainModal .mainModal__quote .inner .mainModal__quote-text {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: #F1F1F1;
        padding: 1rem 2rem;
        /* border: solid 2px #4466E0; */
        border-radius: 0.5rem;
        width: 100%;
    }

    .mainModal .mainModal__quote .inner .mainModal__quote-text:before {
        content: "";
        display: block;
        position: absolute;
        width: 30px;
        height: 15px;
        transform: translateY(-50%) rotate(45deg);
        left: -13px;
        top: 50%;
        background: #F1F1F1;
    }

    .mainModal .mainModal__quote .inner .mainModal__quote-ttl {
        text-align: center;
        font-weight: bold;
        font-size: 1.8rem;
        margin-bottom: 0;
    }
    .mainModal .mainModal__quote .inner .mainModal__quote-img {
        width: 25%;
    }
    .mainModal .mainModal__quote .inner .mainModal__quote-img img {
        width: 100%;
    }

    .mainModal .mainModal__main {
        margin-bottom: 3rem;
        height: max-content;
    }

    .mainModal .mainModal__main * {
        margin-bottom: 3rem;
    }

    .mainModal .mainModal__main h2 {
        font-size: 2.0rem;
        padding: 0rem 1rem;
        background: #F1F1F1;
        padding:  0.4rem 1rem;
        border-left: solid #1771DA 1rem;
        font-weight: bold;
        margin-bottom: 2rem;
    }

    .mainModal .mainModal__main cite {
        font-size: 1.2rem;
        line-height: 1.5;
        font-style: normal;
    }

    .mainModal .mainModal__main .flex {
        display: flex;
    }

    .mainModal .mainModal__main .flex figure {
        width: 33%;
    }

    .mainModal .mainModal__main .flex figure > img{
        width: 100%;
    }
    .mainModal .mainModal__main em {
        background: #F6CD3E;
        font-style: normal;
        font-weight: bold;
    }
    .mainModal .mainModal__main figure {
        text-align: center;
    }
    .mainModal .mainModal__main figure > img {
        width: 150px;
        margin: 0 auto;
    }
    @media screen and (max-width: 768px){
        .mainModal {
            width: 100%;
            height: 100%;
            z-index: 1002;
            padding: 3rem;
            overflow: scroll;
        }

        .mainModal .mainModal__ttl {
            font-size: 2.4rem;
        }
        
        .mainModal .mainModal__main {
            max-height: 75%;
            height: 75%;
            overflow: scroll;
        }
        .mainModal .mainModal__main h2 {
            font-size: 1.7rem;
            padding: 0rem 1rem;
            background: #F1F1F1;
            padding:  0.4rem 1rem;
            border-left: solid #1771DA 1rem;
            font-weight: bold;
        }
    }
</style>