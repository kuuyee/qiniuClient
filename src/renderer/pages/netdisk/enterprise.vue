<style lang="scss" scoped>
@import "../../style/params";

.bucketpage {
  background-color: $bg-bucketpage;
  height: 100%;
  display: flex;
  flex-direction: column;
  .ivu-card {
    background-color: #fff;
  }
}

.dir-layout {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  flex-shrink: 0;

  .header-dir-view {
    flex-grow: 1;
    flex-shrink: 1;
    overflow-x: auto;
    margin-right: 10px;

    .ivu-breadcrumb {
      display: flex;
      flex-direction: row;
      color: $fontColor;

      .bread-sub {
        flex-shrink: 0;

        .ivu-breadcrumb-item-separator {
          color: $fontColor;
        }
      }
    }

    /*&:hover {
                overflow-x: scroll;
            }*/
  }

  .header-info-view {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    margin-right: 10px;

    .icon {
      font-size: 14px;
    }

    .count {
      margin-right: 5px;
      padding-left: 5px;
    }

    .size {
      padding-left: 5px;
    }
  }

  .header-button-view {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    .button-margin {
      margin-right: 10px;
    }
  }
}

.file-list {
  margin-top: 10px;
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  word-break: break-all;
}
</style>
<style lang="scss">
@import "../../style/params";

.bread-sub {
  .ivu-breadcrumb-item-separator {
    color: $fontColor;
  }
}

.file-type-icon {
  width: 24px;
  vertical-align: sub;
}
</style>

<template>
  <div class="bucketpage">
    <Header :bucket="bucket"></Header>

    <div class="dir-layout">
      <div class="header-dir-view horizontal">
        <Breadcrumb separator=">">
          <div class="bread-sub" @click="changeFolderPath(-1)">
            <BreadcrumbItem>
              <Icon type="md-home" size="14"></Icon>
            </BreadcrumbItem>
          </div>
        </Breadcrumb>
      </div>

      <div class="header-info-view">
        <span class="icon iconfont icon-wenjian"></span>
        <span class="count">共{{totle}}个 文件</span>
        <span class="icon iconfont icon-fuwuqi"></span>
        <span class="size">共{{totalSize}} 存储量</span>
      </div>

      <div class="header-button-view">
        <template>
          <Button class="button-margin" size="small" @click="cleanSelection()">取消</Button>

          <Button class="button-margin" size="small" @click="allSelection()">全选</Button>

          <Button class="button-margin" size="small" @click="downloads()" icon="md-download">下载</Button>

          <Button
            class="button-margin"
            type="error"
            size="small"
            @click="askRemove()"
            icon="md-trash"
          >删除</Button>
        </template>

        <Button class="button-margin" size="small" @click="showFilter" icon="md-funnel"></Button>

        <Button-group size="small">
          <Button
            :type="showType === 0 ? 'primary' : 'default'"
            @click="changeShowType(0)"
            icon="md-list"
          ></Button>
          <Button
            :type="showType === 1 ? 'primary' : 'default'"
            @click="changeShowType(1)"
            icon="md-folder"
          ></Button>
        </Button-group>

        <Button-group size="small" style="margin-left: 10px;">
          <Button @click="getResources({keyword:bucket.folderPath})" icon="ios-arrow-forward"></Button>
        </Button-group>
      </div>
    </div>
    {{showType}}
    <Card class>
      <Row>
        <div v-show="showType===0">
          <!-- 网盘主列表table-->
          <Row>
            <Table
              :loading="loading"
              :columns="columns"
              :data="data"
              ref="table"
              sortable="custom"
              @on-sort-change="changeSort"
              @on-selection-change="changeSelect"
            >
              <template slot-scope="{ row }" slot="name">
                <div v-if="row.dir">
                  <Icon v-if="row.dir" type="ios-folder" size="20" />

                  <span
                    @click="gotoNetdiskFolder(row.id)"
                    class="gomk-common-margin gomk-common-pointer"
                  >{{ row.name }}</span>
                </div>
                <div v-if="!row.dir">
                  <img
                    class="file-type-icon"
                    v-if="isImage(row.name)"
                    :src="`${minioUrl}/${row.objectName}`"
                    alt
                  />
                  <!--
                      <svg-icon
                        class-name="gomk-svg-icon"
                        v-if="isImage(row.name)"
                        :icon-class="fileIcon(row.name)"
                        @click="getNetdiskList(row.id)"
                      />
                  -->
                  <img v-else class="file-type-icon" :src="getIcon(row.name)" />
                  <!--
                      <span
                        class="gomk-common-margin gomk-common-pointer"
                        @click="download(row.id)"
                      >{{ row.name }}</span>
                  -->
                  <span class="gomk-common-margin gomk-common-pointer">{{ row.name }}</span>
                </div>
              </template>

              <template slot-scope="{ row }" slot="createBy">
                <Tooltip :content="row.createBy" placement="right">
                  <div slot="content">
                    <p>{{row.createBy}}</p>
                    <p>
                      <i>{{row.postTitle}}</i>
                    </p>
                  </div>
                  <Avatar :src="row.userAvatar" />
                </Tooltip>
                <span class="gomk-common-margin">{{row.createBy}}</span>
              </template>

              <template slot-scope="{ row }" slot="size">
                <span v-if="!row.dir">{{row.size | filterType}}</span>
                <span v-if="row.dir">--</span>
              </template>

              <template slot-scope="{ row }" slot="action">
                <Button
                  icon="ios-cloud-download-outline"
                  type="primary"
                  size="small"
                  @click="download(row.id)"
                >下载</Button>
                <Button
                  v-if="row.dir"
                  type="warning"
                  :disabled="!isAdmin && onwer!=row.createUid"
                  size="small"
                  @click="editNetdiskFolder(row.id)"
                  class="margin-left-6"
                >编辑</Button>
                <Button
                  @click="remove(row)"
                  :disabled="!isAdmin && onwer!=row.createUid"
                  type="error"
                  size="small"
                  class="margin-left-6"
                >删除</Button>
              </template>
            </Table>
          </Row>
        </div>
        <Row type="flex" justify="end" class="page">
          <Page
            :current="searchForm.pageNumber"
            :total="total"
            :page-size="searchForm.pageSize"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
            :page-size-opts="pageSizeOpts"
            size="small"
            show-total
            show-elevator
            show-sizer
          ></Page>
        </Row>
      </Row>
    </Card>
    <!--<resource-table v-if="showType === 0" :bucket="bucket" ></resource-table>-->

    <resource-filter ref="resource-filter" :bucket="bucket"></resource-filter>

    <Modal
      v-model="modelDeleteAsk"
      title="确认删除文件？"
      class-name="vertical-center-modal"
      @on-ok="callRemove"
      @on-cancel="cleanSelection"
    >
      <div class="file-list">
        <template>
          <p v-for="file in bucket.selection">{{file.key}}</p>
        </template>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getNetdiskListData } from "../../api/netdisk";
