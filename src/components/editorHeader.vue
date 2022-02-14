<template>
  <div class="editor-header">

    <div class="header-left">
      <div
        class="el-select-mine flex align-center justify-between pointer"
        @click.stop="clickEditTemplate"
      >
        <span class="template-name ellipsis-1">{{ filename }}</span>
        <img style="width:10px;" :src="arrowDownImg" v-if="!showEditTemplate" />
        <img style="width:10px;" :src="arrowUpImg" v-else />

        <div class="select-option flex flex-column" v-show="showEditTemplate">
          <div
            class="select-option-item flex align-center"
            @click.stop="clickEditTemplateName"
            @mouseover="mouseOver('edit')"
            @mouseleave="mouseLeave('edit')"
          >
            <img :src="editImg" v-if="showEditImg" />
            <img :src="editWhiteImg" v-else />
            <span>修改名称</span>
          </div>
          <div
            class="select-option-item flex align-center"
            @click.stop="clickSave"
            @mouseover="mouseOver('save')"
            @mouseleave="mouseLeave('save')"
          >
            <img :src="saveImg" v-if="showSaveImg" />
            <img :src="saveWhiteImg" v-else />
            <span>保存</span>
          </div>
          <div
            class="select-option-item flex align-center"
            @click.stop="clickPreview"
            @mouseover="mouseOver('preview')"
            @mouseleave="mouseLeave('preview')"
          >
            <img :src="previewImg" v-if="showPreviewImg" />
            <img :src="previewWhiteImg" v-else />
            <span>预览</span>
          </div>
        </div>
      </div>
    </div>
    <div class="header-middle">
      <div class="flex flex-column align-center pointer header-item" @click="clickCreateItem('headline')">
        <img :src="headerlineImg" />
        <div class="img-desc">标题</div>
      </div>
      <div class="flex flex-column align-center pointer header-item" @click="clickCreateItem('title')">
        <img :src="titleImg" />
        <div class="img-desc">题目</div>
      </div>
    </div>
    <div class="header-right">
      <img class="right-img margin-right-small pointer" :src="minimizeImg" @click="minimize" />
      <img class="right-img margin-right-small pointer" :src="maximizeImg" v-if="selfWindow.cWindow.state === 'normal'" @click="maximize" />
      <img class="right-img margin-right-small pointer" :src="unmaximizeImg" v-else @click="unmaximize" />
      <img class="right-img pointer" :src="closeImg" @click="close" />
    </div>

    <!-- 修改名称 -->
    <el-dialog
      :visible.sync="showEditTemplateName"
      width="360px"
      top="30vh"
      @close="showEditTemplateName=false"
    >
      <div class="dialog-template-name">
        <div slot="title" style="font-size:16px;font-weight:700;">模板名称</div>
        <div style="padding-top:30px;">
          <div class="flex align-center">
            <div style="width:80px;">模板名称:</div>
            <el-input
              v-model="templateNameTmp"
              clearable
              style="width:230px;"
            />
          </div>
        </div>
        <div class=" flex justify-center" style="margin-top:30px;">
          <div class="footer-btn save-btn pointer" @click="commitTemplateName">保存</div>
        </div>
      </div>
    </el-dialog>

    <!-- 关闭应用 -->
    <el-dialog
      :visible.sync="showSaveTemplate"
      width="360px"
      top="30vh"
      @close="showSaveTemplate=false"
    >
     <div style="padding-top:20px;">
        <div style="font-size:16px;font-weight:bold;color:#333;">是否保存修改？</div>
        <div style="font-size:13px;margin-top:20px;">选择“保存”则覆盖原文件，并关闭界面；选择“取消”则对源文件不做修改，并关闭界面、消除临时文件</div>
      </div>
      <div class="dialog-template-name" style="margin-top:50px;">
        <div class=" flex justify-center">
          <div class="footer-btn cancel-btn pointer" @click="cancelSaveTemplate">取消</div>
          <div class="footer-btn save-btn pointer" @click="commitSaveTemplate">保存</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headerlineImg from '@/assets/images/headline.png'
