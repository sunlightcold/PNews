<template>
    <div class="login">
        <p-login></p-login> 
    </div>
</template>

<script>
import PLogin from "@/components/PublicPage/Login.vue"
import PHeader from "@/components/PublicPage/Header.vue"

export default {
    name: 'Login',
    components: {
        PLogin,
        PHeader
    }
}
</script>
