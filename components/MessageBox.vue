<script>
    export default {
        data() {
            return {
                isOpenStatus: Boolean
            }
        },
        props: {
            msgId: String, 
            title: String,
            msg: String,
            btnMsg: String,
            backBtnMsg: String,
            isOpen: Boolean, 
            whereSceneIs: Number,
            imgLink: String,
        },
        methods: {
            closeMsgBox() {
                // メッセージボックスを閉じる
                this.$emit('onCloseMsgBox', false);
                this.isOpenStatus = false;
                console.log('close');
            },
            openControlBox() {
                // 操作説明のメッセージボックスを開く
                this.$emit('onOpenControlMsgBox', true);
                // このメッセージボックスは閉じる
                this.isOpenStatus = false;
            },
            openModal() {
                // 通常のモーダルウィンドウを開く
                if(this.$props.whereSceneIs > 2){
                    this.$emit('onOpenModal', true);
                }
            }, 
        }, 
    }
</script>
<template>
    <div class="msgBox" :class="{ isOpen: isOpen }">
        <h2 class="msgBox__title">{{ title }}</h2>
        <div class="msgBox__text">
            <img :src="this.$props.imgLink" v-if="this.imgLink" class="msgBox__personImg">
            <p>{{ msg }}</p>
        </div>
        <!-- backBtnMsgがないとき -->
        <Button @click="closeMsgBox" :msg="btnMsg" v-if="backBtnMsg == '' || msgId == 'intro2' " />
        <Button @click="openModal" :msg="btnMsg" v-else />
        <Button @click="openControlBox" :msg="backBtnMsg" v-if="(backBtnMsg && msgId =='intro2')" :btnIsBorder="true" />
        <Button @click="closeMsgBox" :msg="backBtnMsg" v-else-if="backBtnMsg" :btnIsBorder="true" />
    </div>
</template>
<style>
    .msgBox {
        width: 400px;
        max-width: 400px;
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
    box-shadow: 0px 0px 0px 1000px rgb(0 0 0 / 0.14);
    }

    .msgBox.isOpen {
        opacity: 1;
        pointer-events: all;
    }

    .msgBox__title {
        font-size: 2.6rem;
        font-weight: bold;
        margin-bottom: 2rem;
        line-height: 1.6;
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
            width: 85%;
            padding: 3rem;
        }

        .msgBox__title {
            font-size: 2.0rem;
            margin-bottom: 1rem;
        }
    }
</style>
