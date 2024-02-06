<script>
    export default {
        data() {
            return {
                isOpen: true
            }
        },
        props: {
            title: String,
            msg: String,
            btnMsg: String,
            backBtnMsg: String
        }
    }
</script>
<template>
    <div class="msgBox" :class="{isOpen: isOpen}">
        <h2 class="msgBox__title">ダイアログが表示されます</h2>
        <p class="msgBox__text">ここにダイアログが入ります。ここにダイアログが入ります。</p>
        <button class="msgBox__btn">ここにボタンが入ります。</button>
        <button class="msgBox__btn msgBox__btn--border" @click="isOpen = !isOpen">とじる</button>
    </div>
</template>
<style>
    .msgBox {
        position: absolute;
        background: #fff;
        border-radius: 0.5rem;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        padding: 4rem 2rem;
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

    .msgBox__btn.msgBox__btn--border {
        background: transparent;
        color: #4466E0;
        border: solid 2px #4455E0;
    }
    .msgBox__btn:last-child {
        margin-bottom: 0;
    }
</style>
