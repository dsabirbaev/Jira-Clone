
<script lang="ts" setup>
    import { ACCOUNT } from '~/libs/appwrite';
    import { useLoadingStore } from '~/store/loading.store';


    definePageMeta({
        layout: "documents",
    })

    useHead({
        title: "Documents | Jira software",
    })

    const router = useRouter();	
    const loadingStore = useLoadingStore();
    onMounted(() => {
		ACCOUNT.get()
				.then(() => loadingStore.set(false))
				.catch(() => router.push('/auth'))
	})
</script>

<template>
    <div>
        <h2>Documents</h2>
    </div>
</template>