<template>
  <div class="pure">
    <el-card>
      <el-form>
        <el-form-item class="operate">
          <el-input
            show-word-limit
            type="text"
            clearable
            class="input"
            v-model="queryParams.artistName"
            placeholder="请输入歌手名称"
          ></el-input>
        </el-form-item>
        <el-form-item class="operate">
          <el-button @click="search" round plain>查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="tableRef"
        :data="pageDataList"
        max-height="520px"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column label="No." type="index" align="center">
        </el-table-column>
        <el-table-column label="歌手名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="人物肖像" align="center">
          <template slot-scope="scope">
            <el-image
              class="image"
              :preview-src-list="[scope.row.img1v1Url]"
              :src="scope.row.img1v1Url"
            ></el-image
          ></template>
        </el-table-column>
        <el-table-column label="别名" align="center">
          <template slot-scope="scope">{{
            getArtistAlias(scope.row)
          }}</template>
        </el-table-column>
        <el-table-column label="专辑数量" align="center">
          <template slot-scope="scope">{{ scope.row.albumSize }}</template>
        </el-table-column>
        <el-table-column label="歌曲数量" align="center">
          <template slot-scope="scope">{{ scope.row.musicSize }}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNo"
        :page-size="page.pageSize"
        :page-sizes="[5, 10, 15, 20, 25]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalSize"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { asyncGetReq } from "../../utils/request";
import Utils from "../../utils/index";
export default {
  data() {
    return {
      /**
       * 原始数据
       */
      originDataList: [],
      /**
       * 过滤数据
       */
      filterDataList: [],
      /**
       * 分页数据
       */
      pageDataList: [],
      /**
       * 分页参数
       */
      page: {
        pageNo: 1, // 当前页
        pageSize: 10, // 偏移量
        totalSize: 0 // 总数
      },
      /**
       * 查询参数
       */
      queryParams: {
        artistName: "" // 歌手名称
      },
      loading: false
    };
  },
  async created() {
    await this.getOriginDataList();
    await this.search();
  },
  methods: {
    /**
     * 获取原始数据
     */
    async getOriginDataList() {
      this.originDataList = await asyncGetReq(
        "/top/artists?offset=0&limit=300",
        "artists"
      );
      // console.log("originDataList", this.originDataList);
    },

    /**
     * 查询
     */
    async search() {
      this.page.pageNo = 1;
      await this.pageList();
    },

    /**
     * 分页
     */
    async pageList() {
      this.loading = true;
      this.filterDataList = this.originDataList.filter(item =>
        item.name.includes(this.queryParams.artistName)
      );

      this.page.totalSize = this.filterDataList.length;
      this.pageDataList = await this.pageBySize(
        this.filterDataList,
        this.page.pageNo,
        this.page.pageSize
      );
      this.loading = false;
      // console.log("filterDataList", this.filterDataList);
      // console.log("pageDataList", this.pageDataList);
    },

    /**
     * 获取单页数据
     */
    async pageBySize(arr, pageNo, pageSize) {
      const offset = (pageNo - 1) * pageSize;
      const nextPageMaxSize = pageNo * pageSize;
      const result =
        nextPageMaxSize >= arr.length
          ? arr.slice(offset, arr.length)
          : arr.slice(offset, offset + pageSize);
      // 延时返回结果，模拟请求真实接口
      // return result;
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(result);
        }, 1000);
      });
    },

    /**
     * 切换每页显示条数
     * @param {*} pageSize - 每页显示条数
     */
    async handleSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      await this.search();
    },
    /**
     * 切换页码
     * @param {*} pageNo - 页码
     */
    async handleCurrentChange(pageNo) {
      this.page.pageNo = pageNo;
      await this.pageList();
    },

    /**
     * 获取歌手别名
     * @param {*} row 单行数据
     */
    getArtistAlias(row) {
      return Utils.isWeightyArray(row.alias) ? row.alias.join(", ") : "暂无";
    }
  }
};
</script>

<style scoped>
.pure {
  margin: 0;
  padding: 0;
}
.operate {
  float: left;
  margin-right: 20px;
  height: 36px;
  line-height: 36px;
  display: inline-block;
}
.input {
  width: 200px;
}
.image {
  height: 96px;
  width: 96px;
}
</style>
