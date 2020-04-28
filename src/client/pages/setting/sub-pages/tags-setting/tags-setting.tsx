import * as React from 'react';
import ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { tagsQueryRequest } from '@cutils/request/rrr';
import { CLogger } from '@cutils';
import classNames from 'classnames';
import { SketchPicker } from 'react-color';

import { Modal, Form, Tree, Input, Button } from 'antd';

import { Formik, useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { tagsAddRequest } from '@cutils/request/rrr/tags/tags-add';
import { ITag, convertTagListToTagNodes } from '@root/src/types';
import { ITreeNode } from '@root/src/types/rrr/tree-node';

const schema = yup.object({
  name: yup.string().required(),
  color: yup.string(),
});

export default function TagsSettingPage(
  props: RouteComponentProps,
): React.ReactElement {
  const [tags, setTags] = React.useState<ITag[]>([]);
  const [showCreateModel, setShowCreateModel] = React.useState<boolean>(false);
  const container = React.useRef<HTMLDivElement>(document.createElement('div'));

  const [tagNodes, setTagNodes] = React.useState<ITreeNode<ITag | null>[]>([]);

  React.useEffect(() => {
    let domContainer = container.current;
    document.body.appendChild(domContainer);

    return () => {
      domContainer.remove();
    };
  }, []);

  React.useEffect(() => {
    tagsQueryRequest()
      .then((result) => {
        CLogger.info(result);
        setTags(result);
      })
      .catch((error: Error) => {
        CLogger.error(error);
      });
  }, []);

  React.useEffect(() => {
    // 构造树状结构数据
    setTagNodes(convertTagListToTagNodes(tags));
  }, [tags]);

  function onNew() {
    setShowCreateModel(true);
  }

  function onHandleClose() {
    setShowCreateModel(false);
  }

  function onHandleOk(values: Omit<ITag, 'id'>) {
    console.log('----------', values);
    tagsAddRequest(values)
      .then((result) => {
        CLogger.info(result);
      })
      .catch((error: Error) => {
        CLogger.error(error);
      });
  }

  function displayNode(node: ITreeNode<ITag | null>) {
    return (
      <Tree.TreeNode key={node.uuid} title={node.name}>
        {node.children.map(displayNode)}
      </Tree.TreeNode>
    );
  }

  return (
    <div className={classNames('w-full h-full')}>
      <button
        className={classNames(
          'bg-blue-500 rounded-lg px-4 py-2 text-white shadow',
        )}
        onClick={onNew}
      >
        新增
      </button>
      <Tree defaultExpandAll={true}>
        {tagNodes.map((node: ITreeNode<ITag | null>) => {
          return displayNode(node);
        })}
      </Tree>
      {ReactDOM.createPortal(
        <Modal
          visible={showCreateModel}
          onCancel={onHandleClose}
          title={'新增标签'}
        >
          <Formik
            validationSchema={schema}
            onSubmit={onHandleOk}
            initialValues={{
              name: '',
              color: '#fff',
              note: '',
              description: '',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Item label="标签名字">
                  <Input name="name" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item label="颜色">
                  <Input
                    name="color"
                    style={{
                      display: 'none',
                    }}
                  ></Input>
                  <SketchPicker
                    color={values['color']}
                    onChange={(value) => {
                      setFieldValue('color', value ? value.hex : '', true);
                    }}
                  />
                </Form.Item>
                <Form.Item label="说明">
                  <Input name="description" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item label="备注">
                  <Input name="note" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    确定
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </Modal>,
        container.current,
      )}
    </div>
  );
}
