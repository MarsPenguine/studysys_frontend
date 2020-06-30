import React from "react";
import { Log } from "../../library/Log";
import { EditStudentModalDialog } from "../../component/student/EditStudentModalDialog";
import { Popconfirm, message } from "antd";
import { api } from "../../library/axios/Api";

export function ColumnsConfig(fetchData) {
  return [
    {
      title: "ID",
      dataIndex: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.student_id - b.student_id,
      ellipsis: false,
    },
    {
      title: "Name",
      dataIndex: "name",
      ellipsis: false,
    },
    {
      title: "Area",
      dataIndex: "address",
      ellipsis: false,
    },
    {
      title: "Student Type",
      dataIndex: "type_name",
      ellipsis: false,
    },
    {
      title: "Join time",
      dataIndex: "join_time",
      ellipsis: false,
    },
    {
      title: "Action",
      key: "action",
      ellipsis: false,
      render: (_, record) => (
        <span>
          <EditStudentModalDialog record={record} fetchData={fetchData} />
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              api.deleteStudent(record["id"]).then((res) => {
                if (res) {
                  if (res["error"]) {
                    message.error(res["message"]);
                  } else {
                    message.success(res["datas"]);
                    fetchData();
                  }
                }
              });
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
}
