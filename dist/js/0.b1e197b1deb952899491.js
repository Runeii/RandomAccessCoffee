webpackJsonp([0,1],{164:function(t,e,i){function n(t){i(169)}var a=i(130)(i(167),i(170),n,null,null);t.exports=a.exports},166:function(t,e,i){function n(t){i(179)}var a=i(130)(i(173),i(183),n,null,null);t.exports=a.exports},167:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={computed:{map:function(){return"https://maps.googleapis.com/maps/api/staticmap?markers="+this.venue.location.lat+","+this.venue.location.lng+"&size=640x400&key=AIzaSyASSp5Aohpo0pB2NrWGtxJwa-U7AcKXeDs"},icon:function(){switch(this.venue.categories[0].id){case"4bf58dd8d48988d1e0931735":return"local_cafe";case"4bf58dd8d48988d16d941735":return"local_dining";default:return"store_mall_directory"}},link:function(){return"http://maps.google.com/?q="+this.venue.location.lat+","+this.venue.location.lng}},methods:{openMap:function(){location.href=this.link}},mounted:function(){var t=150*this.dataindex,e=this.$el;setTimeout(function(){e.style.opacity=1,e.style.transform="translateY(0px)"},t)},beforeDestroy:function(){var t=150*this.dataindex,e=this.$el;setTimeout(function(){e.style.opacity=0,e.style.transform="translateY(100px)"},t)},props:["venue","dataindex"]}},168:function(t,e,i){e=t.exports=i(162)(void 0),e.push([t.i,".card-actions{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:no-wrap;flex-wrap:no-wrap}.duration{margin:0;padding:0;width:60px;text-align:center}.distance{margin-left:auto;width:88px;text-align:center}.card{opacity:0;-webkit-transform:translateY(100px);transform:translateY(100px)}.item-label .item-title{margin-bottom:.5em;white-space:normal}@media screen and (min-width:600px){.results{padding-right:0}.card{max-width:300px;margin-right:1rem;transition:all 1s}}.list-enter-active,.list-leave-active{transition:all 2s}.list-enter,.list-leave-to{opacity:0;-webkit-transform:translateY(30px);transform:translateY(30px)}",""])},169:function(t,e,i){var n=i(168);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(163)("411d7fa3",n,!0)},170:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("li",{key:t.venue.id,staticClass:"card"},[i("div",{staticClass:"card-media"},[i("img",{attrs:{src:t.map}}),t._v(" "),i("button",{staticClass:"primary circular",on:{click:t.openMap}},[i("i",[t._v("place")])])]),t._v(" "),i("div",{staticClass:"card-content"},[i("div",{staticClass:"item two-lines"},[i("i",{staticClass:"item-primary"},[t._v(t._s(t.icon))]),t._v(" "),i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-label"},[i("p",{staticClass:"item-title"},[t._v(t._s(t.venue.name))]),t._v(" "),t.venue.menu?i("a",{staticClass:"item-title",attrs:{href:t.venue.menu.url}},[t._v("View Menu")]):t._e()])])])]),t._v(" "),i("div",{staticClass:"card-actions card-no-top-padding"},[i("div",{staticClass:"text-lime duration"},[t._v("\n      "+t._s(t.venue.duration.text)+"\n    ")]),t._v(" "),i("div",{staticClass:"distance"},[t._v("\n      ( "+t._s(t.venue.distance.text)+" )\n    ")])])])},staticRenderFns:[]}},171:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{sources:{type:Array,required:!0},img:{type:String}},data:function(){return{videoRatio:null}},mounted:function(){var t=this;this.setImageUrl(),this.setContainerHeight(),this.videoCanPlay()&&(this.$refs.video.oncanplay=function(){t.$refs.video&&(t.videoRatio=t.$refs.video.videoWidth/t.$refs.video.videoHeight,t.setVideoSize(),t.$refs.video.style.visibility="visible")}),window.addEventListener("resize",this.resize)},beforeDestroy:function(){window.removeEventListener("resize",this.resize)},methods:{resize:function(){this.setContainerHeight(),this.videoCanPlay()&&this.setVideoSize()},videoCanPlay:function(){return!!this.$refs.video.canPlayType},setImageUrl:function(){this.img&&(this.$el.style.backgroundImage="url("+this.img+")")},setContainerHeight:function(){this.$el.style.height=window.innerHeight+"px"},setVideoSize:function(){var t,e;this.$el.offsetWidth/this.$el.offsetHeight>this.videoRatio?t=this.$el.offsetWidth:e=this.$el.offsetHeight,this.$refs.video.style.width=t?t+"px":"auto",this.$refs.video.style.height=e?e+"px":"auto"},getMediaType:function(t){return"video/"+t.split(".").pop()}}}},173:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(164),a=i.n(n),o=i(180),s=i.n(o),r="https://api.foursquare.com/v2/venues/search?v=20170211&radius=500&client_id=X4AF4YA42QRUWO5ERQCZOWMU5ZXGDWUUH5VGSK4FILGPAA14&client_secret=ZIGCEHQ5SOXVXAWJZLHCR2UDUN43VWIQWY4N1YUYSLDA22VM";e.default={components:{Result:a.a,VideoBg:s.a},data:function(){return{stage:"home",interimresults:null,results:[]}},computed:{loadingMessage:function(){return null===this.geolocation?"Getting GPS":!1===this.geolocation?"Error: Location not available":null===this.googleMaps?"Loading libraries":"home"===this.stage?"Ready":"search"===this.stage?"Searching...":void 0},loadingStatus:function(){return!1===this.geolocation||null===this.googleMaps}},props:["geolocation","googleMaps"],methods:{search:function(){var t=this,e=this;this.stage="search";var i="&intent=browse&query=coffee&ll="+this.geolocation.latitude+","+this.geolocation.longitude;this.axios.get(r+i).then(function(n){t.interimresults=n.data.response.venues,i="&intent=browse&categoryId=4bf58dd8d48988d1e0931735,56aa371be4b08b9a8d5734c1,5665c7b9498e7d8a4f2c0f06,4bf58dd8d48988d16d941735,4bf58dd8d48988d128941735,56aa371be4b08b9a8d573508&ll="+t.geolocation.latitude+","+t.geolocation.longitude,e.axios.get(r+i).then(function(i){t.interimresults=t.interimresults.concat(i.data.response.venues);var n={origins:[new e.googleMaps.LatLng(t.geolocation.latitude,t.geolocation.longitude)],destinations:[],travelMode:"WALKING"};t.interimresults.forEach(function(t){n.destinations.push(new e.googleMaps.LatLng(t.location.lat,t.location.lng))}),e.calculateDistance(n)})})},calculateDistance:function(t){var e=this;(new this.googleMaps.DistanceMatrixService).getDistanceMatrix(t,function(t){console.log(t.rows),e.interimresults.forEach(function(i,n){i.distance=t.rows[0].elements[n].distance,i.duration=t.rows[0].elements[n].duration,e.results.push(i)}),e.results=e.interimresults.sort(function(t,e){return t.duration.value-e.duration.value})})}}}},175:function(t,e,i){e=t.exports=i(162)(void 0),e.push([t.i,".VideoBg{position:relative;background-size:cover;background-position:50%;overflow:hidden}.VideoBg video{position:absolute;top:50%;left:50%;visibility:hidden;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.VideoBg__content{position:absolute;top:0;left:0;width:100%;height:100%}",""])},176:function(t,e,i){e=t.exports=i(162)(void 0),e.push([t.i,"h1{text-transform:uppercase;text-align:right;padding:0 1rem}.status,h1{color:hsla(0,0%,100%,.5)}.results{padding:1rem}.VideoBg__content{position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.6);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:2rem 0;color:#fff}.loading,.search{background-color:transparent;color:hsla(0,0%,100%,.5);border:2px solid hsla(0,0%,100%,.5)}.search:active,.search:focus,.search:hover{background-color:hsla(0,0%,100%,.5);color:#000}.loading i{-webkit-animation-name:spin;animation-name:spin;-webkit-animation-duration:4s;animation-duration:4s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:ease;animation-timing-function:ease}.results{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:distribute;justify-content:space-around;-ms-flex-wrap:wrap;flex-wrap:wrap}.fade-enter-active,.fade-leave-active{transition:opacity .5s}.fade-enter,.fade-leave-to{opacity:0}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}",""])},178:function(t,e,i){var n=i(175);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(163)("72276529",n,!0)},179:function(t,e,i){var n=i(176);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(163)("d65799f6",n,!0)},180:function(t,e,i){function n(t){i(178)}var a=i(130)(i(171),i(182),n,null,null);t.exports=a.exports},182:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"VideoBg"},[i("video",{ref:"video",attrs:{autoplay:"",loop:"",muted:""}},t._l(t.sources,function(e){return i("source",{attrs:{src:e,type:t.getMediaType(e)}})})),t._v(" "),i("div",{staticClass:"VideoBg__content"},[t._t("default")],2)])},staticRenderFns:[]}},183:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-layout",[[i("transition",{attrs:{name:"fade",mode:"out-in"}},[0==t.results.length?i("div",{key:"home",staticClass:"layout-view"},[i("video-bg",{attrs:{sources:["/statics/background.mp4"]}},[i("h1",[t._v("_Random Access Coffee")]),t._v(" "),i("p",{staticClass:"status"},[t._v(t._s(t.loadingMessage))]),t._v(" "),null==t.geolocation||null==t.googleMaps?i("button",{staticClass:"circular loading disabled"},[i("i",{staticClass:"item-primary"},[t._v("autorenew")])]):i("button",{staticClass:"circular search",on:{click:t.search}},[i("i",{staticClass:"item-primary"},[t._v("search")])])])],1):i("div",{key:"results",staticClass:"layout-view"},[i("transition-group",{staticClass:"results",attrs:{name:"list",tag:"ul"}},t._l(t.results,function(t,e){return i("Result",{key:t.id,attrs:{dataindex:e,venue:t}})}))],1)])]],2)},staticRenderFns:[]}}});