

<script setup lang="ts">
    const route = useRoute()

</script>

<template>
    <div>
        <p>posts: {{  route.params.id }}</p>
    </div>
</template>