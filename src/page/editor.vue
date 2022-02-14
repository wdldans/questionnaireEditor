<template>
  <div class="editor" @click.capture="cancelAll">
    <editor-header />
    <div class="main-aside flex">
      <editor-main />
      <editor-aside />
    </div>
  </div>
</template>

<script>
import editorHeader from '@/components/editorHeader.vue'
import editorMain from '@/components/editorMain.vue'
import editorAside from '@/components/editorAside.vue'
import { readJSON } from '@/utils/save.js'
import { getQueryString } from '@/utils/commonFn.js'
export default {
  components: {
    editorHeader,
    editorMain,
    editorAside
  },
  created() {
    // 读取本地模板文件
    // const { filename } = getQueryString()
    let filename = '丹丹测试'
    console.log('filename----', filename)

    let data = {}
    if (filename) {
      data = readJSON({ filename })
    }
    console.log('data---', data)

    if (Object.keys(data).length) { // 编辑，复制
      console.log('编辑模板----------')
      this.$store.commit('initTemplate', data)

    } else { // 新建
      console.log('新建模板---------')
      data.filename = ''
      data.list = []
      this.$store.commit('initTemplate', data)
    }
  },
  methods: {
    cancelAll() {
      this.$store.commit('setOptionsDropDown', false) // 隐藏选项下拉框
      this.$store.commit('setEditTemplate', false) // 隐藏编辑模板
    }
  }
}
</script>

<style lang="less" scoped>
  .editor {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    .main-aside {
      width: 100%;
    }
  }
</style>

