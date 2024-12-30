<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex flex-col">
    <!-- Burger Menu -->
    <Menu as="div" class="fixed top-6 right-6 z-50">
      <MenuButton class="p-2.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 
                        hover:bg-white/20 transition-colors">
        <svg 
          class="w-6 h-6 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </MenuButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-95 opacity-0"
        leave-to-class="transform scale-100 opacity-100"
      >
        <MenuItems class="absolute right-0 mt-2 w-48 origin-top-right rounded-xl 
                         bg-white/10 backdrop-blur-md border border-white/20 
                         shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="p-1">
            <MenuItem v-slot="{ active }">
              <router-link 
                to="/about"
                :class="[
                  active ? 'bg-white/20' : '',
                  'block px-4 py-2 text-sm text-white rounded-lg'
                ]"
              >
                About
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a href="#" :class="[
                active ? 'bg-white/20' : '',
                'block px-4 py-2 text-sm text-white rounded-lg'
              ]">
                Contact
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    
    <main class="pt-20 flex-grow">
      <router-view></router-view>
    </main>

    <footer class="py-6 text-center text-gray-300 text-md mt-auto">
      App made by 
      <a 
        href="https://github.com/andieminidev" 
        target="_blank" 
        rel="noopener noreferrer"
        class="text-purple-300 hover:text-purple-400 transition-colors underline"
      >
        Andi
      </a>
    </footer>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { RouterLink, RouterView } from 'vue-router'
</script>