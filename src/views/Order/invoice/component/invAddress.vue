<template>
  <div class="main">
    <ul class="nav">
      <mt-field label="收件人" placeholder="请输入收件人姓名" v-model="user"></mt-field>
      <mt-field label="联系电话" placeholder="请输入收件人联系电话" v-model="phone"></mt-field>
      <mt-field label="所在区域" placeholder="请选择所在区域" v-model="region" :readonly=true @click.native.capture="showAddressPicker"></mt-field>
      <mt-field label="详细地址" placeholder="请输入详细地址" v-model="addressDetail" type="textarea"></mt-field>
    </ul>
    <mt-popup v-model="regionVisible" position="bottom" class="region-popup" style="width: 100%;">
      <mt-picker :slots="myAddressSlots" valueKey="name" :visibleItemCount="5" @change="addressChange" :itemHeight="40" :showToolbar=true>
        <Slot>
          <div class="picker-tool-bar">
            <div class="color-green" @click="sureArea">确定</div>
          </div>
        </Slot>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import threeLevelAddress from '../../../../../static/citiPicker.json'
  import util from '../../../../util/util'
  export default {
    data () {
      return {
        user: '',
        phone: '',
        region:'',//三级地址
        province:'',//省
        city:'',//市
        county:'',//县
        regionInit:false,//禁止地区选择器自动初始化，picker组件会默认进行初始化，导致一进入页面就会默认选中一个初始3级地址
        isDefault: false,
        //picker组件插槽
        myAddressSlots: [
          //省
          {
            flex: 1,
            values: this.getProvinceArr(), //省份数组
            className: 'slot1',
            textAlign: 'center'
          },
          //分隔符
          {
            divider: true,
            content: '',
            className: 'slot2'
          },
          //市
          {
            flex: 1,
            values: this.getCityArr("北京"),
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '',
            className: 'slot4'
          },
          //县
          {
            flex: 1,
            values: this.getCountyArr("北京","北京"),
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        addressDetail: '',
        regionVisible: false
      }
    },
    watch: {
    },
    methods: {
      ...mapMutations(['setExpAddress']),
      closePopup () {
        this.regionVisible = false
//        this.region = ''
      },
      sureArea () {
        this.regionVisible = false
        if (this.isBlank(this.region)) {
          let values = this.myAddressSlots
          this.province = values[0].values[0]['name']
          this.city = values[2].values[0]['name']
          this.county = values[4].values[0]['name']
          this.region =  this.province + this.city + this.county
        }
      },
      //打开地址选择器
      showAddressPicker(){
        this.regionVisible = true;
      },
      //picker组件的change事件，进行取值赋值
      addressChange(picker, values){
        if (this.regionInit){
          //取值并赋值
          this.region = values[0]["name"] + values[1]["name"] + values[2]["name"];
          this.province = values[0]["name"];
          this.city = values[1]["name"];
          this.county = values[2]["name"];
          //给市、县赋值
          picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
          picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
        }else {
          this.regionInit = true;
        }
      },
      //遍历json，返回省级对象数组
      getProvinceArr() {
        let provinceArr = [];
        threeLevelAddress.forEach(function (item) {
          let obj = {};
          obj.name = item.name;
          provinceArr.push(obj);
        });
        return provinceArr;
      },
      //遍历json，返回市级对象数组
      getCityArr(province) {
        console.log("省：" + province);
        let cityArr = [];
        threeLevelAddress.forEach(function (item) {
          if (item.name === province) {
            item.sub.forEach(function (args) {
              let obj = {};
              obj.name = args.name;
              cityArr.push(obj);
            });
          }
        });
        return cityArr;
      },
      //遍历json，返回县级对象数组
      getCountyArr(province,city){
        let countyArr = [];
        threeLevelAddress.forEach(function(item){
          if (item.name === province){
            item.sub.forEach(function (args) {
              if (args.name === city){
                args.sub.forEach(function (param) {
                  let obj = {};
                  obj.name=param.name;
                  countyArr.push(obj);
                })
              }
            });
          }
        });
        // console.log(countyArr);
        return countyArr;
      },
    }
  }
</script>
<style scoped>
  .main{
    height: 16rem;
    /*background-color: rgb(242,244,247);*/
  }
  .nav {
    padding: 0;
    list-style-type: none;
  }
  .picker-tool-bar{
    display: flex;
    flex-direction: row;
    margin: 0.3rem;
    font-size: 0.4rem;
  }
  .color-grey{
    color: #656b79;
  }

  .color-green{
    color:#427E43;
    right:0.3rem;
    position:absolute;
  }
  .left {
    left: 0.3rem;
    position: absolute;
    color: #ef4f4f;
    border:none;
  }
  .right{
    background-color: #427E43;
    width: 90%;
    margin-left: 5%;
    margin-top: 0.6rem;
  }

</style>