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
        background: #1771DA;
        color: #fff;
        font-weight: bold;
        padding: 1rem 2rem;
        width: 100%;
        text-align: center;
        margin-bottom: 1.4rem;
        transition: .2s;
        max-width: 600px;
        border-radius: 6px;
    }

    .btn.btnIsBorder {
        background: transparent;
        color: #1771DA;
        border: solid 2px #1771DA;
    }

    .btn:hover {
        background: #E9C02F;
    }

    .btn.btnIsBorder:hover {
        background: #1771DA;
        color: #fff;
    }
</style>