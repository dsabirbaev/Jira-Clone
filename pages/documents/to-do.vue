<script lang="ts" setup>
    import { useCurrentDealStore } from '@/store/current-deal.store'
    import { useDeals } from '~/query/use-deals';
    import { EnumStatus } from '~/types';
    definePageMeta({ layout: "documents" })
    useHead({ title: "To Do | Jira software" })

    const { set } = useCurrentDealStore()
    const {data, isLoading, refetch} = useDeals(EnumStatus.todo)
</script>

<template>
    <div class="flex items-center justify-between">
        <h1 class="text-4xl font-bold">To Do</h1>
        <SharedCreateDeal :status="'todo'" :refetch="refetch"/>

        <UDivider class="my-2" />

        <div class="grid grid-cols-4 gap-2" v-if="isLoading">
            <div
                class="my-3 dark:bg-gray-900 bg-gray-300 rounded-md p-2 animation"
                v-for="(item, index) in Array.from({ length: 4 })"
                :key="index"
            >
                <USkeleton class="w-10/12 h-4" />
                <USkeleton class="w-full h-1 my-3" />
                <USkeleton class="w-full h-8" />
                <USkeleton class="w-full h-6 mt-3" />
            </div>
        </div>

        <div v-else>
            <div v-if="data?.length">
                <div class="grid grid-cols-4 gap-2">
                    <div
					class="my-3 dark:bg-gray-900 bg-gray-100 rounded-md p-2 animation"
					v-for="(item, index) in data"
					:key="item.$id"
				    >
                        <div
                            class="flex items-center space-x-2"
                            role="button"
                            @click="set(item)"
                        >
                            <span class="font-bold text-lg uppercase">{{ item.name }}</span>
                        </div>

                        <UDivider class="my-3" />
                    </div>
                </div>

                <Slideover />
            </div>

            <div v-else>
                <div class="flex flex-col items-center justify-center">
                    <NuxtImg src="/no-data.svg" width="300" height="300" />
                </div>
		    </div>
        </div>
    </div>
</template>



<style scoped>
    @keyframes show {
        from {
            transform: scale(0.5) translateY(-30px);
            opacity: 0.4;
        }
        to {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }

    .animation {
        animation: show 0.3s ease-in-out;
    }
</style>