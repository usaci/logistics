<script>
    export default {
        data() {
            return {
                isOpenStatus: false,
                btnIsBorder: Boolean
            }
        },
        props: {
            isOpen: Boolean,
            title: String,
            person: String,
            quote: String, 
            mainText: String,
        }, 
        methods: {
            closeModal() {
                this.$emit('onCloseModal', false);
                this.isOpenStatus = !this.isOpenStatus;
            }
        }
    }
</script>
<template>
    <article class="mainModal" :class="{ isOpen }">
        <header class="mainModal__header">
            <h2 class="mainModal__ttl">{{ title }}</h2>
        </header>
        <section class="mainModal__main">
            <section class="mainModal__quote">
                <div class="inner">
                    <figure class="mainModal__quote-img">
                        <img src="/icons/person_ramen.png" alt="住民アイコン">
                    </figure>
                    <div>
                        <p class="mainModal__quote-ttl">{{ person }}</p>
                        <p>{{ quote }}</p>
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
    </article>
</template>

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
        font-size: 2.7rem;
        font-weight: bold;
        margin-bottom: 2rem;
    }


    .mainModal .mainModal__quote .inner {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .mainModal .mainModal__quote .inner .mainModal__quote-ttl {
        text-align: center;
        font-weight: bold;
        font-size: 2.0rem;
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
        }
        .mainModal .mainModal__main h2 {
            font-size: 1.7rem;
            padding: 0rem 1rem;
            background: #F1F1F1;
            padding:  0.4rem 1rem;
            border-left: solid #4466E0 1rem;
            font-weight: bold;
        }
    }
</style>