<template>
  <div
    class="editor-aside"
    :style="{ height: selfWindow.cWindow.height + 'px' }"
  >
    <!-- 有选中item -->
    <template v-if="currentItem && Object.keys(currentItem).length">
      <div class="aside-item" v-for="item in currentItem.propValues" :key="item.label">
        
        <div class="aside-item-title">
          <span>{{ item.label }}：</span>
          <span class="aside-item-title-desc" v-if="item.key === 'options'">（共{{ currentItem.propValues[2].value.length }}项）</span>
        </div>

        <!-- textarea -->
        <el-input
          v-if="item.key === 'textarea'"
          type="textarea"
          placeholder="请填写题目内容"
          v-model="item.value"
          rows="4"
          maxlength="100"
          show-word-limit
        />

        <!-- radio 类型 下拉选项单选&&禁止修改 -->
        <el-radio-group
          v-model="item.value"
          v-if="item.key === 'chooseType'"
          :disabled="currentItem.propValues[2].value.length>0 && currentItem.propValues[2].value[0].optionType === 'dropdownOptions'"
        >
          <el-radio label="radio">单选</el-radio>
          <el-radio label="checkbox">多选</el-radio>
        </el-radio-group>

        <!-- options 选项 -->
        <div v-if="item.key === 'options'">
          <draggable :list="item.value" animation="300" handle="#handler">
            <div v-for="(option, index) in item.value" :key="option.id">
              <!-- 下拉选项 -->
              <div
                class="options-item flex justify-between align-center"
                v-if="option.optionType === 'dropdownOptions'"
              >
                <div class="flex align-center">
                  <div class="options-item-title">选项A</div>
                  <el-select
                    class="options-item-select"
                    v-model="option.value"
                    size="mine"
                  >
                    <el-option v-for="(item, key) in dropdownOptionsData" :label="item" :value="key" :key="key">{{ item }}</el-option>
                  </el-select>
                </div>
                <div class="options-item-del pointer flex align-center">
                  <span @click="clickDelOption(option)">删除</span>
                  <div style="width:35px;margin-top:-5px;">
                    <img style="width:25px;" id="handler" :src="paixuImg" />
                  </div>
                </div>
              </div>

              <!-- 固定选项 -->
              <div
                class="options-item flex flex-column"
                v-if="option.optionType === 'fixedOptions'"
              >
                <div class="flex justify-between align-center">
                  <div class="options-item-title">
                    <span>选项</span>
                    <span v-if="index == 0">A</span>
                    <span v-else-if="index == 1">B</span>
                    <span v-else-if="index == 2">C</span>
                    <span v-else-if="index == 3">D</span>
                    <span v-else-if="index == 4">E</span>
                    <span v-else-if="index == 5">F</span>
                    <span v-else-if="index == 6">G</span>
                    <span v-else-if="index == 7">H</span>
                    <span v-else-if="index == 8">I</span>
                    <span v-else-if="index == 9">J</span>
                    <span v-else-if="index == 10">K</span>
                    <span v-else-if="index == 11">L</span>
                    <span v-else-if="index == 12">M</span>
                    <span v-else-if="index == 13">N</span>
                    <span v-else-if="index == 14">O</span>
                  </div>
                  <div class="options-item-del pointer flex align-center">
                    <span @click="clickDelOption(option)">删除</span>
                    <div style="width:35px;margin-top:-3px;">
                      <img style="width:25px;" id="handler" :src="paixuImg" />
                    </div>
                  </div>
                </div>
                <el-input
                  type="textarea"
                  placeholder="请填写选项内容"
                  v-model="option.value"
                  rows="3"
                  maxlength="50"
                  show-word-limit
                  class="margin-top"
                  ref="input"
                />
              </div>
              
              <!-- 输入框 -->
              <div
                class="options-item flex flex-column"
                v-if="option.optionType === 'inputBox'"
              >
                <div class="flex justify-between align-center">
                  <div class="options-item-title">
                    <span>选项</span>
                    <span v-if="index == 0">A</span>
                    <span v-else-if="index == 1">B</span>
                    <span v-else-if="index == 2">C</span>
                    <span v-else-if="index == 3">D</span>
                    <span v-else-if="index == 4">E</span>
                    <span v-else-if="index == 5">F</span>
                    <span v-else-if="index == 6">G</span>
                    <span v-else-if="index == 7">H</span>
                    <span v-else-if="index == 8">I</span>
                    <span v-else-if="index == 9">J</span>
                    <span v-else-if="index == 10">K</span>
                    <span v-else-if="index == 11">L</span>
                    <span v-else-if="index == 12">M</span>
                    <span v-else-if="index == 13">N</span>
                    <span v-else-if="index == 14">O</span>
                  </div>
                  <div class="options-item-del pointer flex align-center">
                    <span @click="clickDelOption(option)">删除</span>
                    <div style="width:35px;margin-top:-3px;">
                      <img style="width:25px;" id="handler" :src="paixuImg" />
                    </div>
                  </div>
                </div>
                <el-input class="margin-top" id="options-item-input" disabled placeholder="（输入框）" />
              </div>
            </div>
          </draggable>
          
          <!-- 下拉选项时不显示 -->
          <div
            class="options-border flex justify-center align-center pointer"
            @click.capture="clickIsShowDropDown"
            v-if="!(currentItem.propValues[2].value.length && currentItem.propValues[2].value[0].optionType === 'dropdownOptions')"
          >
            <span>+ 新增题目选项</span>

            <!-- 选项下拉框 -->
            <div class="drop-down flex flex-column" v-if="showOptionsDropDown">
              <div
                class="drop-down-item flex justify-between align-center"
                @click="clickCreateOption('dropdownOptions')"
                v-if="!currentItem.propValues[2].value.length"
              >
                <div>下拉选项</div>
                <div>（选项A、B、C等）</div>
              </div>
              <div
                class="drop-down-item flex justify-between align-center"
                @click="clickCreateOption('fixedOptions')"
              >
                <div>固定选项</div>
                <div>（比如学院专业、班级等）</div>
              </div>
              <div
                class="drop-down-item flex justify-between align-center"
                @click="clickCreateOption('inputBox')"
              >
                <div>输入框</div>
                <div>（学生可自由填写）</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 上下左右移动 -->
      <div class="aside-item">
        <div class="aside-item-title">
          <span>顺序：</span>
          <span class="aside-item-title-desc">（当前序号为{{ currentIndex }}）</span>
        </div>
        <div>
          <div class="flex justify-between">
            <div class="move-btn pointer" @click="clickMoveItem('forward')">向前移动</div>
            <div class="move-btn pointer" @click="clickMoveItem('backwards')">向后移动</div>
          </div>
          <div class="flex justify-between margin-top">
            <div class="move-btn pointer" @click="clickMoveItem('headmost')">置于最前</div>
            <div class="move-btn pointer" @click="clickMoveItem('backmost')">置于最后</div>
          </div>
        </div>
      </div>
      
      <!-- 复制 && 删除 -->
      <div class="aside-item">
        <div class="aside-item-title">操作：</div>
        <div class="flex justify-between">
          <div class="del-btn pointer" @click="clickDelItem">删除</div>
          <div class="copy-btn pointer" @click="clickCopyItem">复制</div>
        </div>
      </div>
    </template>

    <!-- 暂无选中 -->
    <div class="flex justify-center align-center" style="height:100%;" v-else>

      <!-- 有标题or题目 -->
      <div class="flex flex-column justify-center align-center" style="position:relative;top:-50px;" v-if="list.length">
        <img style="width:200px;" :src="noItemImg" />
        <div style="color:#999;font-size:14px;line-height:24px;">点击左侧题目可编辑</div>
        <div style="color:#999;font-size:14px;line-height:24px;">拖动可更换题目顺序</div>
      </div>

      <!-- 无标题题目 -->
      <div class="flex flex-column justify-center align-center" style="position:relative;top:-50px;" v-else>
        <img style="width:200px;" :src="noItemImg" />
        <div style="color:#999;font-size:14px;line-height:24px;">点击菜单可添加标题和题目</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import draggable from "vuedraggable"