import Header from "./header.vue";
import ResourceGrid from "@/components/ResourceGrid.vue";
import ResourceFilter from "@/components/ResourceFilter";

import { mapGetters, mapActions } from "vuex";
import * as types from "../../vuex/mutation-types";

import FileUtil from "../../libs/FileUtil";
import { handleImageUrl } from "../../libs/ImageUtil";

import { Constants, util, EventBus, mixins } from "../../service/index";
import dayjs from "dayjs";

export default {
  name: "bucketPage",
  components: {
    Header,
    ResourceGrid,
    ResourceFilter
  },
  mixins: [mixins.base],
  props: {
    bucketName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      bucket: null,
      showType: -1, //0:列表 1:folder
      folderPath: null,
      modelDeleteAsk: false,

      searchForm: {
        // 搜索框对应data对象
        name: "",
        fkey: "",
        type: "",
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        //sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
        startDate: "", // 起始时间
        endDate: "" // 终止时间
      },
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      totalSize: "", // 文件大小统计

      columns: [
        // 表头
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "文件名",
          key: "name",
          slot: "name",
          minWidth: 300,
          sortable: true
        },
        {
          title: "大小",
          key: "size",
          slot: "size",
          width: 115,
          sortable: true
        },
        {
          title: "上传者",
          key: "createBy",
          slot: "createBy",
          width: 120,
          sortable: true
        },
        {
          title: "创建时间",
          key: "createTime",
          width: 180,
          sortable: true
        },
        {
          title: "操作",
          key: "action",
          slot: "action",
          align: "center",
          fixed: "right",
          width: 220
        }
      ],
      loading: false, // 加载状态
      data: [], // 表单数据
      total: 0, // 表单数据总数
      pageSizeOpts: [5, 10, 20]
    };
  },
  computed: {
    isAdmin() {
      return this.user_roles.includes("ROLE_ADMIN");
    },
    // 计算网盘对象的所有者是不是登录人
    onwer() {
      let userinfo = JSON.parse(this.user_info);
      return userinfo.id;
    },
    ...mapGetters({
      access_token: types.app.access_token,
      user_info: types.app.user_info,
      user_roles: types.app.user_roles,
      buckets_info: types.app.buckets_info,
      privatebucket: types.setup.privatebucket,
      paging: types.setup.paging,
      setup_deleteNoAsk: types.setup.deleteNoAsk,
      setup_https: types.setup.https,
      setup_showType: types.setup.showType,
      setup_deadline: types.setup.deadline,
      customeDomains: types.setup.customedomain
    })
    /*     totalSize() {
      let totalSzie = 0;

      if (this.bucket.space) {
        totalSzie = this.bucket.space;
      } else if (this.bucket && this.bucket.files) {
        this.bucket.files.forEach(item => {
          totalSzie += item.fsize;
        });
      }
      return util.formatFileSize(totalSzie);
    }, */
    /* totalCount() {
      let totalCount = 0;

      if (this.bucket.count) {
        totalCount = this.bucket.count;
      } else if (this.bucket && this.bucket.files) {
        totalCount = this.bucket.files.length;
      }
      return totalCount;
    } */
  },
  watch: {
    bucketName: function(val, oldVal) {
      if (val && oldVal !== val) {
        this.initBucket(val);
      }
    }
  },
  mounted() {
    console.log("进入企业网盘");
    if (this.$route.query && this.$route.query.bucketName) {
      //this.initBucket(this.$route.query.bucketName);
      this.bucket = this.$route.query.bucketName;
      console.log(this.bucket);
      this.init();
    } else {
      console.log("mounted: error");
    }
  },
  methods: {
    ...mapActions([types.app.a_update_buckets_info, types.setup.a_showType]),

    init() {
      this.showType = this.setup_showType;
      console.log(this.showType);
      this.getNetdiskList(1);
    },

    //获取企业网盘的内容列表
    getNetdiskList(fid) {
      if (this.showType === 0) {
        this.pageSizeOpts = [5, 10, 20];
      } else {
        this.pageSizeOpts = [12, 24];
      }
      this.loading = true;
      getNetdiskListData(fid, this.access_token, this.searchForm).then(res => {
        this.loading = false;
        console.log(res);
        if (res.success) {
          this.data = res.result.records;
          this.total = res.result.total;
        }
      });
    },

    //获取文件类型图标，高级版
    getIcon(filename) {
      if (FileUtil.isImage(filename)) {
        return handleImageUrl(null, false, 100, 100);
      } else {
        return FileUtil.getIcon(filename, false);
      }
    },
    isImage(filename) {
      return FileUtil.isImage(filename);
    },

    //点击列表中的目录进入
    gotoNetdiskFolder(fid) {
      if (fid == 1) {
        this.nowDeptId = 1;
      }
      getNetdiskFolderInfo(fid).then(res => {
        if (res.success) {
          //this.$Message.success("获取文件夹信息成功");
          this.selectFolder = res.result.dirInfo;

          let data = res.result;
          if (this.selectFolder.diskType == 2) {
            this.isPersonNetdisk = true;
          } else {
            this.isPersonNetdisk = false;
          }

          if (data.dirInfo) {
            let dir = data.dirInfo;
            for (let attr in dir) {
              if (dir[attr] == null) {
                dir[attr] = "";
              }
            }
            let str = JSON.stringify(dir);
            let folder = JSON.parse(str);
            this.formAddFolder = folder;
          }

          this.parentName = data.parentDirName;
          if (data.dirInfo.level == 2) {
            this.twoLevelDeptId = data.dirInfo.deptIds;
          }

          // 获取全路径
          this.getNetdiskFolderFullpath(fid);
          //this.depTreeVisible = true;
          if (data.depts[0]) {
            this.$refs.depTree.setData(data.depts[0].id, data.depts[0].title);
          }
          this.nowDeptId = data.dirInfo.deptIds;
          this.addFolderParentId = data.dirInfo.id;
          this.addFolderParentName = data.dirInfo.name;
          this.addFolderParentLevel = data.dirInfo.level;
          this.nowScope = data.dirInfo.scope;
          this.getNetdiskList(fid); //获取点击目录下的内容列表
          EventBus.$emit(Constants.Event.expandNetdiskSubTree, fid);
          this.$store.commit("setSelectFolderOnwer", data.dirInfo.createUid);
          //EventBus.$emit(Constants.Event.netDiskFolderOnwer, fid);
          //设置上传文件地址
          this.uploadActionUrl = `/gomk/oh/netdisk/${fid}/upload`;
        } else {
          this.$Message.warning({
            content: "无权限查看，因为您不是此部门的成员！",
            duration: 3,
            closable: true
          });
        }
      });
    },
    // 获取网盘目录全路径
    getNetdiskFolderFullpath(fid) {
      getNetdiskFolderFullpath(fid).then(res => {
        if (res.success) {
          this.selectFolder.fullPath = res.result;
        } else {
          this.$Message.warning({
            content: res.message,
            duration: 3,
            closable: true
          });
        }
      });
    },

    changePage(v) {
      this.searchForm.pageNumber = v;
      //this.getDataList();
      this.getNetdiskList(this.selectFolder.id);
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
      //this.getDataList();
      this.getNetdiskList(this.selectFolder.id);
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
      this.totalSize = "";
    },
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == "normal") {
        this.searchForm.order = "";
      }
      this.getNetdiskList(this.selectFolder.id);
      //this.getDataList();
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
      let size = 0;

      // 根据选取的内容判断分享文件类型
      if (this.selectList.length > 1) {
        this.formShare.shareType = "MIX";
      } else {
        if (this.selectList.length != 0) {
          if (this.selectList[0].dir) {
            this.formShare.shareType = "DIRECTORY";
          } else {
            this.formShare.shareType = "FILE";
          }
        }
      }
      let names = [];
      // 分享文件数量大于2个，names使用后边加等形式

      e.forEach(item => {
        size += item.size * 1.0;

        if (this.isAdmin || this.onwer == item.createUid) {
          names.push(item.name);
        }
      });
      this.totalSize = ((size * 1.0) / (1024 * 1024)).toFixed(2) + " MB";

      // 如果选择多个文件，分享文件名处理为省略模式
      if (names.length > 1) {
        this.formShare.names = names[0] + "等...";
      } else {
        if (names.length != 0) {
          this.formShare.names = names[0];
        } else {
          this.formShare.names = [];
        }
      }
    },

    /**
     * 初始化空间信息
     */
    initBucket(bucketName) {
      if (this.$storage.cos) {
        this.bucket = this.$storage.cos.generateBucket(bucketName);
        this.bucket.bindPage(this);
        this.showType = this.setup_showType;
      }
    },
    /**
     * 获取指定前缀文件列表
     */
    getResources(option) {
      this.bucket.getResources(option);
    },
    /**
     * 根据配置,是否弹出删除确认框
     */
    askRemove() {
      this.modelDeleteAsk = true;
    },
    callRemove() {
      EventBus.$emit(
        Constants.Event.resourceAction,
        this.bucket.selection,
        Constants.ActionType.remove
      );
      this.bucket.selection = [];
    },
    //取消选择
    cleanSelection() {
      this.bucket.selection = [];
    },
    //全部选择
    allSelection() {
      this.$refs["resource-grid"].selection = [];
      this.bucket.selection = [];
      for (let i = 0; i < this.$refs["resource-grid"].files.length; i++) {
        this.$refs["resource-grid"].selectFile(i);
      }
    },
    downloads() {
      EventBus.$emit(
        Constants.Event.resourceAction,
        this.bucket.selection,
        Constants.ActionType.download
      );
      this.bucket.selection = [];
    },
    /**
     * list/grid
     * @param type
     */
    changeShowType(type) {
      this.bucket.selection = [];
      this[types.setup.a_showType](type);

      this.showType = type;
    },
    changeFolderPath(index) {
      if (index === -1) {
        this.bucket.folderPath = "";
        return;
      }
      let arrays = this.bucket.folderPath.split("/");
      this.bucket.folderPath = arrays.slice(0, index + 1).join("/");
    },
    showFilter() {
      this.$refs["resource-filter"].toggle();
    },
    exportURL() {
      //导出URL
      let urls = [];
      this.bucket.files.forEach(item => {
        urls.push(this.$refs["resource-grid"].getResourceUrl(item));
      });

      this.$electron.ipcRenderer.send(Constants.Listener.exportUrl, {
        name: `${this.$storage.name}-${this.bucket.name}-${dayjs().format(
          "YYYYMMDDHHmmss"
        )}.txt`,
        urls
      });
    }
  }
};
</script>
