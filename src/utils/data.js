import { nanoid } from 'nanoid'

// 标题
const headline = {
  name: '标题',
  id: '',
  componentName: 'Headline',
  propValues: [
    {
      label: '标题',
      key: 'textarea',
      value: '新建标题'
    }
  ]
}

// 题目
/**
 * chooseType: 单选radio  多选checkbox  
 * options.type: 下拉选项 dropdownOptions  固定选项 fixedOptions  输入框inputBox  暂无选项
 */
const title = {
  name: '新建题目',
  id: '',
  componentName: 'Title',
  propValues: [
    {
      label: '题目',
      key: 'textarea',
      value: '新建题目'
    },
    {
      label: '类型',
      key: 'chooseType',
      value: 'radio'
    },
    {
      label: '选项',
      key: 'options',
      value: []
    }
  ]
}

// 选项
const option = {
  id: '',
  optionType: 'dropdownOptions',
  value: ''
}

// 创建一个标题
export function deepCopyHeadline() {
  const newHeadline = JSON.parse(JSON.stringify(headline))
  newHeadline.id = nanoid()
  return newHeadline
}

// 创建一个题目
export function deepCopyTitle() {
  const newTitle = JSON.parse(JSON.stringify(title))
  newTitle.id = nanoid()
  return newTitle
}

// 创建一个选项
export function deepCopyOption() {
  const newOption = JSON.parse(JSON.stringify(option))
  newOption.id = nanoid()
  return newOption
}

// 下拉选项数据
export const dropdownOptionsData = {
  XY: '学院',
  LQZYMCModify: '专业',
  province: '省份',
  BJ: '班级',
  XBMC: '性别'
}