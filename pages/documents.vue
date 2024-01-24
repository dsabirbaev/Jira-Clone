
<script lang="ts" setup>
    import { ACCOUNT } from '~/libs/appwrite';
    import { useLoadingStore } from '~/store/loading.store';
    import { status } from '~/constants';

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
    <div class="grid grid-cols-4 gap-2 mt-12">
        <UButton class="w-full h-12" color="blue" variant="outline" v-for="(item, index) in status" :key="index">
            <div class="flex items-center space-x-2">
                <span class="font-bold">{{ item.name }}</span>
                <span class="text-sm text-neutral-500">2</span>
            </div>
        </UButton>
        
    </div>
</template>