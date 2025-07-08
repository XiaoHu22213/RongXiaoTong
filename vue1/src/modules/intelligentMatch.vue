<template>
<div>
  
<el-table :data="tableData" style="width: 100%" border  :header-cell-style="tableHeaderColor">
    <!-- <el-table-column prop="number" label="编号" width="180" align="center"> </el-table-column> -->
    <el-table-column prop="realName" label="姓名" width="180" align="center"> </el-table-column>
    <el-table-column prop="item" label="农作物" width="180" align="center"> </el-table-column>
    <el-table-column prop="phone" label="联系方式" width="180" align="center">
    </el-table-column>
    <el-table-column prop="area" label="种植面积(亩)" width="180" align="center">
    </el-table-column>
    <el-table-column prop="amount" label="金额(元)" width="180" align="center">
    </el-table-column>
    <el-table-column prop="address" label="地址" align="center"> </el-table-column>
  </el-table>
   <pagination @item-click="pageClick" :cUrl="url"
      :cTotal="total" :cPageSize="pageSize"></pagination>
  
</div>
  
</template>

  <script>
import { selectRecommend,selectBankName } from "../api/financingList.js";
import Pagination from "../components/Pagination.vue";
import Header from '@/components/Header'
export default {
  data() {
    return {
      tableData: {
        number: "",
        item: "",
        realName: "",
        address: "",
        phone: "",
        area: "",
      },
      total: 0,
      pageSize: 10,
      url: '/finance/selectRecommend/',
      Count: sessionStorage.getItem("/finance/selectRecommend/pageCode")
        ? sessionStorage.getItem("/finance/selectRecommend/pageCode")
        : 1,
    };
  },
  methods: {
    tableHeaderColor({row,column,rowIndex,columnIndex}){
      return 'background-color:#F5F5F5;color:#333;font-wight:400;font-size:16px;text-align:center'
    },

    pageClick(item){
      this.tableData=item
    },
    getData() {
      selectRecommend({
        pageNum: this.Count,
      })
        .then((res) => {
          console.log("res", res);
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
  },
  created(){
    this.getData()
  },
  components: {
    Pagination,
    Header,
  },
};
</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>