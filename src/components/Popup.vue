<template>
  <transition name="modal-fade">
    <div class="fixed z-50 inset-0 overflow-y-auto">
      <div
        class="items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center block p-0"
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
          class="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle w-full md:w-2/3"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <div class="bg-white p-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-0 ml-4 :text-left">
                <p
                  class="text-2xl font-medium text-gray-700"
                  id="popup-title"
                >
                  {{ popupTitle }}
                </p>
                <div class="mt-2">
                  <p class="text-gray-600">
                    <slot/>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 flex flex-row-reverse">
            <Button
                text="Save"
                backgroundColor="blue-700"
                class="pl-2"
                @isClick="close"/>
            <Button
                text="Close"
                backgroundColor="white"
                textColor="gray-700"
                @isClick="close"/>
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
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
};
</script>