import { deepCopyOption, dropdownOptionsData } from '@/utils/data.js'
import noItemImg from '@/assets/images/no-item.png'
import paixuImg from '@/assets/images/paixu.png'
export default {
  components: {
    draggable
  },
  data() {
    return {
      noItemImg,
      paixuImg,
      selfWindow: '',
      dropdownOptionsData: dropdownOptionsData,
    }
  },
  computed: {
    ...mapState(['list', 'currentItem', 'showOptionsDropDown']),
    ...mapGetters(['currentIndex'])
  },
  created() {
    this.selfWindow = nw.Window.get()
  },
  methods: {
    clickIsShowDropDown() {
      this.$store.commit('setOptionsDropDown', true)
    },
    // 创建选项
    clickCreateOption(type) {
      const option = deepCopyOption()
      option.optionType = type
      this.$store.commit('createNewOption', option)
      this.$store.commit('setOptionsDropDown', false)
      // 固定选项创建后自动获取焦点
      if (type === 'fixedOptions') {
        this.$nextTick(() => {
          let inputRef = this.$refs.input
          let inputLen = this.$refs.input.length
          inputRef[inputLen-1].focus()
        })
      }
    },
    // 移动（向前，向后，最前，最后）
    clickMoveItem(type) {
      this.$store.commit('moveCurrentItem', type)
    },
    // 删除
    clickDelItem() {
      this.$store.commit('delCurrentItem')
    },
    // 复制
    clickCopyItem() {
      this.$store.commit('copyCurrentItem')
    },
    // 删除option
    clickDelOption(option) {
      this.$store.commit('delOption', option)
    }
  }
}
</script>

