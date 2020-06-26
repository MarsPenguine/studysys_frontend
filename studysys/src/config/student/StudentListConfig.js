import React from "react";

const arr = [];

const filter = arr.map((course_name) => {
  return {
    text: course_name,
    value: course_name,
  };
});

export const ColumnsConfig = [
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
    title: "Selected Curriculum",
    dataIndex: "course_name",
    ellipsis: false,
    filters: filter,
    onFilter: (value, record) => record.course_name.indexOf(value) === 0,
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
    render: () => (
      <span>
        <a style={{ marginRight: 16 }}>Edit</a>
        <a>Delete</a>
      </span>
    ),
  },
];
