<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view v-bind:geolocation="geolocation" v-bind:googleMaps="googleMaps"></router-view>
  </div>
</template>

<script>
/*
 * Root component
 */
var GoogleMapsLoader = require('google-maps')

export default {
  data () {
    return {
      geolocation: null,
      googleMaps: null
    }
  },
  beforeMount () {
    var self = this
    if (!('geolocation' in navigator)) {
      this.geolocation = false
    }
    else {
      navigator.geolocation.getCurrentPosition(function (position) {
        self.geolocation = position.coords
      })
    }
    GoogleMapsLoader.LIBRARIES = ['geometry']
    GoogleMapsLoader.KEY = 'AIzaSyASSp5Aohpo0pB2NrWGtxJwa-U7AcKXeDs'
    GoogleMapsLoader.load(function (google) {
      self.googleMaps = google.maps
    })
  }
}
</script>

<style></style>
