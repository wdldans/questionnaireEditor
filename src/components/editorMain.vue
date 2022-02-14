<template>
  <div
    class="editor-main flex justify-center"
    :style="{ height: selfWindow.cWindow.height-60 + 'px' }"
    ref="container"
    @click.capture="$store.commit('cancelCurrentItem')"
  >
    
    <div class="page-main flex flex-column">
      <!-- 问卷名称 -->
      <div class="headline flex justify-between align-center">
        <p class="headline-title">{{ filename }}</p>
        <p class="headline-time" v-show="lastSaveTime">最近保存时间：{{ lastSaveTime }}</p>
      </div>

      <!-- 标题 && 题目 -->
      <div class="page-list">
        <draggable :list="list" animation="300">
          <div
            class="list-item pointer"
            :class="item.id == currentItem.id ? 'list-item-choosed' : ''"
            v-for="item in list"
            :key="item.id"
            @click="clickListItem(item)"
          >
            <!-- 标题 -->
            <div class="item-headline" v-if="item.componentName === 'Headline'">{{ item.propValues[0].value }}</div>

            <!-- 题目 -->
            <div v-else-if="item.componentName === 'Title'">
              <div class="item-title">{{ item.propValues[0].value }}</div>

              <div v-if="item.propValues[2].value.length">
               
                <div class="item-option flex align-center" v-for="(option,index) in item.propValues[2].value" :key="option.id">
                  
                  <div v-if="option.optionType !== 'dropdownOptions'">
                    <div class="item-option-radio" v-if="index == 0">A.</div>
                    <div class="item-option-radio" v-else-if="index == 1">B.</div>
                    <div class="item-option-radio" v-else-if="index == 2">C.</div>
                    <div class="item-option-radio" v-else-if="index == 3">D.</div>
                    <div class="item-option-radio" v-else-if="index == 4">E.</div>
                    <div class="item-option-radio" v-else-if="index == 5">F.</div>
                    <div class="item-option-radio" v-else-if="index == 6">G.</div>
                    <div class="item-option-radio" v-else-if="index == 7">H.</div>
                    <div class="item-option-radio" v-else-if="index == 8">I.</div>
                    <div class="item-option-radio" v-else-if="index == 9">J.</div>
                    <div class="item-option-radio" v-else-if="index == 10">K.</div>
                    <div class="item-option-radio" v-else-if="index == 11">L.</div>
                    <div class="item-option-radio" v-else-if="index == 12">M.</div>
                    <div class="item-option-radio" v-else-if="index == 13">N.</div>
                    <div class="item-option-radio" v-else-if="index == 14">O.</div>
                  </div>

                  <!-- 下拉选项 -->
                  <div class="flex align-center justify-between el-select-option" v-if="option.optionType === 'dropdownOptions'">
                    <div>{{ option.value ? dropdownOptionsData[option.value] : '请选择' }}</div>
                    <img style="width:10px;" :src="arrowDownImg" />
                  </div>
                  <!-- 固定选项 -->
                  <div class="flex align-center el-option" style="margin-top:-2px;" v-if="option.optionType === 'fixedOptions'">
                    <div class="radio" v-if="item.propValues[1].value == 'radio'"></div>
                    <div class="checkbox" v-if="item.propValues[1].value == 'checkbox'"></div>
                    <div style="margin-top:-2px;">{{ option.value }}</div>
                  </div>
                  <!-- 输入框 -->
                  <div class="flex align-center el-option" v-if="option.optionType === 'inputBox'">
                    <div class="radio" v-if="item.propValues[1].value == 'radio'"></div>
                    <div class="checkbox" v-if="item.propValues[1].value == 'checkbox'"></div>
                    <div>其他  {{ option.value }}__________________________</div>
                  </div>
                </div>
              </div>

              <!-- 暂无选项 -->
              <div class="item-option" v-else>暂无选项</div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import { mapState } from 'vuex'
