<template>
  <div>
    <el-form ref='form' :model="form" label-width='80px'>
      <el-form-item label='用户姓名'>
        <el-input v-model="form.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label='用户地址'>
        <el-input v-model="form.name" size="small"> </el-input>
      </el-form-item>
      <el-form-item label='归属组织'>
        <el-popover placement='bottom' width="400" trigger="focus" @after-enter='toFetchGroup'>
          <el-container direction='vertical' v-loading.lock='flag'>
            <el-form>
              <el-col :span='12'>
                <el-input size="small" v-model='abc'></el-input>
              </el-col>
              <el-col :span='12'>
                <el-button size="small" @click="filterItem=abc">查询</el-button>
              </el-col>
            </el-form>
            <el-table :data="filterGroup()(filterItem)" :stripe="true" :height="300" @row-click='rowClick'>
              <el-table-column width="60" type='index' label='序号'></el-table-column>
              <el-table-column width="100" property='groupName' label='组织名称'></el-table-column>
              <el-table-column width="300" property='upperGroup' label='上级组织'></el-table-column>
            </el-table>
          </el-container>
          <el-input v-model="newform.group" slot="reference" size="small"></el-input>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary">查询</el-button>
      </el-form-item>

      <el-table :data="tableData" border style="width: 100%" v-loading='tableLoading'>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="id" label="员工ID" width="120" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="code" label="员工编号" width="100"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="auth" label="权限" width="80"></el-table-column>
        <el-table-column prop="org" label="归属组织" width="120"></el-table-column>
        <el-table-column prop="date" label="创建时间" width="80"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="change(scope)" type="text" size="small">编辑</el-button>
            <el-button @click="remove(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination @current-change='pageChange' :page-size='pageSize' background layout="prev, pager, next" :total="table.length"></el-pagination>
    <el-button size="small" type="primary" @click="addNew">添加</el-button>
    <el-dialog title="新加/编辑" :visible.sync="dialogFormVisible" width="50%">
      <el-form ref="newf" :model="newform" :inline="true" :rules='newFormRoules'>
        <el-form-item label="员工姓名" :label-width="formLabelWidth" prop="name">
          <el-input size='small' v-model="newform.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input size='small' v-model="newform.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input size='small' v-model="newform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select size='small' v-model="newform.code" prop="code" placeholder="请说出你的证件类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" :label-width="formLabelWidth">
          <el-input size='small' v-model="newform.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="人员状态">
          <el-select size='small' v-model="newform.org" placeholder="请开始你的表演">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属组织">
          <el-select size='small' v-model="newform.forg" placeholder="请选择您所在的组织">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            form: {
                name: "",
                group: "未知组织"
            },
            newform: {
                name: "",
                mobile: "",
                email: "",
                code: "",
                auth: "",
                org: "",
                forg: "",
                group: ""
            },
            newFormRoules: {
                name: [
                    { required: true, message: "请填写姓名", trigger: "blur" },
                    {
                        type: "string",
                        message: "必须填写字符",
                        trigger: "change"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "请填写正确的邮箱格式",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "这个邮箱有有毒，换个",
                        trigger: "change"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "请填写的证件号",
                        trigger: "blur"
                    }
                ]
            },
            flag: false,
            filterItem: "",
            abc: "",
            tableLoading: false,
            pageSize: 5,
            page: 1,
            formLabelWidth: "90px",
            dialogFormVisible: false
        };
    },
    computed: {
        ...mapState(["table"]), //映射的要放在上面，因为要用到table
        tableData() {
            let tableArr = this.table.slice(
                this.pageSize * (this.page - 1),
                this.pageSize * this.page
            );
            //console.log(this.$store.state.table)
            return tableArr;
        }
    },
    methods: {
        toFetchGroup() {
            this.flag = true;
            this.fetchGroup(() => {
                this.flag = false;
            });
        },
        toFetchTable() {
            this.tableLoading = true;
            this.fetchTable(() => {
                this.tableLoading = false;
            });
        },
        rowClick(row, event, column) {
            //console.log(row)
            //console.log(event)
            this.form.group = row.groupName;
        },
        change(scope) {
            //console.log(JSON.stringify(scope.row));
            this.dialogFormVisible = true;
            this.newform = scope.row;
            //console.log(this.newform)
        },
        remove(scope) {
            console.log(scope.row);
            //有三个属性
            this.$confirm("您确定要删除这个人吗？", "提示", {
                callback: () => {
                    // console.log("OK");
                    this.deleteItem({
                        code: scope.row.code,
                        cb: () => {
                            this.$message("删除成功");
                        }
                    });
                }
            });
        },
        sure() {
            //点击确定检验全部
            this.$refs.newf.validate((isValid, tag) => {
                console.log(isValid);
                console.log(tag);
                this.dialogFormVisible = false;
                //this.$http('/addnew',this.newfrom).then(res=>{ })
            });
        },
        pageChange(count) {
            this.page = count;
            console.log(count);
        },
        addNew() {
            this.newform = {
                name: "",
                mobile: "",
                email: "",
                code: "",
                auth: "",
                org: "",
                forg: "",
                group: ""
            };
            this.dialogFormVisible = true;
        },
        ...mapMutations(["deleteItem"]),
        ...mapActions(["fetchGroup", "fetchTable", "deleteItem"]),
        ...mapGetters(["filterGroup"])
    },
    mounted() {
        this.toFetchTable();
    }
};
</script>
<style scoped>
.el-form-item {
    display: inline-block;
}
.el-pagination {
    display: inline-block;
}
</style>


