<template>
  <transition name="modal-fade">
    <div class="fixed z-50 inset-0">
      <div
        class="items-end justify-center pt-4 px-4 pb-20 text-center block p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-50"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="inline-block align-middle h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle w-full md:w-1/2 maxHeight overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
        <div class="absolute top-2 right-2">
          <i class="fa-solid fa-xmark px-2 cursor-pointer text-2xl" @click="$emit('close')"></i>
        </div>
          <div class="bg-white p-4 max-h-screen">
            <div class="">
              <div class="mt-0 :text-left">
                <p
                  class="text-2xl font-medium text-gray-700 border-b pb-2 w-full"
                  id="popup-title"
                >
                  {{ popupTitle }}
                </p>
                <div class="mt-4">
                  <p class="text-gray-600">
                    <slot/>
                  </p>
                </div>
                <div v-if="!hideButtons" class="border-t pl-4 pb-4 md:pb-0 pt-3 flex flex-row-reverse">
                  <Button
                      :text="isHearted ? 'Unsave' : 'Save'"
                      backgroundColor="blue-700"
                      class="pl-2"
                      @isClick="action"/>
                  <Button
                      text="Close"
                      backgroundColor="gray-100"
                      textColor="gray-700"
                      @isClick="close"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  name: "Popup",
  components: {
    Button
  },    
  props: {
    popupTitle: {
      type: String,
      required: true,
    },
    isHearted: {
      type: Boolean,
      default: false
    },
    hideButtons: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    action() {
      this.$emit("action");
    }
  },
};
</script>

<style scoped>
.maxHeight {
  max-height: 80vh;
}
</style>