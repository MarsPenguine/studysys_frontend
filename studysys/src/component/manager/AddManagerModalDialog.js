import React, { useEffect, useState } from "react";
import { message, Button, DatePicker, Modal, Input, Select } from "antd";
import { api } from "../../../src/library/axios/Api";
import Form from "antd/lib/form";
import styled from "styled-components";

const { Option } = Select;

const Styled_Input = styled(Input)`
  &&& {
    width: 100%;
  }
`;
export function AddManagerModalDialog(props) {
  const { fetchData } = props;
  const [visible, setVisible] = useState(false);
  const [roleList, setRoleList] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    api.getRoleList().then((res) => {
      if (res && res.hasOwnProperty("datas")) setRoleList(res.datas);
    });
  },[]);
  /**
   * Submit form to backend when click save button.
   * @param values: Form value.
   */
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    const params = {
      role_id: values["role"],
      email: values["email"],
      nickname: values["nickname"],
      password: values["password"],
    };
    api.addManager(params).then((res) => {
      if (res) {
        if (res["code"] === 0) {
          message.success(res["datas"]);
          fetchData();
          form.resetFields();
        } else message.error(res["message"]);
      }
    });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Manager
      </Button>
      <Modal
        title="Add Manager"
        visible={visible}
        okText="Ok"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            key="nickname"
            name="nickname"
            rules={[
              {
                required: true,
                message: "please input an nickname",
              },
            ]}
          >
            {<Styled_Input placeholder="Nickname" />}
          </Form.Item>

          <Form.Item
            key="email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "please input an valid email",
              },
            ]}
          >
            {<Styled_Input placeholder="Email" />}
          </Form.Item>

          <Form.Item
            key="password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password",
              },
            ]}
          >
            <Styled_Input placeholder="Password" />
          </Form.Item>

          <Form.Item
            key="role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please input role",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a role"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {roleList
                ? roleList.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))
                : ""}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
