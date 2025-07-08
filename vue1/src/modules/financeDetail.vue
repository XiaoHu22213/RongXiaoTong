<template>
  <div class="details-box2">
    <el-form ref="form" :inline="true" :model="form" label-width="160px" style="margin-top: 20px">
      <div>
        <el-form-item label="融资额度：">
          <el-input v-model="form.money" style="width: 80px; margin-right: 10px"></el-input>(单位：元)
        </el-form-item>
        <el-form-item label="利息：" label-width="85px">
          <el-input v-model="form.rate" style="width: 80px; margin-right: 10px"></el-input>%
        </el-form-item>
        <el-form-item label="还本付息时间：" label-width="177px">
          <el-input v-model="form.repayment" style="width: 80px; margin-right: 10px"></el-input>(单位：月)
        </el-form-item>
      </div>

      <div>
        <el-form-item label="申请人姓名：">
          <el-input v-model="form.realName" style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item label="申请人手机号：">
          <el-input v-model="form.phone" style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label="申请人身份证号：">
          <el-input v-model="form.idNum" style="width: 180px"></el-input>
        </el-form-item>
      </div>

      <div v-if="form.combinationName1 != null">
        <el-form-item label="组合贷款人1姓名：">
          <el-input v-model="form.combinationName1" style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item label="组合贷款人1手机号：">
          <el-input v-model="form.combinationPhone1" style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label="组合贷款人1身份证号：">
          <el-input v-model="form.combinationIdnum1" style="width: 180px"></el-input>
        </el-form-item>
      </div>

      <div v-if="form.combinationName2 != null">
        <el-form-item label="组合贷款人2姓名：">
          <el-input v-model="form.combinationName2" style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item label="组合贷款人2手机号：">
          <el-input v-model="form.combinationPhone2" style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label="组合贷款人2身份证号：">
          <el-input v-model="form.combinationIdnum2" style="width: 180px"></el-input>
        </el-form-item>
      </div>

      <el-form-item class="showInfoButton">
        <el-button type="info" @click="showInfo">查看上传资料</el-button>
      </el-form-item>

      <el-dialog title="资料" :visible.sync="show" width="580px" :before-close="closeInfo">
        <el-form v-for="(item, index) in form.file" :key="index" ref="ruleForm" label-width="100px"
          class="demo-ruleForm">
          <el-form-item prop="consignee">
            <img :src="'http://localhost:9090/file/' + item" alt="" style="background-size:cover" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="closeInfo">取 消</el-button> -->
          <el-button type="success" @click="closeInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-form>

    <div class="btn-style">
      <el-button type="danger" @click="handleApply('1')" v-show="form.status == 0 || form.status == 2">驳回</el-button>
      <!-- <el-button type="danger" @click="handleApply" v-show="form.status==0">申请</el-button> -->
      <el-button type="success" @click="handleApply('2')" v-show="form.status == 0 || form.status == 1">通过</el-button>
    </div>
  </div>
</template>

<script>
import {
  getFinanceById,
  reviseFinanceById,
  getPicById,
  getFileInfoAsListById
} from "../api/financingList.js";
export default {
  data() {
    return {
      show: false,
      data: [],
      ownerInfo: {},
      pic: [],
      userGoods: [],
      updateGoodInfo: {},
      form: {
        realName: "",
        phone: "",
        idNum: "",
        combinationName1: "",
        combinationName2: "",
        combinationPhone1: "",
        combinationPhone2: "",
        combinationIdnum1: "",
        combinationIdnum2: "",
        rate: "",
        money: "",
        // bankPhone: "",
        repayment: "",
        status: 0,
        file: [],
      },
    };
  },
  filters: {
    changeTime(time) {
      return time.slice(0, 10);
    },
  },
  props: {
    ctype: {
      type: String,
    },
    cdesciibe: {
      type: String,
    },
  },
  methods: {
    showInfo() {
      this.show = true;
    },
    closeInfo() {
      this.show = false;
    },
    handleApply(val) {
      this.form.status = val;
      console.log("this.form", this.form);
      reviseFinanceById(this.form)
        .then((res) => {
          if (res.flag == true) {
            this.$message.success(res.message);
            this.$router.push({ path: "/index/financingList" });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.message);
        });
    },
    getData() {
      getFinanceById({ id: this.$route.query.id })
        .then((res) => {
          this.form = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      getFileInfoAsListById({ id: this.$route.query.id })
        .then((res) => {
          this.form.file = res.data;
        })
    },

  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.details-box2 {
  .goods {
    float: left;
    width: 200px;
    height: 290px;
    margin-top: 15px;
    padding: 15px;
    background-color: white;
    border: 1px solid #d3d3d3;
    cursor: pointer;

    .goods-img {
      float: left;
      width: 160px;
      height: 170px;
      margin-right: 10px;
      border-radius: 6px;
    }

    .info {
      width: 160px;
      float: left;

      .initiator {
        color: #666;
      }

      .title {
        /*超出的部分隐藏*/
        overflow: hidden;
        /*文字用省略号替代超出的部分*/
        text-overflow: ellipsis;
        /*弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*限制在一个块元素显示文本的行数*/
        -webkit-line-clamp: 1;
        /*设置或检索伸缩盒对象的子元素排列方式*/
        -webkit-box-orient: vertical;
      }

      .content {
        height: 50px;
        /*超出的部分隐藏*/
        overflow: hidden;
        /*文字用省略号替代超出的部分*/
        text-overflow: ellipsis;
        /*弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*限制在一个块元素显示文本的行数*/
        -webkit-line-clamp: 7;
        /*设置或检索伸缩盒对象的子元素排列方式*/
        -webkit-box-orient: vertical;
        font-size: 10px;
      }

      .price {
        font-size: 10px;
        font-weight: bold;
        display: block;
        color: red;
      }
    }
  }

  width: 100%;
  // margin: 10px auto;
  background: #fff;
  min-height: 100%;
  height: auto;

  // padding: 10px 20px;
  img {
    width: 70%;
    height: 70%;
    float: left;
    margin-right: 20px;
  }

  .title {
    font-size: 18px;
    line-height: 40px;
  }

  .introduce {
    line-height: 25px;
    max-height: 100px;
  }

  .info {
    position: relative;
    width: 340px;
    height: 300px;
    float: left;

    .title {
      font-size: 22px;
      font-weight: bold;
    }

    .content {
      height: 100px;
    }

    .price {
      color: red;
      font-size: 25px;
      font-weight: bold;
    }

    .time {
      margin-top: 10px;
      color: #999;

      .createtime {
        float: left;
      }

      .updatetime {
        float: right;
      }
    }
  }

  .operation {
    position: absolute;
    bottom: 0;
    margin-top: 20px;

    .like,
    .collection,
    .comment {
      display: inline-block;
      width: 30px;
      margin-right: 30px;

      img {
        margin: 0;
        width: 20px;
        height: 20px;
      }
    }
  }

  .add-shopcart {
    position: absolute;
    right: 20px;
    bottom: 5px;
  }
}

.showInfoButton {
  padding-left: 28px;
}

.btn-style {
  display: flex;
  justify-content: flex-start;
  margin-left: 540px;
}
</style>
