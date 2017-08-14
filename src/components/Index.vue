<template>
  <q-layout>
    <template>
      <transition name="fade" mode="out-in">
        <div class="layout-view" v-if="results.length == 0" key="home">
          <video-bg :sources="['/statics/background.mp4']">
            <h1>_Random Access Coffee</h1>
            <p class="status">{{loadingMessage}}</p>
            <button class="circular loading disabled" v-if="(geolocation == null || googleMaps == null)"><i class="item-primary">autorenew</i></button>
            <button class="circular search" v-on:click="search" v-else><i class="item-primary">search</i></button>
          </video-bg>
        </div>
        <div class="layout-view" v-else key="results">
          <transition-group name="list" tag="ul" class="results">
            <Result v-for="(result, index) in results"
                    :dataindex="index"
                    :venue="result"
                    :key="result.id"></Result>
          </transition-group>
        </div>
      </transition>
    </template>
  </q-layout>
</template>

<script>
import Result from './Result.vue'
import VideoBg from 'vue-videobg'

const fsUrl = 'https://api.foursquare.com/v2/venues/search?v=20170211&radius=500&client_id=X4AF4YA42QRUWO5ERQCZOWMU5ZXGDWUUH5VGSK4FILGPAA14&client_secret=ZIGCEHQ5SOXVXAWJZLHCR2UDUN43VWIQWY4N1YUYSLDA22VM'

export default {
  components: {
    Result, VideoBg
  },
  data () {
    return {
      stage: 'home',
      interimresults: null,
      results: []
    }
  },
  computed: {
    loadingMessage () {
      if (this.geolocation === null) {
        return 'Getting GPS'
      }
      else if (this.geolocation === false) {
        return 'Error: Location not available'
      }
      else if (this.googleMaps === null) {
        return 'Loading libraries'
      }
      else if (this.stage === 'home') {
        return 'Ready'
      }
      else if (this.stage === 'search') {
        return 'Searching...'
      }
    },
    loadingStatus () {
      if (this.geolocation === false || this.googleMaps === null) {
        return true
      }
      else {
        return false
      }
    }
  },
  props: ['geolocation', 'googleMaps'],
  methods: {
    search () {
      var self = this
      this.stage = 'search'
      // Get results from FS by keyword
      let query = '&intent=browse&query=coffee&ll=' + this.geolocation.latitude + ',' + this.geolocation.longitude
      this.axios.get(fsUrl + query).then((response) => {
        this.interimresults = response.data.response.venues
        // Get further results from FS by category
        query = '&intent=browse&categoryId=4bf58dd8d48988d1e0931735,56aa371be4b08b9a8d5734c1,5665c7b9498e7d8a4f2c0f06,4bf58dd8d48988d16d941735,4bf58dd8d48988d128941735,56aa371be4b08b9a8d573508&ll=' + this.geolocation.latitude + ',' + this.geolocation.longitude
        self.axios.get(fsUrl + query).then((response) => {
          this.interimresults = this.interimresults.concat(response.data.response.venues)
          var args = {
            origins: [new self.googleMaps.LatLng(this.geolocation.latitude, this.geolocation.longitude)],
            destinations: [],
            travelMode: 'WALKING'
          }
          this.interimresults.forEach(function (venue) {
            args.destinations.push(new self.googleMaps.LatLng(venue.location.lat, venue.location.lng))
          })
          // We've finished search, next step will calculate distance for each and display to user
          self.calculateDistance(args)
        })
      })
    },
    calculateDistance (args) {
      var self = this
      new this.googleMaps.DistanceMatrixService().getDistanceMatrix(args, function (response) {
        console.log(response.rows)
        self.interimresults.forEach(function (venue, i) {
          venue.distance = response.rows[0].elements[i].distance
          venue.duration = response.rows[0].elements[i].duration
          self.results.push(venue)
        })
        self.results = self.interimresults.sort(function (a, b) {
          return a.duration.value - b.duration.value
        })
      })
    }
  }
}
</script>

<style lang="stylus">
h1 {
  color:rgba(255,255,255,0.5);
  text-transform:uppercase;
  text-align:right;
  padding:0 1rem;
}
.status {
  color:rgba(255,255,255,0.5);
}
.results {
  padding:1rem;
}
.VideoBg__content {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color: rgba(0, 0, 0, 0.6);
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  align-items:center;
  padding: 2rem 0;
  color:white;
}
.search, .loading {
  background-color:transparent;
  color: rgba(255,255,255,0.5);
  border: 2px solid rgba(255,255,255,0.5);
}
.search:hover, .search:focus, .search:active {
  background-color:rgba(255,255,255,0.5);
  color:black;
}
.loading i {
  animation-name: spin;
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}
.results {
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  flex-wrap:wrap;
}

@keyframes spin {
  from {
      transform: rotate(0deg);
  } to {
      transform: rotate(360deg);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