import titleImg from '@/assets/images/title.png'
import minimizeImg from '@/assets/images/minimize.png'
import maximizeImg from '@/assets/images/maximize.png'
import unmaximizeImg from '@/assets/images/unmaximize.png'
import closeImg from '@/assets/images/close.png'
import arrowDownImg from '@/assets/images/arrow-down.png'
import arrowUpImg from '@/assets/images/arrow-up.png'
import saveImg from '@/assets/images/save.png'
import saveWhiteImg from '@/assets/images/save-white.png'
import editImg from '@/assets/images/edit.png'
import editWhiteImg from '@/assets/images/edit-white.png'
import previewImg from '@/assets/images/preview.png'
import previewWhiteImg from '@/assets/images/preview-white.png'
import { deepCopyHeadline, deepCopyTitle } from '@/utils/data.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      headerlineImg,
      titleImg,
      minimizeImg,
      maximizeImg,
      unmaximizeImg,
      closeImg,
      arrowDownImg,
      arrowUpImg,
      saveImg,
      saveWhiteImg,
      editImg,
      editWhiteImg,
      previewImg,
      previewWhiteImg,
      selfWindow: null,
      showEditTemplateName: false, // 是否展示 编辑模板名称 弹框
      templateNameTmp: '',
      showEditImg: true,
      showSaveImg: true,
      showPreviewImg: true,
      showSaveTemplate: false, // 是否展示 保存模板弹框
    }
  },
  computed: {
    ...mapState(['list', 'currentItem', 'filename', 'showEditTemplate'])
  },
  created() {
    this.selfWindow = nw.Window.get()
    this.templateNameTmp = this.filename
  },
  methods: {
    // 最小化应用
    minimize() {
      this.selfWindow.minimize()
    },
    // 最大化应用
    maximize() {
      this.selfWindow.maximize()
      this.$forceUpdate()
    },
    // 取消最大化应用
    unmaximize() {
      this.selfWindow.unmaximize()
    },
    // 关闭应用
    close() {
      this.showSaveTemplate = true
    },
    // 点击 取消保存模板
    cancelSaveTemplate() {
      this.selfWindow.close()
    },
    // 点击保存模板
    commitSaveTemplate() {
      this.$store.commit('saveTemplate')
      this.selfWindow.close()
    },
    // 点击 标题/题目
    clickCreateItem(type) {
      // return
      let fn = null
      if (type === 'headline') { // 标题
        fn = deepCopyHeadline 
      } else if (type === 'title') { // 题目
        fn = deepCopyTitle
      }

      let currentItem = this.currentItem

      if (Object.keys(currentItem).length) { // 当前有选中item
        let findIndex
        this.list.forEach((item, index) => {
          if (item.id === currentItem.id) {
            findIndex = index
          }
        })
        let obj = {
          index: findIndex,
          data: fn()
        }
        this.$store.commit('createNewItemBehind', obj)

      } else { // 当前没有选中的item
        this.$store.commit('createNewItemEnd', fn())
      }
    },
    // 编辑模板
    clickEditTemplate() {
      this.$store.commit('setEditTemplate', !this.showEditTemplate)
    },
    // 点击 修改名称
    clickEditTemplateName() {
      this.showEditTemplateName = true
      this.$store.commit('setEditTemplate', false)
    },
    // 点击 保存
    clickSave() {
      this.$store.commit('saveTemplate')
      this.$store.commit('setEditTemplate', false)
      this.$store.commit('updateSaveTime')
    },
    // 点击 预览
    clickPreview() {
      this.$message.success('敬请期待~')
      this.$store.commit('setEditTemplate', false)
    },
    // 保存模板名称修改
    commitTemplateName() {
      this.$store.commit('setTemplateName', this.templateNameTmp.trim())
      this.$message.success('修改成功！')
      this.showEditTemplateName = false
    },
    // 标题/题目 鼠标移入
    mouseOver(type) {
      if (type === 'edit') { // 编辑模板名称
        this.showEditImg = false
      } else if (type === 'save') { // 保存
        this.showSaveImg = false
      } else if (type === 'preview') { // 预览
        this.showPreviewImg = false
      }
    },
    // 标题/题目 鼠标移出
    mouseLeave(type) {
      if (type === 'edit') { // 编辑模板名称
        this.showEditImg = true
      } else if (type === 'save') { // 保存
        this.showSaveImg = true
      } else if (type === 'preview') { // 预览
        this.showPreviewImg = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .editor-header {
    -webkit-user-select: none;
    user-select: none;
    -webkit-app-region: drag; // 拖动应用
    width: 100%;
    height: 65px;
    border-bottom: 1px solid rgb(242, 242, 242);
    display: flex;
    align-items: center;

    .header-left {
      width: 170px;
      padding-left: 15px;
      // border: 1px solid red;

      .el-select-mine {
        max-width: 170px;
        height: 35px;
        padding: 0px 10px;
        border-radius: 4px;
        background-color: #F2F2F2;
        position: relative;
        -webkit-app-region: no-drag;
       
        .template-name {
          font-size: 14px;
          color: #666;
          
        }

        .select-option {
          position: absolute;
          top: 41px;
          left: 0px;
          background-color: #fff;
          width: 100%;
          border-radius: 4px;
          font-size: 14px;
          color: #666;
          box-shadow: 5px -0.5px 10px rgb(224, 224, 224);

          .select-option-item {
            padding: 5px 10px;
            
            img {
              width: 30px;
            }
          }

          .select-option-item:hover {
            background-color: #039392;
            color: #fff;
          }
        }
      }
    }

    .header-middle {
      width: 40%;
      display: flex;
      padding-left: 15px;
      flex: 1;
      // border: 1px solid red;

      .img-desc {
        font-size: 10px;
        color: #666;
        margin-top: -3px;
      }

      .header-item {
        -webkit-app-region: no-drag;
        padding: 0px 5px 2px 5px;
      }

      .header-item:hover {
        background-color: #D7D7D7;
      }
    }

    .header-right {
      width: 30%;
      display: flex;
      justify-content: flex-end;
      padding-right: 15px;
      // border: 1px solid red;

      .right-img {
        -webkit-app-region: no-drag;
        width: 25px;
        height: 25px;
      }
    }

    .dialog-template-name {
      .footer-btn {
        width: 120px;
        height: 32px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
      }

      .cancel-btn {
        color: #909399;
        border: 1px solid #909399;
      }

      .cancel-btn:hover {
        border-color: #000;
        color:#000;
      }

      .save-btn {
        margin-left: 10px;
        color: #fff;
        background-color: #039392;
        border-color: #039392;
      }

      .save-btn:hover {
        background-color: #1faca7;
        border-color: #1faca7;
      }

      
    }
  }
</style>

<style>
.el-dialog {
  border-radius: 10px !important;
}
.el-dialog__body {
  padding-top: 0px !important;
}
.el-popup-parent--hidden {
  padding-right: 0px !important;
}
</style>

