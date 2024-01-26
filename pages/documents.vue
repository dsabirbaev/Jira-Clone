
<script lang="ts" setup>
    
    import { useMutation } from '@tanstack/vue-query';
    import { COLLECTION_DEALS, DB_ID } from '~/constants';
    import { DATABASE } from '~/libs/appwrite';
    import { useStatusQuery } from '~/query/use-status-query';
   

    definePageMeta({ layout: "documents" })
    useHead({ title: "Documents | Jira software" })
    const { data, isLoading, refetch } = useStatusQuery()

    const dragCardRef = ref(null)
    const sourceColumnRef = ref(null)
    const isMoving = ref(false)

    const {mutate, isPending} = useMutation({
        mutationKey: ['moveCard'],
        mutationFn: ({ docId, status } : {docId: string, status: string}) =>
            DATABASE.updateDocument(DB_ID, COLLECTION_DEALS, docId, {status}),
        onSuccess: () => refetch(),
    })

    const handleDragOver = () => {

    }
</script>

<template>
    <div v-if="isLoading" class="grid grid-cols-4 gap-2 mt-12">

        <USkeleton class="h-12 dark:bg-gray-900 bg-gray-100" />
		<USkeleton class="h-12 dark:bg-gray-900 bg-gray-100" />
		<USkeleton class="h-12 dark:bg-gray-900 bg-gray-100" />
		<USkeleton class="h-12 dark:bg-gray-900 bg-gray-100" />

        <UiDealsLoader />
        <UiDealsLoader />
        <UiDealsLoader />
        <UiDealsLoader />
    </div>

    <div class="grid grid-cols-4 gap-2 mt-12" v-else>
        
        <div v-for="column in data" :key="column.id">
            <UButton class="w-full h-12" color="blue" variant="outline">
                <div class="flex items-center space-x-2">
                    <span class="font-bold">{{ column.name }}</span>
                    <span class="text-sm text-neutral-500">{{ column.items.length }}</span>
                </div>
            </UButton>

            <SharedCreateDeal :status="column.id" :refetch="refetch"/>

            <div class="my-3 bg-gray-900 rounded-md p-2" v-for="card in column.items" :key="card.$id" role="button" draggable="true">
                <div class="flex items-center space-x-2">
                    <span class="font-bold text-lg uppercase">{{ card.name }}</span>
                </div>

                <UDivider class="my-3" />

                <div class="opacity-55 text-sm line-clamp-1">
                    {{ card.description }}
                </div>

                <UButton color="blue" class="w-full mt-3 group" variant="ghost"> 
                    <span class="font-bold">More details</span>

                    <Icon name="material-symbols:arrow-right-alt-rounded" class="group-hover:translate-x-2 transition"/>
                </UButton>
            </div>
        </div>
       
        
    </div>
</template>