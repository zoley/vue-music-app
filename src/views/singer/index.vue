<template>
  <div class="singer-wrap">
    <scroll
      :scroll-data="singerList"
      :listen-scroll="true"
      :probe-type="3"
      @scroll="listScroll"
      class="singer-content"
      ref="singerScroll"
    >
      <ul>
        <li
          v-for="(group,groupIndex) in singerList"
          :key="group.title + groupIndex"
          class="li-parent"
          ref="singerGroup"
        >
          <h2 class="h2">{{group.title}}</h2>
          <ul>
            <li v-for="(item,index) in group.items" :key="item.name+index" class="li-child" v-fb>
              <img class="img" v-lazy="item.avatar">
              <span class="text">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
        <ul>
          <li :class="current===index?'li-item active':'li-item'" v-for="(item,index) in shortuctList" :key="index" :data-index="index">{{item}}</li>
        </ul>
      </div>
      <div class="word-title" :style="fixedTitleStyle" v-show="fixedTitle">{{fixedTitle}}</div>
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
  data() {
    return {
      // 歌手列表
      singerList: [],
      // 滚动距离
      scrollY: 0,
      // 列表高度集合
      listHeight: [],
      // 滚动距离顶部标题距离
      diff: 0
    }
  },
  created() {
    // 定义变量
    this.touch = {}
    // 获取歌手列表
    this._getSingerList()
  },
  mounted() {
  },
  components: {
    Scroll,
    Loading
  },
  computed: {
    // 歌手字母快速索引
    shortuctList() {
      return this.singerList.map(group => group.title.substring(0, 1))
    },
    // 歌手列表dom
    singerListRef() {
      return this.$refs.singerScroll
    },
    // 歌手列表分组dom
    singerGroupRef() {
      return this.$refs.singerGroup
    },
    // 当前歌手分组索引
    current() {
      // 滚动到顶部
      if (this.scrollY > 0) {
        return 0
      }
      // 滚动中间
      for (var i = 0; i < this.listHeight.length; i++) {
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (!height2 || (Math.abs(this.scrollY) >= height1 && Math.abs(this.scrollY) < height2)) {
          this.setDiffValue(height2)
          return i
        }
      }
      // 滚动底部
      return this.listHeight.length - 2
    },
    // 固定的顶部标题
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.singerList[this.current] ? this.singerList[this.current].title : ''
    },
    // 滚动组到顶部标题距离样式
    fixedTitleStyle() {
      if (this.diff < 32) {
        return `transform:translate3d(0,-${32 - this.diff}px,0)`
      } else {
        return ''
      }
    }
  },
  methods: {
    /**
     * computed里面不能直接对data赋值，写在方法里
     * @param height 高度
     */
    setDiffValue(height) {
      this.diff = height + this.scrollY
    },
    /**
     * 请求歌手列表
     */
    _getSingerList() {
      getSingerList().then(res => {
        this.singerList = this.handleListDataFormat(res.singerList.data.singerlist)
        this.$nextTick(() => {
          this.calcHeight()
        })
      })
    },
    /**
     * 处理歌手列表格式
     * @param list 数据列表
     */
    handleListDataFormat(list) {
      const tempList = list.map(item => {
        return {
          ...item,
          firstLetter: handlerFirstLetter(item.singer_name).substring(0, 1)
        }
      })
      const map = {
        hot: {
          title: '热门',
          items: []
        }
      }
      const rest = []
      tempList.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push(this.setNewSingerObject(item.singer_id, item.singer_name, item.singer_pic))
        }
        // 按首字母分组，如果没有就创建
        if (!map.hasOwnProperty(item.firstLetter)) {
          const json = {
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
    /**
     * 面向对象方式创建公用对象
     * @param id 属性id
     * @param name 属性name
     * @param avatar 属性avatar
     */
    setNewSingerObject(id, name, avatar) {
      class Singer {
        constructor(x, y, z) {
          this.id = x
          this.name = y
          this.avatar = z
        }
      }
      return new Singer(id, name, avatar)
    },
    /**
     * 快捷入口-开始触摸
     * @param e 事件对象
     */
    onShortcutTouchStart(e) {
      const anchorIndex = e.target.getAttribute('data-index')
      this.touch.y1 = e.touches[0].pageY
      this.touch.anchorIndex = anchorIndex
      this.singerListRef.scrollToElement(this.singerGroupRef[anchorIndex], 0)
    },
    /**
     * 快捷入口-移动触摸
     * @param e 事件对象
     */
    onShortcutTouchMove(e) {
      this.touch.y2 = e.touches[0].pageY
      // 或 0 取整
      const delta = (this.touch.y2 - this.touch.y1) / 20 | 0
      const anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this.singerListRef.scrollToElement(this.singerGroupRef[anchorIndex], 0)
    },
    /**
     * 列表滚动监听
     * @param pos 位置
     */
    listScroll(pos) {
      this.scrollY = pos.y
    },
    /**
     * 计算滚动列表分组高度
     */
    calcHeight() {
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < this.singerGroupRef.length; i++) {
        height += this.singerGroupRef[i].offsetHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.singer-wrap {
  .singer-content {
    height: calc(100vh - 84px);
    overflow: hidden;
    position: relative;
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
          width:36px;
          height:36px;
          border-radius:50%;
          margin-right:$sm;
        }
        .text{
          font-size: $font_small;
        }
      }
    }
    .list-shortcut{
      position:fixed;
      width: 30px;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      .li-item{
        text-align: center;
        height:20px;
        line-height: 20px;
        &.active{
          @include font_active_color($font-color-theme-active);
        }
      }
    }
  }
  .word-title{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    padding: $xs $sm;
    font-size: $font_mini;
    @include bg_sec_color($bg-color-theme-sec);
    @include font_sec_color($font-color-theme-sec);
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
