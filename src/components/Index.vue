<template>
  <b-container class="index" fluid>
    <h2>{{ msg }}</h2>

    <b-carousel
      id="main-slide-banner"
      v-model="slide"
      :interval="2000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-heihgt="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
            caption="First slide"
            text="Nulla vitae elit libero, a pharetra augue mollis interdum."
            img-src="https://picsum.photos/1024/480/?image=52"
          ></b-carousel-slide>

      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54"></b-carousel-slide>

      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=55"></b-carousel-slide>
    </b-carousel>
    <b-row class="mt-4">
      <b-col md="6">
        <b-card no-body header="공지사항">
          <b-list-group flush>
            <b-list-group-item href="#">1 하나듀</b-list-group-item>
            <b-list-group-item href="#">2 듀듀</b-list-group-item>
            <b-list-group-item href="#">3 세듀</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card no-body header="커뮤니티">
          <b-list-group flush>
            <b-list-group-item href="#">1 하나듀</b-list-group-item>
            <b-list-group-item href="#">2 듀듀</b-list-group-item>
            <b-list-group-item href="#">3 세듀</b-list-group-item>
          </b-list-group>
        </b-card>        
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      slide: 0,
      sliding: null,
      msg: '놀고싶은 보드게이머를 위한 놀이터 ! 모두 모여라 ~'
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