<style lang="less" scoped>
  .editor-aside {
    width: 325px;
    border-top: 1px solid rgb(242, 242, 242);
    padding: 20px 20px 150px 20px;
    overflow-y: scroll;

    .aside-item {
      margin-bottom: 35px;

      .del-btn, .copy-btn, .move-btn {
        width: 135px;
        height: 30px;
        border-radius: 5px;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
      }

      .del-btn {
        border: 1px solid rgba(163, 0, 20, 1);
        color: #A30014;
      }

      .del-btn:hover {
        background-color: rgba(163, 0, 20, .05)
      }

      .copy-btn {
        border: 1px solid rgba(1, 134, 120, 1);
        color: #018678;
      }

      .copy-btn:hover {
        background-color: rgba(1, 134, 120, .05);
      }

      .move-btn {
        background-color: rgba(225, 236, 235, 1);
        color: #018678;
      }
      .move-btn:hover {
        border: 1px solid rgba(1, 134, 120, .8);
      }

      .aside-item-title {
        margin-bottom: 10px;
        font-size: 14px;
        color: #333;
        font-weight: 700;

        .aside-item-title-desc {
          color: #999;
          font-weight: normal;
        }
      }

      .options-item {
        width: 285px;
        min-height: 48px;
        background-color: rgba(242, 242, 242, 1);
        color: #999999;
        font-size: 12px;
        margin-bottom: 10px;
        padding: 10px 0px 10px 15px;

        .options-item-select {
          width: 153px;
          margin-left: 10px;
        }

        .options-item-del {
          color: #02A7F0;
        }
      }

      .options-border {
        width: 285px;
        height: 40px;
        border: 1px dashed transparent;
        background: linear-gradient(white,white) padding-box,
        repeating-linear-gradient(-45deg,#ccc 0, #ccc 0.5em,white 0,white 0.8em);
        font-size: 14px;
        color: #999999;
        padding-right: -3px;
        position: relative;

        .drop-down {
          position: absolute;
          top: 50px;
          left: 0px;
          width: 100%;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 5px;
          background-color: #fff;
          font-size: 13px;

          .drop-down-item {
            width: 100%;
            height: 36px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .drop-down-item:hover {
            background-color: rgba(225, 236, 235, 1);
            color: #018678;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .editor-aside {
    .el-textarea__inner {
      padding: 10px;
      font-weight: 400;
      font-size: 14px;
      color: rgb(51, 51, 51);
    }
  }

</style>