import arrowDownImg from '@/assets/images/arrow-down.png'
import { dropdownOptionsData } from '@/utils/data.js'
export default {
  components: {
    draggable
  },
  data() {
    return {
      selfWindow: null,
      scrollHeight: '',
      arrowDownImg,
      dropdownOptionsData: dropdownOptionsData,
    }
  },
  computed: {
    ...mapState(['list', 'currentItem', 'lastSaveTime', 'filename', 'isCreateItem'])
  },
  created() {
    this.selfWindow = nw.Window.get()
  },
  updated() {
    console.log('update------------')
    if (this.isCreateItem) {
      console.log('update--------222----')
      this.scrollToNow()
    }
  },
  methods: {
    clickListItem(item) {
      this.$store.commit('clickCurrentItem', item)
    },
    // 滚动到选中
    scrollToNow() {
      this.$nextTick(() => {
        let container = this.$refs['container']
        let currentItemOffsetTop = this.$el.querySelector('.list-item-choosed').offsetTop
        container.scrollTop = Number(currentItemOffsetTop)-200
        this.$store.commit('setCreateItemState', false)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .editor-main {
    background-color: #F2F2F2;
    flex: 1;
    overflow-y: scroll;

    .page-main {
      width: 750px;
      // min-height: 730px;
      background-color: #fff;
      margin-top: 20px;

      .headline {
        width: 100%;
        height: 80px;
        min-height:80px;
        border-bottom: 1px solid rgb(242, 242, 242);
        padding-left: 20px;
        padding-right: 15px;
        padding-top: 10px;

        .headline-title {
          font-size: 24px;
          color: rgb(51, 51, 51);
          font-weight: 600;
        }
        
        .headline-time {
          font-size: 12px;
          color: #999;
          margin-top: 15px;
        }
      }

      .list-rest {
        flex: 1;
      }

      .page-list {
        width: 100%;
        padding-top: 20px;
        background-color: #fff;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom:40px;
        
        .list-item {
          width: 100%;
          padding: 15px 20px;
          border: 1px solid #fff;

          .item-headline {
            font-size: 18px;
            font-weight: 700;
            color: rgb(51, 51, 51);
          }

          .item-title {
            padding-bottom: 5px;
            font-size: 14px;
            font-weight: 600;
            color: rgb(51, 51, 51);
            text-align: justify;
            line-height: 1.5;
          }

          .item-option {
            font-size: 14px;
            color: rgb(51, 51, 51);
            padding: 6px 0px;

            .el-select-option {
              width: 240px;
              height: 36px;
              font-size: 14px;
              color: rgb(191 188 188);
              border: 1px solid rgb(207 206 206);
              border-radius: 5px;
              padding-left: 10px;
              padding-right: 10px;
            }

            .el-option {
              .radio {
                width: 12px;
                height: 12px;
                border: 1px solid rgb(177 177 177);
                border-radius: 50%;
                margin: 0px 5px 0px 3px;
              }

              .checkbox {
                width: 12px;
                height: 12px;
                border: 1px solid rgb(177 177 177);
                margin: 0px 5px 0px 3px;
              }
            }

            .item-option-radio {
              margin-right: 5px;
              position: relative;
              top: -2px;
            }
          }
        }

        .list-item:hover {
          background-color: #f4fafa;
        }

        .list-item-choosed {
          border: 1px solid #018678;
          background-color: #EFF8F8;
        }
      }
    }
  }
</style>

<style lang="less">
  .item-option {
    .el-input.is-disabled .el-input__inner {
      background-color: #fff;
      border-width: 0.5px;

    }

    .el-radio__input.is-disabled+span.el-radio__label {
      color: #333;
    }

    .el-radio__input.is-disabled .el-radio__inner, .el-radio__input.is-disabled.is-checked .el-radio__inner {
      background-color: #fff;
    }
  }
</style>