<template>
  <div>

    <el-table :data="financeArray" border style="width: 100%" :header-cell-style="tableHeaderColor">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="realName" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="money" label="申请金额" align="center"></el-table-column>
      <el-table-column prop="rate" label="利率" align="center"></el-table-column>
      <el-table-column prop="repayment" label="还款时间" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="danger" v-show="scope.row.status === 0">申请中</el-tag>
          <el-tag type="danger" v-show="scope.row.status === 1">驳回</el-tag>
          <el-tag type="danger" v-show="scope.row.status === 2">通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="combinationName" label="组合贷款人" align="center"></el-table-column>
      <el-table-column label="创建时间" align="center" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatTimer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime | formatTimer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span class="btn-text" @click="toDetail(scope.row)">详情</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { selectByBankId, selectBankName } from '../api/financingList.js'
export default {
  data() {
    return {
      searchValue: "",
      pageNum: 1,
      financeArray: [],
    }
  },
  filters: {
    formatTimer: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m;
    },
  },
  methods: {
    //设置表头行的样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'background-color:#F5F5F5;color:#333;font-wight:400;font-size:16px;text-align:center'
    },
    getData() {
      selectByBankId({
        keys: this.searchValue,
        pageNum: this.pageNum
      }).then(res => {
        console.log('res', res)
        this.financeArray = res.data.list
      }).catch(err => {
        console.log(err)
      })
    },
    toDetail(row) {
      this.$router.push({ path: "/index/financeDetail", query: { id: row.financeId } });
    },

  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.btn-text {
  color: #67C23A;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #035D1C;
  }
}
</style>