<template>
	<div>
	   <v-alert
	     dismissible
	     type="error"
	     @input="onClose"
	     :value="true"
	   >
	     {{text}}
	   </v-alert>
	 </div>
</template>

<script>
export default {

  name: 'Alert',
  props: ['text'],
  data () {
    return {

    }
  },
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>

<style lang="css" scoped>
</style>