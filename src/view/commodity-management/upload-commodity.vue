<template>
  <layout class="upload-commodity pb-60">
    <div class="fs-20 font-bold cl-333 pt-10 pb-20 pl-20">上传商品</div>
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="100"
    >
      <div class="title-category">
        <div class="title">标题与类目</div>
        <Row>
          <Col span="16">
            <FormItem label="类目" prop="category" class="mt-20">
              <div class="position-relative">
                <Cascader
                  class=""
                  v-model="formValidate.category"
                  :data="data"
                  filterable
                  :render-format="formatCascader"
                  @on-change="categoryChange"
                ></Cascader>
                <span class="cl-blue recently-used cursor-p" @click="showCategoryListFun">最近使用</span>
                <div v-show="showCategoryList" class="recently-used-list">
                  <span class="pd-5 cl-333 cursor-p" @click="changeCategoryValue(item)" v-for="item in categoryHistoryList" :key="item">{{item}}</span>
                </div>
              </div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="16">
            <FormItem label="商品标题" prop="commodityTitle">
              <div class="position-relative">
                <Input
                  type="text"
                  v-model="formValidate.commodityTitle"
                  placeholder="请输入商品标题"
                  :maxlength="128"
                ></Input>
                <span class="title-length">{{formValidate.commodityTitle.trim().length}}/128</span>
              </div>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="商品标签" prop="commodityLabel">
          <CheckboxGroup v-model="formValidate.commodityLabel">
            <Checkbox label="印花printing"></Checkbox>
            <Checkbox label="白色"></Checkbox>
            <Checkbox label="好看"></Checkbox>
            <Checkbox label="修身"></Checkbox>
            <Checkbox label="流控大师"></Checkbox>
            <Checkbox label="嘻嘻嘻"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem>
          <p>最少选择1个标签，最多选择5个标签</p>
        </FormItem>
      </div>
      <div class="commodity-des mt-20">
        <div class="title">商品描述</div>
        <FormItem class="mt-20 pr-30" label="商品标题" prop="commodityDes">
          <p class="cl-666">
            1、至少上传一张图片，能全方位展示所供应商品的外观
          </p>
          <p class="cl-666">
            2、请勿添加水印、LOGO等，请勿添加广告促销性文案。白底图最佳。
          </p>
          <editor
            ref="editor"
            :value="formValidate.commodityDes"
            @on-change="handleChange"
          ></editor>
        </FormItem>
      </div>
      <div class="commodity-sku mt-20">
        <div class="title">商品SKU</div>
        <FormItem class="mt-20 pr-30" label="颜色" prop="color">
          <label>
            <Select v-model="formValidate.color" style="width:200px">
              <Option
                v-for="item in testList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </label>
          <Icon type="ios-trash-outline" class="fs-16 ml-20 transformY--2"></Icon>
          <span class="cl-blue cursor-p">删除颜色</span>
        </FormItem>
        <FormItem>
          <MyUpload class="left"
                    :isShowTipCover="true"
                    :default-file-list="uploadList"
                    :uploaded="model.image"
                    :on-remove="removeHandler"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png','gif']"
                    :max-size="2048"
                    :on-format-error="formatHandler"
                    :on-exceeded-size="sizeHandler"
                    type="drag">
            <div class="camera">
              <Icon type="ios-camera" size="20"/>
            </div>
          </MyUpload>
          <div class="left cl-999 ml-20 img-des">
            <p>规范要求</p>
            <p>1、图片格式只能为jpg、jpeg、png，且大小不能超过5MB；</p>
            <p>2、图片宽高比必须为1:1，像数不能低于800*800；</p>
            <p>3、上传图片的背景要求必须为纯白色或透明；</p>
            <p>4、不允许出现logo水印、边框以及促销牛皮癣等信息；</p>
          </div>
        </FormItem>
        <FormItem label="尺码" prop="sizeType">
          <RadioGroup v-model="formValidate.sizeType">
            <Radio label="EU"></Radio>
            <Radio label="other"></Radio>
            <Radio label="UK"></Radio>
            <Radio label="CN"></Radio>
            <Radio label="HEIGHT"></Radio>
            <Radio label="US"></Radio>
            <Radio label="int"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem style="margin-top: -20px">
          <label class="block">
            <Input class="width-100" v-model="formValidate.size" type="text"></Input>
          </label>
        </FormItem>
        <FormItem>
          <div class="cl-F7F8FC width-1013 pr-5 pl-5 pt-10 pb-10 clear">
            <span>在标题栏中输入或选择内容可以进行筛选和批量填充</span>
            <Button class="right">取消</Button>
            <Button type="error" class="right mr-10">填充</Button>
          </div>
          <table class="table">
            <thead>
            <tr>
              <th>
                <label>
                  <Select>
                    <Option value="军绿"></Option>
                    <Option value="卡其"></Option>
                  </Select>
                </label>
              </th>
              <th>
                <label>
                  <Select>
                    <Option value="s"></Option>
                    <Option value="m"></Option>
                    <Option value="l"></Option>
                  </Select>
                </label>
              </th>
              <th>
                <Input placeholder="供应价(RMB)"></Input>
              </th>
              <th>
                <Input placeholder="库存数量"></Input>
              </th>
              <th>
                <Input placeholder="商品编码"></Input>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td rowspan="3">1</td>
              <td>S</td>
              <td><Input></Input></td>
              <td><Input></Input></td>
              <td><Input></Input></td>
            </tr>
            <tr>
              <td>M</td>
              <td><Input></Input></td>
              <td><Input></Input></td>
              <td><Input></Input></td>
            </tr>
            <tr>
              <td>L</td>
              <td><Input></Input></td>
              <td><Input></Input></td>
              <td><Input></Input></td>
            </tr>
            <tr>
              <td colspan="5" class="total">总库存：0</td>
            </tr>
            </tbody>
          </table>
        </FormItem>
      </div>
      <div class="logistics-info mt-20">
        <div class="title">包装/物流信息</div>
        <FormItem class="mt-20" label="物流重量" prop="weight">
          <label>
            <Input v-model="formValidate.weight" class="width-100"></Input>
          </label>
        </FormItem>
        <FormItem label="物流尺寸" prop="logisticsSize">
          <Row>
            <Col span="6">
              <FormItem prop="length">
                <Input type="number" v-model="formValidate.length" placeholder="长(cm)"></Input>
              </FormItem>
            </Col>
            <Col span="1" class="text-center fs-20">&times;</Col>
            <Col span="6">
              <FormItem prop="width">
                <Input type="number" v-model="formValidate.width" placeholder="宽(cm)"></Input>
              </FormItem>
            </Col>
            <Col span="1" class="text-center fs-20">&times;</Col>
            <Col span="6">
              <FormItem prop="height">
                <Input type="number" v-model="formValidate.height" placeholder="高(cm)"></Input>
              </FormItem>
            </Col>
            <Col span="4" class="text-center fs14">每件{{logisticsSize}}cm<span class="cm3">3</span></Col>
          </Row>
        </FormItem>
        <FormItem label="发货地" prop="address">
          <Row>
            <Col span="4">
              <FormItem prop="province">
                <label>
                  <Select v-model="formValidate.province" style="width:200px" @on-change="provinceChange">
                    <Option
                      v-for="item in provinceList"
                      :value="item"
                      :key="item"
                    >{{ item }}</Option
                    >
                  </Select>
                </label>
              </FormItem>
            </Col>
            <Col span="4" offset="2">
              <FormItem prop="city">
                <label>
                  <Select v-model="formValidate.city" style="width:200px">
                    <Option
                      v-for="item in cityList"
                      :value="item"
                      :key="item"
                    >{{ item }}</Option
                    >
                  </Select>
                </label>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="单件发货邮费" prop="postage">
          <label>
            <Input class="width-100" v-model="formValidate.postage"></Input>
          </label>
          <span class="ml-10">元/件（包邮请填0元）</span>
        </FormItem>
        <FormItem label="批量发货邮费" prop="batch">
          <Row>
            <Col span="4">
              <FormItem prop="batchNum">
                <label>
                  <Input class="width-100" v-model="formValidate.batchNum"></Input>
                </label>
                <span class="ml-10">件起</span>
              </FormItem>
            </Col>
            <Col span="7" offset="1">
              <FormItem prop="batchPostage">
                <label>
                  <Input class="width-100" v-model="formValidate.batchPostage"></Input>
                </label>
                <span class="ml-10">元/件（包邮请填0元）</span>
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <div class="cl-999 mt-10">
              货物发往杭州，邮费设置时参考发往杭州的费用
            </div>
          </FormItem>
        </FormItem>
      </div>
      <div class="contact-info mt-20">
        <div class="title">联系方式</div>
        <FormItem class="mt-20" label="联系人" prop="contactName">
          <Input class="width-325" v-model="formValidate.contactName"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="contactPhone">
          <Input class="width-325" v-model="formValidate.contactPhone"></Input>
        </FormItem>
        <FormItem label="网店地址">
          <Input class="width-830" v-model="formValidate.onlineShopAddress"></Input>
        </FormItem>
        <FormItem>
          <div class="cl-999">若你有在网上销售，可输入您的网店地址，有助于我们更好的了解您的商品。</div>
        </FormItem>
      </div>
      <div class="text-center mt-20">
        <Button type="primary" @click="handleSubmit('formValidate')">提交商品</Button>
        <Button class="ml-20">取消</Button>
      </div>
    </Form>
  </layout>
