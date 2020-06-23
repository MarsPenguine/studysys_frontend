import React from "react";

export const CourseListColumnsConfig = [
  {
    title: "ID",
    dataIndex: "id",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.id - b.id,
    ellipsis: false,
  },
  {
    title: "Name",
    dataIndex: "name",
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.student_id - b.student_id,
    ellipsis: false,
  },
  {
    title: "Type",
    dataIndex: "type_name",
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
