
<script lang="ts" setup>
    
    import { useMutation } from '@tanstack/vue-query';
    import { COLLECTION_DEALS, DB_ID } from '~/constants';
    import { DATABASE } from '~/libs/appwrite';
    import { useStatusQuery } from '~/query/use-status';
    import { useCurrentDealStore } from "~/store/current-deal.store"
    import type { IColumn, IDeal } from '~/types';
   

    definePageMeta({ layout: "documents" })
    useHead({ title: "Documents | Jira software" })

    const { data, isLoading, refetch } = useStatusQuery()
    const { set } = useCurrentDealStore()

    const dragCardRef = ref<IDeal | null>(null)
    const sourceColumnRef = ref<IColumn | null>(null)
    const isMoving = ref(false)

    const {mutate, isPending} = useMutation({
        mutationKey: ['moveCard'],
        mutationFn: ({ docId, status } : {docId: string, status: string}) =>
            DATABASE.updateDocument(DB_ID, COLLECTION_DEALS, docId, {status}),
        onSuccess: () => refetch(),
    })

    const handleDragStart = (card: IDeal, column: IColumn) => {
        isMoving.value = true
        dragCardRef.value = card
        sourceColumnRef.value = column
    }

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault()
    }

    const handleDrop = (column: IColumn) => {
        isMoving.value = false
        if(dragCardRef.value && sourceColumnRef.value){
            mutate({ docId: dragCardRef.value.$id, status: column.id})
        }
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
        
        <div v-for="column in data" :key="column.id" 
             @dragover="handleDragOver" 
             @drop="() => handleDrop(column)"
             class="px-1"
             :class="isMoving && 'border-l-2 border-r-2 border-dotted h-screen dark:border-gray-900 border-gray-200'">
            <UButton class="w-full h-12" color="blue" variant="outline">
                <div class="flex items-center space-x-2">
                    <span class="font-bold">{{ column.name }}</span>
                    <span class="text-sm text-neutral-500">{{ column.items.length }}</span>
                </div>
            </UButton>

            <SharedCreateDeal :status="column.id" :refetch="refetch"/>

            <div class="my-3 bg-gray-900 rounded-md p-2" v-for="deal in column.items" :key="deal.$id" role="button" 
                 draggable="true" 
                 @dragstart="() => handleDragStart(deal, column)"
                 :class="isPending && 'opacity-50 cursor-not-allowed'">

                <div class="flex items-center space-x-2" role="button">
                    <span class="font-bold text-lg uppercase">{{ deal.name }}</span>
                </div>

                <UDivider class="my-3" />

                <div class="opacity-55 text-sm line-clamp-1">
                    {{ deal.description }}
                </div>

                
            </div>
        </div>
       
        <Slideover />
    </div>
</template>~/query/use-status