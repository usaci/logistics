<script>
    export default {
        data() {
            return {
                isOpenStatus: Boolean
            }
        },
        props: {
            msgId: Number, 
            title: String,
            msg: String,
            btnMsg: String,
            backBtnMsg: String,
            isOpen: Boolean
        },
        methods: {
            closeMsgBox() {
                this.$emit('onClose', false);
                this.isOpenStatus = this.$props.isOpen;
            }
        }, 
    }
</script>
<template>
    <div class="msgBox" :class="{ isOpen }">
        <h2 class="msgBox__title">{{ title }}</h2>
        <p class="msgBox__text">{{ msg }}</p>
        <button class="msgBox__btn" @click="console.log('open')">ここにボタンが入ります。</button>
        <button class="msgBox__btn msgBox__btn-border" @click="closeMsgBox">とじる</button>
    </div>
</template>
<style>
    .msgBox {
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
    }

    .msgBox__text {
        margin-bottom: 2rem;
    }

    .msgBox__btn {
        background: #4466E0;
        color: #fff;
        font-weight: bold;
        padding: 1rem 2rem;
        width: 100%;
        text-align: center;
        margin-bottom: 1rem;
    }

    .msgBox__btn.msgBox__btn-border {
        background: transparent;
        color: #4466E0;
        border: solid 2px #4455E0;
    }
    .msgBox__btn:last-child {
        margin-bottom: 0;
    }
</style>
