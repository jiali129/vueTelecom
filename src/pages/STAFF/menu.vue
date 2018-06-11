<template>
    <div>
        <el-tree :data="data" :props="defaultProps" 
        @node-click="handleNodeClick"></el-tree>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: [
                {
                    label: "应用菜单树",
                    children: [
                        {
                            label: "组织权限管理",
                            children: [
                                {
                                    label: "员工账号管理"
                                },
                                {
                                    label: "应用功能管理"
                                },
                                {
                                    label: "员工账号管理"
                                },
                                {
                                    label: "配置业务字典"
                                },
                                {
                                    label: "组织机构管理"
                                },
                                {
                                    label: "工作组管理"
                                },
                                {
                                    label: "菜单管理"
                                },
                                {
                                    label: "角色管理"
                                },
                                {
                                    label: "用户管理"
                                },
                                {
                                    label: "授权管理"
                                },
                                {
                                    label: "机构权限下放配置"
                                },
                                {
                                    label: "新的Boss数据范围配置"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "我的工作",
                    children: [
                        {
                            label: "移动工单位调度(待办)",
                            children: [
                                {
                                    label: "社区立项—待办列表"
                                }
                            ]
                        },
                        {
                            label: "工单管理—计划中断",
                            children: [
                                {
                                    label: "我的申请"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "客户管理",
                    children: [
                        {
                            label: "业务审批",
                            children: [
                                {
                                    label: "工程管理"
                                }
                            ]
                        },
                        {
                            label: "考核",
                            children: [
                                {
                                    label: "经营管理"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "工程管理",
                    children: [
                        {
                            label: "移动工单位调度(待办)",
                            children: [
                                {
                                    label: "社区立项—待办列表"
                                }
                            ]
                        },
                        {
                            label: "工单管理—计划中断",
                            children: [
                                {
                                    label: "我的申请"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "经营管理",
                    children: [
                        {
                            label: "移动工单位调度(待办)",
                            children: [
                                {
                                    label: "社区立项—待办列表"
                                }
                            ]
                        },
                        {
                            label: "工单管理—计划中断",
                            children: [
                                {
                                    label: "我的申请"
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        }
    }
};
</script>
<style scoped>
</style>


