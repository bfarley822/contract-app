<template>
    <div name="modal-fade">
        <div class="fixed z-50 inset-0">
            
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-20"></div>
            </div>

            <div class="flex items-center justify-center align-middle h-screen">
                <div style="border-top-color:transparent"
                    class="w-24 h-24 border-4 border-blue-400 border-solid rounded-full animate-spin">
                </div>
            </div>

        </div>
  </div>
</template>

<script>
export default {
  props: {
    
  },
  computed: {
   
  }
}
</script>