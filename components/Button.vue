<script>
    export default {
        props: {
            msg: String,
            btnIsBorder: Boolean,
        }
    }
</script>

<template>
    <button class="btn" :class="{ btnIsBorder }" @click="openModal">{{ msg }}</button>
</template>

<style>
    .btn {
        background: #4466E0;
        color: #fff;
        font-weight: bold;
        padding: 1rem 2rem;
        width: 100%;
        text-align: center;
        margin-bottom: 1.4rem;
        transition: .2s;
    }

    .btn.btnIsBorder {
        background: transparent;
        color: #4466E0;
        border: solid 2px #4455E0;
    }

    .btn:hover {
        background: #4466e0bd;
    }

    .btn.btnIsBorder:hover {
        background: #4466E0;
        color: #fff;
    }
</style>