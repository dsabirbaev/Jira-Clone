<script lang="ts" setup> 
    useHead({ title: "Jira Software"})
    
    import { tabs } from '@/constants'
</script>


<template>

  <main class="pb-72">
      <!-- Hero section -->
    <section class="flex items-center justify-between h-[100vh] pt-[10vh] gap-4 bg-gradient-to-t from-white dark:from-black to-blue-500 dark:to-blue-800">
       
       <div class="pl-20 flex flex-col space-y-3">
            <h1 class="text-5xl">
                Move fast, stay aligned, and build better - together
            </h1>
            <p class="text-lg opacity-80">
				The #1 software development tool used by agile teams
			</p>

            <NuxtLink to="/auth">
				<UButton color="blue">Try it free</UButton>
			</NuxtLink>
       </div>
        <NuxtImg src="/hero.webp" />
    </section>

    <!-- Tab section -->
    <section>
        <h1 class="text-4xl font-medium px-4">
			All from a single source of truth
		</h1>

        <UTabs :items="tabs" class="mt-6 px-4" :ui="{ list: { width: 'w-fit' } }">
				<template #item="{ item }">
					<div class="flex justify-between items-center gap-6 mt-8">
						<div class="w-[40%]">
							<h1 class="text-4xl font-bold">{{ item.label }}</h1>
							<p class="mt-6 text-xl">{{ item.description }}</p>

							<div
								class="py-4 mt-12 rounded-r-full flex flex-col space-y-2 bg-gradient-to-r from-white dark:from-black to-blue-500 dark:to-blue-800"
							>
								<Icon name="bxs:quote-alt-left" class="text-7xl" />
								<p class="text-lg pl-2">{{ item.credentials.text }}</p>
								<div class="pl-2 opacity-70">
									<p class="font-bold">{{ item.credentials.username }}</p>
									<p class="text-sm">{{ item.credentials.company }}</p>
								</div>
							</div>
						</div>

						<NuxtImg :src="item.image" class="w-[60%]" />
					</div>
				</template>
			</UTabs>
    </section>
  </main>
</template>