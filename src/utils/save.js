/**
 * 文件保存相关
 */
import { Message } from 'element-ui'
const fs = nw.require("fs")
// const path = nw.require('path')

export const basePath = (global || window).defaultStoragePath || ".";


const mkdirSync = (folder) => {
  const temp = folder.split("/")
  let url = "";
  temp.forEach((v) => {
    if (v) {
      url += `${v}/`
      if (!fs.existsSync(url)) {
        fs.mkdirSync(url)
      }
    }
  })
  return true
}

// 保存
export const saveJSON = ({filename, data}) => {
  if (mkdirSync(basePath+"/template")) {
    const content = JSON.stringify(data, null, 2);
    const fileName = `${basePath}/template/${filename}.json`
    const fd = fs.openSync(fileName, "w");
    fs.writeSync(fd, content)
    fs.closeSync(fd)
    Message.success('保存成功')
  }
}

export const readJSON = ({filename}) => {
  const fileName = `${basePath}/template/${filename}.json`
  if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName)
      try {
        return JSON.parse(data)
      } catch (e) {
        console.log(e.message)
        return {}
      }
  }
  return {}
}

// 修改文件名称