</template>

<script>
import Editor from '_c/editor'
import MyUpload from '@/components/upload/my-upload'
import { aliCallbackImgUrl } from '@/libs/aliUploadConfig'
import area from '@/libs/areaJson'
import { setStorage, getStorage } from '../../libs/util'

export default {
  name: 'upload-commodity',
  components: {
    Editor,
    MyUpload
  },
  data () {
    return {
      showCategoryList: false,
      categoryHistoryList: [],
      formValidate: {
        category: [],
        commodityTitle: '',
        commodityLabel: [],
        commodityDes: '',
        color: '',
        sizeType: '',
        size: '',
        weight: '',
        length: null,
        width: null,
        height: null,
        province: '',
        city: '',
        postage: 0,
        batchNum: null,
        batchPostage: 0,
        contactName: '',
        contactPhone: null,
        onlineShopAddress: ''
      },
      ruleValidate: {
        category: {
          required: true,
          message: 'The category cannot be empty',
          type: 'array',
          min: 1,
          trigger: 'change'
        },
        commodityTitle: {
          required: true,
          message: 'The title cannot be empty',
          trigger: 'blur'
        },
        commodityLabel: {
          required: true,
          message: 'The label cannot be empty',
          type: 'array',
          min: 1,
          trigger: 'change'
        },
        commodityDes: {
          required: true,
          message: 'The commodityDes cannot be empty',
          trigger: 'change'
        },
        color: {
          required: true,
          message: 'The color cannot be empty',
          trigger: 'change'
        },
        sizeType: {
          required: true,
          message: ' '
        },
        weight: {
          required: true,
          message: 'The weight cannot be empty',
          trigger: 'blur'
        },
        logisticsSize: {
          required: true,
          message: ' ',
          trigger: 'change'
        },
        length: {
          required: true,
          message: 'The length cannot be empty',
          trigger: 'blur'
        },
        width: {
          required: true,
          message: 'The width cannot be empty',
          trigger: 'blur'
        },
        height: {
          required: true,
          message: 'The height cannot be empty',
          trigger: 'blur'
        },
        address: {
          required: true,
          message: ' '
        },
        province: {
          required: true,
          message: 'The province cannot be empty',
          trigger: 'change'
        },
        city: {
          required: true,
          message: 'The city cannot be empty',
          trigger: 'change'
        },
        postage: {
          required: true,
          message: 'The postage cannot be empty',
          trigger: 'blur'
        },
        batch: {
          required: true,
          message: ' '
        },
        batchNum: {
          required: true,
          message: 'The batchNum cannot be empty',
          trigger: 'blur'
        },
        batchPostage: {
          required: true,
          message: 'The batchPostage cannot be empty',
          trigger: 'blur'
        },
        contactName: {
          required: true,
          message: 'The contactName cannot be empty',
          trigger: 'blur'
        },
        contactPhone: {
          required: true,
          message: 'The contactPhone cannot be empty',
          trigger: 'blur'
        },
        onlineShopAddress: {
          required: false,
          message: 'The onlineShopAddress cannot be empty',
          trigger: 'blur'
        }
      },
      data: [
        {
          value: '北京',
          label: '北京',
          children: [
            {
              value: '故宫',
              label: '故宫'
            },
            {
              value: '天坛',
              label: '天坛'
            },
            {
              value: '王府井',
              label: '王府井'
            }
          ]
        },
        {
          value: '江苏',
          label: '江苏',
          children: [
            {
              value: '南京',
              label: '南京',
              children: [
                {
                  value: '夫子庙',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: '苏州',
              label: '苏州',
              children: [
                {
                  value: '拙政园',
                  label: '拙政园'
                },
                {
                  value: '狮子林',
                  label: '狮子林'
                }
              ]
            }
          ]
        }
      ],
      testList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      uploadList: [],
      model: {},
      provinceList: Object.values(area.province_list),
      cityList: []
    }
  },
  computed: {
    logisticsSize () {
      return (this.formValidate.width * 1 || 0) * (this.formValidate.length * 1 || 0) * (this.formValidate.height * 1 || 0).toFixed(2)
    }
  },
  created () {
  },
  methods: {
    changeCategoryValue (val) {
      this.formValidate.category = val.split('>')
      this.showCategoryList = false
    },
    showCategoryListFun () {
      this.showCategoryList = !this.showCategoryList
      this.categoryHistoryList = getStorage('categoryList') ? getStorage('categoryList').splice(0, 5) : []
    },
    categoryChange (val) {
      let categoryList = getStorage('categoryList')
      if (categoryList && categoryList.length > 0) {
        if (!categoryList.includes(val.join('>'))) {
          categoryList.unshift(val.join('>'))
          setStorage('categoryList', categoryList)
        }
      } else {
        setStorage('categoryList', [val.join('>')])
      }
    },
    formatCascader (val) {
      return val.join('>')
    },
    handleChange (html, text) {
      this.formValidate.commodityDes = html
    },
    handleSuccess (res) {
      this.model.image = aliCallbackImgUrl + res.name
    },
    removeHandler () {
      this.model.image = ''
    },
    formatHandler () {
      this.$Message.error('请选择jpg,jpeg,png,gif格式的图片')
    },
    sizeHandler () {
      this.$Message.error('图片大小不能超过2M')
    },
    provinceChange (val) {
      this.cityList = []
      this.getCityList(val)
    },
    getCityList (val) {
      const keys = Object.keys(area.province_list)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (area.province_list[key] === val) {
          if (Number(key) === 110000 || Number(key) === 120000 || Number(key) === 310000 || Number(key) === 500000) {
            const countyKeys = Object.keys(area.county_list)
            countyKeys.forEach(item => {
              if (item.slice(0, 2) === key.slice(0, 2)) {
                this.cityList.push(area.county_list[item])
              }
            })
          } else {
            const cityKeys = Object.keys(area.city_list)
            cityKeys.forEach(item => {
              if (item.slice(0, 2) === key.slice(0, 2)) {
                this.cityList.push(area.city_list[item])
              }
            })
          }
          return
        }
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!')
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.upload-commodity {
  background-color: #f6f7fb;
}
.title-category,
.commodity-des,
.commodity-sku,
.logistics-info,
.contact-info{
  background-color: #fff;
  border: 1px solid #e3e7ea;
}
.title {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  background-color: #f8f8fa;
}
.width-1000 {
  width: 1000px;
}
.width-325 {
  width: 325px;
}
.width-830 {
  width: 830px;
}
.width-1013 {
  width: 1013px;
}
.commodity-title {
  width: 600px;
}
.camera {
  width: 58px;
  height: 58px;
  line-height: 58px;
}
.img-des {
  line-height: 20px;
}
.table {
  box-sizing: border-box;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
}
.table th, .table td {
  width: 200px;
  height: 40px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  text-align: center;
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;
}
.table .total {
  box-sizing: border-box;
  text-align: left;
  padding-left: 10px;
}
.title-length {
  position: absolute;
  right: 10px;
  top: 1px;
}
.recently-used {
  position: absolute;
  right: -60px;
  top: 0;
}
.recently-used-list {
  position: absolute;
  top: 40px;
  left: 0;
  background-color: #fff;
  z-index: 1;
  padding: 10px;
  box-shadow: 0 0 5px 5px #eee;
  border-radius: 10px;
}
.cl-F7F8FC {
  background-color: #F7F8FC;
}
.bgc-FB5A59 {
  background-color: #FB5A59;
}
.cm3 {
  vertical-align: 3px;
}
</style>
