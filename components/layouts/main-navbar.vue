<script setup lang="ts">

    import { ACCOUNT } from '~/libs/appwrite';
    import { useAuthStore } from '~/store/auth.store';
    import { useLoading } from '~/store/loading.store';


    const { currentUser, clear } = useAuthStore();
    const router = useRouter();
    const loadingStore = useLoading();


    const logout = async () => {
        loadingStore.set(true);
        await ACCOUNT.deleteSession('current');
        clear();
        router.push("/auth");
        loadingStore.set(false);
    }
</script>

<template>
    <div class="h-[10vh] fixed top-0 left-0 right-0 z-50 bg-gray-100 dark:bg-gray-900">
        

        <div class="container mx-auto flex items-center justify-between h-full">
            <NuxtLink to="/" class="flex items-center space-x-1"> 
                <NuxtImg src="/logo.svg" width="50" height="50"/>
                <span class="text-2xl font-medium">Jira software</span>
            </NuxtLink>   
            
            <div class="flex items-center space-x-2">
                <SharedColorMode/>
                <template v-if="currentUser.status">
                    <UButton color="red" class="font-bold" @click="logout"> 
                        Log Out
                    </UButton>   
                    <NuxtLink to="/documents">
                        <UButton color="blue" variant="outline" class="font-bold"> 
                            Documents
                        </UButton> 
                    </NuxtLink>
                       
                </template>

                <template v-else>
                    <NuxtLink to="/auth">
                        <UButton color="blue" variant="outline"> 
                            Get it free
                        </UButton> 
                    </NuxtLink>

                    <NuxtLink to="/auth">
                        <UButton color="blue" variant="soft"> 
                            Sign In
                        </UButton> 
                    </NuxtLink>
                </template>
               
            </div>
        </div>
    </div>

</template>



<style lang="scss" scoped>

</style>