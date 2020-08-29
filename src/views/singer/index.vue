<template>
  <div class="singer-wrap">
    <scroll :scroll-data="singerList" class="singer-content" ref="singerScroll">
      <ul>
        <li v-for="(group,groupIndex) in singerList" :key="group.title + groupIndex" class="li-parent">
          <h2 class="h2">{{group.title}}</h2>
          <ul>
            <li v-for="(item,index) in group.items" :key="item.name+index" class="li-child" v-fb>
              <img class="img" v-lazy="item.avatar">
              <span class="text">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <div class="loading-container" v-show="singerList.length<1">
      <loading />
    </div>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import { handlerFirstLetter } from '@/utils'
import Scroll from '@/components/Scroll'
import Loading from '@/components/Loading'
export default {
  data () {
    return {
      singerList: []
    }
  },
  created () {
    // 获取歌手列表
    this._getSingerList()
  },
  mounted () {
  },
  components: {
    Scroll,
    Loading
  },
  computed: {},
  methods: {
    /**
     * 请求歌手列表
     */
    _getSingerList () {
      getSingerList().then(res => {
        this.singerList = this.handleListDataFormat(res.singerList.data.singerlist)
      })
    },
    /**
     * 处理歌手列表格式
     * @param list 数据列表
     */
    handleListDataFormat (list) {
      let tempList = list.map(item => {
        return {
          ...item,
          firstLetter: handlerFirstLetter(item.singer_name).substring(0, 1)
        }
      })
      let map = {
        hot: {
          title: '热门',
          items: []
        }
      }
      let rest = []
      tempList.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push(this.setNewSingerObject(item.singer_id, item.singer_name, item.singer_pic))
        }
        // 按首字母分组，如果没有就创建
        if (!map.hasOwnProperty(item.firstLetter)) {
          let json = {
            title: item.firstLetter,
            items: []
          }
          map[item.firstLetter] = json
        }
        map[item.firstLetter].items.push(this.setNewSingerObject(item.singer_id, item.singer_name, item.singer_pic))
      })
      Object.entries(map).forEach(([key, val]) => {
        if (key !== 'hot') {
          rest.push(val)
        }
      })
      rest.sort((a, b) => a.title.localeCompare(b.title))
      return [map.hot].concat(rest)
    },
    setNewSingerObject (id, name, avatar) {
      class Singer {
        constructor (x, y, z) {
          this.id = x
          this.name = y
          this.avatar = z
        }
      }
      return new Singer(id, name, avatar)
    }
  }
}
</script>

<style lang='scss' scoped>
.singer-wrap {
  .singer-content {
    height: calc(100vh - 84px);
    overflow: hidden;
    .li-parent{
      .h2{
        padding: $xs $sm;
        font-size: $font_mini;
        @include bg_sec_color($bg-color-theme-sec);
        @include font_sec_color($font-color-theme-sec);
      }
      .li-child{
        display:flex;
        justify-content: flex-start;
        align-items: center;
        padding: $xxs $sm;
        .img{
          width:48px;
          height:48px;
          border-radius:50%;
          margin-right:$sm;
        }
        .text{
          font-size: $font_small;
        }
      }
    }
  }
  .loading-container {
    position: fixed;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
}
</style>
