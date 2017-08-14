<template>
  <li class="card" :key="venue.id">
    <div class="card-media">
      <img :src="map">
      <button class="primary circular" v-on:click="openMap"><i>place</i></button>
    </div>
    <div class="card-content">
      <div class="item two-lines">
        <i class="item-primary">{{icon}}</i>
        <div class="item-content">
          <div class="item-label">
            <p class="item-title">{{venue.name}}</p>
            <a :href="venue.menu.url" v-if="venue.menu" class="item-title">View Menu</a>
          </div>
        </div>
      </div>
    </div>
    <div class="card-actions card-no-top-padding">
      <div class="text-lime duration">
        {{venue.duration.text}}
      </div>
      <div class="distance">
        ( {{venue.distance.text}} )
      </div>
    </div>
  </li>
</template>
<script>
export default {
  computed: {
    map () {
      return 'https://maps.googleapis.com/maps/api/staticmap?markers=' + this.venue.location.lat + ',' + this.venue.location.lng + '&size=640x400&key=AIzaSyASSp5Aohpo0pB2NrWGtxJwa-U7AcKXeDs'
    },
    icon () {
      switch (this.venue.categories[0].id) {
        case '4bf58dd8d48988d1e0931735':
          // This is a coffee shop
          return 'local_cafe'
        case '4bf58dd8d48988d16d941735':
          // This is a cafe
          return 'local_dining'
        default:
          // This is other
          return 'store_mall_directory'
      }
    },
    link () {
      return 'http://maps.google.com/?q=' + this.venue.location.lat + ',' + this.venue.location.lng
    }
  },
  methods: {
    openMap () {
      location.href = this.link
    }
  },
  mounted () {
    var delay = this.dataindex * 150
    var self = this.$el
    setTimeout(function () {
      self.style.opacity = 1
      self.style.transform = 'translateY(0px)'
    }, delay)
  },
  beforeDestroy () {
    var delay = this.dataindex * 150
    var self = this.$el
    setTimeout(function () {
      self.style.opacity = 0
      self.style.transform = 'translateY(100px)'
    }, delay)
  },
  props: ['venue', 'dataindex']
}
</script>
<style lang="stylus">
  .card-actions {
    display:flex;
    flex-direction:row;
    flex-wrap:no-wrap;
  }
  .duration {
    margin:0;
    padding:0;
    width: 60px;
    text-align:center;
  }
  .distance {
    margin-left:auto;
    width: 88px;
    text-align:center;
  }
  .card {
    opacity:0;
    transform:translateY(100px);
  }
  .item-label .item-title {
    margin-bottom:0.5em;
    white-space:normal;
  }
  @media screen and (min-width: 600px) {
    .results {
      padding-right:0;
    }
    .card {
      max-width:300px;
      margin-right:1rem;
      transition:all 1s;
    }
  }
  .list-enter-active, .list-leave-active {
    transition: all 2s;
  }
  .list-enter, .list-leave-to  {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
